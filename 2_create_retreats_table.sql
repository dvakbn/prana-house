-- ═══════════════════════════════════════════════════════════════════
-- STEP 2: Create Retreats Table
-- Copy and paste this entire file into Supabase SQL Editor and click Run
-- ═══════════════════════════════════════════════════════════════════

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

CREATE INDEX IF NOT EXISTS idx_retreats_active ON retreats(active);
CREATE INDEX IF NOT EXISTS idx_retreats_start_date ON retreats(start_date DESC);
