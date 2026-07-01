// 向量检索骨架 - 基于成员画像与记忆记录做语义召回
import { client as milvusClient } from '../../db/milvus.js';
import { MILVUS_CONFIG, EMBEDDING_DIMENSION } from '../../config/index.js';
import { logger } from '../../utils/logger.js';

/** 检索结果项 */
export interface RetrievalResult {
  id: string;
  score: number;
  payload: Record<string, unknown>;
}

/** 检索参数 */
export interface RetrieveParams {
  /** 查询向量 */
  vector: number[];
  /** 返回数量 */
  topK?: number;
  /** 过滤表达式（Milvus 语法） */
  filter?: string;
}

/**
 * 向量检索器
 * 在 Milvus 中检索与查询向量最相似的记忆记录
 */
export class Retriever {
  /**
   * 执行向量检索
   * TODO: 待 Milvus 接入后实现真实召回逻辑
   */
  async search(params: RetrieveParams): Promise<RetrievalResult[]> {
    const { vector, topK = 5 } = params;

    // 校验向量维度
    if (vector.length !== EMBEDDING_DIMENSION) {
      logger.warn(`向量维度不匹配: 期望 ${EMBEDDING_DIMENSION}, 实际 ${vector.length}`);
    }

    if (!milvusClient) {
      logger.warn('Milvus 客户端未初始化，返回空结果');
      return [];
    }

    // TODO: 待接入 Milvus 后实现真实检索
    // const results = await milvusClient.search({
    //   collection_name: MILVUS_CONFIG.collection,
    //   vector,
    //   topk: topK,
    //   filter: params.filter,
    // });

    return [];
  }
}

export default Retriever;
