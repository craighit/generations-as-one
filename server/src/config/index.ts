// 配置文件 - 集中管理服务端配置与环境变量

/** 服务端口 */
export const PORT = Number(process.env.PORT) || 3001;

/** JWT 签名密钥 */
export const JWT_SECRET = process.env.JWT_SECRET || 'gao-dev-secret-change-me';

/** JWT 过期时间 */
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

/** PostgreSQL 连接配置 */
export const DB_CONFIG = {
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME || 'gao',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  max: Number(process.env.DB_POOL_MAX) || 20,
};

/** Redis 连接配置 */
export const REDIS_CONFIG = {
  host: process.env.REDIS_HOST || 'localhost',
  port: Number(process.env.REDIS_PORT) || 6379,
  password: process.env.REDIS_PASSWORD || undefined,
  db: Number(process.env.REDIS_DB) || 0,
};

/** Milvus 连接配置 */
export const MILVUS_CONFIG = {
  address: process.env.MILVUS_ADDRESS || 'localhost:19530',
  collection: process.env.MILVUS_COLLECTION || 'gao_memories',
};

/** 嵌入向量维度（需与 Milvus Collection schema 保持一致） */
export const EMBEDDING_DIMENSION = Number(process.env.EMBEDDING_DIMENSION) || 1536;

/** 大模型配置（通义千问 / DeepSeek 均提供 OpenAI 兼容接口） */
export const LLM_CONFIG = {
  // 默认 Provider 类型，对应 LLMProviderType
  defaultProvider: (process.env.LLM_PROVIDER || 'qwen') as 'qwen' | 'deepseek' | 'wenxin',
  // 通义千问（DashScope，OpenAI 兼容）
  qwen: {
    apiKey: process.env.QWEN_API_KEY || '',
    baseURL: process.env.QWEN_BASE_URL || 'https://dashscope.aliyuncs.com/compatible-mode/v1',
    model: process.env.QWEN_MODEL || 'qwen-plus',
  },
  // DeepSeek（OpenAI 兼容）
  deepseek: {
    apiKey: process.env.DEEPSEEK_API_KEY || '',
    baseURL: process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com/v1',
    model: process.env.DEEPSEEK_MODEL || 'deepseek-chat',
  },
  // 通用生成参数
  temperature: Number(process.env.LLM_TEMPERATURE) || 0.7,
  maxTokens: Number(process.env.LLM_MAX_TOKENS) || 2048,
};
