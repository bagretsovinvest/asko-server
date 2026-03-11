-- ASKO DATABASE SCHEMA
-- Запустить: psql $DATABASE_URL < schema.sql

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS users (
  id            TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name          TEXT NOT NULL,
  handle        TEXT UNIQUE NOT NULL,
  bio           TEXT DEFAULT '',
  avatar        TEXT DEFAULT 'A',
  accent        TEXT DEFAULT 'violet',
  followers     INT DEFAULT 0,
  following     INT DEFAULT 0,
  streak_days   INT DEFAULT 0,
  premium       BOOLEAN DEFAULT false,
  premium_expires TIMESTAMPTZ,
  ref_code      TEXT UNIQUE,
  ref_by        TEXT REFERENCES users(id),
  ref_count     INT DEFAULT 0,
  points        INT DEFAULT 0,
  vk_user_id    TEXT UNIQUE,
  joined_at     TIMESTAMPTZ DEFAULT NOW(),
  last_active_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS questions (
  id            TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  to_user_id    TEXT NOT NULL REFERENCES users(id),
  text          TEXT NOT NULL,
  mood          TEXT DEFAULT 'soft',
  sender_hint   TEXT DEFAULT 'Аноним',
  sender_user_id TEXT REFERENCES users(id),
  revealed      BOOLEAN DEFAULT false,
  important     BOOLEAN DEFAULT false,
  archived      BOOLEAN DEFAULT false,
  answered      BOOLEAN DEFAULT false,
  ai_generated  BOOLEAN DEFAULT false,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS answers (
  id            TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  question_id   TEXT REFERENCES questions(id),
  user_id       TEXT NOT NULL REFERENCES users(id),
  text          TEXT NOT NULL,
  theme         TEXT DEFAULT 'midnight',
  likes         INT DEFAULT 0,
  comments      INT DEFAULT 0,
  views         INT DEFAULT 0,
  bookmarked    BOOLEAN DEFAULT false,
  published_at  TIMESTAMPTZ DEFAULT NOW(),
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS follows (
  id            TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  from_user_id  TEXT NOT NULL REFERENCES users(id),
  to_user_id    TEXT NOT NULL REFERENCES users(id),
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(from_user_id, to_user_id)
);

CREATE TABLE IF NOT EXISTS invites (
  id            TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  from_user_id  TEXT NOT NULL REFERENCES users(id),
  to_user_id    TEXT REFERENCES users(id),
  to_handle     TEXT,
  code          TEXT NOT NULL,
  status        TEXT DEFAULT 'pending',
  bonus_awarded INT DEFAULT 0,
  joined_at     TIMESTAMPTZ,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS events (
  id            TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id       TEXT REFERENCES users(id),
  type          TEXT NOT NULL,
  meta          JSONB DEFAULT '{}',
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS notifications (
  id            TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id       TEXT NOT NULL REFERENCES users(id),
  title         TEXT NOT NULL,
  description   TEXT DEFAULT '',
  cta           TEXT DEFAULT 'Открыть',
  target        JSONB DEFAULT '{}',
  read          BOOLEAN DEFAULT false,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS drafts (
  id            TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  question_id   TEXT REFERENCES questions(id),
  user_id       TEXT NOT NULL REFERENCES users(id),
  text          TEXT NOT NULL,
  theme         TEXT DEFAULT 'midnight',
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Индексы
CREATE INDEX IF NOT EXISTS idx_questions_to_user ON questions(to_user_id);
CREATE INDEX IF NOT EXISTS idx_answers_user ON answers(user_id);
CREATE INDEX IF NOT EXISTS idx_events_user_type ON events(user_id, type);
CREATE INDEX IF NOT EXISTS idx_follows_from ON follows(from_user_id);
CREATE INDEX IF NOT EXISTS idx_notif_user ON notifications(user_id, read);
