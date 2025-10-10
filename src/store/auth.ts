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
  initializeAuth: () => void;
}

// 从 localStorage 获取 token
const getStoredToken = (): string | null => {
  try {
    return localStorage.getItem('auth_token');
  } catch {
    return null;
  }
};

// 保存 token 到 localStorage
const setStoredToken = (token: string | null): void => {
  try {
    if (token) {
      localStorage.setItem('auth_token', token);
    } else {
      localStorage.removeItem('auth_token');
    }
  } catch {
    // 忽略 localStorage 错误
  }
};

export const useAuthStore = create<AuthState>((set, get) => ({
  token: getStoredToken(),
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
      // 保存 token 到 localStorage
      setStoredToken(token);
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
      setStoredToken(null);
      set({ token: null, role: null, username: null });
      throw error;
    }
  },
  logout() {
    setStoredToken(null);
    set({ token: null, role: null, username: null });
  },
  initializeAuth() {
    // 支持从 URL ?token=... 注入（来自 5174 的单点登录）
    try {
      const params = new URLSearchParams(window.location.search);
      const urlToken = params.get('token');
      if (urlToken) {
        setStoredToken(urlToken);
        set({ token: urlToken });
        const cleanUrl = window.location.origin + window.location.pathname + window.location.hash;
        window.history.replaceState({}, document.title, cleanUrl);
      }
    } catch {}

    const token = getStoredToken();
    if (token) {
      set({ token });
      // 如果有 token，尝试获取用户信息
      get().fetchUserInfo().catch(() => {
        // 如果获取用户信息失败，清除无效的 token
        setStoredToken(null);
        set({ token: null, role: null, username: null });
      });
    }
  },
}));


