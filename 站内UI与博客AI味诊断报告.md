# 站内 UI 美化 + 博客「AI 味」诊断报告

> 检测时间：2026-10-09 | 站点：laotie-steel.com | 方法：Chrome headless 实测（视口 390 / 1440）+ 全站源码静态分析 + 27 篇博客语料量化
> 原则：**不动任何文字内容、标题层级、内链、图片 alt** → 保证 SEO 零风险

---

## 一、结论速览

| 项目 | 状态 | 说明 |
|---|---|---|
| 移动端横向溢出 | 🔴 **P0** | 全站每页 `scrollWidth=404` vs 视口 390，可左右拖动 |
| Cookie 弹窗（移动端） | 🔴 **P0** | 占满下半屏，遮挡正文与 CTA |
| 色板漂移 | 🟠 **P1** | 深蓝 5 套 / 亮蓝 5 套 / 绿 6 套 / 橙 2 套，token 形同虚设 |
| 产品页图文高度失衡 | 🟡 P2 | 文字块远短于图片 → 大片空白 |
| 博客卡片图比例 | 🟡 P2 | 实际约 2.3:1（非 16:9），信息被裁 |
| 博客 AI 套路词 | ✅ **干净** | 27 篇 heavy=**0**、medium=**1**，已规避 cliché |
| 博客 em dash 密度 | 🟠 **真指纹** | 平均 12.8/千词（人类写作 <5），19 篇超标 |
| 具体工程细节 | ⚠️ 参差 | 2 篇为 0 处，明显缺「真工程师味」 |

**一句话**：UI 有 2 个 P0 硬伤必须先修（其中横向溢出还会牵连移动端 SEO）；博客的问题**不是"AI 套话"**，而是**em dash 泛滥 + 缺具体数字细节**——这反而好改，且改完 SEO 更稳。

---

## 二、UI 问题明细

### 🔴 P0-1 移动端横向溢出（牵连 SEO）

**实测证据**（iframe 探针 @390px）：

```
viewportWidth            = 390
documentElement.scrollWidth = 404   ← 溢出 14px
OVERFLOW                 = true
OVER_COUNT               = 3
```

**根因三元组**：

| 元素 | 位置 | 实测 |
|---|---|---|
| `div.flex.items-center.gap-6` | `src/components/Footer.tsx:282` | right=404, **w=433** |
| `a.hover:text-steel-accent` | Footer 子链接 | right=404 |
| `div.absolute.top-0.right-0.w-96` | Hero 装饰模糊圆 | right=567（有 overflow-hidden，不撑破） |

Footer 底部 6 个链接（FAQ / Certificates / Privacy Policy / Terms of Service / Sitemap / Steel Structure Guide）在 `gap-6`(24px) 下一字排开 = 433px > 390px。

**为什么必须修**：Footer 是全站共享组件 → **每个页面都在溢**。移动端可横向拖动会直接被 Google 移动优先索引判为体验缺陷，间接影响排名。

**修复（1 行）**：
```diff
- <div className="flex items-center gap-6">
+ <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
```

---

### 🔴 P0-2 Cookie 弹窗移动端遮挡

截图显示：390px 宽下弹窗自底部升起后占据约 **55% 屏高**，正好压住 Hero 的 CTA 按钮与视频区。真实访客首次进站，第一眼看到的是政策文本，而不是产品。

**建议**：移动端默认收成单行条（`We use cookies. [Accept] [Reject] [Details]`），点 Details 再展开。桌面端维持现状。

**风险**：合规项，文字内容不能删，只调布局。

---

### 🟠 P1 色板漂移（专业度杀手）

`globals.css` 的 `@theme` 已定义规范 token：

```css
--color-steel:        #1a365d
--color-steel-light:  #2a4a7f
--color-steel-accent: #1d65c4
--color-cta:          #e67e22
--color-cta-hover:    #d35400
--color-green-badge:  #1D9E75
```

但源码里实际在用的硬编码色（全站统计）：

| 色系 | 规范 token | 实际在用的其他值 | 套数 |
|---|---|---|---|
| 橙 CTA | `#e67e22` | `#ff6b00`×14、`#e55a00`×4 | **2** |
| 深蓝 | `#1a365d` | `#0a1628`、`#0d2137`、`#1e3a5f`、`#1b3a6b` | **5** |
| 亮蓝 | `#1d65c4` | `#378add`、`#3b82f6`、`#38bdf8`、`#7dd3fc` | **5** |
| 绿 | `#1D9E75` | `#25d366`、`#128c7e`、`#1da851`、`#22c55e`、`#14b8a6` | **6** |

结果：Hero 的橙色播放按钮 (`#FF6B00`) 与页脚 CTA (`#e67e22`) 不是同一个橙；「Delivered Globally」渐变的蓝和导航高亮的蓝也不同源。**访客说不出哪里怪，但会觉得"不像一家厂做的"。**

> 注：`#25d366`/`#128c7e` 是 WhatsApp 品牌色，**应保留**（外部品牌规范）。其余收敛。

---

### 🟡 P2 细节

| # | 问题 | 位置 |
|---|---|---|
| 1 | Hero 标题第三行 `text-[0.65em]` 灰字，层级坍缩成"小注" | `Hero.tsx:59` |
| 2 | 产品页文字块高度远小于图片 → 每块下方留大片空白 | `/products` |
| 3 | 博客卡片封面实际约 2.3:1 超宽比例，图片被裁 | `/blog` |
| 4 | 博客卡片竖向间距偏大（约 60px），滚动节奏松散 | `/blog` |
| 5 | 分类计数（27 / 21 / 19…）灰度过低，近乎不可见 | `/blog` 侧栏 |

---

## 三、博客「AI 味」量化结果

**方法**：套路词密度 + 结构指纹 + 句/段节奏变异系数 + 词汇多样性 + 具体性反向加分。分数越高越像 AI。
**判级**：🔴≥45 重 / 🟠30-45 中 / 🟡18-30 轻 / ✅<18 干净

### 总账

| 级别 | 篇数 |
|---|---:|
| 🔴 重 | **0** |
| 🟠 中 | 2 |
| 🟡 轻 | 5 |
| ✅ 干净 | 20 |

**语料平均分：10.4 / 100**

### 关键发现 1：套路词几乎为零 ✅

27 篇合计：🔴重罪词 **0**、🟠中罪词仅 **1**。
说明写作时已刻意规避 `delve` / `testament` / `in today's landscape` / `it's worth noting` 这类 LLM 招牌词。**这一层不用动。**

### 关键发现 2：em dash 是真指纹 🟠

> ⚠️ 注意：`30–50%`、`$9–$15` 里的短横是 **en dash（数字范围）**，属正确排版，**不是 AI 味**。已剔除，下表只统计 **em dash `—`**（插入语/断句），这才是 LLM 高发癖好。

| 文件 | 词数 | em— | 千词密度 | AI味分 |
|---|---:|---:|---:|---:|
| `steel-structure-factory-inspection-qc-checklist-2026.md` | 920 | 27 | **29.3** | 10.2 |
| `steel-vs-concrete-lifetime-cost-comparison-2026.md` | 899 | 23 | **25.6** | 14.8 |
| `steel-structure-maintenance-guide-lifespan-corrosion.md` | 922 | 23 | **24.9** | 14.2 |
| `how-to-estimate-structural-steel-2026.md` | 526 | 11 | **20.9** | 6.0 |
| `import-steel-structures-from-china-2026-guide.md` | 362 | 7 | **19.3** | 9.8 |
| `light-gauge-steel-buildings-guide.md` | 1685 | 31 | **18.4** | 13.1 |
| `sustainable-steel-structures-leed-green-building.md` | 723 | 13 | **18.0** | 18.9 |
| `steel-structure-foundation-guide-types-cost.md` | 400 | 7 | **17.5** | 5.5 |
| `top-steel-structure-manufacturers-china-2026.md` | 2126 | 36 | **16.9** | 16.5 |
| `steel-warehouse-kenya-case-study-2026.md` | 688 | 11 | **16.0** | 2.5 |
| *(其余 9 篇 8~15/千词)* | | | | |

人类商务写作 em dash 密度通常 **<5/千词**。上表 19 篇超过 15/千词 → 视觉上一眼"机器味"。

**改法（不影响 SEO）**：把 `—` 改写为句号、逗号或括号。**词数基本不变，关键词一个不动**。

### 关键发现 3：两篇该"补肉"

| 文件 | 具体细节数 | 问题 |
|---|---:|---|
| `steel-structure-cost-philippines-indonesia-vietnam.md` | **0** | 508 词里没有一个钢号/牌号/单价/吨位 |
| `steel-warehouse-design-guide-spans-cranes.md` | **0** | 360 词，同样全空；也是 AI 味分最高的之一 |

真工程师写文章会自然带出 `Q355B`、`C/Z 檩条`、`$32–55/sqm`、`1,200 kg/m³` 这类硬数字。**补具体参数是"去 AI 味"最有效的手段**，同时还能提升 E-E-A-T 与 AI 引用率 → **SEO 正向**。

### 需优先处理的 7 篇（🟠中 + 🟡轻）

1. `steel-structure-cost-philippines-indonesia-vietnam.md` — 35.1 🟠
2. `steel-warehouse-design-guide-spans-cranes.md` — 32.6 🟠
3. `steel-structure-installation-guide-erection-process.md` — 21.7 🟡
4. `steel-structure-seismic-design-guide.md` — 20.7 🟡
5. `steel-warehouse-price-indonesia-sandwich-panel.md` — 19.0 🟡
6. `sustainable-steel-structures-leed-green-building.md` — 18.9 🟡
7. `steel-structure-processing-techniques-cnc-welding-guide.md` — 18.5 🟡

---

## 四、执行方案（工具映射）

| 任务 | 工具 | 风险 | SEO 影响 |
|---|---|---|---|
| P0-1 横向溢出修复 | 直接改 `Footer.tsx` 1 行 | 极低 | ✅ 正向（修移动体验） |
| P0-2 Cookie 弹窗 | 改 `CookieConsent.tsx` 布局 | 低 | ✅ 正向（不遮首屏） |
| P1 色板收敛 | 改 `globals.css` + 替换硬编码色 | 低 | ⚪ 中性（纯视觉） |
| P2 细节打磨 | 改各组件 className | 低 | ✅ 正向 |
| 博客 em dash 瘦身（19 篇） | `blog-rewrite` 技能 | 中 | ⚪ 中性（词数/关键词不变） |
| 博客补具体参数（2 篇重点） | `blog-rewrite` + 你的行业数据 | 中 | ✅ 正向（E-E-A-T） |
| 改完对账 | `blog-seo-check` 技能 | — | 🔒 守卫 |

### SEO 保障（三重锁）

1. **UI 改动只碰 className / CSS 变量** —— 不删文字、不改 `<h1>`~`<h3>` 层级、不动 `<a href>`、不动 `alt`
2. **博客改动只换标点与补数据** —— 目标关键词、title、meta description、内链锚文本**全部冻结**
3. **改完跑 `blog-seo-check`** —— 8 项逐条对照（title 长度 / meta / 标题层级 / 内链锚文本 / canonical / OG / 结构化数据 / 图片 alt），任一项退化即回滚

---

## 五、验证方法

| 项 | 命令 / 方式 | 通过标准 |
|---|---|---|
| 横向溢出 | iframe 探针 @390px | `scrollWidth <= 390` |
| 色板收敛 | `grep -rhoE '#[0-9a-fA-F]{6}' src/` | 除 WhatsApp 绿外，仅剩 token 值 |
| 视觉回归 | Chrome headless 截图对比 | 无布局塌陷 |
| AI 味 | `python _scripts/ai_flavor_audit.py` | 平均分 ≤8，em dash 千词 ≤6 |
| SEO 不退化 | `blog-seo-check` | 8 项全绿 |

---

*附：AI 味完整明细见 `AI_FLAVOR_REPORT.md`；截图存于 `_audit/ui-shots/`*
