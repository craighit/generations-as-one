/**
 * HTTP 客户端封装
 * 
 * 当前阶段（Phase 1）：未接入后端，使用 Mock 实现
 * 后续阶段（Phase 2）：切换为真实 API 调用，Store 无需改动
 */

import axios, { type AxiosInstance } from 'axios';
import type { ApiResponse } from '@shared/types';

const USE_MOCK = !import.meta.env.VITE_API_BASE_URL;

// 真实 API 客户端（后端就绪后启用）
const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 30000,
});

// 请求拦截器：附加认证 token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 响应拦截器：统一处理错误
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export { apiClient, USE_MOCK };

/**
 * 辅助函数：模拟网络延迟
 */
export function delay(ms: number = 300): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * 辅助函数：模拟 API 成功响应
 */
export function mockSuccess<T>(data: T): ApiResponse<T> {
  return { code: 0, message: 'success', data };
}
