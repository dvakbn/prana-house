-- ═══════════════════════════════════════════════════════════════════
-- Fix Blog and Gallery Categories
-- Run this in Supabase SQL Editor after you've fixed the dropdown values
-- ═══════════════════════════════════════════════════════════════════

-- Fix Blog Categories (update lowercase to Title Case to match filters)
UPDATE blogs SET category = 'Yoga' WHERE LOWER(category) = 'yoga';
UPDATE blogs SET category = 'Meditation' WHERE LOWER(category) = 'meditation';
UPDATE blogs SET category = 'Lifestyle' WHERE LOWER(category) = 'lifestyle';
UPDATE blogs SET category = 'Naturopathy' WHERE LOWER(category) = 'naturopathy';
UPDATE blogs SET category = 'Pranayama' WHERE LOWER(category) = 'pranayama';
UPDATE blogs SET category = 'Wellness' WHERE LOWER(category) = 'wellness';
UPDATE blogs SET category = 'Nutrition' WHERE LOWER(category) = 'nutrition';

-- Fix Gallery Categories (update old categories to new ones)
UPDATE gallery SET category = 'workshop' WHERE category = 'studio';
UPDATE gallery SET category = 'workshop' WHERE category = 'events';

-- Verify the changes
SELECT 'blogs' as table_name, category, COUNT(*) as count
FROM blogs
WHERE published = true
GROUP BY category

UNION ALL

SELECT 'gallery' as table_name, category, COUNT(*) as count
FROM gallery
WHERE visible = true
GROUP BY category
ORDER BY table_name, category;
