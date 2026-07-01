// 家庭路由 - 成员管理 / 关系树 / 时间线 / 价值观 / 目标
import { Router } from 'express';
import type { ApiResponse } from '@shared/types';

const router = Router();

// 获取家庭成员列表
router.get('/members', (req, res) => {
  const response: ApiResponse = { code: 0, message: 'success', data: [] };
  res.json(response);
});

// 创建家庭成员
router.post('/members', (req, res) => {
  const response: ApiResponse = { code: 0, message: 'success', data: null };
  res.json(response);
});

// 获取家庭成员详情
router.get('/members/:id', (req, res) => {
  const response: ApiResponse = { code: 0, message: 'success', data: null };
  res.json(response);
});

// 更新家庭成员信息
router.put('/members/:id', (req, res) => {
  const response: ApiResponse = { code: 0, message: 'success', data: null };
  res.json(response);
});

// 重新计算成员相似度
router.post('/members/:id/recalculate', (req, res) => {
  const response: ApiResponse = { code: 0, message: 'success', data: null };
  res.json(response);
});

// 获取家庭关系树
router.get('/tree', (req, res) => {
  const response: ApiResponse = { code: 0, message: 'success', data: null };
  res.json(response);
});

// 获取家庭时间线
router.get('/timeline', (req, res) => {
  const response: ApiResponse = { code: 0, message: 'success', data: [] };
  res.json(response);
});

// 获取家庭价值观
router.get('/values', (req, res) => {
  const response: ApiResponse = { code: 0, message: 'success', data: [] };
  res.json(response);
});

// 获取家庭共同目标
router.get('/goals', (req, res) => {
  const response: ApiResponse = { code: 0, message: 'success', data: [] };
  res.json(response);
});

export default router;
