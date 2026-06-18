# 📝 Setup Guide: Blogs, Retreats & Classes

## 🎯 Quick Setup (5 minutes)

You're seeing "Connect to Supabase blogs table" because the database tables don't exist yet. Let's create them!

---

## Step 1: Open Supabase Dashboard

1. Go to https://supabase.com/dashboard
2. Select your project: **ilzhzvpgqjjkiaskhspy**
3. Click **"SQL Editor"** in the left sidebar

---

## Step 2: Run SQL Setup

1. Click **"+ New query"** button
2. Copy ALL the SQL from `SUPABASE_TABLES_SETUP.sql` file
3. Paste into the SQL editor
4. Click **"Run"** button (or press Ctrl+Enter)

You should see:
```
Success. No rows returned
```

This creates 3 new tables:
- ✅ `blogs` - For blog posts
- ✅ `retreats` - For retreat programs
- ✅ `classes` - For class schedules

---

## Step 3: Verify Tables Created

Run this query to verify:

```sql
SELECT 
  table_name,
  (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = t.table_name) as column_count
FROM information_schema.tables t
WHERE table_schema = 'public' 
  AND table_type = 'BASE TABLE'
  AND table_name IN ('blogs', 'retreats', 'classes', 'gallery')
ORDER BY table_name;
```

You should see:
```
blogs        9 columns
classes      10 columns  
gallery      7 columns
retreats     11 columns
```

---

## Step 4: Deploy Updated Code

The code has been updated and pushed to GitHub. Now:

1. Go to **Vercel Dashboard**
2. Your project will auto-deploy from GitHub (wait 1-2 minutes)
3. OR manually trigger: **Deployments** → Latest → **"⋮"** → **Redeploy**

---

## Step 5: Test It!

### Test Blogs
1. Go to https://pranayoga.qzz.io/admin/login
2. Login with your credentials
3. Click **"Blog Posts"** section
4. Click **"+ New Blog Post"**
5. Fill in:
   - Title: "Welcome to Prana House Blog"
   - Category: "wellness"
   - Content: "This is our first blog post!"
   - Check "Publish immediately"
6. Click **"Save Post"**
7. You should see: **"✅ Blog post saved successfully!"**

### Test Retreats
1. Click **"Retreats"** section
2. Click **"+ New Retreat"**
3. Fill in:
   - Title: "Weekend Wellness Retreat"
   - Start Date: Pick a date
   - End Date: Pick a date
   - Location: "Rishikesh, Uttarakhand"
   - Price: 15000
   - Description: "A rejuvenating weekend getaway"
   - Check "Active"
4. Click **"Save Retreat"**
5. You should see: **"✅ Retreat saved successfully!"**

### Test Classes
1. Click **"Classes"** section
2. Click **"+ New Class"**
3. Fill in:
   - Class Name: "Morning Hatha Yoga"
   - Type: "Offline"
   - Level: "All Levels"
   - Schedule: "Mon, Wed, Fri - 6:00 AM to 7:00 AM"
   - Duration: 60
   - Price: 2000
   - Check "Active"
4. Click **"Save Class"**
5. You should see: **"✅ Class saved successfully!"**

---

## ✅ What's Now Working

After setup, your admin panel can:

### Blogs Management
- ✅ Create blog posts with Markdown content
- ✅ Edit existing posts
- ✅ Delete posts
- ✅ Publish/Draft status toggle
- ✅ Categories for organization
- ✅ Featured images
- ✅ SEO-friendly slugs

### Retreats Management
- ✅ Schedule retreats with dates
- ✅ Add location, pricing, capacity
- ✅ Multiple highlights per retreat
- ✅ Featured images
- ✅ Active/Inactive status

### Classes Management
- ✅ Create class schedules
- ✅ Online/Offline/Hybrid types
- ✅ Skill levels (Beginner/Intermediate/Advanced)
- ✅ Pricing and duration
- ✅ Max students capacity
- ✅ Active/Inactive status

### Gallery Management
- ✅ Upload images by URL
- ✅ Categorize (classes, studio, events, retreat, meditation)
- ✅ Alt text for accessibility
- ✅ Show/Hide toggle
- ✅ Custom sort order

---

## 🔍 If Something Goes Wrong

### Error: "Failed to load blogs"
**Cause:** Tables not created yet  
**Fix:** Run the SQL from Step 2 above

### Error: "relation 'blogs' does not exist"
**Cause:** SQL wasn't run or failed  
**Fix:** Go to Supabase → SQL Editor → Run `SUPABASE_TABLES_SETUP.sql`

### Error: "Unauthorized"
**Cause:** Not logged in or token expired  
**Fix:** Logout and login again

### Changes not showing on live site
**Cause:** Code not deployed yet  
**Fix:** Wait for Vercel auto-deploy or manually redeploy

---

## 📊 Database Structure

### Blogs Table
```
id              UUID (auto-generated)
title           Text (required)
slug            Text (unique, auto-generated from title)
author          Text (default: "Dr. Fareen Tak")
category        Text
image           Text (URL)
excerpt         Text (short description)
content         Text (required, supports Markdown)
published       Boolean (true/false)
created_at      Timestamp (auto)
updated_at      Timestamp (auto)
```

### Retreats Table
```
id                  UUID (auto-generated)
title               Text (required)
start_date          Date (required)
end_date            Date (required)
location            Text (required)
price               Integer
max_participants    Integer
description         Text
highlights          Text Array (list)
image               Text (URL)
active              Boolean (true/false)
created_at          Timestamp (auto)
```

### Classes Table
```
id              UUID (auto-generated)
name            Text (required)
type            Text (Online/Offline/Hybrid)
level           Text (all/beginner/intermediate/advanced)
schedule        Text (required)
duration        Integer (minutes)
price           Integer
description     Text
max_students    Integer
active          Boolean (true/false)
created_at      Timestamp (auto)
```

---

## 🎓 Tips for Content Management

### Writing Blog Posts
- Use **Markdown** for formatting
- Add `##` for headings
- Use `**bold**` and `*italic*`
- Keep excerpts under 150 characters
- Use descriptive slugs (auto-generated)

### Managing Retreats
- Add dates in YYYY-MM-DD format
- Put each highlight on a new line
- Use high-quality featured images
- Update "Active" status when full or completed

### Scheduling Classes
- Be specific with timings
- Clearly state online/offline
- Mention what students need to bring
- Set realistic max_students numbers

---

## 📱 Next Steps

After setup:

1. **Add Real Content**
   - Write your first blog post about Prana House
   - Add upcoming retreats
   - Schedule regular classes

2. **Integrate with Website**
   - Blog posts will be accessible via `/api/blogs`
   - Retreats via `/api/retreats`
   - Classes via `/api/classes`
   - Update your website pages to fetch and display this data

3. **Test Public Access**
   - Visit: https://pranayoga.qzz.io/api/blogs (should show published blogs)
   - Visit: https://pranayoga.qzz.io/api/retreats (should show active retreats)
   - Visit: https://pranayoga.qzz.io/api/classes (should show active classes)

---

## 🔒 Security Notes

- Only **published** blogs appear in public API
- Only **active** retreats and classes appear in public API
- Admin routes require authentication
- Database credentials are stored securely in environment variables

---

*Setup Guide Created: January 2025*
*For: Prana House Admin Panel*
