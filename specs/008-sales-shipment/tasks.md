---

description: "Task list for 销售发货管理 feature implementation"
---

# Tasks: 销售发货管理

**Input**: Design documents from `/specs/008-sales-shipment/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), data-model.md, contracts/api.md, quickstart.md

**Tests**: Not requested in feature specification - skip test tasks

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Project Initialization)

**Purpose**: No additional setup needed - project structure and dependencies already exist

**Note**: This is an incremental feature - project is already initialized. Skip to Phase 2.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Create type definitions and API layer that ALL user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T001 [P] Create SalesShipment type definition in src/types/sales-shipment.ts
- [x] T002 [P] Create SalesShipmentFormData interface in src/types/sales-shipment.ts
- [x] T003 [P] Create SalesShipmentListParams interface in src/types/sales-shipment.ts
- [x] T004 Export SalesShipment types from src/types/index.ts
- [x] T005 Create SalesShipmentAPI wrapper in src/api/sales-shipment.ts with list, getById, create, update, delete methods
- [x] T006 Add getContractOptions helper to fetch sales contracts for dropdown in src/api/sales-shipment.ts

**Checkpoint**: Foundation ready - type definitions and API layer complete. User story implementation can now begin.

---

## Phase 3: User Story 1 - 查看发货列表 (Priority: P1) 🎯 MVP

**Goal**: Display shipment list with search and filter capabilities

**Independent Test**: Open shipment list page, verify table displays all shipments with correct columns, test search and filter functionality

### Implementation for User Story 1

- [x] T007 [P] [US1] Create ShipmentList page component in src/pages/sales/shipments/ShipmentList.tsx
- [x] T008 [US1] Implement Ant Design Table with columns: 运输合同号, 品名, 合同编号, 物流公司, 发货日期, 数量, 运费状态, 发票状态 in src/pages/sales/shipments/ShipmentList.tsx
- [x] T009 [US1] Add search input for 运输合同号/品名/物流公司 in src/pages/sales/shipments/ShipmentList.tsx
- [x] T010 [US1] Add filter dropdowns for 运费状态 and 发票状态 in src/pages/sales/shipments/ShipmentList.tsx
- [x] T011 [US1] Implement pagination in src/pages/sales/shipments/ShipmentList.tsx
- [x] T012 [US1] Connect list API to component using useEffect/useState in src/pages/sales/shipments/ShipmentList.tsx
- [x] T013 [P] [US2] Create ShipmentForm modal component in src/pages/sales/shipments/ShipmentForm.tsx
- [x] T014 [US2] Implement form fields: 关联销售合同(下拉), 运输合同号, 发货日期, 发货数量, 物流公司, 发货地址, 收货地址, 运费金额, 运费状态, 发票状态, 备注 in src/pages/sales/shipments/ShipmentForm.tsx
- [x] T015 [US2] Add contract selection dropdown with search in src/pages/sales/shipments/ShipmentForm.tsx
- [x] T016 [US2] Add file upload for attachments using Ant Design Upload in src/pages/sales/shipments/ShipmentForm.tsx
- [x] T017 [US2] Implement form validation (required fields) in src/pages/sales/shipments/ShipmentForm.tsx
- [x] T018 [US2] Integrate create API call on form submit in src/pages/sales/shipments/ShipmentForm.tsx
- [x] T019 [US2] Add success/error notification using Ant Design message in src/pages/sales/shipments/ShipmentForm.tsx
- [x] T020 [US2] Add "新增发货" button in ShipmentList.tsx to open form modal
- [x] T021 [P] [US3] Add edit button to each row in ShipmentList.tsx table
- [x] T022 [US3] Open ShipmentForm modal in edit mode with pre-filled data in src/pages/sales/shipments/ShipmentForm.tsx
- [x] T023 [US3] Implement update API call on form submit in src/pages/sales/shipments/ShipmentForm.tsx
- [x] T024 [US3] Add loading state during API call in src/pages/sales/shipments/ShipmentForm.tsx
- [x] T025 [P] [US4] Add delete button to each row in ShipmentList.tsx table
- [x] T026 [US4] Implement confirmation dialog using Ant Design Modal.confirm in src/pages/sales/shipments/ShipmentList.tsx
- [x] T027 [US4] Call delete API on confirmation in src/pages/sales/shipments/ShipmentList.tsx
- [x] T028 [US4] Refresh list after successful deletion in src/pages/sales/shipments/ShipmentList.tsx
- [x] T029 [US4] Add success/error notification in src/pages/sales/shipments/ShipmentList.tsx
- [x] T030 [P] [US5] Create ShipmentDetail page component in src/pages/sales/shipments/ShipmentDetail.tsx
- [x] T031 [US5] Implement detail view with all shipment fields in src/pages/sales/shipments/ShipmentDetail.tsx
- [x] T032 [US5] Display expanded sales contract information in src/pages/sales/shipments/ShipmentDetail.tsx
- [x] T033 [US5] Add back button to return to list in src/pages/sales/shipments/ShipmentDetail.tsx
- [x] T034 [US5] Add click handler on table row to navigate to detail page in src/pages/sales/shipments/ShipmentList.tsx
- [x] T035 [P] [US6] Add attachment display in ShipmentDetail page in src/pages/sales/shipments/ShipmentDetail.tsx
- [x] T036 [US6] Implement attachment download using PocketBase file URL in src/pages/sales/shipments/ShipmentDetail.tsx
- [x] T037 [US6] Add "暂无附件" placeholder when no attachments in src/pages/sales/shipments/ShipmentDetail.tsx
- [x] T038 [US6] Add attachment preview for images in src/pages/sales/shipments/ShipmentDetail.tsx

**Checkpoint**: User Story 6 complete - attachment viewing functional

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Final integration and validation

- [x] T039 [P] Add route for /sales/shipment and /sales/shipment/:id in src/routes/index.tsx
- [x] T040 Add shipment menu item in sidebar menu configuration
- [x] T041 Verify npm run build succeeds
- [x] T042 Verify npm run lint passes with no errors
- [x] T043 Run quickstart.md validation checklist

---

## Dependencies & Execution Order

### Phase Dependencies

- **Foundational (Phase 2)**: No dependencies - can start immediately
- **User Stories (Phase 3-8)**: All depend on Foundational phase completion
  - User stories proceed in priority order (P1 → P2 → P3)
- **Polish (Phase 9)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Depends on Foundational - No dependencies on other stories
- **User Story 2 (P1)**: Depends on Foundational - Can work in parallel with US1 after foundation
- **User Story 3 (P1)**: Depends on Foundational + US2 (form component) - Can proceed after US2
- **User Story 4 (P2)**: Depends on Foundational - Can work in parallel after foundation
- **User Story 5 (P2)**: Depends on Foundational - Can work in parallel after foundation
- **User Story 6 (P3)**: Depends on Foundational + US5 - Must proceed after US5

### Within Each User Story

- Types before API
- API before UI components
- List page before detail page
- Form component before edit functionality
- Story complete before moving to next priority

### Parallel Opportunities

- Phase 2 tasks T001-T003 can run in parallel (different type definitions)
- Phase 2 tasks T001-T006 can proceed in parallel after type definitions
- US1 tasks T007-T012 can run in parallel after foundation
- US2 tasks T013-T020 can run in parallel after foundation
- US4 tasks T025-T029 can run in parallel (independent from US2/US3)
- US5 and US6 can run in parallel after foundation

---

## Parallel Example: Foundation Phase

```bash
# Launch all type definitions together:
Task: "Create SalesShipment type definition in src/types/sales-shipment.ts"
Task: "Create SalesShipmentFormData interface in src/types/sales-shipment.ts"
Task: "Create SalesShipmentListParams interface in src/types/sales-shipment.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 2: Foundational
2. Complete Phase 3: User Story 1 (View Shipment List)
3. **STOP and VALIDATE**: Test viewing shipments
4. Deploy/demo if ready

### Incremental Delivery

1. Complete Foundational → Foundation ready
2. Add User Story 1 → Test → Deploy/Demo (MVP with list view!)
3. Add User Story 2 → Test → Deploy/Demo (Can create shipments!)
4. Add User Story 3 → Test → Deploy/Demo (Can edit!)
5. Add User Story 4 → Test → Deploy/Demo (Can delete!)
6. Add User Story 5 → Test → Deploy/Demo (Details view!)
7. Add User Story 6 → Test → Deploy/Demo (Attachments!)

### Recommended Execution Order

1. **Week 1**: Foundational (T001-T006) + User Story 1 (T007-T012)
2. **Week 2**: User Stories 2-3 (Create/Edit)
3. **Week 3**: User Stories 4-5 (Delete/Detail)
4. **Week 4**: User Story 6 (Attachments) + Polish

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- This feature builds on existing sales contract functionality (step 07)
