// 洞察分析服务 - 基于记忆与对话生成周期性洞察报告
import { getDefaultProvider, type ChatMessage } from '../ai/llm/provider.js';
import { logger } from '../utils/logger.js';

/**
 * 洞察分析服务
 * 聚合成员的记忆与对话，生成情感 / 关系 / 成长洞察
 */
export class InsightService {
  /** 生成单成员洞察 */
  async generateMemberInsight(memberId: string): Promise<unknown> {
    logger.info(`生成成员洞察 memberId=${memberId}`);
    const messages: ChatMessage[] = [
      { role: 'system', content: '你是一个家庭关系洞察分析师。' },
      { role: 'user', content: `请为成员 ${memberId} 生成洞察报告。` },
    ];
    try {
      const provider = getDefaultProvider();
      // TODO: 检索成员近期记忆与对话作为上下文
      await provider.chat(messages);
    } catch (err) {
      logger.error('洞察生成失败:', err);
    }
    return null;
  }

  /** 生成家庭周度洞察 */
  async generateWeeklyInsight(familyId: string): Promise<unknown> {
    logger.info(`生成家庭周度洞察 familyId=${familyId}`);
    return null;
  }
}

export default new InsightService();
