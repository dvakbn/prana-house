# Complete Classes, Retreats & Gallery Setup

## ✅ What You've Already Done
- Blogs: 10 articles successfully created
- Programs: 4 programs successfully created

## 📝 What's Next
You need to populate **Classes, Retreats, and Gallery** data.

## 🚀 Simple Instructions

### Step 1: Open Supabase SQL Editor
1. Go to your Supabase dashboard
2. Click on "SQL Editor" in the left sidebar
3. Click "New Query"

### Step 2: Run the SQL File
1. Open the file: `INSERT_CLASSES_RETREATS_GALLERY.sql`
2. Copy **ALL** the content from that file
3. Paste it into the Supabase SQL Editor
4. Click "Run" button

### Step 3: Verify Success
After running, you should see:
- **8 Classes inserted** (3 online, 3 offline, 2 hybrid)
- **2 Retreats inserted** (Full Day Retreat ₹5000, Weekend Immersion ₹8500)
- **15 Gallery images inserted** (various categories)

### Step 4: Check Your Website
1. Clear browser cache (Ctrl + Shift + R on Windows)
2. Visit your homepage: `https://pranayoga.qzz.io`
3. Check:
   - Classes page (`/classes`) should show all 8 classes
   - Retreats page (`/retreat`) should show 2 retreats
   - Gallery page (`/gallery`) should show 15 images

## 🎉 What's in the Data

### Classes (8 total)
**Online Classes (3):**
- Morning Hatha Yoga Online - ₹2000
- Evening Relaxation Flow Online - ₹1800
- Pranayama & Meditation Online - ₹1500

**Offline Classes (3):**
- Sunrise Yoga - ₹3000
- Therapeutic Yoga - ₹3500
- Power Vinyasa - ₹2800

**Hybrid Classes (2):**
- Flexibility & Mobility - ₹2500
- Yoga for Stress Relief - ₹2200

### Retreats (2 total)
- Full Day Yoga & Wellness Retreat - ₹5000 (Aug 15, 2026)
- Weekend Yoga Immersion - ₹8500 (Sep 12-13, 2026)

### Gallery (15 images)
- Classes category: 4 images
- Meditation category: 3 images
- Workshop category: 3 images
- Retreat category: 5 images

## ❓ If Something Goes Wrong

**Error: "duplicate key value"**
- This means data already exists
- You can skip this or delete existing data first

**No data showing on website:**
1. Make sure SQL ran successfully (no errors)
2. Clear browser cache completely
3. Check if tables exist in Supabase

## 📧 Need Help?
If you face any issues, check:
1. Did the SQL run without errors?
2. Are the tables visible in Supabase Table Editor?
3. Did you clear browser cache?

---

**File to run:** `INSERT_CLASSES_RETREATS_GALLERY.sql`
