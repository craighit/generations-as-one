// 领域模型类型定义 - 前后端共享
import type {
  DataVisibility,
  MemoryType,
  ChatRole,
  GoalStatus,
  TimelineEventType,
  PrivateEntryType,
} from './enums';

/** 家庭成员 */
export interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  ageGroup: string;
  avatar: string;
  similarity: number;
  createdAt: string;
  lastInteraction: string;
  description?: string;
  /** 数据可见性 */
  visibility?: DataVisibility;
}

/** 点滴记录 */
export interface MemoryRecord {
  id: string;
  memberId: string;
  type: MemoryType;
  content: string;
  timestamp: string;
  visibility: DataVisibility;
  tags: string[];
  title?: string;
}

/** 对话消息 */
export interface ChatMessage {
  id: string;
  memberId: string;
  role: ChatRole;
  content: string;
  timestamp: string;
  /** 发送者名称（AI角色模拟时使用） */
  sender?: string;
}

/** 专家 */
export interface Expert {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  description: string;
}

/** 用户 */
export interface User {
  id: string;
  name: string;
  avatar: string;
  email: string;
  isParent: boolean;
  childrenIds: string[];
}

/** 家庭 */
export interface Family {
  id: string;
  name: string;
  createdAt: string;
}

/** 家庭价值观 */
export interface FamilyValue {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  agreedBy: string[];
}

/** 共同目标 */
export interface FamilyGoal {
  id: string;
  title: string;
  description: string;
  targetDate?: string;
  status: GoalStatus;
  participants: string[];
}

/** 时间线事件 */
export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  type: TimelineEventType;
  photoUrl?: string;
  participants: string[];
}

/** 今日一问 */
export interface TodayQuestion {
  id: string;
  question: string;
  date: string;
}

/** AI 画像 */
export interface Profile {
  id: string;
  memberId: string;
  coreProfile: Record<string, unknown>;
  factualMemory: Record<string, unknown>;
  emotionalMemory: Record<string, unknown>;
  interactionMemory: Record<string, unknown>;
  growthMemory: Record<string, unknown>;
  updatedAt: string;
}

/** 私密记录 */
export interface PrivateEntry {
  id: string;
  userId: string;
  type: PrivateEntryType;
  content: string;
  createdAt: string;
}

/** 角色互换分析结果 */
export interface PerspectiveAnalysis {
  userPerspective: PerspectiveView;
  memberPerspective: PerspectiveView;
  aiAnalysis: string;
  understandingPoint: string;
  communicationSuggestion: string;
}

/** 视角视图 */
export interface PerspectiveView {
  role: string;
  feeling: string;
  thought: string;
  behavior: string;
}
