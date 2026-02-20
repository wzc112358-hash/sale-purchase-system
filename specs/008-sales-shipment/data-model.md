# Data Model: 销售发货管理

## Entity: 发货记录 (SalesShipment)

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | UUID | Auto | 系统生成唯一标识 |
| product_name | string | Yes | 产品名称 |
| sales_contract | relation | Yes | 关联的销售合同 (sales_contracts) |
| tracking_contract_no | string | Yes | 运输合同号 |
| date | date | Yes | 发货日期 |
| quantity | number | Yes | 发货数量 |
| logistics_company | string | Yes | 物流公司名称 |
| shipment_address | string | Yes | 发货地址 |
| delivery_address | string | Yes | 收货地址 |
| freight | number | Yes | 运费金额 |
| freight_status | select | Yes | 运费状态: paid / unpaid |
| freight_date | date | No | 运费付款时间 |
| invoice_status | select | Yes | 发票状态: issued / unissued |
| remark | string | No | 备注信息 |
| attachments | file | No | 物流单据附件 |
| creator | relation | Yes | 创建人 (users) |
| created | datetime | Auto | 创建时间 |
| updated | datetime | Auto | 更新时间 |

### Relationships

- **销售合同 (Sales Contract)**: Many-to-One
  - One sales contract can have many shipments
  - One shipment belongs to one sales contract

### Validation Rules

1. `quantity` 必须为正数
2. `freight` 必须 >= 0
3. 发货数量不能超过合同剩余可发货数量
4. 关联的销售合同状态必须为 "executing"

### State Transitions

- 无复杂状态机，发货记录创建后状态不变
- 发票状态根据开票操作自动更新

---

## Integration: 销售合同执行进度更新

### Trigger

发货记录创建或更新时，自动更新关联销售合同的执行进度。

### Calculation

```
executed_quantity = SUM(shipments.quantity) WHERE sales_contract = {contract_id}
execution_percent = (executed_quantity / total_quantity) * 100
```

### Implementation Note

后端钩子自动处理此逻辑，前端无需手动更新。
