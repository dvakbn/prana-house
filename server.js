
require('dotenv').config();

const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

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
app.post('/api/newsletter', (req, res) => {
  const { email, name } = req.body;
  if (!email) return res.status(400).json({ success: false, error: 'Email is required.' });

  const dataPath = path.join(__dirname, 'data', 'subscribers.json');
  let subscribers = [];
  if (fs.existsSync(dataPath)) {
    try { subscribers = JSON.parse(fs.readFileSync(dataPath, 'utf8')); } catch (e) { subscribers = []; }
  }

  // Check duplicate
  if (subscribers.find(s => s.email === email)) {
    return res.json({ success: true, message: 'You are already subscribed!' });
  }

  subscribers.push({ email, name: name || '', subscribedAt: new Date().toISOString() });
  fs.writeFileSync(dataPath, JSON.stringify(subscribers, null, 2));

  res.json({ success: true, message: 'Welcome to the Prana House community! 🌿' });
});

// Get all enquiries (admin use)
app.get('/api/admin/enquiries', (req, res) => {
  const dataPath = path.join(__dirname, 'data', 'enquiries.json');
  if (!fs.existsSync(dataPath)) return res.json([]);
  try {
    res.json(JSON.parse(fs.readFileSync(dataPath, 'utf8')));
  } catch (e) {
    res.json([]);
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

// 404
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(PORT, () => {
  console.log(`\n🌿 Prana House server running at http://localhost:${PORT}\n`);
});

module.exports = app;
