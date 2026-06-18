# Email Deliverability Fix - Prevent Emails Going to Spam

## 🚨 Problem
Emails sent from Prana House website are landing in spam folders.

## 🎯 Root Causes
1. Using Resend's default "onboarding@resend.dev" address
2. No domain authentication (SPF, DKIM, DMARC)
3. Generic "from" name
4. Possible content triggers

---

## ✅ SOLUTION: Complete Fix Guide

### Step 1: Set Up Your Own Domain in Resend (CRITICAL)

#### Option A: Use Your Domain (pranahouse.in or pranayoga.qzz.io) - RECOMMENDED

1. **Go to Resend Dashboard:**
   - Login at: https://resend.com/login
   - Navigate to **Domains** section

2. **Add Your Domain:**
   - Click **"Add Domain"**
   - Enter: `pranahouse.in` (or `pranayoga.qzz.io`)
   - Click **"Add Domain"**

3. **Add DNS Records:**
   Resend will give you 3 DNS records to add:

   **SPF Record (TXT):**
   ```
   Type: TXT
   Name: @
   Value: v=spf1 include:_spf.resend.com ~all
   TTL: 3600
   ```

   **DKIM Record (TXT):**
   ```
   Type: TXT
   Name: resend._domainkey
   Value: [Resend will provide this - it's long]
   TTL: 3600
   ```

   **DMARC Record (TXT):**
   ```
   Type: TXT
   Name: _dmarc
   Value: v=DMARC1; p=none; rua=mailto:yashveer.dr@gmail.com
   TTL: 3600
   ```

4. **Where to Add DNS Records:**
   - Go to your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.)
   - Find "DNS Management" or "DNS Settings"
   - Add the 3 records provided by Resend
   - Wait 24-48 hours for propagation (usually faster)

5. **Verify Domain in Resend:**
   - Once DNS records are added, click "Verify" in Resend
   - Status should change to "Verified" ✅

6. **Update Your .env File:**
   ```env
   RESEND_FROM_EMAIL=Prana House <hello@pranahouse.in>
   ```

#### Option B: Use Verified Email Address (Temporary Solution)

If you don't have domain access right now:

1. **In Resend Dashboard:**
   - Go to **"Emails"** section
   - Click **"Verify Email Address"**
   - Enter: `yashveer.dr@gmail.com`
   - Check your Gmail for verification email
   - Click the verification link

2. **Update .env:**
   ```env
   RESEND_FROM_EMAIL=Prana House <yashveer.dr@gmail.com>
   ```

**Note:** This is a temporary fix. Domain verification is much better for deliverability.

---

### Step 2: Update Email Content (Avoid Spam Triggers)

I'll update your email templates to avoid spam triggers:

#### Common Spam Triggers to Avoid:
- ❌ ALL CAPS SUBJECT LINES
- ❌ Too many exclamation marks!!!
- ❌ Words like "FREE", "CLICK HERE", "ACT NOW"
- ❌ Too many links
- ❌ Large images without text
- ❌ Misleading subject lines

#### Best Practices:
- ✅ Personalized content
- ✅ Clear unsubscribe link
- ✅ Proper text-to-image ratio
- ✅ Valid HTML structure
- ✅ Consistent "From" name and email

---

### Step 3: Improve Email Reputation

1. **Warm Up Your Domain:**
   - Start by sending to a small number of people
   - Gradually increase volume over 2-4 weeks

2. **Monitor Bounce Rates:**
   - Keep bounce rate < 5%
   - Remove invalid email addresses

3. **Engagement Matters:**
   - Ask recipients to "Reply" or add to contacts
   - Good open rates improve reputation

4. **Add Unsubscribe Link:**
   Already included in your footer ✅

---

### Step 4: Test Email Deliverability

Before going live, test your emails:

#### Free Testing Tools:

1. **Mail Tester** (https://www.mail-tester.com)
   - Send a test email to the address they provide
   - Get a spam score out of 10
   - Aim for 8/10 or higher

2. **Gmail Postmaster Tools** (https://postmaster.google.com)
   - Monitor your domain reputation
   - See spam rates
   - Track authentication issues

3. **Send Test Emails:**
   ```
   Test to:
   - Gmail account
   - Outlook account
   - Yahoo account
   - Check spam folder for each
   ```

---

## 🛠️ Immediate Actions (Do This Now)

### Priority 1: Update FROM Email Address

Open your `.env` file and change:

**FROM:**
```env
RESEND_FROM_EMAIL=Prana House <onboarding@resend.dev>
```

**TO (choose one):**

**Option A - If domain verified:**
```env
RESEND_FROM_EMAIL=Prana House <hello@pranahouse.in>
```

**Option B - If using verified email:**
```env
RESEND_FROM_EMAIL=Prana House <yashveer.dr@gmail.com>
```

**Option C - If domain NOT ready yet:**
```env
RESEND_FROM_EMAIL=Prana House Yoga <no-reply@pranayoga.qzz.io>
```

---

## 📋 Complete Setup Checklist

### Domain Authentication (CRITICAL)
- [ ] Add domain to Resend
- [ ] Add SPF record to DNS
- [ ] Add DKIM record to DNS
- [ ] Add DMARC record to DNS
- [ ] Wait for DNS propagation (24-48 hours)
- [ ] Verify domain in Resend
- [ ] Update FROM_EMAIL in .env

### Email Content
- [ ] Professional subject lines
- [ ] Clear sender name
- [ ] Personalized content
- [ ] Unsubscribe link present
- [ ] No spam trigger words
- [ ] Good text-to-image ratio

### Testing
- [ ] Send test email to Gmail
- [ ] Send test email to Outlook
- [ ] Check spam folders
- [ ] Test with Mail-Tester.com
- [ ] Verify all links work
- [ ] Test on mobile devices

### Monitoring
- [ ] Set up Gmail Postmaster Tools
- [ ] Monitor bounce rates in Resend
- [ ] Track open rates
- [ ] Check spam complaints
- [ ] Ask recipients to add to contacts

---

## 🔍 Troubleshooting Common Issues

### Issue 1: Still Going to Spam After Domain Verification
**Solution:**
- Wait 24-48 hours after DNS changes
- Check DNS propagation: https://dnschecker.org
- Verify all 3 records (SPF, DKIM, DMARC) are correct
- Test email content with Mail-Tester

### Issue 2: "Authentication Failed" Error
**Solution:**
- Double-check DNS records match exactly
- Wait longer for DNS propagation
- Contact Resend support

### Issue 3: High Bounce Rate
**Solution:**
- Validate email addresses before sending
- Remove invalid emails from list
- Use double opt-in for newsletter

### Issue 4: Gmail Specifically Marks as Spam
**Solution:**
- Register with Gmail Postmaster Tools
- Ask users to mark as "Not Spam"
- Request users to add you to contacts
- Improve engagement (open rates, replies)

---

## 💡 Pro Tips for Maximum Deliverability

1. **Use a Consistent Sender Address:**
   - Always send from the same email
   - Don't change frequently

2. **Build Engagement:**
   - Send valuable content
   - Encourage replies
   - Ask to add to contacts

3. **Segment Your List:**
   - Don't send to everyone
   - Target engaged users

4. **Monitor Metrics:**
   - Open rate should be > 15%
   - Click rate should be > 2%
   - Bounce rate should be < 5%
   - Spam complaints < 0.1%

5. **Gradual Volume Increase:**
   - Week 1: Send to 50 emails
   - Week 2: Send to 100 emails
   - Week 3: Send to 250 emails
   - Week 4+: Full volume

6. **Add Plain Text Version:**
   - Include both HTML and plain text
   - Some spam filters prefer plain text

7. **Include Physical Address:**
   - Already in your footer ✅
   - Required by law in many countries

8. **Authenticate Everything:**
   - SPF ✅
   - DKIM ✅
   - DMARC ✅
   - BIMI (optional - requires trademark)

---

## 📊 Expected Timeline

| Time | Action | Result |
|------|--------|--------|
| Day 1 | Add DNS records | Pending verification |
| Day 2-3 | DNS propagates | Domain verified |
| Day 3 | Update .env, restart server | Emails from verified domain |
| Week 1 | Send test emails | Check deliverability |
| Week 2-4 | Gradual volume increase | Build reputation |
| Month 2+ | Consistent sending | High deliverability |

---

## 🎯 Success Metrics

Your emails are reaching inbox when:
- ✅ Test emails land in Primary inbox (not Promotions)
- ✅ Mail-Tester score > 8/10
- ✅ Open rate > 15%
- ✅ Bounce rate < 5%
- ✅ Zero spam complaints
- ✅ Users report receiving emails

---

## 📞 Need Help?

### Resend Support
- Email: support@resend.com
- Docs: https://resend.com/docs
- Community: https://resend.com/discord

### DNS Help
- Contact your domain registrar
- Use DNS propagation checker
- Wait 24-48 hours after changes

### Still Having Issues?
1. Check Resend dashboard for error logs
2. Test with Mail-Tester.com and share results
3. Verify DNS records are correct
4. Contact Resend support with specific error messages

---

## ⚡ Quick Start (5 Minutes)

**If you need a quick fix right now:**

1. **Open `.env` file**
2. **Change this line:**
   ```env
   RESEND_FROM_EMAIL=Prana House <yashveer.dr@gmail.com>
   ```
3. **Verify your Gmail in Resend:**
   - Go to https://resend.com/emails
   - Click "Verify Email Address"
   - Enter: yashveer.dr@gmail.com
   - Check your Gmail and click verification link

4. **Restart your server:**
   ```bash
   # Stop server (Ctrl+C)
   # Start again
   npm start
   ```

5. **Send test email**
6. **Check if it lands in inbox**

**This is a temporary fix. For permanent solution, set up domain authentication (steps above).**

---

## 📝 Summary

**Root Problem:** Using Resend's default domain without authentication

**Best Solution:** Add your own domain (pranahouse.in) to Resend with SPF, DKIM, DMARC

**Quick Fix:** Verify personal email (yashveer.dr@gmail.com) in Resend

**Expected Result:** 95%+ inbox delivery rate

---

*Last Updated: January 2025*
*Priority: CRITICAL - Do this before launching!*
