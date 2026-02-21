# Implementation Plan: 销售发票管理

**Branch**: `009-sales-invoice` | **Date**: 2026-02-20 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/009-sales-invoice/spec.md`

## Summary

实现销售发票管理功能，包括发票列表、新增、编辑、删除、详情查看、附件管理。发票关联销售合同，开票后自动更新合同开票进度。金额需校验不超过合同剩余未开票金额。

## Technical Context

**Language/Version**: TypeScript 5.x  
**Primary Dependencies**: React 18+, Vite, Ant Design, PocketBase SDK, react-router-dom v6  
**Storage**: PocketBase (PocketBase collection: sale_invoices)  
**Testing**: Vitest / React Testing Library  
**Target Platform**: Web Browser (Desktop)  
**Project Type**: Single Web Application  
**Performance Goals**: 页面加载 < 2s, 表格操作响应 < 500ms  
**Constraints**: 遵循 Constitution 中的 UI/UX 标准，色系 #1A1A1A 主按钮  
**Scale/Scope**: 单页面应用，预计 5-8 个组件

## Constitution Check

| 原则 | 状态 | 说明 |
|------|------|------|
| TypeScript-First | ✅ | 所有代码使用 TypeScript，定义完整类型 |
| Component-Based | ✅ | 组件化设计，List/Form/Detail 分离 |
| Role-Based Access | ✅ | sales 角色可访问，purchasing/manager 仅读取 |
| Data Integrity | ✅ | 金额校验，数据关联正确 |
| UI/UX Standards | ✅ | 使用 Ant Design，符合设计规范 |

## Project Structure

### Documentation (this feature)

```text
specs/009-sales-invoice/
├── plan.md              # This file
├── research.md          # N/A - 无需研究
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── tasks.md             # Phase 2 output (NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/
├── api/
│   └── sales-invoice.ts    # 新增: 发票 API 封装
├── pages/sales/
│   └── invoices/           # 新增: 发票页面目录
│       ├── InvoiceList.tsx  # 发票列表页
│       ├── InvoiceForm.tsx  # 发票表单弹窗
│       └── InvoiceDetail.tsx # 发票详情页
├── types/
│   └── sales-invoice.ts    # 新增: 发票类型定义
└── components/common/      # 复用现有通用组件
```

**Structure Decision**: 采用现有销售模块结构，在 src/pages/sales/ 下新增 invoices 目录，使用现有 API 封装模式和类型定义规范。

## Complexity Tracking

> 无复杂度违规

## Phase 0: Research

无需研究阶段 - 技术栈已在 Constitution 中定义清楚，无需要澄清的技术决策。

## Phase 1: Design & Contracts

### 1.1 Data Model

根据 spec.md 中的 Key Entities 和功能需求，定义发票数据模型：

| 字段名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| id | string | 系统生成 | 唯一标识 |
| no | string | 是 | 发票号码 |
| product_name | string | 是 | 产品名称 |
| sales_contract | relation | 是 | 关联销售合同 |
| invoice_type | string | 是 | 发票类型 |
| product_amount | number | 是 | 产品数量 |
| amount | number | 是 | 发票金额 |
| issue_date | date | 是 | 开票日期 |
| remark | string | 否 | 备注 |
| attachments | file[] | 否 | 发票附件 |
| creator | relation | 是 | 创建人 |

### 1.2 API Contract

| 操作 | Method | Endpoint | 说明 |
|------|--------|----------|------|
| 列表 | GET | /api/sale_invoices | 分页查询发票列表 |
| 详情 | GET | /api/sale_invoices/:id | 获取发票详情 |
| 新增 | POST | /api/sale_invoices | 创建发票记录 |
| 编辑 | PUT | /api/sale_invoices/:id | 更新发票记录 |
| 删除 | DELETE | /api/sale_invoices/:id | 删除发票记录 |

### 1.3 Validation Rules

- 发票金额不能超过关联合同的剩余未开票金额
- 发票号码必填
- 关联的销售合同必选

### 1.4 Component Design

| 组件 | 职责 |
|------|------|
| InvoiceList | 发票列表表格，支持搜索、分页 |
| InvoiceForm | 新增/编辑发票表单弹窗 |
| InvoiceDetail | 发票详情展示页 |

### 1.5 Edge Case Handling

- 关联合同删除 → 发票自动删除（后端级联）
- 金额超限 → 前端校验并提示错误
- 附件上传 → 使用 PocketBase 文件上传

## Implementation Notes

- 复用 sales-shipment 模块的 API 封装模式
- 使用 Ant Design Table, Form, Modal, Upload 组件
- 金额计算使用 number 类型，保留两位小数
- 路由配置参考现有 sales 模块结构
