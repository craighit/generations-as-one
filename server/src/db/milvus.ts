// Milvus 向量数据库连接
// 当前阶段：实际连接逻辑暂未启用，待接入向量库后取消下方注释并移除占位导出
import type { MilvusClient } from '@zilliz/milvus2-sdk-node';
import { MILVUS_CONFIG } from '../config/index.js';
import { logger } from '../utils/logger.js';

// 实际连接逻辑暂未启用，待接入向量库后取消下方注释
// export const client = new MilvusClient({ address: MILVUS_CONFIG.address });
// logger.info(`Milvus 客户端已创建，地址: ${MILVUS_CONFIG.address}`);

// 骨架阶段导出占位客户端（不发起实际连接），待接入向量库后替换为上方实现
export const client: MilvusClient | null = null;

export default client;
