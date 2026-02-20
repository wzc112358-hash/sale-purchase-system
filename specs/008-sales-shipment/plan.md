# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]
**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

销售发货管理功能：实现销售发货的增删改查、附件上传下载，以及发货后自动更新关联销售合同的执行进度。采用 React + TypeScript + Ant Design + PocketBase 技术栈。

## Technical Context

**Language/Version**: TypeScript 5.x  
**Primary Dependencies**: React 18+, Ant Design, PocketBase SDK, react-router-dom v6  
**Storage**: PocketBase (SQLite)  
**Testing**: Vitest  
**Target Platform**: Web Browser  
**Project Type**: Single web application  
**Performance Goals**: 列表响应时间 < 2秒，操作成功率 > 95%  
**Constraints**: < 200ms p95 响应时间  
**Scale/Scope**: 约 50 个页面，中小型企业使用

## Constitution Check

根据 Constitution 检查：

| 检查项 | 状态 | 说明 |
|--------|------|------|
| TypeScript-First | PASS | 所有代码使用 TypeScript |
| Component-Based | PASS | 使用 React 组件化架构 |
| RBAC | PASS | 根据权限矩阵控制访问 |
| Data Integrity | PASS | 使用数字类型和自动计算字段 |
| UI/UX Standards | PASS | 遵循设计规范 |

无违规项。

## Project Structure

### Documentation (this feature)

```text
specs/008-sales-shipment/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
src/
├── api/                 # API 请求封装
│   ├── sales-shipment.ts   # 新增
│   └── ...
├── components/          # 公共组件
│   └── common/         # 通用组件
├── pages/              # 页面组件
│   └── sales/          # 销售模块
│       ├── ShipmentList.tsx    # 新增
│       └── ShipmentDetail.tsx # 新增
├── types/              # TypeScript 类型
│   └── sales-shipment.ts  # 新增
└── ...
```

**Structure Decision**: 采用现有项目结构，在 `src/pages/sales/` 下创建发货管理页面，在 `src/api/` 下创建 API 封装，在 `src/types/` 下创建类型定义。

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
