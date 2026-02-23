# Quickstart: 系统布局框架

**Feature**: 05-system-layout  
**Date**: 2026-02-18

## 前置条件

1. Node.js 18+ 已安装
2. 项目依赖已安装: `npm install`
3. PocketBase 后端服务运行中 (http://127.0.0.1:8090)
4. 开发服务器已启动: `npm run dev`

## 快速开始

### 1. 创建布局组件目录

```bash
mkdir -p src/layouts src/types
```

### 2. 创建类型定义

创建 `src/types/layout.ts`:

```typescript
export type UserRole = 'sales' | 'purchasing' | 'manager';

export interface MenuItem {
  key: string;
  label: string;
  icon: string;
  path: string;
  children?: MenuItem[];
}

export interface UserInfo {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
}
```

### 3. 创建主布局组件

创建 `src/layouts/MainLayout.tsx`:

```typescript
import React from 'react';
import { Layout, Menu } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import type { UserInfo, MenuItem } from '@/types/layout';
import { TopNav } from './TopNav';

const { Sider, Content } = Layout;

// 根据角色获取菜单配置
const getMenuItems = (role: UserRole): MenuItem[] => {
  const menus = {
    sales: [
      { key: 'customers', label: '客户管理', path: '/sales/customers' },
      { key: 'contracts', label: '销售合同', path: '/sales/contracts' },
      { key: 'shipments', label: '发货', path: '/sales/shipments' },
      { key: 'invoices', label: '发票', path: '/sales/invoices' },
      { key: 'receipts', label: '收款', path: '/sales/receipts' },
      { key: 'progress', label: '进度跟踪', path: '/sales/progress' },
    ],
    purchasing: [
      { key: 'suppliers', label: '供应商管理', path: '/purchase/suppliers' },
      { key: 'contracts', label: '采购合同', path: '/purchase/contracts' },
      { key: 'arrivals', label: '到货', path: '/purchase/arrivals' },
      { key: 'invoices', label: '收票', path: '/purchase/invoices' },
      { key: 'payments', label: '付款', path: '/purchase/payments' },
      { key: 'progress', label: '进度跟踪', path: '/purchase/progress' },
    ],
    manager: [
      { key: 'dashboard', label: '总览', path: '/manager/dashboard' },
      { key: 'progress', label: '进度跟踪', path: '/manager/progress' },
      { key: 'comparison', label: '关联对比', path: '/manager/comparison' },
      { key: 'reports', label: '数据报表', path: '/manager/reports' },
      { key: 'history', label: '历史记录', path: '/manager/history' },
    ],
  };
  return menus[role];
};

interface MainLayoutProps {
  userInfo: UserInfo;
  onLogout: () => void;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ userInfo, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const menuItems = getMenuItems(userInfo.role);

  const handleMenuClick = ({ key }: { key: string }) => {
    const item = menuItems.find(m => m.key === key);
    if (item) {
      navigate(item.path);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={280} style={{ background: '#fff' }}>
        <div style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid #f0f0f0' }}>
          <h2 style={{ margin: 0 }}>采购销售系统</h2>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[menuItems.find(m => location.pathname.startsWith(m.path))?.key || '']}
          style={{ borderRight: 0 }}
          items={menuItems.map(item => ({
            key: item.key,
            label: item.label,
          }))}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout>
        <TopNav userInfo={userInfo} onLogout={onLogout} />
        <Content style={{ margin: 24, padding: 24, background: '#fff', borderRadius: 8 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
```

### 4. 创建顶部导航组件

创建 `src/layouts/TopNav.tsx`:

```typescript
import React from 'react';
import { Layout, Button, Space } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import type { UserInfo } from '@/types/layout';

const { Header } = Layout;

interface TopNavProps {
  userInfo: UserInfo;
  onLogout: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({ userInfo, onLogout }) => {
  return (
    <Header style={{ background: '#fff', padding: '0 24px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', borderBottom: '1px solid #f0f0f0' }}>
      <Space>
        <UserOutlined />
        <span>{userInfo.name}</span>
        <Button 
          type="text" 
          icon={<LogoutOutlined />}
          onClick={onLogout}
        >
          退出
        </Button>
      </Space>
    </Header>
  );
};
```

### 5. 在路由中使用布局

修改 `src/App.tsx` 或路由配置文件:

```typescript
import { MainLayout } from '@/layouts/MainLayout';

// 在需要使用布局的路由外包装
<Route element={<MainLayout userInfo={userInfo} onLogout={handleLogout} />}>
  <Route path="/sales/*" element={<SalesPages />} />
  <Route path="/purchase/*" element={<PurchasePages />} />
  <Route path="/manager/*" element={<ManagerPages />} />
</Route>
```

## 样式规范

### 色彩

```css
:root {
  --color-bg: #FFFFFF;
  --color-text-primary: #333333;
  --color-text-secondary: #999999;
  --color-selected: #F5F5F5;
  --color-button: #1A1A1A;
  --color-button-text: #FFFFFF;
}
```

### 布局尺寸

```css
.sidebar {
  width: 280px;
}

.header {
  height: 64px;
}

.content {
  margin: 24px;
  padding: 24px;
  background: #fff;
  border-radius: 8px;
}
```

### 菜单样式

```css
.ant-menu-item {
  padding: 16px 24px !important;
}

.ant-menu-item-selected {
  background-color: #F5F5F5 !important;
}
```

## 测试验证

### 功能测试

1. 使用销售账号登录，确认显示销售菜单
2. 使用采购账号登录，确认显示采购菜单  
3. 使用经理账号登录，确认显示经理菜单
4. 点击菜单项，确认页面正确切换
5. 点击退出按钮，确认返回登录页

### 视觉测试

1. 确认侧边栏宽度为280px
2. 确认顶部导航高度为64px
3. 确认选中菜单项背景色为#F5F5F5
4. 确认主按钮背景色为#1A1A1A

## 常见问题

### Q: 菜单图标不显示
A: 需要安装并导入 `@ant-design/icons`

### Q: 样式不生效
A: 检查是否正确引入 Ant Design 样式，确认CSS优先级

### Q: 路由切换后菜单高亮不正确
A: 使用 `location.pathname` 匹配菜单key，确保路径前缀匹配
