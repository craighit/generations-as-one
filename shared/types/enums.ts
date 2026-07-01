// 枚举常量 - 前后端共享

/** 数据可见性 */
export type DataVisibility = 'public' | 'semi-public' | 'private';

/** 点滴记录类型 */
export type MemoryType = 'voice' | 'chat' | 'event' | 'photo' | 'interview' | 'daily';

/** 对话角色 */
export type ChatRole = 'user' | 'ai';

/** 目标状态 */
export type GoalStatus = 'planning' | 'ongoing' | 'completed';

/** 时间线事件类型 */
export type TimelineEventType = 'memory' | 'photo' | 'event' | 'milestone';

/** 私密记录类型 */
export type PrivateEntryType = 'diary' | 'emotion' | 'real_thought';

/** 家庭关系 */
export type FamilyRelationship =
  | '爸爸'
  | '妈妈'
  | '爷爷'
  | '奶奶'
  | '外公'
  | '外婆'
  | '儿子'
  | '女儿'
  | '朋友'
  | '亲戚';

/** 专家专长 */
export type ExpertSpecialty =
  | '学习辅导'
  | '心理陪伴'
  | '家庭理财'
  | '婚姻咨询'
  | '亲子关系';

/** 大模型 Provider 类型 */
export type LLMProviderType = 'qwen' | 'deepseek' | 'wenxin';