// API 请求/响应类型 - 前后端共享

/** 统一 API 响应格式 */
export interface ApiResponse<T = unknown> {
  code: number;        // 0=成功, 非0=错误码
  message: string;     // 提示信息
  data: T;            // 业务数据
}

/** 分页响应格式 */
export interface PaginatedResponse<T> {
  code: number;
  message: string;
  data: {
    items: T[];
    total: number;
    page: number;
    pageSize: number;
  };
}

/** 分页请求参数 */
export interface PaginationParams {
  page?: number;
  pageSize?: number;
}

/** 登录请求 */
export interface LoginRequest {
  email: string;
  password: string;
}

/** 登录响应 */
export interface LoginResponse {
  token: string;
  user: import('./domain').User;
}

/** 注册请求 */
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  isParent?: boolean;
}

/** 创建家庭成员请求 */
export interface CreateFamilyMemberRequest {
  name: string;
  relationship: string;
  ageGroup: string;
  description?: string;
}

/** 创建点滴记录请求 */
export interface CreateMemoryRequest {
  memberId: string;
  type: import('./enums').MemoryType;
  content: string;
  visibility?: import('./enums').DataVisibility;
  tags?: string[];
  title?: string;
}

/** AI 对话请求 */
export interface ChatRequest {
  message: string;
  memberId: string;
}

/** 角色互换请求 */
export interface PerspectiveRequest {
  memberId: string;
  scenario: string;
}

/** 沟通模拟请求 */
export interface SimulateRequest {
  memberId: string;
  message: string;
}