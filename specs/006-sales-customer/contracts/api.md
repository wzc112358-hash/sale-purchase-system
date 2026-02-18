# API Contracts: 销售客户管理

## Base URL

```
http://127.0.0.1:8090/api/
```

## Authentication

All requests require Bearer Token authentication:
```
Authorization: Bearer <token>
```

---

## Endpoints

### 1. 获取客户列表

**GET** `/api/collections/customers/records`

**Query Parameters**:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| page | integer | No | 页码，默认1 |
| per_page | integer | No | 每页数量，默认10 |
| sort | string | No | 排序字段，如 `-created` |
| filter | string | No | 过滤条件 |

**Filter Examples**:

```javascript
// 按名称模糊搜索
filter: 'name ~ "ABC"'

// 按地区筛选
filter: 'region = "华东"'

// 组合搜索
filter: 'name ~ "ABC" && region = "华东"'
```

**Response**:

```json
{
  "page": 1,
  "per_page": 10,
  "total_items": 50,
  "total_pages": 5,
  "items": [
    {
      "id": "RECORD_ID",
      "name": "ABC公司",
      "contact": "张三",
      "phone": "13800138000",
      "email": "zhangsan@abc.com",
      "address": "上海市浦东新区",
      "industry": "制造业",
      "region": "华东",
      "bank_name": "中国银行",
      "bank_account": "622212345678",
      "remark": "重要客户",
      "creator": "USER_ID",
      "created": "2026-02-18 10:00:00.000Z",
      "updated": "2026-02-18 10:00:00.000Z"
    }
  ]
}
```

---

### 2. 创建客户

**POST** `/api/collections/customers/records`

**Request Body**:

```json
{
  "name": "ABC公司",
  "contact": "张三",
  "phone": "13800138000",
  "email": "zhangsan@abc.com",
  "address": "上海市浦东新区",
  "industry": "制造业",
  "region": "华东",
  "bank_name": "中国银行",
  "bank_account": "622212345678",
  "remark": "重要客户"
}
```

**Validation**:
- `name`: 必填

**Response**: 返回创建的客户记录

---

### 3. 获取客户详情

**GET** `/api/collections/customers/records/{id}`

**Response**:

```json
{
  "id": "RECORD_ID",
  "name": "ABC公司",
  "contact": "张三",
  "phone": "13800138000",
  "email": "zhangsan@abc.com",
  "address": "上海市浦东新区",
  "industry": "制造业",
  "region": "华东",
  "bank_name": "中国银行",
  "bank_account": "622212345678",
  "remark": "重要客户",
  "creator": "USER_ID",
  "created": "2026-02-18 10:00:00.000Z",
  "updated": "2026-02-18 10:00:00.000Z",
  "expand": {
    "creator": {
      "id": "USER_ID",
      "name": "销售职员"
    }
  }
}
```

---

### 4. 更新客户

**PATCH** `/api/collections/customers/records/{id}`

**Request Body**:

```json
{
  "name": "ABC公司新名称",
  "contact": "李四",
  "phone": "13900139000"
}
```

**Response**: 返回更新后的客户记录

---

### 5. 删除客户

**DELETE** `/api/collections/customers/records/{id}`

**Response**: 返回空对象

**Error**: 如果客户有关联的销售合同，返回错误

---

### 6. 获取客户关联的销售合同

**GET** `/api/collections/sales_contracts/records`

**Query Parameters**:

```
filter: 'customer = "CUSTOMER_ID"'
expand: 'customer'
```

**Response**:

```json
{
  "items": [
    {
      "id": "CONTRACT_ID",
      "no": "HT-20260218-001",
      "product_name": "产品A",
      "customer": "CUSTOMER_ID",
      "total_amount": 100000,
      "status": "executing",
      "created": "2026-02-18 10:00:00.000Z"
    }
  ]
}
```

---

## Error Responses

| Status Code | Description |
|-------------|-------------|
| 200 | 成功 |
| 400 | 请求参数错误 |
| 403 | 无权限 |
| 404 | 记录不存在 |
| 500 | 服务器错误 |

**Error Example**:

```json
{
  "code": 403,
  "message": "You do not have permission to perform this action",
  "data": {}
}
```
