/* ═══════════════════════════════════════════════════
   PRANA HOUSE — components.js
   Injects shared Navbar + Footer into every page
═══════════════════════════════════════════════════ */

const NAVBAR_HTML = `
<div id="scroll-progress"></div>
<nav class="navbar" id="navbar">
  <div class="nav-inner">

    <!-- Logo -->
    <a href="/" class="nav-logo">
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="19" stroke="var(--accent)" stroke-width="1.2" fill="none"/>
        <!-- Lotus petals -->
        <ellipse cx="20" cy="14" rx="3.5" ry="7" fill="none" stroke="var(--accent)" stroke-width="1.1"/>
        <ellipse cx="20" cy="14" rx="3.5" ry="7" fill="none" stroke="var(--accent)" stroke-width="1.1" transform="rotate(45 20 20)"/>
        <ellipse cx="20" cy="14" rx="3.5" ry="7" fill="none" stroke="var(--accent)" stroke-width="1.1" transform="rotate(-45 20 20)"/>
        <ellipse cx="20" cy="14" rx="3.5" ry="7" fill="none" stroke="var(--accent)" stroke-width="1.1" transform="rotate(90 20 20)"/>
        <!-- Center dot -->
        <circle cx="20" cy="20" r="2.5" fill="var(--accent-warm)"/>
        <!-- Bottom arc (ground) -->
        <path d="M11 26 Q20 31 29 26" stroke="var(--accent)" stroke-width="1.1" fill="none"/>
      </svg>
      <span class="nav-logo-text">
        Prana House
        <span class="nav-logo-sub">Yoga &amp; Wellness</span>
      </span>
    </a>

    <!-- Desktop Links -->
    <div class="nav-links">
      <a href="/">Home</a>
      <div class="nav-dropdown">
        <a href="/programs">Programs ▾</a>
        <div class="nav-dropdown-menu">
          <a href="/programs#meditation">Guided Meditation</a>
          <a href="/programs#breathing">Breathing Exercises</a>
          <a href="/programs#flexibility">Flexibility Training</a>
          <a href="/programs#stress">Stress Relief</a>
        </div>
      </div>
      <a href="/classes">Classes</a>
      <a href="/retreat">Retreat</a>
      <a href="/teacher">Our Teacher</a>
      <a href="/blog">Blog</a>
      <a href="/contact">Contact</a>
    </div>

    <!-- Right Side -->
    <div class="nav-right">
      <button class="theme-toggle" id="theme-toggle" aria-label="Toggle theme">🌙</button>
      <a href="/contact" class="btn btn-primary btn-sm">Book a Class</a>
      <!-- Hamburger -->
      <div class="nav-hamburger" id="nav-hamburger" role="button" aria-label="Menu">
        <span></span><span></span><span></span>
      </div>
    </div>

  </div>
</nav>

<!-- Mobile Menu -->
<div class="mobile-menu" id="mobile-menu">
  <a href="/">Home</a>
  <a href="/programs">Programs</a>
  <a href="/programs#meditation">— Guided Meditation</a>
  <a href="/programs#breathing">— Breathing Exercises</a>
  <a href="/programs#flexibility">— Flexibility Training</a>
  <a href="/programs#stress">— Stress Relief</a>
  <a href="/classes">Classes</a>
  <a href="/retreat">Retreat</a>
  <a href="/teacher">Our Teacher</a>
  <a href="/blog">Blog</a>
  <a href="/contact">Contact</a>
  <a href="/contact" class="btn btn-primary" style="margin-top:1.5rem;justify-content:center;">Book a Class</a>
</div>
`;

const FOOTER_HTML = `
<!-- Newsletter Strip -->
<section class="newsletter-strip" id="section-newsletter">
  <div class="container">
    <h3>Stay Connected with Prana House</h3>
    <p>Weekly wellness tips, class updates & retreat announcements</p>
    <form class="newsletter-form" id="newsletter-form">
      <input type="text" name="name" class="form-input" placeholder="Your name" autocomplete="name"/>
      <input type="email" name="email" class="form-input" placeholder="Your email" required autocomplete="email"/>
      <button type="submit" class="btn" style="background:#fff;color:var(--accent);white-space:nowrap;">Subscribe 🌿</button>
    </form>
  </div>
</section>

<footer class="footer">
  <div class="container">
    <div class="footer-grid">

      <!-- Brand -->
      <div class="footer-brand" id="footer-brand">
        <a href="/" class="nav-logo" style="margin-bottom:0.5rem;display:inline-flex;">
          <svg viewBox="0 0 40 40" fill="none" width="32" height="32">
            <circle cx="20" cy="20" r="19" stroke="var(--accent)" stroke-width="1.2" fill="none"/>
            <ellipse cx="20" cy="14" rx="3.5" ry="7" fill="none" stroke="var(--accent)" stroke-width="1.1"/>
            <ellipse cx="20" cy="14" rx="3.5" ry="7" fill="none" stroke="var(--accent)" stroke-width="1.1" transform="rotate(45 20 20)"/>
            <ellipse cx="20" cy="14" rx="3.5" ry="7" fill="none" stroke="var(--accent)" stroke-width="1.1" transform="rotate(-45 20 20)"/>
            <ellipse cx="20" cy="14" rx="3.5" ry="7" fill="none" stroke="var(--accent)" stroke-width="1.1" transform="rotate(90 20 20)"/>
            <circle cx="20" cy="20" r="2.5" fill="var(--accent-warm)"/>
            <path d="M11 26 Q20 31 29 26" stroke="var(--accent)" stroke-width="1.1" fill="none"/>
          </svg>
          <span style="font-family:var(--font-display);font-size:1.3rem;margin-left:0.6rem;">Prana House</span>
        </a>
        <p>A sanctuary of yoga, breath and holistic healing in the heart of Pratap Nagar, Jaipur.</p>
        <div class="footer-social">
          <a href="#" class="social-btn" aria-label="Instagram">📷</a>
          <a href="#" class="social-btn" aria-label="YouTube">▶️</a>
          <a href="#" class="social-btn" aria-label="Facebook">💬</a>
          <a href="#" class="social-btn" aria-label="WhatsApp">📱</a>
        </div>
      </div>

      <!-- Programs -->
      <div class="footer-col" id="footer-col-programs">
        <h4>Programs</h4>
        <ul>
          <li><a href="/programs#meditation">Guided Meditation</a></li>
          <li><a href="/programs#breathing">Breathing Exercises</a></li>
          <li><a href="/programs#flexibility">Flexibility Training</a></li>
          <li><a href="/programs#stress">Stress Relief</a></li>
          <li><a href="/classes">Online Classes</a></li>
          <li><a href="/classes">Offline Classes</a></li>
        </ul>
      </div>

      <!-- Quick Links -->
      <div class="footer-col" id="footer-col-links">
        <h4>Quick Links</h4>
        <ul>
          <li><a href="/teacher">Our Teacher</a></li>
          <li><a href="/retreat">Yoga Retreat</a></li>
          <li><a href="/blog">Wellness Blog</a></li>
          <li><a href="/testimonials">Testimonials</a></li>
          <li><a href="/gallery">Gallery</a></li>
          <li><a href="/contact">Contact Us</a></li>
        </ul>
      </div>

      <!-- Contact Info -->
      <div class="footer-col" id="footer-col-contact">
        <h4>Visit Us</h4>
        <ul>
          <li><a href="#">📍 Pratap Nagar, Jaipur, Rajasthan</a></li>
          <li><a href="mailto:hello@pranahouse.in">✉️ hello@pranahouse.in</a></li>
          <li><a href="tel:+919999999999">📞 +91 99999 99999</a></li>
          <li style="margin-top:0.75rem;font-size:0.82rem;color:var(--text-light);">Mon – Sat: 6:00 AM – 8:00 PM</li>
          <li style="font-size:0.82rem;color:var(--text-light);">Sunday: 7:00 AM – 12:00 PM</li>
        </ul>
      </div>

    </div>

    <div class="footer-bottom">
      <span>© 2025 Prana House. All rights reserved.</span>
      <span style="display:flex;gap:1.5rem;">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Use</a>
        <a href="#">Refund Policy</a>
      </span>
      <span>Made with 🌿 in Jaipur</span>
    </div>
  </div>
</footer>
`;

// Inject into page
document.getElementById('navbar-placeholder')?.insertAdjacentHTML('afterend', NAVBAR_HTML);
document.getElementById('footer-placeholder')?.insertAdjacentHTML('beforebegin', FOOTER_HTML);
