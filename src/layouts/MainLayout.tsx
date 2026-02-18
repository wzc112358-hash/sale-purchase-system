import React, { useState, useEffect } from 'react';
import { Layout, Menu, Drawer } from 'antd';
import type { MenuProps } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  TeamOutlined,
  FileTextOutlined,
  CarOutlined,
  FileDoneOutlined,
  DollarOutlined,
  LineChartOutlined,
  InboxOutlined,
  BankOutlined,
  DashboardOutlined,
  SwapOutlined,
  BarChartOutlined,
  HistoryOutlined,
} from '@ant-design/icons';
import { TopNav } from './TopNav';
import type { UserRole } from '@/types/layout';
import type { User } from '@/types/auth';

const { Sider, Content } = Layout;

interface MenuConfig {
  key: string;
  label: string;
  icon: React.ReactNode;
  path: string;
}

const MENU_CONFIG: Record<UserRole, MenuConfig[]> = {
  sales: [
    { key: 'customers', label: '客户管理', icon: <TeamOutlined />, path: '/sales/customers' },
    { key: 'contracts', label: '销售合同', icon: <FileTextOutlined />, path: '/sales/contracts' },
    { key: 'shipments', label: '发货', icon: <CarOutlined />, path: '/sales/shipments' },
    { key: 'invoices', label: '发票', icon: <FileDoneOutlined />, path: '/sales/invoices' },
    { key: 'receipts', label: '收款', icon: <DollarOutlined />, path: '/sales/receipts' },
    { key: 'progress', label: '进度跟踪', icon: <LineChartOutlined />, path: '/sales/progress' },
  ],
  purchasing: [
    { key: 'suppliers', label: '供应商管理', icon: <TeamOutlined />, path: '/purchase/suppliers' },
    { key: 'contracts', label: '采购合同', icon: <FileTextOutlined />, path: '/purchase/contracts' },
    { key: 'arrivals', label: '到货', icon: <InboxOutlined />, path: '/purchase/arrivals' },
    { key: 'invoices', label: '收票', icon: <FileDoneOutlined />, path: '/purchase/invoices' },
    { key: 'payments', label: '付款', icon: <BankOutlined />, path: '/purchase/payments' },
    { key: 'progress', label: '进度跟踪', icon: <LineChartOutlined />, path: '/purchase/progress' },
  ],
  manager: [
    { key: 'dashboard', label: '总览', icon: <DashboardOutlined />, path: '/manager/dashboard' },
    { key: 'progress', label: '进度跟踪', icon: <LineChartOutlined />, path: '/manager/progress' },
    { key: 'comparison', label: '关联对比', icon: <SwapOutlined />, path: '/manager/comparison' },
    { key: 'reports', label: '数据报表', icon: <BarChartOutlined />, path: '/manager/reports' },
    { key: 'history', label: '历史记录', icon: <HistoryOutlined />, path: '/manager/history' },
  ],
};

interface MainLayoutProps {
  user: User;
  children?: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ user, children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = MENU_CONFIG[user.type] || [];

  const findSelectedKey = (): string => {
    const currentPath = location.pathname;
    for (const item of menuItems) {
      if (currentPath.startsWith(item.path)) {
        return item.key;
      }
    }
    return menuItems[0]?.key || '';
  };

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    const item = menuItems.find((m) => m.key === key);
    if (item) {
      navigate(item.path);
      if (isMobile) {
        setSidebarVisible(false);
      }
    }
  };

  const renderMenu = () => (
    <Menu
      mode="inline"
      selectedKeys={[findSelectedKey()]}
      style={{ borderRight: 0, background: 'transparent' }}
      items={menuItems.map((item) => ({
        key: item.key,
        label: item.label,
        icon: item.icon,
      }))}
      onClick={handleMenuClick}
    />
  );

  const renderSidebar = () => (
    <>
      {isMobile ? (
        <Drawer
          placement="left"
          onClose={() => setSidebarVisible(false)}
          open={sidebarVisible}
          width={280}
          styles={{ body: { padding: 0 } }}
        >
          <div
            style={{
              height: 64,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderBottom: '1px solid #f0f0f0',
            }}
          >
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600, color: '#333' }}>
              采购销售系统
            </h2>
          </div>
          {renderMenu()}
        </Drawer>
      ) : (
        <Sider
          width={280}
          style={{
            background: '#fff',
            borderRight: '1px solid #f0f0f0',
          }}
        >
          <div
            style={{
              height: 64,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderBottom: '1px solid #f0f0f0',
            }}
          >
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600, color: '#333' }}>
              采购销售系统
            </h2>
          </div>
          {renderMenu()}
        </Sider>
      )}
    </>
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {renderSidebar()}
      <Layout>
        <TopNav
          user={user}
          onMenuToggle={isMobile ? () => setSidebarVisible(true) : undefined}
        />
        <Content
          style={{
            margin: isMobile ? 16 : 24,
            padding: isMobile ? 16 : 24,
            background: '#fff',
            borderRadius: 8,
            minHeight: 280,
          }}
        >
          {children || <Outlet />}
        </Content>
      </Layout>
    </Layout>
  );
};
