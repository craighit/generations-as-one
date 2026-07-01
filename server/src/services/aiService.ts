// AI 引擎服务 - 封装大模型调用，提供角色互换等高级能力
import { getDefaultProvider, type ChatMessage } from '../ai/llm/provider.js';
import { logger } from '../utils/logger.js';
import type { PerspectiveAnalysis } from '@shared/types';

/**
 * AI 引擎服务
 * 统一编排大模型调用，封装提示词构建与结果解析
 */
export class AIService {
  /**
   * 生成角色互换分析
   * 基于场景生成「用户视角 / 成员视角 / AI 分析」三段式结果
   * TODO: 待接入大模型后实现真实生成逻辑
   */
  async generatePerspective(
    memberId: string,
    scenario: string,
  ): Promise<PerspectiveAnalysis> {
    const messages: ChatMessage[] = [
      {
        role: 'system',
        content: '你是一个家庭关系理解助手，请从双方视角分析矛盾并给出理解建议。',
      },
      {
        role: 'user',
        content: `场景：${scenario}\n请生成双方视角与理解建议。`,
      },
    ];

    try {
      const provider = getDefaultProvider();
      // TODO: 解析模型返回为结构化 PerspectiveAnalysis
      await provider.chat(messages);
    } catch (err) {
      logger.error('generatePerspective 调用失败:', err);
    }

    // 骨架占位返回
    return {
      userPerspective: { role: '你的视角', feeling: '', thought: '', behavior: '' },
      memberPerspective: { role: 'TA的视角', feeling: '', thought: '', behavior: '' },
      aiAnalysis: '',
      understandingPoint: '',
      communicationSuggestion: '',
    };
  }

  /**
   * 生成用户视角
   * 单独抽取用户在场景中的视角描述
   * TODO: 待接入大模型后实现真实生成逻辑
   */
  async generateUserPerspective(
    memberId: string,
    scenario: string,
  ): Promise<{ role: string; feeling: string; thought: string; behavior: string }> {
    const messages: ChatMessage[] = [
      {
        role: 'system',
        content: '请仅从用户视角描述其感受、想法与行为。',
      },
      {
        role: 'user',
        content: `场景：${scenario}`,
      },
    ];

    try {
      const provider = getDefaultProvider();
      await provider.chat(messages);
    } catch (err) {
      logger.error('generateUserPerspective 调用失败:', err);
    }

    return { role: '你的视角', feeling: '', thought: '', behavior: '' };
  }
}

export default new AIService();
