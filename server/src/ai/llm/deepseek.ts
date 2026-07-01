// DeepSeek Provider 实现 - 通过 DeepSeek 的 OpenAI 兼容接口调用
import OpenAI from 'openai';
import { LLM_CONFIG } from '../../config/index.js';
import { logger } from '../../utils/logger.js';
import type { ChatMessage, ChatOptions, LLMProvider } from './provider.js';

export class DeepSeekProvider implements LLMProvider {
  readonly type = 'deepseek' as const;
  private client: OpenAI;

  constructor() {
    const { apiKey, baseURL } = LLM_CONFIG.deepseek;
    // 实际接入时需配置 DEEPSEEK_API_KEY
    this.client = new OpenAI({ apiKey, baseURL });
  }

  async chat(messages: ChatMessage[], options: ChatOptions = {}): Promise<string> {
    try {
      const completion = await this.client.chat.completions.create({
        model: options.model || LLM_CONFIG.deepseek.model,
        messages,
        temperature: options.temperature ?? LLM_CONFIG.temperature,
        max_tokens: options.maxTokens ?? LLM_CONFIG.maxTokens,
      });
      return completion.choices[0]?.message?.content ?? '';
    } catch (err) {
      logger.error('DeepSeek 调用失败:', err);
      throw err;
    }
  }
}

export default DeepSeekProvider;
