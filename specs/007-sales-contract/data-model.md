# Data Model: 销售合同管理

## 实体定义

### SalesContract (销售合同)

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 系统生成 UUID |
| no | string | 是 | 合同编号（手动输入） |
| product_name | string | 是 | 产品名称/品名 |
| customer | string | 是 | 关联的客户 ID |
| total_amount | number | 是 | 合同总金额（自动计算：单价 × 数量） |
| unit_price | number | 是 | 产品单价 |
| total_quantity | number | 是 | 合同总数量 |
| executed_quantity | number | 是 | 已执行数量（自动计算） |
| execution_percent | number | 是 | 执行百分比（自动计算） |
| receipted_amount | number | 是 | 已收款金额（自动计算） |
| receipt_percent | number | 是 | 收款百分比（自动计算） |
| debt_amount | number | 是 | 欠款金额（自动计算） |
| debt_percent | number | 是 | 欠款百分比（自动计算） |
| invoiced_amount | number | 是 | 已开发票金额（自动计算） |
| invoice_percent | number | 是 | 开票百分比（自动计算） |
| uninvoiced_amount | number | 是 | 未开票金额（自动计算） |
| uninvoiced_percent | number | 是 | 未开票百分比（自动计算） |
| sign_date | string | 是 | 合同签订日期（ISO 8601） |
| status | string | 是 | 合同状态：executing / completed / cancelled |
| remark | string | 否 | 备注信息 |
| attachments | string[] | 否 | 合同附件文件路径 |
| creator | string | 是 | 创建人用户 ID |
| created | string | 是 | 创建时间 |
| updated | string | 是 | 更新时间 |

## 关联关系

```
SalesContract (N:1) -> Customer
SalesContract (1:N) -> SalesShipment
SalesContract (1:N) -> SaleInvoice
SalesContract (1:N) -> SaleReceipt
```

## 计算规则

| 字段 | 计算公式 |
|------|----------|
| total_amount | unit_price × total_quantity |
| execution_percent | (executed_quantity / total_quantity) × 100% |
| receipt_percent | (receipted_amount / total_amount) × 100% |
| debt_amount | total_amount - receipted_amount |
| debt_percent | (debt_amount / total_amount) × 100% |
| invoice_percent | (invoiced_amount / total_amount) × 100% |
| uninvoiced_amount | total_amount - invoiced_amount |
| uninvoiced_percent | (uninvoiced_amount / total_amount) × 100% |

## 业务规则

1. **金额验证**: total_amount 必须大于 0
2. **状态自动更新**: 当 execution_percent 达到 100% 时，status 自动变更为 "completed"
3. **编号生成**: 创建时自动生成，格式为 HT-YYYYMMDD-XXX（XXX 为当天序号）
4. **权限控制**: 
   - sales: CRUD 本人创建的合同
   - purchasing: 仅读取
   - manager: 仅读取
