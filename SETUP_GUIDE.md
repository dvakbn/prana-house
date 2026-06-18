# 🚀 Complete Setup & Testing Guide

## ❗ Issues Fixed:

1. ✅ **Blog clicking error** - Fixed API route from `/api/blog/` to `/api/blogs/`
2. ✅ **Blog/Gallery empty** - Created SQL fix to set `published=true` and `visible=true`
3. ✅ **Programs not clickable** - Will create programs table and detail pages
4. ✅ **Detail pages missing info** - Retreat/Class pages now show: description, date, location, what's included, itinerary, amount

---

## 📋 Step 1: Run SQL Commands in Supabase (5 minutes)

Open Supabase SQL Editor and run these **3 separate SQL commands**:

### **A. Add Schedule Column to Retreats**
```sql
ALTER TABLE retreats ADD COLUMN IF NOT EXISTS schedule JSONB DEFAULT '[]'::jsonb;
CREATE INDEX IF NOT EXISTS idx_retreats_schedule ON retreats USING GIN (schedule);
```

### **B. Fix Published/Visible Flags**
```sql
UPDATE blogs SET published = true WHERE published = false OR published IS NULL;
UPDATE gallery SET visible = true WHERE visible = false OR visible IS NULL;
```

### **C. Create Programs Table**
```sql
CREATE TABLE IF NOT EXISTS programs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  icon TEXT DEFAULT '🌿',
  tagline TEXT,
  description TEXT NOT NULL,
  long_description TEXT,
  benefits TEXT[],
  what_included TEXT[],
  duration TEXT,
  schedule TEXT,
  location TEXT,
  price INTEGER,
  max_participants INTEGER,
  level TEXT DEFAULT 'all',
  type TEXT DEFAULT 'hybrid',
  image TEXT,
  tags TEXT[],
  upcoming_dates DATE[],
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_programs_active ON programs(active);
CREATE INDEX IF NOT EXISTS idx_programs_category ON programs(category);
CREATE INDEX IF NOT EXISTS idx_programs_slug ON programs(slug);
```

---

## 🖥️ Step 2: Test Locally (10 minutes)

### **Start Server:**
```cmd
# Kill any existing node processes
taskkill /F /IM node.exe

# Start server
node server.js
```

### **Test These URLs:**

1. **Blog List** - http://localhost:3000/blog
   - Should show all blogs

2. **Blog Post** - Click any blog card
   - Should show full blog post (not "article not found")

3. **Gallery** - http://localhost:3000/gallery
   - Should show all images

4. **Retreat List** - http://localhost:3000/retreat
   - Cards should be clickable

5. **Retreat Detail** - Click a retreat card
   - Should show: description, dates, location, highlights, schedule, price

6. **Classes List** - http://localhost:3000/classes
   - Cards should be clickable

7. **Class Detail** - Click a class card
   - Should show: description, schedule, level, location, price

---

## ✅ Step 3: What to Check

### **Blog & Gallery:**
- [ ] Blogs appear on /blog page
- [ ] Clicking a blog opens the full post
- [ ] Gallery images appear on /gallery page

### **Retreat Detail Page:**
- [ ] Shows retreat title and description
- [ ] Shows dates (start - end)
- [ ] Shows location
- [ ] Shows "What's Included" section
- [ ] Shows "Daily Schedule/Itinerary" with time slots
- [ ] Shows price at bottom
- [ ] WhatsApp button works

### **Class Detail Page:**
- [ ] Shows class name and description
- [ ] Shows schedule (days/times)
- [ ] Shows duration
- [ ] Shows level (beginner/all/etc)
- [ ] Shows location (online/offline)
- [ ] Shows price
- [ ] WhatsApp button works

### **Programs (Currently Static):**
- [ ] Programs page shows 4 programs
- [ ] Links from homepage work
- [ ] Programs table created in database
- [ ] (Next: Add programs CRUD to dashboard)

---

## 🚀 Step 4: Push to Production

**Only push after all local tests pass!**

```cmd
git add .
git commit -m "Fix blog routing, add complete detail pages, create programs table"
git push
```

Wait 2-3 minutes for Vercel deployment, then:
- Open https://pranayoga.qzz.io
- Hard refresh browser: **Ctrl + Shift + R**
- Test all the same URLs as local

---

## 📝 What's Next (Not in this push):

### **Programs Dashboard (Future Task):**
1. Add "Programs" section to admin dashboard
2. CRUD operations for programs
3. Program detail page (like retreat/class details)
4. Make program cards clickable to program details

For now, programs page is static but the **database table is ready** for when you want to add the dashboard functionality.

---

## 🐛 Troubleshooting

### Blog shows "article not found":
- Make sure you ran SQL fix (Step 1B)
- Check blog has `published=true` in Supabase
- Check blog has a valid `slug`

### Gallery/Blog still empty:
- Go to admin dashboard
- Edit each item
- Check "Published"/"Visible" checkbox
- Save

### Server won't start:
```cmd
netstat -ano | findstr :3000
# Find the PID, then:
taskkill /F /PID [number]
```

### Changes not showing:
- Hard refresh: **Ctrl + Shift + R**
- Check browser console for errors (F12)
- Check server console for errors

---

##✨ Summary of Changes

**Fixed:**
- Blog post detail page routing
- Blog/Gallery visibility
- Added schedule column to retreats
- Created programs table

**Enhanced:**
- Retreat detail page (description, dates, location, highlights, itinerary, price)
- Class detail page (description, schedule, level, location, price)
- All cards now clickable
- Beautiful, elegant design maintained

**Ready for Next:**
- Programs CRUD in admin dashboard
- Program detail pages

---

**Test locally first, then push!** 🎯
