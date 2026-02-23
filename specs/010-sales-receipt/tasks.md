# Tasks: 销售-收款管理

**Feature**: 销售-收款管理  
**Branch**: `010-sales-receipt`  
**Generated**: 2026-02-21

## Implementation Strategy

MVP scope: User Story 1 (销售收款记录管理) - 实现基本的增删改查功能
增量交付: 每个用户故事完成后独立可测试

## Dependencies

```
User Story 1 (P1) → User Story 2 (P1) → User Story 3 (P2) → User Story 4 (P2)
       ↓                    ↓                   ↓                    ↓
   基础CRUD          自动更新进度           凭证管理            搜索筛选
```

## Phase 1: Setup (项目初始化)

- [x] T001 创建 SaleReceipt 类型定义文件 src/types/receipt.ts
- [x] T002 创建 ReceiptAPI 模块 src/api/receipt.ts

## Phase 2: Foundational (基础架构)

- [x] T003 检查现有销售合同 API 模块 src/api/contract.ts 是否存在
- [x] T004 确保布局组件和路由配置支持新页面

## Phase 3: User Story 1 - 销售收款记录管理 (P1)

**Goal**: 实现收款记录的基本增删改查功能

**Independent Test**: 可以通过创建、查看、编辑、删除一条收款记录来完整测试

**Implementation**:

- [x] T005 [US1] 创建收款列表页面组件 src/pages/sales/receipts/ReceiptList.tsx
- [x] T006 [US1] 实现 Table 展示收款列表，包含合同编号、品名、收款日期、收款金额、产品数量、收款方式列
- [x] T007 [US1] 创建新增收款弹窗 src/pages/sales/receipts/ReceiptForm.tsx
- [x] T008 [US1] 实现选择销售合同的下拉选择器
- [x] T009 [US1] 实现收款表单验证（金额>0，数量>0，日期必填）
- [x] T010 [US1] 实现创建收款记录 API 调用
- [x] T011 [US1] 创建编辑收款弹窗（复用 ReceiptForm）
- [x] T012 [US1] 实现更新收款记录 API 调用
- [x] T013 [US1] 实现删除收款记录 API 调用（带二次确认）
- [x] T014 [US1] 创建收款详情抽屉 src/pages/sales/receipts/ReceiptDetail.tsx
- [x] T015 [US1] 实现查看收款详情功能
- [x] T016 [US1] 在路由中添加收款页面 src/routes/index.tsx

## Phase 4: User Story 2 - 收款进度自动更新 (P1)

**Goal**: 创建/更新/删除收款后自动更新合同收款进度

**Independent Test**: 创建收款记录后，检查关联销售合同的收款进度百分比和欠款金额是否正确更新

**Implementation**:

- [x] T017 [US2] 验证 PocketBase 后端钩子是否正确配置（应在后端完成）
- [x] T018 [US2] 在收款创建成功后刷新列表并显示成功消息
- [x] T019 [US2] 在收款更新成功后刷新列表并显示成功消息
- [x] T020 [US2] 在收款删除成功后刷新列表并显示成功消息
- [x] T021 [US2] 添加错误处理，处理网络异常和后端错误

## Phase 5: User Story 3 - 收款凭证管理 (P2)

**Goal**: 实现收款凭证的上传和下载功能

**Independent Test**: 在新增/编辑收款时可以上传附件，并能够查看和下载已上传的凭证

**Implementation**:

- [x] T022 [US3] 在 ReceiptForm 中添加文件上传组件
- [x] T023 [US3] 配置 Ant Design Upload 组件（valuePropName, getValueFromEvent）
- [x] T024 [US3] 实现文件上传到 PocketBase
- [x] T025 [US3] 在 ReceiptDetail 中显示已上传的凭证附件
- [x] T026 [US3] 实现凭证文件下载功能

## Phase 6: User Story 4 - 收款列表查询筛选 (P2)

**Goal**: 实现收款列表的搜索和筛选功能

**Independent Test**: 搜索和筛选功能响应时间在3秒以内

**Implementation**:

- [x] T027 [US4] 在收款列表页面添加搜索栏
- [x] T028 [US4] 实现按合同编号搜索功能
- [x] T029 [US4] 实现按品名搜索功能
- [x] T030 [US4] 实现按收款日期范围筛选功能
- [x] T031 [US4] 配置 Table 内置分页（默认10条/页）
- [x] T032 [US4] 优化搜索筛选性能（防抖处理）

## Phase 7: Polish & Cross-Cutting (收尾工作)

- [x] T033 运行 npm run typecheck 确保无类型错误
- [x] T034 运行 npm run lint 确保代码规范
- [x] T035 构建验证：npm run build 成功
- [x] T036 添加页面标题和面包屑导航 (菜单已配置)

## Summary

| Phase | Tasks | User Story |
|-------|-------|------------|
| Phase 1: Setup | 2 | - |
| Phase 2: Foundational | 2 | - |
| Phase 3: US1 | 12 | 销售收款记录管理 |
| Phase 4: US2 | 5 | 收款进度自动更新 |
| Phase 5: US3 | 5 | 收款凭证管理 |
| Phase 6: US4 | 6 | 收款列表查询筛选 |
| Phase 7: Polish | 4 | - |
| **Total** | **36** | |

## Parallel Opportunities

以下任务可以并行执行（不同文件，无依赖）：

- T005, T007, T014, T016 (不同文件)
- T022, T025 (不同组件)
- T027, T028, T029, T030 (同一搜索区域)

## MVP Scope

最小可行产品包含 Phase 1-4（T001-T021），实现：
- 收款列表展示
- 新增/编辑/删除收款记录
- 收款详情查看
- 自动更新进度

完整功能需要额外 phases。
