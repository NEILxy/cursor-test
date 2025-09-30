import { create } from 'zustand';
import { loginApi, getUserInfoApi } from '../api/auth';
import type { UserRole } from '../types/auth';

interface AuthState {
  token: string | null;
  role: UserRole | null;
  username: string | null;
  login: (params: { username: string; password: string }) => Promise<void>;
  logout: () => void;
  fetchUserInfo: () => Promise<void>;
  isFetchingUser: boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: null,
  role: null,
  username: null,
  isFetchingUser: false,
  async login({ username, password }): Promise<void> {
    try {
      const response = await loginApi({ username, password });
      const token = (response as any)?.token;
      if (!token) {
        throw new Error('登录响应缺少 token');
      }
      // 标记开始获取用户信息，先保存 token，避免初始化重复拉取
      set({ token, isFetchingUser: true });
      await get().fetchUserInfo();
      set({ isFetchingUser: false });
    } catch (error) {
      set({ isFetchingUser: false });
      console.error('Login failed:', error);
      throw error;
    }
  },
  async fetchUserInfo(): Promise<void> {
    try {
      const userInfo = await getUserInfoApi();
      set({ 
        role: userInfo.role, 
        username: userInfo.username 
      });
    } catch (error) {
      console.error('Failed to fetch user info:', error);
      // 如果获取用户信息失败，清除token
      set({ token: null, role: null, username: null });
      throw error;
    }
  },
  logout() {
    set({ token: null, role: null, username: null });
  },
}));


