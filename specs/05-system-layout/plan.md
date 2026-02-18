# Implementation Plan: 系统布局框架

**Branch**: `05-system-layout` | **Date**: 2026-02-18 | **Spec**: [specs/05-system-layout/spec.md](./spec.md)
**Input**: Feature specification from `/specs/05-system-layout/spec.md`

## Summary

实现企业采购销售管理系统的主布局框架，包含顶部导航栏、左侧侧边栏和主内容区域。根据用户角色（销售/采购/经理）动态显示不同菜单，提供响应式布局支持桌面端和移动端。

## Technical Context

**Language/Version**: TypeScript 5.x + React 18.x  
**Primary Dependencies**: react-router-dom, antd (UI组件库), @ant-design/icons  
**Storage**: N/A (前端布局组件)  
**Testing**: Vitest / React Testing Library  
**Target Platform**: Web浏览器 (桌面端 ≥1200px, 移动端 ≤767px)  
**Project Type**: Single Web Application  
**Performance Goals**: 布局加载时间 <2秒，菜单切换响应时间 <1秒  
**Constraints**: 遵循AGENTS.md中的代码风格规范，使用TypeScript显式类型  
**Scale/Scope**: 约10个页面组件，3种角色菜单配置

## Constitution Check

*本项目为React前端项目，不涉及多项目/多语言/复杂后端架构，Constitution条款主要涉及代码质量规范*

| 检查项 | 状态 | 说明 |
|--------|------|------|
| TypeScript显式类型 | ✅ | 遵循AGENTS.md规范，所有Props和函数需显式类型标注 |
| 组件规范 | ✅ | 函数式组件+Hooks，Props使用接口定义 |
| 目录结构 | ✅ | 遵循AGENTS.md规定的src/layouts/目录 |
| 命名约定 | ✅ | 组件文件使用PascalCase |

**结论**: 无Constitution违规，可以继续实施

## Project Structure

### Documentation (this feature)

```text
specs/05-system-layout/
├── plan.md              # This file
├── spec.md              # Feature specification
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output (类型定义)
├── quickstart.md        # Phase 1 output
└── checklists/
    └── requirements.md  # Specification quality checklist
```

### Source Code (repository root)

```text
src/
├── layouts/                     # 布局组件目录 (新增)
│   ├── MainLayout.tsx          # 主布局组件
│   ├── MainLayout.module.css   # 布局样式
│   ├── Sidebar.tsx             # 侧边栏组件
│   ├── Sidebar.module.css      # 侧边栏样式
│   ├── TopNav.tsx              # 顶部导航栏组件
│   └── TopNav.module.css       # 顶部导航样式
├── pages/                       # 页面组件目录 (现有)
│   ├── sales/                  # 销售模块页面
│   ├── purchase/               # 采购模块页面
│   └── manager/                # 经理模块页面
├── components/                  # 公共组件 (现有)
│   └── common/                 # 通用组件
├── stores/                      # 状态管理 (现有)
│   └── auth.ts                # 认证状态
├── routes/                      # 路由配置 (现有)
│   └── index.tsx              # 路由定义
├── types/                       # TypeScript类型 (新增)
│   └── layout.ts               # 布局相关类型定义
└── App.tsx                     # 应用入口 (修改)

# 测试目录
src/__tests__/
└── layouts/                     # 布局测试 (新增)
    ├── MainLayout.test.tsx
    └── Sidebar.test.tsx
```

**Structure Decision**: 
- 布局组件放在 `src/layouts/` 目录
- 类型定义放在 `src/types/layout.ts`
- 样式文件使用 CSS Modules (`.module.css`)
- 遵循AGENTS.md中的目录结构规范

## Complexity Tracking

> 无复杂度违规，无需填写

---

# Phase 0: 架构与依赖分析

## 技术选型决策

| 决策项 | 选择 | 理由 |
|--------|------|------|
| UI组件库 | Ant Design | AGENTS.md推荐，提供完整的组件生态 |
| 图标库 | @ant-design/icons | 随Ant Design一起安装，图标风格统一 |
| 路由方案 | react-router-dom v6 | 业界标准，AGENTS.md已推荐 |
| 样式方案 | CSS Modules | 组件级样式隔离，避免冲突 |
| 响应式方案 | CSS Media Queries | 原生支持，无需额外依赖 |

## 依赖分析

本功能依赖以下已安装的包（需确认package.json中存在）:
- react
- react-dom
- react-router-dom
- antd
- @ant-design/icons

新增依赖: 无 (所有依赖已在项目初始化时安装)

## 路由结构设计

根据三种角色，路由结构如下：

```
/                    → 重定向到角色首页
/login               → 登录页 (无需登录)
/sales               → 销售首页 (sales角色)
/sales/customers     → 客户管理
/sales/contracts    → 销售合同
/sales/shipments     → 发货管理
/sales/invoices      → 发票管理
/sales/receipts      → 收款管理
/sales/progress      → 进度跟踪
/purchase            → 采购首页 (purchasing角色)
/purchase/suppliers  → 供应商管理
/purchase/contracts  → 采购合同
/purchase/arrivals   → 到货管理
/purchase/invoices   → 收票管理
/purchase/payments   → 付款管理
/purchase/progress   → 进度跟踪
/manager             → 经理首页 (manager角色)
/manager/dashboard   → 总览仪表盘
/manager/progress    → 进度跟踪
/manager/comparison  → 关联对比
/manager/reports    → 数据报表
/manager/history    → 历史记录
```

## 菜单配置

```typescript
// 菜单配置结构
const menuConfig = {
  sales: [
    { key: 'customers', label: '客户管理', icon: 'TeamOutlined', path: '/sales/customers' },
    { key: 'contracts', label: '销售合同', icon: 'FileTextOutlined', path: '/sales/contracts' },
    { key: 'shipments', label: '发货', icon: 'CarOutlined', path: '/sales/shipments' },
    { key: 'invoices', label: '发票', icon: 'FileDoneOutlined', path: '/sales/invoices' },
    { key: 'receipts', label: '收款', icon: 'DollarOutlined', path: '/sales/receipts' },
    { key: 'progress', label: '进度跟踪', icon: 'LineChartOutlined', path: '/sales/progress' },
  ],
  purchasing: [
    { key: 'suppliers', label: '供应商管理', icon: 'TeamOutlined', path: '/purchase/suppliers' },
    { key: 'contracts', label: '采购合同', icon: 'FileTextOutlined', path: '/purchase/contracts' },
    { key: 'arrivals', label: '到货', icon: 'InboxOutlined', path: '/purchase/arrivals' },
    { key: 'invoices', label: '收票', icon: 'FileDoneOutlined', path: '/purchase/invoices' },
    { key: 'payments', label: '付款', icon: 'PaymentOutlined', path: '/purchase/payments' },
    { key: 'progress', label: '进度跟踪', icon: 'LineChartOutlined', path: '/purchase/progress' },
  ],
  manager: [
    { key: 'dashboard', label: '总览', icon: 'DashboardOutlined', path: '/manager/dashboard' },
    { key: 'progress', label: '进度跟踪', icon: 'LineChartOutlined', path: '/manager/progress' },
    { key: 'comparison', label: '关联对比', icon: 'SwapOutlined', path: '/manager/comparison' },
    { key: 'reports', label: '数据报表', icon: 'BarChartOutlined', path: '/manager/reports' },
    { key: 'history', label: '历史记录', icon: 'HistoryOutlined', path: '/manager/history' },
  ],
};
```

---

# Phase 1: 数据模型与接口设计

## 布局相关类型定义

```typescript
// src/types/layout.ts

// 用户角色类型
export type UserRole = 'sales' | 'purchasing' | 'manager';

// 菜单项类型
export interface MenuItem {
  key: string;
  label: string;
  icon: string;  // Ant Design 图标名
  path: string;
  children?: MenuItem[];
}

// 用户信息类型
export interface UserInfo {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
}

// 布局配置类型
export interface LayoutConfig {
  sidebarWidth: number;
  headerHeight: number;
  breakpoint: {
    mobile: number;
    tablet: number;
  };
}

// 主题颜色配置
export interface ThemeColors {
  primaryBg: string;
  textPrimary: string;
  textSecondary: string;
  selectedBg: string;
  buttonPrimary: string;
  buttonText: string;
}

// 响应式状态
export interface ResponsiveState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  sidebarCollapsed: boolean;
}
```

## API接口设计

本功能为前端布局，不涉及后端API调用。路由参数通过react-router-dom管理。

## 组件接口设计

### MainLayoutProps

```typescript
interface MainLayoutProps {
  children: React.ReactNode;
  userInfo: UserInfo;
  onLogout: () => void;
}
```

### SidebarProps

```typescript
interface SidebarProps {
  menuItems: MenuItem[];
  selectedKey: string;
  collapsed: boolean;
  onMenuSelect: (key: string) => void;
}
```

### TopNavProps

```typescript
interface TopNavProps {
  userInfo: UserInfo;
  onLogout: () => void;
  onMenuToggle?: () => void;
}
```

---

# 实施检查清单

- [ ] 创建 src/layouts/ 目录结构
- [ ] 实现 MainLayout 主布局组件
- [ ] 实现 Sidebar 侧边栏组件（支持角色菜单）
- [ ] 实现 TopNav 顶部导航栏组件
- [ ] 创建布局相关类型定义 src/types/layout.ts
- [ ] 配置路由和菜单映射
- [ ] 实现响应式布局（桌面端+移动端）
- [ ] 应用样式规范（颜色、字体、间距）
- [ ] 编写组件单元测试
- [ ] 运行 typecheck 确保无类型错误
- [ ] 运行 lint 检查代码规范
