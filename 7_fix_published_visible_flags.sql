-- ═══════════════════════════════════════════════════════════════════
-- Fix Published and Visible Flags for Existing Data
-- Run this in Supabase SQL Editor to make existing blogs and gallery visible
-- ═══════════════════════════════════════════════════════════════════

-- Make all existing blogs published
UPDATE blogs SET published = true WHERE published = false OR published IS NULL;

-- Make all existing gallery items visible
UPDATE gallery SET visible = true WHERE visible = false OR visible IS NULL;

-- Verify the updates
SELECT 
  'blogs' as table_name,
  COUNT(*) as total_rows,
  SUM(CASE WHEN published = true THEN 1 ELSE 0 END) as published_count
FROM blogs

UNION ALL

SELECT 
  'gallery' as table_name,
  COUNT(*) as total_rows,
  SUM(CASE WHEN visible = true THEN 1 ELSE 0 END) as visible_count
FROM gallery;
