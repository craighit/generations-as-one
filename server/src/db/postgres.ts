// PostgreSQL 连接 - 使用 pg Pool 管理连接池
// 当前阶段：实际连接逻辑暂未启用，待接入数据库后取消下方注释并移除占位导出
import type { Pool } from 'pg';
import { DB_CONFIG } from '../config/index.js';
import { logger } from '../utils/logger.js';

// 实际连接逻辑暂未启用，待接入数据库后取消下方注释
// export const pool = new Pool(DB_CONFIG);
//
// pool.on('connect', () => {
//   logger.info('PostgreSQL 新连接已建立');
// });
//
// pool.on('error', (err) => {
//   logger.error('PostgreSQL 连接池错误:', err);
// });

// 骨架阶段导出占位连接池（不发起实际连接），待接入数据库后替换为上方实现
export const pool: Pool | null = null;

export default pool;
