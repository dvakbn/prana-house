# Vercel Environment Variables Setup

## ⚠️ Required After Security Update

The recent security fixes require these environment variables to be set in Vercel. Without them, admin login will be disabled.

---

## Step-by-Step Instructions

### 1. Open Vercel Dashboard
Go to: https://vercel.com/dashboard

### 2. Select Your Project
Click on your **prana-house** project

### 3. Go to Settings → Environment Variables
- Click **Settings** in the top menu
- Click **Environment Variables** in the left sidebar

### 4. Add These Variables

Click **Add New** for each variable:

#### **ADMIN_PASSWORD** (required)
- **Key**: `ADMIN_PASSWORD`
- **Value**: `pranahouse2025` (or change to a stronger password)
- **Environment**: Check all three: Production, Preview, Development

#### **SESSION_SECRET** (required)
- **Key**: `SESSION_SECRET`
- **Value**: `cf921693b4ea4069fbea80991619e9b637db8be575d432bb1c886ec78d9551d4c69750d06166b4010fb8f22b81cba182`
- **Environment**: Check all three: Production, Preview, Development

#### **ADMIN_USERNAME** (if not already set)
- **Key**: `ADMIN_USERNAME`
- **Value**: `admin`
- **Environment**: Check all three

---

## Verify These Are Already Set

Make sure these are already configured (they should be):
- ✅ `SUPABASE_URL`
- ✅ `SUPABASE_ANON_KEY`
- ✅ `RESEND_API_KEY`
- ✅ `RESEND_FROM_EMAIL`
- ✅ `ADMIN_EMAIL`

---

## 5. Redeploy

After adding the environment variables:

**Option A: Automatic (Recommended)**
- Vercel will automatically redeploy when you add/change env vars
- Wait 30-60 seconds for the deployment to complete

**Option B: Manual**
- Go to **Deployments** tab
- Click the three dots (**...**) on the latest deployment
- Click **Redeploy**

---

## 6. Test Admin Login

1. Visit: `https://pranayoga.qzz.io/admin/login`
2. Login with:
   - Username: `admin`
   - Password: `pranahouse2025` (or whatever you set)
3. You should see the admin dashboard

---

## ❓ Still Getting the Error?

If you still see "Failed to connect to database":

1. **Check the Vercel logs:**
   - Go to your project → Deployments
   - Click on the latest deployment
   - Click "View Function Logs"
   - Look for error messages

2. **Common issues:**
   - Forgot to check "Production" when adding env vars
   - Deployment hasn't finished yet (wait 1 minute)
   - Typo in variable name (must be EXACT: `ADMIN_PASSWORD` not `ADMIN_PASS`)

3. **Verify environment variables are set:**
   - Settings → Environment Variables
   - You should see `ADMIN_PASSWORD`, `SESSION_SECRET`, and `ADMIN_USERNAME` listed

---

## 🔐 Security Notes

- **Don't share these values** — especially `SESSION_SECRET` and your Supabase keys
- **Change the default password** — `pranahouse2025` is in the example and should be changed to something stronger
- **SESSION_SECRET** is the key that signs your admin session tokens — keep it private and don't change it unless you want to log out all admins

---

## Generate a New SESSION_SECRET (Optional)

If you want to generate your own random secret instead of using the one above:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

Copy the output and use it as your `SESSION_SECRET` value.

---

**After following these steps, your admin dashboard will work again with much stronger security! 🔒**
