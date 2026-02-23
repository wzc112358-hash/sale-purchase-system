import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth';
import type { UserRole } from '@/types/auth';
import React, { Suspense, lazy } from 'react';
import { Spin } from 'antd';
import { MainLayout } from '@/layouts/MainLayout';

const TestPage = lazy(() => import('@/pages/TestPage').then(m => ({ default: m.TestPage })));
const Login = lazy(() => import('@/pages/Login').then(m => ({ default: m.Login })));
const CustomerList = lazy(() => import('@/pages/sales/customers/CustomerList').then(m => ({ default: m.CustomerList })));
const CustomerDetail = lazy(() => import('@/pages/sales/customers/CustomerDetail').then(m => ({ default: m.CustomerDetail })));
const ContractList = lazy(() => import('@/pages/sales/contracts/ContractList').then(m => ({ default: m.ContractList })));
const ContractDetail = lazy(() => import('@/pages/sales/contracts/ContractDetail').then(m => ({ default: m.ContractDetail })));
const ShipmentList = lazy(() => import('@/pages/sales/shipments/ShipmentList').then(m => ({ default: m.ShipmentList })));
const ShipmentDetail = lazy(() => import('@/pages/sales/shipments/ShipmentDetail').then(m => ({ default: m.ShipmentDetail })));
const InvoiceList = lazy(() => import('@/pages/sales/invoices/InvoiceList').then(m => ({ default: m.InvoiceList })));
const InvoiceDetail = lazy(() => import('@/pages/sales/invoices/InvoiceDetail').then(m => ({ default: m.InvoiceDetail })));
const ReceiptList = lazy(() => import('@/pages/sales/receipts/ReceiptList').then(m => ({ default: m.ReceiptList })));
const ReceiptDetailPage = lazy(() => import('@/pages/sales/receipts/ReceiptDetailPage').then(m => ({ default: m.ReceiptDetailPage })));

// eslint-disable-next-line react-refresh/only-export-components
const LoadingFallback: React.FC = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
    <Spin size="large" />
  </div>
);

// eslint-disable-next-line react-refresh/only-export-components
const ProtectedRoute: React.FC<{ allowedRoles?: UserRole[] }> = ({ allowedRoles }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.type)) {
    return <Navigate to="/" replace />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <MainLayout user={user}>
      <Suspense fallback={<LoadingFallback />}>
        <Outlet />
      </Suspense>
    </MainLayout>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
const PublicRoute: React.FC = () => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Outlet />
    </Suspense>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
const RootRedirect: React.FC = () => {
  const { user } = useAuthStore();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  switch (user.type) {
    case 'sales':
      return <Navigate to="/sales/customers" replace />;
    case 'purchasing':
      return <Navigate to="/purchase/suppliers" replace />;
    case 'manager':
      return <Navigate to="/manager/dashboard" replace />;
    default:
      return <Navigate to="/login" replace />;
  }
};

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <PublicRoute />,
    children: [
      {
        index: true,
        element: <Login />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <RootRedirect />,
      },
      {
        path: '/sales',
        children: [
          {
            path: 'customers',
            element: <CustomerList />,
          },
          {
            path: 'customers/:id',
            element: <CustomerDetail />,
          },
          {
            path: 'contracts',
            element: <ContractList />,
          },
          {
            path: 'contracts/:id',
            element: <ContractDetail />,
          },
          {
            path: 'shipments',
            element: <ShipmentList />,
          },
          {
            path: 'shipments/:id',
            element: <ShipmentDetail />,
          },
          {
            path: 'invoices',
            element: <InvoiceList />,
          },
          {
            path: 'invoices/:id',
            element: <InvoiceDetail />,
          },
          {
            path: 'receipts',
            element: <ReceiptList />,
          },
          {
            path: 'receipts/:id',
            element: <ReceiptDetailPage />,
          },
          {
            path: 'progress',
            element: <TestPage />,
          },
        ],
      },
      {
        path: '/purchase',
        children: [
          {
            path: 'suppliers',
            element: <TestPage />,
          },
          {
            path: 'contracts',
            element: <TestPage />,
          },
          {
            path: 'arrivals',
            element: <TestPage />,
          },
          {
            path: 'invoices',
            element: <TestPage />,
          },
          {
            path: 'payments',
            element: <TestPage />,
          },
          {
            path: 'progress',
            element: <TestPage />,
          },
        ],
      },
      {
        path: '/manager',
        children: [
          {
            path: 'dashboard',
            element: <TestPage />,
          },
          {
            path: 'progress',
            element: <TestPage />,
          },
          {
            path: 'comparison',
            element: <TestPage />,
          },
          {
            path: 'reports',
            element: <TestPage />,
          },
          {
            path: 'history',
            element: <TestPage />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
