// 向量索引骨架 - 将记忆记录向量化并写入 Milvus
import { client as milvusClient } from '../../db/milvus.js';
import { MILVUS_CONFIG, EMBEDDING_DIMENSION } from '../../config/index.js';
import { logger } from '../../utils/logger.js';

/** 索引文档项 */
export interface IndexDocument {
  id: string;
  vector: number[];
  payload: Record<string, unknown>;
}

/**
 * 向量索引器
 * 负责将记忆记录的向量写入 Milvus Collection
 */
export class Indexer {
  /**
   * 批量写入向量
   * TODO: 待 Milvus 接入后实现真实写入逻辑
   */
  async upsert(documents: IndexDocument[]): Promise<void> {
    if (documents.length === 0) {
      return;
    }

    // 校验向量维度
    for (const doc of documents) {
      if (doc.vector.length !== EMBEDDING_DIMENSION) {
        logger.warn(`文档 ${doc.id} 向量维度不匹配: 期望 ${EMBEDDING_DIMENSION}, 实际 ${doc.vector.length}`);
      }
    }

    if (!milvusClient) {
      logger.warn('Milvus 客户端未初始化，跳过索引写入');
      return;
    }

    // TODO: 待接入 Milvus 后实现真实写入
    // await milvusClient.insert({
    //   collection_name: MILVUS_CONFIG.collection,
    //   fields_data: documents.map((d) => ({ id: d.id, vector: d.vector, ...d.payload })),
    // });

    logger.info(`已索引 ${documents.length} 条记录（骨架占位）`);
  }

  /**
   * 删除指定 ID 的向量
   * TODO: 待 Milvus 接入后实现真实删除逻辑
   */
  async delete(ids: string[]): Promise<void> {
    if (ids.length === 0 || !milvusClient) {
      return;
    }

    // TODO: 待接入 Milvus 后实现真实删除
    // await milvusClient.deleteEntities({ collection_name: MILVUS_CONFIG.collection, expr: `id in [${ids.join(',')}]` });

    logger.info(`已删除 ${ids.length} 条记录（骨架占位）`);
  }
}

export default Indexer;
