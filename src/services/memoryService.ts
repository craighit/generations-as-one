/**
 * 点滴记录服务
 */

import type { MemoryRecord, CreateMemoryRequest } from '@shared/types';
import { mockMemoryRecords } from '@/data/mockData';
import { USE_MOCK, delay } from './client';

export const memoryService = {
  /** 获取成员的记忆记录 */
  async getMemories(memberId: string): Promise<MemoryRecord[]> {
    if (USE_MOCK) {
      await delay(300);
      return mockMemoryRecords.filter((m) => m.memberId === memberId);
    }
    throw new Error('API not configured');
  },

  /** 创建点滴记录 */
  async createMemory(req: CreateMemoryRequest): Promise<MemoryRecord> {
    if (USE_MOCK) {
      await delay(500);
      const record: MemoryRecord = {
        id: String(Date.now()),
        memberId: req.memberId,
        type: req.type,
        content: req.content,
        timestamp: new Date().toISOString(),
        visibility: req.visibility || 'public',
        tags: req.tags || [],
        title: req.title,
      };
      return record;
    }
    throw new Error('API not configured');
  },

  /** AI 分析记录内容 */
  async analyzeMemory(id: string): Promise<{ insight: string; tags: string[] }> {
    if (USE_MOCK) {
      await delay(1500);
      return {
        insight: '这条记录反映了深厚的家庭情感连接...',
        tags: ['关爱', '家庭'],
      };
    }
    throw new Error('API not configured');
  },
};
