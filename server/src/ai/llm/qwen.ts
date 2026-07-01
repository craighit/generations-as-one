// 通义千问 Provider 实现 - 通过 DashScope 的 OpenAI 兼容接口调用
import OpenAI from 'openai';
import { LLM_CONFIG } from '../../config/index.js';
import { logger } from '../../utils/logger.js';
import type { ChatMessage, ChatOptions, LLMProvider } from './provider.js';

export class QwenProvider implements LLMProvider {
  readonly type = 'qwen' as const;
  private client: OpenAI;

  constructor() {
    const { apiKey, baseURL } = LLM_CONFIG.qwen;
    // 实际接入时需配置 QWEN_API_KEY
    this.client = new OpenAI({ apiKey, baseURL });
  }

  async chat(messages: ChatMessage[], options: ChatOptions = {}): Promise<string> {
    try {
      const completion = await this.client.chat.completions.create({
        model: options.model || LLM_CONFIG.qwen.model,
        messages,
        temperature: options.temperature ?? LLM_CONFIG.temperature,
        max_tokens: options.maxTokens ?? LLM_CONFIG.maxTokens,
      });
      return completion.choices[0]?.message?.content ?? '';
    } catch (err) {
      logger.error('通义千问调用失败:', err);
      throw err;
    }
  }
}

export default QwenProvider;
