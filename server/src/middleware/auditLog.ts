// 审计日志中间件 - 记录敏感写操作请求，便于安全审计与合规追溯
import type { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger.js';

/** 审计日志条目 */
interface AuditEntry {
  timestamp: string;
  method: string;
  path: string;
  userId?: string;
  ip: string;
  userAgent?: string;
  body?: unknown;
}

/**
 * 审计日志中间件工厂
 * @param options.captureBody 是否记录请求体（含敏感数据时谨慎开启）
 */
export function auditLogMiddleware(options: { captureBody?: boolean } = {}) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const entry: AuditEntry = {
      timestamp: new Date().toISOString(),
      method: req.method,
      path: req.originalUrl || req.url,
      userId: req.user?.userId,
      ip: req.ip || '',
      userAgent: req.get('user-agent'),
      body: options.captureBody ? req.body : undefined,
    };

    // 写操作（非 GET）记录审计日志
    if (req.method !== 'GET') {
      logger.audit(entry);
    }

    next();
  };
}

export default auditLogMiddleware;
