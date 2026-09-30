/* ==========================================================================
   老铁钢构 · 独立站「在线钢结构算量」留资版  ——  lead.js
   2026-09-29  为 laotie-steel.com/calculator 打包
   --------------------------------------------------------------------------
   本文件只做四件事，**完全不改算量引擎 / 不改内网工具**：
     1) 英文化：把界面（含 app.js 动态输出的结果面板）翻成英文
     2) 客户模式：隐藏业务员内部按钮与内部章节（选型依据 / 省钢推荐 / 方案对比）
     3) 去价格：页面与方案书 PDF 都不出现价格，只留「用钢量 + 获取报价」
     4) 留资：主 CTA = WhatsApp 一键带参数；兜底 = 邮箱表单；留资后解锁方案书 PDF
   所有可调项集中在下面的 CFG，改这里就行。
   ========================================================================== */
(function () {
  'use strict';

  // ======================= 0. 配置（部署时改这里） =======================
  var CFG = {
    // ---- 联系方式 ----
    whatsapp: '8616650735555',                      // 国际格式，不带 + / 空格
    email: 'kangguangjian91@gmail.com',
    siteUrl: 'https://www.laotie-steel.com',
    contactUrl: 'https://www.laotie-steel.com/contact',

    // ---- 留资兜底后端（二选一，都不填也不会崩：表单照常解锁 PDF，只是线索不投递） ----
    // Web3Forms：https://web3forms.com 输入邮箱即刻拿到 access_key，免注册
    web3formsKey: '',
    // Formspree：https://formspree.io 建一个 form，把 ID（形如 xabcdewy）填这里
    formspreeId: '',

    // ---- 口径开关 ----
    lang: 'en',                 // 'en' = 英文界面（独立站用） | 'zh' = 中文界面
    hidePrice: true,            // 页面上不出现任何价格
    hidePriceInProposal: true,  // 方案书 PDF 里也去掉「报价明细」章节
    hideInternalSections: true, // 隐藏选型依据 / 省钢推荐 / 方案对比（内部销售话术）
    hideInternalButtons: true,  // 隐藏 👤客户信息 / 📁我的项目 / 📥导出报价表
    gateProposal: true,         // 方案书 PDF 需留资后解锁
    internal: false,            // true = 内部模式（?internal=1）：显示全部面板、去掉 data-lead

    // ---- 信任背书（显示在留资卡上） ----
    trust: '5,000 t/month capacity · CE & ISO 9001 · 40+ countries shipped',
    reply: 'Firm quotation within 1 business day'
  };

  // URL 参数覆盖：?lang=zh / ?price=on / ?gate=0 / ?embed=1
  (function () {
    var q = {};
    (location.search || '').replace(/^\?/, '').split('&').forEach(function (kv) {
      if (!kv) return; var i = kv.indexOf('='); q[decodeURIComponent(kv.slice(0, i < 0 ? kv.length : i))] = i < 0 ? '1' : decodeURIComponent(kv.slice(i + 1));
    });
    if (q.lang === 'zh' || q.lang === 'en') CFG.lang = q.lang;
    if (q.price === 'on') { CFG.hidePrice = false; CFG.hidePriceInProposal = false; }
    if (q.gate === '0') CFG.gateProposal = false;
    if (q.internal === '1') { CFG.hideInternalSections = false; CFG.hideInternalButtons = false; CFG.internal = true; }
    CFG._embed = (q.embed === '1');
    CFG._lead = true;                      // 只要加载了本文件 = 留资版
  })();

  var EN = (CFG.lang === 'en');

  // ======================= 1. 界面英汉词典 =======================
  // 精确匹配「去空白后的文本节点」。键是界面里出现的中文原串。
  var DICT = {
    // —— head / 顶栏 ——
    '钢结构算量工具 · 河南老铁钢构': 'Steel Structure Calculator | Laotie Steel',
    '河南老铁钢构': 'LAOTIE STEEL',
    '门式刚架轻钢厂房 · 专业算量工具': 'Portal Frame Steel Building · Quantity & Cost Estimator',
    '预估数值 · 仅供参考': 'Preliminary estimate · for reference only',
    '生成客户方案书 PDF（直接下载，文件名=项目名+日期）': 'Download the full PDF proposal',
    'Export Proposal (English) — 英文方案书 PDF': 'Export proposal (English) — PDF',
    '方案书打印预览（可在打印对话框另存 PDF）': 'Print preview',
    '导出报价表': 'Export quotation',
    '客户信息（自动写入报价单与方案书）': 'Customer info',
    '我的项目（保存 / 切换 / 导出）': 'My projects',
    '重置默认': 'Reset to defaults',
    // 属性型文案（placeholder / title / alt）——innerText 扫不到，必须单独覆盖
    '输入项目名称...': 'Project name (optional)',
    '项目名称（留空则取顶部项目名）': 'Project name (leave blank to use the one above)',
    '基本风压 w₀（kN/m²，50 年一遇）': 'Basic wind pressure w0 (kN/m², 50-year return)',
    '参考图纸大图': 'Enlarged drawing',
    '如：138 0000 0000': 'e.g. +86 138 0000 0000',
    '如：张经理': 'e.g. Mr Zhang',
    '如：河南XX机械有限公司': 'e.g. XX Machinery Co., Ltd.',
    '如：河南省商丘市睢阳区': 'e.g. Suiyang District, Shangqiu, Henan',

    // —— 步骤条 ——
    '主体尺寸': 'Building Dimensions',
    '女儿墙': 'Parapet',
    '步骤 1 / 2': 'Step 1 / 2',
    '上一步': 'Back',
    '下一步': 'Next',
    '生成算量报告': 'Calculate',

    // —— 步骤1 输入区 ——
    '厂房长度': 'Building Length',
    '厂房宽度(跨度)': 'Width / Span',
    '6-70m · >24m自动加中柱': '6-70 m · >24 m auto-adds center column',
    '檐口高度': 'Eave Height',
    '结构形式 & 夹层': 'Structure Type & Mezzanine',
    '无中柱(单跨)': 'Single span (no center column)',
    '单跨 · 带夹层': 'Single span + mezzanine',
    '有中柱(双跨)': 'Double span (with center column)',
    '双跨 · 带夹层': 'Double span + mezzanine',
    '💡 选带夹层后下方展开设置 · 有中柱时梁跨减半可降级截面':
      'Mezzanine options open below. Center column halves the beam span and reduces section size.',
    '夹层层数': 'Mezzanine levels',
    '2层 (一层夹层)': '2 storeys (one mezzanine)',
    '3层 (双层夹层)': '3 storeys (two mezzanines)',
    '面积占比': 'Area ratio',
    '两层共用 · 柱高：一层3.6m / 二层7.2m(通高)': 'Shared by both levels · column height 3.6 m (L1) / 7.2 m (L2, full height)',
    '夹层柱距': 'Mezzanine column spacing',
    '独立的夹层柱网间距': 'Independent mezzanine grid spacing',
    '一层用途': 'Level 1 use',
    '二层用途': 'Level 2 use',
    '📋 办公 (2.5kN)': 'Office (2.5 kN/m²)',
    '📦 仓储 (5.0kN)': 'Storage (5.0 kN/m²)',
    '一层夹层算量': 'Level-1 mezzanine quantities',
    '二层夹层算量': 'Level-2 mezzanine quantities',
    '面积：': 'Area: ',
    '夹层柱：': 'Mezzanine columns: ',
    '夹层梁：': 'Mezzanine beams: ',
    '用钢量：': 'Steel weight: ',
    '高级参数 (默认行业标准)': 'Advanced parameters (industry defaults)',
    '柱距': 'Column spacing',
    '4.5 m (密柱)': '4.5 m (dense)',
    '6.0 m (标准·厂房≤40m推荐)': '6.0 m (standard, recommended ≤40 m)',
    '7.5 m (经济·厂房40-80m推荐)': '7.5 m (economical, 40-80 m)',
    '9.0 m (大柱距·厂房>80m推荐)': '9.0 m (wide, >80 m)',
    '自定义': 'Custom',
    '💡 输入厂房长度后自动推荐最优柱距': 'Optimum spacing is suggested automatically once the length is entered',
    '截面形式': 'Section type',
    '变截面(推荐)': 'Tapered (recommended)',
    '等截面': 'Constant depth',
    '屋面檩条间距': 'Roof purlin spacing',
    '墙面檩条间距': 'Wall girt spacing',
    '雪/活载': 'Snow / live load',
    '0.3 (南方无雪)': '0.3 (no snow)',
    '0.5 (常规·推荐)': '0.5 (typical, recommended)',
    '0.6 (北方多雪)': '0.6 (snowy region)',
    '0.75 (东北/高原)': '0.75 (heavy snow / plateau)',
    '💡 屋面荷载假定，影响梁柱最优截面选型': 'Assumed roof load; drives optimum beam & column sizing',
    '基本风压 w₀': 'Basic wind pressure w₀',
    '行车（吊车）': 'Overhead crane',
    '电动单/双梁 · 5t / 10t': 'electric single / double girder · 5 t / 10 t',
    '不设行车': 'No crane',
    '设行车': 'With crane',
    '💡 吊车梁跨度自动跟随柱距（6 / 7.5 / 9m）· 计入吊车梁 + 牛腿，并按吊车荷载加大柱截面':
      'Crane girder span follows the column spacing (6 / 7.5 / 9 m); includes crane girder + corbel and upsizes columns for crane loads.',
    '起重量': 'Capacity',
    '工作级别': 'Duty class',
    'A3~A5 轻中级': 'A3-A5 light / medium',
    'A6~A8 重级': 'A6-A8 heavy',
    '轨顶标高': 'Rail top level',
    'm · 留空自动': 'm · blank = auto',
    '自动（檐高 − 净空）': 'Auto (eave height − clearance)',
    '行车算量': 'Crane quantities',
    '吊车梁：': 'Crane girder: ',
    '轮压 / 轨顶：': 'Wheel load / rail top: ',
    '牛腿：': 'Corbels: ',
    '主刚架柱：': 'Main frame columns: ',
    '行车用钢量：': 'Crane steel weight: ',
    '屋面采光带': 'Roof skylight',
    '不设': 'None',
    '1 道 (常规·推荐)': '1 row (typical, recommended)',
    '2 道': '2 rows',
    '💡 FRP采光板·每道宽1.0m·屋脊对称每坡各铺': 'FRP sheet, 1.0 m wide per row, symmetric about the ridge',
    '屋面檩条 ≈': 'Roof purlins ≈',
    '墙面檩条 ≈': 'Wall girts ≈',
    '主结构 ≈': 'Main structure ≈',

    // —— 步骤2 女儿墙 ——
    '女儿墙配置': 'Parapet',
    '请选择是否设置女儿墙': 'Choose whether the building has a parapet',
    '无女儿墙': 'No parapet',
    '檐口无上部围挡，适用于简易厂房': 'Open eave with no upstand — simple warehouses',
    '带女儿墙': 'With parapet',
    '檐口上部设围挡，兼顾防水与美观': 'Eave upstand with internal gutter — better drainage and appearance',
    '女儿墙高度': 'Parapet height',
    '材料增量对比': 'Material increment',
    '增加用钢量：': 'Added steel: ',
    '增加围护面积：': 'Added envelope: ',

    // —— 右侧预览区 ——
    '实时 3D 模型': 'Live 3D model',
    '拖动旋转 · 滚轮缩放 · 右键平移': 'Drag to rotate · scroll to zoom · right-drag to pan',
    '重置视角': 'Reset view',
    '显示/隐藏檩条': 'Show / hide purlins',
    '显示/隐藏屋面': 'Show / hide roof',
    '显示/隐藏墙板': 'Show / hide wall cladding',
    '自动旋转': 'Auto rotate',
    '当前环境不支持 WebGL，3D 预览已停用': 'WebGL is not available in this browser — 3D preview disabled',
    '长:': 'L: ',
    '宽:': 'W: ',
    '高:': 'H: ',
    '主结构': 'Primary steel',
    '檩条': 'Purlins',
    '总用钢': 'Total steel',
    '≈ 人民币': '≈ CNY',
    '算量报告': 'Quantity Report',
    '项目': 'Item',
    '规格': 'Specification',
    '数量': 'Quantity',
    '合计': 'Total steel',
    '对比方案 (不带女儿墙)': 'Compare (without parapet)',
    '📊 对比方案 (不带女儿墙)': '📊 Compare (without parapet)',
    '📊 对比方案 (无中柱)': '📊 Compare (single span)',
    '📊 对比方案 (有中柱)': '📊 Compare (double span)',

    // —— 免责声明 / 图纸灯箱 ——
    '免责声明': 'Disclaimer',
    '本工具输出为': 'These results are',
    '工程估算数值': 'preliminary engineering estimates',
    '，基于门式刚架行业通用公式计算，仅供初步预算参考。':
      ', computed with standard portal-frame formulas. For preliminary budgeting only.',
    '实际用量以': 'Final quantities are governed by the',
    '施工图预算': 'construction drawing budget',
    '为准。': '.',
    '依据 CECS 102:2002 · GB 50017-2017': 'Per GB 51022 / CECS 102 / GB 50017',
    '取 消': 'Cancel',
    '我知道了，生成报告': 'Agree & calculate',
    '参考图纸': 'Reference drawing',
    '✕ 关闭': '✕ Close',

    // —— 品牌页脚 ——
    '河南老铁钢构工程有限公司': 'Henan Laotie Steel Structure Engineering Co., Ltd.',
    '专业门式刚架 · 轻钢厂房 · 钢结构设计施工一站式服务':
      'Portal frame · light steel buildings · design, fabrication and installation',
    '轻量化算量工具 v3.0 · 3D 实时预览': 'Steel quantity tool v3.0 · live 3D preview',
    '基于 CECS 102 · GB 50017': 'Based on GB 51022 / CECS 102 / GB 50017',
    'CECS 102 门式刚架规范': 'GB 51022 · CECS 102',
    'GB 50017 钢结构设计标准': 'GB 50017 design standard',
    '焊接 H 型钢 · 变截面设计': 'Welded H-sections · tapered design',
    '※ 本工具输出为工程估算数值，实际用量以施工图预算为准':
      'Estimates only — final quantities per the construction drawing budget',

    // —— app.js 结果面板动态输出 ——
    '总用钢量': 'Total Steel',
    '单方用钢量': 'Steel per m²',
    '建筑面积': 'Floor Area',
    '门窗面积': 'Openings Area',
    '✅ 经济合理': '✅ Economical',
    '⚡ 正常范围': '⚡ Typical range',
    '⚠ 偏高': '⚠ Above typical',
    '建筑图参考': '📐 Auto-generated drawings',
    '📐 建筑图参考': '📐 Auto-generated drawings',
    '按当前参数自动生成共 7 张：平面 1 张 + 立面 4 张（前/后纵墙 + 左/右山墙）+ 基础布置图 + 单榀刚架图，全部随参数联动':
      '7 drawings generated from your current inputs: 1 plan + 4 elevations (front/rear longitudinal walls + left/right gables) + foundation layout + single-frame section. All linked to your parameters.',
    '⬇ 导出图纸 PNG（7 张）': '⬇ Export drawings as PNG (7)',
    '参考方案图纸（21.2-60-9 米方案 · 共 10 张，点击看大图）':
      'Reference drawings (21.2 / 60 / 9 m scheme · 10 sheets · click to enlarge)',
    '请先生成算量报告': 'Please run the calculation first',
    'Please generate the quantity report first.': 'Please run the calculation first.',
    '方案书窗口被浏览器拦截，请允许弹窗后重试': 'Pop-up blocked — please allow pop-ups and retry',

    // ================= 2026-09-29 补：折叠面板 / 下拉 / SVG 内的中文 =================
    // 背景：P05 查的是 body.innerText —— 它【不返回被 CSS 隐藏的元素文字】。
    //       于是「风压地区下拉」「檩距下拉」「选型依据面板」「剖面图 SVG」里的中文全部漏检。
    //       改用「全 DOM 扫描」（_probe_cjk_full.js）后暴露 89 条，这里逐条补齐。
    // 注意：词典键必须写「原文」，含全角括号与全角空格，不能手写成半角。

    // —— 下拉选项（真会被客户点开）——
    '1.5 m (推荐)': '1.5 m (recommended)',
    '4.0 m (默认)': '4.0 m (default)',

    // —— 右侧预览提示 ——
    '按「主体尺寸 → 女儿墙」完成两步设置，点底部「生成算量报告」查看分项明细与方案对比（门窗按每柱距一扇窗 + 前2樘推拉门自动布置）':
      'Complete the two steps (Building Dimensions → Parapet), then press Calculate to see the itemised quantities and the scheme comparison. Openings are placed automatically (one window per bay + 2 sliding doors at the front).',

    // —— 檩条 / 抗风柱选型依据（#purlinBasis，data-lead 下隐藏）——
    '🔩 檩条 / 抗风柱选型依据': '🔩 Purlin / wind column — selection basis',
    'Q235B 冷弯薄壁 f=205 N/mm² · 挠度限值 L/150 · 强度与挠度双控':
      'Q235B cold-formed, f = 205 N/mm² · deflection limit L/150 · strength and deflection both checked',
    '构件': 'Member',
    '跨度': 'Span',
    '受荷宽': 'Load width',
    '截面需求': 'Required section',
    '控制项': 'Governing check',
    '选定方案': 'Selected',
    '对比方案': 'Alternative',
    '重量': 'Weight',
    '屋面檩条': 'Roof purlin',
    '墙面檩条': 'Wall girt',
    '抗风柱': 'Wind column',
    '变截面': 'Tapered',
    '强度': 'Strength',
    '简支': 'Simply supported',
    '→ 墙面 wk': '→ wall wk',
    '/ 屋面 wk': '/ roof wk',
    '按 wk 0.36 kN/m² 反算（原为按柱顶高度分档，≥12m 直接套主刚架柱）':
      'Back-calculated from wk 0.36 kN/m² (previously stepped by eave height; ≥12 m reused the main frame columns)',
    '⚠️ w₀ 供商务报价参考：中国地区摘自 GB 50009-2012 附录 E，海外地区按当地常见设计风速折算。正式设计须按项目所在国规范与气象资料核准；抗风柱按「柱顶与屋面梁铰接（系杆/弹簧板）+ 柱底固接」假定，受弯按 qH²/8 取值。':
      '⚠️ w₀ is for commercial estimating only. Chinese regions are taken from GB 50009-2012 Annex E; overseas regions are converted from typical local design wind speeds. Formal design must be verified against the project country code and meteorological data. Wind columns assume a pinned top (tie rod / spring plate) with a fixed base, bending taken as qH²/8.',

    // —— 省钢量推荐（#steelOptimize，data-lead 下隐藏）——
    '💡 省钢量推荐': '💡 Steel-saving options',
    '试算 12 组合：柱距 4.5/6/7.5m（≤8m） × 变/等截面 × 檩距 1.2/1.5m（≤1.5m）（仅钢量对比，不含运输安装差异）':
      '12 combinations trialled: column spacing 4.5 / 6 / 7.5 m (≤8 m) × tapered / constant depth × purlin spacing 1.2 / 1.5 m (≤1.5 m). Steel weight only — freight and erection differences are excluded.',
    '当前': 'Current',
    ': 柱距': ': column spacing',
    '· 檩条间距': '· purlin spacing',
    '可省': 'save',
    '⚡ 一键应用最优方案': '⚡ Apply the best option',
    '排名': 'Rank',
    '截面': 'Section',
    '檩距': 'Purlin spacing',
    '总钢量': 'Total steel',
    '单方 kg/m²': 'kg/m²',
    '估算报价': 'Est. price',
    '对比': 'Diff.',
    '🥇 最优': '🥇 Best',
    '持平': 'same',

    // —— 客户信息弹窗（按钮 data-lead 下隐藏，弹窗点不到）——
    '客户信息': 'Customer information',
    '填一次即可，自动写入报价单与方案书；留空的项不会显示在文档上。':
      'Fill in once — it is written into the quotation and proposal automatically. Blank fields are omitted from the documents.',
    '客户名称': 'Customer name',
    '联系人': 'Contact person',
    '联系电话': 'Phone',
    '项目地址': 'Project address',
    '报价日期': 'Quotation date',
    '报价有效期(天)': 'Validity (days)',
    '在报价单与方案书上打印标准条款': 'Print the standard terms on the quotation and proposal',
    '保 存': 'Save',
    '关 闭': 'Close',

    // —— 我的项目弹窗 ——
    '我的项目': 'My projects',
    '把当前参数存成项目随时切回（存在本机浏览器）；导出 .json 可备份或发给同事。':
      'Save the current parameters as a project and switch back any time (stored in this browser). Export .json to back up or share with a colleague.',
    '💾 保存当前': '💾 Save current',
    '⬇ 导出全部(.json)': '⬇ Export all (.json)',
    '⬆ 导入(.json)': '⬆ Import (.json)',

    // —— 单榀刚架剖面图 SVG 内标注（.structure-diagram，data-lead 下隐藏）——
    '檐高': 'Eave',
    '结构形式示意图': 'Structure type diagram'
  };

  // 正则规则（用于「值 + 单位」这类拼接文本）
  var RX = [
    // —— 整行复合规则必须放最前：规则是「按顺序全部累加」应用的，
    //    若片段规则先跑（如 女儿柱14根 → parapet posts 14），整行规则就匹配不上了 ——
    [/▸\s*女儿墙\(([^·]+)·([^)]*)\)：钢材 \+([\d\.]+) kg，围护 \+([\d\.]+) m²，天沟 ([\d\.]+)m\(2列\)/,
      '▸ Parapet ($1 · $2): steel +$3 kg, envelope +$4 m², gutter $5 m (2 runs)'],
    [/▸\s*未设置女儿墙/, '▸ No parapet'],
    [/^增加用钢量：\+ /, 'Added steel: + '],
    [/^增加围护面积：\+ /, 'Added envelope: + '],
    // —— 动态值拼接（2026-09-29 补；规则书写用「原文标点」，fwNorm 在 RX 之后才跑）——
    [/檐高\s*([\d.]+)\s*m（μz ([\d.]+)）→ 墙面 wk ([\d.]+) \/ 屋面 wk ([\d.]+) kN\/m²/,
      'eave $1 m (μz $2) → wall wk $3 / roof wk $4 kN/m²'],
    [/按 wk ([\d.]+) kN\/m² 反算（原为按柱顶高度分档，≥12m 直接套主刚架柱）/,
      'Back-calculated from wk $1 kN/m² (previously stepped by eave height; ≥12 m reused the main frame columns)'],
    [/← 跨度 ([\d.]+)m →/, '← Span $1 m →'],
    [/无中柱 \(单跨\) · (\d+)榀 · 柱距([\d.]+)m · 长([\d.]+)m/,
      'Single span · $1 frames · column spacing $2 m · length $3 m'],
    [/楔形(\d+)%\+直梁(\d+)%/, 'tapered $1% + straight $2%'],
    [/系杆: φ([\d.]+)×([\d.]+)圆管\(系杆·檐口(\d+)道\+屋脊(\d+)道\)/,
      'Tie rods: φ$1×$2 CHS (tie rods · $3 rows at eave + $4 at ridge)'],
    [/檩条: /, 'Purlins: '],
    [/\((\d+)根\)/, '($1 pcs)'],
    [/(\d+) 根 · 间距/, '$1 pcs · spacing'],
    [/· 最高/, '· max'],
    [/· 平均/, '· avg'],
    [/简支省 ([\d.]+)%/, 'Simply supported −$1%'],
    [/连续搭接 (C[\d×]+)/, 'Continuous lap $1'],
    [/省 ([\d,]+) kg/, 'saves $1 kg'],
    [/（¥([\d,]+)）→ 最优/, '(¥$1) → best'],
    [/（([\d.]+)%）≈/, '($1%) ≈'],
    // 长脚注：DICT 走的是精确匹配，app.js 一旦改一个字就失配 → 再兜一条按前缀吞掉整段的规则
    [/^⚠️ w₀ 供商务报价参考[\s\S]*$/,
      '⚠️ w₀ is for commercial estimating only. Chinese regions are taken from GB 50009-2012 Annex E; overseas regions are converted from typical local design wind speeds. Formal design must be verified against the project country code and meteorological data. Wind columns assume a pinned top (tie rod / spring plate) with a fixed base, bending taken as qH²/8.'],
    // —— 片段规则 ——
    [/工([\d]+)工字钢/, 'I-beam I$1'],
    [/工字钢/, 'I-beam'],
    [/^([\d,\.]+)\s*吨\s*\/\s*\$?([\d,\.]+)$/, '$1 t / $$2'],
    [/^([\d,\.]+)\s*吨$/, '$1 t'],
    [/^([\d,\.]+)\s*个$/, '$1 pcs'],
    [/^([\d,\.]+)\s*套$/, '$1 sets'],
    [/^([\d,\.]+)\s*根$/, '$1 pcs'],
    [/^([\d,\.]+)\s*块$/, '$1 pcs'],
    [/^([\d,\.]+)\s*樘$/, '$1 units'],
    [/^([\d,\.]+)\s*扇$/, '$1 units'],
    [/^([\d,\.]+)\s*榀$/, '$1 frames'],
    [/^([\d,\.]+)\s*道$/, '$1 rows'],
    [/^([\d,\.]+)\s*列$/, '$1 runs'],
    [/^([\d,\.]+)\s*米$/, '$1 m'],
    [/^([\d,\.]+)\s*延米$/, '$1 lin.m'],
    [/^：\s*/, ': '],
    [/\s*·\s*wk\s/, ' · wk '],
    [/女儿柱(\d+)根/, 'parapet posts $1'],
    // —— 兜底片段（2026-09-29 补）——
    [/檐高/, 'eave'],
    [/([\d.]+)榀/, '$1 frames'],
    [/简支/, 'Simply supported']
  ];

  // 风压地区名（engine.js 的 WIND_ZONES[].name）→ 英文。
  // 两处用到：① 启动时直接把 WIND_ZONES[].name 改掉（下拉与 #windHint 都读它，最稳）；
  //           ② 兜底正则（页面已经渲染成中文时也能追平）。
  var ZONE_EN = {
    '中国·河南（商丘/郑州）': 'Henan, China (Shangqiu / Zhengzhou)',
    '中国·华北（北京/天津/石家庄）': 'North China (Beijing / Tianjin / Shijiazhuang)',
    '中国·东北（沈阳/哈尔滨）': 'Northeast China (Shenyang / Harbin)',
    '中国·华东（上海/南京/杭州）': 'East China (Shanghai / Nanjing / Hangzhou)',
    '中国·华南（广州/长沙）': 'South China (Guangzhou / Changsha)',
    '中国·东南沿海（福州/温州）': 'Southeast Coast (Fuzhou / Wenzhou)',
    '中国·海南/南海（台风区）': 'Hainan / South China Sea (typhoon zone)',
    '中国·西南（成都/重庆/昆明）': 'Southwest China (Chengdu / Chongqing / Kunming)',
    '中国·西北（西安/兰州）': 'Northwest China (Xi\'an / Lanzhou)',
    '斐济/南太（热带气旋区）': 'Fiji / South Pacific (cyclone zone)',
    '菲律宾/越南沿海（台风区）': 'Philippines / Vietnam coast (typhoon zone)',
    '澳大利亚/新西兰沿海': 'Australia / New Zealand coast',
    '东南亚（印尼/马来/泰国）': 'Southeast Asia (Indonesia / Malaysia / Thailand)',
    '中东（沙特/阿联酋/伊拉克）': 'Middle East (Saudi / UAE / Iraq)',
    '非洲（肯尼亚/坦桑/尼日利亚）': 'Africa (Kenya / Tanzania / Nigeria)',
    '欧洲（德国/法国/巴尔干）': 'Europe (Germany / France / Balkans)',
    '自定义（手动填下方 w₀）': 'Custom (enter w₀ below)'
  };
  // 兜底正则追加到 RX 末尾（地区名与其它规则无交叉，顺序无关）
  (function () {
    Object.keys(ZONE_EN).forEach(function (zh) {
      var esc = zh.replace(/[.*+?^${}()|[\]\\\/]/g, '\\$&');
      RX.push([new RegExp(esc, 'g'), ZONE_EN[zh]]);
    });
  })();

  // 全角 → 半角。⚠️ 表意空格 \u3000 与全角括号 \uFF08/\uFF09 都在「中文判定区间」内，
  //    不归一的话，就算词都译成英文了，探针仍会判为「中文残留」。
  var FW = {
    '\u3000': ' ', '\u3001': ', ', '\u3002': '.',
    '\u300C': '"', '\u300D': '"', '\u300E': '"', '\u300F': '"',
    '\u3010': '[', '\u3011': ']',
    '\uFF01': '!', '\uFF05': '%', '\uFF08': '(', '\uFF09': ')', '\uFF0C': ', ',
    '\uFF0D': '-', '\uFF0F': '/', '\uFF1A': ':', '\uFF1B': ';', '\uFF1F': '?',
    '\uFF3B': '[', '\uFF3D': ']', '\uFF5B': '{', '\uFF5D': '}', '\uFF5E': '~',
    '\uFFE5': '\u00A5'
  };
  var FW_RX = new RegExp('[' + Object.keys(FW).join('') + ']', 'g');
  function fwNorm(s) { return s.replace(FW_RX, function (c) { return FW[c]; }); }

  // engine.js 的 WIND_ZONES 是模块级 const 数组，元素对象可直接改。
  // 改掉 name 之后：① #windZone 下拉的 <option> 是英文；② #windHint 读的也是它 → 一并英文。
  // 改完再调一次 app.js 的 initWindZones() 重渲染下拉（若 app.js 的 init 已经先跑过）。
  function patchWindZones() {
    if (!EN) return;
    if (typeof WIND_ZONES === 'undefined' || !WIND_ZONES || !WIND_ZONES.length) return;
    for (var i = 0; i < WIND_ZONES.length; i++) {
      var en = ZONE_EN[WIND_ZONES[i].name];
      if (en) WIND_ZONES[i].name = en;
    }
    if (typeof initWindZones === 'function') { try { initWindZones(); } catch (e) { } }
    if (typeof renderWindHint === 'function') { try { renderWindHint(); } catch (e) { } }
  }

  var CJK = /[\u3400-\u9FFF\u3000-\u303F\uFF01-\uFF60\uFFE0-\uFFE6]/;
  var SKIP_TAG = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1, CODE: 1, PRE: 1, TEXTAREA: 1 };

  function tCore(core) {
    if (!core) return null;
    // 1) 原文精确命中词典（整句优先，命中即返回）
    var hit = Object.prototype.hasOwnProperty.call(DICT, core) ? DICT[core] : undefined;
    if (hit != null) return hit;
    // 2) 正则规则按顺序「全部累加」应用（一条文本可能同时命中多条）
    //    ⚠️ 规则里带 /g 的（地区名那批）用 test() 会推进 lastIndex，
    //       下一次调用就会假性不匹配 —— 每次用之前先归零。
    var out = core;
    for (var i = 0; i < RX.length; i++) {
      var re = RX[i][0];
      re.lastIndex = 0;
      if (!re.test(out)) continue;
      re.lastIndex = 0;
      out = out.replace(re, RX[i][1]);
    }
    // 3) 最后做全角归一：表意空格 \u3000 / 全角括号 \uFF08 等都在「中文判定区间」内，
    //    不归一的话，词虽已译成英文，探针仍会判为「中文残留」。
    out = fwNorm(out);
    // 4) 归一后再查一次词典（少数词条要在标点归一后才成型）
    var hit2 = Object.prototype.hasOwnProperty.call(DICT, out) ? DICT[out] : undefined;
    if (hit2 != null) return hit2;
    return out !== core ? out : null;
  }

  function tNode(n) {
    if (!n || n.__leadDone) return;
    var v = n.nodeValue;
    if (v == null || v === '' || !CJK.test(v)) { n.__leadDone = 1; return; }
    // 全是空白、但含表意空格 \u3000（它在中文判定区间里）→ 只做归一，不走翻译
    if (!CJK.test(v.trim())) {
      var w = fwNorm(v);
      if (w !== v) n.nodeValue = w;
      n.__leadDone = 1;
      return;
    }
    if (inReportTable(n)) { n.__leadDone = 1; scheduleFixTable(); return; }
    var lead = v.match(/^\s*/)[0], trail = v.match(/\s*$/)[0];
    var core = v.slice(lead.length, v.length - trail.length);
    var out = tCore(core);
    if (out != null) {
      // ⚠️ lead/trail 是原文两侧的空白，必须一并做全角归一：
      //    表意空格 \u3000 落在「中文判定区间」（\u3000-\u303F）里，若原样保留，
      //    就算词全译成英文了，不做 trim 的全 DOM 扫描仍会判为中文残留。
      var nv = fwNorm(lead + out + trail);
      if (nv !== v) n.nodeValue = nv;      // 只在真的变了才写，避免 MutationObserver 自激
    }
    n.__leadDone = 1;
  }

  function tAttrs(el) {
    if (!el || el.nodeType !== 1 || el.__leadAttr) return;
    el.__leadAttr = 1;
    ['placeholder', 'title', 'alt', 'aria-label', 'value'].forEach(function (a) {
      var v = el.getAttribute && el.getAttribute(a);
      if (!v || !CJK.test(v)) return;
      var out = tCore(v.trim());
      if (out != null && out !== v) el.setAttribute(a, out);
    });
  }

  // 只翻译「不在结果明细表里」的文本节点：表格交给 fixReportTable 独占处理，
  // 免得通用规则先跑一遍把规格串改花、导致 app.js 自带的 _spTr 规则匹配不上。
  function inReportTable(n) {
    var p = n.parentNode;
    while (p && p.nodeType === 1) {
      if (p.id === 'resultTable') return true;
      p = p.parentNode;
    }
    return false;
  }

  function translate(root) {
    if (!root || root.nodeType !== 1) return;
    var tag = root.tagName;
    if (tag && SKIP_TAG[tag]) return;
    tAttrs(root);
    if (root.querySelectorAll) {
      var els = root.querySelectorAll('[placeholder],[title],[alt],[aria-label]');
      for (var i = 0; i < els.length; i++) tAttrs(els[i]);
    }
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    var n, buf = [];
    while ((n = w.nextNode())) {
      var p = n.parentNode;
      if (p && SKIP_TAG[p.nodeName]) { n.__leadDone = 1; continue; }
      if (inReportTable(n)) { n.__leadDone = 1; continue; }
      buf.push(n);
    }
    for (var j = 0; j < buf.length; j++) tNode(buf[j]);
    scheduleFixTable();
  }

  // 结果明细表：条目名走 app.js 自带的 _enItemName()，规格/单位走 _spTr()，剩下的再走通用词典
  var _tblTimer = null;
  function scheduleFixTable() {
    if (_tblTimer) return;
    _tblTimer = setTimeout(function () { _tblTimer = null; fixReportTable(); }, 30);
  }

  function fixCell(el, mode) {
    if (!el) return;
    var s = el.textContent;
    if (!CJK.test(s)) return;
    var out = s;
    if (mode === 'item' && typeof window._enItemName === 'function') out = window._enItemName(s.trim());
    else if (typeof window._spTr === 'function') out = window._spTr(s);
    if (CJK.test(out)) {
      var g = tCore(out.trim());
      if (g != null) out = g;
    }
    if (out !== s) el.textContent = fwNorm(out);   // 同上：顺手清掉全角空格
  }

  function fixReportTable() {
    if (!EN) return;
    var tb = document.getElementById('resultTable');
    if (!tb) return;
    var rows = tb.querySelectorAll('tbody tr');
    for (var i = 0; i < rows.length; i++) {
      var td = rows[i].children;
      for (var c = 0; c < td.length; c++) fixCell(td[c], c === 0 ? 'item' : 'spec');
    }
    // 表头 / 合计行 / 其余单元格走通用词典
    var others = tb.querySelectorAll('thead th, tfoot td, tfoot th');
    for (var k = 0; k < others.length; k++) fixCell(others[k], 'spec');
  }

  // ======================= 2. 客户模式：隐藏内部东西 =======================
  function customerMode() {
    var el = document.documentElement;
    // ⚠️ data-lead 不能无条件设置：lead.css 里 `html[data-lead] [id="purlinBasis"]{display:none!important}`
    //    带 !important，会把 app.js 渲染时写的 style.display='block' 压掉。
    //    若照旧无条件设置，?internal=1（本意=内部模式，显示全部）就永远解不开这些面板 —— 开关形同虚设。
    var isInternal = (CFG.internal === true);
    if (!isInternal) el.setAttribute('data-lead', '1');
    else el.removeAttribute('data-lead');
    if (EN) el.setAttribute('lang', 'en');
    if (CFG._embed) el.setAttribute('data-embed', '1');

    // 隐藏业务员内部按钮
    if (CFG.hideInternalButtons) {
      ['btnCustomer', 'btnProjects', 'btnExport', 'btnProposal', 'btnProposalEn', 'btnProposalPrint']
        .forEach(function (id) { var b = document.getElementById(id); if (b) b.style.display = 'none'; });
    }
    // 隐藏内部章节（选型依据 / 省钢推荐 / 方案对比）
    if (CFG.hideInternalSections) {
      ['purlinBasis', 'craneBasis', 'steelOptimize', 'compareSection'].forEach(function (id) {
        var b = document.getElementById(id); if (b) b.style.display = 'none';
      });
    }
    // 隐藏价格
    if (CFG.hidePrice) {
      var s = document.querySelector('.stat-item.stat-usd');
      if (s) s.style.display = 'none';
    }
    // 图纸标注英文化
    if (EN) window._DWG_EN = true;
  }

  // 「参考方案图纸」画廊（21.2-60-9 米方案·另一个项目）在留资版直接**从 DOM 摘掉**：
  // 光靠 CSS 隐藏的话，那 10 张图的 alt 中文还留在 DOM 里（探针会扫到，也没必要留）。
  function killGallery() {
    ['#archRef .dwg-strip', '#archRef .ar-gallery-title'].forEach(function (sel) {
      var el = document.querySelector(sel);
      if (el && el.parentNode) el.parentNode.removeChild(el);
    });
  }

  // ======================= 3. 方案书 PDF 去价格 =======================
  var PRICE_LABELS = ['Est. Total Price', 'Cost per m²', '参考总价', '单方造价'];
  var PRICE_CHAP = /Price Breakdown|报价明细/;
  var TRANS_ROW = /^(Transport & Install|运输与安装)$/;

  function stripPrice(html) {
    if (!html) return html;
    // 封面那一行：'· Est. Price: <b>¥ 117,555</b>' → 去掉
    html = html.replace(/\s*·\s*Est\.\s*Price:\s*<b>[^<]*<\/b>/g, '')
      .replace(/\s*·\s*参考总价：\s*<b>[^<]*<\/b>/g, '')
      .replace(/\s*·\s*Est\.\s*Price:\s*[^<]*/g, '')
      .replace(/\s*·\s*参考总价：[^<]*/g, '');

    var doc;
    try { doc = new DOMParser().parseFromString(html, 'text/html'); } catch (e) { return html; }

    // (1) 整页删掉「报价明细」章节
    var h2s = doc.querySelectorAll('h2');
    for (var i = 0; i < h2s.length; i++) {
      if (PRICE_CHAP.test(h2s[i].textContent)) {
        var pg = h2s[i].closest ? h2s[i].closest('.page') : null;
        if (pg) pg.parentNode.removeChild(pg);
        else if (h2s[i].parentNode) h2s[i].parentNode.removeChild(h2s[i]);
      }
    }
    // (2) 删掉价格 KPI 卡
    var kpis = doc.querySelectorAll('.kpi');
    for (var j = 0; j < kpis.length; j++) {
      var lab = kpis[j].querySelector('.l');
      if (lab && PRICE_LABELS.indexOf(lab.textContent.trim()) >= 0) kpis[j].parentNode.removeChild(kpis[j]);
    }
    // (3) 删掉「运输与安装」那一行（含 CNY 单价）
    var trs = doc.querySelectorAll('tr');
    for (var k = 0; k < trs.length; k++) {
      var td0 = trs[k].querySelector('td');
      if (td0 && TRANS_ROW.test(td0.textContent.trim())) trs[k].parentNode.removeChild(trs[k]);
    }
    // (4) 兜底：任何仍含 ¥ 的 KPI / 表格行 / 段落，直接删
    var risky = doc.querySelectorAll('.kpi, tr, p, .note, .cap');
    for (var m = risky.length - 1; m >= 0; m--) {
      if (risky[m].textContent.indexOf('¥') >= 0 && risky[m].parentNode) risky[m].parentNode.removeChild(risky[m]);
    }
    // (5) 章节重编号：七 → 六
    Array.prototype.forEach.call(doc.querySelectorAll('h2'), function (h) {
      h.textContent = h.textContent.replace(/^7\.\s*/, '6. ').replace(/^七、/, '六、');
    });

    return '<!DOCTYPE html>' + doc.documentElement.outerHTML;
  }

  function hookProposal() {
    if (!CFG.hidePriceInProposal) return;
    if (typeof window.buildProposalHTML !== 'function' || window.buildProposalHTML.__leadHooked) return;
    var orig = window.buildProposalHTML;
    var wrapped = function () {
      var html = orig.apply(this, arguments);
      try { return stripPrice(html); } catch (e) { console.warn('stripPrice failed', e); return html; }
    };
    wrapped.__leadHooked = true;
    window.buildProposalHTML = wrapped;
  }

  // ======================= 4. 留资 UI =======================
  var UNLOCK_KEY = 'laotieCalcUnlocked';
  var unlocked = false;
  try { unlocked = localStorage.getItem(UNLOCK_KEY) === '1'; } catch (e) { }
  if (!CFG.gateProposal) unlocked = true;

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function num(n, d) { return (n || 0).toFixed(d == null ? 0 : d); }

  // 汇总当前参数 → 给 WhatsApp / 邮件用
  function summary() {
    var r = state.result;
    if (!r) { try { r = calculateAll(makeParams()); state.result = r; } catch (e) { return null; } }
    if (!r) return null;
    var L = state.length, W = state.width, H = state.height;
    var mz1 = r.mezzanine && r.mezzanine.hasMezzanine ? r.mezzanine.area : 0;
    var mz2 = r.mezzanine2 && r.mezzanine2.hasMezzanine ? r.mezzanine2.area : 0;
    var area = L * W + mz1 + mz2;
    var cs = state.columnSpacing;
    var lines = [];
    var proj = (document.getElementById('projectName') || {}).value || '';
    if (proj.trim()) lines.push('Project: ' + proj.trim());
    lines.push('Building size: ' + L.toFixed(1) + ' x ' + W.toFixed(1) + ' x ' + H.toFixed(1) + ' m (L x W x eave height)');
    lines.push('Floor area: ' + area.toFixed(0) + ' m2');
    lines.push('Structure: ' + (state.hasMiddleColumn ? 'double span with center column' : 'single span, no center column')
      + (state.mezzanineLevels >= 1 ? ', with ' + state.mezzanineLevels + '-storey mezzanine' : ''));
    lines.push('Column spacing: ' + cs + ' m');
    lines.push('Purlin spacing: roof ' + state.roofPurlinSpacing + ' m / wall ' + state.wallPurlinSpacing + ' m');
    lines.push('Parapet: ' + (state.hasParapet ? state.parapetHeight + ' m (internal gutter)' : 'none'));
    lines.push('Roof skylight: ' + (state.daylightCount != null ? state.daylightCount : 1) + ' row(s)');
    lines.push('Overhead crane: ' + (state.hasCrane ? state.craneTonnage + ' t, class ' + state.craneGrade : 'none'));
    lines.push('Snow / live load: ' + (state.snowLoad || 0.5) + ' kN/m2; basic wind pressure w0: ' + (state.basicWind || 0.45) + ' kN/m2');
    lines.push('Estimated steel: ' + (r.totalSteel / 1000).toFixed(2) + ' t (' + (r.totalSteel / area).toFixed(1) + ' kg/m2)');
    return {
      r: r, area: area, proj: proj.trim(),
      wa: 'Hello Laotie Steel,\n\nI would like a quotation for a steel structure building.\n\n'
        + lines.join('\n')
        + '\n\nProject location / nearest port:\nCompany:\nMy email:\n\n(Sent from your online steel structure calculator)',
      mail: lines.join('\n')
    };
  }

  function waLink() {
    var s = summary();
    var txt = s ? s.wa : 'Hello Laotie Steel, I would like a quotation for a steel structure building.';
    return 'https://wa.me/' + CFG.whatsapp + '?text=' + encodeURIComponent(txt);
  }

  var T = EN ? {
    title: 'Get your exact price',
    sub: 'Your configuration is ready. Send it to our engineering team and we will come back with a firm quotation, structural calculations, shop drawings and a shipping estimate.',
    wa: 'Send to WhatsApp — fastest',
    or: 'or',
    mail: 'Leave your email instead →',
    mailTitle: 'Get the full proposal by email',
    fName: 'Your name', fEmail: 'Email *', fCo: 'Company (optional)',
    fPort: 'Project location / nearest port', fMsg: 'Anything else? (optional)',
    submit: 'Send & download the full PDF proposal',
    sending: 'Sending…',
    trust: CFG.trust,
    reply: CFG.reply,
    okTitle: 'Thank you — your request is on its way',
    okSub: 'Your full proposal (7 drawings, material breakdown and specifications) is ready to download.',
    dl: '📄 Download the full proposal (PDF)',
    dlZh: '中文版方案书',
    print: '🖨 Print preview',
    close: 'Close',
    errEmail: 'Please enter a valid email address.',
    needKey: 'Lead delivery is not configured yet — set web3formsKey in lead.js. The PDF is unlocked anyway.',
    saved: 'Request sent. Your proposal is downloading…',
    gate: 'Unlock the full PDF proposal'
  } : {
    title: '获取准确报价',
    sub: '参数已就绪，发给我们的工程师，1 个工作日内回复正式报价，含结构计算、加工详图与海运估算。',
    wa: '用 WhatsApp 发给我 — 最快',
    or: '或',
    mail: '也可以留邮箱 →',
    mailTitle: '用邮箱接收完整方案书',
    fName: '您的称呼', fEmail: '邮箱 *', fCo: '公司（选填）',
    fPort: '项目所在地 / 最近港口', fMsg: '其他说明（选填）',
    submit: '提交并下载完整方案书 PDF',
    sending: '提交中…',
    trust: CFG.trust,
    reply: CFG.reply,
    okTitle: '已收到，方案书可以下载了',
    okSub: '完整方案书（7 张图纸 + 分项算量 + 规格）已就绪。',
    dl: '📄 下载完整方案书（PDF）',
    dlZh: 'English version',
    print: '🖨 打印预览',
    close: '关闭',
    errEmail: '请填写正确的邮箱地址。',
    needKey: '留资投递还没配置（lead.js 里的 web3formsKey），方案书已直接解锁。',
    saved: '已提交，方案书正在下载…',
    gate: '解锁完整方案书 PDF'
  };

  function ctaHTML() {
    return ''
      + '<div class="lead-cta" id="leadCTA">'
      + '<div class="lc-head">'
      + '<div class="lc-badge">FREE</div>'
      + '<h3>' + esc(T.title) + '</h3>'
      + '</div>'
      + '<p class="lc-sub">' + esc(T.sub) + '</p>'
      + '<a class="lead-btn lead-wa" id="leadWa" href="' + esc(waLink()) + '" target="_blank" rel="noopener">'
      + '<svg viewBox="0 0 24 24" width="19" height="19" aria-hidden="true"><path fill="currentColor" d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.9 9.9 0 004.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm0 1.67c2.2 0 4.27.86 5.82 2.42a8.2 8.2 0 012.42 5.82c0 4.54-3.7 8.24-8.25 8.24a8.2 8.2 0 01-4.19-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.18 8.18 0 01-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm-3.6 4.2c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.43 1.03 2.6c.13.17 1.76 2.79 4.28 3.8 2.1.84 2.53.67 2.99.63.46-.04 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.17-.48-.29-.25-.13-1.47-.73-1.7-.81-.23-.08-.4-.13-.56.13-.17.25-.65.81-.8.98-.15.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.42h-.46z"/></svg>'
      + esc(T.wa) + '</a>'
      + '<div class="lc-or">' + esc(T.or) + '</div>'
      + '<button class="lead-btn lead-mail" id="leadMailBtn" type="button">✉️ ' + esc(T.mail) + '</button>'
      + '<div class="lead-form" id="leadForm" hidden>'
      + '<div class="lf-title">' + esc(T.mailTitle) + '</div>'
      + '<input type="text" id="lfName" placeholder="' + esc(T.fName) + '" autocomplete="name">'
      + '<input type="email" id="lfEmail" placeholder="' + esc(T.fEmail) + '" autocomplete="email" required>'
      + '<input type="text" id="lfCompany" placeholder="' + esc(T.fCo) + '" autocomplete="organization">'
      + '<input type="text" id="lfPort" placeholder="' + esc(T.fPort) + '">'
      + '<textarea id="lfMsg" rows="2" placeholder="' + esc(T.fMsg) + '"></textarea>'
      + '<input type="text" id="lfBot" class="lf-hp" tabindex="-1" autocomplete="off" aria-hidden="true">'
      + '<button class="lead-btn lead-submit" id="leadSubmit" type="button">' + esc(T.submit) + '</button>'
      + '<div class="lf-msg" id="lfMsg2"></div>'
      + '</div>'
      + '<div class="lc-foot">'
      + '<span>✅ ' + esc(T.reply) + '</span>'
      + '<span>' + esc(T.trust) + '</span>'
      + '</div>'
      + '</div>';
  }

  function okHTML() {
    return ''
      + '<div class="lead-cta lead-ok" id="leadCTA">'
      + '<div class="lc-head"><div class="lc-badge lc-badge-ok">✓</div><h3>' + esc(T.okTitle) + '</h3></div>'
      + '<p class="lc-sub">' + esc(T.okSub) + '</p>'
      + '<button class="lead-btn lead-dl" id="leadDl" type="button">' + esc(T.dl) + '</button>'
      + '<div class="lc-alt">'
      + '<button class="lead-btn lead-ghost" id="leadDlZh" type="button">' + esc(T.dlZh) + '</button>'
      + '<button class="lead-btn lead-ghost" id="leadPrint" type="button">' + esc(T.print) + '</button>'
      + '</div>'
      + '<div class="lc-foot"><span>✅ ' + esc(T.trust) + '</span></div>'
      + '</div>';
  }

  function mountCTA() {
    var panel = document.getElementById('resultPanel');
    if (!panel) return;
    var old = document.getElementById('leadCTA');
    if (old) old.parentNode.removeChild(old);
    var host = document.createElement('div');
    host.innerHTML = unlocked ? okHTML() : ctaHTML();
    var node = host.firstChild;
    var anchor = document.getElementById('resultCards');
    if (anchor && anchor.parentNode) anchor.parentNode.insertBefore(node, anchor.nextSibling);
    else panel.appendChild(node);
    bindCTA();
    translate(node);
  }

  function bindCTA() {
    var wa = document.getElementById('leadWa');
    if (wa) {
      wa.addEventListener('click', function () {
        // 点击 WhatsApp 即视为留资 → 解锁；不自动下载，避免唐突
        unlock(false);
      });
    }
    var mb = document.getElementById('leadMailBtn');
    if (mb) {
      mb.addEventListener('click', function () {
        var f = document.getElementById('leadForm');
        if (f) { f.hidden = false; mb.style.display = 'none'; }
        var e = document.getElementById('lfEmail'); if (e) e.focus();
      });
    }
    var sub = document.getElementById('leadSubmit');
    if (sub) sub.addEventListener('click', submitLead);
    var dl = document.getElementById('leadDl');
    if (dl) dl.addEventListener('click', function () { downloadProposalPDF('en'); });
    var dlz = document.getElementById('leadDlZh');
    if (dlz) dlz.addEventListener('click', function () { downloadProposalPDF('zh'); });
    var pr = document.getElementById('leadPrint');
    if (pr) pr.addEventListener('click', function () { buildProposalDoc(EN ? 'en' : 'zh'); });
  }

  function unlock(autoDownload) {
    if (!unlocked) {
      unlocked = true;
      try { localStorage.setItem(UNLOCK_KEY, '1'); } catch (e) { }
    }
    mountCTA();
    if (autoDownload) {
      setTimeout(function () { try { downloadProposalPDF('en'); } catch (e) { } }, 300);
    }
  }

  function postLead(fields) {
    var payload = {
      subject: 'New calculator lead — ' + (fields.name || 'unnamed') + (fields.company ? ' (' + fields.company + ')' : ''),
      from_name: 'Laotie Steel Calculator',
      name: fields.name, email: fields.email, company: fields.company,
      project_location_or_port: fields.port, message: fields.msg,
      page: location.href
    };
    // 参数明细一起投递，方便你直接回复报价
    var s = summary();
    if (s) { payload.calculator_parameters = s.mail; payload.estimated_steel_t = (s.r.totalSteel / 1000).toFixed(2); }

    if (CFG.web3formsKey) {
      payload.access_key = CFG.web3formsKey;
      return fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      }).then(function (res) { return res.json(); });
    }
    if (CFG.formspreeId) {
      return fetch('https://formspree.io/f/' + CFG.formspreeId, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      }).then(function (res) { return res.json(); });
    }
    var d = document.createElement('div');
    d.textContent = T.needKey;
    d.style.cssText = 'position:fixed;left:50%;top:14px;transform:translateX(-50%);z-index:99999;background:#FFF7E6;color:#874D00;border:1px solid #FFD591;padding:10px 18px;border-radius:6px;font-size:13px;max-width:90vw';
    document.body.appendChild(d);
    setTimeout(function () { if (d.parentNode) d.parentNode.removeChild(d); }, 7000);
    return Promise.resolve({ ok: true, _local: true });
  }

  function submitLead() {
    var g = function (id) { var e = document.getElementById(id); return e ? e.value.trim() : ''; };
    var fields = {
      name: g('lfName'), email: g('lfEmail'), company: g('lfCompany'),
      port: g('lfPort'), msg: g('lfMsg'), bot: g('lfBot')
    };
    var msgBox = document.getElementById('lfMsg2');
    if (fields.bot) return;                                        // 蜜罐命中：静默丢弃
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(fields.email)) {
      if (msgBox) { msgBox.textContent = T.errEmail; msgBox.className = 'lf-msg lf-err'; }
      return;
    }
    var btn = document.getElementById('leadSubmit');
    if (btn) { btn.disabled = true; btn.textContent = T.sending; }
    if (msgBox) { msgBox.textContent = ''; msgBox.className = 'lf-msg'; }

    postLead(fields).then(function () {
      if (msgBox) { msgBox.textContent = T.saved; msgBox.className = 'lf-msg lf-ok'; }
      unlock(true);                                                // 解锁 + 自动下载方案书
    }).catch(function (e) {
      if (btn) { btn.disabled = false; btn.textContent = T.submit; }
      if (msgBox) {
        msgBox.textContent = String(e && e.message ? e.message : e);
        msgBox.className = 'lf-msg lf-err';
      }
    });
  }

  // ======================= 5. iframe 自适应高度（嵌入模式） =======================
  // 工具在 ≤900px 时是「自然高度 + 上下堆叠」布局（style.css @media max-width:900px
  // 把 body 改成 height:auto）→ 这种模式下可以安全地按内容高度撑 iframe，手机上不用套内滚动。
  // ≥900px 是固定视口 + 面板内滚动的桌面布局 → 父页面保持固定高度即可。
  function reportHeight() {
    if (!CFG._embed) return;
    try {
      // ⚠️ 必须用 body 的自然高度，**不能用 documentElement.scrollHeight**：
      //   后者永远 ≥ 视口高，于是「报高度 → 撑 iframe → 视口变高 → 报得更高」会无限往上爬。
      //   窄屏布局下 body 是 height:auto，它的盒子高就是内容高，没有这个环。
      var b = document.body;
      var h = Math.max(b.scrollHeight, Math.round(b.getBoundingClientRect().height));
      parent.postMessage({
        type: 'laotie-calc-height',
        narrow: window.innerWidth <= 900,
        height: h,
        width: window.innerWidth
      }, '*');
    } catch (e) { /* 不在 iframe 里就算了 */ }
  }
  function watchHeight() {
    if (!CFG._embed) return;
    var t = null;
    function later() { if (t) return; t = setTimeout(function () { t = null; reportHeight(); }, 120); }
    window.addEventListener('resize', later);
    if (typeof ResizeObserver === 'function' && document.body) {
      try { new ResizeObserver(later).observe(document.body); } catch (e) { }
    }
    setTimeout(reportHeight, 300);
    setTimeout(reportHeight, 1500);
    setTimeout(reportHeight, 3000);
    setTimeout(reportHeight, 6000);
  }

  // 顶栏常驻 WhatsApp 按钮（客户随时能找到入口）
  function headerCTA() {
    var box = document.querySelector('.header-actions');
    if (!box || document.getElementById('leadHeaderWa')) return;
    var a = document.createElement('a');
    a.id = 'leadHeaderWa';
    a.className = 'btn-icon lead-hd-wa';
    a.href = waLink();
    a.target = '_blank';
    a.rel = 'noopener';
    a.title = EN ? 'Chat on WhatsApp' : '用 WhatsApp 联系';
    a.innerHTML = '<svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true"><path fill="currentColor" d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.9 9.9 0 004.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm0 1.67c2.2 0 4.27.86 5.82 2.42a8.2 8.2 0 012.42 5.82c0 4.54-3.7 8.24-8.25 8.24a8.2 8.2 0 01-4.19-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.18 8.18 0 01-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm-3.6 4.2c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.43 1.03 2.6c.13.17 1.76 2.79 4.28 3.8 2.1.84 2.53.67 2.99.63.46-.04 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.17-.48-.29-.25-.13-1.47-.73-1.7-.81-.23-.08-.4-.13-.56.13-.17.25-.65.81-.8.98-.15.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.42h-.46z"/></svg>';
    box.insertBefore(a, box.firstChild);
    // 参数一变，链接里的参数也跟着变
    ['input', 'change'].forEach(function (ev) {
      document.addEventListener(ev, function () { a.href = waLink(); }, true);
    });
  }

  // ======================= 5. 启动 =======================
  function boot() {
    customerMode();
    hookProposal();
    headerCTA();
    watchHeight();
    patchWindZones();
    translate(document.body);
    if (document.title) { var t = tCore(document.title.trim()); if (t) document.title = t; }

    // 动态内容（结果面板 / toast / 免责弹窗）翻译
    var obs = new MutationObserver(function (muts) {
      for (var i = 0; i < muts.length; i++) {
        var m = muts[i];
        if (m.type === 'characterData') { tNode(m.target); continue; }
        for (var j = 0; j < m.addedNodes.length; j++) {
          var n = m.addedNodes[j];
          if (n.nodeType === 1) translate(n);
          else if (n.nodeType === 3) tNode(n);
        }
      }
    });
    obs.observe(document.body, { childList: true, subtree: true, characterData: true });

    // 生成报告后挂留资卡
    if (typeof window.generateReport === 'function' && !window.generateReport.__leadHooked) {
      var og = window.generateReport;
      var wg = function () { var out = og.apply(this, arguments); setTimeout(function () { killGallery(); mountCTA(); }, 60); return out; };
      wg.__leadHooked = true;
      window.generateReport = wg;
    }
    // 参考图纸画廊是 renderArchRef 里拼进去的 → 包一层，拼完就摘掉
    if (typeof window.renderArchRef === 'function' && !window.renderArchRef.__leadHooked) {
      var oa = window.renderArchRef;
      var wa2 = function () { var out = oa.apply(this, arguments); setTimeout(killGallery, 0); return out; };
      wa2.__leadHooked = true;
      window.renderArchRef = wa2;
    }
    // 也兜一层：报告面板一旦显示就挂卡
    var panel = document.getElementById('resultPanel');
    if (panel) {
      obs.observe(panel, { attributes: true, attributeFilter: ['style'] });
    }
    window.__leadReady = true;
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();

  // 给外部（探针）用的口子
  window.__lead = {
    cfg: CFG, summary: summary, waLink: waLink, tCore: tCore,
    unlocked: function () { return unlocked; }, stripPrice: stripPrice,
    reportHeight: reportHeight, patchWindZones: patchWindZones, zoneEn: ZONE_EN
  };
})();
