# 🔧 Fix Admin Dashboard Error on Vercel

## What Happened?
The security updates I added require environment variables to be set. Without them, the admin login is disabled for security reasons.

---

## What You Need to Do

Add **3 environment variables** to your Vercel project:

```
ADMIN_USERNAME = admin
ADMIN_PASSWORD = pranahouse2025
SESSION_SECRET = cf921693b4ea4069fbea80991619e9b637db8be575d432bb1c886ec78d9551d4c69750d06166b4010fb8f22b81cba182
```

---

## How to Add Them (2 minutes)

### Option A: Quick Link (If you know your project URL)
Go directly to your project settings:
```
https://vercel.com/[your-username]/prana-house/settings/environment-variables
```

### Option B: Step by Step
1. **Open Vercel**: https://vercel.com/dashboard
2. **Click** on "prana-house" project
3. **Go to**: Settings → Environment Variables
4. **Click**: "Add New" button
5. **Add each variable** (copy from above)
   - Make sure to check: ✅ Production ✅ Preview ✅ Development
6. **Wait** 30-60 seconds for auto-redeploy

---

## Test It

After adding the variables:

1. Visit: **https://pranayoga.qzz.io/admin/login**
2. Login:
   - Username: `admin`
   - Password: `pranahouse2025`
3. ✅ You should see the admin dashboard!

---

## Why This Happened

Before the security update:
- ❌ Password was hardcoded in the code
- ❌ Anyone could bypass authentication
- ❌ Not secure for production

After the security update:
- ✅ Password stored securely in environment variables
- ✅ Token-based authentication (HMAC signed, 8-hour expiry)
- ✅ Rate limiting on login attempts
- ✅ Protected PII endpoints
- ✅ Security headers (CSP, HSTS, etc.)

**Trade-off:** You need to configure environment variables once, but the site is much more secure! 🔒

---

## Files to Reference

- **Quick Guide**: `VERCEL_QUICKSTART.md` (5-minute fix)
- **Detailed Guide**: `VERCEL_ENV_SETUP.md` (with screenshots and troubleshooting)
- **Environment Template**: `.env.example` (for local development)

---

## Need Help?

If it's still not working after adding the variables:

1. Check Vercel logs: Deployments → Latest → "View Function Logs"
2. Verify variables are set: Settings → Environment Variables
3. Try manual redeploy: Deployments → ... menu → "Redeploy"

Let me know if you see any error messages! 👋
