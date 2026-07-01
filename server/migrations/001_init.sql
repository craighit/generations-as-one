-- Generations As One - 数据库初始化脚本
-- 创建核心业务表，每张表统一包含权限字段：visibility / visible_to / owner_id / encrypted

-- 启用 UUID 生成扩展
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ============ 用户表 ============
CREATE TABLE IF NOT EXISTS users (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name            VARCHAR(64)  NOT NULL,
  email           VARCHAR(128) NOT NULL UNIQUE,
  password_hash   VARCHAR(256) NOT NULL,
  avatar          TEXT,
  is_parent       BOOLEAN      NOT NULL DEFAULT FALSE,
  children_ids    UUID[]       NOT NULL DEFAULT '{}',
  created_at      TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  -- 权限字段
  visibility      VARCHAR(16)  NOT NULL DEFAULT 'private',
  visible_to      UUID[]       NOT NULL DEFAULT '{}',
  owner_id        UUID         NOT NULL,
  encrypted       BOOLEAN      NOT NULL DEFAULT FALSE
);

-- ============ 家庭表 ============
CREATE TABLE IF NOT EXISTS families (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name            VARCHAR(128) NOT NULL,
  created_at      TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  -- 权限字段
  visibility      VARCHAR(16)  NOT NULL DEFAULT 'semi-public',
  visible_to      UUID[]       NOT NULL DEFAULT '{}',
  owner_id        UUID         NOT NULL,
  encrypted       BOOLEAN      NOT NULL DEFAULT FALSE
);

-- ============ 家庭成员表 ============
CREATE TABLE IF NOT EXISTS family_members (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id         UUID         NOT NULL REFERENCES families(id) ON DELETE CASCADE,
  name              VARCHAR(64)  NOT NULL,
  relationship      VARCHAR(32)  NOT NULL,
  age_group         VARCHAR(32),
  avatar            TEXT,
  similarity        INTEGER      NOT NULL DEFAULT 0,
  description       TEXT,
  created_at        TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  last_interaction  TIMESTAMPTZ,
  -- 权限字段
  visibility        VARCHAR(16)  NOT NULL DEFAULT 'public',
  visible_to        UUID[]       NOT NULL DEFAULT '{}',
  owner_id          UUID         NOT NULL,
  encrypted         BOOLEAN      NOT NULL DEFAULT FALSE
);
CREATE INDEX IF NOT EXISTS idx_family_members_family_id ON family_members(family_id);

-- ============ 记忆记录表 ============
CREATE TABLE IF NOT EXISTS memory_records (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id     UUID         NOT NULL REFERENCES family_members(id) ON DELETE CASCADE,
  type          VARCHAR(16)  NOT NULL,
  content       TEXT         NOT NULL,
  title         VARCHAR(128),
  tags          VARCHAR(64)[] NOT NULL DEFAULT '{}',
  timestamp     TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  -- 权限字段
  visibility    VARCHAR(16)  NOT NULL DEFAULT 'public',
  visible_to    UUID[]       NOT NULL DEFAULT '{}',
  owner_id      UUID         NOT NULL,
  encrypted     BOOLEAN      NOT NULL DEFAULT FALSE
);
CREATE INDEX IF NOT EXISTS idx_memory_records_member_id ON memory_records(member_id);

-- ============ 对话消息表 ============
CREATE TABLE IF NOT EXISTS chat_messages (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id   UUID         NOT NULL REFERENCES family_members(id) ON DELETE CASCADE,
  role        VARCHAR(8)   NOT NULL,
  content     TEXT         NOT NULL,
  sender      VARCHAR(64),
  timestamp   TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  -- 权限字段
  visibility  VARCHAR(16)  NOT NULL DEFAULT 'public',
  visible_to  UUID[]       NOT NULL DEFAULT '{}',
  owner_id    UUID         NOT NULL,
  encrypted   BOOLEAN      NOT NULL DEFAULT FALSE
);
CREATE INDEX IF NOT EXISTS idx_chat_messages_member_id ON chat_messages(member_id);

-- ============ AI 画像表 ============
CREATE TABLE IF NOT EXISTS profiles (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id           UUID         NOT NULL UNIQUE REFERENCES family_members(id) ON DELETE CASCADE,
  core_profile        JSONB        NOT NULL DEFAULT '{}',
  factual_memory      JSONB        NOT NULL DEFAULT '{}',
  emotional_memory    JSONB        NOT NULL DEFAULT '{}',
  interaction_memory  JSONB        NOT NULL DEFAULT '{}',
  growth_memory       JSONB        NOT NULL DEFAULT '{}',
  updated_at          TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  -- 权限字段
  visibility          VARCHAR(16)  NOT NULL DEFAULT 'semi-public',
  visible_to          UUID[]       NOT NULL DEFAULT '{}',
  owner_id            UUID         NOT NULL,
  encrypted           BOOLEAN      NOT NULL DEFAULT FALSE
);

-- ============ 私密记录表 ============
CREATE TABLE IF NOT EXISTS private_entries (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID         NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type        VARCHAR(16)  NOT NULL,
  content     TEXT         NOT NULL,
  created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  -- 权限字段（私密记录默认加密）
  visibility  VARCHAR(16)  NOT NULL DEFAULT 'private',
  visible_to  UUID[]       NOT NULL DEFAULT '{}',
  owner_id    UUID         NOT NULL,
  encrypted   BOOLEAN      NOT NULL DEFAULT TRUE
);
CREATE INDEX IF NOT EXISTS idx_private_entries_user_id ON private_entries(user_id);

-- ============ 专家表 ============
CREATE TABLE IF NOT EXISTS experts (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name         VARCHAR(64)  NOT NULL,
  specialty    VARCHAR(32)  NOT NULL,
  avatar       TEXT,
  description  TEXT,
  created_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  -- 权限字段
  visibility   VARCHAR(16)  NOT NULL DEFAULT 'public',
  visible_to   UUID[]       NOT NULL DEFAULT '{}',
  owner_id     UUID         NOT NULL,
  encrypted    BOOLEAN      NOT NULL DEFAULT FALSE
);

-- ============ 家庭价值观表 ============
CREATE TABLE IF NOT EXISTS family_values (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id   UUID         NOT NULL REFERENCES families(id) ON DELETE CASCADE,
  title       VARCHAR(128) NOT NULL,
  content     TEXT         NOT NULL,
  agreed_by   UUID[]       NOT NULL DEFAULT '{}',
  created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  -- 权限字段
  visibility  VARCHAR(16)  NOT NULL DEFAULT 'semi-public',
  visible_to  UUID[]       NOT NULL DEFAULT '{}',
  owner_id    UUID         NOT NULL,
  encrypted   BOOLEAN      NOT NULL DEFAULT FALSE
);
CREATE INDEX IF NOT EXISTS idx_family_values_family_id ON family_values(family_id);

-- ============ 共同目标表 ============
CREATE TABLE IF NOT EXISTS family_goals (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id     UUID         NOT NULL REFERENCES families(id) ON DELETE CASCADE,
  title         VARCHAR(128) NOT NULL,
  description   TEXT,
  target_date   DATE,
  status        VARCHAR(16)  NOT NULL DEFAULT 'planning',
  participants  UUID[]       NOT NULL DEFAULT '{}',
  created_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  -- 权限字段
  visibility    VARCHAR(16)  NOT NULL DEFAULT 'semi-public',
  visible_to    UUID[]       NOT NULL DEFAULT '{}',
  owner_id      UUID         NOT NULL,
  encrypted     BOOLEAN      NOT NULL DEFAULT FALSE
);
CREATE INDEX IF NOT EXISTS idx_family_goals_family_id ON family_goals(family_id);

-- ============ 时间线事件表 ============
CREATE TABLE IF NOT EXISTS timeline_events (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id     UUID         NOT NULL REFERENCES families(id) ON DELETE CASCADE,
  date          DATE         NOT NULL,
  title         VARCHAR(128) NOT NULL,
  description   TEXT,
  type          VARCHAR(16)  NOT NULL,
  photo_url     TEXT,
  participants  UUID[]       NOT NULL DEFAULT '{}',
  created_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  -- 权限字段
  visibility    VARCHAR(16)  NOT NULL DEFAULT 'semi-public',
  visible_to    UUID[]       NOT NULL DEFAULT '{}',
  owner_id      UUID         NOT NULL,
  encrypted     BOOLEAN      NOT NULL DEFAULT FALSE
);
CREATE INDEX IF NOT EXISTS idx_timeline_events_family_id ON timeline_events(family_id);
