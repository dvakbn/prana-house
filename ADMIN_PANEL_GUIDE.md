# 🔐 Admin Panel Guide
## Prana House CMS - Content Management System

---

## 🎯 Overview

Your admin panel allows you to manage all website content without touching code:
- **Gallery**: Upload and organize images
- **Blog**: Write and publish articles
- **Retreats**: Add retreat programs with dates and details
- **Classes**: Schedule classes with pricing and details

---

## 🚀 Getting Started

### 1. Access the Admin Panel

**Login URL:** https://pranayoga.qzz.io/admin/login

**Default Credentials:**
- Username: `admin`
- Password: `pranahouse2025`

**⚠️ IMPORTANT:** Change these credentials immediately!

### 2. Change Admin Password

Update these in your `.env` file:
```env
ADMIN_USERNAME=your_username
ADMIN_PASSWORD=your_secure_password
```

Then redeploy your website.

---

## 📸 Gallery Management

### Adding Images

1. Click **"Gallery"** section
2. Click **"+ Add Image"** button
3. Fill in the form:
   - **Image URL** *(required)*: Upload to Supabase Storage or use external URL
   - **Caption**: Description of the image
   - **Category**: classes, studio, events, retreat, meditation
   - **Alt Text**: For accessibility (describes image for screen readers)
   - **Display Order**: Lower numbers appear first
   - **Visible**: Checkbox to show/hide on website

4. Click **"Save Image"**

### Image URL Options

**Option 1: Supabase Storage (Recommended)**
1. Go to Supabase Dashboard → Storage
2. Create bucket named "gallery" (if not exists)
3. Upload image
4. Copy public URL
5. Paste in "Image URL" field

**Option 2: External URL**
- Use image hosting like:
  - Cloudinary
  - Imgur
  - Google Drive (public link)
  - Any CDN

### Editing Images

1. Find image in table
2. Click **"Edit"** button
3. Update fields
4. Click **"Save Image"**

### Deleting Images

1. Find image in table
2. Click **"Delete"** button
3. Confirm deletion

---

## 📝 Blog Management

### Creating a Blog Post

1. Click **"Blog Posts"** section
2. Click **"+ New Blog Post"** button
3. Fill in the form:

**Basic Info:**
- **Title** *(required)*: Post title
- **Slug**: URL-friendly version (auto-generated if empty)
- **Author**: Writer name (default: Dr. Fareen Tak)
- **Category**: yoga, wellness, meditation, nutrition, lifestyle

**Content:**
- **Featured Image URL**: Main post image
- **Excerpt**: Short description (150 chars max)
- **Content** *(required)*: Full blog post (Markdown supported)

**Publishing:**
- **Publish immediately**: Check to publish now, uncheck for draft

4. Click **"Save Post"**

### Markdown Formatting

You can use Markdown in the content field:

```markdown
# Heading 1
## Heading 2
### Heading 3

**Bold text**
*Italic text*

- Bullet point 1
- Bullet point 2

1. Numbered item 1
2. Numbered item 2

[Link text](https://example.com)

![Image](https://image-url.com/image.jpg)
```

### Blog Post Status

- **Published**: Visible on website immediately
- **Draft**: Saved but not visible (uncheck "Publish immediately")

---

## 🏕️ Retreat Management

### Adding a Retreat

1. Click **"Retreats"** section
2. Click **"+ New Retreat"** button
3. Fill in the details:

**Basic Information:**
- **Retreat Title** *(required)*: e.g., "Weekend Wellness Retreat"
- **Start Date** *(required)*: When retreat begins
- **End Date** *(required)*: When retreat ends
- **Location** *(required)*: e.g., "Rishikesh, Uttarakhand"

**Pricing & Capacity:**
- **Price (₹)**: Cost per person
- **Max Participants**: Maximum attendees

**Details:**
- **Description**: Full retreat description
- **Program Highlights**: One highlight per line, e.g.:
  ```
  Morning yoga session
  Guided meditation
  Organic meals included
  Nature walks
  Evening relaxation
  ```
- **Image URL**: Featured retreat image

**Status:**
- **Active**: Check to show on website, uncheck to hide

4. Click **"Save Retreat"**

### Retreat Display

Retreats appear on:
- `/retreat` page
- Homepage (if upcoming)
- Automatic sorting by date

---

## 🧘 Class Management

### Adding a Class

1. Click **"Classes"** section
2. Click **"+ New Class"** button
3. Fill in the details:

**Basic Info:**
- **Class Name** *(required)*: e.g., "Morning Hatha Yoga"
- **Type** *(required)*: Online, Offline, or Hybrid
- **Level**: All Levels, Beginner, Intermediate, Advanced

**Schedule:**
- **Schedule** *(required)*: e.g., "Mon, Wed, Fri - 6:00 AM to 7:00 AM"
- **Duration (minutes)**: Class length (e.g., 60)

**Pricing:**
- **Price (₹/month)**: Monthly class fee

**Details:**
- **Description**: What the class covers, benefits, what to expect
- **Max Students**: Maximum class size

**Status:**
- **Active**: Check to accept registrations, uncheck to pause

4. Click **"Save Class"**

### Class Types

- **Online**: Live video classes (Zoom/Google Meet)
- **Offline**: In-person at Pratap Nagar, Jaipur
- **Hybrid**: Both online and offline options

---

## 🗄️ Database Structure (Supabase)

Your admin panel stores data in these tables:

### `gallery` Table
```sql
- url (text, primary key)
- caption (text)
- category (text)
- alt (text)
- sort_order (integer)
- visible (boolean)
- created_at (timestamp)
```

### `blogs` Table (Create if needed)
```sql
- id (uuid, primary key)
- title (text)
- slug (text, unique)
- author (text)
- category (text)
- image (text)
- excerpt (text)
- content (text)
- published (boolean)
- created_at (timestamp)
- updated_at (timestamp)
```

### `retreats` Table (Create if needed)
```sql
- id (uuid, primary key)
- title (text)
- start_date (date)
- end_date (date)
- location (text)
- price (integer)
- max_participants (integer)
- description (text)
- highlights (text[])
- image (text)
- active (boolean)
- created_at (timestamp)
```

### `classes` Table (Create if needed)
```sql
- id (uuid, primary key)
- name (text)
- type (text)
- level (text)
- schedule (text)
- duration (integer)
- price (integer)
- description (text)
- max_students (integer)
- active (boolean)
- created_at (timestamp)
```

---

## 🛠️ Setting Up Database Tables

If tables don't exist, create them in Supabase:

1. Go to Supabase Dashboard → SQL Editor
2. Run these queries:

**Blogs Table:**
```sql
CREATE TABLE blogs (
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
```

**Retreats Table:**
```sql
CREATE TABLE retreats (
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
```

**Classes Table:**
```sql
CREATE TABLE classes (
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
```

---

## 🔒 Security Best Practices

### 1. Change Default Password
**IMMEDIATELY** after first login, update:
```env
ADMIN_USERNAME=your_secure_username
ADMIN_PASSWORD=your_very_secure_password_123!
```

### 2. Use Strong Passwords
- Minimum 12 characters
- Mix of uppercase, lowercase, numbers, symbols
- Don't use common words
- Don't share with anyone

### 3. Regular Backups
- Export data from Supabase regularly
- Keep backups of images

### 4. Monitor Access
- Check for unusual activity
- Review admin actions regularly

### 5. Two-Factor Authentication
For production, consider adding:
- Google Authenticator
- SMS verification
- Email verification

---

## 📊 Admin Panel Features

### Current Features ✅
- ✅ Gallery image management
- ✅ Image upload via URL
- ✅ Category organization
- ✅ Visibility toggle
- ✅ Image editing & deletion
- ✅ Blog post creation interface
- ✅ Retreat management interface
- ✅ Class scheduling interface
- ✅ Responsive admin dashboard
- ✅ Dark mode support

### Coming Soon 🚀
- 📤 Direct file upload (drag & drop)
- 📊 Analytics dashboard
- 👥 User management
- 📧 Email template editor
- 📱 Mobile app
- 🔍 Search & filters
- 📈 Statistics & reports
- 🗓️ Calendar integration

---

## 🆘 Troubleshooting

### "Unauthorized" Error
- Check if you're logged in
- Login token may have expired - login again
- Check if credentials are correct

### "Failed to load data"
- Check Supabase connection
- Verify table exists in database
- Check browser console for errors

### Images Not Showing
- Verify image URL is public and accessible
- Check image format (jpg, png, webp supported)
- Try opening URL directly in browser

### Can't Save Data
- Check Supabase API keys in `.env`
- Verify table structure matches requirements
- Check browser console for detailed errors

### Dashboard Won't Load
- Clear browser cache
- Try incognito/private mode
- Check if JavaScript is enabled
- Verify server is running

---

## 📞 Support

### Need Help?
1. Check this guide first
2. Check browser console for errors (F12)
3. Check Supabase logs
4. Contact developer

### Useful Links
- **Supabase Dashboard**: https://supabase.com/dashboard
- **Markdown Guide**: https://www.markdownguide.org/
- **Image Compression**: https://tinypng.com/

---

## 🎓 Quick Tips

### Gallery
- Use descriptive captions for SEO
- Always add alt text for accessibility
- Compress images before uploading (< 500KB recommended)
- Use webP format for better performance

### Blog
- Write catchy titles (50-60 characters)
- Use headings (H2, H3) to structure content
- Add images every 300-400 words
- Include internal links to other pages
- Optimize for mobile reading

### Retreats
- Update dates regularly
- Add detailed highlights
- Include high-quality featured image
- Mention inclusions/exclusions
- Add FAQs in description

### Classes
- Be specific about timings
- Clearly state prerequisites
- Mention equipment needed
- Include pricing details
- Add instructor information

---

## 📋 Admin Workflow

### Daily Tasks
- [ ] Check new enquiries
- [ ] Respond to messages
- [ ] Review testimonials for approval

### Weekly Tasks
- [ ] Update class schedules
- [ ] Check gallery images
- [ ] Review active retreats
- [ ] Post blog content

### Monthly Tasks
- [ ] Review analytics
- [ ] Update pricing
- [ ] Plan upcoming retreats
- [ ] Backup database
- [ ] Check SEO performance

---

*Last Updated: January 2025*  
*Admin Panel Version: 1.0*  
*For: Prana House - pranayoga.qzz.io*
