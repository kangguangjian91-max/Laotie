/**
 * 钢结构算量工具 - 计算引擎 v3
 * 门式刚架：柱+梁均为钢板焊接H型钢 (CECS 102)
 * 所有重量为预估数值，仅供初步预算参考
 */

// ========== 通用：焊接H型钢计算 ==========

/** 等截面焊接H型钢 (柱) */
export function weldedSection(H, B, tw, tf) {
  const A = 2 * B * tf + (H - 2 * tf) * tw;
  return {
    spec: `H${H}×${B}×${tw}×${tf}`,
    weight: A * 7.85 / 1000,
  };
}

/** 变截面焊接H型钢 (梁): H(膝深~屋脊深)×B×tw×tf, 腹板线性渐变, 翼缘不变 */
export function weldedTapered(Hk, Hr, B, tw, tf) {
  const Ak = 2 * B * tf + (Hk - 2 * tf) * tw;
  const Ar = 2 * B * tf + (Hr - 2 * tf) * tw;
  const weight = (Ak + Ar) / 2 * 7.85 / 1000;
  return {
    spec: `H(${Hk}~${Hr})×${B}×${tw}×${tf}`,
    weight,
  };
}

// ========== 构件规格 ==========
const STEEL_COEFF = 1.05;

// ========== 檩条查表：按跨度选C型钢截面 (简支均布, 1.5m檩距) ==========
export function lookupRoofPurlin(span) {
  if (span <= 4.5) return { spec: 'C120×50×20×2.0', weight: 3.42, factor: 1.00 };
  if (span <= 6)   return { spec: 'C160×60×20×2.5', weight: 5.72, factor: 1.00 };
  if (span <= 7.5) return { spec: 'C180×70×20×2.5', weight: 6.59, factor: 1.00 };
  if (span <= 9)   return { spec: 'C200×70×20×2.5', weight: 7.38, factor: 1.00 };
  return { spec: 'C250×75×20×2.5', weight: 9.57, factor: 1.00 };
}

export function lookupWallPurlin(span) {
  if (span <= 4.5) return { spec: 'C100×50×20×2.0', weight: 2.95, factor: 1.00 };
  if (span <= 6)   return { spec: 'C120×50×20×2.2', weight: 3.95, factor: 1.00 };
  if (span <= 7.5) return { spec: 'C140×50×20×2.2', weight: 4.52, factor: 1.00 };
  if (span <= 9)   return { spec: 'C160×60×20×2.5', weight: 5.72, factor: 1.00 };
  return { spec: 'C180×70×20×2.5', weight: 6.59, factor: 1.00 };
}

// ========== 钢柱：檐高定截面 (GB/T 33814 焊接H型钢) ==========
export function lookupColumn(H) {
  if (H <= 5)  return weldedSection(250, 200, 6, 10);
  if (H <= 7)  return weldedSection(300, 200, 8, 12);
  if (H <= 10) return weldedSection(350, 250, 8, 14);
  return weldedSection(400, 300, 10, 16);
}

// ========== 屋面梁：单跨跨度定截面 (GB/T 33814 变截面焊接H型钢) ==========
export function lookupBeam(S, tapered) {
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
  return tapered ? weldedTapered(800, 500, 280, 12, 16)
                 : weldedSection(700, 300, 12, 18);
}

// ========== 主结构计算 ==========
export function calcMainStructure(params) {
  const { length, width, height, hasMiddleColumn, isTapered, columnSpacing } = params;
  const L = length / 1000, W = width / 1000, H = height / 1000;
  const cs = columnSpacing ? columnSpacing / 1000 : 6;

  const col = lookupColumn(H);
  const numCols = Math.ceil(L / cs) + 1;
  const singleSpan = hasMiddleColumn ? W / 2 : W;
  const beam = lookupBeam(singleSpan, isTapered);
  const halfSpan = singleSpan / 2;

  if (hasMiddleColumn) {
    const sideCols = numCols * 2 * H * col.weight * STEEL_COEFF;
    const midCols = numCols * 1 * H * col.weight * STEEL_COEFF;
    const beams = numCols * 4 * halfSpan * beam.weight * STEEL_COEFF;
    return {
      columnWeight: sideCols + midCols,
      beamWeight: beams,
      total: sideCols + midCols + beams,
      column: col, beam,
      numCols, singleSpan,
    };
  } else {
    const cols = numCols * 2 * H * col.weight * STEEL_COEFF;
    const beams = numCols * 2 * halfSpan * beam.weight * STEEL_COEFF;
    return {
      columnWeight: cols,
      beamWeight: beams,
      total: cols + beams,
      column: col, beam,
      numCols, singleSpan,
    };
  }
}

// ========== 檩条 ==========
export function calcRoofPurlins(params) {
  const { length, width, roofPurlinSpacing, columnSpacing, hasMiddleColumn } = params;
  const L = length / 1000, W = width / 1000;
  const rps = roofPurlinSpacing / 1000;
  const cs = columnSpacing ? columnSpacing / 1000 : 6;
  const purlin = lookupRoofPurlin(cs);
  // 屋面坡度：单跨=W/2，双跨=每半跨W/4
  const slopeW = hasMiddleColumn ? W / 4 : W / 2;
  const perSlope = Math.ceil(slopeW / rps) + 1;
  return {
    perSlope, purlin,
    totalLength: perSlope * 2 * L,
    weight: perSlope * 2 * L * purlin.weight * purlin.factor,
    spec: purlin.spec + ` (柱距${cs}m)`,
  };
}

export function calcWallPurlins(params) {
  const { length, width, wallPurlinSpacing, height, columnSpacing } = params;
  const L = length / 1000, W = width / 1000, H = height / 1000;
  const wps = wallPurlinSpacing / 1000;
  const cs = columnSpacing ? columnSpacing / 1000 : 6;
  const purlin = lookupWallPurlin(cs);
  const layers = Math.ceil(H / wps) + 1;
  const perimeter = (L + W) * 2;
  return {
    layers, perimeter, purlin,
    totalLength: perimeter * layers,
    weight: perimeter * layers * purlin.weight * purlin.factor,
    spec: purlin.spec + ` (柱距${cs}m)`,
  };
}

// ========== 女儿墙 (HN200×100 统一型号) ==========
const PARAPET_COLUMN = weldedSection(200, 100, 5.5, 8);  // HN200×100×5.5×8

export function calcParapet(params, main) {
  const { hasParapet, parapetHeight, length, width, columnSpacing } = params;
  if (!hasParapet) return { steelIncrement: 0, enclosureIncrement: 0, gutterLength: 0, colExt: 0, topPurlin: 0, acc: 0 };

  // 女儿墙柱 HN200×100, 沿两侧墙面 + 山墙端部
  const L = length / 1000, W = width / 1000, h = parapetHeight / 1000;
  const cs = columnSpacing ? columnSpacing / 1000 : 6;
  const perimeter = (L + W) * 2;
  const gableCols = Math.ceil(W / cs) + 1;
  const totalParapetCols = main.numCols * 2 + Math.max(0, (gableCols - 2)) * 2;

  const wp = lookupWallPurlin(cs);
  const colExt = totalParapetCols * h * PARAPET_COLUMN.weight * STEEL_COEFF;
  const topPurlin = perimeter * wp.weight;
  const acc = (colExt + topPurlin) * 0.10;

  return {
    steelIncrement: colExt + topPurlin + acc,
    enclosureIncrement: (h + h + 0.2) * perimeter,
    perMeterSteel: (colExt + topPurlin + acc) / perimeter,
    gutterLength: L * 2,   // 两条天沟沿长度方向
    colExt, topPurlin, acc,
  };
}

// ========== 次构件 ==========

export function calcSecondary(params, main, rp, wp) {
  const L = params.length / 1000;

  // 系杆 φ114×4 圆管, 10.85 kg/m
  const tieRows = params.hasMiddleColumn ? 3 : 2;
  const tieRodWt = tieRows * L * 10.85;

  // 拉条+隅撑+撑杆: 取屋面檩条+墙面檩条重量的 10%
  const braceWt = (rp.weight + wp.weight) * 0.10;

  return {
    tieRod: { spec: 'φ114×4圆管(系杆)', weight: tieRodWt, length: tieRows * L, rows: tieRows },
    brace:  { spec: '拉条+隅撑+撑杆', weight: braceWt },
    total: tieRodWt + braceWt,
  };
}

// ========== 螺栓 ==========

export function calcBolts(params, main, rp, wp, sec, mz1, mz2) {
  const W = params.width / 1000;
  const H = params.height / 1000;
  const cs = params.columnSpacing ? params.columnSpacing / 1000 : 6;

  // 钢柱总数 (外围)
  const gableCols = Math.ceil(W / cs) + 1;
  const totalCols = main.numCols * 2 + Math.max(0, (gableCols - 2)) * 2;

  // 地脚螺栓: 每柱4根, 规格随柱高变化
  let anchorSpec, anchorPerKg;
  if (H <= 5)      { anchorSpec = 'M24×800'; anchorPerKg = 3.5; }
  else if (H <= 7) { anchorSpec = 'M27×900'; anchorPerKg = 4.5; }
  else if (H <= 10){ anchorSpec = 'M30×1000'; anchorPerKg = 5.5; }
  else             { anchorSpec = 'M33×1100'; anchorPerKg = 7.5; }
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

  // 普通螺栓: 按实际连接点数 × 每点4颗 M12
  const roofPurlinConns = rp.perSlope * 2 * main.numCols;
  const wallGirtConns = wp.layers * totalCols;
  const tieRodConns = sec.tieRod.rows * main.numCols;
  const braceConns = sec.tieRod.rows * main.numCols;
  const totalOrdinaryConns = roofPurlinConns + wallGirtConns + tieRodConns + braceConns;
  const ordinaryCount = totalOrdinaryConns * 4;
  const ordinaryBoltWt = ordinaryCount * 0.12;  // M12镀锌螺栓 ~0.12kg/套

  return {
    anchorBolt:  { spec: `${anchorSpec}(${totalCols}柱×4)`, weight: anchorBoltWt, count: anchorCount },
    hsBolt:      { spec: `M20×70 10.9S(${main.numCols}榀×${hsConns}节点×${hsPerConn}${mezzConnDesc})`, weight: hsBoltWt, count: hsCount },
    ordinaryBolt:{ spec: `M12 镀锌(${totalOrdinaryConns}连接点×4)`, weight: ordinaryBoltWt, count: ordinaryCount },
    total: anchorBoltWt + hsBoltWt + ordinaryBoltWt,
  };
}

// ========== 维护系统 ==========

export function calcMaintenance(params, parapet, windows, main) {
  const L = params.length / 1000, W = params.width / 1000, H = params.height / 1000;
  const roofArea = L * W * 1.02;

  const wallH = params.hasParapet ? H + params.parapetHeight / 1000 : H;
  const wallArea = (L + W) * 2 * wallH - windows.totalArea;

  // 屋脊瓦: 沿长度方向
  const ridgeCap = L;

  // 门窗包边: 每扇窗周长
  const winPerimeter = (params.winWidth / 1000 + params.winHeight / 1000) * 2;
  const winTrim = windows.count * winPerimeter;

  // 角柱包边: 4个角柱×(高度-1.2m), 不低于0
  const cornerTrim = 4 * Math.max(0, H - 1.2);

  // 女儿墙泛水件: 周长
  const flashing = params.hasParapet ? (L + W) * 2 : 0;

  // 总包边+脊瓦
  const totalTrim = ridgeCap + winTrim + cornerTrim + flashing;

  return {
    roof:    { spec: '屋面板+保温棉+防水', area: roofArea },
    wall:    { spec: params.hasParapet ? '墙面板+保温(含女儿墙)' : '墙面板+保温', area: wallArea },
    ridgeCap:{ spec: `屋脊瓦`, length: ridgeCap },
    winTrim: { spec: `门窗包边(${windows.count}扇)`, length: winTrim },
    cornerTrim:{ spec: `角柱包边(${H.toFixed(1)}-1.2m×4角)`, length: cornerTrim },
    flashing: params.hasParapet ? { spec: `女儿墙泛水件(${((L+W)*2).toFixed(0)}m)`, length: flashing } : null,
    totalTrim,
    gutter: params.hasParapet ? { spec: '天沟(2列)', length: L * 2 } : null,
  };
}

// ========== 门窗 ==========
export function calcWindows(params) {
  const { windowScheme, winWidth, winHeight, count, columnSpacing } = params;
  if (!count || count <= 0) return { totalArea: 0, extraPurlin: 0, count: 0 };

  const area = (winWidth * winHeight * count) / 1e6;
  let extraPurlin = 0;
  if (windowScheme === 'vertical') {
    const cs = columnSpacing ? columnSpacing / 1000 : 6;
    const wp = lookupWallPurlin(cs);
    extraPurlin = winWidth / 1000 * 2 * count * wp.weight * wp.factor;
  }
  return { totalArea: area, extraPurlin, count };
}

// ========== 围护面积 ==========
export function calcEnclosure(params, parapet, windows) {
  const { length, width, height } = params;
  const L = length / 1000, W = width / 1000, H = height / 1000;
  return {
    roof: L * W * 1.02,
    wall: (L + W) * 2 * H,
    total: L * W * 1.02 + (L + W) * 2 * H + parapet.enclosureIncrement - windows.totalArea,
  };
}

// ========== 夹层 ==========
// HW宽翼缘 (GB/T 11263) / HN窄翼缘 (GB/T 11263)
export function lookupMezzColumn(loadArea) {
  if (loadArea <= 20) return weldedSection(200, 200, 8, 12);
  if (loadArea <= 25) return weldedSection(250, 250, 9, 14);
  if (loadArea <= 35) return weldedSection(300, 300, 10, 15);
  return weldedSection(350, 350, 12, 19);
}

// 夹层主梁 (焊接H型钢，按跨度和荷载选截面)
export function lookupMezzBeam(span, use) {
  const factor = use === 'storage' ? 1.4 : 1.0;
  if (span * factor <= 4) return weldedSection(300, 150, 6.5, 9);
  if (span * factor <= 6) return weldedSection(350, 175, 7, 11);
  if (span * factor <= 8) return weldedSection(400, 200, 8, 13);
  return weldedSection(450, 200, 9, 14);
}

// 焊接H次梁 (按跨度选截面，间距2.5m)
export function lookupMezzSubBeam(span) {
  if (span <= 3) return weldedSection(200, 100, 5.5, 8);
  if (span <= 4) return weldedSection(250, 125, 6, 9);
  return weldedSection(300, 150, 6.5, 9);
}

export function calcMezzanine(params, level) {
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

// ========== 汇总 ==========
export function calculateAll(params) {
  const main = calcMainStructure(params);
  const rp = calcRoofPurlins(params);
  const wp = calcWallPurlins(params);
  const pp = calcParapet(params, main);
  const win = calcWindows(params);
  const mz1 = calcMezzanine(params, 1);
  const mz2 = calcMezzanine(params, 2);
  const enc = calcEnclosure(params, pp, win);
  const sec = calcSecondary(params, main, rp, wp);
  const mtn = calcMaintenance(params, pp, win, main);
  const blt = calcBolts(params, main, rp, wp, sec, mz1, mz2);

  const totalSteel = main.total + rp.weight + wp.weight + pp.steelIncrement + win.extraPurlin
    + (mz1.hasMezzanine ? (mz2.hasMezzanine ? mz1.total - mz1.colWeight : mz1.total) : 0)  // 有二层时去掉一层柱重（已被二层通高柱覆盖）
    + (mz2.hasMezzanine ? mz2.total : 0)
    + sec.total + blt.total;
  const totalWeight = totalSteel;

  return {
    main, roofPurlin: rp, wallPurlin: wp, parapet: pp, windows: win,
    mezzanine: mz1, mezzanine2: mz2,
    enclosure: enc, secondary: sec, maintenance: mtn, bolts: blt,
    totalSteel,
    breakdown: [
      { item: '主结构(柱+梁)', spec: main.column.spec + ' + ' + main.beam.spec, weight: main.total, length: 0, area: 0, ratio: main.total / totalWeight },
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
      ] : []),
      { item: '系杆', spec: sec.tieRod.spec, weight: sec.tieRod.weight, length: sec.tieRod.length, area: 0, ratio: sec.tieRod.weight / totalWeight },
      { item: '拉条+隅撑+撑杆', spec: sec.brace.spec, weight: sec.brace.weight, length: 0, area: 0, ratio: sec.brace.weight / totalWeight },
      ...(params.hasParapet ? [{ item: '女儿墙附加', spec: 'HN200×100×5.5×8', weight: pp.steelIncrement, length: 0, area: pp.enclosureIncrement, ratio: pp.steelIncrement / totalWeight }] : []),
      { item: '门窗影响', spec: params.windowScheme === 'vertical' ? '竖窗' : '横窗', weight: win.extraPurlin, length: 0, area: win.totalArea, ratio: win.extraPurlin / totalWeight },
      { item: '地脚螺栓', spec: blt.anchorBolt.spec, weight: blt.anchorBolt.weight, count: blt.anchorBolt.count, countUnit: '根', length: 0, area: 0, ratio: blt.anchorBolt.weight / totalWeight },
      { item: '高强螺栓', spec: blt.hsBolt.spec, weight: blt.hsBolt.weight, count: blt.hsBolt.count, countUnit: '套', length: 0, area: 0, ratio: blt.hsBolt.weight / totalWeight },
      { item: '普通螺栓', spec: blt.ordinaryBolt.spec, weight: blt.ordinaryBolt.weight, count: blt.ordinaryBolt.count, countUnit: '套', length: 0, area: 0, ratio: blt.ordinaryBolt.weight / totalWeight },
    ],
    maintenance: [
      { item: '屋面维护系统', spec: mtn.roof.spec, area: mtn.roof.area },
      { item: '墙面维护系统', spec: mtn.wall.spec, area: mtn.wall.area },
      { item: '屋脊瓦+门窗包边+角柱包边' + (mtn.flashing ? '+泛水件' : ''), spec: `脊瓦${mtn.ridgeCap.length.toFixed(0)}m+窗包边${mtn.winTrim.length.toFixed(0)}m+角柱${mtn.cornerTrim.length.toFixed(0)}m` + (mtn.flashing ? `+泛水${mtn.flashing.length.toFixed(0)}m` : ''), length: mtn.totalTrim },
      ...(mtn.gutter ? [{ item: '天沟', spec: mtn.gutter.spec, length: mtn.gutter.length }] : []),
    ],
  };
}

// ========== ESM exports ==========
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    calculateAll,
    calcMainStructure,
    calcRoofPurlins,
    calcWallPurlins,
    calcParapet,
    calcSecondary,
    calcBolts,
    calcMaintenance,
    calcWindows,
    calcEnclosure,
    calcMezzanine,
    weldedSection,
    weldedTapered,
    lookupRoofPurlin,
    lookupWallPurlin,
    lookupColumn,
    lookupBeam,
  };
}
