-- ═══════════════════════════════════════════════════════════════════
-- STEP 4: Verify All Tables Created
-- Copy and paste this into Supabase SQL Editor and click Run
-- You should see 4 tables listed with their column counts
-- ═══════════════════════════════════════════════════════════════════

SELECT 
  table_name,
  (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = t.table_name) as column_count
FROM information_schema.tables t
WHERE table_schema = 'public' 
  AND table_type = 'BASE TABLE'
  AND table_name IN ('blogs', 'retreats', 'classes', 'gallery')
ORDER BY table_name;
