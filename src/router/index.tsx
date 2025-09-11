import { createBrowserRouter, Navigate } from 'react-router-dom';
import type { ReactElement } from 'react';
import AppLayout from '../components/Layout/AppLayout';
import LoginPage from '../pages/login';
import DashboardPage from '../pages/dashboard';
import ReviewQueuePage from '../pages/review/queue.tsx';
import ReviewDetailPage from '../pages/review/detail.tsx';
import ReviewHistoryPage from '../pages/review/history.tsx';
import { useAuthStore } from '../store/auth';

function RequireAuth({ children, roles }: { children: ReactElement; roles?: Array<'reviewer' | 'admin'> }) {
  const { token, role } = useAuthStore();
  if (!token) return <Navigate to="/login" replace />;
  if (roles && role && !roles.includes(role)) return <Navigate to="/" replace />;
  return children;
}

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: (
      <RequireAuth>
        <AppLayout />
      </RequireAuth>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      {
        path: 'review',
        children: [
          { index: true, element: <Navigate to="queue" replace /> },
          { path: 'queue', element: <ReviewQueuePage /> },
          { path: 'detail/:id', element: <ReviewDetailPage /> },
          { path: 'history', element: <ReviewHistoryPage /> },
        ],
      },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
]);

export default router;


