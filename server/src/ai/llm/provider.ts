// 大模型 Provider 抽象层 - 统一不同模型厂商的调用接口
import type { LLMProviderType } from '@shared/types';
import { LLM_CONFIG } from '../../config/index.js';
import { QwenProvider } from './qwen.js';
import { DeepSeekProvider } from './deepseek.js';

/** 对话消息格式（与 OpenAI ChatCompletion 兼容） */
export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

/** LLM 调用参数 */
export interface ChatOptions {
  temperature?: number;
  maxTokens?: number;
  model?: string;
}

/** 大模型 Provider 抽象接口 */
export interface LLMProvider {
  /** Provider 类型标识 */
  readonly type: LLMProviderType;
  /** 发起一次对话补全，返回文本结果 */
  chat(messages: ChatMessage[], options?: ChatOptions): Promise<string>;
  /** 发起一次对话补全，返回流式结果（骨架，可选） */
  streamChat?(messages: ChatMessage[], options?: ChatOptions): AsyncIterable<string>;
}

/**
 * Provider 工厂 - 根据类型创建对应的 Provider 实例
 */
export class LLMProviderFactory {
  private static cache = new Map<LLMProviderType, LLMProvider>();

  static create(type: LLMProviderType = LLM_CONFIG.defaultProvider): LLMProvider {
    const cached = LLMProviderFactory.cache.get(type);
    if (cached) {
      return cached;
    }

    let provider: LLMProvider;
    switch (type) {
      case 'qwen':
        provider = new QwenProvider();
        break;
      case 'deepseek':
        provider = new DeepSeekProvider();
        break;
      case 'wenxin':
        // 文心一言暂未实现，复用通义千问骨架
        provider = new QwenProvider();
        break;
      default:
        throw new Error(`不支持的 LLM Provider 类型: ${type}`);
    }

    LLMProviderFactory.cache.set(type, provider);
    return provider;
  }
}

/** 获取默认 Provider 实例 */
export function getDefaultProvider(): LLMProvider {
  return LLMProviderFactory.create(LLM_CONFIG.defaultProvider);
}
