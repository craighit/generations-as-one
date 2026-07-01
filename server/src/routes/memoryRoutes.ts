// 记忆路由 - 点滴记录的增删查 / AI 分析 / 语音 / 图片
import { Router } from 'express';
import type { ApiResponse } from '@shared/types';

const router = Router();

// 获取成员的记忆记录列表
router.get('/members/:id/memories', (req, res) => {
  const response: ApiResponse = { code: 0, message: 'success', data: [] };
  res.json(response);
});

// 创建成员的记忆记录
router.post('/members/:id/memories', (req, res) => {
  const response: ApiResponse = { code: 0, message: 'success', data: null };
  res.json(response);
});

// AI 分析指定记忆记录
router.post('/memories/:id/analyze', (req, res) => {
  const response: ApiResponse = { code: 0, message: 'success', data: null };
  res.json(response);
});

// 提交语音记忆
router.post('/memories/voice', (req, res) => {
  const response: ApiResponse = { code: 0, message: 'success', data: null };
  res.json(response);
});

// 提交图片记忆
router.post('/memories/photo', (req, res) => {
  const response: ApiResponse = { code: 0, message: 'success', data: null };
  res.json(response);
});

export default router;
