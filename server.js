require('dotenv').config();

const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

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

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'html');

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

// Teacher / About
app.get('/about', (req, res) => res.sendFile(path.join(__dirname, 'views', 'about.html')));
app.get('/teacher', (req, res) => res.sendFile(path.join(__dirname, 'views', 'teacher.html')));

// Retreat
app.get('/retreat', (req, res) => res.sendFile(path.join(__dirname, 'views', 'retreat.html')));

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

// Admin Authentication (Simple - Replace with proper auth in production)
const ADMIN_CREDENTIALS = {
  username: process.env.ADMIN_USERNAME || 'admin',
  password: process.env.ADMIN_PASSWORD || 'pranahouse2025' // CHANGE THIS!
};

app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  
  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    // Generate simple token (use JWT in production)
    const token = Buffer.from(`${username}:${Date.now()}`).toString('base64');
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
    
    const { error } = await supabase
      .from('gallery')
      .upsert([{ url, caption, category, alt, sort_order: sort_order || 0, visible }], { onConflict: 'url' });
    
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
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, message, interest } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Name, email and message are required.'
      });
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
          <h2 style="margin:0 0 8px;font-size:24px;font-weight:400;color:#2C2C2C;font-family:Georgia,serif;">Namaste, ${name} 🙏</h2>
          <p style="margin:0 0 20px;font-size:15px;color:#6B6560;line-height:1.7;">Thank you for reaching out to Prana House. We've received your message and will get back to you within <strong style="color:#2C2C2C;">24 hours</strong>.</p>
          <div style="background:#F2EFE9;border-radius:10px;padding:20px 24px;margin-bottom:24px;border-left:3px solid #5C8A5C;">
            <p style="margin:0 0 6px;font-size:12px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#5C8A5C;">Your Enquiry</p>
            <p style="margin:0;font-size:14px;color:#2C2C2C;"><strong>Interest:</strong> ${interest || 'General Enquiry'}</p>
            ${phone ? `<p style="margin:4px 0 0;font-size:14px;color:#2C2C2C;"><strong>Phone:</strong> ${phone}</p>` : ''}
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
              <tr><td style="padding:6px 0;border-bottom:1px solid #DDD8CE;"><span style="font-size:12px;color:#9B958E;text-transform:uppercase;letter-spacing:0.08em;">Name</span><br/><span style="font-size:15px;color:#2C2C2C;font-weight:500;">${name}</span></td></tr>
              <tr><td style="padding:6px 0;border-bottom:1px solid #DDD8CE;"><span style="font-size:12px;color:#9B958E;text-transform:uppercase;letter-spacing:0.08em;">Email</span><br/><a href="mailto:${email}" style="font-size:15px;color:#5C8A5C;text-decoration:none;">${email}</a></td></tr>
              <tr><td style="padding:6px 0;border-bottom:1px solid #DDD8CE;"><span style="font-size:12px;color:#9B958E;text-transform:uppercase;letter-spacing:0.08em;">Phone</span><br/><span style="font-size:15px;color:#2C2C2C;">${phone || '—'}</span></td></tr>
              <tr><td style="padding:6px 0;"><span style="font-size:12px;color:#9B958E;text-transform:uppercase;letter-spacing:0.08em;">Interest</span><br/><span style="display:inline-block;margin-top:4px;padding:3px 10px;background:rgba(92,138,92,0.1);color:#5C8A5C;border-radius:50px;font-size:13px;font-weight:500;">${interest || 'General Enquiry'}</span></td></tr>
            </table>
          </div>
          <div style="background:#fff;border:1px solid #DDD8CE;border-radius:10px;padding:20px 24px;margin-bottom:20px;">
            <p style="margin:0 0 8px;font-size:12px;color:#9B958E;text-transform:uppercase;letter-spacing:0.08em;">Message</p>
            <p style="margin:0;font-size:15px;color:#2C2C2C;line-height:1.7;">${message.replace(/\n/g, '<br/>')}</p>
          </div>
          <a href="mailto:${email}?subject=Re: Your Prana House Enquiry" style="display:inline-block;padding:12px 24px;background:#5C8A5C;color:#fff;text-decoration:none;border-radius:8px;font-size:14px;font-weight:500;">Reply to ${name}</a>
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
app.post('/api/newsletter', async (req, res) => {
  try {
    const { email, name } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'Email is required.'
      });
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
          <h2 style="margin:0 0 8px;font-size:24px;font-weight:400;color:#2C2C2C;font-family:Georgia,serif;">Welcome${name ? ', ' + name : ''} 🙏</h2>
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
app.post('/api/testimonials', async (req, res) => {
  try {
    const { name, location, program, rating, message } = req.body;
    if (!name || !message) {
      return res.status(400).json({ success: false, error: 'Name and message are required.' });
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
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Location:</strong> ${location || 'Not provided'}</p>
          <p><strong>Program:</strong> ${program || 'General'}</p>
          <p><strong>Rating:</strong> ${'⭐'.repeat(parseInt(rating) || 5)}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
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

// Get all gallery items (public)
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

    const { title, start_date, end_date, location, price, max_participants, description, highlights, image, active } = req.body;
    
    const { data, error } = await supabase
      .from('retreats')
      .insert([{ title, start_date, end_date, location, price, max_participants, description, highlights, image, active }])
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

    const { title, start_date, end_date, location, price, max_participants, description, highlights, image, active } = req.body;
    
    const { data, error } = await supabase
      .from('retreats')
      .update({ title, start_date, end_date, location, price, max_participants, description, highlights, image, active })
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

    const { name, type, level, schedule, duration, price, description, max_students, active } = req.body;
    
    const { data, error } = await supabase
      .from('classes')
      .insert([{ name, type, level, schedule, duration, price, description, max_students, active }])
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

    const { name, type, level, schedule, duration, price, description, max_students, active } = req.body;
    
    const { data, error } = await supabase
      .from('classes')
      .update({ name, type, level, schedule, duration, price, description, max_students, active })
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

// 404
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(PORT, () => {
  console.log(`\n🌿 Prana House server running at http://localhost:${PORT}\n`);
});

module.exports = app;
