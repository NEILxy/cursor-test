import { create } from 'zustand'
import { loginApi, getUserInfoApi } from '../api/auth'
import type { UserRole } from '../types/auth'

type AuthState = {
  token: string | null
  role: UserRole | null
  username: string | null
  isAuthenticated: boolean
  isFetchingUser: boolean
  login: (params: { username: string; password: string }) => Promise<void>
  logout: () => void
  fetchUserInfo: () => Promise<void>
  initializeAuth: () => void
}

const getStoredToken = (): string | null => {
  try {
    return localStorage.getItem('auth_token')
  } catch {
    return null
  }
}

const setStoredToken = (token: string | null): void => {
  try {
    if (token) {
      localStorage.setItem('auth_token', token)
    } else {
      localStorage.removeItem('auth_token')
    }
  } catch {
    // ignore
  }
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: getStoredToken(),
  role: null,
  username: null,
  isAuthenticated: !!getStoredToken(),
  isFetchingUser: false,
  async login({ username, password }) {
    const { token } = await loginApi({ username, password })
    if (!token) throw new Error('登录响应缺少 token')
    setStoredToken(token)
    set({ token, isAuthenticated: true, isFetchingUser: true })
    try {
      await get().fetchUserInfo()
    } finally {
      set({ isFetchingUser: false })
    }
  },
  async fetchUserInfo() {
    const userInfo = await getUserInfoApi()
    set({ role: userInfo.role, username: userInfo.username })
  },
  logout() {
    setStoredToken(null)
    set({ token: null, role: null, username: null, isAuthenticated: false })
  },
  initializeAuth() {
    const token = getStoredToken()
    if (token) {
      set({ token, isAuthenticated: true })
      get().fetchUserInfo().catch(() => {
        setStoredToken(null)
        set({ token: null, role: null, username: null, isAuthenticated: false })
      })
    }
  },
}))


