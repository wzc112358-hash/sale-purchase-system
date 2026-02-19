# Implementation Plan: 销售合同管理

**Branch**: `007-sales-contract` | **Date**: 2026-02-18 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/007-sales-contract/spec.md`

## Summary

实现销售合同管理功能，包括：
- 销售合同列表展示（分页、搜索）
- 销售合同创建、编辑、删除
- 销售合同详情查看（关联客户、发货批次、发票、收款记录）
- 合同附件上传下载
- 合同金额自动计算
- 合同执行进度自动更新（达到100%时状态变更为completed）
- 合同创建成功后自动通知采购职员

技术方案：基于现有 React + TypeScript + Ant Design + PocketBase 技术栈，沿用现有 API 封装模式和组件架构。

## Technical Context

| 项目 | 内容 |
|------|------|
| **Language/Version** | TypeScript 5.x |
| **Primary Dependencies** | React 18+, Vite, Ant Design, PocketBase SDK, react-router-dom v6 |
| **Storage** | PocketBase (SQLite) |
| **Testing** | Vitest |
| **Target Platform** | Web 浏览器 |
| **Project Type** | Single Web Application |
| **Performance Goals** | 列表加载 <5秒，表单提交 <3秒，支持1000+数据分页 |
| **Constraints** | 附件上传最大10MB |
| **Scale/Scope** | 3种角色（sales/purchasing/manager），权限矩阵控制 |

## Constitution Check

| 检查项 | 状态 | 说明 |
|--------|------|------|
| TypeScript-First | ✓ | 所有代码使用 TypeScript，显式类型标注 |
| Component-Based | ✓ | 遵循组件目录规范 (pages/components/layouts) |
| RBAC | ✓ | 销售角色 CRUD 本人创建的合同，经理仅读取 |
| Data Integrity | ✓ | 合同金额自动计算，进度自动更新 |
| UI/UX Standards | ✓ | 遵循需求文档第四部分设计规范 |

**结论**: 所有 Constitution 检查项通过，无需复杂化。

## Phase 0: Research

本功能无未解决的技术疑问，沿用现有技术栈和代码模式。

## Phase 1: Design & Contracts

### 数据模型

基于需求文档 2.2.4 节，定义前端类型：

```typescript
// 销售合同
interface SalesContract {
  id: string;
  no: string;                    // 合同编号 HT-YYYYMMDD-XXX
  product_name: string;          // 产品名称
  customer: string;               // 客户ID
  total_amount: number;           // 合同总金额
  unit_price: number;             // 产品单价
  total_quantity: number;         // 合同总数量
  executed_quantity: number;       // 已执行数量
  execution_percent: number;      // 执行百分比
  receipted_amount: number;       // 已收款金额
  receipt_percent: number;        // 收款百分比
  debt_amount: number;           // 欠款金额
  debt_percent: number;          // 欠款百分比
  invoiced_amount: number;       // 已开发票金额
  invoice_percent: number;        // 开票百分比
  uninvoiced_amount: number;     // 未开票金额
  uninvoiced_percent: number;    // 未开票百分比
  sign_date: string;             // 签订日期
  status: 'executing' | 'completed' | 'cancelled';
  remark?: string;
  attachments?: string[];
  creator: string;
  created: string;
  updated: string;
}

// 合同表单数据
interface SalesContractFormData {
  customer: string;
  product_name: string;
  unit_price: number;
  total_quantity: number;
  sign_date: string;
  remark?: string;
  attachments?: File[];
}

// 列表查询参数
interface SalesContractListParams {
  page?: number;
  per_page?: number;
  search?: string;
  status?: string;
}
```

### API 端点设计

| 操作 | 方法 | 端点 | 说明 |
|------|------|------|------|
| 列表 | GET | /api/sales_contracts | 分页查询，支持搜索筛选 |
| 详情 | GET | /api/sales_contracts/:id | 获取单个合同，含关联数据 |
| 创建 | POST | /api/sales_contracts | 创建新合同 |
| 更新 | PUT | /api/sales_contracts/:id | 更新合同信息 |
| 删除 | DELETE | /api/sales_contracts/:id | 删除合同 |

### 组件结构

```
src/
├── api/
│   └── sales-contract.ts        # 合同 API 封装
├── types/
│   └── sales-contract.ts        # 合同类型定义
├── pages/
│   └── sales/
│       └── contracts/
│           ├── ContractList.tsx  # 合同列表页面
│           ├── ContractDetail.tsx # 合同详情页面
│           └── ContractForm.tsx  # 合同表单组件
└── components/
    └── forms/
        └── ProgressBar.tsx      # 进度条组件（可复用）
```

### 路由配置

| 路径 | 组件 | 权限 |
|------|------|------|
| /sales/contracts | ContractList | sales |
| /sales/contracts/:id | ContractDetail | sales |

## Project Structure

### Documentation (this feature)

```
specs/007-sales-contract/
├── plan.md              # 本文件
├── spec.md              # 规格说明
├── research.md          # N/A（无需研究）
├── data-model.md        # 数据模型定义
├── quickstart.md        # 快速开始指南
├── contracts/           # API 契约
└── tasks.md             # 任务清单（后续生成）
```

### Source Code (repository root)

基于现有项目结构，新增以下文件：

```
src/
├── api/
│   └── sales-contract.ts        # 销售合同 API
├── types/
│   └── sales-contract.ts        # 销售合同类型
├── pages/
│   └── sales/
│       └── contracts/
│           ├── ContractList.tsx # 合同列表页
│           ├── ContractDetail.tsx# 合同详情页
│           └── ContractForm.tsx # 合同表单
```

**Structure Decision**: 沿用现有前端目录结构，在 `src/pages/sales/` 下创建 `contracts/` 目录。

## Complexity Tracking

无需追踪 - 所有 Constitution 检查项通过，无复杂度增加。

## Next Steps

1. 生成 tasks.md（运行 /speckit.tasks 命令）
2. 按任务实现代码
3. 运行 npm run typecheck 和 npm run lint 验证
