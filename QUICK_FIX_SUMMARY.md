# 🔧 Quick Fix Summary - Gallery Upload Issue

## 🎯 The Problem
When you try to upload images in the admin panel on the live website (pranayoga.qzz.io), you get an error asking to "connect to Supabase".

## ✅ The Solution
Your Supabase connection is working fine locally, but **Vercel doesn't have your environment variables yet**.

---

## 📋 What You Need To Do

### 1. Go to Vercel Dashboard
- Open: https://vercel.com/dashboard
- Click your **prana-house** project
- Go to **Settings** → **Environment Variables**

### 2. Add These 7 Variables

For each variable below, click **"Add New"** and:
- Select ✅ **Production** and ✅ **Preview** 
- **DO NOT** check Development (it's locked - this is normal!)

| Key | Value |
|-----|-------|
| `SUPABASE_URL` | `https://ilzhzvpgqjjkiaskhspy.supabase.co` |
| `SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlsemh6dnBncWpqa2lhc2toc3B5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyOTkyOTEsImV4cCI6MjA5Njg3NTI5MX0.JSr8E7lx4bIQLQB4eT9hAf0ozJRPIQbE4hFtiUq_Bz0` |
| `ADMIN_EMAIL` | `yashveer.dr@gmail.com` |
| `ADMIN_USERNAME` | `admin` |
| `ADMIN_PASSWORD` | `pranahouse2025` |
| `RESEND_API_KEY` | `re_5uDSrz2X_NXnJpEHPCvBQg34ZZPgmjfaY` |
| `RESEND_FROM_EMAIL` | `Prana House <hello@pranayoga.qzz.io>` |

### 3. Redeploy
After adding all variables:
- Go to **Deployments** tab
- Click latest deployment → **"⋮"** menu → **Redeploy**

### 4. Test
- Wait 2 minutes for deployment
- Go to: https://pranayoga.qzz.io/admin/login
- Login with: username `admin`, password `pranahouse2025`
- Try adding an image

---

## 📖 Detailed Instructions

See **VERCEL_SETUP_GUIDE.md** for:
- Step-by-step screenshots guide
- Troubleshooting tips
- How to add your first image
- Security best practices

---

## ❓ Common Questions

**Q: Why is Development environment locked?**  
A: This is normal Vercel security. Use Production + Preview only.

**Q: Do I need all 7 variables?**  
A: Yes, all 7 are required for admin panel to work.

**Q: Can I see the variables after adding?**  
A: Values are hidden (•••••) for security - this is normal!

**Q: What if I make a typo?**  
A: Click the **"⋮"** menu next to the variable and select "Edit"

---

## ✅ After Setup

Once working:
1. Change `ADMIN_PASSWORD` to something more secure
2. Upload your first gallery images
3. Start managing your website content!

---

## 📂 Related Files
- `VERCEL_SETUP_GUIDE.md` - Detailed setup instructions
- `ADMIN_PANEL_GUIDE.md` - How to use admin panel
- `.env` - Your local environment variables (DO NOT commit to Git!)

---

*Issue Fixed: January 2025*
