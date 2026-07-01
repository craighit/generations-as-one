// 家庭成员业务逻辑 - 成员增删改查 / 相似度计算 / 关系树
import { pool } from '../db/postgres.js';
import { logger } from '../utils/logger.js';
import type { FamilyMember } from '@shared/types';

/**
 * 家庭成员服务
 */
export class FamilyService {
  /** 获取家庭成员列表 */
  async listMembers(familyId: string): Promise<FamilyMember[]> {
    // TODO: 接入数据库后实现真实查询
    // const { rows } = await pool!.query('SELECT * FROM family_members WHERE family_id = $1', [familyId]);
    logger.info(`查询家庭成员列表 familyId=${familyId}`);
    return [];
  }

  /** 获取成员详情 */
  async getMember(id: string): Promise<FamilyMember | null> {
    logger.info(`查询家庭成员 id=${id}`);
    return null;
  }

  /** 创建家庭成员 */
  async createMember(input: {
    name: string;
    relationship: string;
    ageGroup: string;
    description?: string;
  }): Promise<FamilyMember | null> {
    logger.info(`创建家庭成员 name=${input.name}`);
    return null;
  }

  /** 更新家庭成员 */
  async updateMember(id: string, input: Partial<FamilyMember>): Promise<FamilyMember | null> {
    logger.info(`更新家庭成员 id=${id}`);
    return null;
  }

  /** 重新计算相似度 */
  async recalculateSimilarity(id: string): Promise<number> {
    logger.info(`重新计算相似度 id=${id}`);
    return 0;
  }

  /** 获取家庭关系树 */
  async getFamilyTree(familyId: string): Promise<unknown> {
    logger.info(`查询家庭关系树 familyId=${familyId}`);
    return null;
  }
}

export default new FamilyService();
