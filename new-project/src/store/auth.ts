import { create } from 'zustand'

type AuthState = {
  isAuthenticated: boolean
  token: string | null
  login: (token?: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  token: null,
  login: (token) => set({ isAuthenticated: true, token: token ?? null }),
  logout: () => set({ isAuthenticated: false, token: null }),
}))


