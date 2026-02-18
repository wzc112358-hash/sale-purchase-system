# Data Model: 销售客户管理

## Entities

### Customer (客户)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | Yes | 系统生成，唯一标识 |
| name | string | Yes | 客户名称 |
| contact | string | No | 联系人姓名 |
| phone | string | No | 联系电话 |
| email | string | No | 电子邮箱 |
| address | string | No | 地址 |
| industry | string | No | 所在行业 |
| region | string | No | 所属地区 |
| bank_name | string | No | 开户银行 |
| bank_account | string | No | 银行账号 |
| remark | string | No | 备注信息 |
| creator | relation -> users | Yes | 创建人 |

### Sales Contract (销售合同)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | Yes | 系统生成，唯一标识 |
| no | string | Yes | 合同编号 |
| product_name | string | Yes | 产品名称 |
| customer | relation -> customers | Yes | 关联客户 |
| total_amount | number | Yes | 合同总金额 |
| status | string | Yes | 合同状态 |

---

## Validation Rules

### Customer

1. **name**: 必填，最小长度1，最大长度100
2. **email**: 可选，邮箱格式验证
3. **phone**: 可选，手机/电话号码格式验证
4. **region**: 可选，下拉选择

---

## State Transitions

### Customer Lifecycle

```
Created -> (Edit) -> Updated -> (Delete) -> Deleted
         -> (View) -> Detail View
```

### Business Rules

1. 客户只能由创建者编辑和删除
2. 有关联销售合同的客户不能被删除
3. 客户名称不允许重复（可选业务规则）

---

## API Relationships

```
GET /api/customers          -> List customers (paginated, filtered)
POST /api/customers         -> Create customer
GET /api/customers/:id      -> Get customer detail
PATCH /api/customers/:id    -> Update customer
DELETE /api/customers/:id   -> Delete customer
GET /api/customers/:id/contracts -> Get related sales contracts
```

---

## TypeScript Interfaces

```typescript
interface Customer {
  id: string;
  name: string;
  contact?: string;
  phone?: string;
  email?: string;
  address?: string;
  industry?: string;
  region?: string;
  bank_name?: string;
  bank_account?: string;
  remark?: string;
  creator: string;
  created: string;
  updated: string;
}

interface CustomerFormData {
  name: string;
  contact?: string;
  phone?: string;
  email?: string;
  address?: string;
  industry?: string;
  region?: string;
  bank_name?: string;
  bank_account?: string;
  remark?: string;
}
```
