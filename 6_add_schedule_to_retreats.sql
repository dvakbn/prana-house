-- ═══════════════════════════════════════════════════════════════════
-- Add Schedule Column to Retreats Table
-- Copy and paste this into Supabase SQL Editor and click Run
-- ═══════════════════════════════════════════════════════════════════

-- Add schedule column to store array of schedule items as JSONB
ALTER TABLE retreats ADD COLUMN IF NOT EXISTS schedule JSONB DEFAULT '[]'::jsonb;

-- Add index for faster queries on schedule data
CREATE INDEX IF NOT EXISTS idx_retreats_schedule ON retreats USING GIN (schedule);

-- Verify the column was added
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'retreats' AND column_name = 'schedule';
