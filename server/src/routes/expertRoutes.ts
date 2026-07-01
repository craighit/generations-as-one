// 专家路由 - 专家列表 / 与专家对话
import { Router } from 'express';
import type { ApiResponse } from '@shared/types';

const router = Router();

// 获取专家列表
router.get('/', (req, res) => {
  const response: ApiResponse = { code: 0, message: 'success', data: [] };
  res.json(response);
});

// 与指定专家对话
router.post('/:id/chat', (req, res) => {
  const response: ApiResponse = { code: 0, message: 'success', data: null };
  res.json(response);
});

export default router;
