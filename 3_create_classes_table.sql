-- ═══════════════════════════════════════════════════════════════════
-- STEP 3: Create Classes Table
-- Copy and paste this entire file into Supabase SQL Editor and click Run
-- ═══════════════════════════════════════════════════════════════════

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

CREATE INDEX IF NOT EXISTS idx_classes_active ON classes(active);
CREATE INDEX IF NOT EXISTS idx_classes_type ON classes(type);
