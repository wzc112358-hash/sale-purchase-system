# Tasks: 销售发票管理

**Feature**: 销售发票管理  
**Branch**: `009-sales-invoice`  
**Spec**: [spec.md](./spec.md) | [plan.md](./plan.md)

## Implementation Strategy

MVP 优先：User Story 1-3 为核心功能（P1），实现基本 CRUD。User Story 4-5 为次要功能（P2），User Story 6 为增强功能（P3）。

## Phase 1: Setup (项目初始化)

- [x] T001 Create invoice types in src/types/sales-contract.ts (扩展现有类型)
- [x] T002 Create API module in src/api/sales-invoice.ts

## Phase 2: Foundational (基础任务)

- [x] T003 [US1] Create InvoiceList page in src/pages/sales/invoices/InvoiceList.tsx
- [x] T004 [US1] Add search and pagination to InvoiceList
- [x] T005 [US2] Create InvoiceForm component in src/pages/sales/invoices/InvoiceForm.tsx
- [x] T006 [US3] Implement edit functionality in InvoiceForm
- [x] T007 [US4] Implement delete functionality with confirmation
- [x] T008 [US5] Create InvoiceDetail page in src/pages/sales/invoices/InvoiceDetail.tsx
- [x] T009 [US6] Implement file attachment upload in InvoiceForm
- [x] T010 [US6] Implement file download in InvoiceDetail
- [x] T011 Configure routes in src/routes/index.tsx
- [x] T012 Add invoice menu item to MainLayout

## Dependencies

```
T001 ──► T002 ──┬──► T003 ──► T004
                ├──► T005 ──► T006 ──► T007
                ├──► T008
                └──► T009 ──► T010
                
T011 ──► (after T003, T008)
T012 ──► (after T011)
```

## Independent Test Criteria

| User Story | Test Criteria |
|------------|---------------|
| US1 | 访问 /sales/invoices 显示发票列表表格，支持分页 |
| US2 | 点击新增按钮，填写表单后提交，列表显示新记录 |
| US3 | 点击编辑按钮，修改信息后保存，数据正确更新 |
| US4 | 点击删除，确认后记录从列表移除 |
| US5 | 点击记录查看详情，显示完整信息 |
| US6 | 上传附件成功，详情页可下载 |

## Task Details

### Phase 1: Setup

**T001: Create invoice types** ✅
- File: `src/types/sales-contract.ts`
- Description: 定义 SaleInvoice, SaleInvoiceFormData, SaleInvoiceListParams 类型

**T002: Create API module** ✅
- File: `src/api/sales-invoice.ts`
- Description: 实现 list, getById, create, update, delete 方法

### Phase 2: Foundational

**T003: Create InvoiceList page** ✅
- File: `src/pages/sales/invoices/InvoiceList.tsx`
- Description: 发票列表页面，使用 Ant Design Table，显示发票号码、品名、合同编号、开票日期、发票金额

**T004: Add search and pagination** ✅
- File: `src/pages/sales/invoices/InvoiceList.tsx`
- Description: 实现搜索功能和分页

**T005: Create InvoiceForm component** ✅
- File: `src/pages/sales/invoices/InvoiceForm.tsx`
- Description: 发票表单弹窗，包含发票号码、关联合同、发票类型、产品数量、发票金额、开票日期、备注、附件字段

**T006: Implement edit functionality** ✅
- File: `src/pages/sales/invoices/InvoiceForm.tsx`
- Description: 编辑时加载现有数据，保存更新

**T007: Implement delete functionality** ✅
- File: `src/pages/sales/invoices/InvoiceList.tsx`
- Description: 添加删除按钮，确认对话框，删除后刷新列表

**T008: Create InvoiceDetail page** ✅
- File: `src/pages/sales/invoices/InvoiceDetail.tsx`
- Description: 发票详情页面，展示所有字段信息

**T009: Implement file upload** ✅
- File: `src/pages/sales/invoices/InvoiceForm.tsx`
- Description: 使用 Ant Design Upload 组件上传发票附件

**T010: Implement file download** ✅
- File: `src/pages/sales/invoices/InvoiceDetail.tsx`
- Description: 附件列表显示，提供下载链接

**T011: Configure routes** ✅
- File: `src/routes/index.tsx`
- Description: 添加 /sales/invoices 和 /sales/invoices/:id 路由

**T012: Add menu item** ✅
- File: `src/layouts/MainLayout.tsx`
- Description: 菜单中已存在"发票"菜单项 (path: /sales/invoices)
