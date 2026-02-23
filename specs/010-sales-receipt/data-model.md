# Data Model: 销售-收款管理

## 实体定义

### 1. 收款记录 (SaleReceipt)

| 字段名 | 类型 | 必填 | 验证规则 | 说明 |
|--------|------|------|----------|------|
| id | UUID | 系统生成 | - | 唯一标识 |
| product_name | string | 是 | 非空 | 产品名称 |
| sales_contract | relation | 是 | 关联 sales_contracts | 关联的销售合同 |
| amount | number | 是 | > 0 | 收款金额 |
| product_amount | number | 是 | > 0 | 收款对应的产品数量 |
| receipt_date | date | 是 | - | 收款日期 |
| method | string | 否 | - | 收款方式（银行转账/现金/其他） |
| account | string | 否 | - | 收款账户 |
| remark | string | 否 | - | 备注信息 |
| attachments | file[] | 否 | 最多5个 | 收款凭证附件 |
| creator | relation | 是 | 关联 users | 创建人 |
| created | datetime | 系统生成 | - | 创建时间 |
| updated | datetime | 系统生成 | - | 更新时间 |

### 2. 销售合同 (SalesContract) - 关联字段

| 字段名 | 类型 | 计算方式 | 说明 |
|--------|------|----------|------|
| receipted_amount | number | SUM(sale_receipts.amount) | 已收款金额 |
| receipt_percent | number | (receipted_amount / total_amount) × 100% | 收款百分比 |
| debt_amount | number | total_amount - receipted_amount | 欠款金额 |
| debt_percent | number | (debt_amount / total_amount) × 100% | 欠款百分比 |

## 关系

```
SalesContract (1) ──► (N) SaleReceipt
```

- 一个销售合同可以有多笔收款记录
- 一笔收款记录必须关联一个销售合同

## 状态转换

收款记录本身无状态字段，仅有创建/更新/删除操作。

## 验证规则

1. **收款金额**: 必须大于0，不超过合同总金额（建议前端提示）
2. **产品数量**: 必须大于0，不超过合同总数量
3. **收款日期**: 不能晚于当前日期
4. **凭证附件**: 支持 PDF、图片格式，单个文件不超过10MB

## 列表展示字段

| 字段 | 来源 | 格式 |
|------|------|------|
| 合同编号 | sales_contract.no | 文本 |
| 品名 | product_name | 文本 |
| 收款日期 | receipt_date | 日期 YYYY-MM-DD |
| 收款金额 | amount | 货币格式 |
| 产品数量 | product_amount | 数字 |
| 收款方式 | method | 文本 |
