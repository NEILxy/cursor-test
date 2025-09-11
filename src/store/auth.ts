import { create } from 'zustand';

export type UserRole = 'reviewer' | 'admin';

interface AuthState {
  token: string | null;
  role: UserRole | null;
  username: string | null;
  login: (params: { username: string; password: string }) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  role: null,
  username: null,
  async login({ username }): Promise<void> {
    // mock 登录：根据用户名决定角色
    await new Promise((r) => setTimeout(r, 500));
    const role: UserRole = username === 'admin' ? 'admin' : 'reviewer';
    const token = 'mock-token-' + Date.now();
    set({ token, role, username });
  },
  logout() {
    set({ token: null, role: null, username: null });
  },
}));


