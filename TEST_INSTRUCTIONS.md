# 🧪 Local Testing Instructions

## ✅ What Was Changed:
1. **Redesigned retreat detail page** - More elegant with gradient hero, animated orbs, beautiful schedule cards
2. **Redesigned class detail page** - Clean, modern design with improved info cards
3. **Created SQL fix** for blog/gallery visibility issue

---

## 📋 Step 1: Fix Database (Supabase)

### Run this SQL in Supabase SQL Editor:

```sql
-- Make all existing blogs published
UPDATE blogs SET published = true WHERE published = false OR published IS NULL;

-- Make all existing gallery items visible
UPDATE gallery SET visible = true WHERE visible = false OR visible IS NULL;
```

This will make your existing blogs and gallery images visible on the website.

---

## 🖥️ Step 2: Test Locally

### Option A: If port 3000 is free
```cmd
node server.js
```

### Option B: If port 3000 is in use
```cmd
taskkill /F /IM node.exe
node server.js
```

Then open: **http://localhost:3000**

---

## ✨ Step 3: Test These Pages

1. **Blog Page** - http://localhost:3000/blog
   - Should now show all your published blog posts
   
2. **Gallery Page** - http://localhost:3000/gallery
   - Should now show all your visible images

3. **Retreat Detail** - Click any retreat card
   - Check the elegant hero design
   - Check schedule cards appear beautifully
   - Check WhatsApp button works

4. **Class Detail** - Click any class card from /classes page
   - Check the clean modern design
   - Check info cards display correctly
   - Check WhatsApp button works

---

## 🚀 Step 4: Push to Production

If everything looks good locally:

```cmd
git add .
git commit -m "Redesign detail pages and fix blog/gallery visibility"
git push
```

Wait 2 minutes for Vercel deployment, then hard refresh your browser (Ctrl+Shift+R).

---

## 🐛 Troubleshooting

### If blogs/gallery still empty:
1. Go to admin dashboard
2. Check if data exists in the tables
3. Edit one item and make sure "Published"/"Visible" checkbox is checked
4. Save and refresh the page

### If server won't start:
```cmd
# Kill all node processes
taskkill /F /IM node.exe

# Try again
node server.js
```

### If port 3000 is occupied:
The deployed version is probably running. Stop it or use a different terminal.

---

## ✅ Checklist Before Pushing:

- [ ] Ran SQL fix in Supabase
- [ ] Blogs appear on /blog page
- [ ] Gallery images appear on /gallery page
- [ ] Retreat detail page looks elegant
- [ ] Class detail page looks elegant
- [ ] All WhatsApp buttons work
- [ ] Cards are clickable
- [ ] Mobile responsive (resize browser)

---

Once all checks pass, you're good to push! 🎉
