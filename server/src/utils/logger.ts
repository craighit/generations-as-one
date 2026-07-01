// 日志工具 - 基于控制台的简易日志器（生产环境建议替换为 winston / pino）
type LogLevel = 'debug' | 'info' | 'warn' | 'error';

/** 日志级别优先级 */
const LEVEL_PRIORITY: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

/** 当前日志级别 */
const currentLevel: LogLevel = (process.env.LOG_LEVEL as LogLevel) || 'info';

function shouldLog(level: LogLevel): boolean {
  return LEVEL_PRIORITY[level] >= LEVEL_PRIORITY[currentLevel];
}

function format(level: LogLevel, msg: string, meta?: unknown): string {
  const time = new Date().toISOString();
  const metaStr = meta !== undefined ? ' ' + JSON.stringify(meta) : '';
  return `[${time}] [${level.toUpperCase()}] ${msg}${metaStr}`;
}

/** 简易日志器 */
export const logger = {
  debug(msg: string, meta?: unknown): void {
    if (shouldLog('debug')) console.debug(format('debug', msg, meta));
  },
  info(msg: string, meta?: unknown): void {
    if (shouldLog('info')) console.log(format('info', msg, meta));
  },
  warn(msg: string, meta?: unknown): void {
    if (shouldLog('warn')) console.warn(format('warn', msg, meta));
  },
  error(msg: string, meta?: unknown): void {
    if (shouldLog('error')) console.error(format('error', msg, meta));
  },
  /** 审计日志（敏感操作记录） */
  audit(entry: unknown): void {
    console.log(format('info', '[审计]', entry));
  },
};

export default logger;
