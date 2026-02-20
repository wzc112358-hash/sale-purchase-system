# API Contracts: 销售发货管理

## Overview

本文档定义销售发货管理功能的 API 接口契约。基于 PocketBase REST API 模式。

## Base URL

```
http://127.0.0.1:8090/api/
```

## Authentication

所有请求需要携带 Bearer Token (JWT)。

---

## Endpoints

### 1. 获取发货列表

**GET** `/api/collections/sales_shipments/records`

**Query Parameters**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| page | integer | No | 页码，默认 1 |
| per_page | integer | No | 每页数量，默认 10 |
| sort | string | No | 排序字段，如 `-created` |
| filter | string | No | 过滤条件 |

**Filter Examples**

- 按合同ID过滤: `sales_contract = "contract_id"`
- 按运输合同号搜索: `tracking_contract_no ~ "keyword"`
- 按物流公司搜索: `logistics_company ~ "keyword"`
- 按运费状态筛选: `freight_status = "paid"`
- 按发票状态筛选: `invoice_status = "issued"`

**Response**

```json
{
  "page": 1,
  "per_page": 10,
  "total_items": 50,
  "total_pages": 5,
  "items": [
    {
      "id": "record_id",
      "product_name": "产品名称",
      "sales_contract": "contract_id",
      "tracking_contract_no": "HT20240215001",
      "date": "2024-02-15",
      "quantity": 100,
      "logistics_company": "顺丰速运",
      "shipment_address": "上海市浦东新区",
      "delivery_address": "北京市朝阳区",
      "freight": 500,
      "freight_status": "paid",
      "invoice_status": "unissued",
      "remark": "备注",
      "creator": "user_id",
      "created": "2024-02-15 10:00:00",
      "expand": {
        "sales_contract": {
          "id": "contract_id",
          "no": "HT-20240215-001"
        }
      }
    }
  ]
}
```

---

### 2. 获取单个发货记录

**GET** `/api/collections/sales_shipments/records/{id}`

**Response**

```json
{
  "id": "record_id",
  "product_name": "产品名称",
  "sales_contract": "contract_id",
  "tracking_contract_no": "HT20240215001",
  "date": "2024-02-15",
  "quantity": 100,
  "logistics_company": "顺丰速运",
  "shipment_address": "上海市浦东新区",
  "delivery_address": "北京市朝阳区",
  "freight": 500,
  "freight_status": "paid",
  "freight_date": "2024-02-16",
  "invoice_status": "unissued",
  "remark": "备注",
  "attachments": ["file1.jpg", "file2.pdf"],
  "creator": "user_id",
  "created": "2024-02-15 10:00:00",
  "updated": "2024-02-15 10:00:00",
  "expand": {
    "sales_contract": {
      "id": "contract_id",
      "no": "HT-20240215-001",
      "product_name": "产品名称",
      "customer": "customer_id",
      "total_amount": 10000,
      "total_quantity": 1000,
      "executed_quantity": 100
    }
  }
}
```

---

### 3. 创建发货记录

**POST** `/api/collections/sales_shipments/records`

**Request Body (FormData)**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| product_name | string | Yes | 产品名称 |
| sales_contract | string | Yes | 关联的销售合同ID |
| tracking_contract_no | string | Yes | 运输合同号 |
| date | string | Yes | 发货日期 (ISO 8601) |
| quantity | number | Yes | 发货数量 |
| logistics_company | string | Yes | 物流公司 |
| shipment_address | string | Yes | 发货地址 |
| delivery_address | string | Yes | 收货地址 |
| freight | number | Yes | 运费金额 |
| freight_status | string | Yes | 运费状态: paid / unpaid |
| invoice_status | string | Yes | 发票状态: issued / unissued |
| remark | string | No | 备注 |
| attachments | File[] | No | 附件文件 |

**Success Response (201 Created)**

```json
{
  "id": "new_record_id",
  "product_name": "产品名称",
  "sales_contract": "contract_id",
  ...
  "created": "2024-02-15 10:00:00"
}
```

**Error Responses**

- 400: 必填字段缺失或格式错误
- 403: 无权限创建
- 404: 关联的销售合同不存在

---

### 4. 更新发货记录

**PATCH** `/api/collections/sales_shipments/records/{id}`

**Request Body (FormData)**

同创建接口，但所有字段为可选。只发送需要更新的字段。

**Success Response (200 OK)**

```json
{
  "id": "record_id",
  "product_name": "产品名称",
  ...
  "updated": "2024-02-15 11:00:00"
}
```

---

### 5. 删除发货记录

**DELETE** `/api/collections/sales_shipments/records/{id}`

**Success Response (204 No Content)**

无返回内容。

**Error Responses**

- 403: 无权限删除
- 404: 记录不存在

---

## 销售合同进度更新 (后端钩子)

当发货记录创建/更新/删除时，后端自动更新关联销售合同的执行进度：

1. 计算该合同所有发货记录的数量总和
2. 更新 `executed_quantity` 字段
3. 更新 `execution_percent` 字段

前端调用发货接口后，销售合同数据会自动更新，无需额外处理。
