/**
 * 钢结构算量工具 - 应用主逻辑
 */

// ====== 报价单价表（2026-09-26 康师傅逐项确认，单位：元） ======
const UNIT_PRICES = {
  steelMain:   3950,  // 钢柱(含女儿柱/檩托板)/钢梁/夹层钢构  元/吨
  purlin:      3300,  // 屋面/墙面檩条(含女儿墙檩条+门窗框)  元/吨
  secondary:   3900,  // 系杆、拉条+隅撑+撑杆、水平支撑+柱间支撑  元/吨
  anchorBolt:     20, // 地脚螺栓    元/根
  hsBolt:        2.5, // 高强螺栓    元/套
  ordBolt:       0.5, // 普通螺栓    元/套
  cleatBolt:     0.5, // 檩托板螺栓 M12（4颗/块） 元/套
  roofPanel:      24, // 屋面板 0.5mm 840型拉网岩棉       元/m²
  wallPanel:      14, // 墙面板 0.4mm 900型单瓦           元/m²
  daylightPanel:  55, // FRP采光板 1.0m宽（屋脊对称）     元/m²
  ridgeTrim:      11, // 屋脊瓦+包边+角柱              元/延米
  parapetClad:    14, // 女儿墙围护                    元/延米
  gutter:         95, // 天沟                          元/延米
  downpipe:       30, // 落水管 φ160PVC                 元/延米（2026-09-29 康师傅：报价明细已取消此项，仅第五章算量汇总保留工量）
  transport:       5, // 运输费 按建筑面积               元/m²
  install:        30, // 安装费 现场安装                 元/m²（2026-09-29 康师傅：35 → 30）
  window:        150, // 窗                            元/m²
  mezzDeck:       37, // 夹层楼板 压型钢板              元/m²
};
// 英文表沿用固定汇率（汇率输入框已删除）
const FX_RATE = 6.77;

// ====== 分项单价求和 → 人民币估算（与报价清单口径一致） ======
// 2026-09-26 合并口径：女儿柱→钢柱、屋面檩托板→钢梁、墙面檩托板→钢柱、
// 女儿墙檩条+门窗框→墙面檩条；新增水平支撑+柱间支撑（3900 元/吨）
function estimateCNY(r) {
  if (!r) return 0;
  var P = UNIT_PRICES, c = 0;
  var postW  = state.hasParapet ? (r.parapet.postWeight || 0) : 0;   // 女儿柱
  var girtW  = state.hasParapet ? (r.parapet.girtWeight || 0) : 0;   // 女儿墙檩条(同墙梁C型钢)
  var cleatR = r.secondary.cleat.roofWeight || 0;                    // 屋面檩托板→钢梁
  var cleatW = r.secondary.cleat.wallWeight || 0;                    // 墙面檩托板→钢柱
  c += (r.main.columnWeight + postW + cleatW) / 1000 * P.steelMain;                // 钢柱(含女儿柱+墙面檩托板)
  c += (r.main.beamWeight + cleatR) / 1000 * P.steelMain;                          // 钢梁(含屋面檩托板)
  c += (r.roofPurlin.weight + r.wallPurlin.weight + girtW
        + r.windows.frameWeight + r.windows.doorFrameWeight) / 1000 * P.purlin;    // 檩条(含女儿墙檩条+门窗框)
  c += r.secondary.tieRod.weight / 1000 * P.secondary;                             // 系杆
  c += r.secondary.brace.weight / 1000 * P.secondary;                             // 拉条+隅撑+撑杆
  c += (r.secondary.bracing ? r.secondary.bracing.weight : 0) / 1000 * P.secondary; // 水平支撑+柱间支撑
  // 行车（吊车梁 + 牛腿）2026-09-28 r40：按主结构单价计（焊接吊车梁工艺费更高，如需单独调价可另议）
  if (r.crane && r.crane.on) c += r.crane.weight / 1000 * P.steelMain;
  c += r.bolts.anchorBolt.count * P.anchorBolt;
  c += r.bolts.hsBolt.count * P.hsBolt;
  c += (r.bolts.cleatBolt ? r.bolts.cleatBolt.count * P.cleatBolt : 0);
  c += r.bolts.ordinaryBolt.count * P.ordBolt;
  if (r.mezzanine && r.mezzanine.hasMezzanine) {                                 // 夹层钢构
    c += (r.mezzanine.colWeight + r.mezzanine.beamWeight + (r.mezzanine.subBeamWeight||0)) / 1000 * P.steelMain;
    c += ((r.mezzanine.railingSteel||0) + (r.mezzanine.stairsSteel||0)) / 1000 * P.steelMain; // 夹层栏杆+钢楼梯
    if (r.mezzanine2 && r.mezzanine2.hasMezzanine)
      c += (r.mezzanine2.beamWeight + (r.mezzanine2.subBeamWeight||0)
            + (r.mezzanine2.railingSteel||0) + (r.mezzanine2.stairsSteel||0)) / 1000 * P.steelMain;
  }
  // 围护系统（量与报价表一致：m²/延米行取整后再乘，避免卡片与表格不一致）
  c += Math.round(r.enclosure.roof) * P.roofPanel;
  c += Math.round(r.enclosure.wall) * P.wallPanel;
  if (r.enclosure.daylightArea > 0) c += Math.round(r.enclosure.daylightArea) * P.daylightPanel;  // FRP采光带（屋面板已扣减）
  var trimItem = r.maintenance.find(function (m) { return m.item && m.item.indexOf('屋脊') >= 0; });
  if (trimItem) c += Math.round(trimItem.length) * P.ridgeTrim;
  if (state.hasParapet) {
    c += Math.round((state.length + state.width) * 2) * P.parapetClad;
  }
  // 天沟：2026-09-29 康师傅口径——只有带女儿墙才有排水天沟（内天沟）；无女儿墙不再做天沟
  //       （报价明细 / 3D 模型 / 第五章算量汇总 三处一致取消，避免客户看到"有量无图无价"）
  if (state.hasParapet) c += Math.round(state.length * 2) * P.gutter;
  // 落水管：2026-09-29 康师傅口径——报价明细取消、不计入总价；第五章算量汇总仍保留工量（32m）
  // 门窗：  2026-09-29 康师傅口径——报价只显示数量（窗 N 扇 + 门 M 樘），不计价
  // 运输 5 元/m² + 安装 30 元/m²（按总建筑面积，2026-09-27 康师傅；安装费 2026-09-29 由 35 改 30）
  var _tArea = state.length * state.width
    + (r.mezzanine && r.mezzanine.hasMezzanine ? r.mezzanine.area : 0)
    + (r.mezzanine2 && r.mezzanine2.hasMezzanine ? r.mezzanine2.area : 0);
  c += Math.round(_tArea) * (P.transport + P.install);
  if (r.mezzanine && r.mezzanine.hasMezzanine) {
    c += Math.round(r.mezzanine.deckArea + (r.mezzanine2 && r.mezzanine2.hasMezzanine ? r.mezzanine2.deckArea : 0)) * P.mezzDeck;
  }
  return c;
}

// ====== 全局状态 ======
const state = {
  step: 1,
  unit: 'm',

  // 步骤1 (单位：m)
  length: 30,
  width: 15,
  height: 8,
  hasMiddleColumn: false,
  sectionType: 'tapered',
  roofPurlinSpacing: 1.5,   // m
  wallPurlinSpacing: 1.5,   // m
  columnSpacing: 6,         // m 柱距
  snowLoad: 0.5,            // kN/m² 雪/活载（2026-09-27 力学选型可调）
  windLoad: 0.35,           // kN/m² 风载（旧字段，仅老存档兼容；新口径见 basicWind）
  basicWind: 0.45,          // kN/m² 基本风压 w₀（2026-09-27 r39：按地区带出，用于檩条/抗风柱选型）
  windZone: 'henan',        // 地区 id（对应 engine.js WIND_ZONES）
  daylightCount: 1,         // 屋面采光带道数（2026-09-27 康师傅口径：0/1/2，屋脊对称每坡各铺）
  // 行车（吊车）（2026-09-28 r40 康师傅口径：只做 5t/10t 两档；配套件只计「牛腿+连接件」）
  hasCrane: false,
  craneTonnage: 5,          // t（5 或 10）
  craneGrade: 'A3A5',       // 工作级别 'A3A5'（轻中级）/ 'A6A8'（重级）
  craneRailHeight: null,    // m 轨顶标高，null = 自动（檐高 − 净空）

  // 步骤2
  hasParapet: true,
  parapetHeight: 1.5,

  // 步骤3
  windowScheme: 'vertical',
  winWidth: 2.0,           // m  单窗宽（按康师傅 2m 宽）
  winHeight: null,         // m  单窗高 = 檐口-1.5m（带女儿墙再-1.5m），null=自动算
  sillHeight: 1.2,         // m  窗底（=砖墙顶）
  winSpacing: 1.5,         // m  (已废弃：窗户改为每个柱距正中一扇)
  winLocation: 'all',      //  four=四面墙都布
  doorCount: 2,            //   门 = 2 个
  doorWidth: 4.5,          // m  门洞宽
  doorHeight: 5.5,         // m  门洞高
  doorOnWall: 'front',     // 'front'=前纵墙两端各一
  autoLayout: true,

  // 夹层 (可选)
  mezzanineLevels: 0,  // 0=无 1=2层 2=3层
  mezz1Ratio: 50,
  mezz1Use: 'storage',
  mezz2Use: 'storage',
  mezzColSpacing: 4,   // 夹层独立柱距

  // 计算结果缓存
  result: null,

  // 项目名（2026-09-28 业务员版：纳入持久化，切换项目后可恢复）
  projectName: '',

  // 客户信息（2026-09-28 业务员版：自动写入报价单与方案书）
  customer: {
    name: '', contact: '', phone: '', addr: '',
    quoteDate: '', validDays: 30, showTerms: true
  },
};

// ====== DOM引用 ======
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

// ====== 状态持久化 ======
function saveState() {
  try { localStorage.setItem('steelToolState', JSON.stringify(state)); } catch(e) {}
}
function loadState() {
  try {
    const saved = localStorage.getItem('steelToolState');
    if (saved) Object.assign(state, JSON.parse(saved));
  } catch(e) {}
}

// ====== 客户信息（2026-09-28 业务员版：一次填写，自动写入报价单与方案书）======
function _todayISO() {
  var d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}
function cust() { return state.customer || (state.customer = { name: '', contact: '', phone: '', addr: '', quoteDate: '', validDays: 30, showTerms: true }); }

function openCustomer() {
  var c = cust();
  $('#custName').value = c.name || '';
  $('#custContact').value = c.contact || '';
  $('#custPhone').value = c.phone || '';
  $('#custAddr').value = c.addr || '';
  $('#custQuoteDate').value = c.quoteDate || _todayISO();
  $('#custValidDays').value = c.validDays || 30;
  $('#custShowTerms').checked = c.showTerms !== false;
  $('#customerModal').style.display = 'block';
}
function closeCustomer() { $('#customerModal').style.display = 'none'; }
function saveCustomerInfo() {
  state.customer = {
    name: $('#custName').value.trim(),
    contact: $('#custContact').value.trim(),
    phone: $('#custPhone').value.trim(),
    addr: $('#custAddr').value.trim(),
    quoteDate: $('#custQuoteDate').value || _todayISO(),
    validDays: Math.max(1, parseInt($('#custValidDays').value) || 30),
    showTerms: $('#custShowTerms').checked
  };
  saveState();
  closeCustomer();
  toast('✅ 客户信息已保存，将自动写入报价单与方案书');
}
// 报价日期文本
function custDateText(lang) {
  var iso = cust().quoteDate || _todayISO();
  var p = String(iso).split('-');
  if (lang === 'en') return iso;
  return p[0] + ' 年 ' + parseInt(p[1], 10) + ' 月 ' + parseInt(p[2], 10) + ' 日';
}
// 有效期到期日
function custValidUntil(lang) {
  var days = cust().validDays || 30;
  var iso = cust().quoteDate || _todayISO();
  var d = new Date(iso + 'T00:00:00');
  if (isNaN(d.getTime())) d = new Date();
  d.setDate(d.getDate() + days);
  if (lang === 'en') return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  return d.getFullYear() + ' 年 ' + (d.getMonth() + 1) + ' 月 ' + d.getDate() + ' 日';
}
// 标准条款（2026-09-28 康师傅确认：有效期/发货前付清/不含项/以合同为准）
function custTerms(lang) {
  var days = cust().validDays || 30;
  if (lang === 'en') {
    return [
      'This quotation is valid for ' + days + ' days (until ' + custValidUntil('en') + ').',
      'Payment term: full payment before shipment.',
      'Excluded from this quotation: civil foundation works, water & electricity, hoisting machinery (quoted separately on request).',
      'The final price and scope of supply are subject to the signed contract.'
    ];
  }
  return [
    '本报价有效期 ' + days + ' 天（至 ' + custValidUntil('zh') + '）。',
    '付款方式：发货前付清全款。',
    '不含项目：土建基础、水电、吊装机械（如需另计）。',
    '最终价格与范围以双方签订的合同为准。'
  ];
}
// 文档用「客户信息块」（纯文本行数组，返回空数组 = 未填）
function custInfoLines(lang) {
  var c = cust(), out = [];
  function add(label, val) { if (val) out.push((lang === 'en' ? label : label) + val); }
  add(lang === 'en' ? 'Customer: ' : '客户名称：', c.name);
  add(lang === 'en' ? 'Contact: ' : '联 系 人：', c.contact);
  add(lang === 'en' ? 'Tel: ' : '联系电话：', c.phone);
  add(lang === 'en' ? 'Site: ' : '项目地址：', c.addr);
  return out;
}

// ====== 项目存档（2026-09-28 业务员版：本地多份 + 导入/导出 .json）======
var PROJECTS_KEY = 'steelToolProjects';
function loadProjects() {
  try { return JSON.parse(localStorage.getItem(PROJECTS_KEY) || '[]'); } catch (e) { return []; }
}
function writeProjects(list) {
  try { localStorage.setItem(PROJECTS_KEY, JSON.stringify(list)); return true; }
  catch (e) { toast('⚠️ 本机存储已满，请先导出并删除旧项目'); return false; }
}
function currentSnapshot() {
  var snap = JSON.parse(JSON.stringify(state));
  delete snap.result;                                     // 计算结果可重算，不入档
  snap.projectName = ($('#projectName') || {}).value || '';
  return snap;
}
function openProjects() {
  $('#projSaveName').value = ($('#projectName').value || '').trim();
  renderProjectList();
  $('#projectsModal').style.display = 'block';
}
function closeProjects() { $('#projectsModal').style.display = 'none'; }
function renderProjectList() {
  var list = loadProjects();
  var cur = localStorage.getItem('steelToolCurrentProject') || '';
  var box = $('#projList');
  if (!list.length) {
    box.innerHTML = '<div class="proj-empty">还没有保存的项目。<br>填好参数后点上方「💾 保存当前」，就能随时切回来。</div>';
    return;
  }
  box.innerHTML = list.map(function (p) {
    var d = p.data || {};
    var dims = (d.length || '-') + '×' + (d.width || '-') + '×' + (d.height || '-') + 'm';
    var when = (p.savedAt || '').replace('T', ' ').slice(0, 16);
    return '<div class="proj-row' + (p.name === cur ? ' cur' : '') + '">'
      + '<div class="proj-info"><div class="proj-name">' + (p.name === cur ? '● ' : '') + escapeHtml(p.name) + '</div>'
      + '<div class="proj-meta">' + dims + ' · ' + (d.hasParapet ? '带女儿墙' : '无女儿墙') + ' · ' + when + '</div></div>'
      + '<div class="proj-btns">'
      + '<button class="btn-mini" onclick="switchProject(\'' + escapeAttr(p.name) + '\')">打开</button>'
      + '<button class="btn-mini" onclick="exportOneProject(\'' + escapeAttr(p.name) + '\')">导出</button>'
      + '<button class="btn-mini danger" onclick="deleteProject(\'' + escapeAttr(p.name) + '\')">删除</button>'
      + '</div></div>';
  }).join('');
}
function escapeHtml(s) { return String(s).replace(/[&<>"]/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]; }); }
function escapeAttr(s) { return String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'"); }

function saveCurrentProject() {
  var nm = ($('#projSaveName').value || '').trim() || ($('#projectName').value || '').trim();
  if (!nm) { toast('请先填写项目名称'); return; }
  var list = loadProjects();
  var item = { name: nm, savedAt: new Date().toISOString(), data: currentSnapshot() };
  var i = list.findIndex(function (p) { return p.name === nm; });
  if (i >= 0) {
    if (!confirm('已有同名项目「' + nm + '」，用当前参数覆盖它？')) return;
    list[i] = item;
  } else {
    list.unshift(item);
  }
  if (!writeProjects(list)) return;
  localStorage.setItem('steelToolCurrentProject', nm);
  $('#projectName').value = nm;
  state.projectName = nm;
  saveState();
  renderProjectList();
  toast('✅ 已保存：' + nm);
}
function switchProject(name) {
  var p = loadProjects().find(function (x) { return x.name === name; });
  if (!p) return;
  if (!confirm('打开「' + name + '」？\n当前未保存的参数将被覆盖（建议先点「💾 保存当前」）。')) return;
  var d = Object.assign({}, p.data);
  var pn = d.projectName || name;
  d.projectName = pn;
  try { localStorage.setItem('steelToolState', JSON.stringify(d)); } catch (e) { }
  localStorage.setItem('steelToolCurrentProject', name);
  location.reload();                                   // 交给 init() 回填，避免遗漏任何控件
}
function deleteProject(name) {
  if (!confirm('删除项目「' + name + '」？此操作不可撤销（建议先导出备份）。')) return;
  var list = loadProjects().filter(function (p) { return p.name !== name; });
  if (!writeProjects(list)) return;
  if (localStorage.getItem('steelToolCurrentProject') === name) localStorage.removeItem('steelToolCurrentProject');
  renderProjectList();
  toast('已删除：' + name);
}
function downloadJSON(obj, filename) {
  var blob = new Blob([JSON.stringify(obj, null, 1)], { type: 'application/json' });
  var a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  setTimeout(function () { URL.revokeObjectURL(a.href); }, 1500);
}
function _safeName(s) { return String(s || '项目').replace(/[\\/:*?"<>|]/g, '').slice(0, 40); }
function exportOneProject(name) {
  var p = loadProjects().find(function (x) { return x.name === name; });
  if (!p) return;
  downloadJSON({ type: 'laotie-steel-project', version: 1, exportedAt: new Date().toISOString(), projects: [p] },
    _safeName(name) + '.json');
  toast('已导出：' + name + '.json');
}
function exportAllProjects() {
  var list = loadProjects();
  if (!list.length) { toast('还没有保存的项目'); return; }
  downloadJSON({ type: 'laotie-steel-project', version: 1, exportedAt: new Date().toISOString(), projects: list },
    '老铁钢构-项目备份-' + _todayISO() + '.json');
  toast('已导出 ' + list.length + ' 个项目');
}
function importProjectsFromFile(file) {
  var fr = new FileReader();
  fr.onload = function () {
    try {
      var obj = JSON.parse(fr.result);
      var incoming = Array.isArray(obj) ? obj : (obj.projects || []);
      incoming = incoming.filter(function (p) { return p && p.name && p.data; });
      if (!incoming.length) { toast('⚠️ 文件里没有可用项目'); return; }
      var list = loadProjects();
      var added = 0, replaced = 0;
      incoming.forEach(function (p) {
        var i = list.findIndex(function (x) { return x.name === p.name; });
        if (i >= 0) {
          if (confirm('已存在同名项目「' + p.name + '」，用导入的覆盖？')) { list[i] = p; replaced++; }
        } else { list.unshift(p); added++; }
      });
      if (!writeProjects(list)) return;
      renderProjectList();
      toast('✅ 导入完成：新增 ' + added + ' 个' + (replaced ? '，覆盖 ' + replaced + ' 个' : ''));
    } catch (e) {
      toast('⚠️ 文件格式不正确，需是本工具导出的 .json');
    }
  };
  fr.readAsText(file);
}

// ====== 事件绑定 ======
function bindEvents() {
  // —— 客户信息 / 我的项目（2026-09-28 业务员版；null 保护，给副本不同步留安全垫）——
  var _bc = $('#btnCustomer'); if (_bc) _bc.addEventListener('click', openCustomer);
  var _bpj = $('#btnProjects'); if (_bpj) _bpj.addEventListener('click', openProjects);
  var _bsp = $('#btnSaveProject'); if (_bsp) _bsp.addEventListener('click', saveCurrentProject);
  var _pif = $('#projImportFile'); if (_pif) _pif.addEventListener('change', function (e) {
    if (e.target.files && e.target.files[0]) importProjectsFromFile(e.target.files[0]);
    e.target.value = '';
  });
  // 项目名纳入持久化（切换项目 / 刷新后能恢复）
  var _pn = $('#projectName'); if (_pn) _pn.addEventListener('input', function () {
    state.projectName = _pn.value;
    saveState();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeCustomer(); closeProjects(); }
  });

  // 步骤进度点击回退
  $$('.step.done, .step-labels .label.done').forEach(el => {
    el.addEventListener('click', () => {
      const step = parseInt(el.dataset.step || el.closest('.step')?.dataset.step);
      if (step && step < state.step) goToStep(step);
    });
  });

  // 输入框实时联动 (长度变化时自动推荐柱距)
  ['inputLength', 'inputWidth', 'inputHeight'].forEach(id => {
    $(`#${id}`).addEventListener('input', () => { readStep1(); recalculate(); });
  });
  $('#inputLength').addEventListener('input', autoRecommendSpacing);

  // 汇率联动

  // 单位切换
  $$('.unit-btn').forEach(btn => {
    btn.addEventListener('click', () => switchUnit(btn.dataset.unit));
  });

  // 结构形式+夹层合并选择
  $$('#structMezzGroup .radio-option').forEach(opt => {
    opt.addEventListener('click', () => {
      state.hasMiddleColumn = opt.dataset.str === 'double';
      state.mezzanineLevels = parseInt(opt.dataset.mezz);
      updateStructMezzUI();
      recalculate();
      renderDiagram();
    });
  });

  // 截面形式
  $$('input[name="sectionType"]').forEach(r => {
    r.addEventListener('change', () => {
      state.sectionType = r.value;
      updateRadioGroup('sectionType');
      recalculate();
    });
  });

  // 檩条间距
  $('#roofSpacing').addEventListener('change', (e) => {
    if (e.target.value === 'custom') {
      $('#roofSpacingCustom').style.display = 'block';
      state.roofPurlinSpacing = parseFloat($('#roofSpacingCustom').value) || 1.5;
    } else {
      $('#roofSpacingCustom').style.display = 'none';
      state.roofPurlinSpacing = parseFloat(e.target.value);
    }
    recalculate();
  });
  $('#wallSpacing').addEventListener('change', (e) => {
    if (e.target.value === 'custom') {
      $('#wallSpacingCustom').style.display = 'block';
      state.wallPurlinSpacing = parseFloat($('#wallSpacingCustom').value) || 1.5;
    } else {
      $('#wallSpacingCustom').style.display = 'none';
      state.wallPurlinSpacing = parseFloat(e.target.value);
    }
    recalculate();
  });
  $('#roofSpacingCustom').addEventListener('input', () => {
    state.roofPurlinSpacing = parseFloat($('#roofSpacingCustom').value) || 1.5;
    recalculate();
  });
  $('#wallSpacingCustom').addEventListener('input', () => {
    state.wallPurlinSpacing = parseFloat($('#wallSpacingCustom').value) || 1.5;
    recalculate();
  });

  // 柱距
  $('#columnSpacing').addEventListener('change', (e) => {
    state.csManual = true;                 // 用户手动选过柱距（自动推荐时给提示用）
    if (e.target.value === 'custom') {
      $('#columnSpacingCustom').style.display = 'block';
      state.columnSpacing = parseFloat($('#columnSpacingCustom').value) || 6;
    } else {
      $('#columnSpacingCustom').style.display = 'none';
      state.columnSpacing = parseFloat(e.target.value);
    }
    recalculate();
    renderDiagram();
  });
  $('#columnSpacingCustom').addEventListener('input', () => {
    state.csManual = true;
    state.columnSpacing = parseFloat($('#columnSpacingCustom').value) || 6;
    recalculate();
    renderDiagram();
  });

  // 荷载（雪/活载 + 基本风压，2026-09-27 力学选型）
  $('#snowLoad').addEventListener('change', (e) => {
    state.snowLoad = parseFloat(e.target.value) || 0.5;
    recalculate(); renderDiagram();
  });
  // 风压：地区下拉带出 w₀ + 手动覆盖（2026-09-27 r39）
  const _wz = $('#windZone');
  if (_wz) {
    _wz.addEventListener('change', () => {
      const z = (typeof WIND_ZONES !== 'undefined') ? WIND_ZONES.find(x => x.id === _wz.value) : null;
      if (z && z.id !== 'custom') {
        state.windZone = z.id;
        state.basicWind = z.w0;
        $('#windW0').value = String(z.w0);
      } else {
        state.windZone = 'custom';
        state.basicWind = parseFloat($('#windW0').value) || 0.45;
      }
      renderWindHint();
      recalculate(); renderDiagram();
    });
  }
  const _ww0 = $('#windW0');
  if (_ww0) {
    _ww0.addEventListener('input', () => {
      const v = parseFloat(_ww0.value);
      if (isFinite(v) && v > 0) {
        state.basicWind = Math.min(1.5, Math.max(0.2, v));
        state.windZone = 'custom';
        if (_wz) _wz.value = 'custom';
        renderWindHint();
        recalculate(); renderDiagram();
      }
    });
    _ww0.addEventListener('change', () => {
      const v = parseFloat(_ww0.value);
      state.basicWind = (isFinite(v) && v > 0) ? Math.min(1.5, Math.max(0.2, v)) : 0.45;
      _ww0.value = String(state.basicWind);
      renderWindHint();
    });
  }

  // 屋面采光带（2026-09-27 康师傅口径）
  $('#daylightCount').addEventListener('change', (e) => {
    state.daylightCount = parseInt(e.target.value, 10) || 0;
    recalculate(); renderDiagram();
  });

  // 行车（吊车）2026-09-28 r40
  $$('#craneToggle .radio-option').forEach(function (o) {
    o.addEventListener('click', function () {
      state.hasCrane = o.dataset.val === '1';
      updateCraneUI();
      recalculate(); renderDiagram();
    });
  });
  $$('#craneTonnage .radio-option').forEach(function (o) {
    o.addEventListener('click', function () {
      state.craneTonnage = parseInt(o.dataset.val, 10) === 10 ? 10 : 5;
      updateCraneUI();
      recalculate(); renderDiagram();
    });
  });
  $$('#craneGrade .radio-option').forEach(function (o) {
    o.addEventListener('click', function () {
      state.craneGrade = o.dataset.val === 'A6A8' ? 'A6A8' : 'A3A5';
      updateCraneUI();
      recalculate(); renderDiagram();
    });
  });
  var _crh = $('#craneRailH');
  if (_crh) {
    function _railSync() {
      var v = parseFloat(_crh.value);
      state.craneRailHeight = (isFinite(v) && v > 0) ? v : null;
      renderCraneRailHint();
      recalculate();
    }
    _crh.addEventListener('input', _railSync);
    _crh.addEventListener('change', _railSync);
  }

  // 女儿墙卡片
  $('#cardNoParapet').addEventListener('click', () => {
    state.hasParapet = false;
    updateParapetCards();
    recalculate();
  });
  $('#cardHasParapet').addEventListener('click', () => {
    state.hasParapet = true;
    updateParapetCards();
    recalculate();
  });
  $('#inputParapetHeight').addEventListener('input', () => {
    state.parapetHeight = parseFloat($('#inputParapetHeight').value) || 1.5;
    recalculate();
  });

  // 门窗：步骤3已删除，参数固定为「每柱距正中一扇窗 + 前2樘门」，state 默认值即最终值
  // （state.winWidth/sillHeight/doorCount/doorWidth/doorHeight/doorOnWall/winLocation/autoLayout 保留，供引擎与 3D 读取）

  // 底部按钮
  $('#btnPrev').addEventListener('click', () => { if (state.step > 1) goToStep(state.step - 1); });
  $('#btnNext').addEventListener('click', () => {
    if (state.step < 2 && validateCurrentStep()) goToStep(state.step + 1);
  });

  // 导出
  $('#btnExport').addEventListener('click', exportToCSV);
  var _bpr = $('#btnProposal');
  if (_bpr) _bpr.addEventListener('click', function () { downloadProposalPDF('zh'); });
  var _bpe = $('#btnProposalEn');
  if (_bpe) _bpe.addEventListener('click', function () { downloadProposalPDF('en'); });   // 🌐 英文方案书
  var _bp = $('#btnProposalPrint');
  if (_bp) _bp.addEventListener('click', function () { buildProposalDoc('zh'); });

  // 夹层层级选择 (2层/3层, 在mezzOptions内)
  $$('#mezzLevelToggle .radio-option').forEach(opt => {
    opt.addEventListener('click', () => {
      state.mezzanineLevels = parseInt(opt.dataset.val);
      updateStructMezzUI();
      recalculate();
      renderDiagram();
    });
  });
  // 夹层柱距
  $('#mezzColSpacing').addEventListener('change', () => {
    state.mezzColSpacing = parseFloat($('#mezzColSpacing').value);
    recalculate();
    renderDiagram();
  });
  // 一层夹层面占比
  $('#mezzRatio').addEventListener('input', () => {
    state.mezz1Ratio = parseInt($('#mezzRatio').value);
    $('#mezzRatioVal').textContent = state.mezz1Ratio + '%';
    recalculate();
  });
  // 一层夹层用途
  $$('#mezzUseOpts .radio-option').forEach(opt => {
    opt.addEventListener('click', () => {
      state.mezz1Use = opt.dataset.val;
      updateStructMezzUI();
      recalculate();
    });
  });
  // 二层夹层用途
  $$('#mezz2UseOpts .radio-option').forEach(opt => {
    opt.addEventListener('click', () => {
      state.mezz2Use = opt.dataset.val;
      updateStructMezzUI();
      recalculate();
    });
  });
}

// ====== 步骤导航 ======
function goToStep(n) {
  state.step = n;
  updateStepUI();
  saveState();
}

function updateStepUI() {
  const s = state.step;

  [1,2].forEach(i => {
    const dot = $(`#stepDot${i}`);
    const label = $(`#label${i}`);
    dot.className = 'step';
    label.className = 'label';
    if (i < s) { dot.classList.add('done'); label.classList.add('done'); dot.querySelector('span').textContent = '✓'; }
    else if (i === s) { dot.classList.add('active'); label.classList.add('active'); dot.querySelector('span').textContent = i; }
    else { dot.querySelector('span').textContent = i; }
    dot.dataset.step = i;
    label.dataset.step = i;
  });
  $$('.step-line').forEach((line, i) => {
    line.className = 'step-line';
    if (i + 1 < s) line.classList.add('done');
  });

  $$('.step-panel').forEach(p => p.style.display = 'none');
  $(`#step${s}Panel`).style.display = 'block';

  $('#btnPrev').disabled = s === 1;
  if (s === 2) {
    $('#btnNext').style.display = 'none';
    $('#btnGenerate').style.display = 'inline-block';
  } else {
    $('#btnNext').style.display = 'inline-block';
    $('#btnGenerate').style.display = 'none';
  }
  $('#btnNext').disabled = !validateCurrentStep();

  [1,2].forEach(i => {
    const dot = $(`#botDot${i}`);
    dot.className = 'step-dot';
    if (i < s) dot.classList.add('done');
    if (i === s) dot.classList.add('active');
  });
  $('#botStepText').textContent = `步骤 ${s} / 2`;

  updatePreview();
  updateRealtimePreview();   // 保证切到步骤2时增量框已刷新（否则显示 "+ −"）
}

// ====== 输入读取 ======
function readStep1() {
  state.length = parseFloat($('#inputLength').value) || 30;
  state.width = parseFloat($('#inputWidth').value) || 15;
  state.height = parseFloat($('#inputHeight').value) || 8;
}

// ====== 柱距自动推荐 ======
var _lastSpacingTip = { msg: '', t: 0 };
function autoRecommendSpacing() {
  const L = parseFloat($('#inputLength').value) || 30;
  let rec;
  if (L <= 40) rec = 6;
  else if (L <= 80) rec = 7.5;
  else rec = 9;
  const changed = Math.abs((state.columnSpacing || 0) - rec) > 1e-6;
  state.columnSpacing = rec;
  $('#columnSpacing').value = rec;
  $('#columnSpacingCustom').style.display = 'none';
  // 不再静默覆盖：改了柱距就明确告知（打字过程中同一句 2 秒内不重复弹）
  if (changed) {
    const msg = state.csManual
      ? '已按长度 ' + L + ' m 改为推荐柱距 ' + rec + ' m（原手动选择已覆盖，可再手动改）'
      : '已按长度 ' + L + ' m 推荐柱距 ' + rec + ' m';
    const now = Date.now();
    if (!(msg === _lastSpacingTip.msg && now - _lastSpacingTip.t < 2000)) {
      _lastSpacingTip = { msg: msg, t: now };
      if (typeof toast === 'function') toast(msg);
    }
  }
  recalculate();
  renderDiagram();
}

function syncInputsToState() {
  $('#inputLength').value = state.length;
  $('#inputWidth').value = state.width;
  $('#inputHeight').value = state.height;
  $('#inputParapetHeight').value = state.parapetHeight;
  $('#snowLoad').value = String(state.snowLoad != null ? state.snowLoad : 0.5);
  if ($('#windW0')) $('#windW0').value = String(state.basicWind != null ? state.basicWind : 0.45);
  if ($('#windZone')) $('#windZone').value = state.windZone || 'henan';
  renderWindHint();
  if ($('#craneRailH')) $('#craneRailH').value = (state.craneRailHeight != null && state.craneRailHeight > 0) ? state.craneRailHeight : '';
  updateCraneUI();
  $('#daylightCount').value = String(state.daylightCount != null ? state.daylightCount : 1);
}

// ====== 风压：地区表填充 + wk 提示（2026-09-27 r39） ======
function initWindZones() {
  const sel = $('#windZone');
  if (!sel || typeof WIND_ZONES === 'undefined') return;
  sel.innerHTML = WIND_ZONES.map(function (z) {
    return '<option value="' + z.id + '">' + z.name + '　' + z.w0.toFixed(2) + '</option>';
  }).join('');
  sel.value = state.windZone || 'henan';
}
function renderWindHint() {
  const el = $('#windHint');
  if (!el) return;
  try {
    const p = makeParams();
    const w = windReport(p);
    let zoneName = '自定义';
    if (typeof WIND_ZONES !== 'undefined') {
      const z = WIND_ZONES.find(function (x) { return x.id === (state.windZone || 'henan'); });
      if (z) zoneName = z.name;
    }
    el.className = 'hint-inline wk';
    el.textContent = '💡 ' + zoneName + ' · 檐高 ' + state.height + 'm（μz ' + w.muzEave.toFixed(2) + '）→ '
      + '墙面 wk ' + w.wkWall.toFixed(2) + ' / 屋面 wk ' + w.wkRoof.toFixed(2) + ' kN/m²';
  } catch (e) {
    el.className = 'hint-inline';
    el.textContent = '💡 —';
  }
}

// ====== 行车（吊车）UI 同步 + 轨顶标高提示（2026-09-28 r40） ======
function updateCraneUI() {
  var on = !!state.hasCrane;
  $$('#craneToggle .radio-option').forEach(function (o) {
    o.classList.toggle('active', (o.dataset.val === '1') === on);
  });
  var box = $('#craneOptions');
  if (box) box.style.display = on ? 'block' : 'none';
  var pb = $('#cranePreviewBox');
  if (pb) pb.style.display = on ? 'block' : 'none';
  if (!on) return;
  $$('#craneTonnage .radio-option').forEach(function (o) {
    o.classList.toggle('active', parseInt(o.dataset.val, 10) === (state.craneTonnage === 10 ? 10 : 5));
  });
  $$('#craneGrade .radio-option').forEach(function (o) {
    o.classList.toggle('active', o.dataset.val === (state.craneGrade === 'A6A8' ? 'A6A8' : 'A3A5'));
  });
  renderCraneRailHint();
}
function renderCraneRailHint() {
  var el = $('#craneRailHint');
  if (!el) return;
  try {
    var used = craneRailHeightM(makeParams());
    el.className = 'hint-inline';
    el.textContent = '💡 轨顶标高 ' + used.toFixed(2) + ' m'
      + (state.craneRailHeight ? '（手动）' : '（自动 = 檐高 − 行车净空）');
  } catch (e) { el.className = 'hint-inline'; el.textContent = '💡 —'; }
}

// ====== 单位切换 ======
function switchUnit(unit) {
  state.unit = unit;
  $$('.unit-btn').forEach(b => b.classList.toggle('active', b.dataset.unit === unit));
}

// ====== 卡片选择更新 ======
function updateParapetCards() {
  $('#cardNoParapet').classList.toggle('active', !state.hasParapet);
  $('#cardNoParapet').querySelector('.card-check').textContent = state.hasParapet ? '' : '✓';
  $('#cardHasParapet').classList.toggle('active', state.hasParapet);
  $('#cardHasParapet').querySelector('.card-check').textContent = state.hasParapet ? '✓' : '';
  $('#parapetHeightGroup').style.display = state.hasParapet ? 'block' : 'none';
  $('#parapetIncrement').style.display = state.hasParapet ? 'block' : 'none';
}

function updateWindowCards() {
  /* 步骤3已删除，无卡片可更新（保留空函数避免外部调用报错） */
}

function updateStructMezzUI() {
  $$('#structMezzGroup .radio-option').forEach(opt => {
    var matchS = opt.dataset.str === (state.hasMiddleColumn ? 'double' : 'single');
    var matchM = parseInt(opt.dataset.mezz) === state.mezzanineLevels;
    opt.classList.toggle('active', matchS && matchM);
  });

  var lv = state.mezzanineLevels;
  var show = lv >= 1;

  $('#mezzOptions').style.display = show ? 'block' : 'none';
  if (!show) return;

  $$('#mezzLevelToggle .radio-option').forEach(opt => {
    opt.classList.toggle('active', parseInt(opt.dataset.val) === lv);
  });

  $('#mezzRatio').value = state.mezz1Ratio;
  $('#mezzRatioVal').textContent = state.mezz1Ratio + '%';

  $('#mezzColSpacing').value = state.mezzColSpacing;

  $$('#mezzUseOpts .radio-option').forEach(opt => {
    opt.classList.toggle('active', opt.dataset.val === state.mezz1Use);
  });

  var sec2 = $('#mezz2Section');
  if (sec2) sec2.style.display = lv >= 2 ? 'block' : 'none';
  $$('#mezz2UseOpts .radio-option').forEach(opt => {
    opt.classList.toggle('active', opt.dataset.val === state.mezz2Use);
  });
}

function updateRadioGroup(name) {
  const inputs = document.getElementsByName(name);
  inputs.forEach(r => {
    const label = r.closest('.radio-option');
    if (label) label.classList.toggle('active', r.checked);
  });
}

// ====== 校验 ======
function validateCurrentStep() {
  if (state.step === 1) {
    const L = state.length, W = state.width, H = state.height;
    let valid = true;
    if (L < 8 || L > 200) { $('#inputLength').classList.add('error'); $('#errLength').classList.add('show'); $('#errLength').textContent = '长度应在 8-200m 之间'; valid = false; }
    else { $('#inputLength').classList.remove('error'); $('#errLength').classList.remove('show'); }
    if (W < 6 || W > 70) { $('#inputWidth').classList.add('error'); $('#errWidth').classList.add('show'); $('#errWidth').textContent = '跨度应在 6-70m 之间'; valid = false; }
    else { $('#inputWidth').classList.remove('error'); $('#errWidth').classList.remove('show'); }
    // 跨度超过24m自动加中柱
    if (W > 24 && !state.hasMiddleColumn) {
      state.hasMiddleColumn = true;
      updateRadioGroup('midColumn');
      renderDiagram();
    }
    if (H < 3 || H > 12) { $('#inputHeight').classList.add('error'); $('#errHeight').classList.add('show'); $('#errHeight').textContent = '檐高应在 3-12m 之间'; valid = false; }
    else { $('#inputHeight').classList.remove('error'); $('#errHeight').classList.remove('show'); }
    return valid;
  }
  return true;
}

// ====== 计算 ======
// 从 state 构造引擎参数（over 可覆盖柱距/截面/檩距等，供省钢试算用）
function makeParams(over) {
  const o = Object.assign({
    columnSpacing: state.columnSpacing,
    sectionType: state.sectionType,
    roofPurlinSpacing: state.roofPurlinSpacing,
    wallPurlinSpacing: state.wallPurlinSpacing,
  }, over || {});
  return {
    length: state.length * 1000,
    width: state.width * 1000,
    height: state.height * 1000,
    hasMiddleColumn: state.hasMiddleColumn,
    isTapered: o.sectionType === 'tapered',
    roofPurlinSpacing: o.roofPurlinSpacing * 1000,
    wallPurlinSpacing: o.wallPurlinSpacing * 1000,
    columnSpacing: o.columnSpacing * 1000,
    hasParapet: state.hasParapet,
    parapetHeight: state.parapetHeight * 1000,
    snowLoad: state.snowLoad || 0.5,      // kN/m²（力学选型）
    windLoad: state.basicWind || state.windLoad || 0.45,   // 兼容旧字段名（engine 内部仍认 windLoad 作兜底）
    basicWind: state.basicWind || 0.45,   // kN/m² 基本风压 w₀（2026-09-27 r39）
    windZone: state.windZone || 'henan',
    daylightCount: state.daylightCount != null ? state.daylightCount : 1,  // 采光带道数
    // 行车（吊车）2026-09-28 r40
    hasCrane: !!state.hasCrane,
    craneTonnage: state.craneTonnage === 10 ? 10 : 5,
    craneGrade: state.craneGrade === 'A6A8' ? 'A6A8' : 'A3A5',
    craneRailHeight: (state.craneRailHeight && state.craneRailHeight > 0) ? state.craneRailHeight * 1000 : 0,
    windowScheme: state.windowScheme,
    winWidth: state.winWidth * 1000,
    winHeight: state.winHeight * 1000,
    sillHeight: state.sillHeight * 1000,
    location: state.winLocation,
    count: state.winCount,
    autoLayout: state.autoLayout,
    // 门（引擎按柱距布窗时要把门占的柱距扣掉）
    doorCount: state.doorCount,
    doorWidth: state.doorWidth * 1000,
    doorHeight: state.doorHeight * 1000,
    doorOnWall: state.doorOnWall,
    // 夹层
    hasMezzanine: state.mezzanineLevels >= 1,
    mezzRatio: state.mezz1Ratio,
    mezzUse: state.mezz1Use,
    hasMezzanine2: state.mezzanineLevels >= 2,
    mezz2Ratio: state.mezz1Ratio,  // 二层复用一层面积占比
    mezz2Use: state.mezz2Use,
    mezzColSpacing: state.mezzColSpacing * 1000,
  };
}

function recalculate() {
  readStep1();
  saveState();

  const params = makeParams();

  try {
    state.result = calculateAll(params);
    updatePreview();
    updateRealtimePreview();
    renderDiagram();
  } catch(e) {
    console.error('计算错误', e);
  }
}

// ====== 实时预览更新 ======
function updateRealtimePreview() {
  const r = state.result;
  if (!r) return;
  $('#pvRoofPurlin').textContent = r.roofPurlin.weight.toLocaleString('zh-CN', { maximumFractionDigits: 0 });
  $('#pvWallPurlin').textContent = r.wallPurlin.weight.toLocaleString('zh-CN', { maximumFractionDigits: 0 });
  $('#pvMainSteel').textContent = r.main.total.toLocaleString('zh-CN', { maximumFractionDigits: 0 });

  // 夹层预览
  if (r.mezzanine && r.mezzanine.hasMezzanine) {
    $('#mezzPreviewArea').textContent = r.mezzanine.area.toFixed(0);
    $('#mezzPreviewCol').textContent = r.mezzanine.column ? r.mezzanine.column.spec + ' ×' + r.mezzanine.totalCols + '根' : '—';
    $('#mezzPreviewBeam').textContent = r.mezzanine.beam ? r.mezzanine.beam.spec : '—';
    $('#mezzPreviewSteel').textContent = r.mezzanine.total.toFixed(0);
    $('#mezzPreviewBox').style.display = 'block';
  } else {
    $('#mezzPreviewBox').style.display = 'none';
  }

  // 二层夹层预览
  if (r.mezzanine2 && r.mezzanine2.hasMezzanine) {
    $('#mezz2PreviewArea').textContent = r.mezzanine2.area.toFixed(0);
    $('#mezz2PreviewCol').textContent = r.mezzanine2.column ? r.mezzanine2.column.spec + ' ×' + r.mezzanine2.totalCols + '根(通高7.2m)' : '—';
    $('#mezz2PreviewBeam').textContent = r.mezzanine2.beam ? r.mezzanine2.beam.spec : '—';
    $('#mezz2PreviewSteel').textContent = r.mezzanine2.total.toFixed(0);
    const mb2 = $('#mezz2PreviewBox');
    if (mb2) mb2.style.display = 'block';
  } else {
    const mb2 = $('#mezz2PreviewBox');
    if (mb2) mb2.style.display = 'none';
  }

  if (state.step >= 2) {
    $('#incSteel').textContent = r.parapet.steelIncrement > 0 ? `+ ${r.parapet.steelIncrement.toFixed(0)}` : '+ 0';
    $('#incEnclosure').textContent = r.parapet.enclosureIncrement > 0 ? `+ ${r.parapet.enclosureIncrement.toFixed(0)}` : '+ 0';
  }

  // 行车预览（2026-09-28 r40）
  if (r.crane && r.crane.on) {
    $('#cranePreviewBeam').textContent = r.crane.beam.spec + ' · ' + r.crane.beamKg.toFixed(1) + ' kg/m · ' + r.crane.beamCount + ' 条';
    $('#cranePreviewLoad').textContent = r.crane.wheelP.toFixed(1) + ' kN · 轨顶 ' + r.crane.railH.toFixed(2) + ' m';
    $('#cranePreviewCorbel').textContent = r.crane.corbelCount + ' 个 × ' + r.crane.corbelKg + ' kg';
    var cbc = $('#cranePreviewCol');
    if (cbc) {
      var cb = r.main.colBase;
      cbc.textContent = r.main.column.spec
        + (cb ? (cb.spec !== r.main.column.spec ? ' ↑ 加大（原 ' + cb.spec + '）' : '（验算通过·未加大）') : '');
    }
    $('#cranePreviewSteel').textContent = r.crane.weight.toFixed(0);
  } else {
    ['cranePreviewBeam', 'cranePreviewLoad', 'cranePreviewCorbel', 'cranePreviewCol', 'cranePreviewSteel']
      .forEach(function (id) { var e = $('#' + id); if (e) e.textContent = '—'; });
  }
}

function updatePreview() {
  const r = state.result;
  if (!r) return;

  const L = state.length.toFixed(1);
  const W = state.width.toFixed(1);
  const H = state.height.toFixed(1);
  $('#dimL').textContent = L;
  $('#dimW').textContent = W;
  $('#dimH').textContent = H;

  $('#statMain').textContent = r.main.total.toLocaleString('zh-CN', { maximumFractionDigits: 0 }) + ' kg';
  $('#statPurlin').textContent = (r.roofPurlin.weight + r.wallPurlin.weight).toLocaleString('zh-CN', { maximumFractionDigits: 0 }) + ' kg';
  $('#statTotal').textContent = r.totalSteel.toLocaleString('zh-CN', { maximumFractionDigits: 0 }) + ' kg';
  // 人民币估算（分项单价求和，与报价清单口径一致）
  $('#statCNY').textContent = '¥ ' + Math.round(estimateCNY(r)).toLocaleString('zh-CN', { maximumFractionDigits: 0 });
}

// ====== 生成报告 ======
function generateReport() {
  const r = state.result;
  if (!r) return;

  const panel = $('#resultPanel');
  panel.style.display = 'block';

  // 核心指标卡片
  const baseArea = state.length * state.width;
  const mz1Area = r.mezzanine && r.mezzanine.hasMezzanine ? r.mezzanine.area : 0;
  const mz2Area = r.mezzanine2 && r.mezzanine2.hasMezzanine ? r.mezzanine2.area : 0;
  const area = baseArea + mz1Area + mz2Area;
  const steelPerSqm = r.totalSteel / area;
  const bench = getBenchmarkInfo(area, steelPerSqm);

  $('#resultCards').innerHTML = `
    <div class="result-card rc-primary"><div class="rc-val">${(r.totalSteel/1000).toFixed(2)} 吨</div><div class="rc-label">总用钢量</div></div>
    <div class="result-card rc-bench"><div class="rc-val">${steelPerSqm.toFixed(1)} kg/m²</div><div class="rc-label">单方用钢量</div><div class="rc-bench-badge ${bench.cls}">${bench.text}</div></div>
    <div class="result-card"><div class="rc-val">${area.toFixed(0)} m²</div><div class="rc-label">建筑面积</div></div>
    <div class="result-card"><div class="rc-val">${r.windows.totalArea.toFixed(1)} m²</div><div class="rc-label">门窗面积</div></div>
  `;

  // 重置对比区
  const compSec = $('#compareSection');
  if (compSec) compSec.style.display = state.hasParapet ? 'block' : 'none';
  const compToggle = $('#compareToggle');
  if (compToggle) compToggle.textContent = state.hasParapet ? '📊 对比方案 (不带女儿墙)' : (state.hasMiddleColumn ? '📊 对比方案 (无中柱)' : '📊 对比方案 (有中柱)');

  // 分项明细表格（三列：项目/规格/数量）
  const tbody = $('#resultTable tbody');
  tbody.innerHTML = r.breakdown.map(row => {
    let value, note;
    if (row.count != null) {
      value = `${row.count.toLocaleString('zh-CN')} ${row.countUnit || ''}`;
    } else if (row.weight > 0 && row.weight >= 100) {
      value = `${(row.weight / 1000).toFixed(2)} t`;
    } else if (row.weight > 0 && row.length > 0) {
      value = `${row.length.toFixed(0)} m  /  ${row.weight.toFixed(0)} kg`;
    } else if (row.weight > 0) {
      value = `${row.weight.toFixed(0)} kg`;
    } else if (row.area > 0) {
      value = `${row.area.toFixed(0)} m²`;
    } else if (row.length > 0) {
      value = `${row.length.toFixed(0)} m`;
    } else {
      value = '—';
    }
    return `<tr><td>${row.item}</td><td>${row.spec}</td><td>${value}</td></tr>`;
  }).join('');
  $('#totalSteelCell').innerHTML = `<strong>${(r.totalSteel/1000).toFixed(2)} t</strong>`;

  // 女儿墙 + 天沟专项
  const paraHTML = state.hasParapet
    ? `▸ 女儿墙(${r.parapet.ibSpec || '工字钢'}·女儿柱${r.parapet.postCount}根)：钢材 +${r.parapet.steelIncrement.toFixed(0)} kg，围护 +${r.parapet.enclosureIncrement.toFixed(1)} m²，天沟 ${r.parapet.gutterLength.toFixed(0)}m(2列)`
    : '▸ 未设置女儿墙';

  // 维护系统（三列）
  const mtnRows = r.maintenance.map(m => {
    let val;
    if (m.area) val = `${m.area.toFixed(0)} m²`;
    else if (m.length) val = `${m.length.toFixed(0)} m`;
    else val = '—';
    return `<tr><td>${m.item}</td><td>${m.spec}</td><td>${val}</td></tr>`;
  }).join('');

  tbody.innerHTML += mtnRows;
  $('#resultParapet').innerHTML = paraHTML;

  // 檩条 / 抗风柱选型依据（2026-09-27 r39）
  renderPurlinBasis(r);

  // 行车选型依据（2026-09-28 r40）
  renderCraneBasis(r);

  // 省钢量推荐
  renderSteelOptimize();

  // 建筑图参考（平面 + 立面 + 参考图纸）
  renderArchRef();

  // 滚动到结果
  panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ====== 檩条 / 抗风柱选型依据（2026-09-27 r39：按荷载反算，替原纯跨度查表） ======
function renderPurlinBasis(r) {
  const box = $('#purlinBasis');
  if (!box) return;
  if (!r || !r.roofPurlin || !r.wallPurlin || !r.roofPurlin.purlinInfo) { box.style.display = 'none'; return; }
  try {
    const w = r.wind || {};
    const infos = [r.roofPurlin.purlinInfo, r.wallPurlin.purlinInfo];
    const names = ['屋面檩条', '墙面檩条'];
    const specs = [r.roofPurlin.spec, r.wallPurlin.spec];
    const wts = [r.roofPurlin.weight, r.wallPurlin.weight];
    const wcs = r.windColumn;
    const gv = function (g) { return g === 'defl' ? '挠度' : '强度'; };

    let h = '<div class="pb-header">🔩 檩条 / 抗风柱选型依据 <span class="pb-sub">'
      + 'Q235B 冷弯薄壁 f=205 N/mm² · 挠度限值 L/150 · 强度与挠度双控'
      + '</span></div>'
      + '<div class="pb-wind">基本风压 w₀ <strong>' + (w.w0 || 0).toFixed(2) + '</strong> kN/m²'
      + '　檐高 ' + (w.zEave || 0).toFixed(1) + ' m　μz <strong>' + (w.muzEave || 1).toFixed(2) + '</strong>'
      + '　→ 墙面 wk <strong>' + (w.wkWall || 0).toFixed(2) + '</strong> / 屋面 wk <strong>'
      + (w.wkRoof || 0).toFixed(2) + '</strong> kN/m²</div>'
      + '<table class="pb-table"><thead><tr><th>构件</th><th>跨度</th><th>受荷宽</th>'
      + '<th>截面需求</th><th>控制项</th><th>选定方案</th><th class="pb-col-alt">对比方案</th><th>重量</th></tr></thead><tbody>';

    infos.forEach(function (info, i) {
      const altTxt = info.alt
        ? (info.alt.modelName + ' ' + info.alt.spec + '<br><span class="pb-mini">'
          + info.alt.perM.toFixed(2) + ' kg/m</span>')
        : '—';
      let saveTxt = '两者持平';
      if (info.contSave > 0.005) saveTxt = '<span class="pb-save">连续搭接省 ' + (info.contSave * 100).toFixed(1) + '%</span>';
      else if (info.contSave < -0.005) saveTxt = '<span class="pb-more">简支省 ' + (-info.contSave * 100).toFixed(1) + '%</span>';
      h += '<tr><td>' + names[i] + '</td><td>' + info.span.toFixed(1) + ' m</td><td>'
        + info.spacing.toFixed(1) + ' m</td>'
        + '<td>Wx ' + (info.Wreq / 1e3).toFixed(1) + ' cm³<br><span class="pb-mini">Ix '
        + (info.Ireq / 1e4).toFixed(0) + ' cm⁴</span></td>'
        + '<td>' + gv(info.gov) + '</td>'
        + '<td><strong>' + specs[i].split(' (')[0] + '</strong><br><span class="pb-mini">'
        + info.modelName + (info.model === 'continuous' ? '（下料 ×' + info.lenFac.toFixed(2) + '）' : '')
        + '</span></td>'
        + '<td class="pb-alt">' + altTxt + '<br>' + saveTxt + '</td>'
        + '<td>' + (wts[i] / 1000).toFixed(2) + ' t</td></tr>';
    });
    h += '</tbody></table>';

    if (wcs && wcs.count > 0) {
      h += '<div class="pb-wc">🪜 <strong>抗风柱</strong>　' + wcs.spec + '　' + wcs.count + ' 根 · 间距 '
        + wcs.step.toFixed(2) + ' m · 最高 ' + wcs.maxHt.toFixed(2) + ' m · 平均 '
        + wcs.avgKg.toFixed(1) + ' kg/m<br><span class="pb-mini">按 wk ' + wcs.wk.toFixed(2)
        + ' kN/m² 反算（原为按柱顶高度分档，≥12m 直接套主刚架柱）</span></div>';
      if (wcs.suggest) h += '<div class="pb-tip">💡 ' + wcs.suggest.reason + '</div>';
    }
    h += '<div class="pb-foot">⚠️ w₀ 供商务报价参考：中国地区摘自 GB 50009-2012 附录 E，'
      + '海外地区按当地常见设计风速折算。正式设计须按项目所在国规范与气象资料核准；'
      + '抗风柱按「柱顶与屋面梁铰接（系杆/弹簧板）+ 柱底固接」假定，受弯按 qH²/8 取值。</div>';

    box.innerHTML = h;
    box.style.display = 'block';
  } catch (e) {
    console.error('选型依据渲染失败', e);
    box.style.display = 'none';
  }
}

// ====== 行车选型依据（2026-09-28 r40：吊车梁按荷载反算，配套件只计牛腿+连接件） ======
function renderCraneBasis(r) {
  const box = $('#craneBasis');
  if (!box) return;
  if (!r || !r.crane || !r.crane.on) { box.style.display = 'none'; return; }
  try {
    const c = r.crane, bm = c.beam;
    const gv = bm.gov === 'defl' ? '挠度' : '强度';
    let h = '<div class="pb-header">🏗 行车选型依据 <span class="pb-sub">'
      + 'Q355 焊接H型钢吊车梁 f=305 N/mm² · 强度与挠度双控 · 挠度限值 L/' + bm.deflN + '</span></div>'
      + '<div class="pb-wind">' + c.tonnage + ' t 行车（' + c.gradeName + '）　吊车跨度 <strong>' + c.craneSpan.toFixed(1)
      + '</strong> m　最大轮压 <strong>' + c.wheelP.toFixed(1) + '</strong> kN　横向水平力 <strong>'
      + c.trolleyT.toFixed(2) + '</strong> kN/轮　动力系数 λ <strong>' + bm.lam.toFixed(2) + '</strong></div>'
      + '<table class="pb-table"><thead><tr><th>构件</th><th>梁跨</th><th>截面需求</th><th>控制项</th>'
      + '<th>选定规格</th><th>数量</th><th>重量</th></tr></thead><tbody>';
    h += '<tr><td>吊车梁</td><td>' + c.span.toFixed(1) + ' m</td>'
      + '<td>Wx ' + (bm.Wreq / 1e3).toFixed(0) + ' cm³<br><span class="pb-mini">Ix '
      + (bm.Ireq / 1e4).toFixed(0) + ' cm⁴</span></td>'
      + '<td>' + gv + '</td>'
      + '<td><strong>' + bm.spec + '</strong><br><span class="pb-mini">' + c.beamKg.toFixed(1) + ' kg/m</span></td>'
      + '<td>' + c.beamCount + ' 条<br><span class="pb-mini">' + c.beamTotalLen.toFixed(0) + ' m</span></td>'
      + '<td>' + (c.beamWeight / 1000).toFixed(2) + ' t</td></tr>';
    h += '<tr><td>牛腿+连接件</td><td>—</td><td>—</td><td>构造</td>'
      + '<td><strong>单重 ' + c.corbelKg + ' kg</strong><br><span class="pb-mini">含支承板/加劲肋</span></td>'
      + '<td>' + c.corbelCount + ' 个</td>'
      + '<td>' + (c.corbelWeight / 1000).toFixed(2) + ' t</td></tr>';
    h += '</tbody></table>';

    const cb = r.main.colBase;
    const colUp = cb && cb.spec !== r.main.column.spec;
    h += '<div class="pb-wc">🏛 <strong>主刚架柱（吊车工况）</strong>　' + r.main.column.spec
      + (cb ? '　无行车时 ' + cb.spec + (colUp ? ' → <strong>已按吊车荷载加大</strong>' : ' → 验算通过，未加大') : '')
      + '<br><span class="pb-mini">柱内力附加：ΔN ' + (c.colN / 1000).toFixed(1) + ' kN　ΔM '
      + (c.colM / 1e6).toFixed(1) + ' kN·m（竖向轮压偏心 0.45m + 横向水平力 × 轨顶 '
      + c.railH.toFixed(2) + ' m）· 图集要求支承吊车梁的柱宽 ≥300mm</span></div>';
    h += '<div class="pb-foot">⚠️ 吊车整机自重与最大轮压按通用桥式吊车经验式估算'
      + '（G ≈ 0.75Q + 0.35Lk + 2.5），正式设计须以吊车厂资料与图集（03SG520 / 20G520）核准；'
      + '轨道、车挡、制动结构、走道板未计入本工具工程量，如需计量请单独说明。</div>';

    box.innerHTML = h;
    box.style.display = 'block';
  } catch (e) {
    console.error('行车选型依据渲染失败', e);
    box.style.display = 'none';
  }
}

// ====== 省钢量推荐（柱距×截面形式×檩条间距 全组合试算，2026-09-26 康师傅确认） ======
var _steelBest = null;   // 当前最优方案（applySteelBest 用）

function computeSteelOptions() {
  const csList = [4.5, 6, 7.5];        // 柱距 ≤8m（2026-09-26 康师傅限定）
  const secList = ['tapered', 'constant'];
  const psList = [1.2, 1.5];           // 檩条间距 ≤1.5m（2026-09-26 康师傅限定）
  const opts = [];
  csList.forEach(function (cs) {
    secList.forEach(function (sec) {
      psList.forEach(function (ps) {
        try {
          const r = calculateAll(makeParams({
            columnSpacing: cs, sectionType: sec,
            roofPurlinSpacing: ps, wallPurlinSpacing: ps,
          }));
          opts.push({
            cs: cs, sectionType: sec, purlinSpacing: ps,
            totalSteel: r.totalSteel, cny: estimateCNY(r),
          });
        } catch (e) { /* 组合不可行则跳过 */ }
      });
    });
  });
  opts.sort(function (a, b) { return a.totalSteel - b.totalSteel; });
  return opts;
}

function renderSteelOptimize() {
  const box = $('#steelOptimize');
  if (!box) return;
  try {
    const opts = computeSteelOptions();
    if (!opts.length) { box.style.display = 'none'; return; }

    const curSteel = state.result ? state.result.totalSteel : 0;
    const curCny = state.result ? estimateCNY(state.result) : 0;
    const best = opts[0];
    _steelBest = best;

    const isCurBest = best.cs === state.columnSpacing
      && best.sectionType === state.sectionType
      && best.purlinSpacing === state.roofPurlinSpacing;
    const saveKg = curSteel - best.totalSteel;
    const saveYuan = curCny - best.cny;
    const secName = function (s) { return s === 'tapered' ? '变截面' : '等截面'; };
    const area = state.length * state.width
      + (state.result.mezzanine && state.result.mezzanine.hasMezzanine ? state.result.mezzanine.area : 0)
      + (state.result.mezzanine2 && state.result.mezzanine2.hasMezzanine ? state.result.mezzanine2.area : 0);

    const rowsHtml = opts.slice(0, 3).map(function (o, i) {
      const d = curSteel - o.totalSteel;
      const delta = d > 0
        ? '<span class="so-save">省 ' + Math.round(d).toLocaleString('zh-CN') + ' kg</span>'
        : (d < 0 ? '<span class="so-more">多 ' + Math.round(-d).toLocaleString('zh-CN') + ' kg</span>' : '<span class="so-same">持平</span>');
      return '<tr' + (i === 0 ? ' class="so-best"' : '') + '><td>'
        + (i === 0 ? '🥇 最优' : 'No.' + (i + 1)) + '</td><td>' + o.cs + ' m</td><td>'
        + secName(o.sectionType) + '</td><td>' + o.purlinSpacing + ' m</td><td>'
        + (o.totalSteel / 1000).toFixed(2) + ' t</td><td>'
        + (o.totalSteel / area).toFixed(1) + '</td><td>'
        + '¥' + Math.round(o.cny).toLocaleString('zh-CN') + '</td><td>' + delta + '</td></tr>';
    }).join('');

    const summary = isCurBest
      ? '<div class="so-summary so-ok">✅ 当前参数（柱距' + state.columnSpacing + 'm · ' + secName(state.sectionType)
        + ' · 檩距' + state.roofPurlinSpacing + 'm）已是试算范围内最省钢方案</div>'
      : '<div class="so-summary">当前 <strong>' + (curSteel / 1000).toFixed(2) + ' t</strong>（¥' + Math.round(curCny).toLocaleString('zh-CN')
        + '）→ 最优 <strong>' + (best.totalSteel / 1000).toFixed(2) + ' t</strong>：柱距 <strong>' + best.cs + 'm</strong> · '
        + '<strong>' + secName(best.sectionType) + '</strong> · 檩条间距 <strong>' + best.purlinSpacing + 'm</strong>'
        + '　可省 <strong class="so-save">' + Math.round(saveKg).toLocaleString('zh-CN') + ' kg</strong>（'
        + (saveKg / curSteel * 100).toFixed(1) + '%）≈ <strong class="so-save">¥' + Math.round(saveYuan).toLocaleString('zh-CN') + '</strong>'
        + '　<button class="so-apply" onclick="applySteelBest()">⚡ 一键应用最优方案</button></div>';

    box.innerHTML = '<div class="so-header">💡 省钢量推荐 <span class="so-sub">试算 12 组合：柱距 4.5/6/7.5m（≤8m） × 变/等截面 × 檩距 1.2/1.5m（≤1.5m）（仅钢量对比，不含运输安装差异）</span></div>'
      + summary
      + '<table class="so-table"><thead><tr><th>排名</th><th>柱距</th><th>截面</th><th>檩距</th><th>总钢量</th><th>单方 kg/m²</th><th>估算报价</th><th>对比</th></tr></thead><tbody>'
      + rowsHtml + '</tbody></table>';
    box.style.display = 'block';
  } catch (e) {
    console.error('省钢推荐计算失败', e);
    box.style.display = 'none';
  }
}

// 一键应用最优方案：改 state + 同步高级参数 UI + 重算重渲染
function applySteelBest() {
  if (!_steelBest) return;
  const b = _steelBest;
  state.columnSpacing = b.cs;
  state.sectionType = b.sectionType;
  state.roofPurlinSpacing = b.purlinSpacing;
  state.wallPurlinSpacing = b.purlinSpacing;
  // 同步 UI（高级参数区）
  $('#columnSpacing').value = String(b.cs);
  $('#columnSpacingCustom').style.display = 'none';
  $$('input[name="sectionType"]').forEach(function (r) { r.checked = (r.value === b.sectionType); });
  updateRadioGroup('sectionType');
  $('#roofSpacing').value = String(b.purlinSpacing);
  $('#roofSpacingCustom').style.display = 'none';
  $('#wallSpacing').value = String(b.purlinSpacing);
  $('#wallSpacingCustom').style.display = 'none';
  saveState();
  recalculate();
  generateReport();
  if (typeof toast === 'function')
    toast('已应用：柱距' + b.cs + 'm · ' + (b.sectionType === 'tapered' ? '变截面' : '等截面') + ' · 檩距' + b.purlinSpacing + 'm');
}


// ====== 建筑图参考（自动生成平面图 + 轴立面图 + 参考方案图纸，2026-09-26 康师傅要求） ======
// 图纸随参数联动；导出 PNG 时用「打印配色」（白底深线），页面显示用主题配色
var ARCH_DWGS = [
  ['dwg01', '轴立面墙板布置图（1 / 10 / A / D 轴）'],
  ['dwg02', '屋面板布置图'],
  ['dwg03', '(0.000) 柱脚螺栓布置图'],
  ['dwg04', '(6.000) 第 1 层柱子平面布置图'],
  ['dwg05', '(6.000) 系杆（檩条）布置图'],
  ['dwg06', '(9.000) 第 2 层梁平面布置图'],
  ['dwg07', '屋面檩条布置图（C220×75×20×2.5）'],
  ['dwg08', '轴立面墙板布置图（C160 墙梁）'],
  ['dwg09', '山墙用大撑布置图'],
  ['dwg10', 'GJ-1 / GJ-2 / GJ-3 刚架立面布置图']
];

function _archPalette(print) {
  if (print) return { text: '#1D2129', sub: '#4E5969', hint: '#86909C', line: '#1D2129',
    grid: '#C9CDD4', accent: '#0C3B6E', steel: '#86909C', dark: '#0C3B6E',
    band: '#E8F1F9', bg: '#FFFFFF',
    wallFill: '#ECEEF0', roofFill: '#E2E6E9', paraFill: '#6B7178', brace: '#4682B4', seam: '#C2C7CC', halo: '#FFFFFF' };
  var cs = getComputedStyle(document.documentElement);
  function g(n, d) { var v = (cs.getPropertyValue(n) || '').trim(); return v || d; }
  return {
    text: g('--text', '#1D2129'),
    sub: g('--text-secondary', '#4E5969'),
    hint: g('--text-hint', '#86909C'),
    line: g('--line-2', g('--border', '#C9CDD4')),
    grid: g('--border', '#C9CDD4'),
    accent: g('--yellow', g('--primary', '#0C3B6E')),
    steel: g('--steel', '#86909C'),
    dark: g('--text', '#1D2129'),
    band: g('--bg-preview', 'rgba(140,150,165,0.12)'),
    bg: 'transparent',
    wallFill: 'rgba(148,158,168,0.16)', roofFill: 'rgba(148,158,168,0.10)',
    paraFill: 'rgba(74,80,88,0.85)', brace: '#4682B4', seam: g('--border', '#C9CDD4'),
    halo: g('--bg-card', '#1A1E23')
  };
}

// ====== 图纸英文化（2026-09-28 业务员版）======
// 英文方案书里的 7 张自动图纸，图内标注由下面的规则表统一英译。
// 挂点：_canvas() 的 tx / txh / out —— 只在生成英文方案书时 _DWG_EN 为真，
// 中文界面与中文方案书完全不受影响（false 时 _dwgTr 原样返回）。
// 规则按「先长后短」排序：带数字的整句在前，静态短语在后。
var _DWG_EN = false;
var _DWG_RULES = [
  // —— 带数字的长句 ——
  [/单跨 ([\d.]+) m × 2（中柱）· 总宽 ([\d.]+) m/g, 'Single span $1 m × 2 (center column) · Overall width $2 m'],
  [/ · 屋脊\(([\d.]+)m\)在女儿墙后，立面不可见/g, ' · ridge hidden behind parapet'],
  [/梁分段按受力：檐口侧楔形 ([\d.]+)% \+ 屋脊侧直梁 ([\d.]+)% · 榀数 ([\d.]+) · 柱距 ([\d.]+) m · Q355B/g,
    'Beam split: eave tapered $1% + ridge straight $2% · frames $3 · spacing $4 m · Q355B'],
  [/屋面檩条 (.+?) @([\d.]+)m 档 · 实排 ([\d.]+) 道\/榀（([\d.]+) 道\/半坡，档距 ([\d.]+)m）/g,
    'Roof purlins $1 @$2 m · actual $3/frame ($4/slope, $5 m)'],
  [/节点：柱脚底板 \+ (.+?) 锚栓（每柱 4 根）· 梁柱 10\.9S 高强螺栓 · 屋脊对接 · 尺寸 mm \/ 标高 m/g,
    'Joints: base + $1 anchors (4/col) · 10.9S HS bolts · ridge splice · mm / m'],
  [/节点：柱脚（底板\+(.+?)）· 梁柱（10\.9S 高强螺栓）· 屋脊/g,
    'Joints: column base (plate + $1) · beam-column (10.9S HS bolts) · ridge'],
  [/柱脚共 ([\d]+) 处（J-1 边柱 \/ J-2 中柱）· 地脚螺栓 (.+?) · 钢柱 /g,
    '$1 bases (J-1 edge/J-2 center) · anchors $2 · Column '],
  [/地脚螺栓 (.+?) · 每柱 4 根/g, 'Anchor bolts $1 · 4 per column'],
  [/山墙竖装板缝@0\.9m\(900型\) · 檩条 ([\d]+) 道\/半坡（([\d]+) 道\/榀）· 实排档距 ([\d.]+)m/g,
    'Gable sheet @0.9m(900) · purlins $1/pitch ($2/frame) · actual $3 m'],
  [/ · 墙梁\/檩距按 ([\d.]+)m 档 · 窗台 ([\d.]+)m 对齐墙梁线/g, ' · girt $1 m · sill $2 m on girt line'],
  [/ · 窗清单按输入 ([\d]+) 扇计（图上每跨示意 1 扇）/g, ' · window schedule by input of $1 (1 per bay shown)'],
  [/ · 本墙 ([\d]+) 樘门/g, ' · $1 doors'],
  [/ · 檩条 ([\d]+) 道\/榀（([\d]+) 道\/半坡 · 档距 ([\d.]+)m 实排 ([\d.]+)m）/g,
    ' · purlins $1/frame ($2/slope, $3→$4 m)'],
  [/ · 采光带 ([\d]+) 道（FRP 1\.0m 宽·屋脊对称）/g, ' · skylight $1 (FRP 1.0m, symmetric at ridge)'],
  [/ · 榀数 ([\d]+)/g, ' · frames $1'],
  [/ · 女儿墙 ([\d.]+)\s?m/g, ' · parapet $1 m'],
  [/ · 中柱 1 排/g, ' · one center-column row'],
  [/总长 ([\d.]+) m（(.+?)）/g, 'Total length $1 m ($2)'],
  [/总宽 ([\d.]+) m/g, 'Overall width $1 m'],
  [/跨度 ([\d.]+) m/g, 'Span $1 m'],
  [/檐高 ([\d.]+)\s?m/g, 'Eave height $1 m'],
  [/脊高 ([\d.]+)\s?m/g, 'Ridge height $1 m'],
  [/屋脊 ([\d.]+)\s?m/g, 'Ridge $1 m'],
  [/女儿墙 ([\d.]+)\s?m/g, 'Parapet $1 m'],
  [/坡度 i=([\d.]+)%/g, 'Slope i=$1%'],
  [/门 ([\d.]+)×([\d.]+)m/g, 'Door $1×$2 m'],
  [/窗 ([\d.]+)×([\d.]+)m/g, 'Window $1×$2 m'],
  [/楔形([\d]+)%\+直梁([\d]+)%/g, 'Tapered $1% + Straight $2%'],
  [/檐口侧楔形 ([\d.]+)% \+ 屋脊侧直梁 ([\d.]+)%/g, 'eave-side tapered $1% + ridge-side straight $2%'],

  // —— 静态短语（长串在前，避免被短串截断）——
  [/基础平面布置图/g, 'Foundation Plan'],
  [/平面图（轴线 \/ 柱位 \/ 檩条）/g, 'Plan (grid / columns / purlins)'],
  [/平面布置图/g, 'Plan Layout'],
  [/自动生成的钢结构平面轴网图/g, 'Auto-generated structural grid drawing'],
  [/ⓐ 端立面图（左山墙 · ①轴 · 看宽度）/g, 'ⓐ End Elevation (left gable·axis ①)'],
  [/ⓓ 端立面图（右山墙 · 末轴 · 看宽度）/g, 'ⓓ End Elevation (right gable·last axis)'],
  [/Ⓑ 纵立面图（前纵墙 · A 轴）/g, 'Ⓑ Side Elevation (front·axis A)'],
  [/Ⓒ 纵立面图（后纵墙 · 末轴）/g, 'Ⓒ Side Elevation (rear·last axis)'],
  [/ · 每跨一扇窗示意/g, ' · 1 window/bay'],
  [/ · 本墙无门 · 全窗布置/g, ' · no door on this wall · full window layout'],
  [/（已避柱间支撑）/g, ' (clear of bracing)'],
  [/（⚠门位未能避开支撑）/g, ' (⚠ door could not clear bracing)'],
  [/右山墙端立面图/g, 'Right Gable End Elevation'],
  [/左山墙端立面图/g, 'Left Gable End Elevation'],
  [/山墙方向立面，含屋面坡度、檩条布置与两端轴线号（(.+?)）/g,
    'Gable elevation: roof slope, purlin layout and end axis labels ($1)'],
  [/柱间支撑/g, 'Column Bracing'],
  [/ · 女儿墙深灰/g, ' · parapet dark grey'],
  [/墙面竖装板缝@0\.9m\(900型\) · 银白彩钢瓦/g, 'Wall sheet @0.9m(900) · silver-white'],
  [/屋脊侧起步 200mm \/ 檐口侧 150mm · 屋脊瓦通长（粗线示意）/g,
    'Ridge offset 200mm / eave 150mm · ridge cap full length (thick)'],
  [/后纵墙立面图/g, 'Rear Wall Side Elevation'],
  [/前纵墙立面图/g, 'Front Wall Side Elevation'],
  [/长边方向立面（含门窗布置与柱位轴线号）/g, 'Long-side elevation (openings and column axis labels)'],
  [/，本墙无门/g, ', no door on this wall'],
  [/独立基础（示意轮廓）/g, 'Pad footing (schematic)'],
  [/基础尺寸、埋深与配筋详结构计算（图中基础轮廓为示意，不表示实际尺寸）/g,
    'Foundation size/depth/rebar per structural calc (outline schematic)'],
  [/柱脚底板与加劲肋随柱截面配套/g, 'Base plate and stiffeners matched to column section'],
  [/柱脚位置与独立基础布置示意（尺寸详结构计算）/g,
    'Column bases & pad footings (schematic; sizes per structural calc)'],
  [/钢梁（变截面）/g, 'Beam (tapered)'],
  [/钢柱/g, 'Column'],
  [/钢梁/g, 'Beam'],
  [/柱网 /g, 'Grid '],
  [/单榀刚架剖面图（全标注）/g, 'Single Frame Section (fully annotated)'],
  [/单榀刚架剖面图/g, 'Single Frame Section'],
  [/门式刚架单榀剖面，含柱梁截面、梁分段、檩条与节点标注/g,
    'Portal frame section: column/beam sections, beam split, purlins, joints']
];

function _dwgTr(t) {
  if (!_DWG_EN || t == null) return t;
  var s = String(t);
  for (var i = 0; i < _DWG_RULES.length; i++) s = s.replace(_DWG_RULES[i][0], _DWG_RULES[i][1]);
  return s;
}

// ====== 算量规格英译（2026-09-28 业务员版）======
// engine.js 输出的 spec/countUnit 是中文（面向国内界面），英文方案书的
// 「5. 结构算量汇总」直接复用了这些字段。这里用规则表把规格串英译，
// 不改 engine.js（避免动算量内核），中文文档完全不受影响。
var _SP_RULES = [
  // —— 檩条 / 墙梁（2026-09-27 r39：规格串改为「截面 (模型·柱距·间距·wk) · 下料口径」） ——
  [/连续搭接·柱距/g, 'Continuous lapped · column spacing '],
  [/简支·柱距/g, 'Simple span · column spacing '],
  [/·檩距/g, ' · purlin spacing '],
  [/·墙梁距/g, ' · girt spacing '],
  [/·w([\d.]+)\)/g, ' · wk $1 kN/m²)'],
  [/ · 按柱距([\d.]+)m分段×([\d]+)段\/根 · 端部外伸([\d.]+)m×2/g,
    ' · cut into $2 pcs/bar at $1 m · end overhang $3 m ×2'],
  [/ · 按柱距([\d.]+)m分段下料 · 四边闭合圈 · 门窗洞断开/g,
    ' · cut to length at $1 m · closed perimeter · broken at openings'],
  // —— 梁分段 ——
  [/ · 楔形([\d]+)%\+直梁([\d]+)%/g, ' · tapered $1% + straight $2%'],
  // —— 抗风柱 / 女儿柱 ——
  [/工([\d]+)工字钢/g, 'I-beam I$1'],
  [/\(女儿柱([\d]+)根\)/g, '($1 parapet posts)'],
  [/\(([\d]+)根\)/g, '($1 pcs)'],
  [/\(([\d]+)柱×4\)/g, '($1 columns ×4)'],
  [/共([\d]+)根/g, '$1 pcs total'],
  [/共([\d]+)套/g, '$1 sets total'],
  // —— 支撑 / 系杆 / 拉条 ——
  [/φ20圆钢交叉 · ([\d]+)道\(端部(\+中间)?\) · 柱间([\d]+)根\+屋面([\d]+)根/g,
    'φ20 crossing rods · $1 rows (ends$2) · $3 between columns + $4 on roof'],
  [/φ114×3圆管\(系杆·檐口([\d]+)道\+屋脊([\d]+)道\)/g,
    'φ114×3 tube (tie rods · $1 rows at eave + $2 row at ridge)'],
  [/φ12拉条\(直([\d]+)×2道\+斜\+墙梁\) \+ φ14×2撑杆 \+ L50×4隅撑×([\d]+)榀/g,
    'φ12 sag rods (straight $1×2 rows + diagonal + wall girts) + φ14×2 struts + L50×4 knee braces × $2 frames'],
  [/檩托板\(([\d]+)块·屋面([\d]+)\+墙面([\d]+)\)/g, 'Purlins cleats ($1 pcs · roof $2 + wall $3)'],
  [/\(女儿墙檩条·同墙梁\)/g, '(parapet girts · same as wall girts)'],
  [/\(已扣采光带([\d.]+)m²\)/g, ' (skylight $1m² deducted)'],
  [/脊瓦([\d]+)m\+窗包边([\d]+)m\+门洞包边([\d]+)m\+角柱([\d]+)m/g,
    'Ridge cap $1m + window trim $2m + door trim $3m + corner $4m'],
  [/\+泛水([\d]+)m/g, ' + flashing $1m'],
  [/\+封檐板([\d]+)m/g, ' + fascia $1m'],
  [/\(([\d]+)榀×([\d]+)节点×([\d]+)([^)]*)\)/g, '($1 frames ×$2 joints ×$3$4)'],
  [/· 含檩托板([\d]+)块/g, ' · incl. $1 purlin cleats'],
  [/含檩托板([\d]+)块/g, 'incl. $1 purlin cleats'],
  // —— 螺栓 ——
  [/M12 镀锌\(檩托板([\d]+)块×4\)/g, 'M12 galvanized ($1 purlin cleats ×4)'],
  [/M12 镀锌\(系杆\/拉条\/支撑([\d]+)连接点×4\)/g, 'M12 galvanized ($1 tie/sag/bracing joints ×4)'],
  [/M12镀锌/g, 'M12 galvanized'],
  [/M12 镀锌/g, 'M12 galvanized'],
  // —— 围护 ——
  [/0\.5mm 840型拉网岩棉\(出挑([\d.]+)m×2侧\)/g, '0.5mm Type-840 mesh rockwool ($1m overhang ×2)'],
  [/0\.5mm 840型拉网岩棉/g, '0.5mm Type-840 mesh rockwool'],
  [/0\.4mm 900型单瓦\(竖装·含女儿墙·深灰\)/g, '0.4mm Type-900 single sheet (vertical · incl. parapet · dark grey)'],
  [/0\.4mm 900型单瓦\(竖装·含山墙封板\)/g, '0.4mm Type-900 single sheet (vertical · incl. gable closure)'],
  [/0\.4mm 900型单瓦/g, '0.4mm Type-900 single sheet'],
  [/屋脊瓦/g, 'Ridge cap'],
  [/门窗包边\(窗([\d]+)扇\+门([\d]+)樘\)/g, 'Opening trim ($1 windows + $2 doors)'],
  [/角柱包边\(([\d.]+)-([\d.]+)m×4角\)/g, 'Corner trim ($1-$2m ×4 corners)'],
  [/女儿墙泛水件\(([\d]+)m\)/g, 'Parapet flashing ($1m)'],
  [/彩钢封檐板\(檐口收边·出挑([\d.]+)m\)/g, 'Fascia board (eave trim · $1m overhang)'],
  [/彩钢天沟\(2列·女儿墙内侧内天沟\)/g, 'Color steel gutter (2 runs · inner gutter behind parapet)'],
  [/彩钢天沟\(2列·檐口外天沟\)/g, 'Color steel gutter (2 runs · eave external gutter)'],
  [/镀锌钢板\(内天沟\)/g, 'Galvanized steel (inner gutter)'],
  [/镀锌钢板\(檐口外天沟\)/g, 'Galvanized steel (eave external gutter)'],
  [/FRP采光板\(1\.0m宽×([\d]+)道·屋脊对称每坡各([\d]+)条\)/g,
    'FRP daylight panel (1.0m wide × $1 runs · symmetric at ridge, $2 per slope)'],
  [/FRP采光板/g, 'FRP daylight panel'],
  [/φ160PVC落水管\(([\d]+)根·两侧间距≤25m\)/g, 'φ160 PVC downpipe ($1 pcs · spacing ≤25m both sides)'],
  [/φ160PVC落水管/g, 'φ160 PVC downpipe'],
  // —— 门窗 ——
  [/窗([\d]+)扇 ([\d.]+)×([\d.]+)m\(高对齐墙梁·上下借墙梁\)/g, '$1 windows $2×$3m (height aligned to girts)'],
  [/\+ 门([\d]+)樘 高([\d.]+)m\(两竖·顶借墙梁\)/g, '+ $1 doors H$2m (two jambs · top shares girt)'],
  [/每柱距1扇 · ([\d]+)扇窗\+([\d]+)门 · 框C型钢\(窗上下\/门顶借用墙梁\)/g,
    '1 window per bay · $1 windows + $2 doors · C-section frames (top/bottom share girts)'],
  // —— 夹层（保留基本覆盖）——
  [/压型钢板1\.0厚760型/g, 'Profiled steel deck 1.0mm Type-760'],
  [/钢管栏杆~8kg\/m/g, 'Steel pipe railing ~8kg/m'],
  [/钢梯1部\/层/g, '1 stair per level'],
  [/焊接H型钢/g, 'Welded H-section'],
  [/\(HW·通高7\.2m\)/g, '(HW · full height 7.2m)'],
  [/\(HW·高3\.6m\)/g, '(HW · height 3.6m)'],
  [/\(焊接H·一层\)/g, '(welded H · Level 1)'],
  [/\(焊接H·二层\)/g, '(welded H · Level 2)'],
  [/\(焊接H\)/g, '(welded H)'],
  [/ · 间距2\.5m/g, ' · spacing 2.5m'],
  [/ ×2层/g, ' ×2 levels'],
  [/通高7\.2m/g, 'full height 7.2m'],
  [/高3\.6m/g, 'height 3.6m'],
  // —— 计量单位 ——
  [/^根$/g, 'pcs'],
  [/^套$/g, 'sets'],
  [/^块$/g, 'pcs'],
  [/^樘$/g, 'unit'],
  [/^条$/g, 'pcs'],
  [/^延米$/g, 'ln.m']
];
function _spTr(t) {
  if (t == null) return t;
  var s = String(t);
  for (var i = 0; i < _SP_RULES.length; i++) s = s.replace(_SP_RULES[i][0], _SP_RULES[i][1]);
  return s;
}

// 文字宽度测量：优先用隐藏 canvas 的 measureText（字体与图纸 SVG 一致），失败再按字符数估算
var _measCtx = null;
function _txtW(t, size, bold) {
  var s = String(t);
  try {
    if (!_measCtx) _measCtx = document.createElement('canvas').getContext('2d');
    _measCtx.font = (bold ? '700 ' : '') + size + 'px "PingFang SC","Microsoft YaHei","Source Han Sans SC",sans-serif';
    var m = _measCtx.measureText(s).width;
    if (m > 0) return m;
  } catch (e) { }
  var sum = 0;
  for (var i = 0; i < s.length; i++) sum += (s.charCodeAt(i) > 0x2E80 ? 1.02 : 0.58);
  return sum * size;
}

// ---- 通用画板 ----
function _canvas(w, h) {
  var a = [];
  // 标注自适应：超宽先缩号（底 7），实在放不下就把标注平移到画布内（保证不越出 viewBox 被裁）
  function fitTxt(t, x, size, anchor, bold) {
    var s0 = size || 11, an = anchor || 'middle', PAD = 6;
    function availOf(xx) {
      if (an === 'start') return w - xx - PAD;
      if (an === 'end') return xx - PAD;
      return 2 * Math.min(xx - PAD, w - xx - PAD);
    }
    var avail = availOf(x), need = _txtW(t, s0, bold);
    if (need <= avail * 0.99) return { s: s0, t: t, x: x, an: an };
    window.__dwgFit = window.__dwgFit || { shrunk: 0, truncated: 0 };
    window.__dwgFit.shrunk++;
    var s1 = Math.max(7, s0 * avail * 0.96 / Math.max(0.1, need));
    var wmin = _txtW(t, s1, bold);
    var x2 = x;
    if (an === 'end') x2 = Math.min(w - PAD, Math.max(x, wmin + PAD + 2));
    else if (an === 'start') x2 = Math.max(PAD, Math.min(x, w - wmin - PAD - 2));
    else x2 = Math.min(Math.max(x, wmin / 2 + PAD + 2), w - wmin / 2 - PAD - 2);
    if (wmin <= availOf(x2) * 0.99) return { s: s1, t: t, x: x2, an: an };
    // 再退一档（部分字体 7px 处字宽非线性）
    var s2 = Math.max(7, s1 * 0.94);
    var w2 = _txtW(t, s2, bold);
    if (w2 <= availOf(x2) * 0.99) return { s: s2, t: t, x: x2, an: an };
    // 兜底：按可容纳比例截断（图内长标注宁可打点，也不能出画布被裁）
    var room = availOf(x2) * 0.94;
    var per = wmin / Math.max(1, t.length);
    var keep = Math.max(6, Math.floor(room / Math.max(0.1, per)) - 1);
    window.__dwgFit.truncated++;
    return { s: s1, t: t.slice(0, keep).replace(/[\s·+,(（]+$/, '') + '…', x: x2, an: an };
  }
  return {
    w: w, h: h,
    ln: function (x1, y1, x2, y2, c, sw, dash) {
      a.push('<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + c
        + '" stroke-width="' + (sw || 1) + '"' + (dash ? ' stroke-dasharray="' + dash + '"' : '') + '/>');
      return this;
    },
    rect: function (x, y, w2, h2, fill, stroke, sw, rx) {
      a.push('<rect x="' + x + '" y="' + y + '" width="' + w2 + '" height="' + h2 + '" rx="' + (rx || 0)
        + '" fill="' + (fill || 'none') + '"' + (stroke ? ' stroke="' + stroke + '" stroke-width="' + (sw || 0.5) + '"' : '') + '/>');
      return this;
    },
    tx: function (x, y, t, c, size, anchor, weight) {
      var f = fitTxt(String(_dwgTr(t)), x, size || 11, anchor, !!weight);
      a.push('<text x="' + f.x + '" y="' + y + '" fill="' + c + '" font-size="' + f.s
        + '" text-anchor="' + f.an + '" dominant-baseline="central"'
        + (weight ? ' font-weight="' + weight + '"' : '') + '>' + f.t + '</text>');
      return this;
    },
    ci: function (x, y, r, fill, stroke, sw) {
      a.push('<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + (fill || 'none')
        + '" stroke="' + stroke + '" stroke-width="' + (sw || 1) + '"/>');
      return this;
    },
    poly: function (pts, fill, stroke, sw) {
      a.push('<polygon points="' + pts.map(function (p) { return p[0] + ',' + p[1]; }).join(' ')
        + '" fill="' + (fill || 'none') + '"'
        + (stroke ? ' stroke="' + stroke + '" stroke-width="' + (sw || 0.5) + '"' : '') + '/>');
      return this;
    },
    // 带底色的文字（压线处保持可读，如支撑/板缝上的门窗标注）
    txh: function (x, y, t, c, size, anchor, halo) {
      var f = fitTxt(String(_dwgTr(t)), x, size || 10, anchor, false);
      a.push('<text x="' + f.x + '" y="' + y + '" fill="' + c + '" font-size="' + f.s
        + '" text-anchor="' + f.an + '" dominant-baseline="central"'
        + ' stroke="' + (halo || '#FFFFFF') + '" stroke-width="3.5" paint-order="stroke" stroke-linejoin="round"'
        + '>' + f.t + '</text>');
      return this;
    },
    out: function (title, desc) {
      return '<svg viewBox="0 0 ' + w + ' ' + h + '" width="100%" preserveAspectRatio="xMidYMid meet"'
        + ' xmlns="http://www.w3.org/2000/svg" font-family="&quot;PingFang SC&quot;,&quot;Microsoft YaHei&quot;,sans-serif"'
        + ' role="img"><title>' + _dwgTr(title) + '</title><desc>' + _dwgTr(desc) + '</desc>' + a.join('') + '</svg>';
    }
  };
}

// ---- 平面图 ----
function _archPlan(P) {
  var L = state.length, Wd = state.width, cs = state.columnSpacing, rps = state.roofPurlinSpacing;
  var fl = _frameLayout();
  var pl = _purlinLayout();
  var n = fl.n, bays = fl.bays, sp = fl.sp;
  var mid = !!state.hasMiddleColumn;
  var W = 680, Hh = 372;
  var mL = 66, mR = 48, mT = 46, mB = 104;
  var bw = W - mL - mR, bh = Hh - mT - mB;
  var s = Math.min(bw / L, bh / Wd);
  var pw = L * s, ph2 = Wd * s;
  var x0 = mL + (bw - pw) / 2, y0 = mT + (bh - ph2) / 2;
  var c = _canvas(W, Hh);
  var xEnd = x0 + pw, yEnd = y0 + ph2;

  // 檩条（沿长向布；根数取引擎 perSlope，位置按当前坡度自屋脊向外排）
  var midY = y0 + ph2 / 2;
  var pStep = pl.offs.length > 10 ? 1 : 1;
  pl.offs.forEach(function (off, i) {
    if (i % pStep) return;
    c.ln(x0, midY - off * s, xEnd, midY - off * s, P.hint, 0.5, '2 2');
    c.ln(x0, midY + off * s, xEnd, midY + off * s, P.hint, 0.5, '2 2');
  });
  // 屋脊线
  c.ln(x0, midY, xEnd, midY, P.accent, 1, '6 3');

  // 采光带（2026-09-27 康师傅口径：FRP 1.0m 宽，沿坡向通铺，屋脊对称每坡各1条）
  var dlc = state.daylightCount != null ? state.daylightCount : 1;
  if (dlc > 0) {
    var hw = 0.5 * s;
    for (var dsn = 0; dsn < 2; dsn++) {
      var yA = dsn === 0 ? y0 : midY, yB = dsn === 0 ? midY : yEnd;
      for (var dk = 0; dk < dlc; dk++) {
        var dxp = dlc === 1 ? (x0 + xEnd) / 2 : (dk === 0 ? x0 + pw * 0.25 : x0 + pw * 0.75);
        c.rect(dxp - hw, yA, hw * 2, yB - yA, 'rgba(46,134,222,0.16)', P.accent, 0.9);
        c.ln(dxp - hw, yA, dxp - hw, yB, P.accent, 0.5, '3 3');
        c.ln(dxp + hw, yA, dxp + hw, yB, P.accent, 0.5, '3 3');
      }
    }
  }

  // 轴线（竖向 = 榀，按总长均分；横向 = 跨）
  for (var k = 0; k <= bays; k++) c.ln(x0 + k * sp * s, y0 - 14, x0 + k * sp * s, yEnd + 14, P.grid, 0.6, '8 4 2 4');
  var rowY = mid ? [y0, y0 + ph2 / 2, yEnd] : [y0, yEnd];
  rowY.forEach(function (yy) { c.ln(x0 - 14, yy, xEnd + 14, yy, P.grid, 0.6, '8 4 2 4'); });

  // 外轮廓
  c.rect(x0, y0, pw, ph2, 'none', P.line, 1.2);
  // 柱位
  rowY.forEach(function (yy) {
    for (var k2 = 0; k2 <= bays; k2++) {
      var xx = x0 + k2 * sp * s;
      c.rect(xx - 3, yy - 3, 6, 6, P.dark, P.dark, 0.5);
    }
  });
  // 轴线编号
  for (var k3 = 0; k3 <= bays; k3++) {
    var xx2 = x0 + k3 * sp * s;
    var show = bays <= 11 || k3 === 0 || k3 === bays || k3 % 2 === 0;
    c.ln(xx2, yEnd + 14, xx2, yEnd + 26, P.line, 0.8);
    if (show) { c.ci(xx2, yEnd + 36, 9, 'none', P.line, 0.8); c.tx(xx2, yEnd + 36, (k3 + 1), P.text, 10); }
  }
  var letters = mid ? ['A', 'B', 'C'] : ['A', 'B'];
  rowY.forEach(function (yy, idx) {
    c.ln(x0 - 26, yy, x0 - 14, yy, P.line, 0.8);
    c.ci(x0 - 36, yy, 9, 'none', P.line, 0.8);
    c.tx(x0 - 36, yy, letters[idx], P.text, 10);
  });

  // 尺寸：底部（柱距链 + 总长）
  var dy = yEnd + 52;
  c.ln(x0, dy, xEnd, dy, P.line, 0.8);
  for (var k4 = 0; k4 <= bays; k4++) {
    var xx3 = x0 + k4 * sp * s;
    c.ln(xx3, dy - 4, xx3, dy + 4, P.line, 0.8);
  }
  c.tx((x0 + xEnd) / 2, dy + 12, '总长 ' + L.toFixed(1) + ' m（' + _bayNote(fl) + '）', P.text, 11, 'middle', 'bold');
  // 尺寸：左侧（宽度）
  var dx = x0 - 52;
  c.ln(dx, y0, dx, yEnd, P.line, 0.8);
  c.ln(dx - 4, y0, dx + 4, y0, P.line, 0.8);
  c.ln(dx - 4, yEnd, dx + 4, yEnd, P.line, 0.8);
  c.tx(dx - 8, (y0 + yEnd) / 2, (mid ? '总宽 ' : '跨度 ') + Wd.toFixed(1) + ' m', P.text, 11, 'end', 'bold');

  // 说明
  c.tx(mL, 20, '平面图（轴线 / 柱位 / 檩条）', P.sub, 11, 'start', 'bold');
  var tips = '柱网 ' + _bayNote(fl) + ' · 檩条 ' + (pl.perSlope * 2) + ' 道/榀（' + pl.perSlope
    + ' 道/半坡 · 档距 ' + rps + 'm 实排 ' + pl.step.toFixed(2) + 'm） · 榀数 ' + n
    + (mid ? ' · 中柱 1 排' : '') + (state.hasParapet ? ' · 女儿墙 ' + state.parapetHeight + ' m' : '')
    + (dlc > 0 ? ' · 采光带 ' + dlc + ' 道（FRP 1.0m 宽·屋脊对称）' : '');
  c.tx(mL, Hh - 18, tips, P.hint, 10, 'start');
  return c.out('平面布置图', '自动生成的钢结构平面轴网图');
}

// ---- 屋脊抬高（与 3D 预览同口径：单/双跨均为每坡水平 W/2） ----
function _archRise() { return Math.min(state.width / 2 * 0.105, 2.8); }
// 坡度百分比：保留一位小数、整数去尾（10.5% / 28%）
function _pct1(v) { var s = v.toFixed(1); return s.replace(/\.0$/, ''); }

// ---- 柱网实际排布（与主结构算量同口径：榀数 = ceil(L/柱距)+1，跨长按总长均分）----
function _frameLayout() {
  var L = state.length, cs = state.columnSpacing;
  var r = state.result || {};
  var n = (r.main && r.main.numCols) || (Math.ceil(L / cs) + 1);
  var bays = Math.max(1, n - 1);
  var sp = L / bays;                       // 实际跨长（总长均分，端部自然对齐）
  return { n: n, bays: bays, sp: sp, cs: cs, even: Math.abs(sp - cs) < 0.02 };
}
// 柱距标注文案：整数倍时直接写柱距，非整数倍标注"均分实际跨长"
function _bayNote(fl) {
  if (fl.even) return fl.bays + ' × ' + (_DWG_EN ? '' : '柱距 ') + (+fl.sp.toFixed(2)) + ' m';
  return fl.bays + ' × ' + fl.sp.toFixed(2) + ' m' + (_DWG_EN ? ' equally · nominal ' : ' 均分 · 名义柱距 ') + fl.cs + ' m';
}
// ---- 屋面檩条在平面/立面上的位置（根数取引擎 perSlope，几何按当前坡度）----
function _purlinLayout() {
  var Wd = state.width, rps = state.roofPurlinSpacing;
  var r = state.result || {};
  var rise = _archRise();
  var halfW = Wd / 2;                      // 与 3D 预览同口径：每坡水平投影 W/2
  var slopeLen = Math.sqrt(halfW * halfW + rise * rise);
  var perSlope = (r.roofPurlin && r.roofPurlin.perSlope) ||
    (Math.max(1, Math.ceil(Math.max(0.3, slopeLen - 0.35) / rps) + 1));
  var nSpan = Math.max(1, perSlope - 1);
  var avail = Math.max(0.3, slopeLen - 0.15 - 0.2);
  var step = avail / nSpan;
  var cos = halfW / slopeLen;
  var offs = [];                           // 各檩条距屋脊的水平距离（m）
  for (var i = 0; i <= nSpan; i++) offs.push((slopeLen - (0.15 + i * step)) * cos);
  return { offs: offs, perSlope: perSlope, step: step, rise: rise, halfW: halfW, slopeLen: slopeLen };
}

// ---- 端立面图（山墙方向，看宽度） ----
function _archElevEnd(P, side) {
  var isRight = side === 'right';          // 左山墙（①轴）/ 右山墙（末轴）——从室外看互为镜像
  var Wd = state.width, H = state.height, rps = state.roofPurlinSpacing;
  var mid = !!state.hasMiddleColumn;
  var rise = _archRise();
  var pht = state.hasParapet ? state.parapetHeight : 0;
  var W = 680, Hh = 358;
  var mL = 92, mR = 92, mT = 52, mB = 96;   // mB 加大：底部需容纳跨度尺寸 + 两行说明
  var bw = W - mL - mR, bh = Hh - mT - mB;
  var totalH = H + rise + pht + 1.2;
  var s = Math.min(bw / (Wd + 1.0), bh / totalH);
  var x0 = mL + (bw - Wd * s) / 2;
  var gy = Hh - mB;
  var c = _canvas(W, Hh);
  function yOf(h) { return gy - h * s; }
  var xE = x0 + Wd * s, xM = x0 + (Wd / 2) * s;

  // 地面
  c.ln(x0 - 46, gy, xE + 46, gy, P.line, 1.2);
  for (var g = -46; g < Wd * s + 46; g += 10) c.ln(x0 + g, gy, x0 + g - 5, gy + 6, P.grid, 0.5);

  // 山墙墙面（竖装板：银白填色 + 900型板缝@0.9m 一道，砖墙顶 1.2m 以上）
  c.rect(x0, yOf(H), Wd * s, H * s, P.wallFill, P.line, 0.8);
  for (var sx = x0 + 0.9 * s; sx < xE - 0.5; sx += 0.9 * s) {
    c.ln(sx, yOf(H), sx, Math.max(yOf(H) - H * s, yOf(1.2)), P.seam, 0.4);
  }

  // 柱
  var colW = Math.max(4, 0.22 * s);
  c.rect(x0 - colW / 2, yOf(H), colW, H * s, P.dark, P.dark, 0.5);
  c.rect(xE - colW / 2, yOf(H), colW, H * s, P.dark, P.dark, 0.5);
  if (mid) c.rect(xM - colW / 2, yOf(H + rise), colW, (H + rise) * s, P.dark, P.dark, 0.5);

  // 屋面（双坡，银白填色）
  c.poly([[x0, yOf(H)], [xM, yOf(H + rise)], [xE, yOf(H)]], P.roofFill, P.dark, 2);

  // 檩条（沿坡，屋脊侧 0.2m、檐口侧 0.15m；根数取引擎 perSlope）
  var halfSpan = Wd / 2;

  // 屋脊瓦示意（2026-09-27 康师傅）：脊瓦通长扣在屋脊上，两片各 0.5m 沿坡覆盖、抬高 5cm，粗线表示
  var capM = 0.50, slopeRise = rise / halfSpan;
  var cyA = yOf(H + rise) - 0.05 * s;
  c.ln(xM - capM * s, cyA + capM * s * slopeRise, xM, cyA, P.dark, 3);
  c.ln(xM, cyA, xM + capM * s, cyA + capM * s * slopeRise, P.dark, 3);

  var slopeLen = Math.sqrt(halfSpan * halfSpan + rise * rise);
  var plE = _purlinLayout();
  var perSlope = plE.perSlope;
  var nSpan = Math.max(1, perSlope - 1);
  var sp = (slopeLen - 0.2 - 0.15) / nSpan;
  for (var i = 0; i <= nSpan; i++) {
    var dd = 0.15 + i * sp;                 // 距檐口沿坡距离
    var t = dd / slopeLen;                  // 0=檐口 1=屋脊
    var yP = yOf(H + rise * t);
    c.ln(x0 + halfSpan * t * s - 3, yP - 3, x0 + halfSpan * t * s + 3, yP - 3, P.accent, 1.2);   // 左坡
    c.ln(xE - halfSpan * t * s - 3, yP - 3, xE - halfSpan * t * s + 3, yP - 3, P.accent, 1.2);   // 右坡
  }

  // 女儿墙（两端檐口处，深灰色）
  if (pht > 0) {
    var pw2 = Math.max(3, 0.24 * s);
    c.rect(x0 - pw2 / 2, yOf(H + pht), pw2, pht * s, P.paraFill, P.dark, 0.6);
    c.rect(xE - pw2 / 2, yOf(H + pht), pw2, pht * s, P.paraFill, P.dark, 0.6);
    c.ln(x0 - pw2 / 2, yOf(H + pht), xE + pw2 / 2, yOf(H + pht), P.hint, 0.5, '4 3');
    c.tx(x0 - 6, yOf(H + pht) - 13, '女儿墙 ' + pht.toFixed(2) + 'm', P.sub, 10, 'start');
  }

  // 山墙墙梁（水平线）
  if (typeof girtLevelsM === 'function') {
    try {
      var ys = girtLevelsM(makeParams());
      ys.forEach(function (yy2) { c.ln(x0, yOf(yy2), xE, yOf(yy2), P.hint, 0.5, '3 3'); });
    } catch (e) { }
  }

  // 标注：跨度、檐高、屋脊、坡度
  var dy2 = gy + 34;
  c.ln(x0, dy2, xE, dy2, P.line, 0.8);
  c.ln(x0, dy2 - 4, x0, dy2 + 4, P.line, 0.8);
  c.ln(xE, dy2 - 4, xE, dy2 + 4, P.line, 0.8);
  c.tx((x0 + xE) / 2, dy2 + 13, (mid ? '总宽 ' : '跨度 ') + Wd.toFixed(1) + ' m', P.text, 11, 'middle', 'bold');
  var dx2 = xE + 44;
  c.ln(dx2, yOf(H), dx2, gy, P.line, 0.8);
  c.ln(dx2 - 4, yOf(H), dx2 + 4, yOf(H), P.line, 0.8);
  c.ln(dx2 - 4, gy, dx2 + 4, gy, P.line, 0.8);
  c.tx(dx2 + 6, (yOf(H) + gy) / 2, '檐高 ' + H.toFixed(2) + 'm', P.sub, 10, 'start');
  c.ln(dx2 - 14, yOf(H + rise), dx2 + 14, yOf(H + rise), P.accent, 0.8);
  c.tx(dx2 + 6, yOf(H + rise), '屋脊 ' + (H + rise).toFixed(2) + 'm', P.accent, 10, 'start');
  c.tx(xM, yOf(H + rise) - 30, '坡度 i=' + _pct1(rise / halfSpan * 100) + '%', P.hint, 10);
  // 视图轴线号（从室外看向山墙：左山墙 A 轴在左；右山墙 A 轴在右 → 镜像）
  var rowL = mid ? ['A', 'B', 'C'] : ['A', 'B'];
  var labL = isRight ? rowL[rowL.length - 1] : rowL[0];
  var labR = isRight ? rowL[0] : rowL[rowL.length - 1];
  var ay = gy + 22;
  [[x0, labL], [xE, labR]].forEach(function (q) {
    c.ln(q[0], gy, q[0], ay - 9, P.line, 0.6);
    c.ci(q[0], ay, 9, 'none', P.line, 0.8);
    c.tx(q[0], ay, q[1], P.text, 10);
  });

  c.tx(mL, 20, (isRight ? 'ⓓ 端立面图（右山墙 · 末轴 · 看宽度）' : 'ⓐ 端立面图（左山墙 · ①轴 · 看宽度）'), P.sub, 11, 'start', 'bold');
  c.tx(mL, Hh - 28, '山墙竖装板缝@0.9m(900型) · 檩条 ' + perSlope + ' 道/半坡（' + (perSlope * 2) + ' 道/榀）· 实排档距 ' + sp.toFixed(2) + 'm', P.hint, 10, 'start');
  c.tx(mL, Hh - 12, '屋脊侧起步 200mm / 檐口侧 150mm · 屋脊瓦通长（粗线示意）', P.hint, 10, 'start');
  return c.out(isRight ? '右山墙端立面图' : '左山墙端立面图',
    '山墙方向立面，含屋面坡度、檩条布置与两端轴线号（' + labL + ' / ' + labR + '）');
}

// ---- 纵立面图（长边方向，看长度） ----
function _archElevSide(P, side) {
  var isBack = side === 'back';            // 'front'=前纵墙（A轴）/ 'back'=后纵墙（末轴）
  var L = state.length, H = state.height, cs = state.columnSpacing;
  var fl = _frameLayout();
  var n = fl.n, bays = fl.bays, spf = fl.sp;
  var mid = !!state.hasMiddleColumn, Wd = state.width;
  var rise = _archRise();
  var pht = state.hasParapet ? state.parapetHeight : 0;
  var W = 720, Hh = 300;
  var mL = 76, mR = 104, mT = 56, mB = 70;
  var bw = W - mL - mR, bh = Hh - mT - mB;
  var s = Math.min(bw / L, bh / (H + pht + rise * 0.6));
  var pw = L * s;
  var x0 = mL + (bw - pw) / 2;
  var gy = Hh - mB;
  var c = _canvas(W, Hh);
  function yOf(h) { return gy - h * s; }
  var xE = x0 + pw;

  c.ln(x0 - 40, gy, xE + 40, gy, P.line, 1.2);
  // 墙面（竖装板：银白填色 + 900型板缝@0.9m 一道，砖墙顶 1.2m 以上为彩钢瓦）
  c.rect(x0, yOf(H), pw, H * s, P.wallFill, P.line, 0.8);
  var seamStep = 0.9 * s;                                   // 竖装板缝 @0.9m（900型有效覆盖宽）
  for (var sx0 = x0 + seamStep; sx0 < xE - 0.5; sx0 += seamStep) {
    c.ln(sx0, yOf(H), sx0, Math.max(yOf(H) - H * s, yOf(1.2)), P.seam, 0.4);
  }
  // 柱间支撑（与引擎 braceBayIndices 同口径：端跨各一道，L>60 加中间；交叉虚线）
  var braceIdx = (typeof braceBayIndices === 'function') ? braceBayIndices(bays, L) : [];
  braceIdx.forEach(function (bi) {
    if (bi < 0 || bi >= bays) return;
    var bxs2 = x0 + bi * spf * s, bxe2 = bxs2 + spf * s;
    c.ln(bxs2, gy - 1, bxe2, yOf(H) + 1, P.brace, 1.1, '6 3');
    c.ln(bxs2, yOf(H) + 1, bxe2, gy - 1, P.brace, 1.1, '6 3');
  });
  if (braceIdx.length && braceIdx[0] < bays) {
    c.txh(x0 + braceIdx[0] * spf * s + spf * s / 2, yOf(H * 0.45), '柱间支撑', P.brace, 9, 'middle', P.halo);
  }
  // 柱
  for (var k = 0; k <= bays; k++) {
    var xx = x0 + k * spf * s;
    var colW = Math.max(3, 0.2 * s);
    c.rect(xx - colW / 2, yOf(H), colW, H * s, P.steel, P.line, 0.5);
  }
  // 屋脊线（高于女儿墙顶才可见，否则被女儿墙挡住）
  var ridgeVisible = (H + rise) > (H + pht) + 0.05;
  if (ridgeVisible) {
    c.ln(x0, yOf(H + rise), xE, yOf(H + rise), P.accent, 1, '6 3');
    c.tx(xE + 8, yOf(H + rise), '屋脊 ' + (H + rise).toFixed(2) + 'm', P.accent, 10, 'start');
  }
  // 女儿墙（长边方向通长，深灰色）
  if (pht > 0) {
    c.rect(x0, yOf(H + pht), pw, pht * s, P.paraFill, P.dark, 0.6);
    c.tx(x0 + 4, yOf(H + pht) - 13, '女儿墙 ' + pht.toFixed(2) + 'm', P.sub, 10, 'start');
  }
  // 檐口线
  c.ln(x0, yOf(H), xE, yOf(H), P.dark, 1.4);

  // 墙梁标高线
  if (typeof girtLevelsM === 'function') {
    try {
      var ys = girtLevelsM(makeParams());
      ys.forEach(function (yy2) { c.ln(x0, yOf(yy2), xE, yOf(yy2), P.hint, 0.5, '3 3'); });
    } catch (e) { }
  }

  // 门窗几何（与引擎同口径）
  var winBot = 1.2, winTop = H - 1.5 - (pht > 0 ? 1.5 : 0), doorTop = 5.5;
  if (typeof openingSnaps === 'function') {
    try {
      var snp = openingSnaps(makeParams());
      winBot = snp.winBot; winTop = snp.winTop; doorTop = snp.doorTop;
    } catch (e) { }
  }
  var ww = state.winWidth, dw = state.doorWidth;
  // 门位：与引擎 layoutDoorBaysM 同口径（避开柱间支撑跨，从两侧第一个无支撑跨起向中间排）
  // 前纵墙取 front 数据，后纵墙取 back 数据（doorOnWall='front' 时后墙无门 → 全窗）
  var dLayout = (typeof layoutDoorBaysM === 'function')
    ? layoutDoorBaysM(L, cs, dw, state.doorCount || 0, state.doorOnWall)
    : { front: [], back: [], avoided: true };
  var doorSegs = isBack ? (dLayout.back || []) : (dLayout.front || []);
  function bayHasDoor(bi) {
    var bx0 = -L / 2 + bi * spf, bx1 = bx0 + spf;
    return doorSegs.some(function (sg) { return sg[0] < bx1 - 0.01 && sg[1] > bx0 + 0.01; });
  }
  var doorBays = doorSegs.length;
  var firstWinB = -1;
  for (var k2 = 0; k2 < bays; k2++) {
    var bxs = x0 + k2 * spf * s, bxe = x0 + (k2 + 1) * spf * s, bxc = (bxs + bxe) / 2;
    if (bayHasDoor(k2)) {
      c.rect(bxc - dw * s / 2, yOf(doorTop), dw * s, doorTop * s, P.band, P.dark, 0.8);
      c.ln(bxc, yOf(doorTop), bxc, yOf(0), P.dark, 0.5);
      c.txh(bxc, yOf(doorTop) - 10, '门 ' + dw.toFixed(2) + '×' + doorTop.toFixed(1) + 'm', P.sub, 9, 'middle', P.halo);
      // 门顶过梁（墙梁上翻）
      c.ln(bxc - dw * s / 2, yOf(doorTop), bxc + dw * s / 2, yOf(doorTop), P.dark, 1.4);
    } else {
      c.rect(bxc - ww * s / 2, yOf(winTop), ww * s, (winTop - winBot) * s, P.band, P.dark, 0.8);
      c.ln(bxc, yOf(winTop), bxc, yOf(winBot), P.dark, 0.5);
      c.ln(bxc - ww * s / 2, yOf((winTop + winBot) / 2), bxc + ww * s / 2, yOf((winTop + winBot) / 2), P.dark, 0.5);
      if (firstWinB < 0) {
        firstWinB = k2;
        c.txh(bxc, yOf(winTop) - 11, '窗 ' + ww.toFixed(2) + '×' + (winTop - winBot).toFixed(2) + 'm', P.sub, 9, 'middle', P.halo);
      }
    }
    // 柱距尺寸
    c.ln(bxs, gy + 30, bxs, gy + 36, P.line, 0.8);
  }
  c.ln(xE, gy + 30, xE, gy + 36, P.line, 0.8);
  c.ln(x0, gy + 30, xE, gy + 30, P.line, 0.8);
  c.tx((x0 + xE) / 2, gy + 46, '总长 ' + L.toFixed(1) + ' m（' + _bayNote(fl) + '）', P.text, 11, 'middle', 'bold');
  // 柱位轴号（1..n，柱距方向；过密时隔一标注）
  for (var k6 = 0; k6 <= bays; k6++) {
    var xa = x0 + k6 * spf * s;
    var showA = bays <= 13 || k6 === 0 || k6 === bays || k6 % 2 === 0;
    c.ln(xa, gy, xa, gy + 10, P.line, 0.6);
    if (showA) { c.ci(xa, gy + 20, 9, 'none', P.line, 0.8); c.tx(xa, gy + 20, (k6 + 1), P.text, 10); }
  }
  // 檐高标注
  var dx3 = xE + 26;
  c.ln(dx3, yOf(H), dx3, gy, P.line, 0.8);
  c.ln(dx3 - 4, yOf(H), dx3 + 4, yOf(H), P.line, 0.8);
  c.ln(dx3 - 4, gy, dx3 + 4, gy, P.line, 0.8);
  c.tx(dx3 + 6, (yOf(H) + gy) / 2, '檐高 ' + H.toFixed(2) + 'm', P.sub, 10, 'start');

  var winNote = '';
  if (state.winCount && state.winCount !== (bays - doorBays)) {
    winNote = ' · 窗清单按输入 ' + state.winCount + ' 扇计（图上每跨示意 1 扇）';
  }
  var sideName = isBack ? 'Ⓒ 纵立面图（后纵墙 · 末轴）' : 'Ⓑ 纵立面图（前纵墙 · A 轴）';
  c.tx(mL, 20, sideName + ' · 每跨一扇窗示意'
    + (doorBays ? ' · 本墙 ' + doorBays + ' 樘门' + (dLayout.avoided ? '（已避柱间支撑）' : '（⚠门位未能避开支撑）') : ' · 本墙无门 · 全窗布置'),
    P.sub, 11, 'start', 'bold');
  c.tx(mL, Hh - 14, '墙面竖装板缝@0.9m(900型) · 银白彩钢瓦' + (pht > 0 ? ' · 女儿墙深灰' : '')
    + ' · 墙梁/檩距按 ' + state.roofPurlinSpacing + 'm 档 · 窗台 ' + winBot.toFixed(2) + 'm 对齐墙梁线' + winNote
    + (pht > 0 && !ridgeVisible ? ' · 屋脊(' + (H + rise).toFixed(2) + 'm)在女儿墙后，立面不可见' : ''), P.hint, 10, 'start');
  return c.out(isBack ? '后纵墙立面图' : '前纵墙立面图',
    '长边方向立面（含门窗布置与柱位轴线号）' + (isBack && !doorBays ? '，本墙无门' : ''));
}

// ---- 基础平面布置图（2026-09-28 康师傅口径：布置示意为主，不编造基础尺寸）----
function _archFooting(P) {
  var L = state.length, Wd = state.width;
  var fl = _frameLayout();
  var n = fl.n, bays = fl.bays, sp = fl.sp;
  var mid = !!state.hasMiddleColumn;
  var W = 680, Hh = 460;
  var mL = 98, mR = 64, mT = 58, mB = 145;   // mB 需容纳：轴号圈 + 尺寸链 + 3 行说明
  var bw = W - mL - mR, bh = Hh - mT - mB;
  var s = Math.min(bw / L, bh / Wd);
  var pw = L * s, ph2 = Wd * s;
  var x0 = mL + (bw - pw) / 2, y0 = mT + (bh - ph2) / 2;
  var c = _canvas(W, Hh);
  var xEnd = x0 + pw, yEnd = y0 + ph2;
  var rowY = mid ? [y0, y0 + ph2 / 2, yEnd] : [y0, yEnd];

  // 地脚螺栓规格（取引擎结果；含分档：<8m M24 / 8~12m M27 / >12m M30）
  var abSpec = 'M24×800';
  try {
    var ab = state.result && state.result.bolts && state.result.bolts.anchorBolt;
    if (ab && ab.spec) abSpec = String(ab.spec).split('(')[0].trim();
  } catch (e) { }

  // 轴线（纵向 = 榀，横向 = 跨）
  for (var k = 0; k <= bays; k++) {
    c.ln(x0 + k * sp * s, y0 - 16, x0 + k * sp * s, yEnd + 16, P.grid, 0.6, '8 4 2 4');
  }
  rowY.forEach(function (yy) { c.ln(x0 - 16, yy, xEnd + 16, yy, P.grid, 0.6, '8 4 2 4'); });

  // 独立基础：示意轮廓（1.4m 见方）+ 柱截面占位 + 4 个地脚螺栓孔
  var fs = Math.max(12, 1.4 * s);
  var bp = fs * 0.28;
  rowY.forEach(function (yy, ri) {
    var isMidRow = mid && ri === 1;
    for (var k2 = 0; k2 <= bays; k2++) {
      var xx = x0 + k2 * sp * s;
      c.rect(xx - fs / 2, yy - fs / 2, fs, fs, 'none', P.dark, 1);
      c.rect(xx - 5, yy - 4, 10, 8, P.steel, P.dark, 0.6);
      [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) {
        c.ci(xx + q[0] * bp, yy + q[1] * bp, 1.8, 'none', P.accent, 0.9);
      });
      if (k2 === 0) {
        c.tx(xx, yy - fs / 2 - 9, isMidRow ? 'J-2' : 'J-1', P.sub, 10, 'middle', 'bold');
      }
    }
  });

  // 轴线编号
  for (var k3 = 0; k3 <= bays; k3++) {
    var xx2 = x0 + k3 * sp * s;
    var show = bays <= 11 || k3 === 0 || k3 === bays || k3 % 2 === 0;
    c.ln(xx2, yEnd + 16, xx2, yEnd + 28, P.line, 0.8);
    if (show) { c.ci(xx2, yEnd + 38, 9, 'none', P.line, 0.8); c.tx(xx2, yEnd + 38, (k3 + 1), P.text, 10); }
  }
  var letters = mid ? ['A', 'B', 'C'] : ['A', 'B'];
  rowY.forEach(function (yy, idx) {
    c.ln(x0 - 28, yy, x0 - 16, yy, P.line, 0.8);
    c.ci(x0 - 38, yy, 9, 'none', P.line, 0.8);
    c.tx(x0 - 38, yy, letters[idx], P.text, 10);
  });

  // 尺寸：底部柱距链 + 左侧宽度（尺寸线放在轴号圈下方，避免叠压）
  var dy = yEnd + 62;
  c.ln(x0, dy, xEnd, dy, P.line, 0.8);
  for (var k4 = 0; k4 <= bays; k4++) {
    c.ln(x0 + k4 * sp * s, dy - 4, x0 + k4 * sp * s, dy + 4, P.line, 0.8);
  }
  c.tx((x0 + xEnd) / 2, dy + 13, '总长 ' + L.toFixed(1) + ' m（' + _bayNote(fl) + '）', P.text, 11, 'middle', 'bold');
  var dx = x0 - 56;
  c.ln(dx, y0, dx, yEnd, P.line, 0.8);
  c.ln(dx - 4, y0, dx + 4, y0, P.line, 0.8);
  c.ln(dx - 4, yEnd, dx + 4, yEnd, P.line, 0.8);
  c.tx(dx - 8, (y0 + yEnd) / 2, (mid ? '总宽 ' : '跨度 ') + Wd.toFixed(1) + ' m', P.text, 11, 'end', 'bold');

  // 图例（标题行右侧）
  var lgX = mL + 190;
  c.rect(lgX, 13, 13, 14, 'none', P.dark, 1);
  c.tx(lgX + 19, 20, '独立基础（示意轮廓）', P.sub, 10, 'start');
  c.ci(lgX + 152, 20, 3, 'none', P.accent, 1);
  c.tx(lgX + 161, 20, '地脚螺栓 ' + abSpec + ' · 每柱 4 根', P.sub, 10, 'start');

  c.tx(mL, 20, '基础平面布置图', P.sub, 11, 'start', 'bold');
  var colCount = (bays + 1) * rowY.length;
  c.tx(mL, Hh - 46, '柱脚共 ' + colCount + ' 处（J-1 边柱 / J-2 中柱）· 地脚螺栓 ' + abSpec
    + ' · 钢柱 ' + (state.result && state.result.main ? state.result.main.column.spec : '—'), P.hint, 10, 'start');
  c.tx(mL, Hh - 24, '基础尺寸、埋深与配筋详结构计算（图中基础轮廓为示意，不表示实际尺寸）', P.hint, 10, 'start');
  c.tx(mL, Hh - 6, '柱脚底板与加劲肋随柱截面配套', P.hint, 10, 'start');
  return c.out('基础平面布置图', '柱脚位置与独立基础布置示意（尺寸详结构计算）');
}

// ---- 单榀刚架剖面图（2026-09-28 康师傅口径：全标注）----
function _archFrame(P) {
  var Wd = state.width, H = state.height;
  var mid = !!state.hasMiddleColumn;
  var rise = _archRise();
  var r = state.result || {};
  var colSpec = (r.main && r.main.column && r.main.column.spec) || '—';
  var beamSpec = (r.main && r.main.beam && r.main.beam.spec) || '—';
  // engine 已把「楔形X%+直梁Y%」拼进 spec，图上另起一处标注 → 先剥离，避免重复出现
  var beamSpecRaw = String(beamSpec).replace(/\s*·\s*楔形.*$/, '');
  var purlinSpec = (r.roofPurlin && r.roofPurlin.spec) ? String(r.roofPurlin.spec).split(' (')[0] : '—';
  var rps = state.roofPurlinSpacing;
  var ff = (r.main && r.main.beam && r.main.beam.taperFraction != null) ? r.main.beam.taperFraction : 0.5;
  var mm = /H\((\d+)~(\d+)\)/.exec(beamSpec);
  var Hk = mm ? +mm[1] : 700, Hr = mm ? +mm[2] : 400;   // 膝部（檐口侧）高 / 屋脊侧高，mm
  var pl = _purlinLayout();
  var abSpec = 'M24×800';
  try {
    var ab = state.result && state.result.bolts && state.result.bolts.anchorBolt;
    if (ab && ab.spec) abSpec = String(ab.spec).split('(')[0].trim();
  } catch (e) { }

  var W = 700, Hh = 480;
  var mL = 132, mR = 128, mT = 62, mB = 118;
  var bw = W - mL - mR, bh = Hh - mT - mB;
  var totalH = H + rise + 0.6;
  var s = Math.min(bw / (Wd + 1.0), bh / totalH);
  var x0 = mL + (bw - Wd * s) / 2;
  var gy = Hh - mB;
  var c = _canvas(W, Hh);
  function yOf(h) { return gy - h * s; }
  var xE = x0 + Wd * s, xM = x0 + (Wd / 2) * s;
  var colW = Math.max(7, 0.30 * s);

  // 地面
  c.ln(x0 - 36, gy, xE + 36, gy, P.line, 1.2);
  for (var g = -36; g < Wd * s + 36; g += 10) c.ln(x0 + g, gy, x0 + g - 5, gy + 6, P.grid, 0.5);

  // 柱（端柱到檐高；有中柱时中柱到脊高）
  function column(xc, hTop) {
    var w2 = colW / 2;
    c.rect(xc - w2, yOf(hTop), colW, hTop * s, P.band, P.dark, 1.2);
    c.ln(xc, yOf(hTop), xc, gy, P.steel, 0.9);
    // 柱脚底板 + 锚栓
    c.rect(xc - w2 - 5, gy - 4, colW + 10, 5, P.dark, P.dark, 0.8);
    c.ln(xc - w2 - 2, gy + 1, xc - w2 - 2, gy + 11, P.accent, 1.3);
    c.ln(xc + w2 + 2, gy + 1, xc + w2 + 2, gy + 11, P.accent, 1.3);
  }
  column(x0, H);
  column(xE, H);
  if (mid) column(xM, H + rise);

  // 半坡梁：檐口侧楔形段（Hk→Hr）+ 屋脊侧直梁段（恒 Hr）
  function beamHalf(dir) {
    var xA = dir < 0 ? x0 : xE, xB = xM;
    var yA = yOf(H), yB = yOf(H + rise);
    function up(u) { return [xA + (xB - xA) * u, yA + (yB - yA) * u]; }
    function hpx(u) { return Math.max(3, (u <= ff ? Hk + (Hr - Hk) * (u / ff) : Hr) / 1000 * s); }
    function dn(u) { var p = up(u); return [p[0], p[1] + hpx(u)]; }
    var pts = [up(0), up(ff), up(1), dn(1), dn(ff), dn(0)];
    c.poly(pts, P.band, P.dark, 1.3);
    var a1 = up(ff), b1 = dn(ff);
    c.ln(a1[0], a1[1], b1[0], b1[1], P.accent, 1, '4 3');   // 楔形段/直梁段分界
    return { up: up, dn: dn };
  }
  beamHalf(-1);
  beamHalf(1);

  // 屋面檩条（按引擎实排位置，沿坡布置）
  var halfW = Wd / 2;
  pl.offs.forEach(function (off) {
    [xM - off * s, xM + off * s].forEach(function (xx) {
      var t = (halfW - off) / halfW;                    // 0=檐口 1=屋脊
      var yy = yOf(H + rise * t);
      c.rect(xx - 3, yy - 5, 6, 5, P.accent, P.accent, 0.6);
    });
  });

  // 屋脊节点
  c.ci(xM, yOf(H + rise) + 2, 3.5, P.accent, P.dark, 1);
  // 梁柱节点（膝部）高强螺栓示意
  [x0, xE].forEach(function (xx) {
    var sgn = xx === x0 ? 1 : -1;
    for (var i = 0; i < 3; i++) {
      c.ci(xx + sgn * (colW / 2 + 3), yOf(H + 0.12 + i * 0.12), 1.8, P.dark, P.dark, 0.5);
    }
  });

  // 标注：跨度、檐高、脊高、坡度
  var dy2 = gy + 40;
  c.ln(x0, dy2, xE, dy2, P.line, 0.8);
  c.ln(x0, dy2 - 4, x0, dy2 + 4, P.line, 0.8);
  c.ln(xE, dy2 - 4, xE, dy2 + 4, P.line, 0.8);
  if (mid) c.ln(xM, dy2 - 4, xM, dy2 + 4, P.line, 0.8);
  c.tx((x0 + xE) / 2, dy2 + 14, (mid ? '单跨 ' + (Wd / 2).toFixed(1) + ' m × 2（中柱）· 总宽 ' + Wd.toFixed(1) + ' m'
    : '跨度 ' + Wd.toFixed(1) + ' m'), P.text, 11, 'middle', 'bold');

  var dx2 = xE + 30;
  c.ln(dx2, yOf(H), dx2, gy, P.line, 0.8);
  c.ln(dx2 - 4, yOf(H), dx2 + 4, yOf(H), P.line, 0.8);
  c.ln(dx2 - 4, gy, dx2 + 4, gy, P.line, 0.8);
  c.tx(dx2 + 6, (yOf(H) + gy) / 2, '檐高 ' + H.toFixed(2) + ' m', P.sub, 10, 'start');
  c.ln(dx2 - 10, yOf(H + rise), dx2 + 10, yOf(H + rise), P.accent, 0.9);
  c.tx(dx2 + 6, yOf(H + rise), '脊高 ' + (H + rise).toFixed(2) + ' m', P.accent, 10, 'start');
  // 坡度标注移到脊右侧下方，避免与上方梁规格文字叠压
  c.txh(xM + 62, yOf(H + rise) - 13, '坡度 i=' + _pct1(rise / halfW * 100) + '%', P.hint, 9.5, 'middle', '#FFFFFF');

  // 引出标注：柱 / 梁 / 檩条
  c.ln(x0 - colW / 2, yOf(H * 0.55), mL - 14, yOf(H * 0.55), P.hint, 0.7, '4 3');
  c.tx(mL - 18, yOf(H * 0.55), '钢柱', P.sub, 10, 'end', 'bold');
  c.tx(mL - 18, yOf(H * 0.55) + 13, colSpec, P.hint, 9.5, 'end');
  var mid_L = [(x0 + xM) / 2, yOf(H + rise * 0.5) - 8];
  c.ln(mid_L[0], mid_L[1], mid_L[0], mT + 4, P.hint, 0.7, '4 3');
  c.tx(mid_L[0], mT - 10, '钢梁（变截面）', P.sub, 10, 'middle', 'bold');
  c.tx(mid_L[0], mT + 4, beamSpecRaw + ' · 楔形' + Math.round(ff * 100) + '%+直梁' + (100 - Math.round(ff * 100)) + '%', P.hint, 9.5, 'middle');

  // 节点说明与图例
  c.tx(mL, 20, '单榀刚架剖面图（全标注）', P.sub, 11, 'start', 'bold');
  c.ci(mL + 214, 20, 3.5, P.accent, P.dark, 1);
  c.tx(mL + 224, 20, '节点：柱脚（底板+' + abSpec + '）· 梁柱（10.9S 高强螺栓）· 屋脊', P.sub, 10, 'start');
  c.tx(mL, Hh - 48, '屋面檩条 ' + purlinSpec + ' @' + rps + 'm 档 · 实排 ' + (pl.perSlope * 2) + ' 道/榀（' + pl.perSlope
    + ' 道/半坡，档距 ' + pl.step.toFixed(2) + 'm）', P.hint, 10, 'start');
  var frameCount = (r.main && r.main.numCols) ? r.main.numCols : (Math.ceil(state.length / state.columnSpacing) + 1);
  c.tx(mL, Hh - 29, '梁分段按受力：檐口侧楔形 ' + Math.round(ff * 100) + '% + 屋脊侧直梁 ' + (100 - Math.round(ff * 100))
    + '% · 榀数 ' + frameCount + ' · 柱距 ' + state.columnSpacing + ' m · Q355B', P.hint, 10, 'start');
  c.tx(mL, Hh - 10, '节点：柱脚底板 + ' + abSpec + ' 锚栓（每柱 4 根）· 梁柱 10.9S 高强螺栓 · 屋脊对接 · 尺寸 mm / 标高 m', P.hint, 10, 'start');
  return c.out('单榀刚架剖面图', '门式刚架单榀剖面，含柱梁截面、梁分段、檩条与节点标注');
}

// ---- 生成「建筑图参考」区块 ----
function renderArchRef() {
  var box = $('#archRef');
  if (!box || !state.result) return;
  try {
    var P = _archPalette(false);
    var gallery = ARCH_DWGS.map(function (d, i) {
      return '<div class="dwg-item" onclick="openDwgView(' + i + ')">'
        + '<img src="assets/dwg/' + d[0] + '_t.png" alt="' + d[1] + '" loading="lazy">'
        + '<span><b>' + (i + 1 < 10 ? '0' : '') + (i + 1) + '</b> ' + d[1] + '</span></div>';
    }).join('');
    box.innerHTML =
      '<div class="ar-header">📐 建筑图参考'
      + '<span class="ar-sub">按当前参数自动生成共 7 张：平面 1 张 + 立面 4 张（前/后纵墙 + 左/右山墙）+ 基础布置图 + 单榀刚架图，全部随参数联动</span>'
      + '<button class="ar-btn" onclick="exportArchPNG()">⬇ 导出图纸 PNG（7 张）</button></div>'
      + '<div class="ar-sheets">'
      + '<div class="ar-sheet ar-sheet-wide">' + _archPlan(P) + '</div>'
      + '<div class="ar-sheet">' + _archElevEnd(P, 'left') + '</div>'
      + '<div class="ar-sheet">' + _archElevSide(P, 'front') + '</div>'
      + '<div class="ar-sheet">' + _archElevSide(P, 'back') + '</div>'
      + '<div class="ar-sheet">' + _archElevEnd(P, 'right') + '</div>'
      + '<div class="ar-sheet ar-sheet-wide">' + _archFooting(P) + '</div>'
      + '<div class="ar-sheet ar-sheet-wide">' + _archFrame(P) + '</div>'
      + '</div>'
      + '<div class="ar-gallery-title">参考方案图纸（21.2-60-9 米方案 · 共 10 张，点击看大图）</div>'
      + '<div class="dwg-strip">' + gallery + '</div>';
    box.style.display = 'block';
  } catch (e) {
    console.error('建筑图生成失败', e);
    box.style.display = 'none';
  }
}

// 导出图纸 PNG（三张图合并，白底打印配色，2 倍分辨率）
function exportArchPNG() {
  try {
    var P = _archPalette(true);
    var sheets = [
      { t: '平面布置图 1:100', svg: _archPlan(P) },
      { t: 'ⓐ 端立面图（左山墙 · ①轴）1:100', svg: _archElevEnd(P, 'left') },
      { t: 'ⓑ 纵立面图（前纵墙 · A 轴）1:100', svg: _archElevSide(P, 'front') },
      { t: 'ⓒ 纵立面图（后纵墙 · 末轴）1:100', svg: _archElevSide(P, 'back') },
      { t: 'ⓓ 端立面图（右山墙 · 末轴）1:100', svg: _archElevEnd(P, 'right') },
      { t: '基础平面布置图（柱脚/基础示意 · 尺寸详结构计算）', svg: _archFooting(P) },
      { t: '单榀刚架剖面图（全标注）', svg: _archFrame(P) }
    ].map(function (s) {
      var m = s.svg.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/);
      s.w = m ? parseFloat(m[1]) : 680; s.h = m ? parseFloat(m[2]) : 340;
      return s;
    });
    var gap = 34, head = 30, y = 0, wMax = 720;
    var body = sheets.map(function (s) {
      y += head;
      var g = '<g transform="translate(' + ((wMax - s.w) / 2) + ',' + y + ')">' + s.svg.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '') + '</g>';
      var lbl = '<text x="24" y="' + (y - 12) + '" font-size="14" font-weight="bold" fill="#1D2129">' + s.t + '</text>'
        + '<line x1="24" y1="' + (y + s.h + 6) + '" x2="' + (wMax - 24) + '" y2="' + (y + s.h + 6) + '" stroke="#DEE0E3" stroke-width="1"/>';
      y += s.h + gap;
      return lbl + g;
    }).join('');
    var totalH = y + 24;
    var svg = '<svg viewBox="0 0 ' + wMax + ' ' + totalH + '" width="' + wMax + '" height="' + totalH
      + '" xmlns="http://www.w3.org/2000/svg" font-family="&quot;PingFang SC&quot;,&quot;Microsoft YaHei&quot;,sans-serif">'
      + '<rect x="0" y="0" width="' + wMax + '" height="' + totalH + '" fill="#FFFFFF"/>' + body + '</svg>';

    var scale = 2;
    var img = new Image();
    img.onload = function () {
      var cv = document.createElement('canvas');
      cv.width = wMax * scale; cv.height = totalH * scale;
      var ctx = cv.getContext('2d');
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, cv.width, cv.height);
      ctx.drawImage(img, 0, 0, cv.width, cv.height);
      var a = document.createElement('a');
      a.download = '建筑结构图_' + state.length + 'x' + state.width + 'x' + state.height + 'm.png';
      a.href = cv.toDataURL('image/png');
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      if (typeof toast === 'function') toast('已导出图纸 PNG（7 张：平面 + 4 个立面 + 基础布置图 + 单榀刚架图）');
    };
    img.onerror = function () { console.error('建筑图 PNG 渲染失败'); };
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  } catch (e) {
    console.error('导出建筑图失败', e);
  }
}

function openDwgView(i) {
  var d = ARCH_DWGS[i];
  if (!d) return;
  var box = $('#dwgLightbox');
  $('#dwgLbTitle').textContent = (i + 1 < 10 ? '0' : '') + (i + 1) + ' · ' + d[1];
  $('#dwgLbImg').src = 'assets/dwg/' + d[0] + '.webp';
  box.style.display = 'flex';
}
function closeDwgView() { $('#dwgLightbox').style.display = 'none'; }


// ====== 免责声明 ======
function showDisclaimer() {
  $('#disclaimerModal').style.display = 'flex';
}
function closeDisclaimer() {
  $('#disclaimerModal').style.display = 'none';
}
function agreeDisclaimer() {
  closeDisclaimer();
  generateReport();
}

// ====== 报价数据行（exportToCSV / 客户方案书共用，2026-09-27 #66 从 buildSheet 抽取）======
// ====== 算量条目名英文化（2026-09-28 业务员版：英文方案书第 5 页用）======
function _enItemName(zh) {
  var m = {
    '主结构(柱+梁)': 'Main Structure (Columns + Beams)',
    '吊车梁': 'Crane Girder',
    '牛腿+连接件': 'Corbel + Connections',
    '地脚螺栓': 'Anchor Bolts',
    '墙面檩条': 'Wall Girts',
    '墙面维护系统': 'Wall Envelope System',
    '天沟': 'Gutter',
    '夹层主梁': 'Mezzanine Main Beams',
    '夹层柱': 'Mezzanine Columns',
    '夹层柱(通高7.2m)': 'Mezzanine Columns (full height)',
    '夹层栏杆': 'Mezzanine Railing',
    '夹层次梁': 'Mezzanine Secondary Beams',
    '女儿墙钢构': 'Parapet Steel Framing',
    '屋面檩条': 'Roof Purlins',
    '屋面维护系统': 'Roof Envelope System',
    '屋面采光带': 'Roof Skylight',
    '抗风柱': 'Wind Columns',
    '拉条+隅撑+撑杆': 'Sag Rods + Fly Braces + Struts',
    '普通螺栓': 'Ordinary Bolts',
    '楼承板': 'Steel Deck',
    '檩托板螺栓': 'Cleat Bolts',
    '水平支撑+柱间支撑': 'Horizontal + Column Bracing',
    '系杆': 'Tie Rods',
    '落水管': 'Downpipes',
    '钢楼梯': 'Steel Stairs',
    '门窗影响': 'Openings Impact',
    '高强螺栓': 'High-strength Bolts'
  };
  if (m[zh]) return m[zh];
  if (String(zh).indexOf('屋脊瓦') === 0) {                 // 动态拼接：屋脊瓦+门窗包边+角柱包边(+泛水件)(+封檐板)
    var s = 'Ridge Cap + Opening Trim + Corner Trim';
    if (String(zh).indexOf('泛水') >= 0) s += ' + Flashing';
    if (String(zh).indexOf('封檐板') >= 0) s += ' + Fascia';
    return s;
  }
  return zh;
}

function _buildQuoteRows(isEn, r) {
  var L = state.length, W = state.width, H = state.height;
  function fmt(n, d) { return (n||0).toFixed(d||0); }
  function t(n) { return (n||0).toFixed(3); }
    // Data items
    function enSpec(spec) { return spec; } // specs are universal
    function enUnit(unit) { return unit === 't' ? 't' : unit === 'm²' ? 'm²' : unit === '延米' ? 'ln.m' : unit === '樘' ? 'unit' : unit === '根' ? 'pcs' : unit === '套' ? 'sets' : unit === '块' ? 'pcs' : unit; }

    var stRows = [], stIdx = 0;
    function SR(name, spec, unit, qty, note, price) {
      stRows.push({id: ++stIdx, name: name, spec: spec, unit: isEn ? enUnit(unit) : unit, qty: qty, note: note||'', price: price||0});
    }

    // Steel frame data（单价：元，2026-09-26 康师傅确认；合并口径与 estimateCNY 一致）
    var postW  = state.hasParapet ? (r.parapet.postWeight || 0) : 0;   // 女儿柱 → 钢柱
    var girtW  = state.hasParapet ? (r.parapet.girtWeight || 0) : 0;   // 女儿墙檩条 → 墙面檩条
    var cleatR = r.secondary.cleat.roofWeight || 0;                    // 屋面檩托板 → 钢梁
    var cleatW = r.secondary.cleat.wallWeight || 0;                    // 墙面檩托板 → 钢柱
    var colNote = (isEn ? 'Eave Ht '+H+'m·'+r.main.numCols+' frames·Q355B' : '檐高'+H+'m·'+r.main.numCols+'榀·Q355B')
      + (state.hasParapet ? (isEn ? ' · incl. parapet posts '+r.parapet.postCount : ' · 含女儿柱'+r.parapet.postCount+'根') : '')
      + (isEn ? ' · incl. wall cleats '+r.secondary.cleat.wallCount : ' · 含墙面檩托板'+r.secondary.cleat.wallCount+'块');
    SR(isEn ? 'Steel Column' : '钢柱', r.main.column.spec, 't', t((r.main.columnWeight + postW + cleatW)/1000),
       colNote, UNIT_PRICES.steelMain);
    SR(isEn ? 'Steel Beam (Tapered)' : '钢梁(变截面)', isEn ? _spTr(r.main.beam.spec) : r.main.beam.spec, 't', t((r.main.beamWeight + cleatR)/1000),
       isEn ? 'Welded H-beam·Q355B · incl. roof cleats '+r.secondary.cleat.roofCount : '焊接H型钢·Q355B · 含屋面檩托板'+r.secondary.cleat.roofCount+'块', UNIT_PRICES.steelMain);
    SR(isEn ? 'Roof Purlin' : '屋面檩条', r.roofPurlin.spec.split(' (')[0], 't', t(r.roofPurlin.weight/1000),
       isEn ? 'C-section·Galvanized' : 'C型钢·镀锌', UNIT_PRICES.purlin);
    SR(isEn ? 'Wall Girt' : '墙面檩条', r.wallPurlin.spec.split(' (')[0], 't', t((r.wallPurlin.weight + girtW + r.windows.frameWeight + r.windows.doorFrameWeight)/1000),
       isEn ? 'C-section·Galvanized · incl. parapet girt & door/window frame' : 'C型钢·镀锌 · 含女儿墙檩条+门窗框C型钢', UNIT_PRICES.purlin);
    SR(isEn ? 'Tie Rod' : '系杆', isEn ? _spTr(r.secondary.tieRod.spec) : r.secondary.tieRod.spec, 't', t(r.secondary.tieRod.weight/1000),
       isEn ? (r.secondary.tieRod.rows||2)+' rows' : (r.secondary.tieRod.rows||2)+'道', UNIT_PRICES.secondary);
    SR(isEn ? 'Brace+Strut+Knee' : '拉条+隅撑+撑杆', isEn ? 'Combined' : '组合', 't', t(r.secondary.brace.weight/1000),
       isEn ? 'Combined secondary' : '拉条+隅撑+撑杆(檩托板已并入钢柱/钢梁)', UNIT_PRICES.secondary);
    SR(isEn ? 'Roof/Cross Bracing' : '水平支撑+柱间支撑', isEn ? _spTr(r.secondary.bracing.spec) : r.secondary.bracing.spec, 't', t(r.secondary.bracing.weight/1000),
       isEn ? 'φ20 crossing rods per code' : '按规范增设·φ20圆钢交叉', UNIT_PRICES.secondary);
    if (r.mezzanine && r.mezzanine.hasMezzanine) {
      SR(isEn ? 'Mezz. Column (Welded H)' : '夹层柱(焊接H)', r.mezzanine.column.spec, 't', t(r.mezzanine.colWeight/1000),
         isEn ? r.mezzanine.totalCols+' pcs·'+(r.mezzanine2&&r.mezzanine2.hasMezzanine?'Ht 7.2m':'Ht 3.6m') : r.mezzanine.totalCols+'根·'+(r.mezzanine2&&r.mezzanine2.hasMezzanine?'通高7.2m':'高3.6m'), UNIT_PRICES.steelMain);
      SR(isEn ? 'Mezz. Main Beam (Welded H)' : '夹层主梁(焊接H)', r.mezzanine.beam.spec, 't', t(r.mezzanine.beamWeight/1000),
         isEn ? 'Col. spacing '+state.mezzColSpacing+'m' : '柱距'+state.mezzColSpacing+'m', UNIT_PRICES.steelMain);
      if (r.mezzanine.subBeamWeight > 0) SR(isEn ? 'Mezz. Sub Beam (Welded H)' : '夹层次梁(焊接H)', isEn ? 'Welded H' : '焊接H型钢', 't', t(r.mezzanine.subBeamWeight/1000), isEn ? '@2.5m' : '间距2.5m', UNIT_PRICES.steelMain);
      SR(isEn ? 'Mezz. Railing' : '夹层栏杆', isEn ? 'Steel pipe ~8kg/m' : '钢管栏杆~8kg/m', 't',
         t((r.mezzanine.railingSteel + (r.mezzanine2 && r.mezzanine2.hasMezzanine ? r.mezzanine2.railingSteel : 0))/1000),
         isEn ? ((r.mezzanine.railing||0) + (r.mezzanine2 && r.mezzanine2.hasMezzanine ? (r.mezzanine2.railing||0) : 0)).toFixed(0)+'m' + ((r.mezzanine2 && r.mezzanine2.hasMezzanine) ? ' ×2Lv' : '')
              : '外围+洞口周长' + ((r.mezzanine2 && r.mezzanine2.hasMezzanine) ? '×2层' : ''), UNIT_PRICES.steelMain);
      SR(isEn ? 'Steel Stair' : '钢楼梯', isEn ? '1 flight/level' : '钢梯1部/层', 't',
         t((r.mezzanine.stairsSteel + (r.mezzanine2 && r.mezzanine2.hasMezzanine ? r.mezzanine2.stairsSteel : 0))/1000),
         (r.mezzanine2 && r.mezzanine2.hasMezzanine) ? (isEn ? '2 levels' : '2层') : (isEn ? '1 level' : '1层'), UNIT_PRICES.steelMain);
      if (r.mezzanine2 && r.mezzanine2.hasMezzanine) {
        SR(isEn ? 'Mezz. L2 Main Beam (Welded H)' : '夹层二层主梁(焊接H)', r.mezzanine2.beam.spec, 't', t(r.mezzanine2.beamWeight/1000), isEn ? 'Level 2' : '二层', UNIT_PRICES.steelMain);
        if (r.mezzanine2.subBeamWeight > 0) SR(isEn ? 'Mezz. L2 Sub Beam (Welded H)' : '夹层二层次梁(焊接H)', isEn ? 'Welded H' : '焊接H型钢', 't', t(r.mezzanine2.subBeamWeight/1000), isEn ? '@2.5m' : '间距2.5m', UNIT_PRICES.steelMain);
      }
    }
    if (r.crane && r.crane.on) {   // 行车（吊车梁 + 牛腿）2026-09-28 r40
      SR(isEn ? 'Crane Girder' : '吊车梁', r.crane.beam.spec, 't', t(r.crane.beamWeight / 1000),
         isEn ? r.crane.tonnage + 't crane · ' + r.crane.gradeName + ' · span ' + r.crane.span.toFixed(1) + 'm ×' + r.crane.beamCount
              : r.crane.tonnage + 't行车·' + r.crane.gradeName + '·跨度' + r.crane.span.toFixed(1) + 'm·' + r.crane.beamCount + '条',
         UNIT_PRICES.steelMain);
      SR(isEn ? 'Corbel + Connections' : '牛腿+连接件', isEn ? 'Welded bracket' : '焊接牛腿', 't', t(r.crane.corbelWeight / 1000),
         isEn ? r.crane.corbelCount + ' pcs × ' + r.crane.corbelKg + 'kg' : r.crane.corbelCount + '个×' + r.crane.corbelKg + 'kg·含支承板/加劲肋',
         UNIT_PRICES.steelMain);
    }
    SR(isEn ? 'Anchor Bolt' : '地脚螺栓', r.bolts.anchorBolt.spec.split('(')[0], '根', r.bolts.anchorBolt.count,
       isEn ? r.bolts.anchorBolt.count+' pcs' : r.bolts.anchorBolt.count+'根/柱4根', UNIT_PRICES.anchorBolt);
    SR(isEn ? 'HS Bolt' : '高强螺栓', 'M20×70 10.9S', '套', r.bolts.hsBolt.count,
       isEn ? r.bolts.hsBolt.count+' sets' : r.bolts.hsBolt.count+'套/每节点8颗', UNIT_PRICES.hsBolt);
    SR(isEn ? 'Cleat Bolt' : '檩托板螺栓', isEn ? 'M12 galvanized' : 'M12镀锌', '套', r.bolts.cleatBolt.count,
       isEn ? r.bolts.cleatBolt.count+' sets' : r.bolts.cleatBolt.count+'套/每块檩托板4颗', UNIT_PRICES.cleatBolt);
    SR(isEn ? 'Ordinary Bolt' : '普通螺栓', isEn ? 'M12 galvanized' : 'M12镀锌', '套', r.bolts.ordinaryBolt.count,
       isEn ? r.bolts.ordinaryBolt.count+' sets' : r.bolts.ordinaryBolt.count+'套/每点4颗', UNIT_PRICES.ordBolt);

    // Enclosure data（单价：元）
    // disp / noPrice / note（2026-09-29 新增）：
    //   disp    = 数量列的显示文本（qty 仍为数值，保证合计与 Excel 公式不出 NaN）
    //   noPrice = true 时单价/金额显示「—」且不参与合计
    //   note    = 备注列文本（用于「门窗」这类数量说明，避免长文本挤宽数量列导致表头换行）
    var mtRows = [], mtIdx = 0;
    function MR(name, spec, unit, qty, price, disp, noPrice, note) {
      mtRows.push({id: ++mtIdx, name: name, spec: spec, unit: isEn ? enUnit(unit) : unit, qty: qty, price: price||0, disp: disp || null, noPrice: !!noPrice, note: note || ''});
    }
    MR(isEn ? 'Roof Panel' : '屋面板', isEn ? '0.5mm 840 Mesh Rockwool' : '0.5mm 840型拉网岩棉', 'm²', fmt(r.enclosure.roof, 0), UNIT_PRICES.roofPanel);
    if (r.enclosure.daylightArea > 0)
      MR(isEn ? 'Daylight Panel' : '采光带', isEn ? 'FRP 1.0m wide' : 'FRP采光板1.0m宽(屋脊对称)', 'm²', fmt(r.enclosure.daylightArea, 0), UNIT_PRICES.daylightPanel);
    MR(isEn ? 'Wall Panel' : '墙面板', isEn ? '0.4mm 900 Single Sheet' : '0.4mm 900型单瓦', 'm²', fmt(r.enclosure.wall, 0), UNIT_PRICES.wallPanel);
    var trimItem = r.maintenance.find(m => m.item && m.item.includes('屋脊'));
    if (trimItem) MR(isEn ? 'Ridge Cap+Trim+Corner' : '屋脊瓦+包边+角柱', isEn ? 'Color steel 0.5mm' : '彩钢板0.5mm', '延米', fmt(trimItem.length, 0), UNIT_PRICES.ridgeTrim);
    if (state.hasParapet) {
      MR(isEn ? 'Parapet Cladding' : '女儿墙围护', isEn ? '0.4mm 900 Sheet' : '0.4mm 900型单瓦', '延米', fmt((L+W)*2, 0), UNIT_PRICES.parapetClad);
    }
    // 天沟：2026-09-29 康师傅——只有带女儿墙才有排水天沟（内天沟）；无女儿墙不做天沟，报价不列不计价
    if (state.hasParapet) {
      MR(isEn ? 'Gutter' : '天沟', isEn ? 'Inner gutter' : '镀锌钢板(内天沟)', '延米', fmt(L*2, 0), UNIT_PRICES.gutter);
    }
    // 落水管：2026-09-29 康师傅——报价明细取消此项（第五章算量汇总仍列 φ160PVC 工量）
    // 门窗：2026-09-29 康师傅——合并为一行，只显示数量（窗 N 扇 + 门 M 樘），不计价
    //      数量列只放「12 / 2」这种短文本（放长文本会挤宽数量列 → 表头换行 → PDF 整页变高），
    //      完整说明写到备注列
    var winN = (r.windows && r.windows.count) || 0;
    var doorN = state.doorCount || 0;
    // 注意：报价表是 width:100% 自动列宽——「数量/单位/备注」列一旦放长文本，会把规格列挤窄，
    //       连带把表头与其它行挤成两行，整页高度上涨（2026-09-29 实测英文版 +84px）。
    //       故数量列只放「12+2」这种极短文本；英文备注列留空（价格列已用「—」表示不计价）。
    MR(isEn ? 'Doors & Windows' : '门窗',
       isEn ? '2.0m/bay + sliding door' : '每柱距1扇窗(2.0m宽) + 前纵墙推拉门',
       isEn ? 'pcs' : '扇/樘',
       fmt(r.windows.totalArea, 0), 0,
       isEn ? (winN + '+' + doorN) : (winN + ' / ' + doorN),
       true,
       isEn ? '' : (winN + ' 扇窗 + ' + doorN + ' 樘推拉门'));
    if (r.mezzanine && r.mezzanine.hasMezzanine) {
      var dA = r.mezzanine.deckArea + (r.mezzanine2&&r.mezzanine2.hasMezzanine?r.mezzanine2.deckArea:0);
      MR(isEn ? 'Mezz. Deck' : '夹层楼板', isEn ? 'Profiled steel 1.0mm T760' : '压型钢板1.0厚760型', 'm²', fmt(dA, 0), UNIT_PRICES.mezzDeck);
    }
    // 运输费 + 安装费（2026-09-27 康师傅：按总建筑面积，5 元/m²；安装费 2026-09-29 由 35 改 30）
    var mzA1 = r.mezzanine && r.mezzanine.hasMezzanine ? r.mezzanine.area : 0;
    var mzA2 = r.mezzanine2 && r.mezzanine2.hasMezzanine ? r.mezzanine2.area : 0;
    var tArea = L * W + mzA1 + mzA2;
    MR(isEn ? 'Transport' : '运输费', isEn ? '150km · floor area' : '150km内·按建筑面积', 'm²', fmt(tArea, 0), UNIT_PRICES.transport);
    MR(isEn ? 'Installation' : '安装费', isEn ? 'Erection on site' : '主体+围护现场安装', 'm²', fmt(tArea, 0), UNIT_PRICES.install);
  return { stRows: stRows, mtRows: mtRows };
}

// ====== 导出Excel (.xls) 中英双语双Sheet ======
function exportToCSV() {
  const r = state.result;
  if (!r) { toast('请先生成算量报告'); return; }

  const name = $('#projectName').value || '钢结构厂房';
  const L = state.length, W = state.width, H = state.height;
  const mz1A = r.mezzanine && r.mezzanine.hasMezzanine ? r.mezzanine.area : 0;
  const mz2A = r.mezzanine2 && r.mezzanine2.hasMezzanine ? r.mezzanine2.area : 0;
  const totalArea = (L * W) + mz1A + mz2A;
  const totalTons = r.totalSteel / 1000;

  function fmt(n, d) { return (n||0).toFixed(d||0); }
  function t(n) { return (n||0).toFixed(3); }

  // ====== 通用构建函数 (lang: 'cn'|'en') ======
  function buildSheet(lang) {
    var isEn = lang === 'en';
    var fx = FX_RATE;
    var LBL = {
      title: isEn ? 'Steel Structure Quotation' : '钢结构工程报价',
      addr: isEn ? 'Project: '+name : '工程地址：'+name,
      area: isEn ? 'Area: '+fmt(totalArea)+'m²' : '面积：'+fmt(totalArea)+'m²',
      unitPrice: isEn ? 'Unit Price:' : '单价：',
      sqm: isEn ? 'm²' : '㎡',
      structure: isEn ? 'Structure: '+(state.hasMiddleColumn?'Double Span':'Single Span') : '结构：'+(state.hasMiddleColumn?'双跨有中柱':'单跨无中柱'),
      colSpacing: isEn ? 'Col. Spacing: '+state.columnSpacing+'m' : '柱距：'+state.columnSpacing+'m',
      eaveHt: isEn ? 'Eave Ht: '+H+'m' : '檐高：'+H+'m',
      colSpec: isEn ? 'Column: '+r.main.column.spec : '柱：'+r.main.column.spec,
      beamInfo: isEn ? 'Beam: '+_spTr(r.main.beam.spec)+'  |  Roof Purlin: '+state.roofPurlinSpacing+'m  |  Wall Girt: '+state.wallPurlinSpacing+'m' : '梁型号：'+r.main.beam.spec+'  |  屋面檩距：'+state.roofPurlinSpacing+'m  |  墙面檩距：'+state.wallPurlinSpacing+'m',
      sec1: isEn ? '1. Steel Frame System' : '一、钢架系统',
      sec2: isEn ? '2. Enclosure System' : '二、围护系统',
      hNo: isEn ? 'No.' : '序号',
      hName: isEn ? 'Item' : '名称',
      hSpec: isEn ? 'Specification' : '规格',
      hUnit: isEn ? 'Unit' : '单位',
      hQty: isEn ? 'Qty' : '量',
      hPrice: isEn ? 'Unit Price (CNY)' : '单价',
      hAmt: isEn ? 'Amount (USD)' : '金额',
      hNote: isEn ? 'Remarks' : '备注',
      subtotal: isEn ? 'Subtotal' : '小计',
      total: isEn ? 'Total' : '工程合计',
      perSqm: isEn ? 'Per m²: '+fmt(totalTons*1000/totalArea,1)+' kg/m² | ~$'+fmt(totalTons*fx/totalArea,2)+'/m²' : '单方：'+fmt(totalTons*1000/totalArea,1)+' kg/m² · ¥'+fmt(estimateCNY(r)/totalArea,0)+'/m²',
      company: isEn ? 'Henan Laotie Steel Structure Engineering Co., Ltd. · Shangqiu, Henan · CECS 102 / GB 50017' : '河南老铁钢构工程有限公司 · 河南省商丘 · 基于 CECS 102 / GB 50017',
      fxInfo: (function() {
        if (!isEn) {
          var cny = estimateCNY(r);
          return '人民币报价 · 合计约 ¥' + cny.toLocaleString('zh-CN', {maximumFractionDigits: 0}) + ' · 单方约 ¥' + (cny/totalArea).toFixed(0) + '/m²';
        }
        var usd = totalTons*fx;
        return 'FX: $1=¥'+fx.toFixed(2)+' | Total steel: $'+usd.toLocaleString('en-US',{maximumFractionDigits:0});
      })(),
      sheetName: isEn ? 'Steel Quotation EN' : '钢结构报价',
    };

    // 数据行抽取为 _buildQuoteRows（exportToCSV 与客户方案书共用，2026-09-27 #66）
    var qd = _buildQuoteRows(isEn, r);
    var stRows = qd.stRows, mtRows = qd.mtRows;
    // Style
    var S = 'font-family:宋体;font-size:11pt;border-collapse:collapse;';
    var TH = 'background:#0C3B6E;color:#fff;font-weight:700;text-align:center;padding:5px 8px;border:.5pt solid #999;font-family:宋体;';
    var TDL = 'padding:4px 8px;border:.5pt solid #B2B2B2;text-align:left;font-family:宋体;';
    var TDR = 'padding:4px 8px;border:.5pt solid #B2B2B2;text-align:right;font-family:宋体;';
    var TDC = 'padding:4px 8px;border:.5pt solid #B2B2B2;text-align:center;font-family:宋体;';
    var SEC = 'background:#F0F4F8;font-weight:700;padding:5px 8px;text-align:left;font-family:宋体;border:.5pt solid #999;';
    var SUB = 'background:#FFF8DC;font-weight:700;padding:4px 8px;text-align:right;font-family:宋体;border:.5pt solid #B2B2B2;';
    var TOTAL = 'font-weight:700;padding:4px 8px;text-align:right;font-family:宋体;border-top:1pt solid #5B9BD5;border-bottom:2pt double #5B9BD5;';
    var TOTALL = 'font-weight:700;padding:4px 8px;text-align:left;font-family:宋体;border-top:1pt solid #5B9BD5;border-bottom:2pt double #5B9BD5;';

    var pageRows = [];
    var hr = 0;
    function tr(cells) { pageRows.push({cells: cells}); }

    tr([{c:8, cls:'padding:8px;text-align:center;background:#0C3B6E;color:#fff;font-size:14pt;font-weight:700;font-family:宋体;', val:LBL.title}]);
    tr([{c:2, cls:TDL, val:LBL.addr}, {c:2, cls:TDL, val:LBL.area}, {c:2, cls:TDL, val:LBL.unitPrice}, {c:2, cls:TDR, val:LBL.sqm}]);
    tr([{c:2, cls:TDL, val:LBL.structure}, {c:2, cls:TDL, val:LBL.colSpacing}, {c:2, cls:TDL, val:LBL.eaveHt}, {c:2, cls:TDL, val:LBL.colSpec}]);
    tr([{c:8, cls:TDL, val:LBL.beamInfo}]);
    // 客户信息（2026-09-28 业务员版：有填才打）
    custInfoLines(isEn ? 'en' : 'zh').forEach(function (x) { tr([{c:8, cls:TDL, val:x}]); });

    var h = '<table style="'+S+'">';
    for (var pi = 0; pi < pageRows.length; pi++) {
      var pr = pageRows[pi];
      h += '<tr>';
      for (var ci = 0; ci < pr.cells.length; ci++) {
        var cell = pr.cells[ci];
        h += '<td colspan="'+cell.c+'" style="'+cell.cls+'">'+cell.val+'</td>';
      }
      h += '</tr>';
    }
    hr = pageRows.length + 1;

    // Steel frame
    var stStartRow = hr + 1;
    h += '<tr><td colspan="8" style="'+SEC+'">'+LBL.sec1+'</td></tr>'; hr++;
    h += '<tr><td style="'+TH+'">'+LBL.hNo+'</td><td style="'+TH+'">'+LBL.hName+'</td><td style="'+TH+'">'+LBL.hSpec+'</td><td style="'+TH+'">'+LBL.hUnit+'</td><td style="'+TH+'">'+LBL.hQty+'</td><td style="'+TH+'">'+LBL.hPrice+'</td><td style="'+TH+'">'+LBL.hAmt+'</td><td style="'+TH+'">'+LBL.hNote+'</td></tr>'; hr++;

    // 单价/金额辅助
    function fmtPrice(p) { return (Math.round(p * 100) / 100).toString(); }
    function rowAmount(row) { var v = parseFloat(row.qty) * row.price; return isFinite(v) ? v : 0; }
    var stSum = 0, mtSum = 0;
    stRows.forEach(function (x) { stSum += rowAmount(x); });
    mtRows.forEach(function (x) { mtSum += rowAmount(x); });

    for (var si = 0; si < stRows.length; si++) {
      var sr = stRows[si];
      var dRow = hr;
      var bg = si%2===0 ? '' : 'background:#F7F9FC;';
      var priceFmla = isEn ? ("='钢结构报价'!F"+dRow+"/"+fx.toFixed(2)) : '';
      var amtFmla = isEn ? '=E'+dRow+'*F'+dRow : '=E'+dRow+'*F'+dRow;
      h += '<tr style="'+bg+'"><td style="'+TDC+'" x:num>'+sr.id+'</td><td style="'+TDL+'">'+sr.name+'</td><td style="'+TDL+'">'+sr.spec+'</td><td style="'+TDC+'">'+sr.unit+'</td><td style="'+TDR+'" x:num>'+sr.qty+'</td><td style="'+TDR+'"'+(isEn?' x:fmla="'+priceFmla+'"':'')+'>'+(isEn?'0':fmtPrice(sr.price))+'</td><td style="'+TDR+'" x:fmla="'+amtFmla+'">'+(isEn?'0':fmt(rowAmount(sr),0))+'</td><td style="'+TDL+'">'+sr.note+'</td></tr>';
      hr++;
    }

    var stSubRow = hr;
    var stLastDataRow = hr - 1;
    var stSubFmla = '=SUM(G'+stStartRow+':G'+stLastDataRow+')';
    h += '<tr><td colspan="4" style="'+SUB+'">'+LBL.subtotal+'</td><td style="'+SUB+'"> </td><td style="'+SUB+'"> </td><td style="'+SUB+'" x:fmla="'+stSubFmla+'">'+(isEn ? '' : fmt(stSum,0))+'</td><td style="'+SUB+'">'+fmt(totalTons,2)+' t</td></tr>'; hr++;

    // Enclosure
    var mtStartRow = hr + 1;
    h += '<tr style="height:10pt;"><td colspan="8"></td></tr>'; hr++;
    h += '<tr><td colspan="8" style="'+SEC+'">'+LBL.sec2+'</td></tr>'; hr++;
    h += '<tr><td style="'+TH+'">'+LBL.hNo+'</td><td style="'+TH+'">'+LBL.hName+'</td><td style="'+TH+'">'+LBL.hSpec+'</td><td style="'+TH+'">'+LBL.hUnit+'</td><td style="'+TH+'">'+LBL.hQty+'</td><td style="'+TH+'">'+LBL.hPrice+'</td><td style="'+TH+'">'+LBL.hAmt+'</td><td style="'+TH+'">'+LBL.hNote+'</td></tr>'; hr++;

    for (var mi = 0; mi < mtRows.length; mi++) {
      var mr = mtRows[mi];
      var dRow = hr;
      var bg = mi%2===0 ? '' : 'background:#F7F9FC;';
      var priceM = isEn ? ("='钢结构报价'!F"+dRow+"/"+fx.toFixed(2)) : '';
      var amtM = '=E'+dRow+'*F'+dRow;
      // 2026-09-29：门窗等「只显示数量不计价」的行——数量列可能是文本（此时去掉 x:num），单价/金额显示「—」
      var qCell = (mr.disp != null) ? '<td style="'+TDR+'">'+mr.disp+'</td>' : '<td style="'+TDR+'" x:num>'+mr.qty+'</td>';
      var pCell = mr.noPrice ? '<td style="'+TDR+'">—</td>' : '<td style="'+TDR+'"'+(isEn?' x:fmla="'+priceM+'"':'')+'>'+(isEn?'0':fmtPrice(mr.price))+'</td>';
      var aCell = mr.noPrice ? '<td style="'+TDR+'">—</td>' : '<td style="'+TDR+'" x:fmla="'+amtM+'">'+(isEn?'0':fmt(rowAmount(mr),0))+'</td>';
      h += '<tr style="'+bg+'"><td style="'+TDC+'" x:num>'+mr.id+'</td><td style="'+TDL+'">'+mr.name+'</td><td style="'+TDL+'">'+mr.spec+'</td><td style="'+TDC+'">'+mr.unit+'</td>'+qCell+pCell+aCell+'<td style="'+TDL+'">'+(mr.note||'')+'</td></tr>';
      hr++;
    }

    var mtSubRow = hr;
    var mtLastDataRow = hr - 1;
    var mtSubFmla = '=SUM(G'+mtStartRow+':G'+mtLastDataRow+')';
    h += '<tr><td colspan="4" style="'+SUB+'">'+LBL.subtotal+'</td><td style="'+SUB+'"> </td><td style="'+SUB+'"> </td><td style="'+SUB+'" x:fmla="'+mtSubFmla+'">'+(isEn ? '' : fmt(mtSum,0))+'</td><td style="'+SUB+'"></td></tr>'; hr++;

    // Grand total
    h += '<tr style="height:10pt;"><td colspan="8"></td></tr>'; hr++;
    var gtFmla = isEn ? '=G'+stSubRow+'+G'+mtSubRow : '=G'+stSubRow+'+G'+mtSubRow;
    h += '<tr><td colspan="4" style="'+TOTALL+'">'+LBL.total+'</td><td style="'+TOTAL+'">'+fmt(totalTons,2)+' t</td><td style="'+TOTAL+'">-</td><td style="'+TOTAL+'" x:fmla="'+gtFmla+'">'+(isEn?'0':fmt(stSum+mtSum,0))+'</td><td style="'+TOTAL+'">'+LBL.perSqm+'</td></tr>'; hr++;
    h += '<tr><td colspan="8" style="font-size:9pt;color:#999;padding:4px;font-family:宋体;">'+LBL.company+'</td></tr>';
    h += '<tr><td colspan="8" style="font-size:9pt;color:#E8A040;padding:0 4px 4px 4px;font-family:宋体;">'+LBL.fxInfo+'</td></tr>';
    // 报价条款（2026-09-28 康师傅确认：有效期/发货前付清/不含项/以合同为准）
    if (cust().showTerms !== false) {
      h += '<tr style="height:6pt;"><td colspan="8"></td></tr>';
      h += '<tr><td colspan="8" style="'+SEC+'">'+(isEn ? 'Terms &amp; Conditions' : '报价条款')+'</td></tr>';
      custTerms(isEn ? 'en' : 'zh').forEach(function (t, i) {
        h += '<tr><td colspan="8" style="font-size:9.5pt;padding:3px 8px;border:.5pt solid #B2B2B2;text-align:left;font-family:宋体;">'+(i + 1)+'. '+t+'</td></tr>';
      });
    }
    h += '</table>';
    return {html: h, sheetName: LBL.sheetName};
  }

  // Build both sheets
  var cn = buildSheet('cn');
  var en = buildSheet('en');

  // Combine into dual-sheet XLS
  var xls = '<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel"><head><meta charset="utf-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets>'+
    '<x:ExcelWorksheet><x:Name>'+cn.sheetName+'</x:Name><x:WorksheetOptions><x:DoNotDisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>'+
    '<x:ExcelWorksheet><x:Name>'+en.sheetName+'</x:Name><x:WorksheetOptions><x:DoNotDisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>'+
    '</x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body>'+cn.html+'<hr style="page-break-before:always;">'+en.html+'</body></html>';

  const blob = new Blob([xls], { type: 'application/vnd.ms-excel;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${name}_钢结构报价.xls`;
  a.click();
  URL.revokeObjectURL(url);
  toast('已导出中英双语报价单');
}

// ====== 客户方案书（A4 竖版 · 打印/另存 PDF，2026-09-27 #66 康师傅需求）======
// 抬头「河南老铁钢构工程有限公司」· 封面 + 3D 轴测 + 平/立/剖面 + 算量汇总 + 报价明细 + 工期付款
function buildProposalHTML(stripAutoPrint, lang) {
  const r = state.result;
  var en = (lang === 'en');
  if (!r) { toast(en ? 'Please generate the quantity report first.' : '请先生成算量报告'); return null; }
  try {
    // —— 文案层（2026-09-28 业务员版：中 / 英双语）——
    var T = en ? {
      cover: 'PROPOSAL', coverSub: 'Portal Frame Steel Structure Project',
      docName: 'Steel Structure Engineering Proposal',
      co: 'HENAN LAOTIE STEEL STRUCTURE ENGINEERING CO., LTD.',
      coSub: 'Shangqiu, Henan, China · Design / Fabrication / Installation',
      pjName: 'Project: ', size: 'Building Size: ', eaveHint: '(eave height)',
      floorArea: 'Floor Area', steel: 'Total Steel: ', estPrice: 'Est. Price: ',
      disclaim: 'This proposal is a system estimate based on GB 51022 / CECS 102 / GB 50017. Final quantities and price are subject to the formal construction drawing budget.',
      s1: '1. Project Overview', s2: '2. 3D Axonometric View', s3: '3. Architectural Drawings',
      s4: '4. Structural Drawings', s5: '5. Quantity Summary', s6: '6. Price Breakdown (CNY)',
      s7: '7. Schedule & Payment Terms',
      rDim: 'Building Size', rArea: 'Floor Area', rStruct: 'Structural Type', rMain: 'Main Members',
      rRoof: 'Roof System', rSky: 'Roof Skylight', rWall: 'Wall System', rPara: 'Parapet',
      rOpen: 'Doors & Windows', rTrans: 'Transport & Install', rCode: 'Design Codes',
      kSteel: 'Total Steel', kPerSqm: 'Steel per m²', kPrice: 'Est. Total Price', kPricePer: 'Cost per m²',
      n1: 'All values are auto-calculated from the current parameters; member sections use optimal sizing with engineering margin. Skylight is an envelope item and does not affect steel tonnage.',
      note3d: 'Rendered live from current parameters: ', noteDwg: 'All drawings are auto-generated from current parameters (grid lines, openings, skylight and bracing). Scale 1:100, dimensions in mm. The four elevations are front / rear longitudinal walls and left / right gable walls (mirrored).',
      // 2026-09-28 轴测效果图 3 视角 + 结构骨架透视图图注
      capAx1: '① Overall Appearance (low viewpoint · front elevation)', capAx2: '② Axonometric View (high viewpoint · two facades)', capAx3: '③ Roof Purlin & Frame Layout (roof panels hidden)',
      capSk1: '① Steel Frame Skeleton (roof & cladding hidden)', capSk2: '② Gable Bracing System',
      noteSk: 'Wall and roof panels are hidden above so the frames, purlins and bracing are clearly visible; all 3D views are rendered live from the current parameters.',
      noteFoot: 'Column bases and pad foundations are schematic; foundation size, depth and reinforcement per structural calculation. Anchor bolts by eave height (<8m M24 / 8-12m M27 / >12m M30), 4 per column.',
      noteFrame: 'Beam is a welded H-section; by stress it is divided into an eave-side tapered segment and a ridge-side straight segment. Joints use 10.9S high-strength bolts. Elevations in m, member sizes in mm.',
      qItem: 'Item', qSpec: 'Spec.', qQty: 'Quantity', qTotal: 'Total Steel',
      qtNo: 'No.', qtName: 'Item', qtSpec: 'Spec.', qtUnit: 'Unit', qtQty: 'Qty',
      qtPrice: 'Unit Price (CNY)', qtAmt: 'Amount (CNY)', qtNote: 'Remarks',
      qS1: '(1) Steel Frame System', qS2: '(2) Envelope System',
      qSub1: 'Steel Frame Subtotal', qSub2: 'Envelope Subtotal', qGrand: 'Grand Total',
      qNote: 'Note: fabrication is a composite reference price; transport + installation by floor area (CNY 5+30/m²); excludes civil works, fireproofing & fit-out; doors/windows & downpipes not priced.',
      sched1: '(1) Schedule', sched2: '(2) Payment Terms', sched3: '(3) Other Terms',
      thStage: 'Stage', thDur: 'Duration', thScope: 'Scope',
      st1: 'Detail design', st1d: '3-5 calendar days', st1s: 'Construction drawings, member details, material procurement',
      st2: 'Fabrication', st2d: '10-20 calendar days', st2s: 'Columns / beams / purlins / bracing fabrication, envelope material production',
      st3: 'Transport & erection', st3d: '13 calendar days', st3s: 'Delivery, main frame erection, envelope installation, acceptance',
      stT: 'Total', stTd: '26-38 calendar days', stTs: 'Counted from contract effectiveness and receipt of advance payment',
      thInst: 'Milestone', thPct: 'Ratio', thCond: 'Payment Condition',
      pay1: 'Advance payment', pay1c: 'Within 3 working days after contract signing',
      pay2: 'Material arrival', pay2c: 'Within 3 working days after steel materials arrive on site and are confirmed',
      pay3: 'Main frame completed', pay3c: 'Within 3 working days after main frame erection is confirmed',
      pay4: 'Roof panel installed', pay4c: 'Within 3 working days after roof panel installation is confirmed',
      pay5: 'Acceptance', pay5c: 'Within 3 working days after project acceptance',
      thWarranty: 'Warranty', vWarranty: 'Main structure 3 years · Envelope 1 year (from acceptance)',
      thValid: 'Quote validity', vValid: '30 days from issue',
      thIncl: 'Included', vIncl: 'Detail design and fabrication; transport (within 150km) and on-site erection are listed separately in the price',
      thExcl: 'Excluded', vExcl: 'Civil foundation, fireproof coating, secondary decoration, water & electricity',
      schedNote: 'The schedule and payment terms above are customary industry examples for negotiation; the formal contract shall prevail.',
      signAddr: '(Contact: __________  Tel: __________  Address: Shangqiu, Henan, China)',
      footer: 'HENAN LAOTIE STEEL STRUCTURE ENGINEERING CO., LTD. · Steel Structure Proposal',
      terms: '(4) Terms & Conditions'
    } : {
      cover: '方 案 书', coverSub: '门式刚架钢结构工程',
      docName: '钢结构工程方案书',
      co: '河南老铁钢构工程有限公司',
      coSub: 'HENAN LAOTIE STEEL STRUCTURE ENGINEERING CO., LTD. · 河南省商丘市',
      pjName: '项目名称：', size: '建筑规模：', eaveHint: '（檐口高度）',
      floorArea: '建筑面积', steel: '总用钢量：', estPrice: '参考总价：',
      disclaim: '本方案书算量与报价为系统预估（依据 GB 51022 / CECS 102 / GB 50017），最终以正式施工图预算为准',
      s1: '一、项目概况', s2: '二、三维轴测效果图', s3: '三、建筑图纸',
      s4: '四、结构图纸', s5: '五、结构算量汇总', s6: '六、报价明细（人民币）',
      s7: '七、工期与付款方式',
      rDim: '建筑尺寸', rArea: '建筑面积', rStruct: '结构形式', rMain: '主构件',
      rRoof: '屋面系统', rSky: '屋面采光带', rWall: '墙面系统', rPara: '女儿墙',
      rOpen: '门窗', rTrans: '运输与安装', rCode: '设计依据',
      kSteel: '总用钢量', kPerSqm: '单方用钢量', kPrice: '参考总价', kPricePer: '单方造价',
      n1: '注：以上为按当前参数的全自动算量结果，构件截面经「最优选型 + 工程余量」计算；采光带为纯围护项，不影响钢构总量。',
      note3d: '按当前参数实时渲染：', noteDwg: '图纸随当前参数自动生成（含轴线号、门窗布置、采光带与支撑标注），比例 1:100，尺寸单位 mm。四个立面为前 / 后纵墙与左 / 右山墙，左右山墙互为镜像。',
      // 2026-09-28 轴测效果图 3 视角 + 结构骨架透视图图注
      capAx1: '① 整体外观效果图（低视点 · 前纵墙立面）', capAx2: '② 三维轴测效果图（高视点 · 双立面透视）', capAx3: '③ 屋面檩条与刚架布置（隐藏屋面板俯瞰）',
      capSk1: '① 主体钢架骨架（隐藏屋面板与墙板）', capSk2: '② 山墙支撑体系（柱间支撑与系杆）',
      noteSk: '上两图隐藏墙板与屋面板，便于查看刚架、檩条与柱间支撑体系，了解主体用钢构成与安装顺序。',
      noteFoot: '柱脚与独立基础布置为示意，基础尺寸、埋深与配筋详结构计算；地脚螺栓按柱高分档（&lt;8m M24 / 8~12m M27 / &gt;12m M30），每柱 4 根。',
      noteFrame: '梁为变截面焊接 H 型钢，按受力分「檐口侧楔形段 + 屋脊侧直梁段」；节点高强螺栓 10.9S。图中标高单位 m，构件尺寸单位 mm。',
      qItem: '项目', qSpec: '规格', qQty: '数量', qTotal: '总用钢量合计',
      qtNo: '序号', qtName: '名称', qtSpec: '规格', qtUnit: '单位', qtQty: '数量',
      qtPrice: '单价(元)', qtAmt: '金额(元)', qtNote: '备注',
      qS1: '（一）钢架系统', qS2: '（二）围护系统',
      qSub1: '钢架系统小计', qSub2: '围护系统小计', qGrand: '工程合计',
      qNote: '注：构件加工为综合参考价；运输与安装已按建筑面积单独列项（5 + 30 元/m²）；不含土建基础、防火涂料及二次装修。门窗仅列数量、不计价；落水管仅列工量、不计价。',
      sched1: '（一）工期计划', sched2: '（二）付款方式', sched3: '（三）其他条款',
      thStage: '阶段', thDur: '历时', thScope: '主要内容',
      st1: '深化设计', st1d: '3~5 个日历天', st1s: '施工图深化、构件详图、材料采购',
      st2: '构件加工', st2d: '10~20 个日历天', st2s: '钢柱/钢梁/檩条/支撑加工，围护材料排产',
      st3: '运输及安装', st3d: '13 个日历天', st3s: '构件运输、主体吊装、围护安装、验收',
      stT: '总工期', stTd: '26~38 个日历天', stTs: '自合同生效且预付款到账之日起算',
      thInst: '期次', thPct: '比例', thCond: '付款条件',
      pay1: '预付款', pay1c: '合同签订后 3 个工作日内',
      pay2: '材料进场款', pay2c: '钢结构材料运抵施工现场经甲方确认后 3 个工作日内',
      pay3: '主体钢架完成款', pay3c: '主体钢架安装完成经甲方确认后 3 个工作日内',
      pay4: '屋面板安装款', pay4c: '屋面板安装完成经甲方确认后 3 个工作日内',
      pay5: '验收款', pay5c: '工程竣工验收合格后 3 个工作日内',
      thWarranty: '质保期', vWarranty: '主体结构 3 年 · 围护系统 1 年（自竣工验收合格起）',
      thValid: '报价有效期', vValid: '自出具之日起 30 天',
      thIncl: '包含范围', vIncl: '构件深化设计、加工制作；运输（150km 内）与现场安装已单独列项计入报价',
      thExcl: '不含范围', vExcl: '土建基础、防火涂料、二次装修、水电安装',
      schedNote: '以上工期与付款条款为行业常规示例，供双方洽谈参考，具体以正式合同约定为准。',
      signAddr: '（联系人：__________ 电话：__________ 地址：河南省商丘市）',
      footer: '河南老铁钢构工程有限公司 · 钢结构工程方案书',
      terms: '（四）报价条款'
    };

    var name = $('#projectName').value || (en ? '(Project name TBD)' : '（客户项目名称待填）');
    var L = state.length, W = state.width, H = state.height;
    var rise = Math.min((W / 2) * 0.105, 2.8);
    var ridgeH = H + rise;
    var mz1A = r.mezzanine && r.mezzanine.hasMezzanine ? r.mezzanine.area : 0;
    var mz2A = r.mezzanine2 && r.mezzanine2.hasMezzanine ? r.mezzanine2.area : 0;
    var area = L * W + mz1A + mz2A;
    var tons = r.totalSteel / 1000;
    var kgPerSqm = r.totalSteel / area;
    var cny = estimateCNY(r);

    // —— 客户信息与标准条款（2026-09-28 业务员版）——
    var ci = custInfoLines(en ? 'en' : 'zh');
    var terms = custTerms(en ? 'en' : 'zh');
    var showTerms = cust().showTerms !== false;
    function custBlock() {
      if (!ci.length) return '';
      return '<table style="margin:2px 0 6px"><tbody>'
        + ci.map(function (x) { return '<tr><td>' + x + '</td></tr>'; }).join('')
        + '</tbody></table>';
    }
    function termsBlock() {
      if (!showTerms) return '';
      return '<div class="cap">' + T.terms + '</div><table><tbody>'
        + terms.map(function (t, i) { return '<tr><td style="width:7%">' + (i + 1) + '</td><td>' + t + '</td></tr>'; }).join('')
        + '</tbody></table>';
    }

    // 报价数据行（与 Excel 导出共用一套；英文版走 isEn 分支）
    var qd = _buildQuoteRows(en, r);
    function amt(x) { var v = parseFloat(x.qty) * x.price; return isFinite(v) ? v : 0; }
    var stSum = 0; qd.stRows.forEach(function (x) { stSum += amt(x); });
    var mtSum = 0; qd.mtRows.forEach(function (x) { mtSum += amt(x); });

    // 3D 截图（渲染同帧 toDataURL，白底由文档 CSS 提供）
    // 2026-09-28（康师傅：PDF 内轴测效果图多加 2 张 → 共 3 张；另在结构图纸页补 2 张骨架透视图）
    //   ① opt.w/opt.h 钉死渲染像素 → 不同浏览器窗口高度（42vh）下出图比例恒定，方案书排版不飘；
    //   ② 每个视角的「画面比例」都按该视角下建筑投影包围盒的比例来定 → 建筑体横向填充 67%~97%
    //      （旧实现 980×377 截图里建筑只占 23%~38%，四周大片暗底，PDF 上看着空）
    var _S3 = (typeof window.__p3dShot === 'function') ? window.__p3dShot : null;
    var shot3d = _S3 ? _S3({ w: 1400, h: 530, theta: Math.PI * 0.92, phi: 1.16 }) : null;   // ① 整体外观（低视点正视 · 93% 填充）
    var shot3dLo = _S3 ? _S3({ w: 1000, h: 500, theta: Math.PI * 0.70, phi: 1.15 }) : null; // ② 高视点 3/4 轴测（70%）
    var shot3dTop = _S3 ? _S3({ w: 1000, h: 500, theta: Math.PI * 0.02, phi: 0.34, hide: ['roof'] }) : null; // ③ 檩条/刚架俯瞰（隐藏屋面板，97%）
    var shotSk1 = _S3 ? _S3({ w: 1000, h: 500, hide: ['roof', 'clad'], theta: Math.PI * 0.85, phi: 1.05 }) : null; // ④ 刚架骨架（85%）
    var shotSk2 = _S3 ? _S3({ w: 1000, h: 500, hide: ['roof', 'clad'], theta: Math.PI * 0.50, phi: 1.05 }) : null; // ⑤ 山墙支撑（67%）

    // 建筑图（打印配色：白底深线）—— 平面 1 + 立面 4 + 基础 1 + 刚架 1
    var AP = _archPalette(true);
    _DWG_EN = en;                        // 英文方案书 → 7 张图纸图内标注走英译规则
    window.__dwgFit = { shrunk: 0, truncated: 0 };
    // ⚠️ 2026-09-28 修「下载的 PDF 里图纸变小、跑偏」：html2canvas 序列化内联 SVG 时取的是**属性尺寸**，
    //    而图纸属性是 width="100%"（百分比拿不到具体值）→ 画小且偏移。
    //    PDF 模式把属性写成实际像素（内容列宽 711px = 794 − 2×11mm，高度按 viewBox 比例）；
    //    打印预览 / 页面画廊仍用 width="100%"，不受影响。
    function pdfFixSvg(svg) {
      if (!stripAutoPrint || !svg) return svg;
      return String(svg).replace(/(<svg[^>]*viewBox="0 0 ([\d.]+) ([\d.]+)"[^>]*?)width="100%"/,
        function (m, head, vw, vh) {
          var W = 711, H = Math.round(W * parseFloat(vh) / parseFloat(vw));
          return head + 'width="' + W + '" height="' + H + '"';
        });
    }
    var svgPlan = pdfFixSvg(_archPlan(AP));
    var svgEndL = pdfFixSvg(_archElevEnd(AP, 'left')), svgEndR = pdfFixSvg(_archElevEnd(AP, 'right'));
    var svgSideF = pdfFixSvg(_archElevSide(AP, 'front')), svgSideB = pdfFixSvg(_archElevSide(AP, 'back'));
    var svgFoot = pdfFixSvg(_archFooting(AP)), svgFrame = pdfFixSvg(_archFrame(AP));
    _DWG_EN = false;                     // 复位：界面图纸画廊 / 中文方案书仍为中文

    var dateStr = custDateText(en ? 'en' : 'zh');
    var num = function (n) { return Math.round(n).toLocaleString(en ? 'en-US' : 'zh-CN'); };

    // —— 每页页脚（2026-09-28：PDF 模式每页一条，把页底空白收口 + 标页码；打印预览模式不插）——
    var pgNo = 0;
    function pfoot() {
      if (!stripAutoPrint) return '';
      pgNo++;
      return '<div class="pfoot"><span>' + T.footer + '</span><span>' + (en ? 'Page ' : '第 ')
        + pgNo + ' / @@PGT@@' + (en ? '' : ' 页') + '</span></div>';
    }

    // —— 报价明细表 ——
    function quoteTable(rows) {
      var h = '<table class="qt"><thead><tr><th>' + T.qtNo + '</th><th>' + T.qtName + '</th><th>' + T.qtSpec + '</th><th>' + T.qtUnit + '</th>'
        + '<th class="r">' + T.qtQty + '</th><th class="r">' + T.qtPrice + '</th><th class="r">' + T.qtAmt + '</th><th>' + T.qtNote + '</th></tr></thead><tbody>';
      rows.forEach(function (x) {
        // 2026-09-29：disp = 数量列显示文本（门窗「窗 N 扇 + 门 M 樘」）；noPrice = 单价/金额显示「—」且不计入合计
        var qTxt = (x.disp != null) ? x.disp : x.qty;
        var pTxt = x.noPrice ? '—' : (Math.round(x.price * 100) / 100);
        var aTxt = x.noPrice ? '—' : num(amt(x));
        h += '<tr><td>' + x.id + '</td><td>' + x.name + '</td><td>' + x.spec + '</td><td>' + x.unit + '</td>'
          + '<td class="r">' + qTxt + '</td><td class="r">' + pTxt + '</td>'
          + '<td class="r">' + aTxt + '</td><td>' + (x.note || '') + '</td></tr>';
      });
      return h + '</tbody></table>';
    }

    // —— 算量汇总（与结果面板同口径：count > weight > area > length）——
    var calcRows = (r.breakdown || []).concat(r.maintenance || []).map(function (row) {
      var value;
      if (row.count != null) value = row.count.toLocaleString(en ? 'en-US' : 'zh-CN') + ' ' + (en ? _spTr(row.countUnit || '') : (row.countUnit || ''));
      else if (row.weight > 0 && row.weight >= 100) value = (row.weight / 1000).toFixed(2) + ' t';
      else if (row.weight > 0 && row.length > 0) value = row.length.toFixed(0) + ' m / ' + row.weight.toFixed(0) + ' kg';
      else if (row.weight > 0) value = row.weight.toFixed(0) + ' kg';
      else if (row.area > 0) value = row.area.toFixed(0) + ' m²';
      else if (row.length > 0) value = row.length.toFixed(0) + ' m';
      else value = '—';
      return '<tr><td>' + (en ? _enItemName(row.item) : row.item) + '</td><td>' + (en ? _spTr(row.spec) : row.spec) + '</td><td>' + value + '</td></tr>';
    }).join('');

    var dlc = state.daylightCount != null ? state.daylightCount : 1;
    var html = '<!DOCTYPE html><html lang="' + (en ? 'en' : 'zh-CN') + '"><head><meta charset="UTF-8">'
      + '<title>' + name + ' · ' + T.docName + '</title>'
      + '<style>'
      + '@page { size: A4 portrait; margin: 12mm 11mm; }'
      + '* { box-sizing: border-box; }'
      + 'body { font-family: "Microsoft YaHei","PingFang SC","SimSun",sans-serif; color:#1D2129; margin:0; background:#fff; }'
      + '.page { page-break-after: always; padding: 0; }'
      + '.page:last-child { page-break-after: auto; }'
      + '.r { text-align: right; }'
      + 'h2 { font-size: 15pt; color:#0C3B6E; border-left: 4px solid #0C3B6E; padding-left: 8px; margin: 14px 0 8px; }'
      + 'p.note { font-size: 9pt; color:#86909C; margin: 4px 0; }'
      + 'table { border-collapse: collapse; width: 100%; font-size: 8.5pt; }'
      + 'th, td { border: 0.5pt solid #B2B2B2; padding: 3px 5px; vertical-align: top; }'
      + 'th { background: #0C3B6E; color: #fff; text-align: center; font-weight: 700; }'
      + 'tr:nth-child(even) td { background: #F7F9FC; }'
      + '.sum td { background: #FFF8DC !important; font-weight: 700; }'
      + '.grand td { background: #E8F1FA !important; font-weight: 700; font-size: 10pt; }'
      + '.cover { text-align: center; padding-top: 40mm; }'
      + '.cover .co { font-size: 16pt; font-weight: 700; color: #0C3B6E; letter-spacing: 2px; }'
      + '.cover .co-sub { font-size: 9pt; color: #86909C; margin-top: 3mm; }'
      + '.cover h1 { font-size: 34pt; letter-spacing: 14px; margin: 26mm 0 6mm; color: #1D2129; }'
      + '.cover .sub { font-size: 16pt; letter-spacing: 8px; color: #4E5969; }'
      + '.cover .meta { margin-top: 30mm; font-size: 12pt; line-height: 2.2; color: #1D2129; }'
      + '.cover .meta b { color: #0C3B6E; }'
      + '.cover .date { margin-top: 16mm; font-size: 12pt; color: #4E5969; }'
      + '.cover .disclaim { margin-top: 22mm; font-size: 9pt; color: #86909C; }'
      + '.kpis { display: flex; gap: 3mm; margin: 8px 0 4px; }'
      + '.kpi { flex: 1; border: 0.5pt solid #C9CDD4; border-radius: 2mm; padding: 3mm 2mm; text-align: center; }'
      + '.kpi .v { font-size: 14pt; font-weight: 700; color: #0C3B6E; }'
      + '.kpi .l { font-size: 8.5pt; color: #86909C; margin-top: 1mm; }'
      + '.dwg { margin: 6px 0 14px; }'
      + '.dwg svg { width: 100%; height: auto; display: block; }'
      // 3D 效果图（2026-09-28）：主图全宽 + 两张半宽并排，图注居中
      + '.dwg img { width: 100%; height: auto; display: block; }'
      + '.shotg .cap3 { font-size: 8.5pt; color: #49607A; text-align: center; margin: 1mm 0 0; }'
      + '.shotg .shot-row { display: flex; gap: 3mm; margin: 3px 0 0; }'
      + '.shotg .shot-row > div { flex: 1 1 0; min-width: 0; }'
      + '.shotg .shot-row img { width: 100%; height: auto; display: block; border: 0.5pt solid #C9CDD4; }'
      + '.cap { font-size: 9.5pt; font-weight: 700; color: #4E5969; margin: 10px 0 2px; }'
      // 每页页脚：左公司名 / 右页码（PDF 模式绝对定位到页底，打印预览模式不出现）
      + '.pfoot { display: flex; justify-content: space-between; gap: 6mm; font-size: 7.5pt; color: #86909C; border-top: 0.5pt solid #C9CDD4; padding-top: 1.5mm; }'
      + '.footer { position: fixed; bottom: 6mm; left: 11mm; right: 11mm; font-size: 8pt; color: #86909C; border-top: 0.5pt solid #C9CDD4; padding-top: 1.5mm; display: flex; justify-content: space-between; }'
      + '.toolbar { position: fixed; top: 4mm; right: 6mm; z-index: 99; }'
      + '.toolbar button { background:#0C3B6E; color:#fff; border:none; border-radius:4px; padding:6px 14px; font-size:12pt; cursor:pointer; }'
      + '@media print { .toolbar { display: none; } }'
      // ⚠️ 2026-09-28 修「下载的 PDF 无内容」：PDF 模式（stripAutoPrint）把文档钉在 A4 内容宽 794px，
      //    页边距用 12mm/11mm 与 @page 对齐；打印预览模式（走浏览器 @page）不受影响
      // 2026-09-28 压留白：min-height 撑满一张 A4，页脚绝对定位收到页底；
      //    同时略收 .dwg 上下边距，把每页内容占比从 ~60% 提到 ~80%
      // ⚠️ min-height 只能取 1100px：html2pdf 内部 A4 页高 ≈ 1114px（不是 1123px），
      //    取 1122 会让每个页块都溢出到下一页 → PDF 变成 17 页且偶数页全空白。
      //    1100 留 14px 余量（实测 1100/1110/1114 均正好 9 页，1122 变 17 页）
      + (stripAutoPrint
        ? 'html,body{width:794px;margin:0;padding:0}'
          + '#docRoot,.page{width:794px}'
          + '.page{padding:12mm 11mm;position:relative;min-height:1100px}'
          + '.pfoot{position:absolute;left:11mm;right:11mm;bottom:8mm}'
          + '.dwg{margin:4px 0 8px}'
          + '.footer{display:none}'
        : '')
      + '</style></head>'
      + (stripAutoPrint ? '<body>' : '<body onload="setTimeout(function(){ try { window.print(); } catch(e){} }, 600)">')
      + '<div class="toolbar"><button onclick="window.print()">🖨 ' + (en ? 'Print / Save as PDF' : '打印 / 另存 PDF') + '</button></div>'
      + '<div id="docRoot">'

      // ---- 封面 ----
      + '<div class="page cover">'
      + '<div class="co">' + T.co + '</div>'
      + '<div class="co-sub">' + T.coSub + '</div>'
      + '<h1' + (en ? ' style="letter-spacing:6px;font-size:26pt"' : '') + '>' + T.cover + '</h1>'
      + '<div class="sub">' + T.coverSub + '</div>'
      + '<div class="meta">'
      + T.pjName + '<b>' + name + '</b><br>'
      + T.size + '<b>' + L + 'm × ' + W + 'm × ' + H + 'm</b>' + T.eaveHint + ' · ' + T.floorArea + ' <b>' + area.toFixed(0) + ' m²</b><br>'
      + T.steel + '<b>' + tons.toFixed(2) + ' t</b> · ' + T.estPrice + '<b>¥ ' + num(cny) + '</b>'
      + '</div>'
      + custBlock()
      + '<div class="date">' + dateStr + '</div>'
      + '<div class="disclaim">' + T.disclaim + '</div>'
      + pfoot()
      + '</div>'

      // ---- 一、项目概况 ----
      + '<div class="page">'
      + '<h2>' + T.s1 + '</h2>'
      + custBlock()
      + '<table><tbody>'
      + '<tr><td style="width:22%"><b>' + T.rDim + '</b></td><td>'
      + (en ? 'Length ' + L + 'm · Width ' + W + 'm · Eave height ' + H + 'm · Ridge height ' + ridgeH.toFixed(2) + 'm'
        : '长度 ' + L + 'm · 宽度 ' + W + 'm · 檐口高度 ' + H + 'm · 屋脊高度 ' + ridgeH.toFixed(2) + 'm') + '</td></tr>'
      + '<tr><td><b>' + T.rArea + '</b></td><td>' + area.toFixed(0) + ' m²'
      + (mz1A + mz2A > 0 ? (en ? ' (incl. mezzanine ' + (mz1A + mz2A).toFixed(0) + ' m²)' : '（含夹层 ' + (mz1A + mz2A).toFixed(0) + ' m²）') : '') + '</td></tr>'
      + '<tr><td><b>' + T.rStruct + '</b></td><td>'
      + (en ? 'Single-storey portal frame · ' + (state.hasMiddleColumn ? 'double span with center column' : 'single span') + ' · ' + r.main.numCols + ' frames · column spacing ' + state.columnSpacing + 'm · Q355B'
        : '单层门式刚架 · ' + (state.hasMiddleColumn ? '双跨有中柱' : '单跨无中柱') + ' · ' + r.main.numCols + '榀 · 柱距 ' + state.columnSpacing + 'm · Q355B') + '</td></tr>'
      + '<tr><td><b>' + T.rMain + '</b></td><td>' + (en ? 'Column ' : '钢柱 ') + r.main.column.spec + ' · ' + (en ? 'Beam ' : '钢梁 ')
      + (en ? String(r.main.beam.spec).replace(/楔形(\d+)%\+直梁(\d+)%/, 'tapered $1% + straight $2%') : r.main.beam.spec) + '</td></tr>'
      + '<tr><td><b>' + T.rRoof + '</b></td><td>'
      + (en ? '0.5mm Type-840 rock wool sandwich panel ' : '0.5mm 840型拉网岩棉复合板 ') + r.enclosure.roof.toFixed(0) + ' m²'
      + (r.enclosure.daylightArea > 0 ? (en ? ' (skylight ' + r.enclosure.daylightArea.toFixed(1) + ' m² deducted)' : '（已扣采光带 ' + r.enclosure.daylightArea.toFixed(1) + ' m²）') : '')
      + ' · ' + (en ? 'purlin spacing ' : '') + state.roofPurlinSpacing + 'm' + (en ? '' : ' 檩距') + '</td></tr>'
      + (r.enclosure.daylightArea > 0
        ? '<tr><td><b>' + T.rSky + '</b></td><td>'
        + (en ? dlc + ' row(s) · FRP 1.0m wide (symmetric at ridge, ' + dlc + ' per slope) · ' + r.enclosure.daylightArea.toFixed(1) + ' m²'
          : dlc + ' 道 · FRP 采光板 1.0m 宽（屋脊对称、每坡各 ' + dlc + ' 条）· ' + r.enclosure.daylightArea.toFixed(1) + ' m²') + '</td></tr>'
        : '<tr><td><b>' + T.rSky + '</b></td><td>' + (en ? 'Not provided' : '未设置') + '</td></tr>')
      + '<tr><td><b>' + T.rWall + '</b></td><td>'
      + (en ? '0.4mm Type-900 single color steel sheet ' : '0.4mm 900型单彩板 ') + r.enclosure.wall.toFixed(0) + ' m² · '
      + (en ? 'girt spacing ' : '') + state.wallPurlinSpacing + 'm' + (en ? '' : ' 墙梁距') + '</td></tr>'
      + '<tr><td><b>' + T.rPara + '</b></td><td>'
      + (state.hasParapet
        ? (en ? 'Height ' + (state.parapetHeight || 1) + 'm · internal gutter drainage' : '高 ' + (state.parapetHeight || 1) + 'm · 内天沟排水')
        : (en ? 'None · free drainage (no gutter)' : '无女儿墙 · 自由排水（不含天沟）')) + '</td></tr>'
      + '<tr><td><b>' + T.rOpen + '</b></td><td>'
      + (en ? 'Windows ' + r.windows.totalArea.toFixed(0) + ' m² (1 per bay · 2.0m wide · sill 1.2m) · Doors ' + (state.doorCount || 2) + ' × ' + (state.doorWidth || 4.5) + 'm sliding (front wall)'
        : '窗 ' + r.windows.totalArea.toFixed(0) + ' m²（每柱距 1 扇 · 2.0m 宽 · 窗台 1.2m）· 门 ' + (state.doorCount || 2) + ' 樘 ' + (state.doorWidth || 4.5) + 'm 宽推拉门（前纵墙）') + '</td></tr>'
      + '<tr><td><b>' + T.rTrans + '</b></td><td>'
      + (en ? 'Transport CNY 5/m² + installation CNY 30/m² · by floor area ' + area.toFixed(0) + ' m²'
        : '运输 5 元/m² + 安装 30 元/m² · 按建筑面积 ' + area.toFixed(0) + ' m² 计') + '</td></tr>'
      + '<tr><td><b>' + T.rCode + '</b></td><td>'
      + (en ? 'GB 51022 (Technical Code for Portal Frame Steel Structures) · CECS 102 · GB 50017 (Standard for Design of Steel Structures)'
        : '《门式刚架轻型房屋钢结构技术规范》GB 51022 · 《门式刚架规程》CECS 102 · 《钢结构设计标准》GB 50017') + '</td></tr>'
      + '</tbody></table>'
      + '<div class="kpis">'
      + '<div class="kpi"><div class="v">' + tons.toFixed(2) + ' t</div><div class="l">' + T.kSteel + '</div></div>'
      + '<div class="kpi"><div class="v">' + kgPerSqm.toFixed(1) + ' kg/m²</div><div class="l">' + T.kPerSqm + '</div></div>'
      + '<div class="kpi"><div class="v">¥ ' + num(cny) + '</div><div class="l">' + T.kPrice + '</div></div>'
      + '<div class="kpi"><div class="v">¥ ' + (cny / area).toFixed(0) + '/m²</div><div class="l">' + T.kPricePer + '</div></div>'
      + '</div>'
      + '<p class="note">' + T.n1 + '</p>'

      // ---- 二、三维轴测效果图（2026-09-28：与「项目概况」合页 + 3 个视角，压缩页底留白）----
      + '<h2 style="margin-top:12px">' + T.s2 + '</h2>'
      + (shot3d
        ? '<div class="shotg">'
        + '<div class="dwg" style="margin-top:0"><img src="' + shot3d + '" style="border:0.5pt solid #C9CDD4"></div>'
        + '<div class="cap3" style="margin-bottom:2mm">' + T.capAx1 + '</div>'
        + '<div class="shot-row">'
        + '<div><img src="' + (shot3dLo || shot3d) + '"><div class="cap3">' + T.capAx2 + '</div></div>'
        + '<div><img src="' + (shot3dTop || shot3d) + '"><div class="cap3">' + T.capAx3 + '</div></div>'
        + '</div></div>'
        + '<p class="note">' + T.note3d + L + '×' + W + '×' + H + 'm · '
        + (state.hasParapet ? (en ? 'parapet ' + (state.parapetHeight || 1) + 'm' : '女儿墙 ' + (state.parapetHeight || 1) + 'm') : (en ? 'no parapet' : '无女儿墙'))
        + (r.enclosure.daylightArea > 0 ? (en ? ' · ridge skylight' : ' · 屋脊对称采光带') : '')
        + (en ? ' · openings auto-arranged' : ' · 门窗按方案自动布置') + '</p>'
        : '<p class="note">' + (en ? '(3D rendering unavailable in this environment — page left blank)' : '（当前环境 3D 渲染不可用，本页留空）') + '</p>')
      + pfoot()
      + '</div>'

      // ---- 三、建筑图纸（平面 1 + 立面 4；2026-09-28 改为每页 2 张，减少页底留白）----
      + '<div class="page">'
      + '<h2>' + T.s3 + '</h2>'
      + '<div class="cap">' + (en ? 'Plan Layout 1:100' : '平面布置图 1:100') + '</div><div class="dwg">' + svgPlan + '</div>'
      + '<div class="cap">' + (en ? 'ⓐ End Elevation (left gable · axis 1) 1:100' : 'ⓐ 端立面图（左山墙 · ①轴）1:100') + '</div><div class="dwg">' + svgEndL + '</div>'
      + pfoot()
      + '</div>'
      + '<div class="page">'
      + '<div class="cap" style="margin-top:0">' + (en ? 'ⓑ Side Elevation (front wall · axis A) 1:100' : 'ⓑ 纵立面图（前纵墙 · A 轴）1:100') + '</div><div class="dwg">' + svgSideF + '</div>'
      + '<div class="cap">' + (en ? 'ⓒ Side Elevation (rear wall · last axis) 1:100' : 'ⓒ 纵立面图（后纵墙 · 末轴）1:100') + '</div><div class="dwg">' + svgSideB + '</div>'
      + '<p class="note">' + T.noteDwg + '</p>'
      + pfoot()
      + '</div>'
      + '<div class="page">'
      + '<div class="cap" style="margin-top:0">' + (en ? 'ⓓ End Elevation (right gable · last axis) 1:100' : 'ⓓ 端立面图（右山墙 · 末轴）1:100') + '</div><div class="dwg">' + svgEndR + '</div>'

      // ---- 四、结构图纸（单榀刚架剖面；2026-09-28 与端立面ⓓ合页）----
      + '<h2 style="margin-top:12px">' + T.s4 + '</h2>'
      + '<div class="cap" style="margin-top:0">' + (en ? 'Single Frame Section (fully annotated)' : '单榀刚架剖面图（全标注）') + '</div><div class="dwg">' + svgFrame + '</div>'
      + '<p class="note">' + T.noteFrame + '</p>'
      + pfoot()
      + '</div>'
      // ---- 四（续）、基础平面布置图 + 2 张结构骨架透视图（2026-09-28 补，填充页底空白）----
      + '<div class="page">'
      + '<div class="cap" style="margin-top:0">' + (en ? 'Foundation Plan (schematic)' : '基础平面布置图') + '</div><div class="dwg">' + svgFoot + '</div>'
      + '<p class="note">' + T.noteFoot + '</p>'
      + (shotSk1
        ? '<div class="shotg"><div class="shot-row">'
          + '<div><img src="' + shotSk1 + '"><div class="cap3">' + T.capSk1 + '</div></div>'
          + '<div><img src="' + (shotSk2 || shotSk1) + '"><div class="cap3">' + T.capSk2 + '</div></div>'
          + '</div></div>'
          + '<p class="note">' + T.noteSk + '</p>'
        : '')
      + pfoot()
      + '</div>'

      // ---- 五、算量汇总 ----
      + '<div class="page">'
      + '<h2>' + T.s5 + '</h2>'
      + '<table><thead><tr><th style="width:24%">' + T.qItem + '</th><th>' + T.qSpec + '</th><th style="width:22%">' + T.qQty + '</th></tr></thead><tbody>'
      + calcRows
      + '<tr class="grand"><td colspan="2">' + T.qTotal + '</td><td>' + tons.toFixed(2) + ' t（' + kgPerSqm.toFixed(1) + ' kg/m²）</td></tr>'
      + '</tbody></table>'
      + '<p class="note">' + (en
        ? 'Note: cleats are merged into columns/beams (wall→column, roof→beam); parapet girts are merged into wall girts; the pricing basis is identical to the Excel export.'
        : '注：檩托板已并入钢柱/钢梁（墙面→柱、屋面→梁）；女儿墙檩条并入墙面檩条；报价口径与 Excel 导出一致。') + '</p>'
      + pfoot()
      + '</div>'

      // ---- 六、报价明细 ----
      + '<div class="page">'
      + '<h2>' + T.s6 + '</h2>'
      + '<div class="cap">' + T.qS1 + '</div>'
      + quoteTable(qd.stRows)
      + '<table style="margin-top:-1px"><tbody><tr class="sum"><td colspan="6">' + T.qSub1 + '</td><td class="r">' + num(stSum) + '</td><td>' + tons.toFixed(2) + ' t</td></tr></tbody></table>'
      + '<div class="cap" style="margin-top:12px">' + T.qS2 + '</div>'
      + quoteTable(qd.mtRows)
      + '<table style="margin-top:-1px"><tbody><tr class="sum"><td colspan="6">' + T.qSub2 + '</td><td class="r">' + num(mtSum) + '</td><td></td></tr>'
      + '<tr class="grand"><td colspan="6">' + T.qGrand + '</td><td class="r">¥ ' + num(stSum + mtSum) + '</td><td>¥ ' + (cny / area).toFixed(0) + '/m²</td></tr></tbody></table>'
      + '<p class="note">' + T.qNote + '</p>'
      + pfoot()
      + '</div>'

      // ---- 七、工期与付款方式 ----
      + '<div class="page">'
      + '<h2>' + T.s7 + '</h2>'
      + '<div class="cap">' + T.sched1 + '</div>'
      + '<table><thead><tr><th style="width:28%">' + T.thStage + '</th><th style="width:22%">' + T.thDur + '</th><th>' + T.thScope + '</th></tr></thead><tbody>'
      + '<tr><td>' + T.st1 + '</td><td>' + T.st1d + '</td><td>' + T.st1s + '</td></tr>'
      + '<tr><td>' + T.st2 + '</td><td>' + T.st2d + '</td><td>' + T.st2s + '</td></tr>'
      + '<tr><td>' + T.st3 + '</td><td>' + T.st3d + '</td><td>' + T.st3s + '</td></tr>'
      + '<tr class="sum"><td>' + T.stT + '</td><td>' + T.stTd + '</td><td>' + T.stTs + '</td></tr>'
      + '</tbody></table>'
      + '<div class="cap" style="margin-top:14px">' + T.sched2 + '</div>'
      + '<table><thead><tr><th style="width:22%">' + T.thInst + '</th><th style="width:16%">' + T.thPct + '</th><th>' + T.thCond + '</th></tr></thead><tbody>'
      + '<tr><td>' + T.pay1 + '</td><td>30%</td><td>' + T.pay1c + '</td></tr>'
      + '<tr><td>' + T.pay2 + '</td><td>30%</td><td>' + T.pay2c + '</td></tr>'
      + '<tr><td>' + T.pay3 + '</td><td>30%</td><td>' + T.pay3c + '</td></tr>'
      + '<tr><td>' + T.pay4 + '</td><td>8%</td><td>' + T.pay4c + '</td></tr>'
      + '<tr><td>' + T.pay5 + '</td><td>2%</td><td>' + T.pay5c + '</td></tr>'
      + '</tbody></table>'
      + '<div class="cap" style="margin-top:14px">' + T.sched3 + '</div>'
      + '<table><tbody>'
      + '<tr><td style="width:22%">' + T.thWarranty + '</td><td>' + T.vWarranty + '</td></tr>'
      + '<tr><td><b>' + T.thValid + '</b></td><td>' + (en
        ? (cust().validDays || 30) + ' days from issue (until ' + custValidUntil('en') + ')'
        : '自出具之日起 ' + (cust().validDays || 30) + ' 天（至 ' + custValidUntil('zh') + '）') + '</td></tr>'
      + '<tr><td><b>' + T.thIncl + '</b></td><td>' + T.vIncl + '</td></tr>'
      + '<tr><td><b>' + T.thExcl + '</b></td><td>' + T.vExcl + '</td></tr>'
      + '</tbody></table>'
      + '<p class="note">' + T.schedNote + '</p>'
      + termsBlock()
      + '<div style="margin-top:26mm;text-align:right;font-size:11pt;line-height:2">'
      + T.co + '<br>' + dateStr + '<br>'
      + '<span style="font-size:9pt;color:#86909C">' + T.signAddr + '</span>'
      + '</div>'
      + pfoot()
      + '</div>'

      + '</div>'
      + '<div class="footer"><span>' + T.footer + '</span><span>' + name + ' · ' + L + '×' + W + '×' + H + 'm</span></div>'
      + '</body></html>';

    // 页脚页码占位符 → 实际总页数（pfoot() 逐页调用时还不知道总数）
    html = String(html).split('@@PGT@@').join(String(pgNo));
    return html;
  } catch (e) {
    console.error('方案书生成失败', e);
    toast('方案书生成失败：' + e.message);
    return null;
  }
}

// ====== 方案书 · 🖨 打印预览（可选：打印对话框里「另存为 PDF」，高保真）======
function buildProposalDoc(lang) {
  var html = buildProposalHTML(false, lang);
  if (!html) return;
  var w = window.open('', '_blank');
  if (!w) { toast('方案书窗口被浏览器拦截，请允许弹窗后重试', 5000); return; }
  w.document.open();
  w.document.write(html);
  w.document.close();
  window.__lastProposal = { mode: 'print', filename: null, html: html };
}

// ====== 方案书 · 📋 一键下载 PDF（2026-09-28 康师傅：像导出报价单一样直接下载）======
// 文件名：项目名_YYYYMMDD.pdf（无项目名 → 钢结构方案书_YYYYMMDD.pdf）
// 保存位置：浏览器「下载」文件夹（Edge 设置里可改到 D:\老铁钢构方案书）
//
// ⚠️ 2026-09-28 修「PDF 保存之后显示无内容」：
//   旧实现把方案书写进弹窗（视口 1500 宽），却按 html2canvas windowWidth:794 截图 →
//   克隆页按视口宽建窗（794）、却按文档宽（1500）排版 → 只截到文档最左侧 794px；
//   屏幕越宽截到的偏移越大，宽屏上几乎全白（= 用户看到的「无内容」）。
//   现改为：把方案书写进 **794px 宽的离屏 iframe**（794px = A4 内容宽），在 iframe 内部跑 html2pdf，
//   视口宽与画布宽恒等 → 截图区域固定为 [0,794]，不再裁切；顺带修掉手机端（视口 390）排版跑版。
function downloadProposalPDF(lang) {
  var en = (lang === 'en');
  var html = buildProposalHTML(true, lang);
  if (!html) return;
  var projName = ($('#projectName').value || '').trim().replace(/[\\/:*?"<>|]/g, '').slice(0, 60);
  var d = new Date(), pz = function (n) { return n < 10 ? '0' + n : '' + n; };
  var fname = (projName || (en ? 'Steel-Structure-Proposal' : '钢结构方案书')) + (en ? '_EN' : '')
    + '_' + d.getFullYear() + pz(d.getMonth() + 1) + pz(d.getDate()) + '.pdf';

  // 进度条画在主页面（离屏 iframe 里的进度用户看不见）
  var bar = document.createElement('div');
  bar.className = 'pdf-savebar';
  bar.style.cssText = 'position:fixed;left:50%;top:14px;transform:translateX(-50%);z-index:99999;'
    + 'padding:10px 20px;border-radius:6px;font-size:14px;box-shadow:0 4px 16px rgba(0,0,0,.18);'
    + 'background:#EEF3FB;color:#0C3B6E;border:1px solid #A9C2E0;max-width:90vw;';
  bar.textContent = '⏳ 正在生成 PDF，请稍候…';
  document.body.appendChild(bar);
  function setBar(t, ok) {
    bar.textContent = t;
    if (ok === true) bar.style.cssText += ';background:#E8F7EE;color:#0E6B3C;border-color:#7BC49A;';
    else if (ok === false) bar.style.cssText += ';background:#FDECEC;color:#A8071A;border-color:#F0A0A0;';
  }
  function drop(ms) { setTimeout(function () { if (bar.parentNode) bar.parentNode.removeChild(bar); }, ms); }

  // ⚠️ 2026-09-29：这里原来写的是绝对路径 '/assets/vendor/html2pdf.bundle.min.js'。
  //   走 8789 服务时没问题，但**双击 index.html 用 file:// 打开**时会解析成
  //   file:///C:/assets/vendor/html2pdf.bundle.min.js（跑到 C 盘根目录）→ 库加载失败（ERR_FILE_NOT_FOUND）
  //   → 方案书 PDF 出不来。改成按当前页面地址解析成完整 URL，两种打开方式都能用。
  var _libRel = 'assets/vendor/html2pdf.bundle.min.js';
  var _libUrl = _libRel;
  try { _libUrl = new URL(_libRel, location.href).href; } catch (e) { /* 保留相对路径兜底 */ }
  var inject = '<script src="' + _libUrl + '"><\/script>'
    + '<script>(function(){var F=' + JSON.stringify(fname) + ';'
    + 'function go(){'
    + 'var el=document.getElementById("docRoot");'
    + 'if(!el){window.__pdfState="failed";window.__pdfMsg="方案书内容为空";return;}'
    + 'if(typeof html2pdf!=="function"){window.__pdfState="failed";window.__pdfMsg="PDF 生成库未加载（assets/vendor/html2pdf.bundle.min.js）";return;}'
    + 'var opt={margin:0,filename:F,image:{type:"jpeg",quality:0.96},'
    + 'html2canvas:{scale:2,useCORS:true,backgroundColor:"#ffffff",scrollX:0,scrollY:0},'
    + 'jsPDF:{unit:"mm",format:"a4",orientation:"portrait"},'
    + 'pagebreak:{mode:["css","legacy"],avoid:["tr","td","table",".kpi"]}};'
    + 'window.__pdfState="running";'
    + 'html2pdf().set(opt).from(el).toPdf().get("pdf").then(function(pdf){'
    + 'window.__pdfObj=pdf;'
    + 'try{window.__pdfBlob=pdf.output("blob");}catch(e){window.__pdfBlob=null;}'
    + 'window.__pdfState="done";'
    + '}).catch(function(e){window.__pdfState="failed";window.__pdfMsg=(e&&e.message)?e.message:String(e);});'
    + '}'
    + 'function ready(){setTimeout(go,80);}'
    + 'if(document.readyState==="complete"){ready();}else{window.addEventListener("load",ready);}'
    + '})();<\/script>';

  var docHTML = html.replace('</body>', inject + '</body>');
  var frame = document.createElement('iframe');
  frame.id = '__proposalPdfFrame';
  frame.setAttribute('aria-hidden', 'true');
  frame.style.cssText = 'position:fixed;left:-20000px;top:0;width:794px;height:1200px;border:0;';
  document.body.appendChild(frame);
  var fd = null;
  try {
    fd = frame.contentDocument || frame.contentWindow.document;
    fd.open(); fd.write(docHTML); fd.close();
  } catch (e) {
    if (frame.parentNode) frame.parentNode.removeChild(frame);
    setBar('❌ 方案书渲染失败：' + (e && e.message ? e.message : e), false);
    drop(6000);
    return;
  }
  // 撑满内容高度（宽度恒 794）：避免 iframe 内部滚动影响取景
  setTimeout(function () {
    try { frame.style.height = Math.max(1200, fd.documentElement.scrollHeight) + 'px'; } catch (e) {}
  }, 600);

  function cleanup(ms) {
    setTimeout(function () { try { if (frame.parentNode) frame.parentNode.removeChild(frame); } catch (e) {} }, ms);
  }

  var waited = 0;
  var timer = setInterval(function () {
    waited += 400;
    var st = '';
    try { st = frame.contentWindow.__pdfState || ''; } catch (e) { st = ''; }

    if (st === 'done') {
      clearInterval(timer);
      var ok = false, blob = null, fw = null;
      try { fw = frame.contentWindow; blob = fw.__pdfBlob; } catch (e) {}
      if (blob && blob.size) {
        // 在主文档触发下载：文件名可控，且不受 iframe 下载策略影响
        try {
          var url = URL.createObjectURL(blob);
          var a = document.createElement('a');
          a.href = url; a.download = fname;
          document.body.appendChild(a); a.click(); a.remove();
          setTimeout(function () { URL.revokeObjectURL(url); }, 30000);
          ok = true;
        } catch (e) { ok = false; }
      }
      if (!ok && fw && fw.__pdfObj) {                     // 兜底：iframe 内直接 save()
        try { fw.__pdfObj.save(fname); ok = true; } catch (e) { ok = false; }
      }
      if (ok) setBar('✅ 已下载：' + fname + '（落在浏览器「下载」文件夹）', true);
      else setBar('❌ PDF 保存失败，请改用「🖨 打印」→「另存为 PDF」', false);
      drop(ok ? 6000 : 10000);
      cleanup(5000);
    } else if (st === 'failed') {
      clearInterval(timer);
      var msg = '';
      try { msg = frame.contentWindow.__pdfMsg || ''; } catch (e) {}
      setBar('❌ PDF 生成失败：' + (msg || '未知错误') + '（可改用「🖨 打印」→「另存为 PDF」）', false);
      drop(10000);
      cleanup(4000);
    } else if (waited >= 120000) {
      clearInterval(timer);
      setBar('❌ PDF 生成超时，请刷新页面重试（或改用「🖨 打印」→「另存为 PDF」）', false);
      drop(10000);
      cleanup(4000);
    }
  }, 400);

  window.__lastProposal = { mode: 'download', filename: fname, html: docHTML };
  toast('方案书已生成，PDF 下载中：' + fname, 6000);
}

// ====== Toast ======
function toast(msg, ms) {
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), ms || 2000);
}

// ====== 复制算量结果 ======
function copyReport() {
  const r = state.result;
  if (!r) return;
  const name = $('#projectName').value || '钢结构厂房';
  const dims = `${state.length}m×${state.width}m×${state.height}m`;
  const total = (r.totalSteel / 1000).toFixed(2);

  let text = `【老铁钢构 · 算量结果】\n`;
  text += `项目: ${name}\n`;
  text += `尺寸: ${dims}  |  结构: ${state.hasMiddleColumn ? '双跨有中柱' : '单跨无中柱'}\n`;
  text += `柱距: ${state.columnSpacing}m  |  柱型号: ${r.main.column.spec}\n`;
  text += `梁型号: ${r.main.beam.spec}\n`;
  text += `屋面檩条: ${r.roofPurlin.spec}\n`;
  text += `墙面檩条: ${r.wallPurlin.spec}\n`;
  text += `总用钢量: ${r.totalSteel.toFixed(0)} kg (约${total}吨)\n`;
  if (r.mezzanine && r.mezzanine.hasMezzanine) {
    text += `一层夹层: ${r.mezzanine.area.toFixed(0)}m² (${state.mezz1Use === 'storage' ? '仓储' : '办公'}) +${r.mezzanine.total.toFixed(0)}kg\n`;
  }
  if (r.mezzanine2 && r.mezzanine2.hasMezzanine) {
    text += `二层夹层: ${r.mezzanine2.area.toFixed(0)}m² (${state.mezz2Use === 'storage' ? '仓储' : '办公'}) +${r.mezzanine2.total.toFixed(0)}kg\n`;
  }
  text += `地脚螺栓: ${r.bolts.anchorBolt.count}根  |  高强螺栓: ${r.bolts.hsBolt.count}套  |  檩托板螺栓: ${r.bolts.cleatBolt.count}套  |  普通螺栓: ${r.bolts.ordinaryBolt.count}套\n`;
  text += `围护面积: ${r.enclosure.total.toFixed(0)} m²\n`;
  text += `\n📞 获取精准报价: 16650735555 (老铁钢构)\n`;

  navigator.clipboard.writeText(text).then(() => {
    toast('✅ 已复制！发给老铁获取报价');
  }).catch(() => {
    toast('复制失败，请直接致电 16650735555');
  });
}

// ====== 基准评估 ======
function getBenchmarkInfo(area, sps) {
  if (area <= 300) {
    if (sps < 35) return { cls: 'good', text: '✅ 经济合理' };
    if (sps <= 48) return { cls: 'normal', text: '⚡ 正常范围' };
    return { cls: 'high', text: '⚠ 偏高' };
  }
  if (area <= 1000) {
    if (sps < 28) return { cls: 'good', text: '✅ 经济合理' };
    if (sps <= 45) return { cls: 'normal', text: '⚡ 正常范围' };
    return { cls: 'high', text: '⚠ 偏高' };
  }
  if (sps < 24) return { cls: 'good', text: '✅ 经济合理' };
  if (sps <= 40) return { cls: 'normal', text: '⚡ 正常范围' };
  return { cls: 'high', text: '⚠ 偏高' };
}

// ====== 方案对比 ======
function toggleCompare() {
  const body = $('#compareBody');
  const arrow = $('#compareArrow');
  if (body.style.display === 'none') {
    body.style.display = 'block';
    arrow.classList.add('open');
    renderCompare();
  } else {
    body.style.display = 'none';
    arrow.classList.remove('open');
  }
}

function renderCompare() {
  const r = state.result;
  if (!r) return;

  let altParams = {
    length: state.length * 1000,
    width: state.width * 1000,
    height: state.height * 1000,
    hasMiddleColumn: state.hasMiddleColumn,
    isTapered: state.sectionType === 'tapered',
    roofPurlinSpacing: state.roofPurlinSpacing * 1000,
    wallPurlinSpacing: state.wallPurlinSpacing * 1000,
    columnSpacing: state.columnSpacing * 1000,
    hasParapet: state.hasParapet,
    parapetHeight: state.parapetHeight * 1000,
    windowScheme: state.windowScheme,
    winWidth: state.winWidth * 1000,
    winHeight: state.winHeight * 1000,
    count: state.winCount,
    sillHeight: state.sillHeight * 1000,
    location: state.winLocation,
    autoLayout: true,
    doorCount: state.doorCount,
    doorWidth: state.doorWidth * 1000,
    doorHeight: state.doorHeight * 1000,
    doorOnWall: state.doorOnWall,
  };

  if (state.hasParapet) {
    altParams.hasParapet = false;
    altParams.parapetHeight = 0;
  } else {
    altParams.hasMiddleColumn = !state.hasMiddleColumn;
  }

  let alt;
  try { alt = calculateAll(altParams); } catch(e) { return; }

  const diff = r.totalSteel - alt.totalSteel;
  const diffSign = diff > 0 ? 'plus' : 'minus';
  const diffText = diff > 0 ? `+${diff.toFixed(0)} kg` : `${diff.toFixed(0)} kg`;

  const curLabel = state.hasParapet ? '带女儿墙' : (state.hasMiddleColumn ? '有中柱' : '无中柱');
  const altLabel = state.hasParapet ? '无女儿墙' : (state.hasMiddleColumn ? '无中柱' : '有中柱');

  $('#compareBody').innerHTML = `
    <table class="compare-table">
      <thead><tr><th>对比项</th><th>${curLabel} (当前)</th><th>${altLabel} (对比)</th><th>差异</th></tr></thead>
      <tbody>
        <tr><td>总用钢量</td><td>${r.totalSteel.toFixed(0)} kg</td><td>${alt.totalSteel.toFixed(0)} kg</td><td class="diff ${diffSign}">${diffText}</td></tr>
        <tr><td>单方用钢</td><td>${(r.totalSteel/(state.length*state.width)).toFixed(1)} kg/m²</td><td>${(alt.totalSteel/(state.length*state.width)).toFixed(1)} kg/m²</td><td class="diff ${diffSign}">${(diff/(state.length*state.width)).toFixed(1)} kg/m²</td></tr>
        <tr><td>主结构</td><td>${r.main.total.toFixed(0)} kg</td><td>${alt.main.total.toFixed(0)} kg</td><td class="diff ${diff > 0 ? 'plus' : 'minus'}">${(r.main.total - alt.main.total).toFixed(0)} kg</td></tr>
        <tr><td>檩条合计</td><td>${(r.roofPurlin.weight+r.wallPurlin.weight).toFixed(0)} kg</td><td>${(alt.roofPurlin.weight+alt.wallPurlin.weight).toFixed(0)} kg</td><td class="diff ${(r.roofPurlin.weight+r.wallPurlin.weight - alt.roofPurlin.weight-alt.wallPurlin.weight) > 0 ? 'plus' : 'minus'}">${(r.roofPurlin.weight+r.wallPurlin.weight - alt.roofPurlin.weight-alt.wallPurlin.weight).toFixed(0)} kg</td></tr>
        <tr><td>维护面积</td><td>${r.enclosure.total.toFixed(0)} m²</td><td>${alt.enclosure.total.toFixed(0)} m²</td><td class="diff ${(r.enclosure.total - alt.enclosure.total) > 0 ? 'plus' : 'minus'}">${(r.enclosure.total - alt.enclosure.total).toFixed(0)} m²</td></tr>
      </tbody>
    </table>
    <p style="font-size:11px;color:var(--text-hint);margin-top:8px">💡 绿色=节省 红色=增加 · 最终报价以前端沟通为准</p>
  `;
}

// ====== 分享到微信 ======
function shareToWechat() {
  const r = state.result;
  if (!r) return;
  const name = $('#projectName').value || '钢结构厂房';
  const dims = `${state.length}m×${state.width}m×${state.height}m`;
  const total = (r.totalSteel / 1000).toFixed(2);
  const mz1A = r.mezzanine && r.mezzanine.hasMezzanine ? r.mezzanine.area : 0;
  const mz2A = r.mezzanine2 && r.mezzanine2.hasMezzanine ? r.mezzanine2.area : 0;
  const area = state.length * state.width + mz1A + mz2A;
  const sps = (r.totalSteel / area).toFixed(1);

  let text = `【老铁钢构 · 算量报告】\n`;
  text += `━━━━━━━━━━━━━━\n`;
  text += `${name} | ${dims}\n`;
  if (r.mezzanine && r.mezzanine.hasMezzanine) {
    text += `一层夹层: ${r.mezzanine.area.toFixed(0)}m² (${state.mezz1Use === 'storage' ? '仓储' : '办公'}) +${r.mezzanine.total.toFixed(0)}kg\n`;
  }
  if (r.mezzanine2 && r.mezzanine2.hasMezzanine) {
    text += `二层夹层: ${r.mezzanine2.area.toFixed(0)}m² (${state.mezz2Use === 'storage' ? '仓储' : '办公'}) +${r.mezzanine2.total.toFixed(0)}kg\n`;
  }
  text += `总用钢 ≈ ${total}吨 | 单方 ≈ ${sps}kg/m²\n`;
  text += `━━━━━━━━━━━━━━\n`;
  text += `📞 报价热线: 16650735555\n`;
  text += `🔗 免费算量: https://93c32bd30db849b482cae910ea1db8af.app.codebuddy.work\n`;
  text += `\n📱 长按扫码加微信获取精准报价`;

  navigator.clipboard.writeText(text).then(() => {
    toast('✅ 已复制！请打开微信粘贴发送');
  }).catch(() => {
    toast('复制失败，请直接致电 16650735555');
  });
}

// ====== 微信弹窗 ======
function toggleWechatPop() {
  const pop = $('#wechatPopup');
  pop.style.display = pop.style.display === 'none' ? 'flex' : 'none';
}
document.addEventListener('click', (e) => {
  const pop = $('#wechatPopup');
  if (pop && pop.style.display === 'flex' && !e.target.closest('.btn-wechat') && !e.target.closest('.wechat-popup')) {
    pop.style.display = 'none';
  }
});

// ====== 一键重置 ======
function resetAll() {
  Object.assign(state, {
    length: 30, width: 15, height: 8,
    hasMiddleColumn: false, sectionType: 'tapered',
    roofPurlinSpacing: 1.5, wallPurlinSpacing: 1.5, columnSpacing: 6,
    snowLoad: 0.5, windLoad: 0.35, basicWind: 0.45, windZone: 'henan', daylightCount: 1,
    hasCrane: false, craneTonnage: 5, craneGrade: 'A3A5', craneRailHeight: null,
    hasParapet: true, parapetHeight: 1.5,
    // 门窗固定值（步骤3已删除）：每柱距1扇窗(宽2m·台1.2m) + 前2樘门(4.5×5.5)
    windowScheme: 'vertical', winWidth: 2.0, winHeight: null,
    sillHeight: 1.2, winLocation: 'all', autoLayout: true,
    doorCount: 2, doorWidth: 4.5, doorHeight: 5.5, doorOnWall: 'front',
    mezzanineLevels: 0, mezz1Ratio: 50, mezz1Use: 'storage', mezz2Use: 'storage', mezzColSpacing: 4,
  });
  syncInputsToState();
  $('#projectName').value = '';
  $('#columnSpacing').value = '6';
  $('#roofSpacing').value = '1.5';
  $('#wallSpacing').value = '1.5';
  $('#snowLoad').value = '0.5';
  if ($('#windW0')) $('#windW0').value = '0.45';
  if ($('#windZone')) $('#windZone').value = 'henan';
  renderWindHint();
  $('#daylightCount').value = '1';
  if ($('#craneRailH')) $('#craneRailH').value = '';
  updateCraneUI();
  updateParapetCards();
  updateStructMezzUI();
  updateRadioGroup('sectionType');
  goToStep(1);
  recalculate();
  renderDiagram();
  localStorage.removeItem('steelToolState');
  toast('✅ 已恢复默认设置');
}

// ====== 结构示意图 ======
function renderDiagram() {
  var svg = document.getElementById('structureSvg');
  if (!svg) return;
  var r = state.result;

  var color  = '#0C3B6E', colorMid = '#FF7D00', colorMz = '#E8A040', colorGray = '#86909C';
  var W = state.width, H = state.height, L = state.length;
  var spanText = state.hasMiddleColumn ? (W/2).toFixed(1)+'m' : W.toFixed(1)+'m';
  var lv = state.mezzanineLevels;
  var ratio = state.mezz1Ratio;
  var colSpec = r ? r.main.column.spec : 'H350×250×8×14';
  var beamSpec = r ? r.main.beam.spec : 'H600×250×10×16';
  var rpSpec = r ? r.roofPurlin.spec.split(' (')[0] : 'C180×70×20×2.5';
  var wpSpec = r ? r.wallPurlin.spec.split(' (')[0] : 'C160×60×20×2.5';
  var tieSpec = r ? r.secondary.tieRod.spec : 'φ114×3';
  var roofSpacing = state.roofPurlinSpacing;
  var wallSpacing = state.wallPurlinSpacing;
  var cs = state.columnSpacing;
  var numFrames = r ? r.main.numCols : Math.ceil(L/cs)+1;

  var h = [];
  function Ln(x1,y1,x2,y2,sw,cl) { h.push('<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+cl+'" stroke-width="'+sw+'"/>'); }
  function Tx(x,y,size,cl,text,anchor,bold) { 
    anchor = anchor || 'middle';
    h.push('<text x="'+x+'" y="'+y+'" text-anchor="'+anchor+'" font-size="'+size+'" fill="'+cl+'"'+(bold?' font-weight="bold"':'')+'>'+text+'</text>');
  }
  // label box: text inside a rounded rectangle
  function Tag(x,y,w,text,bgcol,bordercol) {
    var cx = x - w/2;
    h.push('<rect x="'+cx+'" y="'+(y-9)+'" width="'+w+'" height="16" rx="3" fill="'+bgcol+'" stroke="'+bordercol+'" stroke-width="0.5"/>');
    Tx(x, y+3, 9, '#1D2129', text);
  }

  var leftX = 60, rightX = 490, midX = (leftX+rightX)/2;
  var groundY = 170, topY = 55, beamY = 38;
  var leftQuarter = leftX + (midX-leftX)/2;
  var rightQuarter = midX + (rightX-midX)/2;

  // --- Ground line ---
  Ln(25, groundY, 535, groundY, 1, colorGray);
  Tx(535, groundY-3, 9, colorGray, 'GL', 'end');

  if (state.hasMiddleColumn) {
    // === DOUBLE SPAN ===
    // Columns
    Ln(leftX, groundY, leftX, topY, 5, color);
    Ln(midX, groundY, midX, topY, 5, colorMid);
    Ln(rightX, groundY, rightX, topY, 5, color);

    // Roof beams (double slope)
    Ln(leftX, topY, midX, beamY, 3, color);
    Ln(midX, beamY, rightX, topY, 3, color);

    // Mezzanine floors
    var mz1Y = Math.max(groundY - 90 * 3.6/H, 95);
    var mz2Y = Math.max(groundY - 90 * 7.2/H, 70);
    if (lv >= 1) { Ln(leftX, mz1Y, rightX, mz1Y, 2, colorMz); Tx(leftX-4, mz1Y+4, 9, colorMz, '①', 'end', true); Tx(leftX+8, mz1Y-4, 8, colorMz, ratio+'%'); }
    if (lv >= 2) { Ln(leftX, mz2Y, rightX, mz2Y, 2, colorMz); Tx(leftX-4, mz2Y+4, 9, colorMz, '②', 'end', true); Tx(leftX+8, mz2Y-4, 8, colorMz, ratio+'%'); }

    // Column specs
    var colW = (colSpec.length+2)*6;
    Tag(leftX+20, groundY+22, colW, colSpec, '#F0F4F8', color);
    Tag(rightX-20, groundY+22, colW, colSpec, '#F0F4F8', color);
    Tag(midX, groundY+22, colW, colSpec+' (中)', '#FFF2E0', colorMid);

    // Beam spec
    var bW = (beamSpec.length+2)*6;
    Tag(leftQuarter, beamY-10, bW, beamSpec, '#E8F0FE', color);
    Tag(rightQuarter, beamY-10, bW, beamSpec, '#E8F0FE', color);

    // Span dims
    Ln(leftX, groundY+38, midX, groundY+38, 1, color);
    Ln(leftX, groundY+35, leftX, groundY+41, 1, color);
    Ln(midX, groundY+35, midX, groundY+41, 1, color);
    Tx(leftQuarter, groundY+48, 10, color, '← '+spanText+' →');
    Ln(midX, groundY+38, rightX, groundY+38, 1, color);
    Ln(rightX, groundY+35, rightX, groundY+41, 1, color);
    Tx(rightQuarter, groundY+48, 10, color, '← '+spanText+' →');

    // Height dim
    Ln(rightX+15, topY, rightX+15, groundY, 1, colorGray);
    Ln(rightX+12, topY, rightX+18, topY, 1, colorGray);
    Ln(rightX+12, groundY, rightX+18, groundY, 1, colorGray);
    Tx(rightX+22, (topY+groundY)/2-4, 10, colorGray, '檐高', 'start');
    Tx(rightX+22, (topY+groundY)/2+9, 10, colorGray, H+'m', 'start');

    // Info bar
    var info = numFrames+'榀 · 柱距'+cs+'m · 长'+L+'m';
    Tx(midX, 14, 12, colorMid, '有中柱 (双跨) · '+info, 'middle', true);
    Tx(midX, beamY+44, 9, '#999', '檩条: '+rpSpec+' @'+roofSpacing+'m | '+wpSpec+' @'+wallSpacing+'m');
    Tx(midX, beamY+56, 9, '#999', '系杆: '+tieSpec);

  } else {
    // === SINGLE SPAN ===
    Ln(leftX, groundY, leftX, topY, 5, color);
    Ln(rightX, groundY, rightX, topY, 5, color);
    Ln(leftX, topY, midX, beamY, 3, color);
    Ln(midX, beamY, rightX, topY, 3, color);

    var mz1Y = Math.max(groundY - 90 * 3.6/H, 95);
    var mz2Y = Math.max(groundY - 90 * 7.2/H, 70);
    if (lv >= 1) { Ln(leftX, mz1Y, rightX, mz1Y, 2, colorMz); Tx(leftX-4, mz1Y+4, 9, colorMz, '①', 'end', true); Tx(leftX+8, mz1Y-4, 8, colorMz, ratio+'%'); }
    if (lv >= 2) { Ln(leftX, mz2Y, rightX, mz2Y, 2, colorMz); Tx(leftX-4, mz2Y+4, 9, colorMz, '②', 'end', true); Tx(leftX+8, mz2Y-4, 8, colorMz, ratio+'%'); }

    var colW = (colSpec.length+2)*6;
    Tag(leftX+20, groundY+22, colW, colSpec, '#F0F4F8', color);
    Tag(rightX-20, groundY+22, colW, colSpec, '#F0F4F8', color);

    var bW = (beamSpec.length+2)*6;
    Tag(midX, beamY-10, bW, beamSpec, '#E8F0FE', color);

    // Span dim
    Ln(leftX, groundY+38, rightX, groundY+38, 1, color);
    Ln(leftX, groundY+35, leftX, groundY+41, 1, color);
    Ln(rightX, groundY+35, rightX, groundY+41, 1, color);
    Tx(midX, groundY+48, 10, color, '← 跨度 '+spanText+' →');

    Ln(rightX+15, topY, rightX+15, groundY, 1, colorGray);
    Ln(rightX+12, topY, rightX+18, topY, 1, colorGray);
    Ln(rightX+12, groundY, rightX+18, groundY, 1, colorGray);
    Tx(rightX+22, (topY+groundY)/2-4, 10, colorGray, '檐高', 'start');
    Tx(rightX+22, (topY+groundY)/2+9, 10, colorGray, H+'m', 'start');

    var info = numFrames+'榀 · 柱距'+cs+'m · 长'+L+'m';
    Tx(midX, 14, 12, lv>=1?colorMz:color, (lv>=1?'夹层'+(lv>=2?'(×2)':'')+' · ':'')+'无中柱 (单跨) · '+info, 'middle', true);
    Tx(midX, beamY+44, 9, '#999', '檩条: '+rpSpec+' @'+roofSpacing+'m | '+wpSpec+' @'+wallSpacing+'m');
    Tx(midX, beamY+56, 9, '#999', '系杆: '+tieSpec);
  }

  svg.innerHTML = h.join('');
}

// ====== 启动 ======
function init() {
  loadState();
  state.step = 1;
  // 步骤3已删除：门窗参数固定为「每柱距1扇窗(宽2m·台1.2m) + 前2樘门(4.5×5.5)」，覆盖旧会话残留
  Object.assign(state, {
    windowScheme: 'vertical', winWidth: 2.0, winHeight: null,
    sillHeight: 1.2, winLocation: 'all', autoLayout: true,
    doorCount: 2, doorWidth: 4.5, doorHeight: 5.5, doorOnWall: 'front',
  });
  $('#resultPanel').style.display = 'none';
  initWindZones();
  bindEvents();
  syncInputsToState();
  if ($('#projectName')) $('#projectName').value = state.projectName || '';   // 项目名持久化回填
  updateStructMezzUI();
  updateStepUI();
  recalculate();
  renderDiagram();
}

document.addEventListener('DOMContentLoaded', init);
