/**
 * 专家顾问服务
 */

import type { Expert } from '@shared/types';
import { mockExperts } from '@/data/mockData';
import { USE_MOCK, delay } from './client';

export const expertService = {
  /** 获取专家列表 */
  async getExperts(): Promise<Expert[]> {
    if (USE_MOCK) {
      await delay(300);
      return mockExperts;
    }
    throw new Error('API not configured');
  },

  /** 与专家对话 */
  async chatWithExpert(expertId: string, message: string): Promise<string> {
    if (USE_MOCK) {
      await delay(800);
      return '你好，我是专家顾问。根据你的描述，我建议...';
    }
    throw new Error('API not configured');
  },
};
