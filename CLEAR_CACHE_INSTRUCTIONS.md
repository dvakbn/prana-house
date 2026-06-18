# How to See the Programs Section in Admin Dashboard

## The Problem
Your browser is showing a cached (old) version of the admin dashboard. The Programs card has been added to the code and pushed to git, but your browser hasn't loaded the new version yet.

## Quick Fix: Hard Refresh (Try This First!)

### Windows/Linux:
- Chrome/Edge: Press `Ctrl + Shift + R` or `Ctrl + F5`
- Firefox: Press `Ctrl + Shift + R` or `Ctrl + F5`

### Mac:
- Chrome/Safari: Press `Cmd + Shift + R`
- Firefox: Press `Cmd + Shift + R`

### Alternative:
Hold `Shift` and click the refresh button in your browser

---

## If Hard Refresh Doesn't Work: Clear Cache

### Chrome/Edge:
1. Press `Ctrl + Shift + Delete` (Windows) or `Cmd + Shift + Delete` (Mac)
2. Select "Cached images and files"
3. Select "All time" from the time range dropdown
4. Click "Clear data"
5. Go back to `https://pranayoga.qzz.io/admin`

### Firefox:
1. Press `Ctrl + Shift + Delete` (Windows) or `Cmd + Shift + Delete` (Mac)
2. Select "Cache"
3. Click "Clear Now"
4. Go back to `https://pranayoga.qzz.io/admin`

### Safari:
1. Go to Safari > Preferences > Privacy
2. Click "Manage Website Data"
3. Click "Remove All"
4. Go back to `https://pranayoga.qzz.io/admin`

---

## If Still Not Working: Incognito/Private Mode

1. Open an incognito/private window:
   - Chrome: `Ctrl + Shift + N`
   - Firefox: `Ctrl + Shift + P`
   - Safari: `Cmd + Shift + N`
2. Go to `https://pranayoga.qzz.io/admin`
3. Login with: admin / pranahouse2025
4. You should now see the Programs card (🌿 icon)

---

## What You Should See

After clearing cache, your admin dashboard should show **5 navigation cards**:

1. 🖼️ **Gallery** - Manage images
2. 📝 **Blog Posts** - Add & edit articles
3. 🏕️ **Retreats** - Manage retreat details
4. 🧘 **Classes** - Schedule & details
5. 🌿 **Programs** - Manage wellness programs ← **NEW!**

Click on the Programs card to see:
- Program table with all programs
- Statistics (Total Programs, Active Programs)
- "+ New Program" button
- Edit/Delete actions for each program

---

## Verifying the Deployment

If you're still having issues, you can verify the file is deployed:

1. Right-click on the admin dashboard page
2. Select "View Page Source"
3. Press `Ctrl + F` and search for "Programs"
4. You should find:
   - `data-section="programs"`
   - `Manage wellness programs`
   - `section-programs`

If you can't find these in the page source, then the deployment hasn't completed yet. Wait a few minutes and try again.

---

## Still Having Issues?

If none of the above works:

1. Check if you're logged into the correct website (`pranayoga.qzz.io`)
2. Verify you're on the `/admin` dashboard page (not `/admin/login`)
3. Try a different browser
4. Wait 5-10 minutes (Vercel deployment can take a few minutes)
5. Contact your hosting provider if deployment seems stuck

---

**Most likely solution: Hard refresh with `Ctrl + Shift + R` will fix it!** 🎉
