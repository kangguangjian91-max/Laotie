# 🚀 部署指南 - Cloudflare Pages

## 📋 前置准备

1. ✅ 代码已推送到 GitHub: `https://github.com/kangguangjian91-max/Laotie.git`
2. ✅ Next.js 已配置静态导出 (`output: "export"`)
3. ✅ 构建输出目录: `out-v10`

---

## 🌐 方案 1: Cloudflare Pages (推荐)

### 步骤 1: 注册并登录
1. 访问 https://pages.cloudflare.com
2. 点击 **"Get started"**
3. 使用 **GitHub** 登录 (授权 Cloudflare 访问你的仓库)

### 步骤 2: 创建新项目
1. 点击 **"Create a project"**
2. 选择 **"Connect to Git"**
3. 选择仓库: `kangguangjian91-max/Laotie`
4. 点击 **"Begin setup"**

### 步骤 3: 配置构建设置
填写以下信息：

| 设置项 | 值 |
|--------|-----|
| **Project name** | `laotie-steel-structure` (或自定义) |
| **Production branch** | `main` |
| **Build command** | `npm install && npm run build` |
| **Output directory** | `out-v10` |
| **Node.js version** | `18` 或 `20` |

**环境变量 (可选)**:
- 无需设置任何环境变量

### 步骤 4: 高级设置 (可选)
点击 **"Environment variables"** (可选):
- 无需设置

### 步骤 5: 部署
1. 点击 **"Save and Deploy"**
2. 等待构建 (通常 2-3 分钟)
3. 构建成功后，获得免费域名: `https://laotie-steel-structure.pages.dev`

---

## ✅ 验证部署

1. 访问分配的域名
2. 检查所有页面是否正常加载
3. 测试联系表单、导航等功能

---

## 🔄 自动部署工作流程

设置完成后：
- ✅ 每次 `git push` 到 `main` 分支，Cloudflare 自动构建并部署
- ✅ 可以在 Cloudflare Pages 后台查看构建日志
- ✅ 可以回滚到任意历史版本

---

## 🌍 自定义域名 (可选)

如果想使用自己的域名 (如 `www.laotie-steel.com`):

1. 在 Cloudflare Pages 项目后台
2. 点击 **"Custom domains"**
3. 点击 **"Set up a domain"**
4. 输入你的域名
5. 按照提示添加 DNS 记录

---

## 🔧 方案 2: 手动部署 (备用)

如果自动部署失败，可以手动构建并上传：

```bash
# 1. 本地构建
cd /c/Users/kang/WorkBuddy/2026-06-04-15-29-02/laotie-steel
npm install
npm run build

# 2. 安装 Wrangler CLI
npm install -g wrangler

# 3. 登录 Cloudflare
wrangler login

# 4. 部署
wrangler pages deploy out-v10 --project-name=laotie-steel-structure
```

---

## 📊 方案对比

| 特性 | Cloudflare Pages | Netlify |
|------|-------------------|---------|
| **免费额度** | 无限带宽 | 100GB/月 |
| **构建次数** | 500次/月 | 300分钟/月 |
| **全球 CDN** | ✅ 免费 | ✅ 免费 |
| **自动部署** | ✅ | ✅ |
| **自定义域名** | ✅ 免费 | ✅ 免费 |

---

## 🆘 常见问题

### Q1: 构建失败怎么办？
- 检查 Node.js 版本 (推荐 18 或 20)
- 检查构建日志中的错误信息
- 确保 `package.json` 中所有依赖都已正确安装

### Q2: 页面显示 404？
- 检查 `Output directory` 是否设置为 `out-v10`
- 检查构建是否成功生成了 `out-v10` 目录

### Q3: 如何查看构建日志？
- 登录 Cloudflare Pages 后台
- 点击你的项目
- 点击 **"Deployments"** 标签
- 点击任意一次部署查看详细日志

---

## 📞 需要帮助？

如果遇到问题，可以：
1. 查看 [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)
2. 检查构建日志中的错误信息
3. 联系我获取支持
