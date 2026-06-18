-- ═══════════════════════════════════════════════════════════════════
-- Create Programs Table
-- Copy and paste this into Supabase SQL Editor and click Run
-- ═══════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS programs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL, -- 'meditation', 'breathing', 'flexibility', 'stress'
  icon TEXT DEFAULT '🌿',
  tagline TEXT,
  description TEXT NOT NULL,
  long_description TEXT,
  benefits TEXT[],
  what_included TEXT[],
  duration TEXT,
  schedule TEXT,
  location TEXT,
  price INTEGER,
  max_participants INTEGER,
  level TEXT DEFAULT 'all', -- 'beginner', 'intermediate', 'advanced', 'all'
  type TEXT DEFAULT 'hybrid', -- 'online', 'offline', 'hybrid'
  image TEXT,
  tags TEXT[],
  upcoming_dates DATE[],
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_programs_active ON programs(active);
CREATE INDEX IF NOT EXISTS idx_programs_category ON programs(category);
CREATE INDEX IF NOT EXISTS idx_programs_slug ON programs(slug);
CREATE INDEX IF NOT EXISTS idx_programs_created_at ON programs(created_at DESC);

-- Verify the table was created
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'programs'
ORDER BY ordinal_position;
