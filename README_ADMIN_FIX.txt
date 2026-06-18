===============================================================================
  🚨 ADMIN DASHBOARD ERROR FIX - ACTION REQUIRED
===============================================================================

ERROR YOU'RE SEEING:
  "⚠️ Failed to load data"
  "Please check that environment variables are set in Vercel"

WHAT'S WRONG:
  The security updates need 3 environment variables to be added to Vercel.
  Without them, admin login is disabled for security.

===============================================================================
  ✅ QUICK FIX (5 minutes)
===============================================================================

STEP 1: Open Vercel
  → Go to: https://vercel.com/dashboard
  → Click on your "prana-house" project

STEP 2: Add Environment Variables
  → Click: Settings → Environment Variables
  → Click: "Add New" button
  → Add these 3 variables (copy exactly):

  Variable 1:
    Key:    ADMIN_USERNAME
    Value:  admin
    Check:  ✅ Production ✅ Preview ✅ Development

  Variable 2:
    Key:    ADMIN_PASSWORD
    Value:  pranahouse2025
    Check:  ✅ Production ✅ Preview ✅ Development

  Variable 3:
    Key:    SESSION_SECRET
    Value:  cf921693b4ea4069fbea80991619e9b637db8be575d432bb1c886ec78d9551d4c69750d06166b4010fb8f22b81cba182
    Check:  ✅ Production ✅ Preview ✅ Development

STEP 3: Wait for Auto-Deploy
  → Vercel will automatically redeploy (30-60 seconds)

STEP 4: Test Admin Login
  → Go to: https://pranayoga.qzz.io/admin/login
  → Login: admin / pranahouse2025
  → Should work! ✅

===============================================================================
  📚 MORE HELP
===============================================================================

For detailed instructions with screenshots:
  → See: VERCEL_ENV_SETUP.md

For understanding what happened:
  → See: ADMIN_DASHBOARD_FIX.md

For super quick reference:
  → See: VERCEL_QUICKSTART.md

===============================================================================
  🔒 WHAT CHANGED (Security Improvements)
===============================================================================

BEFORE:
  ❌ Password hardcoded in source code
  ❌ Weak authentication (any token worked)
  ❌ No rate limiting
  ❌ PII endpoints unprotected

AFTER:
  ✅ Password in environment variables (secure)
  ✅ HMAC-signed tokens with 8-hour expiry
  ✅ Rate limiting on all sensitive endpoints
  ✅ Protected admin endpoints with auth middleware
  ✅ Security headers (CSP, HSTS, X-Frame-Options, etc.)
  ✅ Input validation and HTML escaping
  ✅ Clean error messages (no stack trace leaks)

===============================================================================

Questions? Let me know! 👋
