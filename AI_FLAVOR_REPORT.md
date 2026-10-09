# 博客「AI 味」量化审计报告

- 样本：27 篇英文博客（`content/blog/*.md`）
- 方法：套路词密度 + 结构指纹 + 句/段节奏变异系数 + 词汇多样性 + 具体性反向加分
- 分数越高越像 AI 生成。判级：🔴≥45 重 / 🟠30-45 中 / 🟡18-30 轻 / ✅<18 干净

## 总览（按 AI 味降序）

| # | 文件 | 词数 | 🔴重罪 | 🟠中罪 | 🟡弱 | 具体细节 | 句长CV | 段长CV | TTR | em— | 千词em | AI味分 | 级别 |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| 1 | `steel-warehouse-design-guide-spans-cranes.md` | 360 | 0 | 0 | 4 | 4 | 0.85 | 0.303 | 0.608 | 3 | 8.3 | **14.0** | ✅ 干净 |
| 2 | `sustainable-steel-structures-leed-green-building.md` | 723 | 0 | 0 | 1 | 5 | 0.952 | 0.336 | 0.523 | 6 | 8.3 | **13.3** | ✅ 干净 |
| 3 | `steel-structure-installation-guide-erection-process.md` | 549 | 0 | 0 | 4 | 4 | 1.556 | 0 | 0.566 | 1 | 1.8 | **13.2** | ✅ 干净 |
| 4 | `steel-structure-processing-techniques-cnc-welding-guide.md` | 905 | 0 | 0 | 0 | 7 | 1.44 | 0.355 | 0.535 | 8 | 8.8 | **8.8** | ✅ 干净 |
| 5 | `steel-structure-maintenance-guide-lifespan-corrosion.md` | 922 | 0 | 0 | 1 | 4 | 1.252 | 0.37 | 0.551 | 8 | 8.7 | **8.3** | ✅ 干净 |
| 6 | `steel-structure-cost-philippines-indonesia-vietnam.md` | 508 | 0 | 0 | 1 | 14 | 0.457 | 0.242 | 0.555 | 4 | 7.9 | **3.3** | ✅ 干净 |
| 7 | `steel-vs-concrete-lifetime-cost-comparison-2026.md` | 899 | 0 | 0 | 1 | 10 | 0.883 | 0.379 | 0.523 | 6 | 6.7 | **0.3** | ✅ 干净 |
| 8 | `chinese-steel-fabrication-global-quality-guide.md` | 964 | 0 | 0 | 3 | 26 | 0.69 | 0.533 | 0.552 | 0 | 0.0 | **0.0** | ✅ 干净 |
| 9 | `how-much-does-steel-structure-cost-estimator-guide-2026.md` | 705 | 0 | 0 | 0 | 21 | 1.303 | 0.267 | 0.465 | 3 | 4.3 | **0.0** | ✅ 干净 |
| 10 | `how-to-budget-steel-structure-project.md` | 796 | 0 | 0 | 1 | 69 | 1.609 | 0.273 | 0.509 | 4 | 5.0 | **0.0** | ✅ 干净 |
| 11 | `how-to-estimate-structural-steel-2026.md` | 526 | 0 | 0 | 2 | 12 | 0.827 | 0.442 | 0.47 | 4 | 7.6 | **0.0** | ✅ 干净 |
| 12 | `import-steel-structures-from-china-2026-guide.md` | 362 | 0 | 0 | 0 | 6 | 0.865 | 0.348 | 0.674 | 2 | 5.5 | **0.0** | ✅ 干净 |
| 13 | `light-gauge-steel-buildings-guide.md` | 1685 | 0 | 0 | 0 | 28 | 0.47 | 0.463 | 0.41 | 11 | 6.5 | **0.0** | ✅ 干净 |
| 14 | `steel-space-frame-roof-design-span-cost-2026.md` | 1061 | 0 | 0 | 3 | 12 | 1.195 | 0.445 | 0.455 | 3 | 2.8 | **0.0** | ✅ 干净 |
| 15 | `steel-structure-commercial-buildings-guide.md` | 702 | 0 | 0 | 0 | 14 | 1.87 | 0.307 | 0.563 | 5 | 7.1 | **0.0** | ✅ 干净 |
| 16 | `steel-structure-factory-inspection-qc-checklist-2026.md` | 920 | 0 | 0 | 0 | 17 | 0.826 | 0.287 | 0.491 | 7 | 7.6 | **0.0** | ✅ 干净 |
| 17 | `steel-structure-floor-deck-types-load-capacity-cost-2026.md` | 832 | 0 | 0 | 0 | 11 | 0.943 | 0.393 | 0.454 | 3 | 3.6 | **0.0** | ✅ 干净 |
| 18 | `steel-structure-foundation-guide-types-cost.md` | 400 | 0 | 0 | 1 | 7 | 0.818 | 0.377 | 0.525 | 2 | 5.0 | **0.0** | ✅ 干净 |
| 19 | `steel-structure-production-china-manufacturing-guide.md` | 562 | 0 | 0 | 1 | 15 | 0.959 | 0.295 | 0.61 | 1 | 1.8 | **0.0** | ✅ 干净 |
| 20 | `steel-structure-seismic-design-guide.md` | 882 | 0 | 0 | 1 | 16 | 1.465 | 0.343 | 0.544 | 6 | 6.8 | **0.0** | ✅ 干净 |
| 21 | `steel-structure-sports-facilities-guide.md` | 713 | 0 | 0 | 2 | 13 | 1.482 | 0.282 | 0.562 | 3 | 4.2 | **0.0** | ✅ 干净 |
| 22 | `steel-warehouse-cost-philippines-2026.md` | 647 | 0 | 0 | 1 | 33 | 0.614 | 0.393 | 0.541 | 4 | 6.2 | **0.0** | ✅ 干净 |
| 23 | `steel-warehouse-kenya-case-study-2026.md` | 688 | 0 | 0 | 0 | 11 | 0.67 | 0.479 | 0.504 | 4 | 5.8 | **0.0** | ✅ 干净 |
| 24 | `steel-warehouse-price-indonesia-sandwich-panel.md` | 619 | 0 | 1 | 0 | 15 | 1.385 | 0.336 | 0.541 | 4 | 6.5 | **0.0** | ✅ 干净 |
| 25 | `steel-warehouse-quotation-checklist.md` | 872 | 0 | 0 | 1 | 16 | 0.91 | 0.429 | 0.486 | 5 | 5.7 | **0.0** | ✅ 干净 |
| 26 | `structural-steel-price-per-kg-2026.md` | 1859 | 0 | 0 | 2 | 44 | 0.502 | 0.427 | 0.357 | 11 | 5.9 | **0.0** | ✅ 干净 |
| 27 | `top-steel-structure-manufacturers-china-2026.md` | 2126 | 0 | 0 | 4 | 33 | 0.662 | 0.475 | 0.401 | 14 | 6.6 | **0.0** | ✅ 干净 |

**语料平均分：2.3**

| 级别 | 篇数 |
|---|---:|
| 🔴 重 | 0 |
| 🟠 中 | 0 |
| 🟡 轻 | 0 |
| ✅ 干净 | 27 |

## Top 命中词（全场合计）

| 套路写法 | 命中次数 |
|---|---:|
| `\bultimately\b` | 1 |

## 优先改写清单（AI 味 ≥30）

