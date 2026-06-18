# 🔧 Create Supabase Tables - Step by Step

## ⚠️ IMPORTANT: Run Each Query Separately

Don't copy all at once! Run one query at a time.

---

## Step 1: Create Blogs Table

Copy and run this FIRST:

```sql
CREATE TABLE IF NOT EXISTS blogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  author TEXT DEFAULT 'Dr. Fareen Tak',
  category TEXT,
  image TEXT,
  excerpt TEXT,
  content TEXT NOT NULL,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_blogs_published ON blogs(published);
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_created_at ON blogs(created_at DESC);
```

✅ You should see: **"Success. No rows returned"**

---

## Step 2: Create Retreats Table

Copy and run this SECOND:

```sql
CREATE TABLE IF NOT EXISTS retreats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  location TEXT NOT NULL,
  price INTEGER,
  max_participants INTEGER,
  description TEXT,
  highlights TEXT[],
  image TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_retreats_active ON retreats(active);
CREATE INDEX IF NOT EXISTS idx_retreats_start_date ON retreats(start_date DESC);
```

✅ You should see: **"Success. No rows returned"**

---

## Step 3: Create Classes Table

Copy and run this THIRD:

```sql
CREATE TABLE IF NOT EXISTS classes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  level TEXT DEFAULT 'all',
  schedule TEXT NOT NULL,
  duration INTEGER,
  price INTEGER,
  description TEXT,
  max_students INTEGER,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_classes_active ON classes(active);
CREATE INDEX IF NOT EXISTS idx_classes_type ON classes(type);
```

✅ You should see: **"Success. No rows returned"**

---

## Step 4: Verify Tables Created

Copy and run this LAST to verify:

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

✅ You should see 4 tables:
```
blogs        9 columns
classes     10 columns
gallery      7 columns
retreats    11 columns
```

---

## 🎉 All Done!

Now test your admin panel:
1. Go to https://pranayoga.qzz.io/admin/login
2. Login
3. Try adding a blog post
4. You should see: **"✅ Blog post saved successfully!"**

---

## 🆘 If You Get Errors

### Error: "relation already exists"
- **Solution:** The table is already created, skip to next step

### Error: "permission denied"
- **Solution:** Make sure you're using the right Supabase project

### Error: "syntax error"
- **Solution:** Make sure you copied the entire query including all lines

---

*Quick Setup Guide - Run queries one at a time!*
