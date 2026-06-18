-- ═══════════════════════════════════════════════════════════════════
-- FIX GALLERY TABLE - Add Unique Constraint on URL
-- This fixes the "Failed to save image" error
-- ═══════════════════════════════════════════════════════════════════

-- Option 1: Add unique constraint to existing table
ALTER TABLE gallery ADD CONSTRAINT gallery_url_unique UNIQUE (url);

-- If you get an error about existing duplicates, first clean them:
-- DELETE FROM gallery WHERE url IN (
--   SELECT url FROM gallery GROUP BY url HAVING COUNT(*) > 1
-- );
-- Then run the ALTER TABLE command above again.
