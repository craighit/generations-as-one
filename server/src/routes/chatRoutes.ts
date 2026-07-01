// 对话路由 - 与家庭成员 AI 角色的对话 / 历史 / 洞察
import { Router } from 'express';
import type { ApiResponse } from '@shared/types';

const router = Router();

// 发送消息并获取 AI 回复
router.post('/:memberId', (req, res) => {
  const response: ApiResponse = { code: 0, message: 'success', data: null };
  res.json(response);
});

// 获取对话历史
router.get('/:memberId/history', (req, res) => {
  const response: ApiResponse = { code: 0, message: 'success', data: [] };
  res.json(response);
});

// 获取对话洞察
router.post('/:memberId/insight', (req, res) => {
  const response: ApiResponse = { code: 0, message: 'success', data: null };
  res.json(response);
});

export default router;
