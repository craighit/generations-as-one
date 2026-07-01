/**
 * 家庭成员服务
 * 
 * 当前使用 Mock 实现，后端就绪后切换为 API 调用
 */

import type { FamilyMember, CreateFamilyMemberRequest } from '@shared/types';
import { mockFamilyMembers } from '@/data/mockData';
import { USE_MOCK, delay } from './client';

// API 实现（后端就绪后启用）
// import { apiClient } from './client';

export const familyService = {
  /** 获取家庭成员列表 */
  async getMembers(): Promise<FamilyMember[]> {
    if (USE_MOCK) {
      await delay(300);
      return mockFamilyMembers;
    }
    // 后端实现：
    // const res = await apiClient.get<ApiResponse<FamilyMember[]>>('/family/members');
    // return res.data;
    throw new Error('API not configured');
  },

  /** 获取家庭成员详情 */
  async getMember(id: string): Promise<FamilyMember> {
    if (USE_MOCK) {
      await delay(200);
      const member = mockFamilyMembers.find((m) => m.id === id);
      if (!member) throw new Error('成员不存在');
      return member;
    }
    throw new Error('API not configured');
  },

  /** 创建家庭成员 */
  async addMember(req: CreateFamilyMemberRequest): Promise<FamilyMember> {
    if (USE_MOCK) {
      await delay(500);
      const newMember: FamilyMember = {
        id: String(Date.now()),
        ...req,
        avatar: `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=a warm portrait of ${req.name}, ${req.ageGroup}, Chinese, gentle expression&image_size=square_hd`,
        similarity: 0,
        createdAt: new Date().toISOString(),
        lastInteraction: new Date().toISOString(),
      };
      return newMember;
    }
    throw new Error('API not configured');
  },

  /** 重新计算相似度 */
  async recalculateSimilarity(id: string): Promise<number> {
    if (USE_MOCK) {
      await delay(1000);
      return Math.floor(Math.random() * 30 + 70);
    }
    throw new Error('API not configured');
  },
};
