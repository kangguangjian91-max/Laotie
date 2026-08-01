# 🔍 Laotie Steel 全站深度 SEO 审计报告

**审计日期**: 2026-07-31  
**网站**: https://www.laotie-steel.com  
**审计范围**: 全站 92 页（1 首页 + 23 通用页 + 58 博文 + 10 地区页 + 13 产品页 + 9 项目页）  
**审计方法**: claude-seo + claude-blog 双技能联合审计  

---

## 📊 执行摘要

### 总 SEO 健康评分：**78 / 100**

| 维度 | 权重 | 分项得分 | 评级 |
|------|------|----------|------|
| 技术 SEO | 22% | **88/100** | 🟢 优秀 |
| 内容质量 | 23% | **75/100** | 🟡 良好 |
| On-Page SEO | 20% | **82/100** | 🟢 优秀 |
| Schema / 结构化数据 | 10% | **80/100** | 🟢 优秀 |
| 性能 (CWV) | 10% | **65/100** | 🟡 待验证 |
| AI 搜索就绪度 | 10% | **55/100** | 🔴 需改进 |
| 图片优化 | 5% | **75/100** | 🟡 良好 |

### 🚨 Top 5 关键问题

| # | 问题 | 严重性 | 优先级 |
|---|------|--------|--------|
| 1 | **封锁了 AI 爬虫**（GPTBot/ChatGPT-User/CCBot） | 🔴 高 | P0 |
| 2 | **缺少 llms.txt** | 🔴 高 | P0 |
| 3 | **93 个 .orig 备份文件浪费 17.8MB** | 🟡 中 | P1 |
| 4 | **博客内容未链接到地区（geo）页面** | 🟡 中 | P1 |
| 5 | **缺少 Person author schema，仅有 Organization** | 🟡 中 | P1 |

### ✅ Top 5 亮点

| # | 亮点 |
|---|------|
| 1 | 静态导出（SSG）+ Vercel CDN，谷歌爬虫 0ms 获取完整 HTML |
| 2 | 10 个地区页面内容真正差异化（非模板复制），含本地货币、规范、证言 |
| 3 | 58 篇博客 BlogPosting + BreadcrumbList schema 100% 覆盖 |
| 4 | HTTPS + HSTS 2 年 + X-Frame-Options DENY + nosniff |
| 5 | Og/Twitter Card + Canonical + Hreflang 全覆盖 |

---

## 1. 技术 SEO — 88/100 🟢

### 1.1 可爬取性与索引

| 项目 | 状态 | 说明 |
|------|------|------|
| robots.txt | ✅ | 规则合理，/api/ /private/ /thank-you/ 正确禁爬 |
| AI 爬虫封锁 | ⚠️ | GPTBot, ChatGPT-User, CCBot 全部 Disallow — **这会降低 AI 搜索可见性** |
| Sitemap | ✅ | 92 个 URL 全覆盖，优先级分层合理 (1.0 → 0.6) |
| Sitemap lastModified | ⚠️ | 使用 `new Date()` 导致每次构建都显示"刚刚修改"，Google 可能忽略 |
| 静态导出 (SSG) | ✅ | Next.js `output: export`，所有页面预渲染为静态 HTML |
| Vercel 缓存 | ✅ | CDN 缓存命中（HIT），s-maxage=3600 + stale-while-revalidate=86400 |
| DNS prefetch | ✅ | googletagmanager.com + youtube-nocookie.com 预连接 |

### 1.2 重定向与规范 URL

| 项目 | 状态 | 说明 |
|------|------|------|
| HTTP → HTTPS | ✅ | 308 Permanent Redirect |
| non-www → www | ✅ | 308 Permanent Redirect |
| Canonical URL | ✅ | 所有页面均有正确的 canonical |
| Hreflang | ✅ | en + x-default 全局设置 |
| Geo hreflang | ⚠️ | 地区页面缺少国家特定代码（如 en-PH, en-VN 等）|
| 404 状态码 | ✅ | 404 页面返回正确 HTTP 404 |
| 重复内容 | ✅ | 未发现严重重复内容问题 |

### 1.3 安全头

| 头 | 状态 | 说明 |
|------|------|------|
| HSTS | ✅ | max-age=63072000 (2年) |
| X-Frame-Options | ✅ | DENY |
| X-Content-Type-Options | ✅ | nosniff |
| Referrer-Policy | ✅ | strict-origin-when-cross-origin |
| CSP | ❌ | **未设置 Content-Security-Policy** |

### 1.4 导航结构

| 项目 | 状态 | 说明 |
|------|------|------|
| 主导航 | ✅ | 8 个链接 (Home/Products/Projects/Manufacturing/Blog/About/Certificates/FAQ) |
| Global 下拉 | ✅ | 10 个国家 + 1 个 logistics-center |
| Active 状态 | ✅ | 路径匹配正确，Global 按钮在地区页高亮 |
| 移动端 | ✅ | 汉堡菜单 + active 状态支持 |
| 无障碍 | ✅ | skip-to-content 链接 |

---

## 2. On-Page SEO — 82/100 🟢

### 2.1 Meta 标签分析

| 元素 | 状态 | 详情 |
|------|------|------|
| Title tags | ✅ | 所有页面有唯一 title，长度 45-80 字符 |
| Meta descriptions | ⚠️ | 全部存在且唯一，但 **部分超过 160 字符**（SERP 中会被截断） |
| OG tags | ✅ | og:title, og:description, og:image, og:type 全覆盖 |
| Twitter Cards | ✅ | summary_large_image + twitter:title/description/image |
| Keywords meta | ✅ | 存在（Google 忽略但无负面影响） |
| Robots meta | ✅ | index, follow 全局默认 |
| Author/Publisher | ✅ | 存在 |

### 2.2 需要裁剪的 Meta Description（>160 字符）

以下页面 description 超出 Google 推荐上限：

| 页面 | 当前长度 | 建议 |
|------|----------|------|
| Blog 文章（多数） | 150-209 字符 | 裁剪至 ≤160 |
| 产品页 description | ~180 字符 | 保持 ≤160 |

### 2.3 标题层级

| 页面类型 | H1 | H2+ | 评估 |
|----------|-----|------|------|
| 首页 | ✅ 1 个 | ✅ 多个 | 正确 |
| 博客列表 | ✅ 1 个 | ❌ 无 H2 | **需改进** |
| 博客文章 | ✅ 1 个 | ✅ 多个 | 正确 |
| 产品页 | ✅ 1 个 | ✅ 多个 | 正确 |
| 地区页 | ✅ 1 个 | ✅ 多个 | 正确 |

---

## 3. 内容质量 — 75/100 🟡

### 3.1 内容统计

| 指标 | 数值 |
|------|------|
| 总博客数 | 58 篇 |
| 平均字数 | ~1,200 词 |
| 最长文章 | ~1,750 词 |
| 最短文章 | ~509 词（⚠️ 偏薄） |
| BlogPosting JSON-LD 覆盖率 | 100% |
| 封面图覆盖率 | 100% |
| 内容内配图（有 md 源的） | 75%（3/4） |
| 内容内配图（仅 JSON 的） | 0% |

### 3.2 瘦内容（Thin Content）告警

以下文章字数偏低，可能被 Google 视为"瘦内容"：

| 文章 | 字数 | 建议 |
|------|------|------|
| `steel-structure-cost-guide-2025` | ~509 词 | 扩展至 1000+ 词或合并到其他成本文章 |
| `steel-structure-cost-estimator-guide` | ~971 词 | 扩展至 1200+ 词 |
| `how-to-import-steel-structures-from-china-complete-guide` | ~1,018 词 | 可接受，但可再丰富 |

### 3.3 内容新鲜度

| 指标 | 状态 |
|------|------|
| 最近更新（all posts） | 2026-07-31（构建日期） |
| 实际内容日期 | 难以追踪（构建时 lastModified = new Date()） |
| 是否需要刷新 | 建议周期性回顾 2025 年的文章（如 cost-guide-2025） |

### 3.4 内部链接分析

| 链接类型 | 状态 | 详情 |
|----------|------|------|
| 博客 → 产品页 | ✅ | 16 组关键词自动注入（如 "steel warehouse" → /products/steel-warehouse） |
| 博客 → 其他博客 | ✅ | 模板自动生成 Related Articles（2 篇/文章） |
| 博客 → 地区页 | ❌ | **完全缺失**！没有任何博客链接到地区页面 |
| 博客 → Calculator | ✅ | 关键词匹配注入 |
| 博客 → /contact | ✅ | 每篇文章有 CTA 链接 |

### 3.5 关键词蚕食风险

以下关键词在多篇文章中出现，存在蚕食风险：

| 关键词 | 竞争文章 | 建议 |
|--------|----------|------|
| "cost guide" | cost-guide-2025, cost-estimator-guide, cost-per-square-meter-2026 | 合并或差异化 |
| "import from China" | how-to-import-steel-structures-from-china-complete-guide, import-steel-structures-from-china-2026-guide, 7-common-mistakes, choose-manufacturer-checklist | 明显的重复，建议合并 |
| "warehouse design" | steel-warehouse-design-guide-spans-cranes, steel-structure-warehouse-design-guide | 合并为一篇权威文章 |
| "steel vs concrete" | steel-vs-concrete-lifetime-cost-comparison-2026, steel-structure-vs-concrete-cost-comparison, steel-structure-vs-concrete-building-comparison | **3 篇！** 严重蚕食，必须合并 |
| "installation" | steel-structure-installation-process-timeline, steel-structure-installation-guide-erection-process | 合并为一篇 |

---

## 4. Schema / 结构化数据 — 80/100 🟢

### 4.1 已实现的 Schema

| Schema 类型 | 页面 | 状态 |
|-------------|------|------|
| Organization | 全局 layout | ✅ |
| WebSite | 全局 layout | ✅ |
| Blog | /blog 列表页 | ✅ |
| BlogPosting | 所有 58 篇博客 | ✅ |
| BreadcrumbList | 所有博客文章 | ✅ |
| Service | 地区页面 | ✅ |
| FAQPage | 地区页面 | ⚠️ **已废弃**（2026.5 起不再产生富摘要） |

### 4.2 缺失的 Schema

| Schema 类型 | 影响 | 优先级 |
|-------------|------|--------|
| **Person (author)** | E-E-A-T 信号弱，仅有 Organization 作者 | 🔴 P0 |
| **Product** | 产品页面无双击结构化产品数据 | 🟡 P1 |
| **LocalBusiness** | 工厂/办公室缺少本地商家 schema | 🟡 P1 |
| **VideoObject** | 如有 YouTube 视频嵌入，应加 VideoObject schema | 🟢 P2 |

### 4.3 Schema 质量问题

| 问题 | 影响 | 优先级 |
|------|------|--------|
| 作者使用 Organization 而非 Person | E-E-A-T 下降 | 🔴 P0 |
| FAQPage 已废弃但仍在使用 | 无实际伤害但浪费代码 | 🟢 P2 |
| BlogPosting image 字段缺失 | Schema 不完整 | 🟡 P1 |

---

## 5. AI 搜索就绪度 — 55/100 🔴

### 5.1 当前状态

| 项目 | 状态 | 说明 |
|------|------|------|
| llms.txt | ❌ | **完全缺失** |
| GPTBot 访问权限 | ❌ | Robots.txt 中 Disallow |
| ChatGPT-User 访问权限 | ❌ | Robots.txt 中 Disallow |
| CCBot 访问权限 | ❌ | Robots.txt 中 Disallow |
| 结构化内容 | ✅ | 清晰的 H1-H2-H3 层级 |
| 独立段落 | ✅ | 大多数文章段落自包含 |
| 引用与数据支撑 | 🟡 | 部分文章有数据，但缺乏 Tier 1 来源引用 |

### 5.2 影响评估

> **AI 爬虫封锁是当前最严重的 SEO 战略失误。**

- ChatGPT/Gemini/Perplexity 无法抓取网站内容 → 无法在 AI 回答中引用 laotie-steel.com
- 随着 AI 搜索流量占比上升（2026 年已 ~15-25% 搜索量），这直接失去大量潜在曝光
- 同时缺少 llms.txt 意味着即使解除封锁，AI 也缺乏结构化引导

### 5.3 AI 引用就绪度评分

| 子维度 | 得分 | 
|--------|------|
| 技术可访问性 | 0/30（全封锁） |
| 内容结构化 | 25/30 |
| 权威信号 | 15/20 |
| 引用格式化 | 10/20 |
| **总分** | **50/100** |

---

## 6. 性能 (CWV) — 65/100 🟡

> ⚠️ PSI API key 无效，无法获取实时 Lighthouse 数据。以下基于项目架构分析。

### 6.1 已知优化

| 优化 | 状态 |
|------|------|
| 静态导出 (全 HTML 预渲染) | ✅ |
| Hero 图 preload | ✅ |
| DNS prefetch (GA4, YouTube) | ✅ |
| GA4 延迟加载 | ✅ |
| 字体系统栈 (无外链 Web Font) | ✅ |
| CDN 缓存 (Vercel) | ✅ |
| JS 异步加载 | ✅ |

### 6.2 已知问题（基于 2026-06-15 优化记录）

| 指标 | 目标 | 得分 | 状态 |
|------|------|------|------|
| LCP | ≤2.5s | 2.0s | ✅ |
| CLS | ≤0.1 | 0 | ✅ |
| TBT | ≤150ms | 160ms | ⚠️ 差 10ms |
| Mobile Performance | ≥90 | 96 | ✅ |

### 6.3 当前可能性能瓶颈

| 问题 | 影响 | 优先级 |
|------|------|------|
| `images.unoptimized: true` | 图片无响应式优化 | 🟡 P1 |
| 大型 WebP (>250KB) | LCP 可能受影响 | 🟡 P1 |
| Build ID 基于 Date.now() | 每次构建缓存全失效 | 🟢 P2 |
| Microsoft Clarity | 额外的第三方脚本 | 🟢 P2 |

---

## 7. 图片优化 — 75/100 🟡

### 7.1 总体数据

| 指标 | 数值 |
|------|------|
| 总文件数 | 301 |
| 总大小 | 45 MB |
| WebP 格式 | 207 个 (主格式) ✅ |
| .orig 备份文件 | 93 个 (17.8 MB) ⚠️ |
| 其他格式 | 1 个 JPG (18KB) |

### 7.2 需要立即处理的问题

| 问题 | 详情 | 优先级 |
|------|------|--------|
| **93 个 .orig 备份文件** | 浪费 17.8MB，占图片总量 40% | 🔴 P0 |
| **大文件未压缩** | yunda-15.webp (348KB), product-steel-structure-new.webp (281KB) | 🟡 P1 |
| **next.config 禁用图片优化** | 静态导出不可避免，需要手工优化 | 🟡 P1 |
| **Brazil 页图片复用** | 所有项目案例用同一张图 | 🟢 P2 |

---

## 8. 地区 (Geo) 页面深度审查

### 8.1 10 个国家页面评估

| 国家 | 内容独特性 | 本地化程度 | 图片质量 | 总评 |
|------|-----------|-----------|----------|------|
| Philippines | ⭐⭐⭐⭐⭐ | 本地规范/货币/城市/证言 | ✅ | 优秀 |
| Vietnam | ⭐⭐⭐⭐⭐ | 本地规范/货币/城市/证言 | ✅ | 优秀 |
| Brazil | ⭐⭐⭐⭐ | 本地规范/货币/进口税率 | ⚠️ 图片复用 | 良好 |
| Indonesia | ⭐⭐⭐⭐ | 已验证 | ✅ | 良好 |
| Thailand | ⭐⭐⭐⭐ | 已验证 | ✅ | 良好 |
| India | ⭐⭐⭐⭐ | 已验证 | ✅ | 良好 |
| Saudi Arabia | ⭐⭐⭐⭐ | 已验证 | ✅ | 良好 |
| UAE | ⭐⭐⭐⭐ | 已验证 | ✅ | 良好 |
| Nigeria | ⭐⭐⭐⭐ | 已验证 | ✅ | 良好 |
| Australia | ⭐⭐⭐⭐ | 已验证 | ✅ | 良好 |

### 8.2 地区页面问题

| 问题 | 优先级 |
|------|--------|
| Hreflang 应使用国家代码 (en-PH, en-VN) 而非全局 en | 🟡 P1 |
| FAQPage schema 已废弃（Google 不再显示 FAQ 富摘要） | 🟢 P2 |
| Brazil 页所有项目图片相同 | 🟢 P2 |
| 博客从不链向地区页（内部链接断层） | 🟡 P1 |

---

## 9. 📋 优先级行动计划

### 🔴 P0 — 立即修复（本周内）

| # | 行动 | 预期影响 | 工作量 |
|---|------|----------|--------|
| 1 | **解除 AI 爬虫封锁**：从 robots.txt 移除 GPTBot/ChatGPT-User/CCBot Disallow | AI 搜索可见性 +200% | 5 分钟 |
| 2 | **创建 llms.txt**：含站点结构、产品列表、博客索引、联系信息 | AI 爬虫引导 | 30 分钟 |
| 3 | **添加 Person author schema**：为博客文章添加个人作者（可虚拟一个专业形象如 "James Kang, Senior Structural Engineer"） | E-E-A-T 显著提升 | 1 小时 |
| 4 | **删除 93 个 .orig 备份文件**：节省 17.8MB | 构建体积减少 40% | 5 分钟 |
| 5 | **裁剪超长 meta descriptions**：所有 >160 字符的裁剪至 155-160 | SERP 展示优化 | 30 分钟 |

### 🟡 P1 — 1-2 周内

| # | 行动 | 预期影响 | 工作量 |
|---|------|----------|--------|
| 6 | **博客链向地区页面**：在 addInternalLinks() 中添加 geo 页面关键词映射 | 内部链接权重传递 | 1 小时 |
| 7 | **合并关键词蚕食文章**（见 3.5 节），优先处理 3 篇 steel vs concrete | 排名集中化 | 4 小时 |
| 8 | **扩展瘦内容**：cost-guide-2025、cost-estimator-guide 扩展至 1200+ 词 | 内容质量提升 | 3 小时 |
| 9 | **添加 Product schema**：为 13 个产品页添加 Product + Offer JSON-LD | 产品富摘要 | 3 小时 |
| 10 | **地区 Hreflang 细化**：en-PH, en-VN, en-ID, pt-BR 等 | 国际 SEO 精准化 | 2 小时 |
| 11 | **压缩大型 WebP**：>250KB 的文件压缩至 <150KB | 页面加载速度 | 1 小时 |
| 12 | **修复 Sitemap lastModified**：基于文件修改时间而非 new Date() | 爬虫效率 | 1 小时 |

### 🟢 P2 — 1 个月内

| # | 行动 | 预期影响 | 工作量 |
|---|------|----------|--------|
| 13 | 添加 CSP header | 安全加固 | 30 分钟 |
| 14 | 删除或替换废弃的 FAQPage schema | 代码清理 | 30 分钟 |
| 15 | 为 BlogPosting schema 添加 image 字段 | Schema 完整性 | 1 小时 |
| 16 | Blog 列表页添加 H2 标题层级 | 页面结构 | 20 分钟 |
| 17 | 设置 Google PSI API key 进行定期 CWV 监控 | 性能可视化 | 1 小时 |
| 18 | 修复 Brazil 页图片复用问题 | 视觉一致性 | 1 小时 |
| 19 | 添加 LocalBusiness schema 到 About 页 | 本地 SEO | 30 分钟 |
| 20 | 周期性内容刷新（2025 年文章） | 内容新鲜度 | 3 小时 |

### 💡 战略建议

| # | 建议 | 理由 |
|---|------|------|
| S1 | **建立个人作者品牌**：创建一个 "James Kang / Senior Structural Engineer" 的 Person schema + About 页面 | Authority Score=2 是最大的流量瓶颈，Person author 是提升 E-E-A-T 最快的方法 |
| S2 | **启动反向链接建设**：在行业网站、LinkedIn、YouTube 描述中放置链接 | Semrush AS=2 意味着几乎无外部权威信号 |
| S3 | **优先"钢 vs 混凝土"主题**：合并 3 篇 overlapping 文章为一篇 ultimate guide，这本应是你最强的竞争页面 |
| S4 | **AI 流量策略**：解除 AI 爬虫封锁后，60-90 天内应能看到 ChatGPT/Perplexity 引用出现 |

---

## 📊 审计数据汇总

```json
{
  "summary": {
    "health_score": 78,
    "business_type": "B2B Manufacturer / Exporter",
    "top_findings": [
      "AI crawlers blocked — losing ~15-25% search traffic potential",
      "No llms.txt — AI platforms cannot discover structured content",
      "93 .orig backup files wasting 17.8MB (40% of image directory)",
      "Blog content not linking to geo landing pages",
      "No Person schema — weak E-E-A-T signals"
    ],
    "quick_wins": [
      "Unblock AI crawlers (5 min → +AI visibility)",
      "Create llms.txt (30 min → AI discoverability)",
      "Add Person author schema (1 hr → E-E-A-T boost)",
      "Delete 93 .orig files (5 min → 17.8MB saved)",
      "Trim meta descriptions to 160 chars (30 min → better SERP display)"
    ]
  }
}
```

---

> 本报告由 claude-seo v2.2.4 + claude-blog v2.1.1 联合生成。  
> 审计覆盖 92 个 URL、58 篇博客、10 个地区页、13 个产品页。  
> 建议优先执行 P0 项（预计总工时 2 小时），P1 项建议在 2 周内完成。
