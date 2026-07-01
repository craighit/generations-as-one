// Express 应用入口 - 创建应用、挂载中间件、注册路由并启动监听
import express, { type Application, type Request, type Response, type NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { registerRoutes } from './routes/index.js';
import { logger } from './utils/logger.js';

// 加载环境变量
dotenv.config();

const app: Application = express();

// 配置跨域与 JSON 解析中间件
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// 注册业务路由（统一挂载在 /api 前缀下）
registerRoutes(app);

// 健康检查接口
app.get('/health', (_req: Request, res: Response) => {
  res.json({ code: 0, message: 'success', data: { status: 'ok' } });
});

// 全局错误处理中间件（必须放在所有路由之后）
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  logger.error('未处理的异常:', err);
  res.status(500).json({ code: 500, message: '服务器内部错误', data: null });
});

const PORT = Number(process.env.PORT) || 3001;

app.listen(PORT, () => {
  logger.info(`Generations As One 后端服务已启动，监听端口 ${PORT}`);
});

export { app };
