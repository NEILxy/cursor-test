import { apiClient } from './client'
import type { LoginRequest, LoginResponse, UserInfo } from '../types/auth'

export async function loginApi(params: LoginRequest): Promise<LoginResponse> {
  const response = await apiClient.post('/auth/login', params, { responseType: 'text' })
  const tokenText = response.data as unknown as string
  return { token: tokenText }
}

export async function getUserInfoApi(): Promise<UserInfo> {
  const response = await apiClient.get('/auth/me', { responseType: 'text' })
  const text = response.data as unknown as string
  const username = text.replace(/^Hello\s+/, '').trim()
  const role = username === 'admin' ? 'admin' : 'reviewer'
  return { username, role }
}

export async function testAuthApi(): Promise<string> {
  const response = await apiClient.get('/auth/test', { responseType: 'text' })
  return response.data as unknown as string
}


