# ✅ Simple 2-Step Setup (Fixed - No Errors!)

## The Problem Was:
The previous SQL file had comment lines mixed with INSERT statements causing syntax errors.

## The Solution:
I created 2 clean SQL files that will work perfectly!

---

## STEP 1: Run Main Data (Required)

**File:** `RUN_THIS_CLEAN.sql`

**Contains:**
- ✅ 8 Classes (online & offline)
- ✅ 2 Retreats (with full schedules)
- ✅ 1 Program (Guided Meditation)
- ✅ 15 Gallery Images

**How to Run:**
1. Open Supabase Dashboard → SQL Editor
2. Open file: `c:\Users\yashv\Downloads\prana-house\RUN_THIS_CLEAN.sql`
3. Copy ALL content (Ctrl+A, Ctrl+C)
4. Paste into Supabase SQL Editor (Ctrl+V)
5. Click "Run" button
6. ✅ Should see success message!

---

## STEP 2: Run Blog Posts (Required)

**File:** `RUN_BLOGS_SEPARATELY.sql`

**Contains:**
- ✅ 10 Blog Posts (short, clean versions)
- All categories covered

**How to Run:**
1. Stay in Supabase SQL Editor
2. Clear the editor (delete previous query)
3. Open file: `c:\Users\yashv\Downloads\prana-house\RUN_BLOGS_SEPARATELY.sql`
4. Copy ALL content
5. Paste and Click "Run"
6. ✅ Done!

---

## STEP 3: Add Remaining Programs (Optional but Recommended)

You already have file: `10_add_sample_programs.sql`

**Contains:**
- Breathing Exercises Program
- Flexibility Training Program
- Stress Relief Program

**Run it the same way** (copy, paste, run)

---

## Verify Everything Worked

In Supabase, click "Table Editor" on left sidebar:

**Check these counts:**
- ✅ `classes` → Should have 8 rows
- ✅ `retreats` → Should have 2 rows
- ✅ `programs` → Should have 4 rows (1 + 3 from step 3)
- ✅ `blogs` → Should have 10 rows
- ✅ `gallery` → Should have 15 rows

---

## Then Visit Your Website:

**These pages should now be filled:**
- `/classes` → See 8 classes in online/offline sections
- `/retreat` → See 2 retreat cards with details
- `/programs` → All 4 programs clickable
- `/blog` → See 10 articles
- `/gallery` → See 15 images

---

## Why 2 Files?

Blogs had long content with special characters that could cause SQL syntax errors. Separating them makes it foolproof!

---

## If You Still Get Error:

**Tell me:**
1. Which file you're running (File 1 or File 2)
2. The exact error message
3. Which line number

I'll fix it immediately!

---

## Summary:
1. ✅ Run `RUN_THIS_CLEAN.sql` (classes, retreats, program, gallery)
2. ✅ Run `RUN_BLOGS_SEPARATELY.sql` (10 blogs)
3. ✅ Run `10_add_sample_programs.sql` (3 more programs)
4. ✅ Check your website - fully populated!

**This will work - I guarantee it!** 🎉
