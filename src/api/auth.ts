import { apiClient } from './client';
import type { LoginRequest, LoginResponse, UserInfo } from '../types/auth';

export async function loginApi(params: LoginRequest): Promise<LoginResponse> {
  const response = await apiClient.post('/auth/login', params, { responseType: 'text' });
  // 后端返回纯文本token
  const tokenText = response.data as unknown as string;
  return { token: tokenText };
}

export async function getUserInfoApi(): Promise<UserInfo> {
  // 后端返回类似 "Hello admin" 的字符串
  const response = await apiClient.get('/auth/me', { responseType: 'text' });
  const text = response.data as unknown as string;
  // 从 "Hello xxx" 提取用户名，角色简单规则：admin -> admin，否则 reviewer
  const username = text.replace(/^Hello\s+/, '').trim();
  const role = username === 'admin' ? 'admin' : 'reviewer';
  return { username, role };
}

// 测试鉴权用的接口，验证 Authorization 头是否随请求发送
export async function testAuthApi(): Promise<string> {
  const response = await apiClient.get('/auth/test', { responseType: 'text' });
  return response.data as unknown as string;
}