# Tasks: 销售客户管理

**Feature**: 006-sales-customer | **Generated**: 2026-02-18

## Implementation Strategy

**MVP Scope**: User Story 1 (客户列表查看与搜索) - 核心CRUD功能的列表和搜索部分

**Incremental Delivery**: Each user story is independently testable and can be delivered incrementally.

## Phase 1: Setup (项目初始化)

- [X] T001 Install Ant Design dependencies in package.json
- [X] T002 Configure Ant Design theme in App.tsx with custom colors

## Phase 2: Foundational (基础组件)

- [X] T003 [P] Create Customer type definitions in src/types/customer.ts
- [X] T004 [P] Create Customer API module in src/api/customer.ts
- [X] T005 [P] Add route configuration for customer pages in src/routes/index.tsx

## Phase 3: User Story 1 - 客户列表查看与搜索 (P1)

**Goal**: 销售职员可以查看客户列表并通过名称或地区搜索目标客户

**Independent Test**: 打开客户列表页面，表格展示客户信息，输入搜索条件后列表正确过滤

- [X] T006 [P] [US1] Create CustomerList page component in src/pages/sales/customers/CustomerList.tsx
- [X] T007 [P] [US1] Implement table with columns (name, contact, phone, email, region) in CustomerList.tsx
- [X] T008 [US1] Add pagination (10 items per page) to CustomerList table
- [X] T009 [US1] Implement search by customer name in CustomerList.tsx
- [X] T010 [US1] Add region filter dropdown in CustomerList.tsx
- [X] T011 [US1] Apply UI styling per design spec (colors, borders, spacing)

## Phase 4: User Story 2 - 客户新增与编辑 (P1)

**Goal**: 销售职员可以添加新客户或修改已有客户信息

**Independent Test**: 点击新增按钮，填写表单并提交，新客户出现在列表中

- [X] T012 [US2] Create CustomerForm component in src/pages/sales/customers/CustomerForm.tsx
- [X] T013 [US2] Add form fields (name, contact, phone, email, address, industry, region, bank_name, bank_account, remark)
- [X] T014 [US2] Add validation rules (name required, email format)
- [X] T015 [US2] Implement Create customer in src/api/customer.ts
- [X] T016 [US2] Implement Update customer in src/api/customer.ts
- [X] T017 [US2] Add "New Customer" button and modal in CustomerList.tsx
- [X] T018 [US2] Add Edit button and modal in CustomerList.tsx
- [X] T019 [US2] Connect form to API (create/update)

## Phase 5: User Story 3 - 客户详情查看 (P2)

**Goal**: 销售职员可以查看客户的完整信息及其关联的销售合同列表

**Independent Test**: 点击客户名称，跳转到详情页面，显示完整信息和关联合同

- [X] T020 [US3] Create CustomerDetail page in src/pages/sales/customers/CustomerDetail.tsx
- [X] T021 [US3] Implement customer detail view with all fields using Descriptions component
- [X] T022 [US3] Add "Back to List" navigation in CustomerDetail.tsx
- [X] T023 [US3] Implement getContracts API method in src/api/customer.ts
- [X] T024 [US3] Display related sales contracts list in CustomerDetail.tsx
- [X] T025 [US3] Make customer name clickable to navigate to detail in CustomerList.tsx

## Phase 6: User Story 4 - 客户删除 (P2)

**Goal**: 销售职员可以删除不再合作的客户记录

**Independent Test**: 点击删除按钮，确认后客户从列表中移除；有关联合同的客户无法删除

- [X] T026 [US4] Add Delete customer API method in src/api/customer.ts
- [X] T027 [US4] Add Delete button in CustomerList.tsx
- [X] T028 [US4] Implement confirmation modal before delete
- [X] T029 [US4] Handle delete error (show error when customer has related contracts)
- [X] T030 [US4] Refresh list after successful delete

## Phase 7: Polish & Cross-Cutting (收尾)

- [X] T031 Add loading states for all async operations
- [X] T032 Add error handling with user-friendly messages
- [X] T033 Add empty state ("暂无数据") when no customers found
- [X] T034 Run typecheck (npm run typecheck)
- [X] T035 Run lint (npm run lint)
- [X] T036 Verify build succeeds (npm run build)

---

## Dependencies & Execution Order

```
Phase 1 (Setup)
    ↓
Phase 2 (Foundational) - T003, T004, T005 can run in parallel
    ↓
Phase 3 (US1) - T006-T011
    ↓
Phase 4 (US2) - T012-T019 (depends on Phase 3)
    ↓
Phase 5 (US3) - T020-T025 (depends on Phase 3)
    ↓
Phase 6 (US4) - T026-T030 (depends on Phase 3)
    ↓
Phase 7 (Polish) - T031-T036
```

## Parallel Opportunities

| Tasks | Reason |
|-------|--------|
| T003, T004, T005 | Type definitions, API module, and route config are independent |
| T006, T007 | List page and table structure can be implemented together |
| T012, T013, T014 | Form component, fields, and validation are bundled |

## Summary

| Metric | Value |
|--------|-------|
| Total Tasks | 36 |
| Phase 1 (Setup) | 2 |
| Phase 2 (Foundational) | 3 |
| Phase 3 (US1) | 6 |
| Phase 4 (US2) | 8 |
| Phase 5 (US3) | 6 |
| Phase 6 (US4) | 5 |
| Phase 7 (Polish) | 6 |

**MVP Tasks**: T001-T011 (Phase 1-3) - Complete customer list with search/filter

**Independent Test Criteria per Story**:
- US1: View customer list, search by name, filter by region
- US2: Create new customer, edit existing customer
- US3: View customer detail with related contracts
- US4: Delete customer with confirmation
