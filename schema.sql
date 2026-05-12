-- SummitPass Database Schema

-- ユーザー
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  clerk_id TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  bio TEXT DEFAULT '',
  avatar_url TEXT DEFAULT '',
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'premium')),
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  total_mountains INTEGER DEFAULT 0,
  total_elevation INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- 山マスタ（日本百名山など）
CREATE TABLE IF NOT EXISTS mountains (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  name_kana TEXT NOT NULL,
  elevation INTEGER NOT NULL,
  prefecture TEXT NOT NULL,
  region TEXT NOT NULL,
  latitude REAL NOT NULL,
  longitude REAL NOT NULL,
  category TEXT DEFAULT 'other', -- hyakumei, nihonarupusu, volcanic, etc.
  difficulty TEXT DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard', 'expert')),
  description TEXT DEFAULT '',
  image_url TEXT DEFAULT '',
  created_at TEXT DEFAULT (datetime('now'))
);

-- 登頂記録
CREATE TABLE IF NOT EXISTS climbs (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  mountain_id TEXT NOT NULL,
  climbed_at TEXT NOT NULL,
  duration_minutes INTEGER,
  distance_km REAL,
  elevation_gain INTEGER,
  weather TEXT DEFAULT '',
  condition TEXT DEFAULT 'good' CHECK (condition IN ('excellent', 'good', 'fair', 'poor')),
  notes TEXT DEFAULT '',
  ai_report TEXT DEFAULT '',
  gpx_url TEXT DEFAULT '',
  is_public INTEGER DEFAULT 1,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (mountain_id) REFERENCES mountains(id)
);

-- 写真
CREATE TABLE IF NOT EXISTS climb_photos (
  id TEXT PRIMARY KEY,
  climb_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  url TEXT NOT NULL,
  caption TEXT DEFAULT '',
  ai_identified_mountain TEXT DEFAULT '',
  taken_at TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (climb_id) REFERENCES climbs(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- バッジ定義
CREATE TABLE IF NOT EXISTS badges (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  condition_type TEXT NOT NULL, -- mountain_count, specific_mountain, elevation_total, etc.
  condition_value TEXT NOT NULL,
  rarity TEXT DEFAULT 'common' CHECK (rarity IN ('common', 'rare', 'epic', 'legendary')),
  created_at TEXT DEFAULT (datetime('now'))
);

-- ユーザーバッジ
CREATE TABLE IF NOT EXISTS user_badges (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  badge_id TEXT NOT NULL,
  earned_at TEXT DEFAULT (datetime('now')),
  UNIQUE(user_id, badge_id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (badge_id) REFERENCES badges(id)
);

-- フォロー関係
CREATE TABLE IF NOT EXISTS follows (
  follower_id TEXT NOT NULL,
  following_id TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now')),
  PRIMARY KEY (follower_id, following_id),
  FOREIGN KEY (follower_id) REFERENCES users(id),
  FOREIGN KEY (following_id) REFERENCES users(id)
);

-- いいね
CREATE TABLE IF NOT EXISTS likes (
  user_id TEXT NOT NULL,
  climb_id TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now')),
  PRIMARY KEY (user_id, climb_id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (climb_id) REFERENCES climbs(id)
);

-- コメント
CREATE TABLE IF NOT EXISTS comments (
  id TEXT PRIMARY KEY,
  climb_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (climb_id) REFERENCES climbs(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- パートナー（山小屋・ショップ）
CREATE TABLE IF NOT EXISTS partners (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('hut', 'shop', 'guide')),
  description TEXT DEFAULT '',
  url TEXT DEFAULT '',
  mountain_id TEXT,
  image_url TEXT DEFAULT '',
  commission_rate REAL DEFAULT 0.05,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (mountain_id) REFERENCES mountains(id)
);

-- インデックス
CREATE INDEX IF NOT EXISTS idx_climbs_user_id ON climbs(user_id);
CREATE INDEX IF NOT EXISTS idx_climbs_mountain_id ON climbs(mountain_id);
CREATE INDEX IF NOT EXISTS idx_climbs_climbed_at ON climbs(climbed_at DESC);
CREATE INDEX IF NOT EXISTS idx_follows_follower ON follows(follower_id);
CREATE INDEX IF NOT EXISTS idx_follows_following ON follows(following_id);
CREATE INDEX IF NOT EXISTS idx_likes_climb ON likes(climb_id);
CREATE INDEX IF NOT EXISTS idx_comments_climb ON comments(climb_id);
