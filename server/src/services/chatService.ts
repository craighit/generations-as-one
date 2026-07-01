// 对话业务逻辑 - 与家庭成员 AI 角色的对话编排 / 历史 / 洞察
import { getDefaultProvider, type ChatMessage } from '../ai/llm/provider.js';
import { logger } from '../utils/logger.js';
import type { ChatMessage as DomainChatMessage } from '@shared/types';

/**
 * 对话服务
 */
export class ChatService {
  /** 发送消息并获取 AI 回复 */
  async sendMessage(memberId: string, userMessage: string): Promise<DomainChatMessage | null> {
    logger.info(`发送消息 memberId=${memberId}`);
    const messages: ChatMessage[] = [
      { role: 'system', content: '你正在扮演一位家庭成员进行对话。' },
      { role: 'user', content: userMessage },
    ];
    try {
      const provider = getDefaultProvider();
      // TODO: 结合成员画像（profiles 表）构建上下文，并持久化消息
      await provider.chat(messages);
    } catch (err) {
      logger.error('对话调用失败:', err);
    }
    return null;
  }

  /** 获取对话历史 */
  async getHistory(memberId: string): Promise<DomainChatMessage[]> {
    logger.info(`查询对话历史 memberId=${memberId}`);
    return [];
  }

  /** 获取对话洞察 */
  async getInsight(memberId: string): Promise<unknown> {
    logger.info(`生成对话洞察 memberId=${memberId}`);
    return null;
  }
}

export default new ChatService();
