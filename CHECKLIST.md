# ✅ Vercel Setup Checklist

Follow these steps in order:

---

## Step 1: Open Vercel Dashboard
- [ ] Go to https://vercel.com/dashboard
- [ ] Click on **prana-house** project
- [ ] Click **Settings** tab
- [ ] Click **Environment Variables** in sidebar

---

## Step 2: Add Environment Variables

Add each variable by clicking **"Add New"** button:

### Variable 1: SUPABASE_URL
- [ ] Key: `SUPABASE_URL`
- [ ] Value: `https://ilzhzvpgqjjkiaskhspy.supabase.co`
- [ ] Check: ✅ Production ✅ Preview (Leave Development unchecked)
- [ ] Click **Save**

### Variable 2: SUPABASE_ANON_KEY
- [ ] Key: `SUPABASE_ANON_KEY`
- [ ] Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlsemh6dnBncWpqa2lhc2toc3B5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyOTkyOTEsImV4cCI6MjA5Njg3NTI5MX0.JSr8E7lx4bIQLQB4eT9hAf0ozJRPIQbE4hFtiUq_Bz0`
- [ ] Check: ✅ Production ✅ Preview
- [ ] Click **Save**

### Variable 3: ADMIN_EMAIL
- [ ] Key: `ADMIN_EMAIL`
- [ ] Value: `yashveer.dr@gmail.com`
- [ ] Check: ✅ Production ✅ Preview
- [ ] Click **Save**

### Variable 4: ADMIN_USERNAME
- [ ] Key: `ADMIN_USERNAME`
- [ ] Value: `admin`
- [ ] Check: ✅ Production ✅ Preview
- [ ] Click **Save**

### Variable 5: ADMIN_PASSWORD
- [ ] Key: `ADMIN_PASSWORD`
- [ ] Value: `pranahouse2025`
- [ ] Check: ✅ Production ✅ Preview
- [ ] Click **Save**

### Variable 6: RESEND_API_KEY
- [ ] Key: `RESEND_API_KEY`
- [ ] Value: `re_5uDSrz2X_NXnJpEHPCvBQg34ZZPgmjfaY`
- [ ] Check: ✅ Production ✅ Preview
- [ ] Click **Save**

### Variable 7: RESEND_FROM_EMAIL
- [ ] Key: `RESEND_FROM_EMAIL`
- [ ] Value: `Prana House <hello@pranayoga.qzz.io>`
- [ ] Check: ✅ Production ✅ Preview
- [ ] Click **Save**

---

## Step 3: Verify All Variables Added
You should now see 7 environment variables in the list:
- [ ] ADMIN_EMAIL - Production, Preview
- [ ] ADMIN_PASSWORD - Production, Preview
- [ ] ADMIN_USERNAME - Production, Preview
- [ ] RESEND_API_KEY - Production, Preview
- [ ] RESEND_FROM_EMAIL - Production, Preview
- [ ] SUPABASE_ANON_KEY - Production, Preview
- [ ] SUPABASE_URL - Production, Preview

---

## Step 4: Redeploy Website
- [ ] Click **Deployments** tab (top of page)
- [ ] Click on the **latest deployment** (top one in list)
- [ ] Click the **"⋮"** (three dots menu button)
- [ ] Click **"Redeploy"**
- [ ] Click **"Redeploy"** to confirm

---

## Step 5: Wait for Deployment
- [ ] Wait 1-2 minutes for deployment to complete
- [ ] Look for green ✅ checkmark on deployment

---

## Step 6: Test Admin Panel
- [ ] Open new browser tab
- [ ] Go to: https://pranayoga.qzz.io/admin/login
- [ ] Enter username: `admin`
- [ ] Enter password: `pranahouse2025`
- [ ] Click **Login**

---

## Step 7: Test Gallery Upload
- [ ] Click **Gallery** card
- [ ] Click **"+ Add Image"** button
- [ ] Fill in form with test data:
  - Image URL: `https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800`
  - Caption: `Test Image`
  - Category: `studio`
  - Alt Text: `Yoga studio test`
  - Display Order: `1`
  - Visible: ✅ Checked
- [ ] Click **"Save Image"**
- [ ] You should see: "✅ Image saved successfully!"

---

## Step 8: Verify Image on Website
- [ ] Open https://pranayoga.qzz.io/gallery
- [ ] You should see your test image displayed

---

## 🎉 Success!
If you see the image on the gallery page, everything is working!

---

## 🔒 Step 9: Change Admin Password (Important!)
After confirming everything works:
- [ ] Go back to Vercel → Settings → Environment Variables
- [ ] Find **ADMIN_PASSWORD**
- [ ] Click **"⋮"** menu → **Edit**
- [ ] Change value to a secure password (example: `PranaHouse2025!Secure#`)
- [ ] Click **Save**
- [ ] Go to Deployments → Redeploy again

---

## ❌ If Something Goes Wrong

### Error: "Failed to connect to database"
- Double-check you added all 7 variables correctly
- Make sure you selected Production + Preview (not Development)
- Try redeploying again

### Error: "Unauthorized"
- Check ADMIN_USERNAME and ADMIN_PASSWORD are correct
- Try logging out and logging in again

### Still not working?
- Clear browser cache (Ctrl+Shift+Delete)
- Try incognito/private browsing mode
- Check Vercel deployment logs for errors
- See VERCEL_SETUP_GUIDE.md for detailed troubleshooting

---

## 📞 Need Help?
Read these files:
- **QUICK_FIX_SUMMARY.md** - Quick overview of the issue
- **VERCEL_SETUP_GUIDE.md** - Detailed instructions with explanations
- **ADMIN_PANEL_GUIDE.md** - How to use admin panel features

---

*Created: January 2025*
