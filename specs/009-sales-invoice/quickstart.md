# Quickstart: 销售发票管理功能

## 前置条件

1. 后端 PocketBase 服务运行中 (`http://127.0.0.1:8090`)
2. `sale_invoices` 集合已在后端配置
3. 用户已登录（sales 角色）

## 快速开始

### 1. 安装依赖

本功能无新增外部依赖，使用现有项目依赖。

### 2. 创建类型定义

在 `src/types/sales-invoice.ts` 中添加发票类型：

```typescript
export interface SaleInvoice {
  id: string;
  no: string;
  product_name: string;
  sales_contract: string;
  invoice_type: string;
  product_amount: number;
  amount: number;
  issue_date: string;
  remark?: string;
  attachments?: string[];
  creator: string;
  expand?: {
    sales_contract?: SalesContract;
    creator?: User;
  };
}

export interface SaleInvoiceFormData {
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

### 3. 创建 API 封装

在 `src/api/sales-invoice.ts` 中实现 API 调用：

```typescript
import { pb } from '@/lib/pocketbase';
import type { SaleInvoice, SaleInvoiceFormData } from '@/types/sales-invoice';

export const SaleInvoiceAPI = {
  list: async (params = {}) => { /* ... */ },
  getById: async (id: string) => { /* ... */ },
  create: async (data: SaleInvoiceFormData) => { /* ... */ },
  update: async (id: string, data: Partial<SaleInvoiceFormData>) => { /* ... */ },
  delete: async (id: string) => { /* ... */ },
};
```

### 4. 创建页面组件

在 `src/pages/sales/invoices/` 目录下创建：

- `InvoiceList.tsx` - 发票列表页面
- `InvoiceForm.tsx` - 发票表单弹窗
- `InvoiceDetail.tsx` - 发票详情页面

### 5. 配置路由

在路由配置中添加发票相关路由：

```typescript
{
  path: '/sales/invoices',
  element: <InvoiceList />,
},
{
  path: '/sales/invoices/:id',
  element: <InvoiceDetail />,
},
```

## 验证步骤

1. 使用 sales 角色登录系统
2. 访问发票列表页面 `/sales/invoices`
3. 测试新增发票功能
4. 测试编辑发票功能
5. 测试删除发票功能
6. 验证关联销售合同的开票进度自动更新

## 常见问题

**Q: 发票金额超过合同剩余金额怎么办？**
A: 前端表单会进行校验，提示错误信息阻止提交。

**Q: 附件上传大小有限制吗？**
A: 默认 5MB，可在 PocketBase 后端配置。
