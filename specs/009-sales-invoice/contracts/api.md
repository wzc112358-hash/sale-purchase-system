# API Contracts: 销售发票管理

## Overview

基于 PocketBase SDK 的 API 调用封装，不直接暴露 REST 端点。

## API Module: SaleInvoiceAPI

### list(params?: ListParams): Promise<ListResponse<SaleInvoice>>

获取发票列表

**Parameters:**
- `params.page?: number` - 页码，默认 1
- `params.per_page?: number` - 每页数量，默认 10
- `params.search?: string` - 搜索关键词
- `params.contract_id?: string` - 过滤：关联合同 ID

**Returns:** PocketBase ListResponse

---

### getById(id: string): Promise<SaleInvoice>

获取发票详情

**Parameters:**
- `id: string` - 发票记录 ID

**Returns:** SaleInvoice 对象

---

### create(data: CreateInvoiceDTO): Promise<SaleInvoice>

创建发票记录

**Parameters:**
```typescript
interface CreateInvoiceDTO {
  no: string;
  product_name: string;
  sales_contract: string;
  invoice_type: string;
  product_amount: number;
  amount: number;
  issue_date: string;
  remark?: string;
  attachments?: File[];
}
```

**Validation:**
- 金额不能超过合同剩余未开票金额

**Returns:** 创建的 SaleInvoice 对象

---

### update(id: string, data: UpdateInvoiceDTO): Promise<SaleInvoice>

更新发票记录

**Parameters:**
- `id: string` - 发票记录 ID
- `data: Partial<CreateInvoiceDTO>` - 更新数据

**Returns:** 更新后的 SaleInvoice 对象

---

### delete(id: string): Promise<boolean>

删除发票记录

**Parameters:**
- `id: string` - 发票记录 ID

**Returns:** 是否删除成功

---

## Client-Side Validation Rules

| Field | Rule |
|-------|------|
| no | 必填，最大 50 字符 |
| product_name | 必填，最大 200 字符 |
| sales_contract | 必填，有效的销售合同 ID |
| invoice_type | 必填 |
| product_amount | 必填，大于 0 |
| amount | 必填，大于 0，不超过合同剩余未开票金额 |
| issue_date | 必填，有效日期 |
