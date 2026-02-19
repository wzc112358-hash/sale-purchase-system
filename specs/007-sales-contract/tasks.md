---

description: "Task list for 销售合同管理 feature implementation"

---

# Tasks: 销售合同管理

**Input**: Design documents from `/specs/007-sales-contract/`
**Prerequisites**: plan.md, spec.md, data-model.md, contracts/api.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create project structure and type definitions for this feature

- [x] T001 Create contracts directory structure: mkdir -p src/pages/sales/contracts
- [x] T002 [P] Create SalesContract type definitions in src/types/sales-contract.ts
- [x] T003 [P] Create SalesContractFormData type in src/types/sales-contract.ts
- [x] T004 [P] Create SalesContractListParams type in src/types/sales-contract.ts

**Checkpoint**: Type definitions ready

---

## Phase 2: Foundational (API Layer)

**Purpose**: Create API module that all user stories depend on

- [x] T005 Create SalesContractAPI wrapper in src/api/sales-contract.ts (list, getById, create, update, delete)

**Checkpoint**: API layer ready - user story implementation can now begin

---

## Phase 3: User Story 1 - 查看销售合同列表 (Priority: P1) 🎯 MVP

**Goal**: Display all sales contracts in a table with search and pagination

**Independent Test**: Open contract list page, see table with all contracts, support pagination and search

### Implementation for User Story 1

- [x] T006 [P] [US1] Create ContractList.tsx page in src/pages/sales/contracts/ContractList.tsx
- [x] T007 [P] [US1] Add Table component with columns: no, product_name, customer, sign_date, total_amount, execution_percent, receipt_percent, invoice_percent, status
- [x] T008 [US1] Implement pagination in ContractList.tsx
- [x] T009 [US1] Implement search functionality (filter by no, product_name, customer name)
- [x] T010 [US1] Add status filter dropdown (executing, completed, cancelled)

- [x] T011 [P] [US2] Create ContractForm.tsx component in src/pages/sales/contracts/ContractForm.tsx
- [x] T012 [P] [US2] Add customer dropdown (fetch from customers API)
- [x] T013 [US2] Add form fields: no (contract number), product_name, unit_price, total_quantity, sign_date, remark
- [ ] T013a [US2] Add contract number input field (manual input instead of auto-generate)
- [x] T014 [US2] Implement auto-calculate total_amount = unit_price × total_quantity
- [x] T015 [US2] Add validation: unit_price > 0, total_quantity > 0
- [x] T016 [US2] Add submit handler calling SalesContractAPI.create
- [x] T017 [US2] Add success/error feedback (message from Ant Design)

**Checkpoint**: User Story 2 fully functional - can create new contracts

---

## Phase 5: User Story 3 - 编辑和删除合同 (Priority: P1) 🎯

**Goal**: Allow editing existing contracts and deleting contracts

**Independent Test**: Click edit button, modify form, save; or click delete, confirm, see removal

### Implementation for User Story 3

- [x] T018 [P] [US3] Add edit button in ContractList.tsx table actions column
- [x] T019 [P] [US3] Add delete button in ContractList.tsx table actions column
- [x] T020 [US3] Open ContractForm.tsx in edit mode with existing data (prop: initialValues)
- [x] T021 [US3] Update submit handler to call SalesContractAPI.update for edit mode
- [x] T022 [US3] Add delete confirmation modal (Ant Design Modal.confirm)
- [x] T023 [US3] Implement delete handler calling SalesContractAPI.delete
- [x] T024 [US3] Refresh list after successful edit/delete

**Checkpoint**: User Stories 1, 2, 3 fully functional - full CRUD complete

---

## Phase 6: User Story 4 - 查看合同详情 (Priority: P2)

**Goal**: Display complete contract information including related customer, shipments, invoices, receipts

**Independent Test**: Click contract row, navigate to detail page, see all related data

### Implementation for User Story 4

- [x] T025 [P] [US4] Create ContractDetail.tsx page in src/pages/sales/contracts/ContractDetail.tsx
- [x] T026 [P] [US4] Add route /sales/contracts/:id in src/routes/index.tsx
- [x] T027 [US4] Display contract basic info: no, product_name, customer, total_amount, sign_date, status
- [x] T028 [US4] Display progress bars: execution_percent, receipt_percent, invoice_percent
- [x] T029 [US4] Fetch and display related customer info (expand: customer)
- [x] T030 [US4] Fetch and display related shipments list (sales_shipments)
- [x] T031 [US4] Fetch and display related invoices list (sale_invoices)
- [x] T032 [US4] Fetch and display related receipts list (sale_receipts)

**Checkpoint**: User Story 4 fully functional - can view complete contract details

---

## Phase 7: User Story 5 - 合同附件管理 (Priority: P2)

**Goal**: Allow uploading and downloading contract attachments

**Independent Test**: Upload file in form, save; view in detail, click download

### Implementation for User Story 5

- [ ] T033 [P] [US5] Add attachment upload component in ContractForm.tsx (Ant Design Upload)
- [ ] T034 [P] [US5] Configure upload to PocketBase files endpoint (max 10MB)
- [ ] T035 [US5] Display attachment list in ContractDetail.tsx
- [ ] T036 [US5] Add download button for each attachment (link to PB file URL)

**Checkpoint**: User Story 5 fully functional - full feature complete

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Final integration and validation

- [x] T037 [P] Add route navigation from ContractList to ContractDetail
- [x] T038 Apply UI/UX design specs: colors (#1A1A1A buttons), fonts, card styles
- [x] T039 Run npm run typecheck and fix any errors
- [x] T040 Run npm run lint and fix any warnings

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup - BLOCKS all user stories
- **User Stories (Phase 3-7)**: All depend on Foundational phase
  - US1 → US2 → US3 are sequential (each builds on previous)
  - US4, US5 can start after US1 is complete (they use the API layer)
- **Polish (Phase 8)**: Depends on all user stories being complete

### User Story Dependencies

- **US1 (P1)**: Can start after Foundational - No dependencies on other stories
- **US2 (P1)**: Builds on US1 (uses API layer)
- **US3 (P1)**: Builds on US1 (uses API layer)
- **US4 (P2)**: Can start after US1 (needs API + routing)
- **US5 (P2)**: Can start after US2 (uses form component)

### Within Each User Story

- Types before API
- API before components
- Components before pages
- Integration at end of each story

### Parallel Opportunities

- Phase 1 tasks T002-T004 can run in parallel (different type files)
- Phase 3 tasks T006-T007 can run in parallel
- Phase 4 tasks T011-T012 can run in parallel
- Phase 6 tasks T025-T026 can run in parallel
- Phase 7 tasks T033-T034 can run in parallel
- Different user stories can be worked on by different team members after Phase 2

---

## Implementation Strategy

### MVP First (US1 + US2 + US3)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: US1 (Contract List)
4. **STOP and VALIDATE**: Test contract list
5. Complete Phase 4: US2 (Create Contract)
6. **STOP and VALIDATE**: Test create
7. Complete Phase 5: US3 (Edit/Delete)
8. **STOP and VALIDATE**: Full CRUD works - MVP complete!

### Incremental Delivery

1. Setup + Foundational → Foundation ready
2. US1 → Test → Deploy (basic list)
3. US2 → Test → Deploy (can create)
4. US3 → Test → Deploy (full CRUD)
5. US4 → Test → Deploy (detail view)
6. US5 → Test → Deploy (attachments)
7. Polish → Final deploy

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Use Ant Design components throughout (Table, Form, Modal, Upload, Message)
- Follow existing code patterns from src/pages/sales/customers/
