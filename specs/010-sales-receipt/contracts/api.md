# API Contracts: 销售-收款管理

## Overview

本文件定义销售收款管理功能的 API 契约，基于 PocketBase SDK 模式。

## Collections

### sale_receipts

| 操作 | 方法 | Endpoint | 说明 |
|------|------|----------|------|
| 列表 | GET | /api/collections/sale_receipts/records | 获取收款记录列表 |
| 详情 | GET | /api/collections/sale_receipts/records/{id} | 获取单条收款记录 |
| 创建 | POST | /api/collections/sale_receipts/records | 创建收款记录 |
| 更新 | PATCH | /api/collections/sale_receipts/records/{id} | 更新收款记录 |
| 删除 | DELETE | /api/collections/sale_receipts/records/{id} | 删除收款记录 |

## API Endpoints

### 1. 获取收款列表

```
GET /api/collections/sale_receipts/records
```

**Query Parameters:**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| page | number | 否 | 页码，默认1 |
| per_page | number | 否 | 每页数量，默认10 |
| sort | string | 否 | 排序字段，如 "-created" |
| filter | string | 否 | 过滤条件 |

**示例:**
```
/api/collections/sale_receipts/records?page=1&per_page=10&sort=-created&filter=sales_contract="合同ID"
```

**Response:**
```json
{
  "page": 1,
  "per_page": 10,
  "total_items": 50,
  "total_pages": 5,
  "items": [
    {
      "id": "rec_xxx",
      "product_name": "产品A",
      "sales_contract": "contract_xxx",
      "amount": 5000,
      "product_amount": 100,
      "receipt_date": "2024-01-15",
      "method": "银行转账",
      "account": "账户123",
      "remark": "",
      "attachments": [],
      "creator": "user_xxx",
      "created": "2024-01-15 10:00:00",
      "updated": "2024-01-15 10:00:00"
    }
  ]
}
```

### 2. 获取单条收款记录

```
GET /api/collections/sale_receipts/records/{id}
```

### 3. 创建收款记录

```
POST /api/collections/sale_receipts/records
```

**Request Body:**
```json
{
  "product_name": "产品A",
  "sales_contract": "contract_xxx",
  "amount": 5000,
  "product_amount": 100,
  "receipt_date": "2024-01-15",
  "method": "银行转账",
  "account": "账户123",
  "remark": "备注",
  "attachments": []
}
```

### 4. 更新收款记录

```
PATCH /api/collections/sale_receipts/records/{id}
```

**Request Body:**
```json
{
  "amount": 6000,
  "method": "现金"
}
```

### 5. 删除收款记录

```
DELETE /api/collections/sale_receipts/records/{id}
```

## 扩展字段

PocketBase 支持通过 `expand` 参数获取关联数据：

```
/api/collections/sale_receipts/records?expand=sales_contract
```

返回的销售合同对象:
```json
{
  "sales_contract": {
    "id": "contract_xxx",
    "no": "HT-20240101-001",
    "customer": "customer_xxx",
    "total_amount": 10000,
    "total_quantity": 200
  }
}
```

## 文件上传

收款凭证使用 PocketBase 文件上传功能：

```
POST /api/collections/sale_receipts/records
Content-Type: multipart/form-data

{
  "product_name": "产品A",
  "sales_contract": "contract_xxx",
  "amount": 5000,
  "attachments": [文件对象]
}
```
