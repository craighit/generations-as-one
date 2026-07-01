// 认证路由 - 注册 / 登录
import { Router } from 'express';
import type { ApiResponse } from '@shared/types';

const router = Router();

// 用户注册
router.post('/register', (req, res) => {
  const response: ApiResponse = { code: 0, message: 'success', data: null };
  res.json(response);
});

// 用户登录
router.post('/login', (req, res) => {
  const response: ApiResponse = { code: 0, message: 'success', data: null };
  res.json(response);
});

export default router;
