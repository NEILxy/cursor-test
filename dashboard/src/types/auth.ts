export type UserRole = 'admin' | 'reviewer'

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  token: string
}

export interface UserInfo {
  username: string
  role: UserRole
}


