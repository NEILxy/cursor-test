import { RouterProvider } from 'react-router-dom';
import router from './router';
import 'antd/dist/reset.css';
import './index.css';
import { useEffect } from 'react';
import { useAuthStore } from './store/auth';

function AppInitializer() {
  const { token, role, username, isFetchingUser, fetchUserInfo } = useAuthStore();

  useEffect(() => {
    // 仅当存在 token 且本地缺少用户信息时再请求 /me，避免重复调用
    if (token && (!role || !username) && !isFetchingUser) {
      fetchUserInfo().catch(() => {
        // 如果获取用户信息失败，token可能已过期，清除状态
        useAuthStore.getState().logout();
      });
    }
  }, [token, role, username, isFetchingUser, fetchUserInfo]);

  return <RouterProvider router={router} />;
}

export default function App() {
  return <AppInitializer />;
}
