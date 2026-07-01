/**
 * AI 对话服务
 */

import type { ChatMessage, ChatRequest } from '@shared/types';
import { USE_MOCK, delay } from './client';

export const chatService = {
  /** 发送消息并获取 AI 回复 */
  async sendMessage(req: ChatRequest): Promise<ChatMessage> {
    if (USE_MOCK) {
      await delay(800);
      return {
        id: String(Date.now()),
        memberId: req.memberId,
        role: 'ai',
        content: '我理解你的感受。作为家人，我希望能支持你...',
        timestamp: new Date().toISOString(),
        sender: '家人',
      };
    }
    throw new Error('API not configured');
  },

  /** 获取对话历史 */
  async getHistory(memberId: string): Promise<ChatMessage[]> {
    if (USE_MOCK) {
      await delay(300);
      return [];
    }
    throw new Error('API not configured');
  },
};
