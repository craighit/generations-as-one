// 理解工坊路由 - 角色互换 / 沟通预演 / 代际桥 / 冲突调解
import { Router } from 'express';
import type { ApiResponse } from '@shared/types';

const router = Router();

// 角色互换分析
router.post('/perspective', (req, res) => {
  const response: ApiResponse = { code: 0, message: 'success', data: null };
  res.json(response);
});

// 沟通预演模拟
router.post('/simulate', (req, res) => {
  const response: ApiResponse = { code: 0, message: 'success', data: null };
  res.json(response);
});

// 代际桥问答
router.post('/bridge', (req, res) => {
  const response: ApiResponse = { code: 0, message: 'success', data: null };
  res.json(response);
});

// 冲突调解
router.post('/conflict', (req, res) => {
  const response: ApiResponse = { code: 0, message: 'success', data: null };
  res.json(response);
});

export default router;
