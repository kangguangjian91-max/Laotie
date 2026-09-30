/**
 * 钢结构算量工具 - 计算引擎 v3
 * 门式刚架：柱+梁均为钢板焊接H型钢 (CECS 102)
 * 所有重量为预估数值，仅供初步预算参考
 */

// ========== 通用：焊接H型钢计算 ==========

/** 等截面焊接H型钢 (柱) */
function weldedSection(H, B, tw, tf) {
  const A = 2 * B * tf + (H - 2 * tf) * tw;
  return {
    spec: `H${H}×${B}×${tw}×${tf}`,
    weight: A * 7.85 / 1000,
  };
}

/** 变截面焊接H型钢 (梁): H(膝深~屋脊深)×B×tw×tf, 腹板线性渐变, 翼缘不变 */
function weldedTapered(Hk, Hr, B, tw, tf) {
  const Ak = 2 * B * tf + (Hk - 2 * tf) * tw;
  const Ar = 2 * B * tf + (Hr - 2 * tf) * tw;
  const weight = (Ak + Ar) / 2 * 7.85 / 1000;
  return {
    spec: `H(${Hk}~${Hr})×${B}×${tw}×${tf}`,
    weight,
    Hk, Hr,
    wEnd: Ar * 7.85 / 1000,   // 端部(屋脊侧)截面单重 kg/m —— 直梁段按此计算
  };
}

// ========== 构件规格 ==========
const STEEL_COEFF = 1.05;

// ========== 风荷载（2026-09-27 r39 康师傅确认：基本风压 w0 + 按地区带出） ==========
// 链路：wk = μs · μz · βz · w0（βz = 1.0，檐高 ≤ 30m 不计风振）
//   w0  基本风压（50 年一遇，kN/m²）：地区表带出，或手动覆盖
//   μz  高度变化系数：GB 50009-2012 表 8.2.1 B 类地面粗糙度，按高度线性插值
//   μs  体型系数：墙面迎风 +0.8；双坡屋面（坡角 ≤ 15°）风吸 −1.0（门规简化口径）
// ⚠️ 海外地区 w0 为按当地常见设计风速折算的参考值，正式设计须按项目所在国规范核准。
const WIND_ZONES = [
  { id: 'henan',     name: '中国·河南（商丘/郑州）',        w0: 0.45 },
  { id: 'north',     name: '中国·华北（北京/天津/石家庄）',  w0: 0.45 },
  { id: 'northeast', name: '中国·东北（沈阳/哈尔滨）',      w0: 0.55 },
  { id: 'east',      name: '中国·华东（上海/南京/杭州）',    w0: 0.55 },
  { id: 'south',     name: '中国·华南（广州/长沙）',        w0: 0.55 },
  { id: 'coast',     name: '中国·东南沿海（福州/温州）',     w0: 0.70 },
  { id: 'southsea',  name: '中国·海南/南海（台风区）',       w0: 0.85 },
  { id: 'sw',        name: '中国·西南（成都/重庆/昆明）',    w0: 0.30 },
  { id: 'nw',        name: '中国·西北（西安/兰州）',        w0: 0.35 },
  { id: 'fj',        name: '斐济/南太（热带气旋区）',        w0: 1.00 },
  { id: 'ph',        name: '菲律宾/越南沿海（台风区）',      w0: 0.85 },
  { id: 'au',        name: '澳大利亚/新西兰沿海',           w0: 0.80 },
  { id: 'sea',       name: '东南亚（印尼/马来/泰国）',       w0: 0.60 },
  { id: 'me',        name: '中东（沙特/阿联酋/伊拉克）',     w0: 0.55 },
  { id: 'africa',    name: '非洲（肯尼亚/坦桑/尼日利亚）',   w0: 0.50 },
  { id: 'eu',        name: '欧洲（德国/法国/巴尔干）',       w0: 0.50 },
  { id: 'custom',    name: '自定义（手动填下方 w₀）',        w0: 0.45 },
];
const WIND_MUZ_TBL = [[5, 1.00], [10, 1.00], [15, 1.13], [20, 1.23], [30, 1.39],
                      [40, 1.52], [50, 1.62], [60, 1.71], [70, 1.79], [80, 1.87],
                      [90, 1.95], [100, 2.02]];

/** Gable 屋面坡度（m）：与 3D / 建筑图 / 抗风柱共用同一口径 */
function roofRiseM(widthMm) {
  return Math.min((widthMm / 1000) * 0.5 * 0.105, 2.8);
}
/** 基本风压 w0（kN/m²）：新字段 basicWind 优先，老存档 windLoad 兜底 */
function windW0(params) {
  if (params) {
    if (params.basicWind != null && params.basicWind > 0) return params.basicWind;
    if (params.windLoad != null && params.windLoad > 0) return params.windLoad;
  }
  return 0.45;
}
/** 高度变化系数 μz（B 类粗糙度，GB 50009 表 8.2.1） */
function windMuZ(z) {
  const T = WIND_MUZ_TBL;
  if (!(z > 0)) return 1.0;
  if (z <= T[0][0]) return T[0][1];
  for (let i = 1; i < T.length; i++) {
    if (z <= T[i][0]) {
      const a = T[i - 1], b = T[i];
      return a[1] + (b[1] - a[1]) * (z - a[0]) / (b[0] - a[0]);
    }
  }
  return T[T.length - 1][1];
}
/** 风荷载标准值 wk（kN/m²，返回幅值）：surface = 'wall' | 'roof' | 'roofEdge' */
function windPressure(params, z, surface) {
  const w0 = windW0(params);
  const muz = windMuZ(z || (params && params.height ? params.height / 1000 : 8));
  const mus = surface === 'wall' ? 0.8 : (surface === 'roofEdge' ? -1.4 : -1.0);
  return Math.abs(mus) * muz * w0;
}
/** 供 UI / 报告显示的风荷载明细 */
function windReport(params) {
  const H = (params && params.height ? params.height : 8000) / 1000;
  const rise = roofRiseM(params && params.width ? params.width : 25000);
  const w0 = windW0(params);
  const zEave = H, zRidge = H + rise;
  return {
    w0: w0, zone: (params && params.windZone) || 'custom',
    muzEave: windMuZ(zEave), muzRidge: windMuZ(zRidge),
    wkWall: windPressure(params, zEave, 'wall'),
    wkRoof: windPressure(params, zEave + rise / 2, 'roof'),
    wkRoofEdge: windPressure(params, zEave + rise / 2, 'roofEdge'),
    zEave: zEave, zRidge: zRidge,
  };
}

// ========== 冷弯薄壁 C 型钢库（GB/T 6723 常用规格） ==========
// 强度：Q235B 冷弯薄壁 f = 205 N/mm²（GB 50018）；挠度限值 L/150
// 截面特性按净尺寸算（腹板 h−2t、翼缘 b−t、卷边 c−t），已内含冷弯薄壁
// 有效截面折减余量（比毛截面值低约 5~8%，偏安全，不另乘折减系数）
// 单重按展开理论重量 (h+2b+2c)·t·7.85/1000（未扣弯角，略偏保守）
const PURLIN_F = 205;        // N/mm²
const PURLIN_E = 206000;     // N/mm²
const PURLIN_DEFL = 150;     // 挠度限值 L/150
const PURLIN_SAFE = 1.08;    // 截面需求附加余量（覆盖有效截面折减 / 施工偏差）
const C_LIB = (function () {
  const lib = [];
  const G = [
    [100, 50, 20, [2.0, 2.5, 3.0]],
    [120, 50, 20, [2.0, 2.2, 2.5, 3.0]],
    [140, 50, 20, [2.0, 2.2, 2.5, 3.0]],
    [160, 60, 20, [2.0, 2.5, 3.0]],
    [180, 70, 20, [2.0, 2.5, 3.0]],
    [200, 70, 20, [2.0, 2.5, 3.0]],
    [220, 75, 20, [2.5, 3.0]],
    [250, 75, 20, [2.5, 3.0]],
    [280, 80, 20, [2.5, 3.0]],
    [300, 80, 20, [3.0]],
    [320, 80, 20, [3.0]],
  ];
  G.forEach(function (g) {
    const h = g[0], b = g[1], c = g[2];
    g[3].forEach(function (t) {
      const hw = h - 2 * t, bw = b - t, cw = c - t;
      const df = (h - t) / 2;                 // 翼缘中心到中性轴
      const dl = df - cw / 2;                 // 卷边中心到中性轴
      const Ix = t * Math.pow(hw, 3) / 12
        + 2 * (bw * Math.pow(t, 3) / 12 + bw * t * df * df)
        + 2 * (t * Math.pow(cw, 3) / 12 + cw * t * dl * dl);
      lib.push({
        h: h, b: b, c: c, t: t, Ix: Ix, Wx: Ix / (h / 2),
        kg: (h + 2 * b + 2 * c) * t * 7.85 / 1000,
        spec: 'C' + h + '×' + b + '×' + c + '×' + t,
      });
    });
  });
  lib.sort(function (p, q) { return p.kg - q.kg; });   // 升序 = 最轻优先
  return lib;
})();

// ========== 檩条 / 墙梁选型：按荷载反算（2026-09-27 r39 康师傅确认） ==========
// 两套模型并行试算，取总钢量最省（简支现场施工简单，连续搭接省钢但多搭接工作量）：
//   simple     简支：M = qU·L²/8，δ = 5qS·L⁴/(384EI)
//   continuous 连续搭接（GB 51022 4.3.2：檩条宜连续、支座搭接 ≥10% 跨）：
//              M = 0.80·(qU·L²/8)，Ix 需求折算 0.64，下料长度 ×1.10
const PUR_DEAD_ROOF = 0.30;   // 屋面恒载 kN/m²（压型板 + 保温 + 檩条自重折算）
const PUR_DEAD_WALL = 0.12;   // 墙面恒载 kN/m²（压型板 + 墙梁自重折算）
const CONT_M_FAC = 0.80;
const CONT_D_FAC = 0.64;
const CONT_LEN_FAC = 1.10;

/** 单种模型的荷载需求：返回 { M, Wreq, Ireq, qU, qS, gov } */
function purlinDemand(L, s, dead, snow, wk, mFac, dFac, isRoof) {
  let qU, qS;
  if (isRoof) {
    const qDownU = (1.3 * dead + 1.5 * snow) * s;      // 向下：恒 + 雪
    const qDownS = (dead + snow) * s;
    const qUpU = (1.5 * wk - 1.0 * dead) * s;          // 向上：风吸（自重有利）
    const qUpS = (wk - dead) * s;
    qU = Math.max(qDownU, Math.max(0, qUpU));
    qS = Math.max(qDownS, Math.max(0, qUpS));
  } else {
    qU = Math.max(1.3 * dead * s, 1.5 * wk * s);       // 墙梁：水平风压为主控
    qS = Math.max(dead * s, wk * s);
  }
  qU *= mFac; qS *= dFac;
  const M = qU * L * L / 8;
  const Wreq = M / PURLIN_F * PURLIN_SAFE;
  const Ireq = 5 * qS * Math.pow(L, 4) / (384 * PURLIN_E * (L / PURLIN_DEFL)) * PURLIN_SAFE;
  return { M: M, Wreq: Wreq, Ireq: Ireq, qU: qU, qS: qS,
           gov: (Wreq / 1 >= Ireq / 1) ? 'strength' : 'defl', govKind: null };
}
/** 取最轻的满足截面（C_LIB 已按 kg 升序） */
function pickCSection(Wreq, Ireq) {
  for (let i = 0; i < C_LIB.length; i++) {
    const c = C_LIB[i];
    if (c.Wx >= Wreq && c.Ix >= Ireq) return c;
  }
  return null;
}
// 判定控制项：把 Wx/Ix 需求换算成「距库内最大截面的富余度」比较不直观，
// 改用更直白的方式 —— 分别用只控强度的最小截面和只控挠度的最小截面，谁更重谁控制
function govOf(Wreq, Ireq) {
  const sW = pickCSection(Wreq, 0);
  const sI = pickCSection(0, Ireq);
  const kw = sW ? sW.kg : Infinity, ki = sI ? sI.kg : Infinity;
  return { gov: kw >= ki ? 'strength' : 'defl', Wreq: Wreq, Ireq: Ireq };
}

/**
 * 檩条/墙梁最优选型
 * @param {'roof'|'wall'} type
 * @param {number} spanM     跨度（m）= 柱距
 * @param {number} spacingM  受荷宽（m）= 檩距 / 墙梁距
 * @param {object} params
 */
function optimalPurlin(type, spanM, spacingM, params) {
  const isRoof = (type === 'roof');
  const L = Math.max(1, spanM) * 1000;
  const s = Math.max(0.6, spacingM);
  const dead = isRoof ? PUR_DEAD_ROOF : PUR_DEAD_WALL;
  const snow = isRoof ? (params.snowLoad != null ? params.snowLoad : 0.5) : 0;
  const rise = roofRiseM(params.width || 25000);
  const z = ((params.height || 8000) / 1000) + (isRoof ? rise / 2 : 0);
  const wk = windPressure(params, z, isRoof ? 'roof' : 'wall');

  const cands = [];
  const dS = purlinDemand(L, s, dead, snow, wk, 1.0, 1.0, isRoof);
  const cS = pickCSection(dS.Wreq, dS.Ireq);
  if (cS) cands.push({ model: 'simple', modelName: '简支', sec: cS, dem: dS, lenFac: 1.0 });

  const nSpan = Math.max(1, Math.ceil(((params.length || 60000) / 1000) / Math.max(0.5, spanM)));
  if (nSpan >= 2) {
    const dC = purlinDemand(L, s, dead, snow, wk, CONT_M_FAC, CONT_D_FAC, isRoof);
    const cC = pickCSection(dC.Wreq, dC.Ireq);
    if (cC) cands.push({ model: 'continuous', modelName: '连续搭接', sec: cC, dem: dC, lenFac: CONT_LEN_FAC });
  }
  if (!cands.length) {                                    // 超出库上限 → 兜底最大截面
    const big = C_LIB[C_LIB.length - 1];
    cands.push({ model: 'simple', modelName: '简支', sec: big, dem: dS, lenFac: 1.0, overflow: true });
  }
  cands.forEach(function (x) { x.perM = x.sec.kg * x.lenFac; });
  cands.sort(function (a, b) { return a.perM - b.perM; });
  const best = cands[0];
  const alt = cands.length > 1 ? cands[1] : null;

  const sSim = cands.find(function (c) { return c.model === 'simple'; });
  const sCon = cands.find(function (c) { return c.model === 'continuous'; });
  const contSave = (sSim && sCon) ? (1 - sCon.perM / sSim.perM) : 0;   // >0 = 连续搭接更省

  return {
    spec: best.sec.spec, weight: best.sec.kg * best.lenFac, factor: 1.00, h: best.sec.h,
    rawKg: best.sec.kg, sec: best.sec,
    model: best.model, modelName: best.modelName, lenFac: best.lenFac,
    demand: best.dem, wk: wk, spacing: s, span: spanM,
    nSpan: nSpan, overflow: !!best.overflow,
    alt: alt ? {
      sec: alt.sec, spec: alt.sec.spec, model: alt.model, modelName: alt.modelName,
      perM: alt.perM, rawKg: alt.sec.kg,
    } : null,
    allSchemes: cands,
    contSave: contSave,
    gov: govOf(best.dem.Wreq, best.dem.Ireq).gov,
  };
}

/** 屋面檩条（params 口径，取代原按跨度查表） */
function lookupRoofPurlin(params) {
  return optimalPurlin('roof', (params.columnSpacing || 6000) / 1000,
    (params.roofPurlinSpacing || 1500) / 1000, params);
}
/** 墙面檩条 / 墙梁（params 口径，取代原按跨度查表） */
function lookupWallPurlin(params) {
  return optimalPurlin('wall', (params.columnSpacing || 6000) / 1000,
    (params.wallPurlinSpacing || 1500) / 1000, params);
}

// ========== 钢柱：檐高定截面 (GB/T 33814 焊接H型钢) ==========
function lookupColumn(H) {
  if (H <= 5)  return weldedSection(250, 200, 6, 10);
  if (H <= 7)  return weldedSection(300, 200, 8, 12);
  if (H <= 10) return weldedSection(350, 250, 8, 14);
  return weldedSection(400, 300, 10, 16);
}

// ========== 屋面梁：单跨跨度定截面 (GB/T 33814 变截面焊接H型钢) ==========
function lookupBeam(S, tapered) {
  if (S <= 10)
    return tapered ? weldedTapered(300, 200, 180, 6, 8)
                   : weldedSection(300, 200, 6, 10);
  if (S <= 15)
    return tapered ? weldedTapered(500, 350, 200, 8, 10)
                   : weldedSection(400, 200, 8, 12);
  if (S <= 20)
    return tapered ? weldedTapered(600, 400, 220, 10, 12)
                   : weldedSection(500, 220, 8, 14);
  if (S <= 25)
    return tapered ? weldedTapered(700, 450, 250, 10, 14)
                   : weldedSection(600, 250, 10, 16);
  if (S <= 30)
    return tapered ? weldedTapered(900, 550, 300, 12, 18)
                   : weldedSection(800, 300, 12, 20);
  if (S <= 35)
    return tapered ? weldedTapered(1100, 650, 350, 14, 22)
                   : weldedSection(900, 350, 14, 22);
  return tapered ? weldedTapered(1200, 700, 380, 16, 24)
                 : weldedSection(1000, 380, 16, 24);
}

// ========== 力学最优选型（2026-09-27 康师傅确认：最优+工程余量，荷载可调） ==========
// 梁：强度（檐口 M≈qL²/12 · 屋脊 L²/24 · 风吸 L²/16 包络，γ=1.0 不取塑性发展）+ 挠度（标准组合 L/180）双控
// 柱：轴力（半跨屋面荷载）+ 压弯相关公式（φ=2500/λ² 近似）+ 长细比 λ=1.5H/i ≤95
// 工程余量（构造下限，可按厂里经验再调）：跨≥12m B≥200、跨≥24m B≥250/tf≥12/tw≥8、跨≥18m tf≥10；
//                                    翼缘宽厚比≤12、腹板高厚比≤70、端部高 Hr≥0.75Hk
const STEEL_F = 305;                      // Q355 抗拉/抗压强度 N/mm²（t≤16）
const SEC_LIB = (function () {
  var lib = [], Hs = [250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 900, 1000, 1100, 1200];
  var Bs = [180, 200, 220, 250, 300], tws = [6, 8, 10, 12], tfs = [8, 10, 12, 14, 16, 18, 20];
  for (var a = 0; a < Hs.length; a++) for (var b = 0; b < Bs.length; b++) for (var c = 0; c < tws.length; c++) for (var d = 0; d < tfs.length; d++) {
    var H = Hs[a], B = Bs[b], tw = tws[c], tf = tfs[d];
    if (H - 2 * tf < 180) continue;
    if (B / (2 * tf) > 12) continue;          // 翼缘宽厚比
    if ((H - 2 * tf) / tw > 70) continue;     // 腹板高厚比（门规可用屈曲后强度）
    var A = 2 * B * tf + (H - 2 * tf) * tw;
    var Ix = tw * Math.pow(H - 2 * tf, 3) / 12 + 2 * B * tf * Math.pow((H - tf) / 2, 2);
    lib.push({ H: H, B: B, tw: tw, tf: tf, A: A, Ix: Ix, Wx: Ix / (H / 2), ix: Math.sqrt(Ix / A), kg: A * 7.85 / 1000 });
  }
  lib.sort(function (p, q) { return p.kg - q.kg; });   // 升序 = 最轻优先
  return lib;
})();

function optimalBeam(S, tapered, cs, snow, wind) {
  var DEAD = 0.30;                                     // 恒载 kN/m²（板+檩条+保温）
  var qU = (1.3 * DEAD + 1.5 * snow) * cs;             // 基本组合 N/mm
  var qS = (DEAD + snow) * cs;                         // 标准组合 N/mm
  var Smm = S * 1000;
  var Mk = qU * Smm * Smm / 12;                        // 檐口(膝)弯矩 N·mm
  var Mr = qU * Smm * Smm / 24;                        // 屋脊弯矩
  var Mw = Math.abs(1.4 * wind - DEAD) * cs * Smm * Smm / 16;  // 风吸工况
  var Wreq = Math.max(Mk, Mw) / STEEL_F;               // γ=1.0（余量）
  var Ireq = 5 * qS * Math.pow(Smm, 4) / (384 * 206000 * (Smm / 180));
  var Bmin = S >= 24 ? 250 : (S >= 12 ? 200 : 180);
  var tfmin = S >= 24 ? 12 : (S >= 18 ? 10 : 8);
  var twmin = S >= 24 ? 8 : 6;
  var hk = null;
  for (var i = 0; i < SEC_LIB.length; i++) {
    var s = SEC_LIB[i];
    if (s.Wx < Wreq || s.Ix < Ireq) continue;
    if (s.B < Bmin || s.tf < tfmin || s.tw < twmin) continue;
    hk = s; break;
  }
  if (!hk) return lookupBeam(S, tapered);              // 极端跨度兜底老表
  if (!tapered) {
    return { spec: 'H' + hk.H + '×' + hk.B + '×' + hk.tw + '×' + hk.tf,
             weight: hk.kg, wEnd: hk.kg, Hk: hk.H, Hr: hk.H, B: hk.B, tw: hk.tw, tf: hk.tf };
  }
  var WrEnd = Math.max(Mr, Mw / 1.5) / STEEL_F;        // 端部(屋脊侧)需求
  var hr = null;
  for (var j = 0; j < SEC_LIB.length; j++) {
    var t = SEC_LIB[j];
    if (t.Wx < WrEnd || t.H < 0.75 * hk.H) continue;
    if (t.B !== hk.B || t.tw !== hk.tw || t.tf > hk.tf) continue;
    hr = t; break;
  }
  if (!hr) hr = hk;
  return { spec: 'H(' + hk.H + '~' + hr.H + ')×' + hk.B + '×' + hk.tw + '×' + hk.tf,
           weight: (hk.kg + hr.kg) / 2, wEnd: hr.kg,
           Hk: hk.H, Hr: hr.H, B: hk.B, tw: hk.tw, tf: hk.tf };
}

// 2026-09-28 r40：新增 crane 形参 —— 行车竖向轮压（偏心）+ 横向水平力计入柱内力，
//   并按图集构造要求把柱截面宽度下限提到 300mm（不足则自动升档）。
//   crane 为 null / {on:false} 时逐字保持 r39 行为（无行车项目零回归）。
function optimalColumn(Hm, Wm, cs, snow, crane) {
  var DEAD = 0.30;
  var qU = (1.3 * DEAD + 1.5 * snow) * cs;             // N/mm
  var N = qU * Wm * 1000 / 2;                          // 每柱轴力 N（半跨屋面）
  var Mc = 0.8 * qU * Wm * Wm * 1e6 / 12;              // 柱顶弯矩（膝弯矩 0.8 分配）
  var Bmin = Hm >= 6 ? 250 : 200, tfmin = Hm >= 6 ? 10 : 8;
  var craneOn = !!(crane && crane.on);
  if (craneOn) {
    N += crane.colN;
    Mc += crane.colM;
    Bmin = Math.max(Bmin, crane.colBMin || 0);         // 图集：支承吊车梁的柱宽 ≥300mm
  }
  var col = null;
  for (var i = 0; i < SEC_LIB.length; i++) {
    var s = SEC_LIB[i];
    if (s.B < Bmin || s.tf < tfmin || s.tw < 6) continue;
    var lambda = 1.5 * Hm * 1000 / s.ix;               // 计算长度系数 1.5
    if (lambda > 95) continue;                         // 长细比限值
    var phi = Math.min(1, 2500 / (lambda * lambda));   // b 类稳定系数近似
    if (N / (phi * s.A * STEEL_F) + Mc / (s.Wx * STEEL_F) <= 1) { col = s; break; }
  }
  if (!col) {
    if (craneOn) {                                     // 行车工况：老表无对应档，取库内满足柱宽的最大截面
      var big = SEC_LIB[SEC_LIB.length - 1];
      for (var k = SEC_LIB.length - 1; k >= 0; k--) {
        if (SEC_LIB[k].B >= Bmin) { big = SEC_LIB[k]; break; }
      }
      return { spec: 'H' + big.H + '×' + big.B + '×' + big.tw + '×' + big.tf,
               weight: big.kg, H: big.H, B: big.B, tw: big.tw, tf: big.tf };
    }
    return lookupColumn(Hm);                           // 兜底老表
  }
  return { spec: 'H' + col.H + '×' + col.B + '×' + col.tw + '×' + col.tf,
           weight: col.kg, H: col.H, B: col.B, tw: col.tw, tf: col.tf };
}

// ========== 梁分段（变截面楔形段 + 直梁段，按受力省钢）==========
// 弯矩从檐口向屋脊抛物线衰减 M(t)≈M0(1−t)²，需求梁高随之下降：
// h(t) = Hr + (Hk−Hr)(1−t)²；需求高降至端部高 1.05 倍处改用直梁（恒 Hr 截面）。
// 返回楔形段占坡长比例，clamp 到 0.3~0.9。
function taperFraction(beam) {
  if (!beam || !beam.Hk || !beam.Hr || beam.Hk <= beam.Hr) return 0;
  const f = 1 - Math.sqrt(0.05 * beam.Hr / (beam.Hk - beam.Hr));
  return Math.min(0.9, Math.max(0.3, f));
}

// 分段后梁的加权平均单重（kg/m）——比全长楔形省钢
function beamWeightPerMeter(beam, tapered) {
  if (!tapered || !beam.Hk) return beam.weight;
  const f = taperFraction(beam);
  return f * beam.weight + (1 - f) * beam.wEnd;
}

// ========== 主结构计算 ==========
// 2026-09-28 r40：新增 crane 形参 —— 行车工况下柱截面按吊车荷载验算并自动升档
function calcMainStructure(params, crane) {
  const { length, width, height, hasMiddleColumn, isTapered, columnSpacing } = params;
  const L = length / 1000, W = width / 1000, H = height / 1000;
  const cs = columnSpacing ? columnSpacing / 1000 : 6;

  const numCols = Math.ceil(L / cs) + 1;
  const singleSpan = hasMiddleColumn ? W / 2 : W;
  const snow = params.snowLoad || 0.5;
  // 2026-09-27 r39：主梁风吸工况改用「风荷载标准值 wk」（原为直接把输入值当标准值用）
  const wind = windPressure(params, H, 'roof');
  const beam = optimalBeam(singleSpan, isTapered, cs, snow, wind);
  const colW = hasMiddleColumn ? W / 4 : W / 2;
  const col = optimalColumn(H, colW, cs, snow, crane);
  // 行车工况：另算「不考虑行车」的柱截面，供报告对比提示（无行车时为 null）
  const colBase = (crane && crane.on) ? optimalColumn(H, colW, cs, snow, null) : null;
  const halfSpan = singleSpan / 2;

  // 梁分段：楔形段（檐口侧）+ 直梁段（屋脊侧），按受力定比例
  const bPerM = beamWeightPerMeter(beam, isTapered);
  let beamInfo = beam;
  if (isTapered && beam.Hk) {
    const f = taperFraction(beam);
    beamInfo = Object.assign({}, beam, {
      spec: beam.spec + ` · 楔形${Math.round(f * 100)}%+直梁${100 - Math.round(f * 100)}%`,
      taperFraction: f,
    });
  }

  if (hasMiddleColumn) {
    const sideCols = numCols * 2 * H * col.weight * STEEL_COEFF;
    const midCols = numCols * 1 * H * col.weight * STEEL_COEFF;
    const beams = numCols * 4 * halfSpan * bPerM * STEEL_COEFF;
    return {
      columnWeight: sideCols + midCols,
      beamWeight: beams,
      total: sideCols + midCols + beams,
      column: col, beam: beamInfo,
      colBase: colBase,          // 无行车时的柱截面（行车工况才非 null，供报告对比）
      numCols, singleSpan,
    };
  } else {
    const cols = numCols * 2 * H * col.weight * STEEL_COEFF;
    const beams = numCols * 2 * halfSpan * bPerM * STEEL_COEFF;
    return {
      columnWeight: cols,
      beamWeight: beams,
      total: cols + beams,
      column: col, beam: beamInfo,
      colBase: colBase,          // 无行车时的柱截面（行车工况才非 null，供报告对比）
      numCols, singleSpan,
    };
  }
}

// ========== 檩条 ==========
// ========== 四边构件端部延长量（纵墙梁/山墙梁/屋面檩条互相搭接成闭合圈） ==========
// 与 3D 采用同一套柱外皮参数：柱沿 X 半宽 0.15m；柱沿 Z 腹板高 0.38(底)~0.62(顶) 变截面
function perimeterExt(params) {
  const H = (params.height || 8000) / 1000;
  const cs = (params.columnSpacing || 6000) / 1000;
  const wcH = lookupWallPurlin(params).h / 1000;
  const girtTop = Math.max(1.2 + 0.3, H - 0.05);
  const gyMid = (1.2 + girtTop) / 2;                                  // 墙梁层平均高度
  const colHalfZ = (0.38 + (0.62 - 0.38) * Math.min(1, gyMid / Math.max(1, H))) / 2;
  return {
    wcH,
    extX: 0.15 + wcH + 0.012,                                          // 沿 X：延到山墙梁外皮
    extZ: colHalfZ + wcH + 0.012,                                      // 沿 Z：延到纵墙梁外皮
  };
}

function calcRoofPurlins(params) {
  const { length, width, roofPurlinSpacing, columnSpacing, hasParapet } = params;
  const L = length / 1000, W = width / 1000;
  const rps = roofPurlinSpacing / 1000;
  const cs = columnSpacing ? columnSpacing / 1000 : 6;
  const purlin = lookupRoofPurlin(params);
  // 屋面坡度：统一单脊双坡口径（双跨=中柱升至屋脊，与 3D/建筑图/抗风柱/脊瓦/天沟一致），每坡 W/2
  const slopeW = W / 2;
  const rise = Math.min(slopeW * 0.105, 2.8);
  const slopeLen = Math.sqrt(slopeW * slopeW + rise * rise);
  // 工艺：屋脊两侧各 200mm 为第一根檩条，向外按 ≤rps 均分到檐口（离檐口 150mm）
  const ridgeOff = 0.2, eaveOff = 0.15;
  const avail = Math.max(0.3, slopeLen - eaveOff - ridgeOff);
  const nInt = Math.max(1, Math.ceil(avail / rps));
  const perSlope = nInt + 1;   // 2026-09-27 康师傅确认：带女儿墙不再省檐口檩（内天沟托架+檐口檩双支承），两场景口径一致
  // 端部延长：两端各外伸到山墙墙梁外皮（与四边墙梁搭接成闭合圈）
  const ex = perimeterExt(params);
  const lenEach = L + 2 * ex.extX;
  return {
    perSlope, purlin, ridgeOffset: ridgeOff,
    lenEach,
    segCount: Math.max(1, Math.ceil(lenEach / cs)),   // 2026-09-27 康师傅口径：檩条按柱距分段下料
    totalLength: perSlope * 2 * lenEach,
    weight: perSlope * 2 * lenEach * purlin.weight * purlin.factor,
    spec: purlin.spec + ` (${purlin.modelName}·柱距${cs}m·檩距${rps}m·w${purlin.wk.toFixed(2)}) · 按柱距${cs}m分段×${Math.max(1, Math.ceil(lenEach / cs))}段/根 · 端部外伸${ex.extX.toFixed(2)}m×2`,
    purlinInfo: {
      model: purlin.model, modelName: purlin.modelName, span: cs, spacing: rps,
      wk: purlin.wk, rawKg: purlin.rawKg, lenFac: purlin.lenFac,
      Wreq: purlin.demand.Wreq, Ireq: purlin.demand.Ireq, gov: purlin.gov,
      contSave: purlin.contSave, alt: purlin.alt, overflow: purlin.overflow,
      schemes: purlin.allSchemes.map(function (x) {
        return { modelName: x.modelName, spec: x.sec.spec, perM: x.perM, rawKg: x.sec.kg };
      }),
    },
  };
}

// 墙梁标高线（与 preview3d.js 一致：首根 1.2m 砖墙顶，末根檐口下 5cm，中间 ≤wps 均分）
function girtLevelsM(params) {
  const H = (params.height || 8000) / 1000;
  const wps = (params.wallPurlinSpacing || 1500) / 1000;
  const girtTop = Math.max(1.5, H - 0.05);
  const nSeg = Math.max(1, Math.ceil((girtTop - 1.2) / wps));
  const step = (girtTop - 1.2) / nSeg;
  const ys = [];
  for (let i = 0; i <= nSeg; i++) ys.push(Math.min(1.2 + step * i, H - 0.02));
  return ys;
}
// 门窗洞口竖向尺寸对齐墙梁标高线（洞口上下边借用所在标高的墙梁作框）
function openingSnaps(params) {
  const ys = girtLevelsM(params);
  const H = (params.height || 8000) / 1000;
  const sill = Math.max(0, (params.sillHeight || 1200) / 1000);
  const snapUp = (y) => { let r = ys[ys.length - 1]; ys.forEach(g => { if (g >= y - 0.01 && g < r) r = g; }); return r; };
  const snapDown = (y) => { let r = ys[0]; ys.forEach(g => { if (g <= y + 0.01 && g > r) r = g; }); return r; };
  let rawTop;
  if (params.winHeight && params.winHeight > 0) rawTop = sill + params.winHeight / 1000;
  else rawTop = H - 1.5 - (params.hasParapet && params.parapetHeight > 0 ? 1.5 : 0);
  const winBot = snapUp(sill);
  let winTop = snapUp(rawTop);
  if (winTop - winBot < 0.6) winTop = snapUp(winBot + 0.6);
  const doorTop = snapDown((params.doorHeight || 5500) / 1000);
  // 门洞断开的墙梁层数（低于门顶标高线）；窗洞断开的墙梁层数（洞口内部标高线，不含借用的上下边）
  const doorCutLayers = ys.filter(g => g < doorTop - 0.05).length;
  const winCutLayers = ys.filter(g => g > winBot + 0.03 && g < winTop - 0.03).length;
  return { ys, winBot, winTop, winH: winTop - winBot, doorTop, doorCutLayers, winCutLayers };
}

function calcWallPurlins(params) {
  const { length, width, wallPurlinSpacing, height, columnSpacing } = params;
  const L = length / 1000, W = width / 1000, H = height / 1000;
  const wps = wallPurlinSpacing / 1000;
  const cs = columnSpacing ? columnSpacing / 1000 : 6;
  const purlin = lookupWallPurlin(params);
  // 工艺：下方 1.2m 为 24 砖墙，墙梁从砖墙顶起布；首根 1.2m、末根檐口下 5cm，中间 ≤wps 均分
  const girtTop = Math.max(1.2 + 0.3, H - 0.05);
  const layers = Math.max(1, Math.ceil((girtTop - 1.2) / wps)) + 1;
  // 端部延长：纵墙梁两端延到山墙梁外皮、山墙梁两端延到纵墙梁外皮 → 四边闭合圈
  const ex = perimeterExt(params);
  const perimeter = (L + 2 * ex.extX + W + 2 * ex.extZ) * 2;
  // 门窗洞断开扣除：门洞（低于门顶标高线的墙梁 × 门宽）、窗洞（洞口内部标高线 × 窗宽）
  const snp = openingSnaps(params);
  const wl = layoutWindowsByBay(params);
  const doorCutLen = (params.doorCount || 0) * snp.doorCutLayers * ((params.doorWidth || 4500) / 1000);
  const winCutLen = (wl.count || 0) * snp.winCutLayers * ((params.winWidth || 2000) / 1000);
  const cutLen = doorCutLen + winCutLen;
  return {
    layers, perimeter, purlin, cutLen,
    totalLength: perimeter * layers - cutLen,
    weight: (perimeter * layers - cutLen) * purlin.weight * purlin.factor,
    spec: purlin.spec + ` (${purlin.modelName}·柱距${cs}m·墙梁距${wps}m·w${purlin.wk.toFixed(2)}) · 按柱距${cs}m分段下料 · 四边闭合圈 · 门窗洞断开`,
    purlinInfo: {
      model: purlin.model, modelName: purlin.modelName, span: cs, spacing: wps,
      wk: purlin.wk, rawKg: purlin.rawKg, lenFac: purlin.lenFac,
      Wreq: purlin.demand.Wreq, Ireq: purlin.demand.Ireq, gov: purlin.gov,
      contSave: purlin.contSave, alt: purlin.alt, overflow: purlin.overflow,
      schemes: purlin.allSchemes.map(function (x) {
        return { modelName: x.modelName, spec: x.sec.spec, perM: x.perM, rawKg: x.sec.kg };
      }),
    },
  };
}

// ========== 女儿墙钢构（女儿柱=工字钢焊于柱顶 + 女儿墙檩条=与墙梁同规格C型钢，2026-09-26 压顶工字梁取消） ==========
// 女儿柱工字钢（GB/T 706 普通工字钢，kg/m）。2026-09-28 r39 修正：
// 原表只到 180，而 r39 起墙梁按荷载反算，柱距 ≥9m 就会选到 C200/C250（h=200/250）
// → IBEAM_BY_H[200] 为 undefined → 女儿柱 `工undefined工字钢`、总钢量 NaN。
// 现按「不低于墙梁腹板高」取档（就近偏安全），并覆盖 C_LIB 的全部高度档（100~320）。
const IBEAM_TBL = [
  { h: 100, no: 10, kg: 11.2 },   // 工10
  { h: 120, no: 12, kg: 14.0 },   // 工12.6
  { h: 140, no: 14, kg: 16.9 },   // 工14
  { h: 160, no: 16, kg: 20.5 },   // 工16
  { h: 180, no: 18, kg: 24.1 },   // 工18
  { h: 200, no: 20, kg: 27.9 },   // 工20a
  { h: 220, no: 22, kg: 33.1 },   // 工22a
  { h: 250, no: 25, kg: 38.1 },   // 工25a
  { h: 280, no: 28, kg: 43.5 },   // 工28a
  { h: 320, no: 32, kg: 52.7 },   // 工32a
];
const IBEAM_BY_H = (function () { const m = {}; IBEAM_TBL.forEach(function (x) { m[x.h] = x.kg; }); return m; })();
function ibeamFor(params) {
  const wp = lookupWallPurlin(params);
  const h = wp.h || 120;
  const pick = IBEAM_TBL.find(function (x) { return x.h >= h; }) || IBEAM_TBL[IBEAM_TBL.length - 1];
  return { spec: `工${pick.no}工字钢`, weight: pick.kg, h: pick.h, reqH: h };
}

function calcParapet(params, main, wc, wp) {
  const { hasParapet, parapetHeight, length, width, columnSpacing } = params;
  if (!hasParapet) return { steelIncrement: 0, enclosureIncrement: 0, gutterLength: 0, colExt: 0, topPurlin: 0, acc: 0, ibSpec: '', postCount: 0, postWeight: 0, girtWeight: 0, girtSpec: '' };

  // 女儿柱：纵墙各刚架柱顶（角柱山墙/纵墙共用一根）+ 山墙抗风柱顶
  const L = length / 1000, W = width / 1000, h = parapetHeight / 1000;
  const cs = columnSpacing ? columnSpacing / 1000 : 6;
  const perimeter = (L + W) * 2;
  const gablePosts = (wc && wc.count) ? wc.count : Math.max(0, (Math.ceil(W / cs) + 1 - 2)) * 2;
  const totalParapetCols = main.numCols * 2 + gablePosts;

  const ib = ibeamFor(params);
  const LAP = 0.5;                                          // 女儿柱底端沿柱外侧下延的搭接焊段
  const colExt = totalParapetCols * (h + LAP) * ib.weight * STEEL_COEFF;
  // 女儿墙檩条：与墙梁同规格 C 型钢，四边通长一圈（代替原压顶工字梁）
  const girtKgM = wp && wp.purlin ? wp.purlin.weight * wp.purlin.factor : 5.0;
  const topPurlin = perimeter * girtKgM * STEEL_COEFF;
  const acc = (colExt + topPurlin) * 0.10;

  return {
    steelIncrement: colExt + topPurlin + acc,
    enclosureIncrement: (h + h + 0.2) * perimeter,
    perMeterSteel: (colExt + topPurlin + acc) / perimeter,
    gutterLength: L * 2,   // 两条天沟沿长度方向（代替末根屋面檩条）
    ibSpec: ib.spec, postCount: totalParapetCols,
    colExt, topPurlin, acc,
    postWeight: colExt, girtWeight: topPurlin,
    girtSpec: (wp && wp.purlin) ? wp.purlin.spec : 'C型钢',
  };
}

// ========== 支撑（GB 51022 常规布置：端部柱距各一道，纵向 >60m 时中间加设） ==========

// 支撑跨序号（0-based）：与 preview3d.js 三维布置 / 建筑图立面 / 门洞避让共用同一口径
function braceBayIndices(nBays, L) {
  const idx = [0, nBays - 1];
  if (L > 60) {
    const nSeg = Math.ceil(L / 60);
    for (let k = 1; k < nSeg; k++) {
      const xi = Math.round(k * nBays / nSeg);
      if (xi > 0 && xi < nBays && idx.indexOf(xi) < 0) idx.push(xi);
    }
  }
  return idx;
}

// 门洞排布（单位 m）：避开柱间支撑跨，从两侧第一个无支撑跨起向中间依次排
//   返回 { front: [[x0,x1]…], back: [[x0,x1]…], avoided: bool }
//   无可用跨（如仅 2 跨、或门宽放不进任何跨）时退回旧口径（两端贴边排），avoided=false
function layoutDoorBaysM(L, cs, dW, nDoor, doorOnWall) {
  if (!nDoor || nDoor <= 0) return { front: [], back: [], avoided: true };
  const nFrames = Math.max(2, Math.floor(L / cs) + 1);
  const nBays = nFrames - 1;
  const bayX = L / nBays;
  const braceIdx = braceBayIndices(nBays, L);
  const need = dW + 0.6;                                  // 门两侧各留 0.3m
  const free = [];
  for (let i = 0; i < nBays; i++)
    if (braceIdx.indexOf(i) < 0 && bayX >= need - 0.001) free.push(i);

  const segAt = (bay) => {
    const cx = -L / 2 + (bay + 0.5) * bayX;
    return [cx - dW / 2, cx + dW / 2];
  };
  if (free.length === 0) {
    // 退回旧口径：两端贴边、依次向中间
    const dMargin = 0.3, dGap = 0.4;
    const front = [], back = [];
    if (doorOnWall === 'both') {
      const perWall = Math.ceil(nDoor / 2);
      for (let di = 0; di < nDoor; di++) {
        const onFront = di < perWall;
        const didx = onFront ? di : di - perWall;
        const cx = -L / 2 + dMargin + dW / 2 + didx * (dW + dGap);
        (onFront ? front : back).push([cx - dW / 2, cx + dW / 2]);
      }
    } else {
      for (let dk = 0; dk < nDoor; dk++) {
        const fromLeft = dk % 2 === 0;
        const kk = Math.floor(dk / 2);
        const cx = fromLeft
          ? (-L / 2 + dMargin + dW / 2 + kk * (dW + dGap))
          : (L / 2 - dMargin - dW / 2 - kk * (dW + dGap));
        front.push([cx - dW / 2, cx + dW / 2]);
      }
    }
    return { front, back, avoided: false, braceIdx, bayX };
  }
  const left = free.slice().sort((a, b) => a - b);        // 从左起的可用跨
  const right = free.slice().sort((a, b) => b - a);      // 从右起的可用跨
  const front = [], back = [];
  if (doorOnWall === 'both') {
    const perWall = Math.ceil(nDoor / 2);
    for (let di = 0; di < nDoor; di++) {
      const onFront = di < perWall;
      const didx = onFront ? di : di - perWall;
      const src = onFront ? left : right;
      (onFront ? front : back).push(segAt(src[Math.min(didx, src.length - 1)]));
    }
  } else {
    for (let dk = 0; dk < nDoor; dk++) {
      const fromLeft = dk % 2 === 0;
      const kk = Math.floor(dk / 2);
      const src = fromLeft ? left : right;
      front.push(segAt(src[Math.min(kk, src.length - 1)]));
    }
  }
  return { front, back, avoided: true, braceIdx, bayX };
}

function calcBracing(params, main) {
  const L = params.length / 1000, W = params.width / 1000, H = params.height / 1000;
  const cs = params.columnSpacing ? params.columnSpacing / 1000 : 6;
  const nBays = Math.max(2, (main && main.numCols ? main.numCols : 2) - 1);
  // 支撑柱距序号（0-based）：两端各 1 道；L>60m 时按 ≤60m 间距中间加设
  const bayIdx = braceBayIndices(nBays, L);
  // 柱间支撑：每道柱距 × 两侧纵墙 × 交叉 2 根（柱底 → 对侧柱顶）
  const colLen = Math.sqrt(cs * cs + H * H);
  const colRods = bayIdx.length * 2 * 2;
  // 屋面水平支撑：每道柱距 × 两坡 × 交叉 2 根（檐口 ↔ 屋脊，沿坡面斜线）
  // 坡宽统一 W/2（单脊双坡口径，与檩条/3D/建筑图一致）
  const slopeW = W / 2;
  const rise = Math.min(slopeW * 0.105, 2.8);
  const roofLen = Math.sqrt(cs * cs + slopeW * slopeW + rise * rise);
  const roofRods = bayIdx.length * 2 * 2;
  const ROD_KG = 2.47;                                   // φ20 圆钢 2.466 kg/m
  const length = colRods * colLen + roofRods * roofLen;
  const weight = length * ROD_KG * 1.10;                 // +10% 花篮螺栓/节点板
  return {
    spec: `φ20圆钢交叉 · ${bayIdx.length}道(端部${L > 60 ? '+中间' : ''}) · 柱间${colRods}根+屋面${roofRods}根`,
    weight, length, rodCount: colRods + roofRods, bayCount: bayIdx.length, bayIdx,
    colLen, roofLen, colRods, roofRods,
  };
}

// ========== 次构件 ==========

function calcSecondary(params, main, rp, wp, wc) {
  const L = params.length / 1000;

  // 系杆 φ114×3 圆管, 8.21 kg/m —— 恒 3 道：左右檐口钢柱顶各 1 道 + 屋脊 1 道
  const tieRows = 3;
  const tieRodWt = tieRows * L * 8.21;

  // 拉条体系（2026-09-27 康师傅确认·规范简化做法；原为檩条重量 10% 粗估）
  // 直拉条 φ12 每柱距每坡 1 根拉通坡长（檐口第一檩 ↔ 屋脊檩，屋脊侧 0.2m/檐口侧 0.15m 起步内）
  // 屋脊两侧斜拉条 φ12（每柱距每坡 2 根 × 坡向檩距×1.414）
  // 檐口撑杆 φ14×2（每柱距每坡 1 组 × 坡向檩距）
  // 隅撑 L50×4 每榀 4 根 × 1.5m（梁下翼缘 ↔ 檩条）
  // 墙梁竖向拉条 φ12（纵墙每柱距每面 1 根，砖墙顶 1.2m → 檐口）
  const W2 = params.width / 1000;
  const nBays = Math.max(1, main.numCols - 1);
  const slopeW = W2 / 2, rise = Math.min(slopeW * 0.105, 2.8);
  const slopeLen = Math.sqrt(slopeW * slopeW + rise * rise);
  const cosA = slopeW / slopeLen;
  const rpsSlope = (params.roofPurlinSpacing / 1000) / cosA;      // 坡向檩距
  const Hm = params.height / 1000;
  const R12 = 0.888, R14 = 1.21, LA504 = 3.06;                   // kg/m：φ12 / φ14 / L50×4
  const rodDirectLen = nBays * 2 * (slopeW - 0.2 - 0.15) / cosA;  // 直拉条总长
  const rodDiagLen   = nBays * 2 * 2 * rpsSlope * 1.414;         // 斜拉条总长
  const rodStrutLen  = nBays * 2 * rpsSlope * 2;                  // 撑杆总长（φ14×2）
  const rodKneeLen   = main.numCols * 4 * 1.5;                    // 隅撑总长
  const rodWallLen   = 2 * nBays * Math.max(0.5, Hm - 1.2);       // 墙梁竖向拉条总长
  const braceWt = (rodDirectLen * R12 + rodDiagLen * R12 + rodStrutLen * R14
    + rodKneeLen * LA504 + rodWallLen * R12) * 1.05;              // +5% 连接件

  // 檩托板：屋面每根檩条×每榀刚架 + 每道墙梁×每根柱/抗风柱，约 0.5kg/块
  const gablePosts = (wc && wc.count) ? wc.count : 0;
  const roofCleatCount = rp.perSlope * 2 * main.numCols;
  const wallCleatCount = wp.layers * (main.numCols * 2 + gablePosts);
  const roofCleatWt = roofCleatCount * 0.5;               // → 并入钢梁
  const wallCleatWt = wallCleatCount * 0.5;               // → 并入钢柱
  const cleatWt = roofCleatWt + wallCleatWt;

  // 水平支撑 + 柱间支撑（φ20 圆钢交叉）
  const bracing = calcBracing(params, main);

  return {
    tieRod: { spec: 'φ114×3圆管(系杆·檐口2道+屋脊1道)', weight: tieRodWt, length: tieRows * L, rows: tieRows },
    brace:  { spec: `φ12拉条(直${nBays}×2道+斜+墙梁) + φ14×2撑杆 + L50×4隅撑×${main.numCols}榀`,
              weight: braceWt, length: rodDirectLen + rodDiagLen + rodStrutLen + rodKneeLen + rodWallLen },
    cleat:  { spec: `檩托板(${roofCleatCount + wallCleatCount}块·屋面${roofCleatCount}+墙面${wallCleatCount})`, weight: cleatWt, count: roofCleatCount + wallCleatCount,
              roofWeight: roofCleatWt, wallWeight: wallCleatWt, roofCount: roofCleatCount, wallCount: wallCleatCount },
    bracing,
    total: tieRodWt + braceWt + cleatWt + bracing.weight,
  };
}

// ========== 螺栓 ==========

function calcBolts(params, main, rp, wp, sec, mz1, mz2) {
  const W = params.width / 1000;
  const H = params.height / 1000;
  const cs = params.columnSpacing ? params.columnSpacing / 1000 : 6;

  // 钢柱总数 (外围)
  const gableCols = Math.ceil(W / cs) + 1;
  const totalCols = main.numCols * 2 + Math.max(0, (gableCols - 2)) * 2;

  // 地脚螺栓: 每柱4根, 规格随柱高分档 —— 8m 以下 M24，8~12m M27，12m 以上加大型号 M30
  let anchorSpec, anchorPerKg;
  if (H < 8)       { anchorSpec = 'M24×800';  anchorPerKg = 3.5; }
  else if (H < 12) { anchorSpec = 'M27×900';  anchorPerKg = 4.5; }
  else             { anchorSpec = 'M30×1000'; anchorPerKg = 5.5; }
  const anchorCount = totalCols * 4;
  const anchorBoltWt = anchorCount * anchorPerKg;

  // 高强螺栓: 每榀刚架节点连接 (10.9S M20), 每节点8颗
  const hsConns = params.hasMiddleColumn ? 4 : 3;
  const hsPerConn = 8;
  let hsCount = main.numCols * hsConns * hsPerConn;

  // 夹层高强螺栓: 主梁-柱连接, 每梁端 4 颗 M20
  let mezzConnDesc = '';
  let mezzHsCount = 0;
  if (mz1 && mz1.hasMezzanine) {
    const mzBeams = mz1.totalCols * 2; // 每柱双方向各一根梁, 每梁2端
    mezzHsCount += mzBeams * 4;
    mezzConnDesc = ' + 夹层' + mz1.totalCols + '柱×' + mzBeams + '端×4';
  }
  if (mz2 && mz2.hasMezzanine) {
    const mzBeams = mz2.totalCols * 2;
    mezzHsCount += mzBeams * 4;
    mezzConnDesc = ' + 夹层二层' + mz2.totalCols + '柱×' + mzBeams + '端×4';
  }
  hsCount += mezzHsCount;
  const hsBoltWt = hsCount * 0.25;  // M20×70 含螺母垫圈 ~0.25kg/套

  // 檩托板螺栓（2026-09-27 康师傅口径）：每块檩托板 4 颗 M12 镀锌（含螺母垫片），屋面+墙梁檩托板同口径
  // 注意连接点数=檩托板数（墙面含抗风柱），与 sec.cleat.count 一致，不再用 totalCols 粗估
  const cleatTotal = (sec && sec.cleat) ? (sec.cleat.roofCount + sec.cleat.wallCount) : 0;
  const cleatBoltCount = cleatTotal * 4;
  const cleatBoltWt = cleatBoltCount * 0.12;   // M12 镀锌 ~0.12kg/套

  // 普通螺栓: 其余连接点（系杆/拉条/撑杆/支撑）× 每点4颗 M12
  const tieRodConns = sec.tieRod.rows * main.numCols;
  const braceConns = sec.tieRod.rows * main.numCols;
  const xBraceConns = (sec.bracing && sec.bracing.rodCount) ? sec.bracing.rodCount : 0;
  const totalOrdinaryConns = tieRodConns + braceConns + xBraceConns;
  const ordinaryCount = totalOrdinaryConns * 4;
  const ordinaryBoltWt = ordinaryCount * 0.12;  // M12镀锌螺栓 ~0.12kg/套

  return {
    anchorBolt:  { spec: `${anchorSpec}(${totalCols}柱×4) · 共${anchorCount}根`, weight: anchorBoltWt, count: anchorCount },
    hsBolt:      { spec: `M20×70 10.9S(${main.numCols}榀×${hsConns}节点×${hsPerConn}${mezzConnDesc}) · 共${hsCount}套`, weight: hsBoltWt, count: hsCount },
    cleatBolt:   { spec: `M12 镀锌(檩托板${cleatTotal}块×4) · 共${cleatBoltCount}套`, weight: cleatBoltWt, count: cleatBoltCount },
    ordinaryBolt:{ spec: `M12 镀锌(系杆/拉条/支撑${totalOrdinaryConns}连接点×4) · 共${ordinaryCount}套`, weight: ordinaryBoltWt, count: ordinaryCount },
    total: anchorBoltWt + hsBoltWt + cleatBoltWt + ordinaryBoltWt,
  };
}

// ========== 维护系统 ==========

function calcMaintenance(params, parapet, windows, main) {
  const L = params.length / 1000, W = params.width / 1000, H = params.height / 1000;
  // 2026-09-27 康师傅确认：不带女儿墙屋面出挑 0.3m（水平），带女儿墙不出挑（内天沟）
  const OVH = params.hasParapet ? 0 : 0.3;
  // 采光带（2026-09-27 康师傅确认）：每道宽 1.0m 沿坡向通铺（檐口→屋脊），屋脊对称每坡各 1 条
  // —— "1道" 即两侧各 1 条（共 2 条）；FRP 采光板，屋面板面积相应扣减
  const daylightCount = Math.max(0, Math.min(2, params.daylightCount != null ? params.daylightCount : 1));
  const rise0 = Math.min((W / 2) * 0.105, 2.8);
  const slopeLen0 = Math.sqrt((W / 2) * (W / 2) + rise0 * rise0);
  const daylightArea = daylightCount * 2 * slopeLen0 * 1.0;   // 每坡 1.0m 宽 × 坡长
  const roofArea = L * (W + 2 * OVH) * 1.02 - daylightArea;

  // 山墙封闭处理（2026-09-27 康师傅确认）：檐口以上到屋脊的三角区
  const rise = Math.min((W / 2) * 0.105, 2.8);              // 与坡度口径一致
  const gableTri = W * rise / 2;                            // 每面山墙三角面积
  const wallH = params.hasParapet ? H + params.parapetHeight / 1000 : H;
  const paraInArea = params.hasParapet ? (L + W) * 2 * (params.parapetHeight / 1000) : 0;  // 女儿墙内墙板
  // 山墙檐口以上部分：
  //   无女儿墙：补三角封板（+2×三角）
  //   带女儿墙：原按整块 H+女儿墙高 矩形计，屋脊以下位于屋面内侧（-2×三角，去除多算）
  const gableClosure = params.hasParapet ? -2 * gableTri : 2 * gableTri;
  const wallArea = (L + W) * 2 * wallH + paraInArea + gableClosure - windows.totalArea;

  // 屋脊瓦: 沿长度方向
  const ridgeCap = L;

  // 门窗包边: 每扇窗周长（按对齐墙梁标高线后的实际窗高）+ 门洞周长（宽+2×高，无底槛；门高固定 5.5m）
  const winPerimeter = (params.winWidth / 1000 + (windows.winH || params.winHeight / 1000 || 0)) * 2;
  const doorTrim = (params.doorCount || 0) * ((params.doorWidth || 4500) / 1000 + 5.5 * 2);
  const winTrim = windows.count * winPerimeter + doorTrim;

  // 角柱包边: 4个角柱×(高度-1.2m), 不低于0
  const cornerTrim = 4 * Math.max(0, H - 1.2);

  // 女儿墙泛水件: 周长
  const flashing = params.hasParapet ? (L + W) * 2 : 0;

  // 封檐板（2026-09-27 康师傅确认）：无女儿墙出挑檐口竖向收边，两侧通长
  const fasciaLen = params.hasParapet ? 0 : L * 2;

  // 总包边+脊瓦
  const totalTrim = ridgeCap + winTrim + cornerTrim + flashing + fasciaLen;

  return {
    roof:    { spec: '0.5mm 840型拉网岩棉' + (OVH > 0 ? `(出挑${OVH.toFixed(1)}m×2侧)` : ''), area: roofArea },
    wall:    { spec: params.hasParapet ? '0.4mm 900型单瓦(竖装·含女儿墙·深灰)' : '0.4mm 900型单瓦(竖装·含山墙封板)', area: wallArea },
    ridgeCap:{ spec: `屋脊瓦`, length: ridgeCap },
    winTrim: { spec: `门窗包边(窗${windows.count}扇+门${params.doorCount || 0}樘)`, length: winTrim },
    doorTrimLen: doorTrim,   // 门洞包边周长（供明细行单列显示）
    cornerTrim:{ spec: `角柱包边(${H.toFixed(1)}-1.2m×4角)`, length: cornerTrim },
    flashing: params.hasParapet ? { spec: `女儿墙泛水件(${((L+W)*2).toFixed(0)}m)`, length: flashing } : null,
    gableClosure: gableClosure,
    fascia: params.hasParapet ? null : { spec: `彩钢封檐板(檐口收边·出挑${OVH.toFixed(1)}m)`, length: fasciaLen },
    totalTrim,
    gutter: { spec: params.hasParapet ? '彩钢天沟(2列·女儿墙内侧内天沟)' : '彩钢天沟(2列·檐口外天沟)', length: L * 2 },
    daylight: daylightCount > 0 ? {
      spec: `FRP采光板(1.0m宽×${daylightCount}道·屋脊对称每坡各${daylightCount}条)`,
      area: daylightArea, count: daylightCount * 2, countUnit: '条',
    } : null,
    // 落水管（2026-09-27 康师傅确认：φ160 PVC · 30元/m）：两侧檐口各按间距 ≤25m 均匀布置，每根长 = 檐口高度
    downpipe: { spec: `φ160PVC落水管(${Math.max(1, Math.ceil(L / 25)) * 2}根·两侧间距≤25m)`,
                length: Math.max(1, Math.ceil(L / 25)) * 2 * H,
                count: Math.max(1, Math.ceil(L / 25)) * 2, countUnit: '根' },
  };
}

// ========== 门窗 ==========
// 按柱距布窗（与 preview3d.js 三维布置一致）：
//   纵墙 = 每两榀刚架之间一扇（正中），门的柱距整格让给门；
//   山墙 = 按角柱+抗风柱分格，每格一扇（正中）；
//   柱距 < 窗宽+0.4m 的格放不下窗，跳过。
function layoutWindowsByBay(params) {
  const L = params.length / 1000, W = params.width / 1000;
  const cs = params.columnSpacing ? params.columnSpacing / 1000 : 6;
  const ww = params.winWidth ? params.winWidth / 1000 : 2;
  const minBay = ww + 0.4;

  // 纵墙柱距分格：nFrames 榀刚架 → nFrames-1 格
  const nFrames = Math.max(2, Math.floor(L / cs) + 1);
  const bayX = L / (nFrames - 1);
  // 山墙抗风柱分格
  const nWindTotal = Math.max(2, Math.ceil(W / 7.5) + 1);
  const bayZ = W / (nWindTotal - 1);

  // 门洞区段：避开柱间支撑跨，从两侧第一个无支撑跨起向中间排（与 preview3d.js 共用 layoutDoorBaysM）
  const nDoor = params.doorCount || 0;
  const dW = params.doorWidth ? params.doorWidth / 1000 : 4.5;
  const dLayout = layoutDoorBaysM(L, cs, dW, nDoor, params.doorOnWall);
  const frontSegs = dLayout.front;
  const backSegs = dLayout.back;
  // 被门占用的柱距数（每面墙分别算）
  function doorBayCount(segs) {
    let n = 0;
    for (let i = 0; i < nFrames - 1; i++) {
      const bx0 = -L / 2 + i * bayX, bx1 = bx0 + bayX;
      for (const sg of segs) {
        if (sg[0] < bx1 - 0.01 && sg[1] > bx0 + 0.01) { n++; break; }
      }
    }
    return n;
  }

  const nBayX = bayX >= minBay ? (nFrames - 1) : 0;
  const nBayZ = bayZ >= minBay ? (nWindTotal - 1) : 0;
  const front = Math.max(0, nBayX - doorBayCount(frontSegs));
  const back  = Math.max(0, nBayX - doorBayCount(backSegs));
  const gable = nBayZ * 2;

  const location = params.location || 'all';
  const count = location === 'gable' ? gable : (front + back + gable);
  return { count, front, back, gable, baysX: nBayX, baysZ: nBayZ };
}

function calcWindows(params) {
  const { windowScheme, winWidth, count, columnSpacing, doorCount } = params;
  const nWin = count || 0, nDoor = doorCount || 0;
  if (nWin <= 0 && nDoor <= 0) return { totalArea: 0, extraPurlin: 0, frameWeight: 0, doorFrameWeight: 0, count: 0 };

  const cs = columnSpacing ? columnSpacing / 1000 : 6;
  const wp = lookupWallPurlin(params);   // 门窗框 C 型钢与墙梁同规格
  const snp = openingSnaps(params);
  const ww = (winWidth || 2000) / 1000;

  // 窗高按对齐墙梁标高线后的实际尺寸（面积、框均按此）；上下边借用墙梁（已计入墙面檩条）
  const area = ww * snp.winH * nWin;
  let extraPurlin = 0, frameWeight = 0;
  if (nWin > 0) {
    // 窗框：左右竖梃 2 根/扇（与墙梁同规格）；上下边借用所在标高的墙梁，不再单算
    frameWeight = 2 * snp.winH * nWin * wp.weight * wp.factor;
  }
  // 门框：两竖杆（顶框借用 doorTop 标高处墙梁；落地无底框，门槛另计入维护）
  let doorFrameWeight = 0;
  if (nDoor > 0) {
    doorFrameWeight = nDoor * 2 * snp.doorTop * wp.weight * wp.factor;
  }
  return {
    totalArea: area, extraPurlin, frameWeight, doorFrameWeight, count: nWin,
    winH: snp.winH, doorH: snp.doorTop,
    spec: `窗${nWin}扇 ${ww.toFixed(1)}×${snp.winH.toFixed(2)}m(高对齐墙梁·上下借墙梁) + 门${nDoor}樘 高${snp.doorTop.toFixed(2)}m(两竖·顶借墙梁)`,
  };
}

// ========== 围护面积 ==========
function calcEnclosure(params, parapet, windows) {
  const { length, width, height } = params;
  const L = length / 1000, W = width / 1000, H = height / 1000;
  // 2026-09-27 康师傅确认口径：无女儿墙屋面出挑0.3m + 山墙三角封板；带女儿墙不出挑（女儿墙围护按延米另计）
  const ovh = params.hasParapet ? 0 : 0.3;
  const rise = Math.min((W / 2) * 0.105, 2.8);
  const gableClosure = params.hasParapet ? 0 : W * rise;      // 两面山墙三角封板（报价面积）
  // 采光带扣减（2026-09-27 康师傅口径）：屋脊对称每坡各 count 条 × 1.0m 宽 × 坡长（与 calcMaintenance 同式）
  const daylightCount = Math.max(0, Math.min(2, params.daylightCount != null ? params.daylightCount : 1));
  const slopeLen = Math.sqrt((W / 2) * (W / 2) + rise * rise);
  const daylightArea = daylightCount * 2 * slopeLen * 1.0;
  const roof = L * (W + 2 * ovh) * 1.02 - daylightArea;
  const wall = (L + W) * 2 * H + gableClosure;
  return {
    roof: roof,
    wall: wall,
    daylightArea: daylightArea,                               // 供报价单列采光带行
    total: roof + wall + parapet.enclosureIncrement - windows.totalArea,
  };
}

// ========== 夹层 ==========
// HW宽翼缘 (GB/T 11263) / HN窄翼缘 (GB/T 11263)
function lookupMezzColumn(loadArea) {
  if (loadArea <= 20) return weldedSection(200, 200, 8, 12);
  if (loadArea <= 25) return weldedSection(250, 250, 9, 14);
  if (loadArea <= 35) return weldedSection(300, 300, 10, 15);
  return weldedSection(350, 350, 12, 19);
}

// 夹层主梁 (焊接H型钢，按跨度和荷载选截面)
function lookupMezzBeam(span, use) {
  const factor = use === 'storage' ? 1.4 : 1.0;
  if (span * factor <= 4) return weldedSection(300, 150, 6.5, 9);
  if (span * factor <= 6) return weldedSection(350, 175, 7, 11);
  if (span * factor <= 8) return weldedSection(400, 200, 8, 13);
  return weldedSection(450, 200, 9, 14);
}

// 焊接H次梁 (按跨度选截面，间距2.5m)
function lookupMezzSubBeam(span) {
  if (span <= 3) return weldedSection(200, 100, 5.5, 8);
  if (span <= 4) return weldedSection(250, 125, 6, 9);
  return weldedSection(300, 150, 6.5, 9);
}

function calcMezzanine(params, level) {
  const ratioKey = level === 2 ? 'mezz2Ratio' : 'mezzRatio';
  const useKey = level === 2 ? 'mezz2Use' : 'mezzUse';
  const hasKey = level === 2 ? 'hasMezzanine2' : 'hasMezzanine';
  const mezzRatio = params[ratioKey] || 0;
  const mezzUse = params[useKey] || 'storage';
  const hasMezzanine = params[hasKey] || false;
  const mezzCs = (params.mezzColSpacing || params.columnSpacing || 4000) / 1000;
  const { columnSpacing } = params;

  if (!hasMezzanine) return {
    hasMezzanine: false, ratio: 0, use: '',
    area: 0, column: null, beam: null, totalCols: 0,
    colWeight: 0, beamWeight: 0, subBeamWeight: 0,
    deckArea: 0, deckSteel: 0, railing: 0, railingSteel: 0,
    stairsSteel: 0, total: 0,
  };

  const L = params.length / 1000;
  const W = params.width / 1000;
  const cs = mezzCs;
  const ratio = mezzRatio / 100;
  const mezzArea = L * W * ratio;
  const mH = level === 2 ? 7.2 : 3.6;  // 二层柱从地面到二层，柱高加倍

  // 柱网: 长度方向柱数 × 宽度方向柱数
  const colsX = Math.ceil(L / cs) + 1;
  const colsY = Math.ceil((W * Math.sqrt(ratio)) / cs) + 1;
  const totalCols = Math.max(4, colsX * colsY);

  const loadPerCol = mezzArea / totalCols;
  const col = lookupMezzColumn(loadPerCol);
  const colWeight = totalCols * mH * col.weight * STEEL_COEFF;

  // 主梁：沿长度方向，柱距为跨度
  const beamSpan = cs;
  const beam = lookupMezzBeam(beamSpan, mezzUse);
  const mainBeamCount = colsX * colsY;
  const beamWeight = mainBeamCount * beamSpan * beam.weight * STEEL_COEFF;

  // 次梁：垂直于主梁，间距2.5m
  const subBeamSpan = cs * Math.sqrt(ratio);
  const subBeam = lookupMezzSubBeam(subBeamSpan);
  const subRows = Math.ceil((L * Math.sqrt(ratio)) / 2.5) + 1;
  const subBeamCount = colsY * subRows;
  const subBeamWeight = subBeamCount * subBeamSpan * subBeam.weight * STEEL_COEFF;

  // 楼承板：压型钢板1.0厚760型，理算~11 kg/m²
  const deckArea = mezzArea;
  const deckSteel = deckArea * 11;

  // 栏杆：夹层外围 + 楼孔洞
  const railing = (L + W * Math.sqrt(ratio)) * 2 * 1.1;
  const railingSteel = railing * 8;  // 钢管栏杆 ~8kg/m

  // 楼梯：一部钢梯
  const stairsSteel = 300;

  const totalSteel = colWeight + beamWeight + subBeamWeight + deckSteel + railingSteel + stairsSteel;

  return {
    level,
    hasMezzanine: true,
    ratio: mezzRatio,
    use: mezzUse,
    area: mezzArea,
    height: mH,
    column: col,
    beam: beam,
    totalCols,
    colWeight,
    beamWeight,
    subBeamWeight,
    deckArea,
    deckSteel,
    railing,
    railingSteel,
    stairsSteel,
    total: totalSteel,
  };
}

// ========== 焊接 H 型钢库（抗风柱选型用，Q355 与主结构同材质） ==========
const WCOL_F = 305;        // N/mm²
const WH_LIB = (function () {
  const lib = [];
  const Hs = [200, 250, 300, 350, 400, 450];
  const Bs = [125, 150, 175, 200, 250];
  const tws = [6, 8, 10];
  const tfs = [8, 10, 12, 14];
  Hs.forEach(function (H) {
    Bs.forEach(function (B) {
      tfs.forEach(function (tf) {
        tws.forEach(function (tw) {
          const hw = H - 2 * tf;
          if (hw < 160) return;                 // 腹板净高下限
          if (B / (2 * tf) > 12) return;        // 翼缘宽厚比
          if (hw / tw > 80) return;             // 腹板高厚比（抗风柱放宽）
          if (tw > tf) return;                  // 腹板不宜厚于翼缘
          const A = 2 * B * tf + hw * tw;
          const Ix = tw * Math.pow(hw, 3) / 12
            + 2 * (B * Math.pow(tf, 3) / 12 + B * tf * Math.pow((H - tf) / 2, 2));
          const Iy = 2 * (tf * Math.pow(B, 3) / 12) + hw * Math.pow(tw, 3) / 12;
          lib.push({
            H: H, B: B, tw: tw, tf: tf, A: A, Ix: Ix, Iy: Iy,
            Wx: Ix / (H / 2), ix: Math.sqrt(Ix / A), iy: Math.sqrt(Iy / A),
            kg: A * 7.85 / 1000,
            spec: 'H' + H + '×' + B + '×' + tw + '×' + tf,
          });
        });
      });
    });
  });
  lib.sort(function (p, q) { return p.kg - q.kg; });
  return lib;
})();

// ========== 抗风柱（沿山墙方向，柱距 ≤ 7.5m 均分） ==========
// 2026-09-27 r39 康师傅确认：截面按风荷载反算，废掉原「≥12m 直接套主刚架柱」那档
//   受风宽度 = 山墙分格宽 step；风压 wk 按墙面迎风体型系数 +0.8 取值
//   模型：柱顶与屋面梁用弹簧板铰接、柱底固接 → M = q·ht²/8（按 8 分配，偏安全）
//   轴力：所辖山墙墙板自重（≈6 kg/m²，量极小，计入更准）
//   验算：λ = 0.7·ht/ix ≤ 150；压弯 N/(φA·f) + M/(Wx·f) ≤ 1，f = 305（同主结构材质）
//   构造下限：库内已限制 H≥200 / B≥125 / tf≥8 / tw≥6（门规最小板厚）
//   间距上限仍取 7.5m —— 与 3D / 建筑图 / 山墙窗分格共用同一口径，避免几何失配；
//            风压较小的项目在报告中给「可放宽至 9m」提示，改几何需同步 4 处定义，另行评估
// 顶部接到屋面梁下翼缘底（坡度跟随）
function beamEndHeights(beam) {
  if (beam && beam.Hk) return [beam.Hk, beam.Hr || beam.Hk];
  const s = (beam && beam.spec) ? String(beam.spec) : '';
  const m = s.match(/H\((\d+)~(\d+)\)/);
  if (m) return [parseInt(m[1]), parseInt(m[2])];
  const m2 = s.match(/H(\d+)/);
  return [m2 ? parseInt(m2[1]) : 500, m2 ? parseInt(m2[1]) : 500];
}
function pickWindColumnSection(htM, stepM, wk) {
  const ht = Math.max(500, htM * 1000);        // mm
  // 构造下限：高柱需保证运输/安装刚度（厂里经验做法，非规范强制）
  const hMin = htM > 12 ? 300 : (htM > 9 ? 250 : 200);
  const q = wk * stepM;                        // kN/m ≡ N/mm
  const M = q * ht * ht / 8;                   // N·mm（上铰下固，按 8 分配）
  const N = stepM * htM * 6 * 9.8e-3 * 1000;   // N（山墙墙板自重）
  for (let i = 0; i < WH_LIB.length; i++) {
    const s = WH_LIB[i];
    if (s.H < hMin) continue;
    const lambda = 0.7 * ht / s.ix;
    if (lambda > 150) continue;
    const phi = Math.min(1, 2500 / (lambda * lambda));
    if (N / (phi * s.A * WCOL_F) + M / (s.Wx * WCOL_F) <= 1) return s;
  }
  return WH_LIB[WH_LIB.length - 1];
}
function calcWindColumn(params, main) {
  const { width, height, hasMiddleColumn, isTapered } = params;
  const W = width / 1000, H = height / 1000;
  if (W <= 0) return { count: 0, weight: 0, totalLength: 0, spec: '-', specList: [] };

  const rise = roofRiseM(params.width);
  const nWindTotal = Math.max(2, Math.ceil(W / 7.5) + 1);     // 含两端角柱位的总位置数
  const nWindEachSide = Math.max(0, nWindTotal - 2);
  const count = nWindEachSide * 2;                            // 两面山墙合计
  if (count === 0) return { count: 0, weight: 0, totalLength: 0, spec: '-', specList: [] };

  const singleSpan = hasMiddleColumn ? W / 2 : W;
  // 2026-09-27 统一口径：抗风柱顶标高跟随主结构的最优选型梁（原为旧查表，与主结构不一致）
  const beam = (main && main.beam && main.beam.Hk) ? main.beam : lookupBeam(singleSpan, isTapered);
  const [bdB_mm, bdT_mm] = beamEndHeights(beam);
  const step = W / (nWindTotal - 1);
  const wk = windPressure(params, H, 'wall');

  const specMap = new Map();
  let maxHt = 0, sumHt = 0, nPos = 0;
  for (let k = 1; k < nWindTotal - 1; k++) {
    const wz = -W / 2 + k * step;
    const t = 1 - Math.abs(wz) / (W / 2);                     // 1 在檐口，0 在屋脊
    const rbY = H + rise * t;                                 // 该 z 处梁上翼缘顶面标高
    const bh = (bdB_mm + (bdT_mm - bdB_mm) * t) / 1000;        // 该 z 处屋面梁腹板高（m）
    const topY = rbY - bh * Math.cos(Math.atan2(rise, W / 2)) - 0.05;   // 抗风柱顶 = 梁下翼缘底
    const colHt = Math.max(0.5, topY);
    maxHt = Math.max(maxHt, colHt); sumHt += colHt; nPos++;
    const spec = pickWindColumnSection(colHt, step, wk);
    if (!specMap.has(spec.spec)) specMap.set(spec.spec, { spec, count: 0, totalLength: 0 });
    const item = specMap.get(spec.spec);
    item.count += 2;                                            // 两面山墙各一根
    item.totalLength += 2 * colHt;
  }

  let totalWt = 0;
  const specList = [];
  for (const [, item] of specMap) {
    item.weight = item.totalLength * item.spec.kg * STEEL_COEFF;
    totalWt += item.weight;
    specList.push(item);
  }

  const w0 = windW0(params);
  let suggest = null;
  if (w0 <= 0.35 && step < 9) {
    suggest = { step: 9, reason: '基本风压较低（w₀ ' + w0.toFixed(2) + ' kN/m²），间距可试放宽至 9m（需复核山墙墙梁跨度）' };
  } else if (w0 >= 0.75 && step > 6) {
    suggest = { step: 6, reason: '台风/飓风区（w₀ ' + w0.toFixed(2) + ' kN/m²），建议加密至 6m' };
  }
  const totalLength = specList.reduce((a, b) => a + b.totalLength, 0);
  return {
    count,
    weight: totalWt,
    totalLength,
    spec: specList.map(s => `${s.spec.spec}(${s.count}根)`).join(' + '),
    specList,
    step, wk, w0,
    maxHt: maxHt,
    avgHt: nPos ? sumHt / nPos : 0,
    avgKg: totalLength > 0 ? totalWt / totalLength / STEEL_COEFF : 0,   // 平均单重 kg/m
    section: specList.length ? specList[0].spec.spec : '-',
    suggest,
  };
}

// ========== 行车（吊车梁 + 牛腿 + 柱验算）2026-09-28 r40 康师傅确认 ==========
// 口径：① 只做 5t / 10t 两档起重量；② 吊车梁跨度自动跟随柱距（6 / 7.5 / 9m）；
//       ③ 配套件只计「牛腿 + 连接件」（轨道 / 车挡 / 制动结构 / 走道板不计）；
//       ④ 吊车荷载经牛腿传柱，验算并按需自动加大主刚架柱截面。
// 依据：03SG520-1/2、20G520-1~2（6/7.5/9m 柱距吊车梁图集）、GB 50009-2012、GB 50017-2017、GB 55001-2021
//   · 吊车梁用焊接 H 型钢（6~18m / 5~50t A1~A8 最常用形式），强度 f = 305（Q355，t≤16）
//   · 挠度限值：A3~A5 → L/500；A6~A8 → L/800（GB 50017 吊车梁竖向挠度容许值）
//   · 动力系数 λ = 1.05（A3~A5 软钩）/ 1.10（A6~A8）；可变荷载分项系数 γ = 1.5（GB 55001）
//   · 横向水平力 T = α(Q+g)/n 单轮，α = 0.12（A3~A5）/ 0.15（A6~A8）
//   · 支承吊车梁的柱截面宽度 ≥ 300mm（柱宽不足自动升档，图集构造要求）
// ⚠️ 吊车整机自重与最大轮压按通用桥式吊车经验式估算，正式设计须以吊车厂资料 / 图集核准。
const CRANE_SPEC = {
  5:  { Q: 5,  trolley: 1.8, wheelBase: 2.5 },   // 5t：小车重 1.8t，轮距 2.5m
  10: { Q: 10, trolley: 3.0, wheelBase: 3.0 },   // 10t：小车重 3.0t，轮距 3.0m
};
/** 吊车整机自重估算（t）：G ≈ 0.75·Q + 0.35·Lk + 2.5（Lk = 吊车跨度 m） */
function craneSelfWeight(Qt, LkM) { return 0.75 * Qt + 0.35 * LkM + 2.5; }
/** 单轮最大轮压标准值（kN）：P = (Q + G)/4 × 1.2（1.2 为轮压偏心放大） */
function craneWheelKN(Qt, LkM) {
  return (Qt + craneSelfWeight(Qt, LkM)) / 4 * 1.2 * 9.81;
}
/** 单轮横向水平力标准值（kN）：T = α(Q + g)/4 */
function craneTrolleyKN(Qt, trolley, grade) {
  var a = (grade === 'A6A8') ? 0.15 : 0.12;
  return a * (Qt + trolley) / 4 * 9.81;
}
/** 轨顶标高（m）：留空则自动 = 檐高 − 净空（5t→1.6m / 10t→1.9m） */
function craneRailHeightM(params) {
  if (params && params.craneRailHeight > 0) return params.craneRailHeight / 1000;
  var Hm = ((params && params.height) || 8000) / 1000;
  var Qt = ((params && params.craneTonnage) === 10) ? 10 : 5;
  return Math.max(2.5, Hm - (Qt === 10 ? 1.9 : 1.6));
}

// 吊车梁专用焊接 H 型钢库（Q355）：腹板 ≥8mm / 翼缘 ≥12mm（吊车梁常用板厚下限）、
// 腹板净高 ≥250、翼缘宽厚比 ≤12、腹板高厚比 ≤85（吊车梁可放宽，需设横向加劲肋）
const CRANE_F = 305;        // N/mm²
const CRANE_SEC_LIB = (function () {
  var lib = [];
  var Hs = [300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 900, 1000, 1100];
  var Bs = [200, 220, 250, 280, 300, 350];
  var tws = [8, 10, 12, 14, 16];
  var tfs = [12, 14, 16, 18, 20, 24];
  Hs.forEach(function (H) {
    Bs.forEach(function (B) {
      tfs.forEach(function (tf) {
        tws.forEach(function (tw) {
          var hw = H - 2 * tf;
          if (hw < 250) return;
          if (B / (2 * tf) > 12) return;
          if (hw / tw > 85) return;
          if (tw > tf) return;
          var A = 2 * B * tf + hw * tw;
          var Ix = tw * Math.pow(hw, 3) / 12
            + 2 * (B * Math.pow(tf, 3) / 12 + B * tf * Math.pow((H - tf) / 2, 2));
          lib.push({
            H: H, B: B, tw: tw, tf: tf, A: A, Ix: Ix, Wx: Ix / (H / 2),
            kg: A * 7.85 / 1000,
            spec: 'H' + H + '×' + B + '×' + tw + '×' + tf,
          });
        });
      });
    });
  });
  lib.sort(function (p, q) { return p.kg - q.kg; });
  return lib;
})();

/**
 * 吊车梁最优选型（强度 + 挠度双控，方法论与檩条一致）
 * @param {object} params 引擎参数（columnSpacing / width / craneTonnage / craneGrade）
 */
function optimalCraneBeam(params) {
  var csM = Math.min(9, Math.max(4.5, ((params && params.columnSpacing) || 6000) / 1000));
  var Qt = ((params && params.craneTonnage) === 10) ? 10 : 5;
  var grade = ((params && params.craneGrade) === 'A6A8') ? 'A6A8' : 'A3A5';
  var sp = CRANE_SPEC[Qt];
  var LkM = Math.max(4, (((params && params.width) || 15000) / 1000) - 1.5);   // 吊车跨度 ≈ 厂房跨度 − 1.5m
  var Pk = craneWheelKN(Qt, LkM);                                              // 单轮标准值 kN
  var PkN = Pk * 1000;                                                         // 单轮标准值 N（内力算用）
  var Tk = craneTrolleyKN(Qt, sp.trolley, grade);                              // 单轮水平力标准值 kN
  var lam = (grade === 'A6A8') ? 1.10 : 1.05;                                  // 动力系数
  var deflN = (grade === 'A6A8') ? 800 : 500;                                  // 挠度限值分母
  var Smm = csM * 1000;
  var aMm = Math.min(sp.wheelBase, csM * 0.9) * 1000;                          // 轮距（> 梁跨时按 0.9 跨）

  // 弯矩：两轮关于跨中对称（最不利布置）；轮距 ≥ 梁跨时退化为单轮居中
  var Mk = (aMm >= Smm) ? PkN * Smm / 4 : PkN * (Smm - aMm) / 2;               // N·mm
  var Md = 1.5 * lam * Mk;                                                     // 基本组合设计值 N·mm
  var Wreq = Md / CRANE_F * 1.05;                                              // mm³（5% 附加余量）
  // 挠度：两轮对称布置跨中挠度 v = 2P·x(3L²−4x²)/(48EI)，x = (L−a)/2
  var x = (Smm - aMm) / 2;
  var vNum = 2 * PkN * x * (3 * Smm * Smm - 4 * x * x);
  var Ireq = vNum / (48 * 206000 * (Smm / deflN));                             // mm⁴

  // 翼缘宽下限：吊车梁上翼缘要放轨道压板并保证侧向刚度（5t→200 / 10t→250，图集常用档）
  var Bmin = (Qt === 10) ? 250 : 200;
  var sel = null;
  for (var i = 0; i < CRANE_SEC_LIB.length; i++) {
    var s = CRANE_SEC_LIB[i];
    if (s.B < Bmin) continue;
    if (s.Wx >= Wreq && s.Ix >= Ireq) { sel = s; break; }
  }
  var overflow = false;
  if (!sel) {
    for (var k = CRANE_SEC_LIB.length - 1; k >= 0; k--) {
      if (CRANE_SEC_LIB[k].B >= Bmin) { sel = CRANE_SEC_LIB[k]; break; }
    }
    if (!sel) sel = CRANE_SEC_LIB[CRANE_SEC_LIB.length - 1];
    overflow = (sel.Wx < Wreq || sel.Ix < Ireq);
  }
  var gov = (sel.Wx / Math.max(1e-9, Wreq)) <= (sel.Ix / Math.max(1e-9, Ireq)) ? 'strength' : 'defl';
  return {
    spec: sel.spec, sec: sel, kg: sel.kg, h: sel.H,
    span: csM, Lk: LkM, tonnage: Qt, grade: grade,
    wheelP: Pk, trolleyT: Tk, lam: lam, deflN: deflN,
    Mk: Mk, Md: Md, Wreq: Wreq, Ireq: Ireq, gov: gov, overflow: overflow,
  };
}

/** 牛腿单重（kg，含支承板 + 加劲肋 + 连接件）：随牛腿高度（≈1.2 倍梁高）线性增长 */
function craneCorbelKg(beamHmm) { return Math.round((14 + 0.10 * beamHmm) * 10) / 10; }

/** 行车整套计算：吊车梁 + 牛腿 + 传给柱的荷载 */
function calcCrane(params) {
  if (!params || !params.hasCrane) {
    return { on: false, weight: 0, beamWeight: 0, corbelWeight: 0, colN: 0, colM: 0, colBMin: 0 };
  }
  var bm = optimalCraneBeam(params);
  var L = ((params.length || 60000) / 1000);
  var csM = bm.span;
  var nBay = Math.max(1, Math.ceil(L / csM));          // 每侧吊车梁条数
  var beamCount = nBay * 2;                            // 两侧纵墙各一条通长
  var realSpan = L / nBay;                             // 实际分段长（避免末段余量）
  var beamTotalLen = beamCount * realSpan;
  var beamWeight = beamTotalLen * bm.kg * STEEL_COEFF;

  // 牛腿：每个柱位、每侧 1 个（同一柱位左右两台梁共用一个牛腿）
  var numCols = Math.max(2, Math.ceil(((params.length || 60000) / 1000) / csM) + 1);
  var corbelCount = numCols * 2;
  var corbelKg = craneCorbelKg(bm.h);
  var corbelWeight = corbelCount * corbelKg * STEEL_COEFF;

  // 传给柱的荷载：梁端支座反力 ≈ 1 个轮压（两轮关于跨中对称时 R_A = P）
  var railM = craneRailHeightM(params);
  var eMm = 450;                                       // 竖向轮压偏心距（牛腿中心 → 柱中心，mm）
  var colN = 1.5 * bm.lam * bm.wheelP * 1000;          // N（设计值）
  var colM = colN * eMm + 1.5 * bm.trolleyT * 1000 * railM * 1000;   // N·mm（竖向偏心 + 水平力 × 轨顶高）
  return {
    on: true,
    tonnage: bm.tonnage, grade: bm.grade,
    gradeName: (bm.grade === 'A6A8') ? 'A6~A8' : 'A3~A5',
    span: bm.span, craneSpan: bm.Lk, wheelP: bm.wheelP, trolleyT: bm.trolleyT,
    beam: bm, beamKg: bm.kg, beamCount: beamCount, beamTotalLen: beamTotalLen,
    beamWeight: beamWeight,
    corbelCount: corbelCount, corbelKg: corbelKg, corbelWeight: corbelWeight,
    railH: railM,
    colN: colN, colM: colM, colBMin: 300,
    weight: beamWeight + corbelWeight,
  };
}

// ========== 汇总 ==========
function calculateAll(params) {
  const cr = calcCrane(params);              // 行车（吊车梁 + 牛腿），不依赖主结构
  const main = calcMainStructure(params, cr);
  const wc = calcWindColumn(params, main);
  const rp = calcRoofPurlins(params);
  const wp = calcWallPurlins(params);
  const pp = calcParapet(params, main, wc, wp);

  // 窗数量：autoLayout 时按柱距布窗（每柱距一扇，门的柱距让给门）
  const wl = layoutWindowsByBay(params);
  const effCount = (params.autoLayout === false && params.count > 0) ? params.count : wl.count;
  // 窗高：未填写时自动算 = 檐口 - 1.5m -（女儿墙再 -1.5m）- 窗台
  let effWinH = params.winHeight;
  if (!effWinH || effWinH <= 0) {
    effWinH = params.height - 1500
      - (params.hasParapet && params.parapetHeight > 0 ? 1500 : 0)
      - (params.sillHeight || 1200);
    if (effWinH < 300) effWinH = 300;
  }
  const win = calcWindows(Object.assign({}, params, { count: effCount, winHeight: effWinH }));
  const mz1 = calcMezzanine(params, 1);
  const mz2 = calcMezzanine(params, 2);
  const enc = calcEnclosure(params, pp, win);
  const sec = calcSecondary(params, main, rp, wp, wc);
  const mtn = calcMaintenance(params, pp, win, main);
  const blt = calcBolts(params, main, rp, wp, sec, mz1, mz2);

  const totalSteel = main.total + wc.weight + rp.weight + wp.weight + pp.steelIncrement
    + win.extraPurlin + win.frameWeight + win.doorFrameWeight
    + (mz1.hasMezzanine ? (mz2.hasMezzanine ? mz1.total - mz1.colWeight : mz1.total) : 0)  // 有二层时去掉一层柱重（已被二层通高柱覆盖）
    + (mz2.hasMezzanine ? mz2.total : 0)
    + cr.weight                                                       // 行车：吊车梁 + 牛腿（2026-09-28 r40）
    + sec.total + blt.total;
  const totalWeight = totalSteel;

  return {
    main, windColumn: wc, roofPurlin: rp, wallPurlin: wp, parapet: pp, windows: win,
    wind: windReport(params),
    crane: cr,
    mezzanine: mz1, mezzanine2: mz2,
    enclosure: enc, secondary: sec, maintenance: mtn, bolts: blt,
    totalSteel,
    breakdown: [
      { item: '主结构(柱+梁)', spec: main.column.spec + ' + ' + main.beam.spec + ` · 含檩托板${sec.cleat.count}块`, weight: main.total + sec.cleat.weight, length: 0, area: 0, ratio: (main.total + sec.cleat.weight) / totalWeight },
      ...(wc.count > 0 ? [{ item: '抗风柱', spec: wc.spec, weight: wc.weight, length: wc.totalLength, area: 0, ratio: wc.weight / totalWeight }] : []),
      ...(cr.on ? [
        { item: '吊车梁', spec: cr.beam.spec + ` · ${cr.tonnage}t ${cr.gradeName} · 跨度${cr.span.toFixed(1)}m · ${cr.beamCount}条`, weight: cr.beamWeight, length: cr.beamTotalLen, area: 0, ratio: cr.beamWeight / totalWeight },
        { item: '牛腿+连接件', spec: `吊车梁支承牛腿 · ${cr.corbelCount}个 · 单重${cr.corbelKg}kg`, weight: cr.corbelWeight, length: 0, area: 0, ratio: cr.corbelWeight / totalWeight },
      ] : []),
      { item: '屋面檩条', spec: rp.spec, weight: rp.weight, length: rp.totalLength, area: 0, ratio: rp.weight / totalWeight },
      { item: '墙面檩条', spec: wp.spec, weight: wp.weight, length: wp.totalLength, area: 0, ratio: wp.weight / totalWeight },
      ...(mz1.hasMezzanine ? [
        // 夹层柱：有二层时一层柱被通高柱覆盖，不单独算
        ...(mz2.hasMezzanine
          ? [
            { item: '夹层柱(通高7.2m)', spec: mz2.column.spec + '(HW·通高7.2m)', weight: mz2.colWeight, length: 0, area: 0, ratio: mz2.colWeight / totalWeight },
          ]
          : [
            { item: '夹层柱', spec: mz1.column.spec + '(HW·高3.6m)', weight: mz1.colWeight, length: 0, area: 0, ratio: mz1.colWeight / totalWeight },
          ]
        ),
        { item: '夹层主梁', spec: (mz2.hasMezzanine ? mz1.beam.spec + '(焊接H·一层) + ' + mz2.beam.spec + '(焊接H·二层)' : mz1.beam.spec + '(焊接H)'), weight: mz1.beamWeight + (mz2.hasMezzanine ? mz2.beamWeight : 0), length: 0, area: 0, ratio: (mz1.beamWeight + (mz2.hasMezzanine ? mz2.beamWeight : 0)) / totalWeight },
        { item: '夹层次梁', spec: '焊接H型钢 · 间距2.5m' + (mz2.hasMezzanine ? ' ×2层' : ''), weight: mz1.subBeamWeight + (mz2.hasMezzanine ? mz2.subBeamWeight : 0), length: 0, area: 0, ratio: (mz1.subBeamWeight + (mz2.hasMezzanine ? mz2.subBeamWeight : 0)) / totalWeight },
        { item: '楼承板', spec: `压型钢板1.0厚760型 · ${(mz1.deckArea + (mz2.hasMezzanine ? mz2.deckArea : 0)).toFixed(0)}m²` + (mz2.hasMezzanine ? ' ×2层' : ''), weight: mz1.deckSteel + (mz2.hasMezzanine ? mz2.deckSteel : 0), length: 0, area: mz1.deckArea + (mz2.hasMezzanine ? mz2.deckArea : 0), ratio: (mz1.deckSteel + (mz2.hasMezzanine ? mz2.deckSteel : 0)) / totalWeight },
        { item: '夹层栏杆', spec: `钢管栏杆~8kg/m · ${(mz1.railing + (mz2.hasMezzanine ? mz2.railing : 0)).toFixed(0)}m` + (mz2.hasMezzanine ? ' ×2层' : ''), weight: mz1.railingSteel + (mz2.hasMezzanine ? mz2.railingSteel : 0), length: mz1.railing + (mz2.hasMezzanine ? mz2.railing : 0), area: 0, ratio: (mz1.railingSteel + (mz2.hasMezzanine ? mz2.railingSteel : 0)) / totalWeight },
        { item: '钢楼梯', spec: `钢梯1部/层 · ${(mz2.hasMezzanine ? 2 : 1)}层`, weight: mz1.stairsSteel + (mz2.hasMezzanine ? mz2.stairsSteel : 0), length: 0, area: 0, ratio: (mz1.stairsSteel + (mz2.hasMezzanine ? mz2.stairsSteel : 0)) / totalWeight },
      ] : []),
      { item: '系杆', spec: sec.tieRod.spec, weight: sec.tieRod.weight, length: sec.tieRod.length, area: 0, ratio: sec.tieRod.weight / totalWeight },
      { item: '拉条+隅撑+撑杆', spec: sec.brace.spec, weight: sec.brace.weight, length: sec.brace.length, area: 0, ratio: sec.brace.weight / totalWeight },
      { item: '水平支撑+柱间支撑', spec: sec.bracing.spec, weight: sec.bracing.weight, length: sec.bracing.length, area: 0, ratio: sec.bracing.weight / totalWeight },
      ...(params.hasParapet ? [{ item: '女儿墙钢构', spec: pp.ibSpec + `(女儿柱${pp.postCount}根) + ${pp.girtSpec}(女儿墙檩条·同墙梁)`, weight: pp.steelIncrement, length: 0, area: pp.enclosureIncrement, ratio: pp.steelIncrement / totalWeight }] : []),
      { item: '门窗影响', spec: `每柱距1扇 · ${effCount}扇窗+${params.doorCount || 0}门 · 框C型钢(窗上下/门顶借用墙梁)`, weight: win.extraPurlin + win.frameWeight + win.doorFrameWeight, length: 0, area: win.totalArea, ratio: (win.extraPurlin + win.frameWeight + win.doorFrameWeight) / totalWeight },
      { item: '地脚螺栓', spec: blt.anchorBolt.spec, weight: blt.anchorBolt.weight, count: blt.anchorBolt.count, countUnit: '根', length: 0, area: 0, ratio: blt.anchorBolt.weight / totalWeight },
      { item: '高强螺栓', spec: blt.hsBolt.spec, weight: blt.hsBolt.weight, count: blt.hsBolt.count, countUnit: '套', length: 0, area: 0, ratio: blt.hsBolt.weight / totalWeight },
      { item: '檩托板螺栓', spec: blt.cleatBolt.spec, weight: blt.cleatBolt.weight, count: blt.cleatBolt.count, countUnit: '套', length: 0, area: 0, ratio: blt.cleatBolt.weight / totalWeight },
      { item: '普通螺栓', spec: blt.ordinaryBolt.spec, weight: blt.ordinaryBolt.weight, count: blt.ordinaryBolt.count, countUnit: '套', length: 0, area: 0, ratio: blt.ordinaryBolt.weight / totalWeight },
    ],
    maintenance: [
      { item: '屋面维护系统', spec: mtn.roof.spec + (mtn.daylight ? `(已扣采光带${mtn.daylight.area.toFixed(1)}m²)` : ''), area: mtn.roof.area },
      { item: '墙面维护系统', spec: mtn.wall.spec, area: mtn.wall.area },
      ...(mtn.daylight ? [{ item: '屋面采光带', spec: mtn.daylight.spec, area: mtn.daylight.area, count: mtn.daylight.count, countUnit: mtn.daylight.countUnit }] : []),
      { item: '屋脊瓦+门窗包边+角柱包边' + (mtn.flashing ? '+泛水件' : '') + (mtn.fascia ? '+封檐板' : ''), spec: `脊瓦${mtn.ridgeCap.length.toFixed(0)}m+窗包边${(mtn.winTrim.length - mtn.doorTrimLen).toFixed(0)}m+门洞包边${mtn.doorTrimLen.toFixed(0)}m+角柱${mtn.cornerTrim.length.toFixed(0)}m` + (mtn.flashing ? `+泛水${mtn.flashing.length.toFixed(0)}m` : '') + (mtn.fascia ? `+封檐板${mtn.fascia.length.toFixed(0)}m` : ''), length: mtn.totalTrim },
      // 天沟：2026-09-29 康师傅口径——只有带女儿墙才有内天沟；无女儿墙不做天沟，
      //       算量汇总也不列（与报价明细、3D 模型三处保持一致）
      ...(params.hasParapet ? [{ item: '天沟', spec: mtn.gutter.spec, length: mtn.gutter.length }] : []),
      { item: '落水管', spec: mtn.downpipe.spec, length: mtn.downpipe.length, count: mtn.downpipe.count, countUnit: mtn.downpipe.countUnit },
    ],
  };
}
