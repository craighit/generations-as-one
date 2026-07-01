// JWT 身份验证中间件 - 校验 Authorization 头中的 Bearer Token
import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/index.js';
import { logger } from '../utils/logger.js';

/** 解码后的认证用户信息 */
export interface AuthUser {
  userId: string;
  email: string;
  isParent: boolean;
}

// 扩展 Express Request 类型，注入当前登录用户
declare module 'express-serve-static-core' {
  interface Request {
    user?: AuthUser;
  }
}

/**
 * JWT 身份验证中间件
 * 从 Authorization: Bearer <token> 解析用户信息并注入 req.user
 */
export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ code: 401, message: '未提供认证令牌', data: null });
    return;
  }

  const token = authHeader.slice('Bearer '.length);
  try {
    const payload = jwt.verify(token, JWT_SECRET) as AuthUser;
    req.user = {
      userId: payload.userId,
      email: payload.email,
      isParent: payload.isParent,
    };
    next();
  } catch (err) {
    logger.warn('JWT 校验失败:', err);
    res.status(401).json({ code: 401, message: '认证令牌无效或已过期', data: null });
  }
}

export default authMiddleware;
