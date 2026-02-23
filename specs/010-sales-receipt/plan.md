# Implementation Plan: 销售-收款管理

**Branch**: `010-sales-receipt` | **Date**: 2026-02-21 | **Spec**: [link](spec.md)
**Input**: Feature specification from `/specs/010-sales-receipt/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

实现销售收款管理功能，包括：
- 收款列表展示（合同编号、品名、收款日期、收款金额、产品数量、收款方式）
- 收款记录新增/编辑/删除
- 收款详情查看
- 收款凭证上传/下载
- 自动更新关联销售合同的收款进度和欠款金额
- 搜索筛选和分页

技术方案：使用 React + TypeScript + Ant Design + PocketBase SDK 实现前端功能，利用 PocketBase 后端自动计算更新合同进度。

## Technical Context

**Language/Version**: TypeScript 5.x  
**Primary Dependencies**: React 18+, Vite, Ant Design, PocketBase SDK, react-router-dom, Zustand  
**Storage**: PocketBase (SQLite)  
**Testing**: Vitest  
**Target Platform**: Web browser  
**Project Type**: Web application  
**Performance Goals**: 列表加载<3s, 新建操作<10s, 自动更新<5s  
**Constraints**: 响应式设计，支持桌面端≥1200px  
**Scale/Scope**: 企业级ERP系统，中等规模用户数

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Gate | Status | Notes |
|------|--------|-------|
| TypeScript-First | ✓ | 使用 TypeScript 5.x |
| Component-Based | ✓ | React 组件化架构 |
| RBAC | ✓ | 销售角色可访问 |
| Data Integrity | ✓ | 自动计算收款进度 |
| UI/UX Standards | ✓ | 遵循设计规范 |

## Project Structure

### Documentation (this feature)

```
specs/010-sales-receipt/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── # Phase 1 data-model.md        output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/
├── api/                  # API 请求封装
├── assets/               # 静态资源
├── components/          # 公共组件
│   ├── common/          # 通用组件
│   └── forms/           # 表单组件
├── layouts/             # 布局组件
├── pages/               # 页面组件
│   └── sales/           # 销售模块
│       └── Receipt.tsx  # 收款管理页面（新增）
├── routes/              # 路由配置
├── stores/              # 状态管理
├── types/               # TypeScript 类型定义
└── utils/               # 工具函数
```

**Structure Decision**: 单页Web应用，使用React组件化结构，新增收款管理页面在 src/pages/sales/ 目录下。

## Complexity Tracking

> N/A - No Constitution violations
