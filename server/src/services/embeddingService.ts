// 向量嵌入服务 - 将文本转换为向量，供检索与索引使用
import { EMBEDDING_DIMENSION } from '../config/index.js';
import { logger } from '../utils/logger.js';

/**
 * 向量嵌入服务
 * TODO: 待接入嵌入模型（如 DashScope text-embedding）后实现真实向量化
 */
export class EmbeddingService {
  /**
   * 将文本转换为向量
   * @param text 待向量化的文本
   * @returns 与 EMBEDDING_DIMENSION 维度一致的向量
   */
  async embed(text: string): Promise<number[]> {
    logger.info(`生成嵌入向量 len=${text.length}`);
    // TODO: 接入真实嵌入模型
    // const provider = getDefaultProvider();
    // const vector = await provider.embed(text);
    // return vector;
    return new Array(EMBEDDING_DIMENSION).fill(0);
  }

  /** 批量生成嵌入向量 */
  async embedBatch(texts: string[]): Promise<number[][]> {
    logger.info(`批量生成嵌入向量 count=${texts.length}`);
    const vectors = await Promise.all(texts.map((t) => this.embed(t)));
    return vectors;
  }
}

export default new EmbeddingService();
