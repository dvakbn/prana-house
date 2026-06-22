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
        <!-- 8 fully symmetrical petals radiating from center -->
        <ellipse cx="20" cy="20" rx="3.2" ry="8" fill="rgba(194,115,138,0.18)" stroke="var(--accent)" stroke-width="1" transform="rotate(0 20 20)"/>
        <ellipse cx="20" cy="20" rx="3.2" ry="8" fill="rgba(194,115,138,0.18)" stroke="var(--accent)" stroke-width="1" transform="rotate(45 20 20)"/>
        <ellipse cx="20" cy="20" rx="3.2" ry="8" fill="rgba(194,115,138,0.18)" stroke="var(--accent)" stroke-width="1" transform="rotate(90 20 20)"/>
        <ellipse cx="20" cy="20" rx="3.2" ry="8" fill="rgba(194,115,138,0.18)" stroke="var(--accent)" stroke-width="1" transform="rotate(135 20 20)"/>
        <!-- Center circle -->
        <circle cx="20" cy="20" r="3.5" fill="var(--accent-warm)" opacity="0.9"/>
        <circle cx="20" cy="20" r="1.5" fill="#fff" opacity="0.7"/>
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
            <ellipse cx="20" cy="20" rx="3.2" ry="8" fill="rgba(194,115,138,0.18)" stroke="var(--accent)" stroke-width="1" transform="rotate(0 20 20)"/>
            <ellipse cx="20" cy="20" rx="3.2" ry="8" fill="rgba(194,115,138,0.18)" stroke="var(--accent)" stroke-width="1" transform="rotate(45 20 20)"/>
            <ellipse cx="20" cy="20" rx="3.2" ry="8" fill="rgba(194,115,138,0.18)" stroke="var(--accent)" stroke-width="1" transform="rotate(90 20 20)"/>
            <ellipse cx="20" cy="20" rx="3.2" ry="8" fill="rgba(194,115,138,0.18)" stroke="var(--accent)" stroke-width="1" transform="rotate(135 20 20)"/>
            <circle cx="20" cy="20" r="3.5" fill="var(--accent-warm)" opacity="0.9"/>
            <circle cx="20" cy="20" r="1.5" fill="#fff" opacity="0.7"/>
          </svg>
          <span style="font-family:var(--font-display);font-size:1.3rem;margin-left:0.6rem;">Prana House</span>
        </a>
        <p>A sanctuary of yoga, breath and holistic healing in the heart of Pratap Nagar, Jaipur.</p>
        <div class="footer-social">
          <a href="https://www.instagram.com/between2breath/" target="_blank" class="social-btn" aria-label="Instagram">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          </a>
          <a href="https://wa.me/919599839737?text=Hello%2C%20I%20want%20to%20know%20more%20about%20Prana%20House%20%F0%9F%8C%BF" target="_blank" class="social-btn" aria-label="WhatsApp">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          </a>
          <a href="https://www.youtube.com/@between2breath" target="_blank" class="social-btn" aria-label="YouTube">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          </a>
          <a href="https://www.facebook.com/between2breath" target="_blank" class="social-btn" aria-label="Facebook">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </a>
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
          <li><a href="mailto:hello@pranayoga.qzz.io">✉️ hello@pranayoga.qzz.io</a></li>
          <li><a href="https://wa.me/919599839737">📞 +91 95998 39737</a></li>
          <li style="margin-top:0.75rem;font-size:0.82rem;color:var(--text-light);">Mon – Sat: 6:00 AM – 8:00 PM</li>
          <li style="font-size:0.82rem;color:var(--text-light);">Sunday: 7:00 AM – 12:00 PM</li>
        </ul>
      </div>

    </div>

    <div class="footer-bottom">
      <span>© <span id="footerYear">2025</span> Prana House. All rights reserved.</span>
      <span style="display:flex;gap:1.5rem;">
        <a href="/privacy-policy">Privacy Policy</a>
        <a href="/terms">Terms of Use</a>
        <a href="/refund-policy">Refund Policy</a>
      </span>
      <span>Made with 🌿 in Jaipur</span>
    </div>
  </div>
</footer>
`;

// ── Footer CTA (dark, lotus SVG) ──
const FOOTER_CTA_HTML = `
<section class="footer-cta-section">
  <div class="footer-cta-inner">
    <div class="footer-cta-text">
      <div class="eyebrow-label">Ready when you are</div>
      <h2 class="heading-editorial">Book your <em>first class.</em></h2>
    </div>
    <div class="footer-cta-actions">
      <a href="/contact" class="btn btn-lg footer-cta-btn">Start your journey</a>
    </div>
    <div class="footer-cta-decor" aria-hidden="true">
      <svg viewBox="0 0 300 500" xmlns="http://www.w3.org/2000/svg" fill="none">
        <ellipse cx="150" cy="280" rx="40" ry="80" stroke="#C8A96E" stroke-width="1.2" opacity="0.45" transform="rotate(-15 150 280)"/>
        <ellipse cx="150" cy="280" rx="40" ry="80" stroke="#C8A96E" stroke-width="1.2" opacity="0.45"/>
        <ellipse cx="150" cy="280" rx="40" ry="80" stroke="#C8A96E" stroke-width="1.2" opacity="0.45" transform="rotate(15 150 280)"/>
        <ellipse cx="150" cy="280" rx="40" ry="80" stroke="#C8A96E" stroke-width="1.2" opacity="0.45" transform="rotate(30 150 280)"/>
        <ellipse cx="150" cy="280" rx="40" ry="80" stroke="#C8A96E" stroke-width="1.2" opacity="0.45" transform="rotate(-30 150 280)"/>
        <circle cx="150" cy="260" r="18" stroke="#C2738A" stroke-width="1.2" opacity="0.5" fill="none"/>
        <path d="M150 360 C140 400 155 430 148 480" stroke="#C2738A" stroke-width="1" opacity="0.3"/>
        <path d="M148 400 C120 385 105 395 110 415 C115 435 140 425 148 400Z" stroke="#C2738A" stroke-width="1" opacity="0.3" fill="rgba(194,115,138,0.06)"/>
        <path d="M149 420 C177 405 192 415 187 435 C182 455 157 445 149 420Z" stroke="#C2738A" stroke-width="1" opacity="0.3" fill="rgba(194,115,138,0.06)"/>
      </svg>
    </div>
  </div>
</section>
`;

// Inject into page
document.getElementById('navbar-placeholder')?.insertAdjacentHTML('afterend', NAVBAR_HTML);
document.getElementById('footer-placeholder')?.insertAdjacentHTML('beforebegin', FOOTER_CTA_HTML + FOOTER_HTML);

// ── Floating Action Buttons (WhatsApp + Back to Top) ──
const FAB_HTML = `
<div class="fab-stack">
  <a href="https://wa.me/919599839737?text=Hello%2C%20I%20want%20to%20know%20more%20about%20Prana%20House%20%F0%9F%8C%BF"
     target="_blank" rel="noopener" class="fab fab-whatsapp" aria-label="Chat on WhatsApp" title="Chat with us on WhatsApp">
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
  </a>
  <button class="fab fab-top" id="fab-top" aria-label="Back to top" title="Back to top">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
  </button>
</div>
`;
document.body.insertAdjacentHTML('beforeend', FAB_HTML);

// Back-to-top behaviour
(function () {
  const topBtn = document.getElementById('fab-top');
  if (!topBtn) return;
  window.addEventListener('scroll', () => {
    topBtn.classList.toggle('show', window.scrollY > 500);
  }, { passive: true });
  topBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
