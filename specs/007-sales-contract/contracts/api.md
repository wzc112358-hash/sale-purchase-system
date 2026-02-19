# API Contracts: 销售合同管理

## 概述

本文件定义销售合同管理功能的 API 契约，基于 PocketBase REST API 模式。

## 基础信息

- **Base URL**: `http://127.0.0.1:8090/api/`
- **认证方式**: Bearer Token (JWT)
- **集合名称**: `sales_contracts`

---

## 1. 获取合同列表

### Request

```http
GET /api/collections/sales_contracts/records
```

### Query Parameters

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| page | number | 否 | 页码，默认 1 |
| per_page | number | 否 | 每页数量，默认 10 |
| sort | string | 否 | 排序字段，如 `-created` |
| filter | string | 否 | 过滤条件 |

### Filter 示例

```javascript
// 按状态筛选
filter: 'status = "executing"'

// 按客户筛选
filter: 'customer = "客户ID"'

// 搜索（合同编号或产品名称）
filter: 'no ~ "HT-" || product_name ~ "关键词"'
```

### Response

```json
{
  "page": 1,
  "per_page": 10,
  "total_items": 50,
  "total_pages": 5,
  "items": [
    {
      "id": "记录ID",
      "no": "HT-20260218-001",
      "product_name": "产品A",
      "customer": "客户ID",
      "total_amount": 10000,
      "unit_price": 100,
      "total_quantity": 100,
      "execution_percent": 50,
      "receipt_percent": 30,
      "invoice_percent": 20,
      "sign_date": "2026-02-18",
      "status": "executing",
      "created": "2026-02-18 10:00:00",
      "updated": "2026-02-18 10:00:00"
    }
  ]
}
```

---

## 2. 获取单个合同详情

### Request

```http
GET /api/collections/sales_contracts/records/:id
```

### Response

```json
{
  "id": "记录ID",
  "no": "HT-20260218-001",
  "product_name": "产品A",
  "customer": "客户ID",
  "total_amount": 10000,
  "unit_price": 100,
  "total_quantity": 100,
  "executed_quantity": 50,
  "execution_percent": 50,
  "receipted_amount": 3000,
  "receipt_percent": 30,
  "debt_amount": 7000,
  "debt_percent": 70,
  "invoiced_amount": 2000,
  "invoice_percent": 20,
  "uninvoiced_amount": 8000,
  "uninvoiced_percent": 80,
  "sign_date": "2026-02-18",
  "status": "executing",
  "remark": "备注",
  "attachments": ["file1.pdf", "file2.jpg"],
  "creator": "用户ID",
  "created": "2026-02-18 10:00:00",
  "updated": "2026-02-18 10:00:00",
  "expand": {
    "customer": { "id": "客户ID", "name": "客户名称" },
    "creator": { "id": "用户ID", "name": "创建人" }
  }
}
```

---

## 3. 创建合同

### Request

```http
POST /api/collections/sales_contracts/records
```

### Request Body

```json
{
  "product_name": "产品A",
  "customer": "客户ID",
  "unit_price": 100,
  "total_quantity": 100,
  "sign_date": "2026-02-18",
  "remark": "备注信息"
}
```

### 说明

- `total_amount` 由后端自动计算（单价 × 数量）
- `no` 由后端自动生成（格式：HT-YYYYMMDD-XXX）
- `creator` 自动设置为当前登录用户
- `status` 默认值为 "executing"
- 其他计算字段由后端钩子自动更新

### Validation Rules

- `product_name`: 必填，最大 255 字符
- `customer`: 必填，有效的客户 ID
- `unit_price`: 必填，必须大于 0
- `total_quantity`: 必填，必须大于 0
- `sign_date`: 必填，日期格式

### Response

返回创建后的完整合同对象。

---

## 4. 更新合同

### Request

```http
PATCH /api/collections/sales_contracts/records/:id
```

### Request Body

```json
{
  "product_name": "产品B",
  "unit_price": 120,
  "total_quantity": 80,
  "remark": "更新后的备注"
}
```

### 说明

- `total_amount` 会自动重新计算
- 其他计算字段由后端钩子自动更新

### Response

返回更新后的完整合同对象。

---

## 5. 删除合同

### Request

```http
DELETE /api/collections/sales_contracts/records/:id
```

### Response

```json
{
  "id": "记录ID"
}
```

### 说明

- 删除合同不会级联删除关联的发货、发票、收款记录
- 需确保无关联数据后再删除

---

## 6. 获取关联数据

### 获取合同关联的客户

```http
GET /api/collections/customers/records/:customerId
```

### 获取合同关联的发货批次

```http
GET /api/collections/sales_shipments/records?filter=sales_contract="合同ID"
```

### 获取合同关联的发票

```http
GET /api/collections/sale_invoices/records?filter=sales_contract="合同ID"
```

### 获取合同关联的收款记录

```http
GET /api/collections/sale_receipts/records?filter=sales_contract="合同ID"
```

---

## 错误响应格式

```json
{
  "code": 400,
  "message": "验证失败",
  "data": {
    "unit_price": {
      "message": "金额必须大于0"
    }
  }
}
```
