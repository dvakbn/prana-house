require('dotenv').config();

const crypto = require('crypto');

const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// ── Security helpers ───────────────────────────────────────────────────────────
// Secret used to sign admin session tokens. Prefer a dedicated SESSION_SECRET;
// fall back to ADMIN_PASSWORD, then a random per-process secret (tokens reset on restart).
const SESSION_SECRET =
  process.env.SESSION_SECRET ||
  process.env.ADMIN_PASSWORD ||
  crypto.randomBytes(32).toString('hex');

const TOKEN_TTL_MS = 8 * 60 * 60 * 1000; // 8 hours

// Create a tamper-proof, expiring token: base64url(payload).hmac
function signToken(username) {
  const payload = `${username}:${Date.now() + TOKEN_TTL_MS}`;
  const data = Buffer.from(payload).toString('base64url');
  const sig = crypto.createHmac('sha256', SESSION_SECRET).update(data).digest('base64url');
  return `${data}.${sig}`;
}

function verifyToken(token) {
  if (!token || typeof token !== 'string' || !token.includes('.')) return false;
  const [data, sig] = token.split('.');
  if (!data || !sig) return false;
  const expected = crypto.createHmac('sha256', SESSION_SECRET).update(data).digest('base64url');
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;
  try {
    const payload = Buffer.from(data, 'base64url').toString();
    const exp = parseInt(payload.split(':').pop(), 10);
    return Boolean(exp) && Date.now() < exp;
  } catch {
    return false;
  }
}

// Middleware: require a valid admin token
function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : header;
  if (!verifyToken(token)) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }
  next();
}

// Escape HTML to prevent injection in emails
function escapeHtml(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function isValidEmail(email) {
  return typeof email === 'string' && email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Lightweight in-memory rate limiter (per IP). No external dependency.
function rateLimit({ windowMs, max, message }) {
  const hits = new Map();
  return (req, res, next) => {
    const key = req.ip || 'global';
    const now = Date.now();
    let entry = hits.get(key);
    if (!entry || now > entry.reset) {
      entry = { count: 0, reset: now + windowMs };
      hits.set(key, entry);
    }
    entry.count++;
    // Opportunistic cleanup to keep the map small
    if (hits.size > 5000) {
      for (const [k, v] of hits) if (now > v.reset) hits.delete(k);
    }
    if (entry.count > max) {
      res.setHeader('Retry-After', Math.ceil((entry.reset - now) / 1000));
      return res.status(429).json({ success: false, error: message || 'Too many requests. Please try again later.' });
    }
    next();
  };
}

const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'Prana House <hello@pranayoga.qzz.io>';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'yashveer.dr@gmail.com';

// ── Shared Email Template ─────────────────────────────────────────────────────
function emailTemplate(bodyContent) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Prana House</title>
</head>
<body style="margin:0;padding:0;background:#FAF8F5;font-family:'DM Sans',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#FAF8F5;padding:40px 20px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;border:1px solid #DDD8CE;overflow:hidden;">
        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#2d4a2d,#3D6B3D);padding:36px 40px;text-align:center;">
            <div style="display:inline-block;margin-bottom:12px;">
              <!-- Lotus icon in header -->
              <svg width="44" height="44" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="20" cy="20" rx="3" ry="7.5" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.7)" stroke-width="1" transform="rotate(0 20 20)"/>
                <ellipse cx="20" cy="20" rx="3" ry="7.5" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.7)" stroke-width="1" transform="rotate(45 20 20)"/>
                <ellipse cx="20" cy="20" rx="3" ry="7.5" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.7)" stroke-width="1" transform="rotate(90 20 20)"/>
                <ellipse cx="20" cy="20" rx="3" ry="7.5" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.7)" stroke-width="1" transform="rotate(135 20 20)"/>
                <circle cx="20" cy="20" r="3.2" fill="#C8A96E"/>
              </svg>
            </div>
            <div style="color:#ffffff;font-size:22px;font-weight:400;letter-spacing:0.02em;font-family:Georgia,serif;">Prana House</div>
            <div style="color:rgba(255,255,255,0.6);font-size:11px;letter-spacing:0.18em;text-transform:uppercase;margin-top:4px;">Yoga &amp; Wellness · Jaipur</div>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:40px 40px 32px;">
            ${bodyContent}
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="background:#F2EFE9;padding:24px 40px;text-align:center;border-top:1px solid #DDD8CE;">
            <p style="margin:0 0 8px;font-size:12px;color:#9B958E;">Pratap Nagar, Jaipur, Rajasthan, India</p>
            <p style="margin:0 0 8px;font-size:12px;color:#9B958E;">
              <a href="mailto:hello@pranayoga.qzz.io" style="color:#5C8A5C;text-decoration:none;">hello@pranayoga.qzz.io</a>
              &nbsp;·&nbsp;
              <a href="https://wa.me/919599839737" style="color:#5C8A5C;text-decoration:none;">WhatsApp</a>
              &nbsp;·&nbsp;
              <a href="https://www.instagram.com/between2breath/" style="color:#5C8A5C;text-decoration:none;">Instagram</a>
            </p>
            <p style="margin:0;font-size:11px;color:#B0A8A0;">© 2025 Prana House. All rights reserved.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Behind a proxy (Vercel/Render/Nginx) — needed for correct client IPs in rate limiting
app.set('trust proxy', 1);

// ── Security headers ───────────────────────────────────────────────────────────
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=(), interest-cohort=()');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.setHeader('Content-Security-Policy', [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https:",
    "connect-src 'self' https:",
    "frame-ancestors 'self'",
    "base-uri 'self'",
    "form-action 'self'"
  ].join('; '));
  res.removeHeader('X-Powered-By');
  next();
});

// Middleware (explicit body size limit to limit abuse)
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(express.static(path.join(__dirname, 'public'), { maxAge: '1h', etag: true }));
app.set('view engine', 'html');

// ── Rate limiters ──────────────────────────────────────────────────────────────
const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 10, message: 'Too many login attempts. Please try again in 15 minutes.' });
const contactLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 5, message: 'Too many submissions. Please try again later.' });
const newsletterLimiter = rateLimit({ windowMs: 60 * 60 * 1000, max: 8, message: 'Too many requests. Please try again later.' });
const testimonialLimiter = rateLimit({ windowMs: 60 * 60 * 1000, max: 5, message: 'Too many submissions. Please try again later.' });

// ── Admin API guard: every /api/admin/* route requires a valid token, except login ──
app.use('/api/admin', (req, res, next) => {
  if (req.path === '/login') return next();
  return requireAuth(req, res, next);
});

// Simple HTML file server (no templating engine needed for static HTML)
// Routes serve HTML files from /views directory

// ─── ROUTES ─────────────────────────────────────────────────────────────────

// SEO Files
app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.sendFile(path.join(__dirname, 'public', 'robots.txt'));
});

app.get('/sitemap.xml', (req, res) => {
  res.type('application/xml');
  res.sendFile(path.join(__dirname, 'public', 'sitemap.xml'));
});

// Home
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views', 'index.html')));

// Classes / Programs
app.get('/classes', (req, res) => res.sendFile(path.join(__dirname, 'views', 'classes.html')));
app.get('/programs', (req, res) => res.sendFile(path.join(__dirname, 'views', 'programs.html')));
app.get('/program/detail', (req, res) => res.sendFile(path.join(__dirname, 'views', 'program-detail.html')));

// Teacher / About
app.get('/about', (req, res) => res.sendFile(path.join(__dirname, 'views', 'about.html')));
app.get('/teacher', (req, res) => res.sendFile(path.join(__dirname, 'views', 'teacher.html')));

// Retreat
app.get('/retreat', (req, res) => res.sendFile(path.join(__dirname, 'views', 'retreat.html')));
app.get('/retreat/detail', (req, res) => res.sendFile(path.join(__dirname, 'views', 'retreat-detail.html')));

// Classes
app.get('/classes', (req, res) => res.sendFile(path.join(__dirname, 'views', 'classes.html')));
app.get('/class/detail', (req, res) => res.sendFile(path.join(__dirname, 'views', 'class-detail.html')));

// Blog / Articles
app.get('/blog', (req, res) => res.sendFile(path.join(__dirname, 'views', 'blog.html')));
app.get('/blog/:slug', (req, res) => {
  const filePath = path.join(__dirname, 'views', 'blog-post.html');
  if (fs.existsSync(filePath)) res.sendFile(filePath);
  else res.sendFile(path.join(__dirname, 'views', 'blog.html'));
});

// Contact
app.get('/contact', (req, res) => res.sendFile(path.join(__dirname, 'views', 'contact.html')));

// Gallery
app.get('/gallery', (req, res) => res.sendFile(path.join(__dirname, 'views', 'gallery.html')));

// Testimonials
app.get('/testimonials', (req, res) => res.sendFile(path.join(__dirname, 'views', 'testimonials.html')));

// Legal Pages
app.get('/privacy-policy', (req, res) => res.sendFile(path.join(__dirname, 'views', 'privacy-policy.html')));
app.get('/terms', (req, res) => res.sendFile(path.join(__dirname, 'views', 'terms.html')));
app.get('/refund-policy', (req, res) => res.sendFile(path.join(__dirname, 'views', 'refund-policy.html')));

// ─── ADMIN ROUTES ────────────────────────────────────────────────────────────

// Admin Login Page
app.get('/admin/login', (req, res) => res.sendFile(path.join(__dirname, 'views', 'admin-login.html')));

// Admin Dashboard Page
app.get('/admin/dashboard', (req, res) => res.sendFile(path.join(__dirname, 'views', 'admin-dashboard.html')));

// Admin Authentication
const ADMIN_CREDENTIALS = {
  username: process.env.ADMIN_USERNAME || 'admin',
  password: process.env.ADMIN_PASSWORD || '' // Must be set via environment variable
};

// Timing-safe string comparison to avoid leaking length/content via timing
function safeEqual(a, b) {
  const ba = Buffer.from(String(a));
  const bb = Buffer.from(String(b));
  if (ba.length !== bb.length) return false;
  return crypto.timingSafeEqual(ba, bb);
}

app.post('/api/admin/login', loginLimiter, (req, res) => {
  const { username, password } = req.body || {};

  // Refuse login if no admin password is configured (prevents blank-password access)
  if (!ADMIN_CREDENTIALS.password) {
    console.error('ADMIN_PASSWORD is not set. Admin login is disabled.');
    return res.status(503).json({ success: false, error: 'Admin login is not configured.' });
  }

  const okUser = safeEqual(username || '', ADMIN_CREDENTIALS.username);
  const okPass = safeEqual(password || '', ADMIN_CREDENTIALS.password);

  if (okUser && okPass) {
    const token = signToken(ADMIN_CREDENTIALS.username);
    res.json({ success: true, token });
  } else {
    res.status(401).json({ success: false, error: 'Invalid credentials' });
  }
});

// Admin Gallery Management
app.post('/api/admin/gallery', async (req, res) => {
  try {
    // Verify auth token (simplified)
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ success: false, error: 'Unauthorized' });
    }

    const { url, caption, category, alt, sort_order, visible } = req.body;
    
    // Check if image with this URL already exists
    const { data: existing } = await supabase
      .from('gallery')
      .select('url')
      .eq('url', url)
      .single();
    
    let error;
    if (existing) {
      // Update existing image
      const result = await supabase
        .from('gallery')
        .update({ caption, category, alt, sort_order: sort_order || 0, visible })
        .eq('url', url);
      error = result.error;
    } else {
      // Insert new image
      const result = await supabase
        .from('gallery')
        .insert([{ url, caption, category, alt, sort_order: sort_order || 0, visible }]);
      error = result.error;
    }
    
    if (error) throw error;
    
    res.json({ success: true });
  } catch (err) {
    console.error('Admin Gallery Error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete('/api/admin/gallery', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ success: false, error: 'Unauthorized' });
    }

    const { url } = req.body;
    
    const { error } = await supabase
      .from('gallery')
      .delete()
      .eq('url', url);
    
    if (error) throw error;
    
    res.json({ success: true });
  } catch (err) {
    console.error('Admin Gallery Delete Error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ─── API ROUTES (existing) ──────────────────────────────────────────────────

// Contact form submission
app.post('/api/contact', contactLimiter, async (req, res) => {
  try {
    const { name, email, phone, message, interest } = req.body || {};
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Name, email and message are required.'
      });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ success: false, error: 'Please provide a valid email address.' });
    }
    if (String(name).length > 100 || String(message).length > 5000 || String(phone || '').length > 30 || String(interest || '').length > 100) {
      return res.status(400).json({ success: false, error: 'One or more fields exceed the allowed length.' });
    }
    
    // Save to Supabase (wrapped to prevent failure from killing email flow)
    let supabaseSuccess = false;
    try {
      const { error } = await supabase
        .from('enquiries')
        .insert([
          {
            name,
            email,
            phone,
            message,
            interest,
            status: 'new'
          }
        ]);
      if (error) {
        console.error('Supabase Enquiry Insert Error:', error);
      } else {
        supabaseSuccess = true;
      }
    } catch (supabaseErr) {
      console.error('Supabase Enquiry Exception:', supabaseErr);
    }

    let userEmailSuccess = false;
    // Send confirmation email to user
    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        replyTo: ADMIN_EMAIL,
        subject: 'Thank you for contacting Prana House',
        html: emailTemplate(`
          <h2 style="margin:0 0 8px;font-size:24px;font-weight:400;color:#2C2C2C;font-family:Georgia,serif;">Namaste, ${escapeHtml(name)} 🙏</h2>
          <p style="margin:0 0 20px;font-size:15px;color:#6B6560;line-height:1.7;">Thank you for reaching out to Prana House. We've received your message and will get back to you within <strong style="color:#2C2C2C;">24 hours</strong>.</p>
          <div style="background:#F2EFE9;border-radius:10px;padding:20px 24px;margin-bottom:24px;border-left:3px solid #5C8A5C;">
            <p style="margin:0 0 6px;font-size:12px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#5C8A5C;">Your Enquiry</p>
            <p style="margin:0;font-size:14px;color:#2C2C2C;"><strong>Interest:</strong> ${escapeHtml(interest || 'General Enquiry')}</p>
            ${phone ? `<p style="margin:4px 0 0;font-size:14px;color:#2C2C2C;"><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ''}
          </div>
          <p style="margin:0 0 24px;font-size:15px;color:#6B6560;line-height:1.7;">While you wait, feel free to explore our offerings:</p>
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
            <tr>
              <td style="padding:4px 8px 4px 0;" width="50%">
                <a href="https://prana-house-beige.vercel.app/classes" style="display:block;text-align:center;padding:12px;background:#5C8A5C;color:#fff;text-decoration:none;border-radius:8px;font-size:13px;font-weight:500;">Explore Programs</a>
              </td>
              <td style="padding:4px 0 4px 8px;" width="50%">
                <a href="https://prana-house-beige.vercel.app/blog" style="display:block;text-align:center;padding:12px;background:#F2EFE9;color:#5C8A5C;text-decoration:none;border-radius:8px;font-size:13px;font-weight:500;border:1px solid #DDD8CE;">Wellness Blog</a>
              </td>
            </tr>
          </table>
          <p style="margin:0;font-size:14px;color:#9B958E;font-style:italic;font-family:Georgia,serif;">"The journey of a thousand miles begins with a single breath."</p>
        `)
      });
      userEmailSuccess = true;
    } catch (resendError) {
      console.error('Resend User Email Error:', resendError);
    }

    let adminEmailSuccess = false;
    // Send notification email to admin
    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: ADMIN_EMAIL,
        replyTo: email,
        subject: `New Enquiry from ${name} - ${interest || 'General'}`,
        html: emailTemplate(`
          <h2 style="margin:0 0 4px;font-size:22px;font-weight:400;color:#2C2C2C;font-family:Georgia,serif;">New Contact Form Submission</h2>
          <p style="margin:0 0 24px;font-size:13px;color:#9B958E;">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</p>
          <div style="background:#F2EFE9;border-radius:10px;padding:20px 24px;margin-bottom:20px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr><td style="padding:6px 0;border-bottom:1px solid #DDD8CE;"><span style="font-size:12px;color:#9B958E;text-transform:uppercase;letter-spacing:0.08em;">Name</span><br/><span style="font-size:15px;color:#2C2C2C;font-weight:500;">${escapeHtml(name)}</span></td></tr>
              <tr><td style="padding:6px 0;border-bottom:1px solid #DDD8CE;"><span style="font-size:12px;color:#9B958E;text-transform:uppercase;letter-spacing:0.08em;">Email</span><br/><a href="mailto:${encodeURIComponent(email)}" style="font-size:15px;color:#5C8A5C;text-decoration:none;">${escapeHtml(email)}</a></td></tr>
              <tr><td style="padding:6px 0;border-bottom:1px solid #DDD8CE;"><span style="font-size:12px;color:#9B958E;text-transform:uppercase;letter-spacing:0.08em;">Phone</span><br/><span style="font-size:15px;color:#2C2C2C;">${escapeHtml(phone || '—')}</span></td></tr>
              <tr><td style="padding:6px 0;"><span style="font-size:12px;color:#9B958E;text-transform:uppercase;letter-spacing:0.08em;">Interest</span><br/><span style="display:inline-block;margin-top:4px;padding:3px 10px;background:rgba(92,138,92,0.1);color:#5C8A5C;border-radius:50px;font-size:13px;font-weight:500;">${escapeHtml(interest || 'General Enquiry')}</span></td></tr>
            </table>
          </div>
          <div style="background:#fff;border:1px solid #DDD8CE;border-radius:10px;padding:20px 24px;margin-bottom:20px;">
            <p style="margin:0 0 8px;font-size:12px;color:#9B958E;text-transform:uppercase;letter-spacing:0.08em;">Message</p>
            <p style="margin:0;font-size:15px;color:#2C2C2C;line-height:1.7;">${escapeHtml(message).replace(/\n/g, '<br/>')}</p>
          </div>
          <a href="mailto:${encodeURIComponent(email)}?subject=Re: Your Prana House Enquiry" style="display:inline-block;padding:12px 24px;background:#5C8A5C;color:#fff;text-decoration:none;border-radius:8px;font-size:14px;font-weight:500;">Reply to ${escapeHtml(name)}</a>
        `)
      });
      adminEmailSuccess = true;
    } catch (resendError) {
      console.error('Resend Admin Email Error:', resendError);
    }

    // Return success if at least the database save or admin notification succeeded
    if (supabaseSuccess || adminEmailSuccess) {
      res.json({
        success: true,
        message: 'Thank you! We will get back to you within 24 hours.'
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Failed to process enquiry. Please try again later.'
      });
    }
  } catch (err) {
    console.error('API Contact Error:', err);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// Newsletter signup
app.post('/api/newsletter', newsletterLimiter, async (req, res) => {
  try {
    const { email, name } = req.body || {};

    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'Email is required.'
      });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ success: false, error: 'Please provide a valid email address.' });
    }
    if (String(name || '').length > 100) {
      return res.status(400).json({ success: false, error: 'Name is too long.' });
    }

    let supabaseSuccess = false;
    let isDuplicate = false;
    
    try {
      const { error } = await supabase
        .from('subscribers')
        .insert([
          {
            email,
            name: name || ''
          }
        ]);

      if (error) {
        if (error.code === '23505') {
          isDuplicate = true;
        } else {
          console.error('Supabase Newsletter Insert Error:', error);
        }
      } else {
        supabaseSuccess = true;
      }
    } catch (supabaseErr) {
      console.error('Supabase Newsletter Exception:', supabaseErr);
    }

    if (isDuplicate) {
      // Send already subscribed email
      try {
        await resend.emails.send({
          from: FROM_EMAIL,
          to: email,
          replyTo: ADMIN_EMAIL,
          subject: 'You are already subscribed to Prana House',
          html: emailTemplate(`
            <h2 style="margin:0 0 8px;font-size:24px;font-weight:400;color:#2C2C2C;font-family:Georgia,serif;">You're already subscribed! 🌿</h2>
            <p style="margin:0 0 20px;font-size:15px;color:#6B6560;line-height:1.7;">Good news — you're already part of the Prana House wellness community. Keep an eye on your inbox for our weekly updates.</p>
            <div style="background:#F2EFE9;border-radius:10px;padding:20px 24px;margin-bottom:24px;border-left:3px solid #C8A96E;">
              <p style="margin:0;font-size:14px;color:#6B6560;font-style:italic;font-family:Georgia,serif;">"You don't have to be perfect to begin. You just have to begin."</p>
            </div>
            <a href="https://prana-house-beige.vercel.app/classes" style="display:inline-block;padding:12px 24px;background:#5C8A5C;color:#fff;text-decoration:none;border-radius:8px;font-size:14px;font-weight:500;">Explore Our Classes</a>
          `)
        });
      } catch (resendError) {
        console.error('Resend Already Subscribed Email Error:', resendError);
      }
      return res.json({ success: true, message: 'You are already subscribed!' });
    }

    // Send welcome email to new subscriber
    let welcomeEmailSuccess = false;
    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        replyTo: ADMIN_EMAIL,
        subject: 'Welcome to Prana House Yoga & Wellness',
        html: emailTemplate(`
          <h2 style="margin:0 0 8px;font-size:24px;font-weight:400;color:#2C2C2C;font-family:Georgia,serif;">Welcome${name ? ', ' + escapeHtml(name) : ''} 🙏</h2>
          <p style="margin:0 0 20px;font-size:15px;color:#6B6560;line-height:1.7;">You've just taken a beautiful step. Thank you for joining the Prana House wellness community — a space built around breath, movement and holistic living.</p>
          <p style="margin:0 0 16px;font-size:14px;color:#6B6560;font-weight:500;">Here's what you'll receive:</p>
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
            <tr><td style="padding:8px 0;border-bottom:1px solid #EDE8DF;font-size:14px;color:#2C2C2C;">🧘 &nbsp;Weekly yoga tips and practices</td></tr>
            <tr><td style="padding:8px 0;border-bottom:1px solid #EDE8DF;font-size:14px;color:#2C2C2C;">🌬️ &nbsp;Breathwork and meditation guides</td></tr>
            <tr><td style="padding:8px 0;border-bottom:1px solid #EDE8DF;font-size:14px;color:#2C2C2C;">📅 &nbsp;Class schedule updates and new batches</td></tr>
            <tr><td style="padding:8px 0;border-bottom:1px solid #EDE8DF;font-size:14px;color:#2C2C2C;">🏕️ &nbsp;Retreat announcements before anyone else</td></tr>
            <tr><td style="padding:8px 0;font-size:14px;color:#2C2C2C;">💚 &nbsp;Exclusive offers for community members</td></tr>
          </table>
          <div style="background:#F2EFE9;border-radius:10px;padding:20px 24px;margin-bottom:28px;border-left:3px solid #C8A96E;">
            <p style="margin:0;font-size:14px;color:#6B6560;font-style:italic;font-family:Georgia,serif;">"The quieter you become, the more you can hear."</p>
          </div>
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding:0 8px 0 0;" width="50%">
                <a href="https://prana-house-beige.vercel.app/classes" style="display:block;text-align:center;padding:13px;background:#5C8A5C;color:#fff;text-decoration:none;border-radius:8px;font-size:13px;font-weight:500;">Explore Classes</a>
              </td>
              <td style="padding:0 0 0 8px;" width="50%">
                <a href="https://wa.me/919599839737?text=Hello%2C%20I%20want%20to%20know%20more%20about%20Prana%20House%20%F0%9F%8C%BF" style="display:block;text-align:center;padding:13px;background:#F2EFE9;color:#5C8A5C;text-decoration:none;border-radius:8px;font-size:13px;font-weight:500;border:1px solid #DDD8CE;">WhatsApp Us</a>
              </td>
            </tr>
          </table>
        `)
      });
      welcomeEmailSuccess = true;
    } catch (resendError) {
      console.error('Resend Welcome Email Error:', resendError);
    }

    if (supabaseSuccess || welcomeEmailSuccess) {
      res.json({
        success: true,
        message: 'Welcome to the Prana House community! 🌿'
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Failed to subscribe. Please try again later.'
      });
    }
  } catch (err) {
    console.error('NEWSLETTER ERROR:', err);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// Get all subscribers (admin use)
app.get('/api/admin/subscribers', (req, res) => {
  const dataPath = path.join(__dirname, 'data', 'subscribers.json');
  if (!fs.existsSync(dataPath)) return res.json([]);
  try {
    res.json(JSON.parse(fs.readFileSync(dataPath, 'utf8')));
  } catch (e) {
    res.json([]);
  }
});

// ── Testimonials API ─────────────────────────────────────────────────────────

// Get all testimonials (public)
app.get('/api/testimonials', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('name, location, program, rating, message')
      .eq('approved', true)
      .order('created_at', { ascending: false });
    if (error) throw error;
    res.json(data || []);
  } catch (err) {
    console.error('TESTIMONIALS GET ERROR:', err);
    res.json([]);
  }
});

// Submit a new testimonial (pending approval)
app.post('/api/testimonials', testimonialLimiter, async (req, res) => {
  try {
    const { name, location, program, rating, message } = req.body || {};
    if (!name || !message) {
      return res.status(400).json({ success: false, error: 'Name and message are required.' });
    }
    if (String(name).length > 100 || String(message).length > 2000 || String(location || '').length > 100 || String(program || '').length > 100) {
      return res.status(400).json({ success: false, error: 'One or more fields exceed the allowed length.' });
    }

    let supabaseSuccess = false;
    try {
      const { error } = await supabase
        .from('testimonials')
        .insert([{ name, location: location || '', program: program || '', rating: parseInt(rating) || 5, message, approved: false }]);
      if (error) {
        console.error('Supabase Testimonials Insert Error:', error);
      } else {
        supabaseSuccess = true;
      }
    } catch (supabaseErr) {
      console.error('Supabase Testimonials Exception:', supabaseErr);
    }

    let adminEmailSuccess = false;
    // Send testimonial notification email to admin
    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: ADMIN_EMAIL,
        subject: `New Testimonial from ${name} - Pending Review`,
        html: `
          <h2>New Testimonial Submission</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Location:</strong> ${escapeHtml(location || 'Not provided')}</p>
          <p><strong>Program:</strong> ${escapeHtml(program || 'General')}</p>
          <p><strong>Rating:</strong> ${'⭐'.repeat(parseInt(rating) || 5)}</p>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
          <p>Review and approve in your Supabase dashboard.</p>
        `
      });
      adminEmailSuccess = true;
    } catch (resendError) {
      console.error('Resend Testimonial Admin Email Error:', resendError);
    }

    if (supabaseSuccess || adminEmailSuccess) {
      res.json({ success: true, message: 'Thank you! Your story will appear after review.' });
    } else {
      res.status(500).json({ success: false, error: 'Failed to submit testimonial. Please try again later.' });
    }
  } catch (err) {
    console.error('TESTIMONIALS POST ERROR:', err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// ── Gallery API ───────────────────────────────────────────────────────────────

// Get all gallery items (public - visible only)
app.get('/api/gallery', async (req, res) => {
  try {
    const { category } = req.query;
    let query = supabase
      .from('gallery')
      .select('url, caption, category, alt')
      .eq('visible', true)
      .order('sort_order', { ascending: true });
    if (category && category !== 'all') query = query.eq('category', category);
    const { data, error } = await query;
    if (error) throw error;
    res.json(data || []);
  } catch (err) {
    console.error('GALLERY GET ERROR:', err);
    res.json([]);
  }
});

// Get all gallery items for admin (including hidden)
app.get('/api/admin/gallery', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ success: false, error: 'Unauthorized' });
    }

    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('sort_order', { ascending: true });
    if (error) throw error;
    res.json(data || []);
  } catch (err) {
    console.error('ADMIN GALLERY GET ERROR:', err);
    res.json([]);
  }
});

// ── Blog API ──────────────────────────────────────────────────────────────────

// Get all blogs (public - published only)
app.get('/api/blogs', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });
    if (error) throw error;
    res.json(data || []);
  } catch (err) {
    console.error('BLOGS GET ERROR:', err);
    res.json([]);
  }
});

// Get all blogs for admin (including drafts)
app.get('/api/admin/blogs', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ success: false, error: 'Unauthorized' });
    }

    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    res.json(data || []);
  } catch (err) {
    console.error('ADMIN BLOGS GET ERROR:', err);
    res.json([]);
  }
});

// Get single blog by slug (public)
app.get('/api/blogs/:slug', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('slug', req.params.slug)
      .eq('published', true)
      .single();
    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error('BLOG GET ERROR:', err);
    res.status(404).json({ error: 'Blog post not found' });
  }
});

// Create blog (admin)
app.post('/api/admin/blogs', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ success: false, error: 'Unauthorized' });
    }

    const { title, slug, author, category, image, excerpt, content, published } = req.body;
    
    const { data, error } = await supabase
      .from('blogs')
      .insert([{ title, slug, author, category, image, excerpt, content, published }])
      .select();
    
    if (error) throw error;
    
    res.json({ success: true, data });
  } catch (err) {
    console.error('Admin Blog Create Error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Update blog (admin)
app.put('/api/admin/blogs/:id', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ success: false, error: 'Unauthorized' });
    }

    const { title, slug, author, category, image, excerpt, content, published } = req.body;
    
    const { data, error } = await supabase
      .from('blogs')
      .update({ title, slug, author, category, image, excerpt, content, published, updated_at: new Date().toISOString() })
      .eq('id', req.params.id)
      .select();
    
    if (error) throw error;
    
    res.json({ success: true, data });
  } catch (err) {
    console.error('Admin Blog Update Error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Delete blog (admin)
app.delete('/api/admin/blogs/:id', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ success: false, error: 'Unauthorized' });
    }

    const { error } = await supabase
      .from('blogs')
      .delete()
      .eq('id', req.params.id);
    
    if (error) throw error;
    
    res.json({ success: true });
  } catch (err) {
    console.error('Admin Blog Delete Error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ── Retreats API ──────────────────────────────────────────────────────────────

// Get all retreats (public - active only)
app.get('/api/retreats', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('retreats')
      .select('*')
      .eq('active', true)
      .order('start_date', { ascending: true });
    if (error) throw error;
    res.json(data || []);
  } catch (err) {
    console.error('RETREATS GET ERROR:', err);
    res.json([]);
  }
});

// Get all retreats for admin (including inactive)
app.get('/api/admin/retreats', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ success: false, error: 'Unauthorized' });
    }

    const { data, error } = await supabase
      .from('retreats')
      .select('*')
      .order('start_date', { ascending: false });
    if (error) throw error;
    res.json(data || []);
  } catch (err) {
    console.error('ADMIN RETREATS GET ERROR:', err);
    res.json([]);
  }
});

// Create retreat (admin)
app.post('/api/admin/retreats', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ success: false, error: 'Unauthorized' });
    }

    const { title, start_date, end_date, location, price, max_participants, description, highlights, image, active, schedule } = req.body;
    
    const { data, error } = await supabase
      .from('retreats')
      .insert([{ title, start_date, end_date, location, price, max_participants, description, highlights, image, active, schedule }])
      .select();
    
    if (error) throw error;
    
    res.json({ success: true, data });
  } catch (err) {
    console.error('Admin Retreat Create Error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Update retreat (admin)
app.put('/api/admin/retreats/:id', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ success: false, error: 'Unauthorized' });
    }

    const { title, start_date, end_date, location, price, max_participants, description, highlights, image, active, schedule } = req.body;
    
    const { data, error } = await supabase
      .from('retreats')
      .update({ title, start_date, end_date, location, price, max_participants, description, highlights, image, active, schedule })
      .eq('id', req.params.id)
      .select();
    
    if (error) throw error;
    
    res.json({ success: true, data });
  } catch (err) {
    console.error('Admin Retreat Update Error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Delete retreat (admin)
app.delete('/api/admin/retreats/:id', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ success: false, error: 'Unauthorized' });
    }

    const { error } = await supabase
      .from('retreats')
      .delete()
      .eq('id', req.params.id);
    
    if (error) throw error;
    
    res.json({ success: true });
  } catch (err) {
    console.error('Admin Retreat Delete Error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ── Classes API ───────────────────────────────────────────────────────────────

// Get all classes (public - active only)
app.get('/api/classes', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('classes')
      .select('*')
      .eq('active', true)
      .order('created_at', { ascending: false });
    if (error) throw error;
    res.json(data || []);
  } catch (err) {
    console.error('CLASSES GET ERROR:', err);
    res.json([]);
  }
});

// Get all classes for admin (including inactive)
app.get('/api/admin/classes', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ success: false, error: 'Unauthorized' });
    }

    const { data, error } = await supabase
      .from('classes')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    res.json(data || []);
  } catch (err) {
    console.error('ADMIN CLASSES GET ERROR:', err);
    res.json([]);
  }
});

// Create class (admin)
app.post('/api/admin/classes', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ success: false, error: 'Unauthorized' });
    }

    const { name, type, level, schedule, image, duration, price, description, max_students, active } = req.body;
    
    const { data, error } = await supabase
      .from('classes')
      .insert([{ name, type, level, schedule, image, duration, price, description, max_students, active }])
      .select();
    
    if (error) throw error;
    
    res.json({ success: true, data });
  } catch (err) {
    console.error('Admin Class Create Error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Update class (admin)
app.put('/api/admin/classes/:id', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ success: false, error: 'Unauthorized' });
    }

    const { name, type, level, schedule, image, duration, price, description, max_students, active } = req.body;
    
    const { data, error } = await supabase
      .from('classes')
      .update({ name, type, level, schedule, image, duration, price, description, max_students, active })
      .eq('id', req.params.id)
      .select();
    
    if (error) throw error;
    
    res.json({ success: true, data });
  } catch (err) {
    console.error('Admin Class Update Error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Delete class (admin)
app.delete('/api/admin/classes/:id', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ success: false, error: 'Unauthorized' });
    }

    const { error } = await supabase
      .from('classes')
      .delete()
      .eq('id', req.params.id);
    
    if (error) throw error;
    
    res.json({ success: true });
  } catch (err) {
    console.error('Admin Class Delete Error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ── Programs API ──────────────────────────────────────────────────────────────

// Get all programs (public - active only)
app.get('/api/programs', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('programs')
      .select('*')
      .eq('active', true)
      .order('created_at', { ascending: false });
    if (error) throw error;
    res.json(data || []);
  } catch (err) {
    console.error('PROGRAMS GET ERROR:', err);
    res.json([]);
  }
});

// Get all programs for admin (including inactive)
app.get('/api/admin/programs', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ success: false, error: 'Unauthorized' });
    }

    const { data, error } = await supabase
      .from('programs')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    res.json(data || []);
  } catch (err) {
    console.error('ADMIN PROGRAMS GET ERROR:', err);
    res.json([]);
  }
});

// Create program (admin)
app.post('/api/admin/programs', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ success: false, error: 'Unauthorized' });
    }

    const { name, slug, category, icon, tagline, description, long_description, benefits, what_included, duration, schedule, location, price, max_participants, level, type, image, tags, upcoming_dates, active } = req.body;
    
    const { data, error } = await supabase
      .from('programs')
      .insert([{ name, slug, category, icon, tagline, description, long_description, benefits, what_included, duration, schedule, location, price, max_participants, level, type, image, tags, upcoming_dates, active }])
      .select();
    
    if (error) throw error;
    
    res.json({ success: true, data });
  } catch (err) {
    console.error('Admin Program Create Error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Update program (admin)
app.put('/api/admin/programs/:id', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ success: false, error: 'Unauthorized' });
    }

    const { name, slug, category, icon, tagline, description, long_description, benefits, what_included, duration, schedule, location, price, max_participants, level, type, image, tags, upcoming_dates, active } = req.body;
    
    const { data, error } = await supabase
      .from('programs')
      .update({ name, slug, category, icon, tagline, description, long_description, benefits, what_included, duration, schedule, location, price, max_participants, level, type, image, tags, upcoming_dates, active, updated_at: new Date().toISOString() })
      .eq('id', req.params.id)
      .select();
    
    if (error) throw error;
    
    res.json({ success: true, data });
  } catch (err) {
    console.error('Admin Program Update Error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Delete program (admin)
app.delete('/api/admin/programs/:id', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ success: false, error: 'Unauthorized' });
    }

    const { error } = await supabase
      .from('programs')
      .delete()
      .eq('id', req.params.id);
    
    if (error) throw error;
    
    res.json({ success: true });
  } catch (err) {
    console.error('Admin Program Delete Error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 404
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

// ── Central error handler — return clean JSON, never leak stack traces ──
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err && err.type === 'entity.too.large') {
    return res.status(413).json({ success: false, error: 'Request payload too large.' });
  }
  if (err && (err.type === 'entity.parse.failed' || err instanceof SyntaxError)) {
    return res.status(400).json({ success: false, error: 'Invalid request format.' });
  }
  console.error('Unhandled error:', err);
  res.status(500).json({ success: false, error: 'Server error' });
});

app.listen(PORT, () => {
  console.log(`\n🌿 Prana House server running at http://localhost:${PORT}\n`);
});

module.exports = app;
