// 路由注册入口 - 统一导入并挂载所有业务路由
import type { Application } from 'express';
import authRoutes from './authRoutes.js';
import familyRoutes from './familyRoutes.js';
import memoryRoutes from './memoryRoutes.js';
import chatRoutes from './chatRoutes.js';
import understandRoutes from './understandRoutes.js';
import expertRoutes from './expertRoutes.js';

/**
 * 注册所有业务路由
 * 统一挂载在 /api 前缀下，与前端 baseURL('/api') 对齐
 */
export function registerRoutes(app: Application): void {
  app.use('/api/auth', authRoutes);
  app.use('/api/family', familyRoutes);
  app.use('/api/memory', memoryRoutes);
  app.use('/api/chat', chatRoutes);
  app.use('/api/understand', understandRoutes);
  app.use('/api/expert', expertRoutes);
}
