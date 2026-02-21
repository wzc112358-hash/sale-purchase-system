# Data Model: 销售发票管理

## Entity: SaleInvoice (销售发票)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string (UUID) | Auto | 系统生成唯一标识 |
| no | string | Yes | 发票号码 |
| product_name | string | Yes | 产品名称 |
| sales_contract | relation (sales_contracts) | Yes | 关联的销售合同 |
| invoice_type | string | Yes | 发票类型 |
| product_amount | number | Yes | 发票对应的产品数量 |
| amount | number | Yes | 发票金额 |
| issue_date | date (ISO 8601) | Yes | 开票日期 |
| remark | string | No | 备注信息 |
| attachments | file[] | No | 发票附件 |
| creator | relation (users) | Yes | 创建人 |

## Relationships

- **SaleInvoice → SalesContract**: 多对一关系 (一个发票对应一个销售合同)
- **SalesContract → SaleInvoice**: 一对多关系 (一个销售合同可包含多个发票)

## Validation Rules

1. **金额校验**: `amount <= (sales_contract.total_amount - sales_contract.invoiced_amount)`
2. **必填字段**: no, product_name, sales_contract, invoice_type, product_amount, amount, issue_date
3. **数值范围**: amount > 0, product_amount > 0

## State Transitions

发票记录无状态变更，始终保持创建时的数据。

## Auto-Computed Fields (Backend)

发票创建/更新后，后端自动更新关联销售合同的以下字段：
- `invoiced_amount`: 已开发票金额总和
- `invoice_percent`: 开票百分比
- `uninvoiced_amount`: 未开票金额
- `uninvoiced_percent`: 未开票百分比
