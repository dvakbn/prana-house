# 🚀 Quick Fix: Admin Dashboard Not Working on Vercel

## The Problem
After deploying the security updates, the admin dashboard shows an error because it needs environment variables that aren't set in Vercel yet.

---

## The Solution (5 minutes)

### Step 1: Go to Vercel Dashboard
Visit: **https://vercel.com/dashboard**

### Step 2: Find Your Project
Click on your **prana-house** project

### Step 3: Add Environment Variables
1. Click **Settings** (top menu)
2. Click **Environment Variables** (left sidebar)
3. Click **Add New** button

### Step 4: Add These 3 Variables

Copy and paste these exactly:

#### Variable 1:
- **Key**: `ADMIN_PASSWORD`
- **Value**: `pranahouse2025`
- **Environments**: ✅ Production ✅ Preview ✅ Development

#### Variable 2:
- **Key**: `SESSION_SECRET`
- **Value**: `cf921693b4ea4069fbea80991619e9b637db8be575d432bb1c886ec78d9551d4c69750d06166b4010fb8f22b81cba182`
- **Environments**: ✅ Production ✅ Preview ✅ Development

#### Variable 3:
- **Key**: `ADMIN_USERNAME`
- **Value**: `admin`
- **Environments**: ✅ Production ✅ Preview ✅ Development

### Step 5: Wait for Deployment
Vercel will automatically redeploy (takes 30-60 seconds)

### Step 6: Test It
1. Go to: `https://pranayoga.qzz.io/admin/login`
2. Login with:
   - Username: `admin`
   - Password: `pranahouse2025`
3. Should work! ✅

---

## Still Not Working?

### Check if variables are actually set:
1. Go to your project in Vercel
2. Settings → Environment Variables
3. You should see all 3 variables listed
4. Make sure "Production" is checked for each one

### Force a redeploy:
1. Go to **Deployments** tab
2. Click the **...** menu on the latest deployment
3. Click **Redeploy**
4. Wait 1 minute

### View error logs:
1. Go to **Deployments** tab
2. Click on the latest deployment
3. Click **View Function Logs**
4. Look for red error messages

---

## Security Note 🔒

After you confirm it's working, **change the password** from `pranahouse2025` to something stronger! 

Just update the `ADMIN_PASSWORD` value in Vercel's environment variables.

---

**Need more details?** See `VERCEL_ENV_SETUP.md` for the complete guide.
