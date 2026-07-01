/**
 * 理解工坊服务
 */

import type { PerspectiveAnalysis, PerspectiveRequest } from '@shared/types';
import { USE_MOCK, delay } from './client';

export const understandService = {
  /** 角色互换分析 */
  async analyzePerspective(req: PerspectiveRequest): Promise<PerspectiveAnalysis> {
    if (USE_MOCK) {
      await delay(1200);
      return {
        userPerspective: {
          role: '你的视角',
          feeling: '被催促、被控制、不被理解',
          thought: '我的人生我做主',
          behavior: '敷衍、转移话题',
        },
        memberPerspective: {
          role: 'TA的视角',
          feeling: '焦虑、担心、怕你孤单',
          thought: '希望你安定、幸福',
          behavior: '反复提醒、托人介绍',
        },
        aiAnalysis: '核心矛盾：你的「自主需求」vs TA的「安全需求」',
        understandingPoint: 'TA的关心本质是爱与担心，不是控制',
        communicationSuggestion: '先共情TA的担心，再讲你的规划',
      };
    }
    throw new Error('API not configured');
  },

  /** 沟通模拟 */
  async simulateCommunication(memberId: string, message: string): Promise<{
    reply: string;
    analysis: string;
  }> {
    if (USE_MOCK) {
      await delay(800);
      return {
        reply: '你说得对，但我也是为了你好...',
        analysis: '沟通效果一般，建议先表达理解再陈述自己的立场',
      };
    }
    throw new Error('API not configured');
  },
};
