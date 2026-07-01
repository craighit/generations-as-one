// 权限校验中间件 - 基于数据可见性 / 所有者 / 加密标记进行访问控制
import type { Request, Response, NextFunction } from 'express';
import type { AuthUser } from './auth.js';

/** 受保护资源的可见性上下文（与数据库表权限字段对齐） */
export interface VisibilityContext {
  /** 数据可见性：public / semi-public / private */
  visibility: 'public' | 'semi-public' | 'private';
  /** 显式授权可见的用户 ID 列表（对应 visible_to 字段） */
  visibleTo: string[];
  /** 数据所有者 ID（对应 owner_id 字段） */
  ownerId: string;
  /** 是否已加密（对应 encrypted 字段，私密内容需解密后才能访问） */
  encrypted: boolean;
}

/**
 * 判断当前用户是否可访问指定资源
 * - public：任何已登录用户可见
 * - semi-public：家庭成员可见（此处简化为登录即可见）
 * - private：仅所有者或显式授权用户可见
 */
export function canAccess(user: AuthUser, ctx: VisibilityContext): boolean {
  if (ctx.visibility === 'public') return true;
  if (ctx.visibility === 'semi-public') return true;
  if (ctx.ownerId === user.userId) return true;
  return ctx.visibleTo.includes(user.userId);
}

/**
 * 权限校验中间件工厂
 * 资源加载逻辑由具体路由负责，此处提供通用校验入口
 * @param loadContext 从请求中加载资源的可见性上下文
 */
export function permissionMiddleware(
  loadContext: (req: Request) => VisibilityContext | Promise<VisibilityContext>,
) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({ code: 401, message: '未认证用户', data: null });
        return;
      }
      const ctx = await loadContext(req);
      if (!canAccess(req.user, ctx)) {
        res.status(403).json({ code: 403, message: '无权访问该数据', data: null });
        return;
      }
      next();
    } catch (err) {
      res.status(500).json({ code: 500, message: '权限校验异常', data: null });
    }
  };
}

export default permissionMiddleware;
