// 家庭成员类型
export interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  ageGroup: string;
  avatar: string;
  similarity: number;
  createdAt: Date;
  lastInteraction: Date;
  description?: string;
}

// 点滴记录类型
export interface MemoryRecord {
  id: string;
  memberId: string;
  type: 'voice' | 'chat' | 'event' | 'photo' | 'interview' | 'daily';
  content: string;
  timestamp: Date;
  visibility: 'public' | 'semi-public' | 'private';
  tags: string[];
  title?: string;
}

// 对话消息类型
export interface ChatMessage {
  id: string;
  memberId: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

// 专家类型
export interface Expert {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  description: string;
}

// 用户类型
export interface User {
  id: string;
  name: string;
  avatar: string;
  isParent: boolean;
  childrenIds: string[];
}

// 家庭价值观
export interface FamilyValue {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  agreedBy: string[];
}

// 共同目标
export interface FamilyGoal {
  id: string;
  title: string;
  description: string;
  targetDate?: Date;
  status: 'planning' | 'ongoing' | 'completed';
  participants: string[];
}

// 时间线事件
export interface TimelineEvent {
  id: string;
  date: Date;
  title: string;
  description: string;
  type: 'memory' | 'photo' | 'event' | 'milestone';
  photoUrl?: string;
  participants: string[];
}