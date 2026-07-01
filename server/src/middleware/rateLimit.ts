// 频率限制中间件 - 基于内存计数器的简易限流（生产环境建议替换为 Redis 实现）
import type { Request, Response, NextFunction } from 'express';

interface RateLimitOptions {
  /** 时间窗口（毫秒） */
  windowMs: number;
  /** 时间窗口内最大请求数 */
  max: number;
  /** 限流 key 生成器，默认按 IP */
  keyGenerator?: (req: Request) => string;
}

interface Bucket {
  count: number;
  resetAt: number;
}

/**
 * 简易频率限制中间件
 * 使用进程内存计数，按 key（默认 IP）在时间窗口内限制请求次数
 */
export function rateLimitMiddleware(options: RateLimitOptions) {
  const { windowMs, max, keyGenerator } = options;
  const buckets = new Map<string, Bucket>();

  return (req: Request, res: Response, next: NextFunction): void => {
    const key = keyGenerator ? keyGenerator(req) : req.ip || 'anonymous';
    const now = Date.now();
    const bucket = buckets.get(key);

    // 窗口已过期或首次访问，重置计数
    if (!bucket || now > bucket.resetAt) {
      buckets.set(key, { count: 1, resetAt: now + windowMs });
      next();
      return;
    }

    bucket.count += 1;
    if (bucket.count > max) {
      res.status(429).json({
        code: 429,
        message: '请求过于频繁，请稍后再试',
        data: null,
      });
      return;
    }

    next();
  };
}

export default rateLimitMiddleware;
