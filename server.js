
require('dotenv').config();

const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

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

// ─── API ROUTES ──────────────────────────────────────────────────────────────

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
    
    // Save to Supabase
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
    if (error) throw error;

    // Send confirmation email to user
    await resend.emails.send({
      from: 'Prana House <onboarding@resend.dev>',
      to: email,
      subject: 'We Received Your Message - Prana House',
      html: `
        <h2>Hello ${name},</h2>
        <p>Thank you for reaching out to Prana House! We've received your message and will get back to you within 24 hours.</p>
        <p><strong>Your Interest:</strong> ${interest || 'General Enquiry'}</p>
        <p>In the meantime, feel free to explore our <a href="https://prana-house.local/programs">programs</a> or check out our <a href="https://prana-house.local/blog">wellness blog</a>.</p>
        <p>Namaste,<br/>The Prana House Team 🌿</p>
      `
    });

    // Send notification email to admin
    await resend.emails.send({
      from: 'Prana House <onboarding@resend.dev>',
      to: 'hello@pranahouse.in',
      subject: `New Contact: ${name} - ${interest || 'General Enquiry'}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Interest:</strong> ${interest || 'General Enquiry'}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    });

    res.json({
      success: true,
      message: 'Thank you! We will get back to you within 24 hours.'
    });
  } catch (err) {
    console.error(err);
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

    const { error } = await supabase
      .from('subscribers')
      .insert([
        {
          email,
          name: name || ''
        }
      ]);

    if (error) {
      // Handle duplicate emails gracefully
      if (error.code === '23505') {
        // Send email anyway for returning subscribers
        await resend.emails.send({
          from: 'Prana House <onboarding@resend.dev>',
          to: email,
          subject: 'Welcome Back to Prana House Newsletter',
          html: `
            <h2>Welcome Back!</h2>
            <p>You're already subscribed to the Prana House newsletter. Check your inbox for our latest wellness tips, class updates, and retreat announcements.</p>
            <p>Namaste,<br/>The Prana House Team 🌿</p>
          `
        });
        return res.json({
          success: true,
          message: 'You are already subscribed!'
        });
      }

      throw error;
    }

    // Send welcome email to new subscriber
    await resend.emails.send({
      from: 'Prana House <onboarding@resend.dev>',
      to: email,
      subject: 'Welcome to Prana House Newsletter 🌿',
      html: `
        <h2>Welcome to Prana House!</h2>
        <p>Thank you for subscribing to our wellness newsletter. You'll now receive:</p>
        <ul>
          <li>Weekly wellness tips and yoga insights</li>
          <li>Exclusive class updates and schedules</li>
          <li>Retreat announcements and special offers</li>
          <li>Mindfulness practices and breathing exercises</li>
        </ul>
        <p>Our next newsletter arrives this week. Stay tuned!</p>
        <p>Namaste,<br/>The Prana House Team 🌿</p>
      `
    });

    res.json({
      success: true,
      message: 'Welcome to the Prana House community! 🌿'
    });

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
    const { error } = await supabase
      .from('testimonials')
      .insert([{ name, location: location || '', program: program || '', rating: parseInt(rating) || 5, message, approved: false }]);
    if (error) throw error;

    // Send confirmation email to user
    await resend.emails.send({
      from: 'Prana House <onboarding@resend.dev>',
      to: 'hello@pranahouse.in',
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

    res.json({ success: true, message: 'Thank you! Your story will appear after review.' });
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

// 404
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(PORT, () => {
  console.log(`\n🌿 Prana House server running at http://localhost:${PORT}\n`);
});

module.exports = app;
