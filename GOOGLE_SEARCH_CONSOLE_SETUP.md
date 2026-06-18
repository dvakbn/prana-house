# Google Search Console Setup Guide
## For Prana House (pranayoga.qzz.io)

---

## 🎯 What is Google Search Console?

Google Search Console (GSC) is a free tool that helps you monitor, maintain, and troubleshoot your site's presence in Google Search results. It's **essential** for SEO success.

---

## 📋 Setup Steps

### Step 1: Access Google Search Console
1. Go to: https://search.google.com/search-console
2. Sign in with your Google account (use the email associated with the business)

### Step 2: Add Your Property
1. Click **"Add Property"**
2. Choose **"URL prefix"** (recommended for beginners)
3. Enter: `https://pranayoga.qzz.io`
4. Click **Continue**

### Step 3: Verify Ownership

You have **5 verification methods**. Choose the easiest:

#### ✅ **Method 1: HTML File Upload (Recommended)**
1. Download the verification HTML file from GSC
2. Upload it to `/public/` folder (e.g., `google1234567890.html`)
3. Ensure it's accessible at: `https://pranayoga.qzz.io/google1234567890.html`
4. Click **Verify** in GSC

**Server Code (if needed):**
```javascript
// Already handled by express.static middleware
app.use(express.static(path.join(__dirname, 'public')));
```

#### **Method 2: HTML Tag** (Alternative)
Add this meta tag to the `<head>` section of your homepage:
```html
<meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
```

#### **Method 3: Google Analytics** (If using GA)
If you've already set up Google Analytics, GSC can verify automatically.

#### **Method 4: Google Tag Manager** (If using GTM)
Similar to GA method.

#### **Method 5: DNS Record** (Advanced)
Add a TXT record to your domain DNS settings.

---

## 🚀 Post-Verification Steps

### 1. Submit Your Sitemap
1. In GSC, go to **Sitemaps** (left sidebar)
2. Enter: `sitemap.xml`
3. Click **Submit**

Expected Result: Google will start crawling and indexing your pages.

### 2. Check Coverage
1. Go to **Coverage** or **Pages** section
2. Wait 2-3 days for initial crawl
3. Check for:
   - ✅ Valid pages (green)
   - ⚠️ Warnings (yellow)
   - ❌ Errors (red)

### 3. Request Indexing (Optional)
For important pages, request immediate indexing:
1. Go to **URL Inspection** tool
2. Enter the page URL
3. Click **Request Indexing**

Pages to prioritize:
- https://pranayoga.qzz.io/ (Homepage)
- https://pranayoga.qzz.io/classes
- https://pranayoga.qzz.io/contact
- https://pranayoga.qzz.io/about

---

## 📊 Key Metrics to Monitor

### 1. **Performance Report**
- **Total Clicks**: How many people clicked your site in search results
- **Total Impressions**: How many times your site appeared in search
- **Average CTR**: Click-through rate (aim for 2-5%)
- **Average Position**: Where you rank on average (aim for top 10 = first page)

**Check:** Weekly for the first month, then monthly.

### 2. **Coverage/Index Coverage**
- How many pages are indexed
- Any crawl errors
- Pages excluded from indexing

**Check:** Weekly.

### 3. **Mobile Usability**
- Ensure all pages are mobile-friendly
- Fix any mobile issues immediately

**Check:** Monthly.

### 4. **Core Web Vitals**
- Page loading speed
- Interactivity
- Visual stability

**Check:** Monthly.

---

## 🔍 Search Console Features You Should Use

### **URL Inspection Tool**
Test how Google sees a specific page:
1. Enter any URL from your site
2. See if it's indexed
3. View rendered HTML
4. Request indexing

### **Performance Report**
See which keywords bring traffic:
1. Go to **Performance**
2. Filter by **Queries** (keywords)
3. Identify top-performing keywords
4. Find opportunities (high impressions, low clicks)

### **Sitemaps**
Monitor sitemap submission status:
- Check if sitemap was successfully processed
- See how many URLs were discovered
- Identify any sitemap errors

### **Links Report**
See who's linking to you:
- External links (backlinks)
- Internal links
- Top linked pages

### **Manual Actions**
Check for Google penalties (hopefully none!):
- Should show "No issues detected"
- If there are issues, follow Google's instructions

---

## 🐛 Common Issues & Fixes

### Issue 1: "Sitemap could not be read"
**Fix:**
- Verify sitemap is accessible: `https://pranayoga.qzz.io/sitemap.xml`
- Check XML syntax is valid
- Ensure proper content-type header: `application/xml`

### Issue 2: "Submitted URL not found (404)"
**Fix:**
- Check if the page exists
- Verify server routing is correct
- Update sitemap if page was removed

### Issue 3: "Crawled - currently not indexed"
**Reasons:**
- Page quality issues
- Duplicate content
- Thin content (too little text)

**Fix:**
- Add more unique, valuable content
- Improve page quality
- Wait (can take weeks)

### Issue 4: "Server error (5xx)"
**Fix:**
- Check server logs
- Ensure server is stable
- Contact hosting provider if persistent

### Issue 5: "Mobile usability errors"
**Fix:**
- Test on mobile devices
- Fix viewport issues
- Ensure buttons are tappable
- Improve font sizes

---

## 📈 SEO Monitoring Routine

### Daily (First Week)
- [ ] Check for critical errors
- [ ] Monitor indexing progress

### Weekly (First Month)
- [ ] Review Performance metrics
- [ ] Check Coverage report
- [ ] Fix any new errors
- [ ] Request indexing for new pages

### Monthly (Ongoing)
- [ ] Analyze keyword performance
- [ ] Review Core Web Vitals
- [ ] Check for manual actions
- [ ] Monitor backlinks
- [ ] Update content based on insights

---

## 🎓 Learning Resources

### Google's Official Guides
1. **Search Console Help**: https://support.google.com/webmasters
2. **SEO Starter Guide**: https://developers.google.com/search/docs/beginner/seo-starter-guide
3. **Search Console Training**: https://www.youtube.com/playlist?list=PLKoqnv2vTMUOnQn-lNDfT7aXGTzSDq5gv

### Useful Tools
- **Google Search Console**: https://search.google.com/search-console
- **Google Analytics**: https://analytics.google.com
- **PageSpeed Insights**: https://pagespeed.web.dev
- **Mobile-Friendly Test**: https://search.google.com/test/mobile-friendly
- **Rich Results Test**: https://search.google.com/test/rich-results

---

## ✅ Verification Checklist

Before submitting to Google:
- [ ] robots.txt is accessible and correct
- [ ] sitemap.xml is accessible and valid
- [ ] All pages have unique titles and descriptions
- [ ] Structured data is implemented correctly
- [ ] No broken links (404s)
- [ ] Site is mobile-friendly
- [ ] Pages load fast (< 3 seconds)
- [ ] HTTPS is enabled (SSL certificate)
- [ ] All images have alt text
- [ ] Contact information is visible

---

## 📞 Need Help?

If you encounter issues:
1. Check **Google Search Console Help Center**
2. Post in **Google Search Central Community**: https://support.google.com/webmasters/community
3. Hire an SEO consultant for complex issues

---

## 🎉 Expected Timeline

- **Week 1**: Sitemap submitted, initial crawl begins
- **Week 2-3**: Pages start appearing in index
- **Month 1-2**: First impressions and clicks in search results
- **Month 3-4**: Rankings improve for long-tail keywords
- **Month 6+**: Established presence for competitive keywords

**Note**: SEO is a long-term strategy. Don't expect overnight results!

---

## 📊 Sample GSC Report Interpretation

### Example Performance Data:
```
Queries:
1. "yoga classes jaipur" - 150 impressions, 5 clicks, 3.3% CTR, Position 12
2. "pranayama classes" - 80 impressions, 8 clicks, 10% CTR, Position 8
3. "dr fareen tak" - 50 impressions, 15 clicks, 30% CTR, Position 2
```

**Analysis:**
- **Query 1**: High impressions, low CTR → Improve meta description, get to first page (position 1-10)
- **Query 2**: Good CTR, decent position → Create more content around pranayama
- **Query 3**: Excellent CTR → You're ranking well for branded search (good!)

---

## 🔐 Important Notes

1. **Never share** your Search Console access credentials
2. **Add multiple users** (team members) with appropriate permissions
3. **Set up email notifications** for critical issues
4. **Export data regularly** for historical comparison
5. **Link Search Console to Google Analytics** for deeper insights

---

## 🚨 Red Flags to Watch For

- Sudden drop in impressions (de-indexing?)
- Manual action penalty
- Security issues notification
- Significant drop in CTR
- Crawl errors increasing over time

**Action**: Address immediately if any of these occur.

---

*Good luck with your SEO journey!*  
*Domain: pranayoga.qzz.io*  
*Last Updated: January 2025*
