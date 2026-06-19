-- ═══════════════════════════════════════════════════════════════════
-- Add Image Field to Classes Table
-- Run this in Supabase SQL Editor
-- This will NOT affect existing data - just adds a new optional field
-- ═══════════════════════════════════════════════════════════════════

-- Add image column to classes table (optional field)
ALTER TABLE classes 
ADD COLUMN IF NOT EXISTS image TEXT;

-- Add comment to document the column
COMMENT ON COLUMN classes.image IS 'URL to class cover/thumbnail image';

-- Verify the change
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'classes' 
ORDER BY ordinal_position;
