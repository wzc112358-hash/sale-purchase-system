# Research: 销售-收款管理

## 技术方案研究

### 技术栈确认

本功能基于现有技术栈实现：

| 技术 | 版本 | 用途 |
|------|------|------|
| React | 18+ | UI框架 |
| TypeScript | 5.x | 开发语言 |
| Ant Design | 5.x | UI组件库 |
| PocketBase SDK | 最新 | 后端API |
| react-router-dom | 6.x | 路由管理 |

### PocketBase 集合确认

根据需求文档，`sale_receipts` 集合已定义：

| 字段名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| product_name | 文本 | 是 | 产品名称 |
| sales_contract | 关系 -> sales_contracts | 是 | 关联的销售合同 |
| amount | 数字 | 是 | 收款金额 |
| product_amount | 数字 | 是 | 收款对应的产品数量 |
| receipt_date | 日期 | 是 | 收款日期 |
| method | 文本 | 否 | 收款方式 |
| account | 文本 | 否 | 收款账户 |
| remark | 文本 | 否 | 备注 |
| attachments | 文件 | 否 | 收款凭证附件 |
| creator | 关系 -> users | 是 | 创建人 |

### 自动计算逻辑

根据需求文档 2.4.1 节，销售合同的收款相关字段计算规则：

- **receipt_percent** = (receipted_amount / total_amount) × 100%
- **debt_amount** = total_amount - receipted_amount
- **debt_percent** = (debt_amount / total_amount) × 100%

这些计算由 PocketBase 后端钩子自动处理，前端只需调用API创建/更新/删除收款记录。

### 最佳实践参考

1. **API调用模式**: 使用 PocketBase SDK 封装专用 API 模块
2. **错误处理**: 遵循 Constitution 中的错误处理标准，处理组件卸载导致的请求取消
3. **表单上传**: 遵循 Constitution 中的 Ant Design Form File Upload 规范
4. **组件结构**: 列表页面 + 详情抽屉/弹窗 + 表单弹窗模式

### 决策

- 收款列表使用 Table 组件展示
- 新增/编辑使用 Modal + Form 组件
- 详情使用 Drawer 组件展示
- 文件上传使用 Ant Design Upload 组件
- 搜索使用 Input 和 DatePicker 组合
- 分页使用 Table 内置分页

## 结论

技术方案已确定，无需进一步研究。准备进入 Phase 1 设计阶段。
