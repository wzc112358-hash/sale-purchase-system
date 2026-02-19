# Quickstart: 销售合同管理

## 概述

本功能实现销售合同的管理，包括创建、编辑、删除、列表查看、详情查看等操作。

## 前置条件

1. 后端 PocketBase 服务运行在 `http://127.0.0.1:8090`
2. 用户已登录且角色为 `sales`
3. 已有客户数据（创建合同前需要先有客户）

## 开发步骤

### 1. 安装依赖

无需额外安装依赖，沿用现有技术栈：
- React 18+
- TypeScript 5.x
- Ant Design
- PocketBase SDK

### 2. 创建类型定义

在 `src/types/sales-contract.ts` 定义类型：

```typescript
// 参考 data-model.md
export interface SalesContract { ... }
export interface SalesContractFormData { ... }
export interface SalesContractListParams { ... }
```

### 3. 创建 API 模块

在 `src/api/sales-contract.ts` 封装 API：

```typescript
import { pb } from '@/lib/pocketbase';
import type { SalesContract, SalesContractFormData, SalesContractListParams } from '@/types/sales-contract';

export const SalesContractAPI = {
  list: async (params: SalesContractListParams) => { ... },
  getById: async (id: string) => { ... },
  create: async (data: SalesContractFormData) => { ... },
  update: async (id: string, data: Partial<SalesContractFormData>) => { ... },
  delete: async (id: string) => { ... },
};
```

### 4. 创建页面组件

```
src/pages/sales/contracts/
├── ContractList.tsx   # 合同列表页
├── ContractDetail.tsx # 合同详情页
└── ContractForm.tsx   # 合同表单组件
```

### 5. 配置路由

在 `src/routes/index.tsx` 添加路由：

```typescript
{
  path: '/sales/contracts',
  element: <ContractList />,
},
{
  path: '/sales/contracts/:id',
  element: <ContractDetail />,
},
```

## UI 设计规范

遵循需求文档第四部分：

- **主背景**: #FFFFFF
- **主要文本**: #333333
- **主按钮背景**: #1A1A1A
- **数据卡片**: 白色背景，圆角 12px
- **进度条**: 百分比形式展示

## 验证清单

- [ ] npm run typecheck 通过
- [ ] npm run lint 无错误
- [ ] 合同列表正常加载
- [ ] 可以创建新合同
- [ ] 可以编辑合同
- [ ] 可以删除合同
- [ ] 金额自动计算正确
- [ ] 附件上传下载正常

## 常见问题

**Q: 创建合同时提示"金额必须大于0"？**
A: 检查单价和数量是否正确输入，系统会自动计算总金额。

**Q: 合同状态未自动更新？**
A: 状态自动更新由后端钩子处理，确认后端 PocketBase 钩子已配置。
