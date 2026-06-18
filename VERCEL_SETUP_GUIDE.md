# 🚀 Vercel Environment Variables Setup Guide

## ❗ ISSUE
When you try to upload images to the gallery on the live site, you get an error asking to connect to Supabase. This is because Vercel doesn't have your environment variables yet.

---

## ✅ SOLUTION: Add Environment Variables to Vercel

### Step 1: Open Vercel Dashboard
1. Go to https://vercel.com/dashboard
2. Click on your **prana-house** project
3. Click on **"Settings"** tab at the top
4. Click on **"Environment Variables"** in the left sidebar

### Step 2: Add These Variables

Click **"Add New"** button for each variable below:

#### Variable 1: SUPABASE_URL
- **Key**: `SUPABASE_URL`
- **Value**: `https://ilzhzvpgqjjkiaskhspy.supabase.co`
- **Environment**: Check ✅ **Production** and ✅ **Preview**
- **Don't check Development** (it's locked - this is NORMAL!)
- Click **Save**

#### Variable 2: SUPABASE_ANON_KEY
- **Key**: `SUPABASE_ANON_KEY`
- **Value**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlsemh6dnBncWpqa2lhc2toc3B5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyOTkyOTEsImV4cCI6MjA5Njg3NTI5MX0.JSr8E7lx4bIQLQB4eT9hAf0ozJRPIQbE4hFtiUq_Bz0`
- **Environment**: ✅ **Production** and ✅ **Preview**
- Click **Save**

#### Variable 3: ADMIN_EMAIL
- **Key**: `ADMIN_EMAIL`
- **Value**: `yashveer.dr@gmail.com`
- **Environment**: ✅ **Production** and ✅ **Preview**
- Click **Save**

#### Variable 4: ADMIN_USERNAME
- **Key**: `ADMIN_USERNAME`
- **Value**: `admin`
- **Environment**: ✅ **Production** and ✅ **Preview**
- Click **Save**

#### Variable 5: ADMIN_PASSWORD
- **Key**: `ADMIN_PASSWORD`
- **Value**: `pranahouse2025`
- **Environment**: ✅ **Production** and ✅ **Preview**
- **⚠️ IMPORTANT**: Change this password after first login!
- Click **Save**

#### Variable 6: RESEND_API_KEY
- **Key**: `RESEND_API_KEY`
- **Value**: `re_5uDSrz2X_NXnJpEHPCvBQg34ZZPgmjfaY`
- **Environment**: ✅ **Production** and ✅ **Preview**
- Click **Save**

#### Variable 7: RESEND_FROM_EMAIL
- **Key**: `RESEND_FROM_EMAIL`
- **Value**: `Prana House <hello@pranayoga.qzz.io>`
- **Environment**: ✅ **Production** and ✅ **Preview**
- Click **Save**

---

## 🔄 Step 3: Redeploy Your Site

After adding all variables:

### Option A: Automatic Redeploy
1. Go to **"Deployments"** tab in Vercel
2. Click on the latest deployment
3. Click the **"⋮"** (three dots) menu
4. Click **"Redeploy"**
5. Confirm redeploy

### Option B: Push to Git (will trigger auto-deploy)
1. Make any small change (like add a space in README)
2. Commit and push to GitHub
3. Vercel will auto-deploy

---

## ✅ Step 4: Test Your Admin Panel

1. Wait 1-2 minutes for deployment to finish
2. Go to: **https://pranayoga.qzz.io/admin/login**
3. Login with:
   - Username: `admin`
   - Password: `pranahouse2025`
4. Click **Gallery** section
5. Click **"+ Add Image"** button
6. Fill in form and save

If it works, you'll see "Image saved successfully!" ✅

---

## 📊 What You Should See in Vercel

After adding all variables, your Environment Variables page should show:

```
ADMIN_EMAIL                Production, Preview
ADMIN_PASSWORD             Production, Preview  
ADMIN_USERNAME             Production, Preview
RESEND_API_KEY             Production, Preview
RESEND_FROM_EMAIL          Production, Preview
SUPABASE_ANON_KEY          Production, Preview
SUPABASE_URL               Production, Preview
```

**NOTE:** The values are hidden (showing •••••) for security. This is normal!

---

## ❓ Frequently Asked Questions

### Q: Why is Development environment locked?
**A:** This is NORMAL Vercel behavior for security. Sensitive environment variables can only be added to Production and Preview environments. Development uses your local `.env` file.

### Q: I can't see my old variables?
**A:** If you see "Sensitive environment variables cannot be created in the Development environment", you were trying to add to Development. Just select Production and Preview instead.

### Q: Do I need to add variables one by one?
**A:** Yes, Vercel doesn't support bulk import in the UI. You need to add each one separately.

### Q: What if I make a typo in a variable?
**A:** You can edit existing variables. Click the **"⋮"** menu next to the variable and select **"Edit"**.

### Q: Can I delete the old incomplete variables?
**A:** Yes, if you have any partial/wrong variables, click **"⋮"** menu and select **"Delete"**.

---

## 🔐 Security Reminder

After you successfully login to admin panel:

1. Go to your project settings
2. Update `ADMIN_PASSWORD` to something more secure
3. Redeploy the site

**Suggested password format:**
- At least 12 characters
- Mix of uppercase, lowercase, numbers, symbols
- Example: `PranaHouse2025!Secure#`

---

## 🆘 Still Having Issues?

### Error: "Failed to load gallery"
- **Solution**: Wait 2-3 minutes after redeploy for environment variables to take effect
- Try clearing browser cache (Ctrl+Shift+Delete)
- Try incognito/private browsing mode

### Error: "Unauthorized"
- **Solution**: Check that `ADMIN_USERNAME` and `ADMIN_PASSWORD` are set correctly
- Make sure you redeployed after adding variables

### Error: "Connect to Supabase"
- **Solution**: Verify `SUPABASE_URL` and `SUPABASE_ANON_KEY` are added correctly
- Check for any extra spaces in the values

### Gallery table is empty after successful connection
- **Solution**: This is normal! The gallery table exists but has no images yet
- Just add your first image through the admin panel

---

## 📸 After Setup: Adding Your First Gallery Image

Once environment variables are set and site is redeployed:

1. Login to admin panel
2. Click **Gallery** section
3. Click **"+ Add Image"**
4. For testing, use a sample image URL:
   ```
   https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800
   ```
5. Fill in:
   - Caption: "Test Image"
   - Category: "studio"
   - Alt Text: "Yoga studio"
   - Display Order: 1
   - Visible: ✅ Checked
6. Click **"Save Image"**

If you see "Image saved successfully!" - you're all set! 🎉

---

*Created: January 2025*
*For: Prana House - pranayoga.qzz.io*
