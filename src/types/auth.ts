export type UserRole = 'reviewer' | 'admin';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface UserInfo {
  username: string;
  role: UserRole;
}

export interface AuthError {
  message: string;
  code?: string;
}
