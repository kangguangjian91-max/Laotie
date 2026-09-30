/* ============================================================
   preview3d.js — 门式刚架厂房 实时 3D 预览
   · 只读 app.js 暴露的 state（不改任何计算逻辑）
   · 参数变化时自动重建模型
   ============================================================ */
(function () {
  'use strict';

  // ---------- 安全读取 app.js 的 state ----------
  function S() {
    try { return (typeof state !== 'undefined' && state) ? state : null; }
    catch (e) { return null; }
  }

  var stageEl = document.getElementById('stage3d');
  var canvas = document.getElementById('cv3d');
  var fallbackEl = document.getElementById('s3dFallback');
  if (!stageEl || !canvas) return;

  function fail(msg) {
    if (fallbackEl) { fallbackEl.textContent = msg || '当前环境不支持 WebGL，3D 预览已停用'; fallbackEl.style.display = 'flex'; }
    if (canvas) canvas.style.display = 'none';
  }

  if (typeof THREE === 'undefined') { fail('3D 引擎未加载，预览已停用'); return; }

  // ---------- WebGL 能力检测 ----------
  var gl = null;
  try {
    var probe = document.createElement('canvas');
    gl = probe.getContext('webgl') || probe.getContext('experimental-webgl');
  } catch (e) { gl = null; }
  if (!gl) { fail(); return; }

  // ---------- 渲染器 / 场景 / 相机 ----------
  var renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  } catch (e) { fail(); return; }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearAlpha(0);

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(45, 1, 0.2, 4000);

  scene.add(new THREE.HemisphereLight(0xA8C0D6, 0x090C0F, 0.52));

  var key = new THREE.DirectionalLight(0xFFF1D0, 0.78);
  key.position.set(1, 1.55, 0.85);
  scene.add(key);

  var fill = new THREE.DirectionalLight(0x93AABF, 0.30);
  fill.position.set(-1.1, 0.65, -0.9);
  scene.add(fill);

  var rim = new THREE.DirectionalLight(0xFFC400, 0.20);
  rim.position.set(-0.4, 0.3, 1.4);
  scene.add(rim);

  // ---------- 材质 ----------
  var MAT = {
    steel:    new THREE.MeshPhongMaterial({ color: 0x9BA6B2, specular: 0xDCE4EC, shininess: 92, side: THREE.DoubleSide }),
    steelMid: new THREE.MeshPhongMaterial({ color: 0xC2A520, specular: 0xFFE066, shininess: 96, side: THREE.DoubleSide }),
    purlin:   new THREE.MeshPhongMaterial({ color: 0x87949F, specular: 0xC2CCD6, shininess: 62, side: THREE.DoubleSide }),
    roof:     new THREE.MeshPhongMaterial({ color: 0xD8DDE1, specular: 0xF2F5F7, shininess: 120, metalness: 0.4, side: THREE.DoubleSide }),
    cladding: new THREE.MeshPhongMaterial({ color: 0xC9CED3, specular: 0xE8ECEF, shininess: 84, metalness: 0.3, side: THREE.DoubleSide }),
    seam: new THREE.MeshPhongMaterial({ color: 0xA7AEB6, specular: 0xC9CED3, shininess: 60, side: THREE.DoubleSide }),
    parapet:  new THREE.MeshPhongMaterial({ color: 0x4A5058, specular: 0x8A929B, shininess: 64, side: THREE.DoubleSide }),
    trim:     new THREE.MeshPhongMaterial({ color: 0xE3E7EB, specular: 0xF5F8FA, shininess: 130, metalness: 0.45, side: THREE.DoubleSide }), // 四角包边/檐口收边（比墙板略亮的银白）
    gutter:   new THREE.MeshPhongMaterial({ color: 0x9FA9B4, specular: 0xC9D2DB, shininess: 70, side: THREE.DoubleSide }),
    bolt:     new THREE.MeshPhongMaterial({ color: 0xD08A2A, specular: 0xFFB366, shininess: 80, side: THREE.DoubleSide }),
    brace:    new THREE.MeshPhongMaterial({ color: 0x4682B4, specular: 0x8FB6D9, shininess: 70, side: THREE.DoubleSide }),
    brick:    new THREE.MeshPhongMaterial({ color: 0x9C4A32, specular: 0xB86A50, shininess: 16, side: THREE.DoubleSide }),
    slab:     new THREE.MeshPhongMaterial({ color: 0x5A646E, specular: 0xA6B0BA, shininess: 44, side: THREE.DoubleSide }),
    glass:    new THREE.MeshPhongMaterial({ color: 0xFFC400, emissive: 0xFF9D00, emissiveIntensity: 0.55, specular: 0xFFE066, shininess: 110, transparent: true, opacity: 0.9 }),
    daylight: new THREE.MeshPhongMaterial({ color: 0xEAF4FF, emissive: 0x9CC8FF, emissiveIntensity: 0.25, specular: 0xFFFFFF, shininess: 100, transparent: true, opacity: 0.55, side: THREE.DoubleSide }), // FRP采光板（半透明白）
    ground:   new THREE.MeshPhongMaterial({ color: 0x080B0E, specular: 0x141A21, shininess: 8 })
  };
  window.__MAT = MAT;   // 调试钩子：探针校验材质颜色用

  // ---------- 顶点资源池（重建时统一释放） ----------
  var pool = [];
  function track(o) { pool.push(o); return o; }
  function disposeAll() {
    pool.forEach(function (o) { if (o && o.dispose) { try { o.dispose(); } catch (e) {} } });
    pool = [];
  }

  var root = new THREE.Group();
  scene.add(root);

  var gPurlin = new THREE.Group();
  var gRoof = new THREE.Group();
  var gClad = new THREE.Group();
  var gOpening = new THREE.Group();   // 门窗（独立于墙面板开关，始终可见）
  root.add(gPurlin); root.add(gRoof); root.add(gClad); root.add(gOpening);

  // ---------- 工具函数 ----------
  // 沿本地 +Y 轴的锥形方管：截面 (ax1,az1) → (ax2,az2)，长度 len
  function taperPrism(ax1, az1, ax2, az2, len) {
    var hy = len / 2;
    var v = [
      [-ax1 / 2, -hy, -az1 / 2], [ax1 / 2, -hy, -az1 / 2], [ax1 / 2, -hy, az1 / 2], [-ax1 / 2, -hy, az1 / 2],
      [-ax2 / 2, hy, -az2 / 2], [ax2 / 2, hy, -az2 / 2], [ax2 / 2, hy, az2 / 2], [-ax2 / 2, hy, az2 / 2]
    ];
    var f = [
      [0, 1, 5], [0, 5, 4],   // -Z
      [1, 2, 6], [1, 6, 5],   // +X
      [2, 3, 7], [2, 7, 6],   // +Z
      [3, 0, 4], [3, 4, 7],   // -X
      [4, 5, 6], [4, 6, 7],   // +Y
      [3, 2, 1], [3, 1, 0]    // -Y
    ];
    var pos = [];
    f.forEach(function (t) {
      t.forEach(function (i) { pos.push(v[i][0], v[i][1], v[i][2]); });
    });
    var g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    g.computeVertexNormals();
    return g;
  }

  // ---------- H 型钢（工字钢）截面 ----------
  // 沿本地 +Y 轴拉伸，截面位于 XZ 平面：
  //   h  = 截面总高（腹板方向，沿 Z）
  //   bf = 翼缘宽度（沿 X）
  //   tw = 腹板厚（沿 X），tf = 翼缘厚（沿 Z）
  // 支持变截面：底端 (h1, bf1) → 顶端 (h2, bf2)
  function hBeamGeom(h1, bf1, h2, bf2, tw, tf, len) {
    var hy = len / 2;
    var twx = tw / 2;

    function ring(h, bf) {
      var baz = h / 2, bax = bf / 2;
      return [
        [-bax, baz], [bax, baz], [bax, baz - tf], [twx, baz - tf],
        [twx, -baz + tf], [bax, -baz + tf], [bax, -baz], [-bax, -baz],
        [-bax, -baz + tf], [-twx, -baz + tf], [-twx, baz - tf], [-bax, baz - tf]
      ];
    }
    var r1 = ring(h1, bf1), r2 = ring(h2, bf2);

    var pos = [];
    function tri(a, b, c) { pos.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]); }
    function P(x, y, z) { return [x, y, z]; }

    // 侧面：12 个四边形（腹板 2 片 + 翼缘端面 8 片 + 内部 2 片）
    for (var i = 0; i < 12; i++) {
      var j = (i + 1) % 12;
      var b0 = P(r1[i][0], -hy, r1[i][1]);
      var b1 = P(r1[j][0], -hy, r1[j][1]);
      var t0 = P(r2[i][0], hy, r2[i][1]);
      var t1 = P(r2[j][0], hy, r2[j][1]);
      tri(b0, b1, t1);
      tri(b0, t1, t0);
    }

    // 端面：H 型为凹多边形，拆成 上翼缘 / 腹板 / 下翼缘 三块矩形
    function cap(ring, y, flip) {
      var quads = [
        [ring[0], ring[1], ring[2], ring[11]],   // 上翼缘
        [ring[10], ring[3], ring[4], ring[9]],   // 腹板
        [ring[8], ring[5], ring[6], ring[7]]     // 下翼缘
      ];
      quads.forEach(function (q) {
        var a = P(q[0][0], y, q[0][1]), b = P(q[1][0], y, q[1][1]);
        var c = P(q[2][0], y, q[2][1]), d = P(q[3][0], y, q[3][1]);
        if (flip) { tri(a, c, b); tri(a, d, c); }
        else { tri(a, b, c); tri(a, c, d); }
      });
    }
    cap(r1, -hy, true);
    cap(r2, hy, false);

    var g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    g.computeVertexNormals();
    return g;
  }

  var boxGeoCache = {};
  function box(w, h, d) {
    var k = w + '_' + h + '_' + d;
    if (!boxGeoCache[k]) boxGeoCache[k] = new THREE.BoxGeometry(w, h, d);
    return boxGeoCache[k];
  }

  function mesh(geo, mat, parent) {
    var m = new THREE.Mesh(geo, mat);
    parent.add(m);
    return m;
  }

  // 沿本地 +Y 的锥形构件，从 p1 指向 p2
  function member(p1, p2, a1, b1, a2, b2, mat, parent) {
    var dir = new THREE.Vector3().subVectors(p2, p1);
    var len = dir.length();
    if (len < 0.001) return null;
    var geo = track(taperPrism(a1, b1, a2, b2, len));
    var m = mesh(geo, mat, parent);
    var axis = new THREE.Vector3(0, 1, 0);
    m.quaternion.setFromUnitVectors(axis, dir.clone().normalize());
    m.position.copy(p1).add(dir.multiplyScalar(0.5));
    return m;
  }

  // H 型钢构件：从 p1 指向 p2（沿本地 +Y 拉伸），截面尺寸见 hBeamGeom
  function hMember(p1, p2, h1, bf1, h2, bf2, tw, tf, mat, parent) {
    var dir = new THREE.Vector3().subVectors(p2, p1);
    var len = dir.length();
    if (len < 0.001) return null;
    var geo = track(hBeamGeom(h1, bf1, h2, bf2, tw, tf, len));
    var m = mesh(geo, mat, parent);
    m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());
    m.position.copy(p1).add(dir.multiplyScalar(0.5));
    return m;
  }

  // ---------- C 型檩条（冷弯薄壁槽钢）----------
  // 沿本地 +Z 拉伸，截面在 XY 平面：
  //   hc = 腹板高（沿 Y），bc = 翼缘宽（沿 X），t = 壁厚；腹板在 -X 侧，开口朝 +X
  function cPurlinGeom(hc, bc, t, len) {
    var hz = len / 2;
    var bx = bc / 2, by = hc / 2;
    // 8 点轮廓（逆时针）
    var P = [
      [-bx, by], [-bx, -by], [bx, -by], [bx, -by + t],
      [-bx + t, -by + t], [-bx + t, by - t], [bx, by - t], [bx, by]
    ];
    var pos = [];
    function tri(a, b, c) { pos.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]); }
    function Pt(p, z) { return [p[0], p[1], z]; }

    // 侧面：8 个四边形
    for (var i = 0; i < 8; i++) {
      var j = (i + 1) % 8;
      var b0 = Pt(P[i], -hz), b1 = Pt(P[j], -hz);
      var t0 = Pt(P[i], hz), t1 = Pt(P[j], hz);
      tri(b0, b1, t1);
      tri(b0, t1, t0);
    }

    // 端面：腹板 / 下翼缘 / 上翼缘 三块矩形
    var quads = [
      [P[0], P[1], P[4], P[5]],
      [P[1], P[2], P[3], P[4]],
      [P[5], P[6], P[7], P[0]]
    ];
    function cap(z, flip) {
      quads.forEach(function (q) {
        var a = Pt(q[0], z), b = Pt(q[1], z), c = Pt(q[2], z), d = Pt(q[3], z);
        if (flip) { tri(a, c, b); tri(a, d, c); }
        else { tri(a, b, c); tri(a, c, d); }
      });
    }
    cap(-hz, true);
    cap(hz, false);

    var g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    g.computeVertexNormals();
    return g;
  }

  // 把「沿本地 +Z 拉伸」的构件摆到世界坐标：
  //   origin = 构件中点；axis = 本地 +Z 朝向（长度方向）；xAxisDir = 本地 +X 朝向
  function orientedMesh(geo, mat, parent, origin, axis, xAxisDir) {
    var z = axis.clone().normalize();
    var x = xAxisDir.clone();
    x.addScaledVector(z, -x.dot(z));          // 正交化
    if (x.lengthSq() < 1e-8) x.set(1, 0, 0).addScaledVector(z, -z.x);
    x.normalize();
    var y = new THREE.Vector3().crossVectors(z, x).normalize();
    var m = new THREE.Mesh(geo, mat);
    m.setRotationFromMatrix(new THREE.Matrix4().makeBasis(x, y, z));
    m.position.copy(origin);
    parent.add(m);
    return m;
  }

  // ---------- 视角控制 ----------
  var ctrl = {
    target: new THREE.Vector3(0, 4, 0),
    r: 40, theta: Math.PI * 0.72, phi: Math.PI * 0.34,
    fitR: 40, autoSpin: false
  };

  function applyCamera() {
    var sp = Math.sin(ctrl.phi), cp = Math.cos(ctrl.phi);
    camera.position.set(
      ctrl.target.x + ctrl.r * sp * Math.sin(ctrl.theta),
      ctrl.target.y + ctrl.r * cp,
      ctrl.target.z + ctrl.r * sp * Math.cos(ctrl.theta)
    );
    camera.lookAt(ctrl.target);
  }

  // 相机基向量（由当前方位角 / 俯仰角决定）
  function basis() {
    var sp = Math.sin(ctrl.phi), cp = Math.cos(ctrl.phi);
    var dir = new THREE.Vector3(sp * Math.sin(ctrl.theta), cp, sp * Math.cos(ctrl.theta)).normalize();
    var right = new THREE.Vector3().crossVectors(new THREE.Vector3(0, 1, 0), dir);
    if (right.lengthSq() < 1e-6) right.set(1, 0, 0);
    right.normalize();
    var up = new THREE.Vector3().crossVectors(dir, right).normalize();
    return { dir: dir, right: right, up: up };
  }

  function fitView(L, W, H, keepAngles) {
    var as = camera.aspect || 1.6;
    // 调试开关：URL 带 #near 时拉近取景（仅开发验证用，不影响正常访问）
    var nearK = (String(window.location.hash || '').indexOf('near') >= 0) ? 0.45 : 1;
    if (!keepAngles) {
      ctrl.theta = (L > W * 1.5) ? Math.PI * 0.63 : Math.PI * 0.70;
      ctrl.phi = (L > W * 1.5) ? Math.PI * 0.29 : Math.PI * 0.32;
    }

    var tanV = Math.tan((camera.fov * Math.PI / 180) / 2);
    var tanH = tanV * as;

    var corners = [];
    [-1, 1].forEach(function (sx) {
      [0, 1].forEach(function (sy) {
        [-1, 1].forEach(function (sz) {
          corners.push(new THREE.Vector3(sx * L / 2, sy * H, sz * W / 2));
        });
      });
    });

    ctrl.target.set(0, H * 0.5, 0);

    // 迭代：先求最小可视距离，再把投影包围盒中心推回画面中心
    for (var it = 0; it < 5; it++) {
      var b = basis();
      var need = 0;
      corners.forEach(function (P) {
        var p = P.clone().sub(ctrl.target);
        need = Math.max(need,
          p.dot(b.dir) + Math.abs(p.dot(b.right)) / tanH,
          p.dot(b.dir) + Math.abs(p.dot(b.up)) / tanV);
      });

      var d = need * 1.03;
      var minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
      corners.forEach(function (P) {
        var p = P.clone().sub(ctrl.target);
        var depth = Math.max(0.001, d - p.dot(b.dir));
        var cx = p.dot(b.right) / depth / tanH;
        var cy = p.dot(b.up) / depth / tanV;
        if (cx < minX) minX = cx;
        if (cx > maxX) maxX = cx;
        if (cy < minY) minY = cy;
        if (cy > maxY) maxY = cy;
      });

      ctrl.fitR = d; ctrl.r = d * nearK;

      var ox = (minX + maxX) / 2, oy = (minY + maxY) / 2;
      if (Math.abs(ox) < 0.004 && Math.abs(oy) < 0.004) break;

      ctrl.target.addScaledVector(b.right, ox * d * tanH);
      ctrl.target.addScaledVector(b.up, oy * d * tanV);
    }

    applyCamera();
  }

  // ---------- 交互 ----------
  var drag = null;
  canvas.style.touchAction = 'none';
  canvas.addEventListener('contextmenu', function (e) { e.preventDefault(); });

  canvas.addEventListener('pointerdown', function (e) {
    canvas.setPointerCapture(e.pointerId);
    drag = { x: e.clientX, y: e.clientY, btn: e.button, pan: (e.button === 2 || e.shiftKey) };
  });
  canvas.addEventListener('pointermove', function (e) {
    if (!drag) return;
    var dx = e.clientX - drag.x, dy = e.clientY - drag.y;
    drag.x = e.clientX; drag.y = e.clientY;
    if (drag.pan) {
      var right = new THREE.Vector3().setFromMatrixColumn(camera.matrix, 0);
      var up = new THREE.Vector3().setFromMatrixColumn(camera.matrix, 1);
      var k = ctrl.r * 0.0014;
      ctrl.target.addScaledVector(right, -dx * k);
      ctrl.target.addScaledVector(up, dy * k);
    } else {
      ctrl.theta -= dx * 0.0062;
      ctrl.phi = Math.max(0.1, Math.min(1.5, ctrl.phi - dy * 0.0055));
    }
    applyCamera();
  });
  function endDrag(e) { if (drag) { try { canvas.releasePointerCapture(e.pointerId); } catch (err) {} drag = null; } }
  canvas.addEventListener('pointerup', endDrag);
  canvas.addEventListener('pointercancel', endDrag);

  canvas.addEventListener('wheel', function (e) {
    e.preventDefault();
    ctrl.r = Math.max(ctrl.fitR * 0.12, Math.min(ctrl.fitR * 4, ctrl.r * (1 + Math.sign(e.deltaY) * 0.1)));
    applyCamera();
  }, { passive: false });

  // ---------- 工具按钮 ----------
  var ui = { purlin: true, roof: true, clad: true, spin: false };
  var toolsEl = document.getElementById('s3dTools');
  if (toolsEl) {
    toolsEl.addEventListener('click', function (e) {
      var b = e.target.closest('.s3d-btn');
      if (!b) return;
      var k = b.dataset.t3d;
      if (k === 'reset') {
        var s = S(); if (s) fitView(s.length, s.width, s.height, false);
        else applyCamera();
        return;
      }
      if (k === 'spin') {
        ui.spin = !ui.spin; b.classList.toggle('active', ui.spin); return;
      }
      ui[k] = !ui[k];
      b.classList.toggle('active', ui[k]);
      if (k === 'purlin') gPurlin.visible = ui.purlin;
      if (k === 'roof') gRoof.visible = ui.roof;
      if (k === 'clad') gClad.visible = ui.clad;
    });
  }

  // ---------- 建模 ----------
  var lastDims = '';
  var cur = { L: 0, W: 0, H: 0 };

  function clearGroup(g) {
    for (var i = g.children.length - 1; i >= 0; i--) g.remove(g.children[i]);
  }

  function build(s) {
    if (!s) return;
    var L = Math.max(1, s.length), W = Math.max(1, s.width), H = Math.max(1, s.height);
    var cs = Math.max(1, s.columnSpacing || 6);
    var rise = Math.min(W * 0.5 * 0.105, 2.8);
    var ridgeY = H + rise;

    disposeAll();
    clearGroup(root);
    clearGroup(gPurlin); clearGroup(gRoof); clearGroup(gClad); clearGroup(gOpening);
    root.add(gPurlin); root.add(gRoof); root.add(gClad); root.add(gOpening);

    var tapered = (s.sectionType !== 'constant');
    var doubleSpan = !!s.hasMiddleColumn;

    // —— 地面 ——
    var footprint = Math.max(L, W);
    var gridSize = footprint * 1.1;
    var div = Math.max(6, Math.min(64, Math.round(gridSize / 2)));
    var gsize = gridSize * 1.2;
    var ground = mesh(track(new THREE.PlaneGeometry(gsize, gsize)), MAT.ground, root);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.02;

    var grid = new THREE.GridHelper(gridSize, div, 0x39414A, 0x1B2128);
    grid.position.y = 0;
    grid.material.transparent = true;
    grid.material.opacity = 0.55;
    track(grid.geometry); track(grid.material);
    root.add(grid);

    // —— 刚架榀数 ——
    var nFrames = Math.max(2, Math.floor(L / cs) + 1);
    if (s.result && s.result.main && s.result.main.numCols) {
      nFrames = Math.max(2, s.result.main.numCols);
    }
    var dx = L / (nFrames - 1);
    var x0 = -L / 2;

    // 柱截面（H 型钢：h=腹板高，cw=翼缘宽）
    // 变截面柱：小头在下、大头在上（柱顶与梁节点弯矩大）
    var cw = 0.30;                          // 翼缘宽（沿 X）
    var cdB = tapered ? 0.38 : 0.44;        // 柱底腹板高（沿 Z）——小头
    var cdT = tapered ? 0.62 : 0.44;        // 柱顶腹板高——大头
    // 梁截面（H 型钢：变截面时梁根高 → 梁端高；2026-09-27 起读引擎真实截面尺寸）
    var bw = 0.26, bdB = tapered ? 0.80 : 0.52, bdT = tapered ? 0.50 : 0.52;
    if (s.result && s.result.main && s.result.main.beam && s.result.main.beam.Hk) {
      var bDim = s.result.main.beam;
      bw = bDim.B / 1000;
      if (tapered) { bdB = bDim.Hk / 1000; bdT = bDim.Hr / 1000; }
      else { bdB = bDim.Hk / 1000; bdT = bDim.Hk / 1000; }
    }
    // H 型钢板厚（真实板厚 8~14mm 在 60m 尺度下不足 1px，此处适度夸张以保证成型）
    var twCol = 0.055, tfCol = 0.085;       // 柱：腹板厚 / 翼缘厚
    var twBeam = 0.055, tfBeam = 0.085;     // 梁：腹板厚 / 翼缘厚

    // 梁分段比例（与引擎同公式）：弯矩从檐口向屋脊抛物线衰减，
    // 需求梁高 h(t)=Hr+(Hk−Hr)(1−t)² 降到端部高 1.05 倍处改直梁
    var bFrac = 0.66;
    if (tapered && s.result && s.result.main && s.result.main.beam && s.result.main.beam.Hk) {
      var bInfo = s.result.main.beam;
      bFrac = Math.min(0.9, Math.max(0.3,
        1 - Math.sqrt(0.05 * bInfo.Hr / (bInfo.Hk - bInfo.Hr))));
    }

    var zEaveL = -W / 2, zEaveR = W / 2, zRidge = 0;

    // —— 屋面坡度与梁标高基准 ——
    // 定位基准 = 梁的**上翼缘顶面**：檐口 = H（即柱顶标高 / 檐口标高），屋脊 = H + rise；
    // 梁中心线 = 上翼缘顶面沿坡面法向（朝室内下方）平移半个梁高
    var slopeLen = Math.sqrt(rise * rise + (W / 2) * (W / 2));
    var slopeAng = Math.atan2(rise, W / 2);
    var cosA = Math.cos(slopeAng), sinA = Math.sin(slopeAng);
    function beamTopYAt(z) { return H + rise * (1 - Math.abs(z) / (W / 2)); }
    // 该处梁腹板高（分段式：楔形段内线性衰减，直梁段恒 bdT）
    function beamHAt(z) {
      var t = 1 - Math.abs(z) / (W / 2);
      if (t >= bFrac) return bdT;
      return bdB + (bdT - bdB) * (t / bFrac);
    }
    function beamCenterYAt(z) { return beamTopYAt(z) - beamHAt(z) / 2 * cosA; }
    function beamBotYAt(z) { return beamTopYAt(z) - beamHAt(z) * cosA; }

    // —— 各榀刚架 ——
    for (var i = 0; i < nFrames; i++) {
      var x = x0 + i * dx;

      // 边柱
      var cL = hMember(new THREE.Vector3(x, 0, zEaveL), new THREE.Vector3(x, H, zEaveL), cdB, cw, cdT, cw, twCol, tfCol, MAT.steel, root);
      var cR = hMember(new THREE.Vector3(x, 0, zEaveR), new THREE.Vector3(x, H, zEaveR), cdB, cw, cdT, cw, twCol, tfCol, MAT.steel, root);
      if (cL) cL.castShadow = true;
      if (cR) cR.castShadow = true;

      // 柱脚底板
      mesh(box(0.62, 0.06, 0.62), MAT.steelMid, root).position.set(x, 0.03, zEaveL);
      mesh(box(0.62, 0.06, 0.62), MAT.steelMid, root).position.set(x, 0.03, zEaveR);

      if (doubleSpan) {
        // 中柱（升至屋脊）
        var cM = hMember(new THREE.Vector3(x, 0, zRidge), new THREE.Vector3(x, ridgeY, zRidge), cdB, cw, cdT, cw, twCol, tfCol, MAT.steelMid, root);
        if (cM) cM.castShadow = true;
        mesh(box(0.62, 0.06, 0.62), MAT.steelMid, root).position.set(x, 0.03, zRidge);
      }

      // 屋面梁：上翼缘顶面沿檐口 H → 屋脊 H+rise（柱顶 = 梁顶 = 檐口标高）；
      // 每坡分两段 —— 楔形段（檐口侧 bdB→bdT）+ 直梁段（屋脊侧恒 bdT）
      function rafter(sign) {
        var nOut = new THREE.Vector3(0, cosA, sign * sinA);             // 坡面外法向
        var eave = new THREE.Vector3(x, H, sign * W / 2).addScaledVector(nOut, -bdB / 2);
        var ridge = new THREE.Vector3(x, ridgeY, 0).addScaledVector(nOut, -bdT / 2);
        if (tapered) {
          var seamDir = new THREE.Vector3().subVectors(ridge, eave).normalize();
          var tm = new THREE.Vector3().lerpVectors(eave, ridge, bFrac);   // 分段转换点
          var g1 = hMember(eave, tm.clone().addScaledVector(seamDir, -0.01),
            bdB, bw, bdT, bw, twBeam, tfBeam, MAT.steel, root);
          var g2 = hMember(tm.clone().addScaledVector(seamDir, 0.01), ridge,
            bdT, bw, bdT, bw, twBeam, tfBeam, MAT.steel, root);
          if (g1) g1.castShadow = true;
          if (g2) g2.castShadow = true;
        } else {
          var g0 = hMember(eave, ridge, bdB, bw, bdT, bw, twBeam, tfBeam, MAT.steel, root);
          if (g0) g0.castShadow = true;
        }
      }
      rafter(-1);
      rafter(1);
    }

    // —— 山墙方向抗风柱（沿宽度均分，柱距 ≤ 7.5m）——
    // 工艺：抗风柱 = 山墙上"非端部"的中间立柱，端部位置 -W/2、+W/2 已被角柱占用
    // 截面按柱顶高度自动选：<6m=H250×125，6~12m=H300×150，≥12m=随主柱
    // 顶部接到屋面梁下翼缘底（坡度跟随：山尖高、檐口低）
    var windColSpec = function (ht) {
      if (ht >= 12) return { h: cdT, b: cw, tw: twCol, tf: tfCol };
      if (ht >= 6)  return { h: 0.30, b: 0.15, tw: 0.030, tf: 0.045 };
      return { h: 0.25, b: 0.125, tw: 0.025, tf: 0.040 };
    };
    var nWindTotal = Math.max(2, Math.ceil(W / 7.5) + 1);   // 沿宽度等分总位置数（含两端角柱位）
    var windStep = W / (nWindTotal - 1);                      // 实际间距（≤ 7.5m）
    var windZs = [];
    for (var wk = 1; wk < nWindTotal - 1; wk++) windZs.push(-W / 2 + wk * windStep);
    [-L / 2, L / 2].forEach(function (wx) {
      windZs.forEach(function (wz) {
        var topY = beamBotYAt(wz) - 0.05;                     // 顶在屋面梁下翼缘底
        if (topY < 0.5) topY = 0.5;
        var sp = windColSpec(topY);
        var wcM = hMember(
          new THREE.Vector3(wx, 0, wz),
          new THREE.Vector3(wx, topY, wz),
          sp.h, sp.b, sp.h, sp.b,
          sp.tw, sp.tf, MAT.steel, root
        );
        // 翼缘旋转 90° 平行于山墙（默认 hMember 翼缘沿 X，需转到 Z）
        if (wcM) { wcM.castShadow = true; wcM.rotation.y = Math.PI / 2; }
        // 抗风柱底板
        mesh(box(0.40, 0.04, 0.40), MAT.steelMid, root).position.set(wx, 0.02, wz);
      });
    });

    // —— 行车（吊车梁 + 牛腿 + 轨道）2026-09-28 r40 ——
    // 吊车梁沿纵墙通长、位于柱内侧（牛腿挑出 0.45m），轨顶标高取引擎值
    if (s.hasCrane && s.result && s.result.crane && s.result.crane.on) {
      var cr = s.result.crane;
      var railY = cr.railH;                       // 轨顶标高 (m)
      var bh2 = cr.beam.h / 1000;                 // 吊车梁高 (m)
      var bb2 = cr.beam.B / 1000;                 // 翼缘宽 (m)
      var bTop = railY - 0.12;                    // 梁顶（轨道垫层下）
      var bCen = bTop - bh2 / 2;
      var q90 = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2);
      var beamZs = [-(W / 2 - 0.45), (W / 2 - 0.45)];
      beamZs.forEach(function (bz) {
        var g = hMember(new THREE.Vector3(x0 - 0.15, bCen, bz),
                        new THREE.Vector3(x0 + L + 0.15, bCen, bz),
                        bh2, bb2, bh2, bb2, 0.05, 0.075, MAT.steelMid, root);
        // hMember 默认腹板高沿 Z、翼缘沿 X；吊车梁需绕自身轴线转 90° 立起来
        if (g) { g.quaternion.multiply(q90); g.castShadow = true; }
        // 轨道（示意，不计工程量）
        var rail = mesh(box(L + 0.3, 0.10, 0.13), MAT.trim, root);
        rail.position.set(0, bTop + 0.05, bz);
      });
      // 牛腿：每榀柱、每侧 1 个，从柱身挑出托住吊车梁底
      for (var ci = 0; ci < nFrames; ci++) {
        var cx2 = x0 + ci * dx;
        beamZs.forEach(function (bz) {
          var dir = (bz > 0) ? 1 : -1;
          var cg = mesh(box(0.20, Math.max(0.26, bh2 * 0.95), 0.30), MAT.steelMid, root);
          cg.position.set(cx2, bCen - 0.03, bz + dir * 0.23);
        });
      }
    }

    // —— 屋面檩条（C 型钢，贴着刚架梁上翼缘的外侧）——
    // 工艺：屋脊两侧各 200mm 处为第一根檩条，向外按 ≤rps 均分到檐口（离檐口 150mm）；
    //       2026-09-27 康师傅确认：带女儿墙不再省檐口檩（内天沟托架+檐口檩双支承），两场景口径一致
    var rps = Math.max(0.6, s.roofPurlinSpacing || 1.5);
    var parapetOn = !!(s.hasParapet && s.parapetHeight > 0);
    var ridgeCleatOff = 0.2;                                    // 第一根檩条距屋脊（坡长方向）
    var eaveEndOff = 0.15;                                      // 檐口檩条离檐口
    var availSlope = Math.max(0.4, (slopeLen - eaveEndOff) - ridgeCleatOff);
    var nPurlinInt = Math.max(1, Math.ceil(availSlope / rps));   // 区间数
    var purlinStep = availSlope / nPurlinInt;                    // 实际间距 ≤ rps
    var sPurlins = [];
    for (var pk = 0; pk <= nPurlinInt; pk++) sPurlins.push(ridgeCleatOff + pk * purlinStep);
    var nPurlin = sPurlins.length;
    // C 型檩条截面：腹板高 / 翼缘宽 / 壁厚
    var pcH = 0.20, pcB = 0.085, pcT = 0.016;
    // 墙梁截面尺寸跟随引擎墙梁规格（按柱距选 C120/C140/…/C180），未取到时按 C180 画
    // （提前到这里：屋面檩条/纵墙墙梁的端部外伸量要用到墙梁高度）
    var girtHm = (s.result && s.result.wallPurlin && s.result.wallPurlin.purlin && s.result.wallPurlin.purlin.h)
      ? s.result.wallPurlin.purlin.h / 1000 : 0.18;
    var wcH = girtHm, wcB = girtHm * 0.42, wcT = 0.014;
    // 四边构件端部延长：与对面墙梁外皮齐平，角部搭接成闭合圈
    var extX = cw / 2 + wcH + 0.012;                            // 纵墙墙梁/屋面檩条端部外伸（X 向）
    var purlinGeoC = cPurlinGeom(pcH, pcB, pcT, L + 2 * extX);
    var xAxisW = new THREE.Vector3(1, 0, 0);
    var zAxisW = new THREE.Vector3(0, 0, 1);
    var cleatGeoR = box(0.10, 0.20, 0.012);                      // 檩托板（屋面：竖直小钢板）
    var boltHeadGeo = track(new THREE.CylinderGeometry(0.012, 0.012, 0.016, 12)); // 螺栓头（M24 头部示意）

    function addPurlinsOnSlope(sign) {
      var seamGeoR = box(0.014, pcH + 0.012, pcB + 0.02);       // 分段断缝示意（按柱距分段下料）
      sPurlins.forEach(function (sd) {
        // sd = 距屋脊的坡长 → t（t=1 屋脊，t=0 檐口）
        var t = 1 - sd / slopeLen;
        var pz = sign * (W / 2) * (1 - t);
        var py = beamTopYAt(pz);                                 // 梁上翼缘顶面标高
        // 立放 C 型檩条：腹板竖直、直接坐在梁上翼缘顶面；
        //   本地 +Z（长度方向）→ 世界 X（sign 保证 handedness 一致）；
        //   本地 +X（开口方向）→ (0,0,-sign) 即指向屋脊（左坡开口向右、右坡开口向左，左右对称）；
        //   本地 +Y（腹板高 0.20）= axis×xAxis = (0,1,0) 恒竖直向上
        orientedMesh(purlinGeoC, MAT.purlin, gPurlin,
          new THREE.Vector3(0, py + pcH / 2, pz),
          new THREE.Vector3(sign, 0, 0), new THREE.Vector3(0, 0, -sign)).castShadow = true;
        // 檩托板 + 螺栓：每榀刚架处，托板贴檩条腹板背侧（背离屋脊/檐口侧一面）螺栓连接
        for (var fi = 0; fi < nFrames; fi++) {
          var fx = x0 + fi * dx;
          var cR = mesh(cleatGeoR, MAT.steelMid, gPurlin);
          cR.position.set(fx, py + 0.10, pz + sign * (pcB / 2 + 0.006));
          // 4 颗螺栓头（2026-09-27 康师傅口径：每块檩托板4颗）：2列×2行，头部露在托板外侧
          for (var bi = -1; bi <= 1; bi += 2) {
            for (var bj = -1; bj <= 1; bj += 2) {
              var bt = mesh(boltHeadGeo, MAT.bolt, gPurlin);
              bt.rotation.x = Math.PI / 2;
              bt.position.set(fx + bj * 0.028, py + 0.10 + bi * 0.055, pz + sign * (pcB / 2 + 0.012 + 0.006));
            }
          }
          // 分段断缝（2026-09-27 康师傅口径：檩条按柱距分段下料，柱轴线处断开）
          var sm = mesh(seamGeoR, MAT.seam, gPurlin);
          sm.position.set(fx, py + pcH / 2, pz);
        }
      });
    }
    addPurlinsOnSlope(-1);
    addPurlinsOnSlope(1);

    // —— 拉条体系（2026-09-27 与引擎实算同口径：每柱距每坡直拉条 + 每榀隅撑）——
    function tieRod3(a, b, rad) {
      var dir = new THREE.Vector3().subVectors(b, a);
      var len = dir.length();
      var m = mesh(track(new THREE.CylinderGeometry(rad, rad, len, 6)), MAT.brace, gPurlin);
      m.position.copy(a).addScaledVector(dir, 0.5);
      m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
      return m;
    }
    (function tieRods() {
      var sdMin = sPurlins[0];
      sPurlins.forEach(function (sd) { if (sd < sdMin) sdMin = sd; });
      // 檐口锚固点：末根檩位（2026-09-27 檐口檩恢复，两场景统一锚到末根檩）
      var sdMax = ridgeCleatOff + nPurlinInt * purlinStep;
      [-1, 1].forEach(function (sign) {
        function ptAt(sd) {
          var t = 1 - sd / slopeLen;
          var pz = sign * (W / 2) * (1 - t);
          return new THREE.Vector3(0, beamTopYAt(pz) + pcH / 2, pz);
        }
        // 直拉条：每柱距 1 根（柱距中点，檐口第一檩 ↔ 屋脊檩腹板中线）
        var pa = ptAt(sdMax), pb = ptAt(sdMin);
        for (var bi2 = 0; bi2 < nFrames - 1; bi2++) {
          var mx = x0 + (bi2 + 0.5) * dx;
          tieRod3(new THREE.Vector3(mx, pa.y, pa.z), new THREE.Vector3(mx, pb.y, pb.z), 0.012);
        }
        // 隅撑：每榀每坡 2 根（坡向 1/3、2/3 附近檩条处，梁下翼缘 ↔ 檩条腹板）
        [1, 2].forEach(function (k3) {
          var target = slopeLen * k3 / 3, sdNear = sPurlins[0];
          sPurlins.forEach(function (sd) { if (Math.abs(sd - target) < Math.abs(sdNear - target)) sdNear = sd; });
          var t2 = 1 - sdNear / slopeLen, pz2 = sign * (W / 2) * (1 - t2);
          var py2 = beamTopYAt(pz2);
          for (var fi2 = 0; fi2 < nFrames; fi2++) {
            var fx = x0 + fi2 * dx;
            tieRod3(new THREE.Vector3(fx, py2 - 0.40, pz2 - sign * 0.55),
                    new THREE.Vector3(fx, py2 + pcH * 0.7, pz2), 0.014);
          }
        });
      });
    })();

    // —— 门洞位置（先算出来，墙梁/墙板/窗都要用）——
    // 与引擎共用 layoutDoorBaysM：避开柱间支撑跨，从两侧第一个无支撑跨起向中间排
    var doorSegsX = [];  // [{x0, x1, z}]
    var nDoor = Math.max(0, parseInt(s.doorCount, 10) || 0);
    var dW = Math.max(0.5, s.doorWidth || 4.5);
    if (nDoor >= 1) {
      var dseg = (typeof layoutDoorBaysM === 'function')
        ? layoutDoorBaysM(L, cs, dW, nDoor, s.doorOnWall)
        : { front: [], back: [] };
      dseg.front.forEach(function (sg) { doorSegsX.push({ x0: sg[0], x1: sg[1], z: zEaveL }); });
      dseg.back.forEach(function (sg) { doorSegsX.push({ x0: sg[0], x1: sg[1], z: zEaveR }); });
    }
    function doorCutsAt(z) {
      return doorSegsX.filter(function (sg) { return sg.z === z; })
        .map(function (sg) { return [sg.x0, sg.x1]; })
        .sort(function (a, b) { return a[0] - b[0]; });
    }

    // —— 墙面檩条 / 墙梁（C 型钢，布置在刚架柱的外侧）——
    // 工艺：下方 1.2m 是 24 砖墙，钢墙梁从砖墙顶上开始布置；
    //       在 [砖墙顶, 柱顶] 范围内按 ≤1.5m 均分；最底下一道开口朝上托墙板
    var masonryH = 1.2;                                       // 24 砖墙高
    var wps = Math.max(0.6, s.wallPurlinSpacing || 1.5);      // 墙檩最大间距（UI 可调，默认 1.5m）
    // 首根紧贴砖墙顶（1.2m），末根在檐口下 5cm（H-0.05），中间按 ≤wps 均分
    var girtTop = Math.max(masonryH + 0.3, H - 0.05);
    var girtTotal = girtTop - masonryH;
    var nSeg = Math.max(1, Math.ceil(girtTotal / wps));       // 分段数
    var step = girtTotal / nSeg;                              // 实际间距（≤wps）
    // 墙梁截面尺寸已在屋面檩条段提前取定（wcH/wcB/wcT）
    var xDirDown = new THREE.Vector3(0, -1, 0);     // 常规：开口朝下
    var xDirUp = new THREE.Vector3(0, 1, 0);        // 最底下一道：开口朝上托墙板

    // —— 墙梁标高线（门窗洞口上下边对齐所在标高的墙梁 = 借用墙梁作框）——
    var girtYs = [];
    for (var gj = 0; gj <= nSeg; gj++) girtYs.push(Math.min(masonryH + step * gj, H - 0.02));
    function snapGirtUp(y) {                        // ≥y 的最近墙梁标高
      var r = girtYs[girtYs.length - 1];
      girtYs.forEach(function (g) { if (g >= y - 0.01 && g < r) r = g; });
      return r;
    }
    function snapGirtDown(y) {                      // ≤y 的最近墙梁标高
      var r = girtYs[0];
      girtYs.forEach(function (g) { if (g <= y + 0.01 && g > r) r = g; });
      return r;
    }
    // 门高对齐墙梁线：顶框借用该处墙梁（不另设顶横杆；落地无底框）
    var doorTopY = snapGirtDown(Math.max(1.5, s.doorHeight || 5.5));
    // 窗竖向范围：底/顶均对齐墙梁标高线（上下边借用墙梁，中间穿窗的墙梁断开）
    var ww = Math.max(0.5, s.winWidth || 2.0);
    var sill = Math.max(0, s.sillHeight || 1.2);
    var winBot = snapGirtUp(sill);
    var winTop = snapGirtUp(sill + Math.max(0.3, (H - 1.5 - (s.hasParapet && s.parapetHeight > 0 ? 1.5 : 0)) - sill));
    if (winTop - winBot < 0.6) winTop = snapGirtUp(winBot + 0.6);   // 兜底：至少一个墙梁格
    var winH = winTop - winBot;
    var winY = (winBot + winTop) / 2;
    var minBay = ww + 0.4;
    // —— 窗洞位置先算出来（墙梁按此在窗洞两侧断开）——
    function windowSegsAlongX(z) {
      var segsHere = doorSegsX.filter(function (sg) { return sg.z === z; });
      var out = [];
      for (var i = 0; i < nFrames - 1; i++) {
        var bx0 = x0 + i * dx, bx1 = x0 + (i + 1) * dx;
        if (bx1 - bx0 < minBay) continue;                 // 柱距太小放不下窗
        var taken = false;                                 // 门的柱距整格让给门
        for (var j = 0; j < segsHere.length; j++) {
          if (segsHere[j].x0 < bx1 - 0.01 && segsHere[j].x1 > bx0 + 0.01) { taken = true; break; }
        }
        if (taken) continue;
        var c = (bx0 + bx1) / 2;
        out.push({ x0: c - ww / 2, x1: c + ww / 2, z: z });
      }
      return out;
    }
    var gableZs = [-W / 2].concat(windZs, [W / 2]);
    function windowSegsAlongZ(x) {
      var out = [];
      for (var i = 0; i < gableZs.length - 1; i++) {
        var bz0 = gableZs[i], bz1 = gableZs[i + 1];
        if (bz1 - bz0 < minBay) continue;
        var c = (bz0 + bz1) / 2;
        out.push({ z0: c - ww / 2, z1: c + ww / 2, x: x });
      }
      return out;
    }
    var windowSegsX = windowSegsAlongX(zEaveL).concat(windowSegsAlongX(zEaveR));
    var windowSegsZ = windowSegsAlongZ(-L / 2).concat(windowSegsAlongZ(L / 2));

    // 沿 X 的墙梁：两端外伸到山墙墙梁外皮（闭合圈）；遇门洞（低于门顶标高线）断开；
    // 遇窗洞（洞口内部标高线，不含借用的上下边）在窗洞两侧断开
    function placeGirtX(z, offZ, y, xDir) {
      var cuts = [];
      if (y < doorTopY - 0.05) cuts = cuts.concat(doorCutsAt(z));
      if (y > winBot + 0.03 && y < winTop - 0.03) {
        windowSegsX.forEach(function (ws2) {
          if (Math.abs(ws2.z - z) < 0.01) cuts.push([ws2.x0, ws2.x1]);
        });
      }
      cuts.sort(function (a, b) { return a[0] - b[0]; });
      var xA = -L / 2 - extX, xB = L / 2 + extX;
      var spans = [], cur = xA;
      cuts.forEach(function (c) {
        if (c[0] > cur + 0.05) spans.push([cur, c[0]]);
        if (c[1] > cur) cur = c[1];
      });
      if (cur < xB - 0.05) spans.push([cur, xB]);
      spans.forEach(function (sp) {
        var len = sp[1] - sp[0];
        if (len < 0.25) return;
        var cx = (sp[0] + sp[1]) / 2;
        orientedMesh(track(cPurlinGeom(wcH, wcB, wcT, len)), MAT.purlin, gPurlin,
          new THREE.Vector3(cx, y, z + offZ), xAxisW, xDir);
      });
    }
    // 沿 Z 的山墙墙梁：整根长 lenZ（两端到纵墙梁外皮），遇窗洞同样断开
    function placeGirtZ(x, y, xDir, lenZ) {
      var cuts = [];
      if (y > winBot + 0.03 && y < winTop - 0.03) {
        windowSegsZ.forEach(function (ws3) {
          if (Math.sign(ws3.x) === Math.sign(x)) cuts.push([ws3.z0, ws3.z1]);
        });
      }
      cuts.sort(function (a, b) { return a[0] - b[0]; });
      var zA = -lenZ / 2, zB = lenZ / 2;
      var spans = [], cur = zA;
      cuts.forEach(function (c) {
        if (c[0] > cur + 0.05) spans.push([cur, c[0]]);
        if (c[1] > cur) cur = c[1];
      });
      if (cur < zB - 0.05) spans.push([cur, zB]);
      spans.forEach(function (sp) {
        var len = sp[1] - sp[0];
        if (len < 0.25) return;
        orientedMesh(track(cPurlinGeom(wcH, wcB, wcT, len)), MAT.purlin, gPurlin,
          new THREE.Vector3(x, y, (sp[0] + sp[1]) / 2), zAxisW, xDir);
      });
    }

    // —— 墙梁统一平面（2026-09-26）：全部对齐「柱顶截面」最外皮 ——
    // 变截面柱小头在下大头在上：旧代码墙梁贴柱面阶梯外移，檐口附近墙梁戳穿墙板；
    // 现统一到最外皮平面（colFaceZ），彩钢永远在墙梁外侧（康师傅确认）
    var colFaceZ = Math.max(cdT, cdB) / 2;
    for (var gi = 0; gi <= nSeg; gi++) {
      // 首根在砖墙顶（1.2m），末根在檐口下 5cm，中间等分
      var gy = masonryH + step * gi;
      if (gy > H - 0.02) gy = H - 0.02;
      // 该高度处的柱截面半尺寸（变截面柱：柱底 cdB → 柱顶 cdT），檩托板起点用
      var colHalfZ = (cdB + (cdT - cdB) * (gy / H)) / 2;
      var colHalfX = cw / 2;
      var offZ = colFaceZ + wcH / 2 + 0.012;
      var offX = colHalfX + wcH / 2 + 0.012;
      var xDirBottom = (gi === 0) ? xDirUp : xDirDown;      // 最底下 gi=0 反向
      // 纵墙两侧
      placeGirtX(zEaveL, -offZ, gy, xDirBottom);
      placeGirtX(zEaveR, offZ, gy, xDirBottom);
      // 山墙两侧：两端外伸到纵墙墙梁外皮（闭合圈），遇窗洞断开
      var lenZ = W + 2 * (offZ + wcH / 2);
      placeGirtZ(-L / 2 - offX, gy, xDirBottom, lenZ);
      placeGirtZ(L / 2 + offX, gy, xDirBottom, lenZ);
      // 檩托板：柱面 → 统一墙梁平面（变截面柱下部空隙由托板补长，板厚沿 X）
      var cleatLenZ = colFaceZ - colHalfZ + 0.042;        // 柱面内嵌1.5cm → 墙梁腹板外嵌1.5cm
      var cleatGeoW = box(0.10, wcH * 0.9, cleatLenZ);
      var cleatCz = (colHalfZ + colFaceZ + 0.012) / 2;    // 托板中心距柱轴线
      var cleatGeoG = box(0.012, wcH * 0.9, 0.10);            // 山墙：板厚沿 X
      var seamGeoW = box(0.014, wcH + 0.012, wcB + 0.02);      // 纵墙梁分段断缝示意
      for (var ci = 0; ci < nFrames; ci++) {
        var cx2 = x0 + ci * dx;
        mesh(cleatGeoW, MAT.steelMid, gPurlin).position.set(cx2, gy, zEaveL - cleatCz);
        mesh(cleatGeoW, MAT.steelMid, gPurlin).position.set(cx2, gy, zEaveR + cleatCz);
        // 纵墙梁断缝（按柱距分段下料）
        mesh(seamGeoW, MAT.seam, gPurlin).position.set(cx2, gy, zEaveL - offZ);
        mesh(seamGeoW, MAT.seam, gPurlin).position.set(cx2, gy, zEaveR + offZ);
      }
      [-L / 2, L / 2].forEach(function (gx2) {
        var outw = (gx2 < 0) ? -1 : 1;
        windZs.forEach(function (wzc) {
          mesh(cleatGeoG, MAT.steelMid, gPurlin).position.set(gx2 + outw * (colHalfX + 0.05), gy, wzc);
        });
      });
    }

    // —— 四角包角基准（2026-09-27 康师傅：四周边角对齐·山墙包角）——
    // 山墙板/砖墙/女儿墙 Z 向延长到纵墙板外皮，纵墙板 X 向延长到山墙板外皮 → 转角榫接闭合（任何角度无缝）
    var _ct = 0.05;                                          // 墙板厚（与下方 cladTh 同值，提前定义供屋面用）
    var extX = cw / 2 + wcH + _ct + 0.015;                   // 山墙板外皮距柱轴线（X 向）≈ cladOffX + cladTh/2
    var extZ = colFaceZ + wcH + _ct + 0.015;                  // 纵墙板外皮距柱轴线（Z 向）≈ cladOffZ + cladTh/2

    // —— 屋面板（坐在立放檩条上翼缘之上，与坡面平行；X 向延长到山墙板外皮，四角对齐）——
    // 2026-09-27 康师傅确认：无女儿墙檐口出挑 0.3m（坡向延伸+封檐板），带女儿墙不出挑（内天沟）
    var OVH = parapetOn ? 0 : 0.3;                 // 檐口出挑（水平投影）
    var ovS = OVH / cosA;                          // 沿坡向延伸长度
    function roofPanel(sign) {
      var g = track(new THREE.BoxGeometry(L + 2 * extX, 0.04, slopeLen + ovS));
      var m = mesh(g, MAT.roof, gRoof);
      var cz = sign * (W / 2) * 0.5;                             // 原坡中点
      var cy = beamTopYAt(cz) + pcH + 0.045;                    // 梁顶 + 檩条高 + 安装间隙
      m.position.set(0, cy - (ovS / 2) * sinA, cz + sign * (ovS / 2) * cosA);  // 沿坡向外移半段
      m.rotation.x = sign * slopeAng;
      if (!parapetOn) {
        // 封檐板：檐口竖向收边，顶面接屋面板端头下缘（板中线下 0.02），下探 0.3m，亮银白
        var eaveY = beamTopYAt(sign * W / 2) + pcH + 0.045 - OVH * (sinA / cosA);   // 檐口端面板中线高
        var fz = mesh(track(new THREE.BoxGeometry(L + 2 * extX, 0.30, 0.03)), MAT.trim, gRoof);
        fz.position.set(0, eaveY - 0.17, sign * (W / 2 + OVH) + sign * 0.012);
      }
    }
    roofPanel(-1); roofPanel(1);

    // —— 采光带（2026-09-27 康师傅口径）：FRP 半透明白，每道宽 1.0m 沿坡向通铺（檐口→屋脊），屋脊对称 ——
    // 1 道 = 每坡各 1 条（建筑长度居中）；2 道 = 每坡各 2 条（沿长度均布）。贴屋面板上皮，微抬防 z-fighting。
    var dlCount = Math.max(0, Math.min(2, (s.daylightCount != null ? s.daylightCount : 1)));
    if (dlCount > 0) {
      [-1, 1].forEach(function (sign) {
        for (var dk = 0; dk < dlCount; dk++) {
          var dxp = dlCount === 1 ? 0 : (dk === 0 ? -L / 4 : L / 4);   // 沿长度方向位置
          var gdl = track(new THREE.BoxGeometry(1.0, 0.012, slopeLen + ovS));
          var mdl = mesh(gdl, MAT.daylight, gRoof);
          var cz0 = sign * (W / 2) * 0.5;
          var cy0 = beamTopYAt(cz0) + pcH + 0.045 + 0.028;             // 屋面板上皮 + 0.8mm 抬高
          mdl.position.set(dxp, cy0 - (ovS / 2) * sinA, cz0 + sign * (ovS / 2) * cosA);
          mdl.rotation.x = sign * slopeAng;
        }
      });
    }

    // —— 屋脊瓦（2026-09-27 康师傅）：沿屋脊通长小屋脊盖（两片斜板扣在两坡屋面板交汇处，银白同屋面）——
    var capD = 0.50, capT = 0.025;                            // 每片沿坡向覆盖长度 / 脊瓦板厚（2026-09-27 加大到 0.5m 更醒目）
    var ridgeApexY = beamTopYAt(0) + pcH + 0.045 + 0.02 + 0.05; // 屋面板上皮(屋脊) + 泛水抬高 5cm
    [-1, 1].forEach(function (sign) {
      var cp = mesh(track(new THREE.BoxGeometry(L + 2 * extX, capT, capD)), MAT.roof, gRoof);
      cp.position.set(0, ridgeApexY - (capD / 2) * sinA + capT / 2, sign * (capD / 2) * cosA);
      cp.rotation.x = sign * slopeAng;
    });

    // —— 墙板 + 门窗 ——
    var cladTh = 0.05;
    // 立面层序（由内到外）：柱轴线 → 柱外皮 → 墙梁(统一平面 colFaceZ) → 墙板 → 门窗
    var cladOffZ = colFaceZ + wcH + cladTh / 2 + 0.015;     // 墙板中心距柱轴线（墙梁之外）
    var cladOffX = cw / 2 + wcH + cladTh / 2 + 0.015;
    var openOffZ = cladOffZ - cladTh / 2 - 0.035;           // 玻璃平面：嵌在墙板洞口内、凹入 3.5cm
    var openOffX = cladOffX - cladTh / 2 - 0.035;
    // —— 墙板（砖墙顶 1.2m 以上）+ 底部 1.2m 砖墙条带 ——
    // 砖墙（24 墙厚 0.24）外皮与墙板外皮齐平，向内加厚；门洞处砖墙断开
    var brickTh = 0.24;
    var brickOffZ = cladOffZ + cladTh / 2 - brickTh / 2;   // 砖墙外皮与墙板外皮齐平（向内加厚）
    var brickOffX = cladOffX + cladTh / 2 - brickTh / 2;   // 砖墙中心距柱轴线（X 向）
    var cladH = H - masonryH;                              // 墙板高度（1.2m ~ 檐口）
    // 纵墙墙板：遇门洞 / 窗洞位置断开（洞口穿透可见）
    // 通用网格法：Y 按洞口边界分层、X 按洞口边界分格，落在洞口内的格子不铺板
    function placeCladX(z, outward) {
      var zOff = z + outward * cladOffZ;   // 符号修正（2026-09-26）：旧代码 z - outward 把纵墙板画到柱轴线内侧
      var holes = [];
      doorSegsX.filter(function (sg) { return sg.z === z; }).forEach(function (sg) {
        holes.push({ x0: sg.x0, x1: sg.x1, y0: masonryH, y1: doorTopY });
      });
      windowSegsX.filter(function (sg) { return sg.z === z; }).forEach(function (sg) {
        holes.push({ x0: sg.x0, x1: sg.x1, y0: winBot, y1: winTop });
      });
      var ys = [masonryH, H], xs = [-(L / 2 + extX), L / 2 + extX];   // X 向延长到山墙板外皮（四角对齐）
      holes.forEach(function (h) {
        [h.y0, h.y1].forEach(function (v) { if (v > masonryH + 0.01 && v < H - 0.01) ys.push(v); });
        [h.x0, h.x1].forEach(function (v) { if (v > -L / 2 + 0.01 && v < L / 2 - 0.01) xs.push(v); });
      });
      ys.sort(function (a, b) { return a - b; });
      xs.sort(function (a, b) { return a - b; });
      for (var i = 0; i < ys.length - 1; i++) {
        for (var j = 0; j < xs.length - 1; j++) {
          var y0 = ys[i], y1 = ys[i + 1], x0 = xs[j], x1 = xs[j + 1];
          var inside = holes.some(function (h) {
            return x0 >= h.x0 - 0.01 && x1 <= h.x1 + 0.01 && y0 >= h.y0 - 0.01 && y1 <= h.y1 + 0.01;
          });
          if (inside) continue;
          var mx = mesh(track(new THREE.BoxGeometry(x1 - x0, y1 - y0, cladTh)), MAT.cladding, gClad);
          mx.position.set((x0 + x1) / 2, (y0 + y1) / 2, zOff);
        }
      }
    }
    placeCladX(zEaveL, -1);
    placeCladX(zEaveR, 1);
    // 山墙墙板：遇窗洞断开（山墙无门，同款网格法）
    function placeCladZ(x, outward) {
      var xOff = x + outward * cladOffX;
      var cuts = windowSegsZ.filter(function (sg) { return Math.sign(sg.x) === Math.sign(x); });
      var ys = [masonryH, H], zs = [-(W / 2 + extZ), W / 2 + extZ];   // Z 向延长到纵墙板外皮（山墙包角）
      cuts.forEach(function (c) {
        [masonryH, winBot, winTop, H].forEach(function (v) { if (v > masonryH + 0.01 && v < H - 0.01) ys.push(v); });
        [c.z0, c.z1].forEach(function (v) { if (v > -W / 2 + 0.01 && v < W / 2 - 0.01) zs.push(v); });
      });
      ys.sort(function (a, b) { return a - b; });
      zs.sort(function (a, b) { return a - b; });
      for (var i = 0; i < ys.length - 1; i++) {
        for (var j = 0; j < zs.length - 1; j++) {
          var y0 = ys[i], y1 = ys[i + 1], z0 = zs[j], z1 = zs[j + 1];
          var inside = cuts.some(function (c) {
            return z0 >= c.z0 - 0.01 && z1 <= c.z1 + 0.01 && y0 >= winBot - 0.01 && y1 <= winTop + 0.01;
          });
          if (inside) continue;
          var mz = mesh(track(new THREE.BoxGeometry(cladTh, y1 - y0, z1 - z0)), MAT.cladding, gClad);
          mz.position.set(xOff, (y0 + y1) / 2, (z0 + z1) / 2);
        }
      }
    }
    placeCladZ(-L / 2, -1);
    placeCladZ(L / 2, 1);

    // —— 山墙三角封板（2026-09-27 康师傅确认封闭处理）：檐口 H → 屋面板下皮 ——
    // 无女儿墙时山墙檐口以上到屋脊的三角区补板（带女儿墙由女儿墙板覆盖，无需封板）；
    // 分条铺设，每条顶高取条带两端屋面线下皮的最大值（探入屋面底侧被屋面板遮住，不穿顶：
    //   条带宽 15/48=0.3125m × 坡度 0.105 = 0.033m 步高 < 屋面板厚 0.04m）
    if (!parapetOn) {
      [-1, 1].forEach(function (sx) {
        var xOff = sx * (L / 2 + cladOffX);
        var roofBotY = function (z) { return beamTopYAt(z) + pcH + 0.045 - 0.03; };  // 屋面板下皮-微隙
        var nStrip = 48;
        for (var gs = 0; gs < nStrip; gs++) {
          var z0 = -W / 2 + gs * W / nStrip, z1 = z0 + W / nStrip;
          var yTop = Math.max(roofBotY(z0), roofBotY(z1), roofBotY((z0 + z1) / 2));
          if (yTop <= H + 0.05) continue;                       // 檐口两端无三角区
          var gm = mesh(track(new THREE.BoxGeometry(cladTh, yTop - H, W / nStrip)), MAT.cladding, gClad);
          gm.position.set(xOff, (H + yTop) / 2, (z0 + z1) / 2);
        }
      });
    }

    // —— 900 型竖装墙板竖缝（2026-09-26 康师傅）：@0.9m 一道，贴墙板外皮，遇洞口分段 ——
    var seamPitch = 0.9, seamW = 0.02, seamTh = 0.012;
    var seamOffZ = cladOffZ + cladTh / 2 + seamTh / 2;      // 竖缝中心距柱轴线（前后纵墙）
    var seamOffX = cladOffX + cladTh / 2 + seamTh / 2;     // （左右山墙）
    function seamYSpans(cuts) {                            // [masonryH, H] 减去洞口 y 段
      cuts.sort(function (a, b) { return a[0] - b[0]; });
      var spans = [], cur = masonryH;
      cuts.forEach(function (c) {
        if (c[0] > cur + 0.02) spans.push([cur, Math.min(c[0], H)]);
        if (c[1] > cur) cur = c[1];
      });
      if (cur < H - 0.02) spans.push([cur, H]);
      return spans;
    }
    function placeSeamX(z, outward, holes) {               // 前后纵墙：沿 X 每 0.9m 一道
      for (var sx = -L / 2 + seamPitch; sx < L / 2 - 0.12; sx += seamPitch) {
        var cuts = holes.filter(function (h) { return sx > h.x0 - 0.02 && sx < h.x1 + 0.02; })
          .map(function (h) { return [h.y0, h.y1]; });
        seamYSpans(cuts).forEach(function (sp) {
          var m = mesh(track(new THREE.BoxGeometry(seamW, sp[1] - sp[0], seamTh)), MAT.seam, gClad);
          m.position.set(sx, (sp[0] + sp[1]) / 2, z + outward * seamOffZ);
        });
      }
    }
    function placeSeamZ(x, outward, cutsW) {               // 山墙：沿 Z 每 0.9m 一道（只有窗洞）
      for (var sz = -W / 2 + seamPitch; sz < W / 2 - 0.12; sz += seamPitch) {
        var cuts = cutsW.filter(function (c) { return sz > c.z0 - 0.02 && sz < c.z1 + 0.02; })
          .map(function () { return [winBot, winTop]; });
        seamYSpans(cuts).forEach(function (sp) {
          var m = mesh(track(new THREE.BoxGeometry(seamTh, sp[1] - sp[0], seamW)), MAT.seam, gClad);
          m.position.set(x + outward * seamOffX, (sp[0] + sp[1]) / 2, sz);
        });
      }
    }
    [zEaveL, zEaveR].forEach(function (zw) {
      var ow = (zw < 0) ? -1 : 1;
      var holes = [];
      doorSegsX.filter(function (sg) { return sg.z === zw; }).forEach(function (sg) {
        holes.push({ x0: sg.x0, x1: sg.x1, y0: masonryH, y1: doorTopY });
      });
      windowSegsX.filter(function (sg) { return sg.z === zw; }).forEach(function (sg) {
        holes.push({ x0: sg.x0, x1: sg.x1, y0: winBot, y1: winTop });
      });
      placeSeamX(zw, ow, holes);
    });
    [-L / 2, L / 2].forEach(function (xg) {
      placeSeamZ(xg, (xg < 0) ? -1 : 1,
        windowSegsZ.filter(function (sg) { return Math.sign(sg.x) === Math.sign(xg); }));
    });

    // 纵墙砖墙条带（遇门洞断开，与墙梁同款分段逻辑）
    function placeBrickX(z, outward) {
      var cuts = doorCutsAt(z);
      var spans = [], cur = -(L / 2 + extX);                  // 砖墙同步延长到山墙砖墙外皮（四角闭合）
      cuts.forEach(function (c) {
        if (c[0] > cur + 0.05) spans.push([cur, c[0]]);
        if (c[1] > cur) cur = c[1];
      });
      if (cur < L / 2 + extX - 0.05) spans.push([cur, L / 2 + extX]);
      spans.forEach(function (sp) {
        var len = sp[1] - sp[0];
        if (len < 0.25) return;
        var m = mesh(track(new THREE.BoxGeometry(len, masonryH, brickTh)), MAT.brick, gClad);
        m.position.set((sp[0] + sp[1]) / 2, masonryH / 2, z + outward * brickOffZ);
      });
    }
    placeBrickX(zEaveL, -1);
    placeBrickX(zEaveR, 1);
    // 山墙砖墙条带（无门洞，整根；Z 向延长到纵墙砖墙外皮，四角闭合）
    var mC = mesh(track(new THREE.BoxGeometry(brickTh, masonryH, W + 2 * extZ)), MAT.brick, gClad);
    mC.position.set(-L / 2 - brickOffX, masonryH / 2, 0);
    var mD = mesh(track(new THREE.BoxGeometry(brickTh, masonryH, W + 2 * extZ)), MAT.brick, gClad);
    mD.position.set(L / 2 + brickOffX, masonryH / 2, 0);

    // 窗户：每个柱距正中一扇（纵墙按刚架柱分格、山墙按角柱+抗风柱分格，门的柱距让给门）；
    //       窗高已对齐墙梁标高线（winBot ~ winTop），上下边借用所在标高的墙梁作框
    var winGeo = track(new THREE.BoxGeometry(ww, winH, 0.07));
    var winGeoZ = track(new THREE.BoxGeometry(0.07, winH, ww));

    // —— 洞口边梃：C 型钢与墙梁同规格、同平面（窗左右竖梃 / 门两竖杆）——
    // X 向墙面（前/后纵墙）：竖杆中心与该高度墙梁同平面，C 开口朝室内
    function cPostsX(cx, y0, y1, halfW, z, outward) {
      var ym = (y0 + y1) / 2;
      var offZm = colFaceZ + wcH / 2 + 0.012;   // 与统一墙梁平面同面
      var zv = new THREE.Vector3(0, 0, -outward);
      [-1, 1].forEach(function (sd) {
        orientedMesh(track(cPurlinGeom(wcH, wcB, wcT, y1 - y0)), MAT.purlin, gOpening,
          new THREE.Vector3(cx + sd * (halfW + wcH / 2), ym, z + outward * offZm),
          new THREE.Vector3(0, 1, 0), zv);
      });
    }
    // Z 向墙面（山墙）
    function cPostsZ(cz, y0, y1, halfW, x, outward) {
      var ym = (y0 + y1) / 2;
      var offXm = cw / 2 + wcH / 2 + 0.012;
      var xv = new THREE.Vector3(-outward, 0, 0);
      [-1, 1].forEach(function (sd) {
        orientedMesh(track(cPurlinGeom(wcH, wcB, wcT, y1 - y0)), MAT.purlin, gOpening,
          new THREE.Vector3(x + outward * offXm, ym, cz + sd * (halfW + wcH / 2)),
          new THREE.Vector3(0, 1, 0), xv);
      });
    }

    // 纵墙（沿 X 布置）：玻璃嵌在墙板洞口平面（凹入 3.5cm），左右竖梃与墙梁同平面
    windowSegsX.forEach(function (ws4) {
      var outward = (ws4.z < 0 ? -1 : 1);
      var m = mesh(winGeo, MAT.glass, gOpening);
      m.position.set((ws4.x0 + ws4.x1) / 2, winY, ws4.z + outward * openOffZ);
      cPostsX((ws4.x0 + ws4.x1) / 2, winBot, winTop, ww / 2, ws4.z, outward);
    });
    // 山墙（沿 Z 布置）
    windowSegsZ.forEach(function (ws5) {
      var outward = (ws5.x < 0 ? -1 : 1);
      var m = mesh(winGeoZ, MAT.glass, gOpening);
      m.position.set(ws5.x + outward * openOffX, winY, (ws5.z0 + ws5.z1) / 2);
      cPostsZ((ws5.z0 + ws5.z1) / 2, winBot, winTop, ww / 2, ws5.x, outward);
    });

    // —— 门（默认 2 个 4.5×5.5m，前纵墙两端各一）——
    if (doorSegsX.length > 0) {
      var doorW = dW;
      // 门洞：只画 C 型钢门框两竖杆（横条已取消）；门板、腰线、门槛均不显示

      doorSegsX.forEach(function (sg) {
        var cx = (sg.x0 + sg.x1) / 2;
        var outS = (sg.z < 0 ? -1 : 1);
        // C 型钢门框：两竖杆，与墙梁同平面；顶框借用 doorTopY 标高处墙梁（落地无底框）
        cPostsX(cx, 0, doorTopY, doorW / 2, sg.z, outS);
      });
    }

    // —— 门窗洞口包边（2026-09-27 康师傅）：亮银白包边条盖住洞口四周板边 ——
    // 引擎 mtn.winTrim 已按 窗周长+门洞周长 计价（并入 ridgeTrim 11 元/延米），此处纯显示
    var trimW2 = 0.10, trimT2 = 0.016;
    var trimPlaneZ = cladOffZ + cladTh / 2 + 0.006;         // 纵墙包边平面（板外皮外 6mm）
    var trimPlaneX = cladOffX + cladTh / 2 + 0.006;         // 山墙包边平面
    function openingTrimX(z, outw, x0, x1, y0, y1, noBottom) {
      var zz = z + outw * trimPlaneZ;
      var vv1 = mesh(track(new THREE.BoxGeometry(trimW2, y1 - y0, trimT2)), MAT.trim, gClad);
      vv1.position.set(x0 - 0.02, (y0 + y1) / 2, zz);
      var vv2 = mesh(track(new THREE.BoxGeometry(trimW2, y1 - y0, trimT2)), MAT.trim, gClad);
      vv2.position.set(x1 + 0.02, (y0 + y1) / 2, zz);
      var hw2 = (x1 - x0) / 2 + 0.05;
      var ht = mesh(track(new THREE.BoxGeometry(hw2 * 2, trimW2, trimT2)), MAT.trim, gClad);
      ht.position.set((x0 + x1) / 2, y1 + 0.02, zz);
      if (!noBottom) {
        var hb = mesh(track(new THREE.BoxGeometry(hw2 * 2, trimW2, trimT2)), MAT.trim, gClad);
        hb.position.set((x0 + x1) / 2, y0 - 0.02, zz);
      }
    }
    function openingTrimZ(x, outw, z0, z1, y0, y1, noBottom) {
      var xx = x + outw * trimPlaneX;
      var vv1 = mesh(track(new THREE.BoxGeometry(trimT2, y1 - y0, trimW2)), MAT.trim, gClad);
      vv1.position.set(xx, (y0 + y1) / 2, z0 - 0.02);
      var vv2 = mesh(track(new THREE.BoxGeometry(trimT2, y1 - y0, trimW2)), MAT.trim, gClad);
      vv2.position.set(xx, (y0 + y1) / 2, z1 + 0.02);
      var hw3 = (z1 - z0) / 2 + 0.05;
      var ht = mesh(track(new THREE.BoxGeometry(trimT2, trimW2, hw3 * 2)), MAT.trim, gClad);
      ht.position.set(xx, y1 + 0.02, (z0 + z1) / 2);
      if (!noBottom) {
        var hb = mesh(track(new THREE.BoxGeometry(trimT2, trimW2, hw3 * 2)), MAT.trim, gClad);
        hb.position.set(xx, y0 - 0.02, (z0 + z1) / 2);
      }
    }
    windowSegsX.forEach(function (ws4) {
      openingTrimX(ws4.z, (ws4.z < 0 ? -1 : 1), ws4.x0, ws4.x1, winBot, winTop, false);
    });
    windowSegsZ.forEach(function (ws5) {
      openingTrimZ(ws5.x, (ws5.x < 0 ? -1 : 1), ws5.z0, ws5.z1, winBot, winTop, false);
    });
    doorSegsX.forEach(function (sg) {
      openingTrimX(sg.z, (sg.z < 0 ? -1 : 1), sg.x0, sg.x1, 0.05, doorTopY, true);
    });

    gClad.visible = ui.clad;

    // —— 支撑（GB 51022 常规布置：端部柱距各一道，L>60m 时中间加设；φ20 圆钢交叉） ——
    var braceRad = 0.035;                      // φ20 圆钢适度夸张保证可见
    function braceRod(a, b) {
      var dir = new THREE.Vector3().subVectors(b, a);
      var len = dir.length();
      var m = mesh(track(new THREE.CylinderGeometry(braceRad, braceRad, len, 8)), MAT.brace, root);
      m.position.copy(a).addScaledVector(dir, 0.5);
      m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
      return m;
    }
    var nBaysBr = nFrames - 1;
    var bayIdxBr = [0, nBaysBr - 1];
    if (L > 60) {
      var nSegBr = Math.ceil(L / 60);
      for (var kb = 1; kb < nSegBr; kb++) {
        var xbi = Math.round(kb * nBaysBr / nSegBr);
        if (xbi > 0 && xbi < nBaysBr && bayIdxBr.indexOf(xbi) < 0) bayIdxBr.push(xbi);
      }
    }
    bayIdxBr.forEach(function (bi) {
      var xa = x0 + bi * dx, xb2 = x0 + (bi + 1) * dx;
      // 柱间支撑：两侧纵墙柱列平面内各一组 X（柱底 → 对榀柱顶）
      [zEaveL + cdT / 2, zEaveR - cdT / 2].forEach(function (zc) {
        braceRod(new THREE.Vector3(xa, 0.10, zc), new THREE.Vector3(xb2, H - 0.12, zc));
        braceRod(new THREE.Vector3(xb2, 0.10, zc), new THREE.Vector3(xa, H - 0.12, zc));
      });
      // 屋面水平支撑：每坡一组 X（本榀檐口 → 对榀屋脊，贴坡面）
      [zEaveL, zEaveR].forEach(function (ez) {
        braceRod(new THREE.Vector3(xa, H, ez), new THREE.Vector3(xb2, ridgeY - 0.15, 0));
        braceRod(new THREE.Vector3(xb2, H, ez), new THREE.Vector3(xa, ridgeY - 0.15, 0));
      });
    });

    // —— 女儿墙（面板外皮与墙板外皮齐平 + 钢构：女儿柱焊于柱顶、女儿墙檩条与墙梁同规格）——
    if (parapetOn) {
      var ph = s.parapetHeight;
      var paraShift = (0.16 - cladTh) / 2;                  // 女儿墙中心需要内移的距离
      var paraOffZ = cladOffZ - paraShift;                  // 女儿墙中心距柱轴线 (Z 向)
      var paraOffX = cladOffX - paraShift;                  // 女儿墙中心距柱轴线 (X 向)
      // 面板挂 gClad 组：关闭「墙面板」开关即可检查里面的钢构
      // （2026-09-27 四角对齐：纵墙板 X 向延长到山墙女儿墙外皮、山墙板 Z 向延长到纵墙女儿墙外皮，转角榫接闭合）
      var pA = mesh(track(new THREE.BoxGeometry(L + 2 * extX, ph, 0.16)), MAT.parapet, gClad);
      pA.position.set(0, H + ph / 2, zEaveL - paraOffZ);
      var pB = mesh(track(new THREE.BoxGeometry(L + 2 * extX, ph, 0.16)), MAT.parapet, gClad);
      pB.position.set(0, H + ph / 2, zEaveR + paraOffZ);
      var pC = mesh(track(new THREE.BoxGeometry(0.16, ph, W + 2 * extZ)), MAT.parapet, gClad);
      pC.position.set(-L / 2 - paraOffX, H + ph / 2, 0);
      var pD = mesh(track(new THREE.BoxGeometry(0.16, ph, W + 2 * extZ)), MAT.parapet, gClad);
      pD.position.set(L / 2 + paraOffX, H + ph / 2, 0);

      // 内墙板（女儿墙内侧一面，同材质同厚 0.05，贴女儿墙内皮；之前没有，新增）
      // 女儿墙厚 0.16：内皮 = 外墙板中心 + 0.08（朝室内）；内墙板厚 0.05 再向室内偏 0.025
      var paraInTh = cladTh;                                 // 0.05
      var paraInZ1 = zEaveL - paraOffZ + 0.08 + paraInTh / 2; // 前纵墙内墙板中心 z
      var paraInZ2 = zEaveR + paraOffZ - 0.08 - paraInTh / 2; // 后纵墙内墙板中心 z
      var paraInX1 = -L / 2 - paraOffX + 0.08 + paraInTh / 2; // 左山墙内墙板中心 x
      var paraInX2 = L / 2 + paraOffX - 0.08 - paraInTh / 2;  // 右山墙内墙板中心 x
      var ipA = mesh(track(new THREE.BoxGeometry(L + 2 * extX, ph, paraInTh)), MAT.parapet, gClad);
      ipA.position.set(0, H + ph / 2, paraInZ1);
      var ipB = mesh(track(new THREE.BoxGeometry(L + 2 * extX, ph, paraInTh)), MAT.parapet, gClad);
      ipB.position.set(0, H + ph / 2, paraInZ2);
      var ipC = mesh(track(new THREE.BoxGeometry(paraInTh, ph, W + 2 * extZ)), MAT.parapet, gClad);
      ipC.position.set(paraInX1, H + ph / 2, 0);
      var ipD = mesh(track(new THREE.BoxGeometry(paraInTh, ph, W + 2 * extZ)), MAT.parapet, gClad);
      ipD.position.set(paraInX2, H + ph / 2, 0);

      // —— 女儿墙压顶（2026-09-27 康师傅）：顶面水平盖板一圈，深灰同女儿墙 ——
      // 前后压顶长向通长；山墙压顶叠高 6mm 盖过前后压顶端头 → 转角一圈闭合（避免共面闪面）
      var capTh2 = 0.03, capOv = 0.04;                        // 压顶板厚 / 每侧外挑
      var capW2 = 0.16 + 2 * capOv;                           // 压顶宽（盖过女儿墙厚并两侧外挑 4cm）
      var capY1 = H + ph + capTh2 / 2 - 0.006;                // 前后压顶标高
      var capY2 = H + ph + capTh2 / 2 + 0.006;                // 山墙压顶标高（略高）
      [zEaveL - paraOffZ, zEaveR + paraOffZ].forEach(function (zc) {
        var cpL = mesh(track(new THREE.BoxGeometry(2 * (L / 2 + extX), capTh2, capW2)), MAT.parapet, gClad);
        cpL.position.set(0, capY1, zc);
      });
      [-L / 2 - paraOffX, L / 2 + paraOffX].forEach(function (xc) {
        var cpG = mesh(track(new THREE.BoxGeometry(capW2, capTh2, 2 * (W / 2 + extZ))), MAT.parapet, gClad);
        cpG.position.set(xc, capY2, 0);
      });

      // 钢构截面：与墙梁同高的工字钢（墙梁 C180 → 工18；C120 → 工12 …）
      var ibH = wcH, ibB = wcH * 0.52, ibTw = 0.022, ibTf = 0.032;
      var ibY = H + ph - ibH / 2;                           // 压顶梁中线（顶面与女儿墙顶齐平）

      // 女儿柱：贴钢柱/抗风柱**外翼缘外皮**，底端沿柱外侧下延 0.5m 与柱搭接焊接；
      //        纵墙各刚架柱（含角柱——山墙/纵墙共用一根）+ 山墙各抗风柱
      var lap = 0.5;                                          // 搭接段长度
      var paraColOffZ = cdT / 2 + ibB / 2 + 0.006;            // 纵墙女儿柱中心距柱轴线（Z 向）
      var paraColOffX = windColSpec(H).h / 2 + ibH / 2 + 0.006; // 山墙女儿柱中心距抗风柱轴线（X 向）
      var weldGeoX = box(0.20, lap, 0.014);                   // 纵墙：竖直连接板（板厚沿 Z）
      var weldGeoZ = box(0.014, lap, 0.20);                   // 山墙：竖直连接板（板厚沿 X）
      for (var pi = 0; pi < nFrames; pi++) {
        var px2 = x0 + pi * dx;
        [zEaveL - paraColOffZ, zEaveR + paraColOffZ].forEach(function (zc) {
          hMember(new THREE.Vector3(px2, H - lap, zc), new THREE.Vector3(px2, ibY, zc),
            ibH, ibB, ibH, ibB, ibTw, ibTf, MAT.steel, root);
        });
        mesh(weldGeoX, MAT.steelMid, root).position.set(px2, H - lap / 2, zEaveL - cdT / 2 - 0.007);
        mesh(weldGeoX, MAT.steelMid, root).position.set(px2, H - lap / 2, zEaveR + cdT / 2 + 0.007);
      }
      [-L / 2, L / 2].forEach(function (gx3) {
        var outw = (gx3 < 0) ? -1 : 1;
        windZs.forEach(function (wz3) {
          var wTop = beamBotYAt(wz3) - 0.05;                  // 抗风柱顶（梁下翼缘底，跟随坡度）
          if (wTop < H) wTop = H;
          if (ibY > wTop) {
            var xc = gx3 + outw * paraColOffX;
            var gpm = hMember(new THREE.Vector3(xc, wTop - lap, wz3), new THREE.Vector3(xc, ibY, wz3),
              ibH, ibB, ibH, ibB, ibTw, ibTf, MAT.steel, root);
            if (gpm) gpm.rotation.y = Math.PI / 2;          // 腹板朝外、翼缘平行山墙
            mesh(weldGeoZ, MAT.steelMid, root).position.set(gx3 + outw * (windColSpec(wTop).h / 2 + 0.007), wTop - lap / 2, wz3);
          }
        });
      });
      // 女儿墙檩条（2026-09-26 压顶工字梁取消，改为与墙梁同规格 C 型钢）：
      // 四边通长，落在女儿柱中心线上，开口朝下（与墙梁同向），挂 gPurlin（跟随「檩条」开关）
      var girtY = ibY;                                     // C 檩中线 = 原压顶梁中线（顶面与女儿墙顶齐平）
      var zcL = zEaveL - paraColOffZ, zcR = zEaveR + paraColOffZ;
      var xcL = -L / 2 - paraColOffX, xcR = L / 2 + paraColOffX;
      var zcF = -W / 2 - paraColOffZ, zcB = W / 2 + paraColOffZ;
      orientedMesh(track(cPurlinGeom(wcH, wcB, wcT, xcR - xcL)), MAT.purlin, gPurlin,
        new THREE.Vector3((xcL + xcR) / 2, girtY, zcL), xAxisW, xDirDown);
      orientedMesh(track(cPurlinGeom(wcH, wcB, wcT, xcR - xcL)), MAT.purlin, gPurlin,
        new THREE.Vector3((xcL + xcR) / 2, girtY, zcR), xAxisW, xDirDown);
      orientedMesh(track(cPurlinGeom(wcH, wcB, wcT, zcB - zcF)), MAT.purlin, gPurlin,
        new THREE.Vector3(xcL, girtY, (zcF + zcB) / 2), zAxisW, xDirDown);
      orientedMesh(track(cPurlinGeom(wcH, wcB, wcT, zcB - zcF)), MAT.purlin, gPurlin,
        new THREE.Vector3(xcR, girtY, (zcF + zcB) / 2), zAxisW, xDirDown);

      // 天沟：檐口内侧 U 形彩钢天沟（带女儿墙时代替末根屋面檩条）
      // 标高：沟底坐在柱顶/梁上翼缘顶面（H）上，整条沟在柱顶以上，不再埋进梁顶
      var gutW = 0.30, gutD = 0.15, gutT = 0.012;
      [zEaveL, zEaveR].forEach(function (ez) {
        var inw = (ez < 0) ? 1 : -1;                        // 朝室内方向
        var gOut = ez - inw * (paraOffZ - 0.08);            // 外壁：贴女儿墙内皮
        var gIn = gOut + inw * gutW;                        // 内壁：靠檐口
        var gBot = H + 0.003;                               // 沟底板底面 = 8.003（坐在柱顶/梁顶）
        var gBase = mesh(track(new THREE.BoxGeometry(L, gutT, gutW)), MAT.gutter, root);
        gBase.position.set(0, gBot + gutT / 2, (gOut + gIn) / 2);
        var gWall1 = mesh(track(new THREE.BoxGeometry(L, gutD, gutT)), MAT.gutter, root);
        gWall1.position.set(0, gBot + gutD / 2, gOut - inw * gutT / 2);
        var gWall2 = mesh(track(new THREE.BoxGeometry(L, gutD, gutT)), MAT.gutter, root);
        gWall2.position.set(0, gBot + gutD / 2, gIn + inw * gutT / 2);
      });
    } else {
      // —— 外天沟：2026-09-29 康师傅口径——无女儿墙不再做天沟，3D 也不再绘制 ——
      //    与报价明细（app.js 天沟行仅在 hasParapet 时列入）和第五章算量汇总（engine.js maintenance）保持一致。
      //    <此处原有 15 行「檐口外天沟」绘制代码已移除>
    }

    // —— 落水管：2026-09-28 康师傅口径——3D 中不再绘制落水管（内天沟侧 / 外天沟侧均不画），
    //     仅在报价与算量中按延米计价：engine.js maintenance.downpipe（φ160PVC，两侧间距≤25m，每根长=檐口高），
    //     app.js 报价明细「落水管 φ160PVC · 延米」与右侧人民币估算卡。<此处原有 16 行绘制代码已移除>
    // —— 四角竖向包边（2026-09-27 康师傅）：L 形双肢盖住转角竖缝，从砖墙顶 1.2m 到檐口/女儿墙顶 ——
    // （引擎算量的「角柱包边 4×(H-1.2m)」已计价，此处纯显示；对应包角基准 = 墙板外皮延长线）
    var trimTop = parapetOn ? H + ph : H;
    var trimH = trimTop - masonryH;
    var legOn = 0.13, legWrap = 0.06, legT = 0.016;           // 肢宽(贴墙面) / 绕角宽 / 板厚
    [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (cr) {
      var sx = cr[0], sz = cr[1];
      var xSkin = sx * (L / 2 + extX), zSkin = sz * (W / 2 + extZ);  // 转角外皮线（两向墙板外皮交线）
      var yTrim = masonryH + trimH / 2;
      // 肢1：贴纵墙外皮（z 平面），从角内 legOn 到绕过角 legWrap
      var t1 = mesh(track(new THREE.BoxGeometry(legOn + legWrap, trimH, legT)), MAT.trim, gClad);
      t1.position.set(sx * (xSkin + (legWrap - legOn) / 2), yTrim, sz * (zSkin + legT / 2));
      // 肢2：贴山墙外皮（x 平面），从角内 legOn 到绕过角 legWrap
      var t2 = mesh(track(new THREE.BoxGeometry(legT, trimH, legOn + legWrap)), MAT.trim, gClad);
      t2.position.set(sx * (xSkin + legT / 2), yTrim, sz * (zSkin + (legWrap - legOn) / 2));
    });

    // —— 夹层 ——
    var lv = s.mezzanineLevels || 0;
    if (lv >= 1) {
      var ratio = Math.max(0.1, Math.min(1, (s.mezz1Ratio || 50) / 100));
      var slabL = L * ratio;
      var levels = [3.6];
      if (lv >= 2) levels.push(7.2);
      levels.forEach(function (y) {
        if (y > H - 0.5) return;
        var slab = mesh(track(new THREE.BoxGeometry(slabL, 0.12, W - 0.5)), MAT.slab, root);
        slab.position.set(-L / 2 + slabL / 2, y, 0);
        slab.castShadow = true;
        // 夹层柱网
        var mcs = Math.max(1.2, s.mezzColSpacing || 4);
        var nz = Math.max(1, Math.round(W / mcs) - 1);
        var nx = Math.max(1, Math.round(slabL / mcs) - 1);
        var gcGeo = track(new THREE.BoxGeometry(0.24, y, 0.24));
        for (var a = 1; a <= nx; a++) {
          for (var b = 1; b <= nz; b++) {
            var px = -L / 2 + (a / (nx + 1)) * slabL;
            var pz = -W / 2 + (b / (nz + 1)) * W;
            mesh(gcGeo, MAT.purlin, root).position.set(px, y / 2, pz);
          }
        }
      });
    }

    // —— 取景高度（考虑屋面板偏移与女儿墙超高） ——
    var topY = ridgeY + 0.6;
    if (s.hasParapet && s.parapetHeight > 0) topY = Math.max(topY, H + s.parapetHeight + 0.25);

    // —— 视角 ——
    var dims = L + '|' + W + '|' + H;
    if (dims !== lastDims) { fitView(L, W, topY, false); lastDims = dims; }
    else { ctrl.target.y = topY * 0.5; applyCamera(); }
    cur = { L: L, W: W, H: topY };

    // 应用可见性
    gPurlin.visible = ui.purlin;
    gRoof.visible = ui.roof;
  }

  // ---------- 尺寸自适应 ----------
  function resize() {
    var w = stageEl.clientWidth || 1;
    var h = stageEl.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    applyCamera();
  }
  if (window.ResizeObserver) new ResizeObserver(resize).observe(stageEl);
  window.addEventListener('resize', resize);

  // ---------- 参数签名（变化则重建） ----------
  function sig(s) {
    return [s.length, s.width, s.height, s.hasMiddleColumn, s.sectionType,
      s.columnSpacing, s.roofPurlinSpacing, s.wallPurlinSpacing,
      s.hasParapet, s.parapetHeight, s.winWidth, s.sillHeight,
      s.doorCount, s.doorWidth, s.doorHeight, s.doorOnWall,
      s.mezzanineLevels, s.mezz1Ratio, s.mezzColSpacing, s.daylightCount,
      s.hasCrane, s.craneTonnage, s.craneGrade, s.craneRailHeight].join('|');
  }
  var lastSig = null;
  function tick() {
    var s = S();
    if (s) {
      var now = sig(s);
      if (now !== lastSig) {
        lastSig = now;
        try { build(s); } catch (e) { console.warn('3D 建模失败', e); }
      }
    }
  }

  // ---------- 渲染循环 ----------
  function loop() {
    requestAnimationFrame(loop);
    if (ui.spin) { ctrl.theta += 0.0035; applyCamera(); }
    try { renderer.render(scene, camera); } catch (e) { /* 忽略偶发渲染异常 */ }
  }

  function start() {
    resize();
    tick();
    loop();
    setInterval(tick, 240);
  }

  // 调试导出（仅 URL 带 #debug 时启用，正常访问不受影响）
  if (String(window.location.hash || '').indexOf('debug') >= 0) {
    window.__p3d = {
      scene: scene, root: root, ctrl: ctrl, camera: camera,
      groups: { purlin: gPurlin, roof: gRoof, clad: gClad, opening: gOpening },
      applyCamera: applyCamera,
      state: function () { return S(); },
      stats: function () {
        function count(g) { var n = 0; g.traverse(function (o) { if (o.isMesh) n++; }); return n; }
        return {
          opening: count(gOpening), clad: count(gClad),
          purlin: count(gPurlin), roof: count(gRoof),
          theta: ctrl.theta, phi: ctrl.phi, r: ctrl.r
        };
      }
    };
  }

  // ---------- 方案书 3D 截图（2026-09-27 #66：轴测视角渲染同帧 toDataURL，正常访问也可用） ----------
  // 2026-09-28 扩展（康师傅：PDF 轴测效果图多加 2 张）：
  //   opt.w / opt.h  —— 钉死截图渲染像素。旧实现按舞台尺寸（42vh，随窗口高度变）出图，
  //                     同一项目在 1500 / 1024 / 390 三种窗口下截图比例都不一样，方案书排版会飘。
  //   opt.hide       —— 临时隐藏图层 ['roof','clad','purlin']，用于「钢架骨架透视图」，截完立刻还原。
  // 无论走哪条分支，退出前都会把 渲染尺寸 / 相机宽高比 / 图层可见性 / 视角 全部还原。
  window.__p3dShot = function (opt) {
    opt = opt || {};
    try {
      var s = S();
      if (!s) return null;
      // 保存当前视角与渲染态
      var sv = { theta: ctrl.theta, phi: ctrl.phi, r: ctrl.r, tx: ctrl.target.x, ty: ctrl.target.y, tz: ctrl.target.z };
      var spinWas = ui.spin; ui.spin = false;
      var bufW = renderer.domElement.width, bufH = renderer.domElement.height;
      var aspWas = camera.aspect;
      var visWas = { purlin: gPurlin.visible, roof: gRoof.visible, clad: gClad.visible };
      var w = opt.w || bufW, h = opt.h || bufH;
      // 可选：临时隐藏图层（骨架透视图）
      if (opt.hide && opt.hide.length) {
        opt.hide.forEach(function (k) {
          if (k === 'purlin') gPurlin.visible = false;
          if (k === 'roof') gRoof.visible = false;
          if (k === 'clad') gClad.visible = false;
        });
      }
      // 可选：opt.theta / opt.phi 指定取景角度（不传则用默认轴测角）
      var keepAng = false;
      if (opt.theta != null) { ctrl.theta = opt.theta; keepAng = true; }
      if (opt.phi != null) { ctrl.phi = opt.phi; keepAng = true; }
      // 可选：钉死渲染像素（必须在 fitView 之前改，fitView 按 camera.aspect 取景）
      if (w !== bufW || h !== bufH) {
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      }
      // 轴测取景（与 build 同一套 topY 逻辑）
      var L = s.length, W = s.width;
      var rise = Math.min((W / 2) * 0.105, 2.8);
      var topY = s.height + rise + 0.6;
      if (s.hasParapet && s.parapetHeight > 0) topY = Math.max(topY, s.height + s.parapetHeight + 0.25);
      fitView(L, W, topY, keepAng);
      renderer.render(scene, camera);
      var data = renderer.domElement.toDataURL('image/png');
      // —— 还原：图层 → 渲染尺寸 → 视角 → 自动旋转 ——
      gPurlin.visible = visWas.purlin; gRoof.visible = visWas.roof; gClad.visible = visWas.clad;
      if (w !== bufW || h !== bufH) {
        renderer.setSize(bufW, bufH, false);
        camera.aspect = aspWas;
        camera.updateProjectionMatrix();
      }
      ctrl.theta = sv.theta; ctrl.phi = sv.phi; ctrl.r = sv.r;
      ctrl.target.set(sv.tx, sv.ty, sv.tz);
      ui.spin = spinWas;
      applyCamera();
      renderer.render(scene, camera);
      return data;
    } catch (e) {
      console.warn('3D 方案书截图失败', e);
      return null;
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { setTimeout(start, 0); });
  } else {
    setTimeout(start, 0);
  }
})();
