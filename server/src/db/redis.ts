// Redis 连接 - 使用 node-redis v4 客户端
// 当前阶段：实际连接逻辑暂未启用，待接入缓存后取消下方注释并移除占位导出
// import { createClient } from 'redis';
import type { RedisClientType } from 'redis';
import { REDIS_CONFIG } from '../config/index.js';
import { logger } from '../utils/logger.js';

// 实际连接逻辑暂未启用，待接入缓存后取消下方注释
// export const client: RedisClientType = createClient({
//   socket: { host: REDIS_CONFIG.host, port: REDIS_CONFIG.port },
//   password: REDIS_CONFIG.password,
// });
//
// client.on('error', (err) => {
//   logger.error('Redis 连接错误:', err);
// });
//
// client.connect().then(() => {
//   logger.info('Redis 连接成功');
// });

// 骨架阶段导出占位客户端（不发起实际连接），待接入缓存后替换为上方实现
export const client: RedisClientType | null = null;

export default client;
