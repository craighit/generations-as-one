// 前端专属类型
// 领域模型类型已迁移至 @shared/types，供前后端共享
// 此文件保留前端专属的类型补充

// 重新导出共享类型，保持现有 @/types 引用兼容
export type {
  FamilyMember,
  MemoryRecord,
  ChatMessage,
  Expert,
  User,
  Family,
  FamilyValue,
  FamilyGoal,
  TimelineEvent,
  TodayQuestion,
  Profile,
  PrivateEntry,
  PerspectiveAnalysis,
  PerspectiveView,
} from '@shared/types';

export type {
  DataVisibility,
  MemoryType,
  ChatRole,
  GoalStatus,
  TimelineEventType,
  PrivateEntryType,
  FamilyRelationship,
  ExpertSpecialty,
} from '@shared/types';

export type {
  ApiResponse,
  PaginatedResponse,
  PaginationParams,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  CreateFamilyMemberRequest,
  CreateMemoryRequest,
  ChatRequest,
  PerspectiveRequest,
  SimulateRequest,
} from '@shared/types';
