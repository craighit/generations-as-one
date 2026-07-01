/**
 * 家庭空间服务
 */

import type { TimelineEvent, FamilyValue, FamilyGoal, TodayQuestion } from '@shared/types';
import {
  mockTimelineEvents,
  mockFamilyValues,
  mockFamilyGoals,
  mockTodayQuestion,
} from '@/data/mockData';
import { USE_MOCK, delay } from './client';

export const familySpaceService = {
  /** 获取时光走廊事件 */
  async getTimeline(): Promise<TimelineEvent[]> {
    if (USE_MOCK) {
      await delay(300);
      return mockTimelineEvents;
    }
    throw new Error('API not configured');
  },

  /** 获取家庭价值观 */
  async getValues(): Promise<FamilyValue[]> {
    if (USE_MOCK) {
      await delay(300);
      return mockFamilyValues;
    }
    throw new Error('API not configured');
  },

  /** 获取共同目标 */
  async getGoals(): Promise<FamilyGoal[]> {
    if (USE_MOCK) {
      await delay(300);
      return mockFamilyGoals;
    }
    throw new Error('API not configured');
  },

  /** 获取今日一问 */
  async getTodayQuestion(): Promise<TodayQuestion> {
    if (USE_MOCK) {
      await delay(200);
      return mockTodayQuestion;
    }
    throw new Error('API not configured');
  },
};
