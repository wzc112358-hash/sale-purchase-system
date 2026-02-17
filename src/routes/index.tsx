import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth';
import type { UserRole } from '@/types/auth';
import React, { Suspense, lazy } from 'react';
import { Spin } from 'antd';

const TestPage = lazy(() => import('@/pages/TestPage').then(m => ({ default: m.TestPage })));
const Login = lazy(() => import('@/pages/Login').then(m => ({ default: m.Login })));

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

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Outlet />
    </Suspense>
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
        element: <TestPage />,
      },
      {
        path: '/sales',
        children: [
          {
            path: 'customers',
            element: <TestPage />,
          },
          {
            path: 'contracts',
            element: <TestPage />,
          },
          {
            path: 'shipments',
            element: <TestPage />,
          },
          {
            path: 'invoices',
            element: <TestPage />,
          },
          {
            path: 'receipts',
            element: <TestPage />,
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
