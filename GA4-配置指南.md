# GA4 转化跟踪配置指南

**网站**: https://www.laotie-steel.com  
**GA4 Measurement ID**: G-74QWNLKHEH  
**配置日期**: 2026-06-17  

---

## 📊 已安装的追踪事件列表

以下事件已添加到网站代码中，需要在 GA4 后台配置为转化：

| 事件名称 | 触发条件 | 事件类别 | 转化价值 |
|---------|---------|----------|----------|
| `whatsapp_click` | 用户点击 WhatsApp 联系按钮 | contact | 高 (¥500) |
| `email_click` | 用户点击邮箱链接 | contact | 中 (¥300) |
| `phone_click` | 用户点击电话链接 | contact | 中 (¥300) |
| `form_submit` | 用户成功提交联系表单 | contact | 高 (¥500) |
| `landing_page_view` | 用户访问落地页 | page_view | 中 (¥200) |
| `project_click` | 用户点击项目案例 | engagement | 低 (¥100) |
| `outbound_link` | 用户点击出站链接（如阿里巴巴） | engagement | 低 (¥50) |
| `file_download` | 用户下载文件（宣传册等） | engagement | 中 (¥200) |

---

## 🎯 第一步：验证事件是否正常工作

在配置转化之前，先验证事件是否被正确追踪：

### 1.1 打开 GA4 实时报告

1. 登录 [Google Analytics](https://analytics.google.com/)
2. 选择你的账号：`laotie-steel-com`
3. 在左侧菜单点击 **"报告"** → **"实时"**
4. 打开你的网站，触发以下事件：
   - 点击 WhatsApp 浮动按钮
   - 点击邮箱链接
   - 提交联系表单（测试数据）
   - 访问落地页（如 `/steel-structure-philippines`）

### 1.2 使用 GA4 Debug 模式

1. 在浏览器中打开你的网站
2. 按 `F12` 打开开发者工具
3. 在 Console 标签中输入：
   ```javascript
   gtag('config', 'G-74QWNLKHEH', { debug_mode: true });
   ```
4. 触发事件，观察 Console 中的 `gtag` 日志
5. 确认事件名称和参数正确

### 1.3 使用 Google Tag Assistant

1. 安装 [Google Tag Assistant](https://chrome.google.com/webstore/detail/tag-assistant/) Chrome 扩展
2. 点击扩展图标，启用录制
3. 浏览你的网站，触发事件
4. 停止录制，查看 GA4 标签是否正常工作

---

## 🎯 第二步：配置转化事件

### 2.1 创建转化事件

1. 在 GA4 后台，点击左侧菜单 **"管理"**（⚙️ 图标）
2. 在"资产"列中，点击 **"事件"**
3. 你会看到自动追踪的事件（如 `page_view`, `scroll`, `click` 等）
4. 查找自定义事件（`whatsapp_click`, `form_submit` 等）：
   - 如果事件已出现（网站已触发过），直接跳到步骤 5
   - 如果事件未出现，点击 **"创建事件"** 按钮

#### 2.1.1 手动创建事件（如果未自动出现）

假设你要创建 `whatsapp_click` 转化：

1. 点击 **"创建事件"**
2. 输入事件名称：`whatsapp_click`
3. 点击 **"创建"**
4. 在"参数"部分，可以添加条件（可选）：
   - 参数：`event_category`
   - 运算符：`等于`
   - 值：`contact`

重复以上步骤，为以下事件创建转化：
- `whatsapp_click`
- `email_click`
- `phone_click`
- `form_submit`
- `landing_page_view`
- `project_click`
- `outbound_link`（可选）
- `file_download`（可选）

### 2.2 将事件标记为转化

1. 在左侧菜单点击 **"管理"**
2. 在"资产"列中，点击 **"转化"**
3. 点击 **"新建转化事件"**
4. 输入事件名称（如 `whatsapp_click`）
5. 点击 **"保存"**
6. 重复以上步骤，将所有关键事件标记为转化

#### 推荐的转化事件优先级：

| 优先级 | 事件名称 | 原因 |
|---------|---------|------|
| 🔥 高 | `form_submit` | 直接询盘，最有可能成交 |
| 🔥 高 | `whatsapp_click` | 直接联系，高意向 |
| 🟡 中 | `email_click` | 联系意向，但可能未发送 |
| 🟡 中 | `phone_click` | 联系意向，但可能未拨打 |
| 🟡 中 | `landing_page_view` | 落地页流量，可用于评估 SEO 效果 |
| 🟢 低 | `project_click` | 参与度高，但转化意向较低 |
| 🟢 低 | `file_download` | 参与度高，可能有转化意向 |

---

## 💰 第三步：设置转化价值（可选但推荐）

### 3.1 为转化事件分配价值

1. 在 **"转化"** 页面，找到你要设置价值的转化
2. 点击转化名称右侧的 **"..."** 菜单
3. 选择 **"修改"**
4. 在"价值"部分，选择 **"为每个转化设置固定价值"**
5. 输入价值（建议）：
   - `form_submit`: ¥500
   - `whatsapp_click`: ¥500
   - `email_click`: ¥300
   - `phone_click`: ¥300
   - `landing_page_view`: ¥200
   - `project_click`: ¥100
6. 选择货币：`CNY`
7. 点击 **"保存"**

### 3.2 在代码中发送动态价值（高级）

如果你想发送实际的询盘价值（如根据用户选择的项目规模），可以修改 `trackFormSubmit` 函数：

```typescript
// 在 src/lib/gtag.ts 中修改
export const trackFormSubmit = (
  formType: "contact" | "quote" | "landing_page",
  success: boolean = true,
  value?: number  // 可选：动态价值
) => {
  trackEvent("form_submit", {
    event_category: "contact",
    event_label: formType,
    value: value || (success ? 500 : 0),  // 使用动态价值或默认值
    form_type: formType,
    form_success: success,
  });
};
```

然后在表单提交时调用：

```typescript
trackFormSubmit("contact", true, 1000);  // 价值 ¥1000
```

---

## 📈 第四步：创建自定义报告

### 4.1 创建"询盘来源分析"报告

1. 在左侧菜单点击 **"探索"**
2. 点击 **"空白"** 模板
3. 设置报告名称：`询盘来源分析`
4. 在"变量"面板中：
   - 维度：添加 `event_name`, `page_location`, `country`
   - 指标：添加 `event_count`, `conversions`, `conversion_value`
5. 在"标签页设置"中：
   - 技术：选择 **"自由格式表格"**
   - 行：拖入 `event_name`
   - 列：拖入 `event_count`, `conversions`
   - 过滤器：添加 `event_name` 包含 `whatsapp|email|form`
6. 点击 **"保存"**

### 4.2 创建"落地页效果"报告

1. 新建一个探索报告
2. 名称：`落地页效果`
3. 维度：`page_path`, `country`, `event_name`
4. 指标：`sessions`, `conversions`, `conversion_value`
5. 过滤器：`page_path` 包含 `steel-structure`
6. 可视化：选择 **"折线图"** 或 **"条形图"**

---

## 👥 第五步：创建受众群体（用于再营销）

### 5.1 创建"WhatsApp 咨询者"受众

1. 在左侧菜单点击 **"管理"**
2. 在"资产"列中，点击 **"受众群体"**
3. 点击 **"新建受众群体"**
4. 选择 **"创建自定义受众群体"**
5. 设置受众名称：`WhatsApp 咨询者`
6. 添加条件：
   - `事件` → `whatsapp_click` → `总计次数` ≥ `1`
7. 点击 **"保存"**

### 5.2 创建"落地页访问者"受众

1. 新建受众群体
2. 名称：`落地页访问者`
3. 添加条件：
   - `页面位置` → `包含` → `/steel-structure-`
   - 或者：`事件` → `landing_page_view` → `总计次数` ≥ `1`
4. 点击 **"保存"**

### 5.3 创建"高参与度用户"受众

1. 新建受众群体
2. 名称：`高参与度用户`
3. 添加条件（满足以下任意 2 个）：
   - `事件` → `project_click` → `总计次数` ≥ `2`
   - `会话持续时间` ≥ `60` 秒
   - `页面浏览量` ≥ `3`
4. 点击 **"保存"**

---

## 🔗 第六步：关联 Google Ads（用于再营销）

### 6.1 关联 GA4 到 Google Ads

1. 在 GA4 后台，点击 **"管理"**
2. 在"产品关联"列中，点击 **"Google Ads 关联"**
3. 点击 **"关联"** 按钮
4. 选择你的 Google Ads 账号
5. 按照提示完成关联

### 6.2 导入转化到 Google Ads

1. 登录 [Google Ads](https://ads.google.com/)
2. 点击右上角工具图标 ⚙️ → **"转化"**
3. 点击 **"+"** 按钮 → 选择 **"导入"** → **"Google Analytics (GA4)"**
4. 选择你要导入的转化事件（如 `form_submit`, `whatsapp_click`）
5. 点击 **"导入并继续"**
6. 设置转化价值（与 GA4 中设置的一致）

### 6.3 创建再营销列表

1. 在 Google Ads 中，点击右上角工具图标 ⚙️ → **"受众群体管理器"**
2. 点击 **"+"** 按钮 → 选择 **"Google Analytics (GA4) 受众群体"**
3. 选择你在 GA4 中创建的受众（如 `WhatsApp 咨询者`）
4. 设置保留期：`30天` 或 `540天`（最长）
5. 点击 **"创建"**

---

## ✅ 第七步：验证配置

### 7.1 检查转化是否正常工作

1. 在 GA4 后台，点击 **"报告"** → **"获客"** → **"转化"**
2. 你应该能看到已配置的转化事件
3. 触发转化事件（如在网站上提交表单）
4. 刷新报告，确认转化被记录

### 7.2 检查转化价值

1. 在"转化"报告中，添加 **"转化价值"** 指标
2. 确认价值被正确记录

### 7.3 调试常见问题

| 问题 | 可能原因 | 解决方案 |
|------|----------|----------|
| 事件未出现在 GA4 中 | 代码未正确触发 | 使用 GA4 Debug 模式检查 |
| 事件出现但未被标记为转化 | 未配置转化 | 在"管理"→"转化"中手动添加 |
| 转化价值不正确 | 价值未正确发送 | 检查代码中的 `value` 参数 |
| 重复计算转化 | 用户多次触发同一事件 | 在转化设置中启用"每次会话计数一次" |

---

## 📊 第八步：监控和优化

### 8.1 每日监控指标

- **转化数**：每天有多少询盘？
- **转化价值**：每天询盘的总价值是多少？
- **转化率**：访问者中有多少转化为询盘？
- **成本 per 转化**：如果每个询盘价值 ¥500，你愿意花多少广告费获取一个询盘？

### 8.2 优化建议

1. **提高落地页转化率**：
   - 检查落地页的 `landing_page_view` 事件数
   - 如果浏览量多但转化少，优化落地页的 CTA 按钮
   - A/B 测试不同的标题和表单设计

2. **优化高价值流量来源**：
   - 在 GA4 中查看哪个渠道带来最多的 `form_submit` 转化
   - 加大该渠道的投入（如 Google Ads、SEO、社媒）

3. **再营销**：
   - 对"WhatsApp 咨询者"受众展示广告，促成成交
   - 对"落地页访问者"受众展示优惠信息，引导他们转化

---

## 🎓 附加资源

- [GA4 转化跟踪官方文档](https://support.google.com/analytics/answer/1032415)
- [GA4 受众群体官方文档](https://support.google.com/analytics/answer/9267572)
- [Google Ads 转化导入官方文档](https://support.google.com/google-ads/answer/7012522)

---

## 📝 配置检查清单

完成以下任务后，打勾 ✅：

- [ ] 验证 `whatsapp_click` 事件在 GA4 实时报告中出现
- [ ] 验证 `form_submit` 事件在 GA4 实时报告中出现
- [ ] 将 `whatsapp_click` 标记为转化
- [ ] 将 `form_submit` 标记为转化
- [ ] 将 `email_click` 标记为转化（可选）
- [ ] 为转化设置价值
- [ ] 创建"询盘来源分析"自定义报告
- [ ] 创建"WhatsApp 咨询者"受众群体
- [ ] 关联 GA4 到 Google Ads
- [ ] 导入转化到 Google Ads
- [ ] 创建再营销列表

---

**配置完成后，你的 GA4 将能够：**
✅ 准确追踪所有询盘事件  
✅ 计算每个询盘的价值  
✅ 分析哪个渠道带来最多询盘  
✅ 对高意向用户进行再营销  
✅ 优化广告投放 ROI  

**预计完成时间**: 1-2 小时  
**技术支持**: 如需帮助，请联系你的网站技术团队。
