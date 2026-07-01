// 加密工具 - 敏感数据的加密 / 解密与密码哈希
import crypto from 'crypto';

/** 默认加密算法 */
const ALGORITHM = 'aes-256-gcm';
/** 加密密钥（生产环境应从环境变量读取） */
const SECRET_KEY = process.env.CRYPTO_SECRET || 'gao-dev-crypto-secret-change-me';
/** 密钥派生盐值 */
const SALT = process.env.CRYPTO_SALT || 'gao-salt';

/** 派生 32 字节密钥 */
function deriveKey(): Buffer {
  return crypto.scryptSync(SECRET_KEY, SALT, 32);
}

/** 加密结果 */
export interface EncryptedPayload {
  encrypted: string;
  iv: string;
  tag: string;
}

/**
 * 加密文本
 * 使用 AES-256-GCM 生成密文、初始向量与认证标签
 */
export function encrypt(plainText: string): EncryptedPayload {
  const key = deriveKey();
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

  let encrypted = cipher.update(plainText, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const tag = cipher.getAuthTag();

  return { encrypted, iv: iv.toString('hex'), tag: tag.toString('hex') };
}

/**
 * 解密文本
 */
export function decrypt(payload: EncryptedPayload): string {
  const key = deriveKey();
  const decipher = crypto.createDecipheriv(ALGORITHM, key, Buffer.from(payload.iv, 'hex'));
  decipher.setAuthTag(Buffer.from(payload.tag, 'hex'));

  let decrypted = decipher.update(payload.encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

/**
 * 生成密码哈希（用于用户密码存储）
 * 返回 salt:hash 格式
 */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

/**
 * 校验密码
 */
export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(':');
  if (!salt || !hash) return false;
  const verify = crypto.scryptSync(password, salt, 64).toString('hex');
  return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(verify, 'hex'));
}

export default { encrypt, decrypt, hashPassword, verifyPassword };
