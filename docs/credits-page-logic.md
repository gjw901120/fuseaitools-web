# Credits 页面逻辑说明

本文档整理 `/credits` 页面的按钮显示逻辑、接口调用逻辑，以及 Subscription Credits / Recharge Credits 的展示逻辑。

---

## 一、页面与数据来源

- **路由**：`/credits`（`pages/credits.vue`）
- **数据接口**：`GET /api/user/credits-detail?page=1&size=10`
- **返回结构**（相关字段）：
  - `isSubscription`：是否显示订阅区块（0/1）
  - `isRecharge`：是否显示充值区块（0/1）
  - `subscriptionDetail`：订阅详情
  - `rechargeDetail`：充值详情
  - `creditsDetails`：消耗历史列表（分页）

页面挂载时调用 `fetchCredits(1)`，将上述字段写入对应 ref，用于控制展示与按钮逻辑。

---

## 二、Subscription Credits 展示与按钮逻辑

### 2.1 是否显示整块

| 条件 | 展示 |
|------|------|
| `isSubscription === 1` | 显示「Subscription Credits (Remaining)」整块 |
| 否则 | 不显示 |

### 2.2 依赖数据结构（subscriptionDetail）

| 字段 | 说明 |
|------|------|
| `isCancel` | 0=已终止，1=未取消 |
| `refundStatus` | 0=可操作，1=已申请退款，2=退款中 |
| `credits` | 总额度 |
| `remainingCredits` | 剩余额度 |
| `ratio` | 剩余比例 (0~1)，可选，无则用 remaining/credits 算 |
| `startDate` / `endDate` | 订阅周期 |
| `packageType` / `type` | 套餐与类型（如 Basic / Weekly） |
| `discount` | 折扣 (0~1) |

### 2.3 按钮与文案显示规则（refundStatus + isCancel）

| refundStatus | isCancel | 展示内容 |
|--------------|----------|----------|
| **0** | **1** | 两个按钮：「Cancel Subscription」「Cancel & Refund」 |
| **0** | **0** | 绿色文案「Subscription Terminated」+ 一个按钮「Cancel & Refund」 |
| **1** | — | 仅绿色文案「Refund Applied」 |
| **2** | — | 仅绿色文案「Refund In Progress」 |

- 文案使用 class `.refund-status-text`（绿色 `#059669`）。
- `refundStatus !== 0` 时不显示任何按钮。

### 2.4 进度条与下方文案

- **进度条**：宽度 = `subscriptionRatioPercent`（由 `ratio` 或 `remainingCredits/credits` 计算，0~100）。
- **进度条下方**（两端对齐）：
  - 左：`remainingCredits / credits credits`
  - 右：`subscriptionRatioPercent% remaining`

### 2.5 折扣条（Discount banner）

- 条件：`isSubscription && subscriptionDetail.discount != null`
- 展示：`Discount {{ formatDiscount(discount) }}`，并说明适用于订阅与充值。

---

## 三、Recharge Credits 展示与按钮逻辑

### 3.1 是否显示整块

| 条件 | 展示 |
|------|------|
| `isRecharge === 1` | 显示「Recharge Credits」整块 |
| 否则 | 不显示 |

### 3.2 依赖数据结构（rechargeDetail）

| 字段 | 说明 |
|------|------|
| `remainingCredits` | 剩余额度 |
| `refundStatus` | 0=可退款，1=已申请，2=退款中 |

- 进度条满格对应 **10000**（`rechargeRulerMax`），刻度为 2k / 5k / 8k / 10k。

### 3.3 按钮与文案显示规则（refundStatus）

| refundStatus | 展示内容 |
|--------------|----------|
| **0** | 按钮「Refund」 |
| **1** | 绿色文案「Refund Applied」 |
| **2** | 绿色文案「Refund In Progress」 |

### 3.4 进度条与下方文案

- **进度条**：宽度 = `min(remainingCredits/10000*100, 100)%`；≥100% 时显示能量特效。
- **进度条下方**（两端对齐）：
  - 左：`remainingCredits / 10000 credits`
  - 右：`X% remaining`；若 `remainingCredits > 10000` 显示「100%+ remaining」（加号样式突出）。

---

## 四、接口调用与触发逻辑

### 4.1 Subscription 相关

| 用户操作 | 调用接口 | 方法 | 说明 |
|----------|----------|------|------|
| 点击「Cancel Subscription」 | `/api/refund/cancel-subscription` | POST | 取消订阅；成功后再调 `fetchCredits(1)` 刷新 |
| 点击「Cancel & Refund」 | `/api/refund/refund-subscription-detail` | GET | 获取可退金额；成功则弹出「Subscription Refund」弹窗，展示可退金额与确认/取消 |
| 弹窗内点击「Confirm Refund」 | `/api/refund/refund-subscription` | POST | 提交订阅退款；成功则 Toast 成功文案、关弹窗并 `fetchCredits(1)` |

- 取消订阅：直接调 POST，无二次确认弹窗。
- 取消并退款：先 GET 拿金额 → 弹窗 → 确认后 POST。

### 4.2 Recharge 相关

| 用户操作 | 调用接口 | 方法 | 说明 |
|----------|----------|------|------|
| 点击「Refund」 | `/api/refund/refund-recharge-detail` | GET | 获取可退金额；成功则弹出「Recharge Refund」弹窗 |
| 弹窗内点击「Confirm Refund」 | `/api/refund/refund-recharge` | POST | 提交充值退款；成功则 Toast、关弹窗并 `fetchCredits(1)` |

### 4.3 错误与全局弹窗

- 所有通过 `useApi` 的请求：若返回 `errorCode !== "00000"`，由 `useApi` 在客户端统一用 **useToast** 弹出 `errorMessage`。
- 部分 catch 中也会用 `showError(e?.message)` 做补充提示（如 Recharge 的 GET 失败、确认退款失败）。

---

## 五、弹窗与成功提示

### 5.1 Subscription Refund 弹窗

- **出现条件**：GET `/api/refund/refund-subscription-detail` 返回 `errorCode === "00000"`，且 `data.refundAmount` 存在。
- **内容**：标题「Subscription Refund」，文案「Refundable amount: ${{ subscriptionRefundAmount }}」，按钮「Cancel」「Confirm Refund」。
- **Cancel**：关闭弹窗，不请求。
- **Confirm Refund**：POST `/api/refund/refund-subscription`；成功则 `showSuccess('Application submitted. Please wait for the refund to complete.')`，关闭弹窗并 `fetchCredits(1)`。

### 5.2 Recharge Refund 弹窗

- **出现条件**：GET `/api/refund/refund-recharge-detail` 返回成功且带 `data.refundAmount`。
- **内容**：标题「Recharge Refund」，文案「Refundable amount: ${{ rechargeRefundAmount }}」，按钮「Cancel」「Confirm Refund」。
- **Confirm Refund**：POST `/api/refund/refund-recharge`；成功提示同上并刷新。

两种弹窗样式一致（`.refund-modal-overlay` / `.refund-modal`），金额前带 `$`。

---

## 六、接口与前端对应关系汇总

| 接口 | 方法 | 用途 | 成功后前端行为 |
|------|------|------|----------------|
| `/api/user/credits-detail` | GET | 页初/刷新拉取积分与历史 | 更新 isSubscription、isRecharge、subscriptionDetail、rechargeDetail、creditsDetails |
| `/api/refund/cancel-subscription` | POST | 取消订阅 | 刷新 credits 页 |
| `/api/refund/refund-subscription-detail` | GET | 查询订阅可退金额 | 打开 Subscription 退款弹窗，展示金额 |
| `/api/refund/refund-subscription` | POST | 提交订阅退款 | Toast 成功、关弹窗、刷新 |
| `/api/refund/refund-recharge-detail` | GET | 查询充值可退金额 | 打开 Recharge 退款弹窗，展示金额 |
| `/api/refund/refund-recharge` | POST | 提交充值退款 | Toast 成功、关弹窗、刷新 |

---

## 七、服务端代理（server/api/refund/）

前端请求会经 Nuxt 代理到配置的后端 `apiBase`：

- `cancel-subscription.post.js` → POST `{apiBase}/refund/cancel-subscription`
- `refund-subscription-detail.get.js` → GET `{apiBase}/refund/refund-subscription-detail`
- `refund-subscription.post.js` → POST `{apiBase}/refund/refund-subscription`
- `refund-recharge-detail.get.js` → GET `{apiBase}/refund/refund-recharge-detail`
- `refund-recharge.post.js` → POST `{apiBase}/refund/refund-recharge`

以上代理均转发并携带 `Authorization` 头。

---

*文档对应实现：`pages/credits.vue`、`composables/useApi.js`、`server/api/refund/*`*
