# Data Model: 系统布局框架

**Feature**: 05-system-layout  
**Date**: 2026-02-18

## 概述

本功能为前端布局框架，不涉及后端数据存储。本文档定义前端布局相关的类型定义和组件接口。

## 类型定义

### 用户角色

```typescript
type UserRole = 'sales' | 'purchasing' | 'manager';
```

### 菜单项

```typescript
interface MenuItem {
  key: string;
  label: string;
  icon: string;      // Ant Design 图标组件名
  path: string;
  children?: MenuItem[];
}
```

### 用户信息

```typescript
interface UserInfo {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
}
```

### 布局配置

```typescript
interface LayoutConfig {
  sidebarWidth: number;      // 默认 280
  headerHeight: number;       // 默认 64
  breakpoint: {
    mobile: number;          // 默认 767
    tablet: number;          // 默认 1200
  };
}
```

### 主题颜色

```typescript
interface ThemeColors {
  primaryBg: string;          // #FFFFFF
  textPrimary: string;       // #333333
  textSecondary: string;     // #999999
  selectedBg: string;        // #F5F5F5
  buttonPrimary: string;      // #1A1A1A
  buttonText: string;        // #FFFFFF
}
```

### 组件Props接口

#### MainLayout

```typescript
interface MainLayoutProps {
  children: React.ReactNode;
  userInfo: UserInfo;
  onLogout: () => void;
}
```

#### Sidebar

```typescript
interface SidebarProps {
  menuItems: MenuItem[];
  selectedKey: string;
  collapsed: boolean;
  onMenuSelect: (key: string) => void;
}
```

#### TopNav

```typescript
interface TopNavProps {
  userInfo: UserInfo;
  onLogout: () => void;
  onMenuToggle?: () => void;
}
```

## 菜单配置数据

### 销售角色菜单

| key | label | icon | path |
|-----|-------|------|------|
| customers | 客户管理 | TeamOutlined | /sales/customers |
| contracts | 销售合同 | FileTextOutlined | /sales/contracts |
| shipments | 发货 | CarOutlined | /sales/shipments |
| invoices | 发票 | FileDoneOutlined | /sales/invoices |
| receipts | 收款 | DollarOutlined | /sales/receipts |
| progress | 进度跟踪 | LineChartOutlined | /sales/progress |

### 采购角色菜单

| key | label | icon | path |
|-----|-------|------|------|
| suppliers | 供应商管理 | TeamOutlined | /purchase/suppliers |
| contracts | 采购合同 | FileTextOutlined | /purchase/contracts |
| arrivals | 到货 | InboxOutlined | /purchase/arrivals |
| invoices | 收票 | FileDoneOutlined | /purchase/invoices |
| payments | 付款 | PaymentOutlined | /purchase/payments |
| progress | 进度跟踪 | LineChartOutlined | /purchase/progress |

### 经理角色菜单

| key | label | icon | path |
|-----|-------|------|------|
| dashboard | 总览 | DashboardOutlined | /manager/dashboard |
| progress | 进度跟踪 | LineChartOutlined | /manager/progress |
| comparison | 关联对比 | SwapOutlined | /manager/comparison |
| reports | 数据报表 | BarChartOutlined | /manager/reports |
| history | 历史记录 | HistoryOutlined | /manager/history |

## 路由映射

| 路径 | 角色 | 组件 | 说明 |
|------|------|------|------|
| /sales/* | sales | SalesLayout | 销售模块路由容器 |
| /purchase/* | purchasing | PurchaseLayout | 采购模块路由容器 |
| /manager/* | manager | ManagerLayout | 经理模块路由容器 |

## 状态管理

本功能使用React Context进行全局状态管理（如果需要）:

```typescript
interface LayoutContextValue {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  responsive: {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
  };
}
```

## 验证规则

1. 用户角色必须为 'sales' | 'purchasing' | 'manager' 之一
2. 菜单项的path必须以'/'开头
3. 侧边栏宽度必须在200-400px之间
4. 头部高度必须在48-80px之间
