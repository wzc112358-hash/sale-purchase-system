# Research: 销售发货管理

## Technical Decisions

### 1. UI 组件选择

**Decision**: 使用 Ant Design 组件库

**Rationale**: 
- 项目已采用 Ant Design（根据现有代码结构）
- Ant Design 提供完整的 Table、Form、Modal、Upload 组件
- 符合企业应用开发规范

**Alternatives considered**: 
- Material-UI: 项目未采用，需额外学习成本
- 自定义组件: 开发周期长

---

### 2. 状态管理

**Decision**: 使用 React useState + React Query (SWR)

**Rationale**:
- 现有项目使用 React Hooks 进行状态管理
- 列表数据使用 SWR 或 React Query 进行缓存和同步
- 简单页面无需引入复杂状态管理

**Alternatives considered**:
- Zustand: 适合全局状态，发货管理为页面级
- Redux: 过于复杂

---

### 3. 表单验证

**Decision**: 使用 Ant Design Form 结合自定义校验规则

**Rationale**:
- Ant Form 提供成熟的校验机制
- 可自定义校验函数处理业务规则（如数量限制）
- 与 UI 组件无缝集成

---

### 4. 文件上传

**Decision**: 使用 Ant Design Upload 组件 + PocketBase 文件存储

**Rationale**:
- PocketBase 原生支持文件上传
- Ant Upload 提供良好的上传体验（进度条、预览等）
- 无需额外配置存储服务

---

## 依赖分析

| 依赖 | 用途 | 状态 |
|------|------|------|
| react-router-dom | 路由管理 | 已安装 |
| antd | UI 组件库 | 已安装 |
| pocketbase | 后端 SDK | 已安装 |
| @ant-design/icons | 图标库 | 已安装 |

无需新增依赖。

---

## 现有代码复用

1. **API 模式**: 复用 `src/api/sales-contract.ts` 的 API 封装模式
2. **类型定义**: 在 `src/types/sales-contract.ts` 中已有 `SalesShipment` 接口定义
3. **页面结构**: 复用 `src/pages/sales/` 下的页面组件结构

---

## 结论

本功能开发无需额外技术调研，所有技术选型均基于现有项目约定和最佳实践。
