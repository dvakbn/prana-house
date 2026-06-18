-- ═══════════════════════════════════════════════════════════════════
-- PRANA HOUSE - SUPABASE TABLES SETUP
-- Run this SQL in Supabase Dashboard → SQL Editor
-- ═══════════════════════════════════════════════════════════════════

-- ───────────────────────────────────────────────────────────────────
-- 1. BLOGS TABLE
-- ───────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS blogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  author TEXT DEFAULT 'Dr. Fareen Tak',
  category TEXT,
  image TEXT,
  excerpt TEXT,
  content TEXT NOT NULL,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS idx_blogs_published ON blogs(published);
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_created_at ON blogs(created_at DESC);

-- ───────────────────────────────────────────────────────────────────
-- 2. RETREATS TABLE
-- ───────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS retreats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  location TEXT NOT NULL,
  price INTEGER,
  max_participants INTEGER,
  description TEXT,
  highlights TEXT[],
  image TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS idx_retreats_active ON retreats(active);
CREATE INDEX IF NOT EXISTS idx_retreats_start_date ON retreats(start_date DESC);

-- ───────────────────────────────────────────────────────────────────
-- 3. CLASSES TABLE
-- ───────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS classes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  level TEXT DEFAULT 'all',
  schedule TEXT NOT NULL,
  duration INTEGER,
  price INTEGER,
  description TEXT,
  max_students INTEGER,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS idx_classes_active ON classes(active);
CREATE INDEX IF NOT EXISTS idx_classes_type ON classes(type);

-- ───────────────────────────────────────────────────────────────────
-- 4. VERIFY TABLES CREATED
-- ───────────────────────────────────────────────────────────────────
-- Run this to check if tables exist:
SELECT 
  table_name,
  (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = t.table_name) as column_count
FROM information_schema.tables t
WHERE table_schema = 'public' 
  AND table_type = 'BASE TABLE'
  AND table_name IN ('blogs', 'retreats', 'classes', 'gallery', 'enquiries', 'subscribers', 'testimonials')
ORDER BY table_name;

-- ═══════════════════════════════════════════════════════════════════
-- SETUP COMPLETE!
-- ═══════════════════════════════════════════════════════════════════
