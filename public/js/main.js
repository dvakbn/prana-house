/* ═══════════════════════════════════════════════════
   PRANA HOUSE — main.js
   Shared JS: navbar, theme, animations, forms
═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Theme Toggle ──────────────────────────────────
  const themeToggle = document.getElementById('theme-toggle');
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('ph-theme') || 'light';
  root.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeToggle?.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('ph-theme', next);
    updateThemeIcon(next);
  });

  function updateThemeIcon(theme) {
    if (themeToggle) themeToggle.innerHTML = theme === 'dark' ? '☀️' : '🌙';
  }

  // ── Navbar Scroll ─────────────────────────────────
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) navbar?.classList.add('scrolled');
    else navbar?.classList.remove('scrolled');
    updateScrollProgress();
    markActiveNav();
  }, { passive: true });

  // ── Scroll Progress Bar ───────────────────────────
  function updateScrollProgress() {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;
    const total = document.body.scrollHeight - window.innerHeight;
    bar.style.width = (window.scrollY / total * 100) + '%';
  }

  // ── Active Nav Link ───────────────────────────────
  function markActiveNav() {
    const path = window.location.pathname;
    document.querySelectorAll('.nav-links a').forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === path);
    });
  }
  markActiveNav();

  // ── Mobile Menu ───────────────────────────────────
  const hamburger = document.getElementById('nav-hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  hamburger?.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  // Close on link click
  mobileMenu?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger?.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ── Fade-In on Scroll ─────────────────────────────
  const fadeEls = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  fadeEls.forEach(el => observer.observe(el));

  // ── Contact Form ──────────────────────────────────
  const contactForm = document.getElementById('contact-form');
  contactForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('[type="submit"]');
    const msg = document.getElementById('form-message');
    btn.disabled = true;
    btn.textContent = 'Sending...';
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(contactForm)))
      });
      const data = await res.json();
      if (data.success) {
        showMessage(msg, data.message, 'success');
        contactForm.reset();
      } else {
        showMessage(msg, data.error || 'Something went wrong.', 'error');
      }
    } catch {
      showMessage(msg, 'Network error. Please try again.', 'error');
    } finally {
      btn.disabled = false;
      btn.textContent = 'Send Message';
    }
  });

  // ── Newsletter Form ───────────────────────────────
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      const msg = form.nextElementSibling;
      btn.disabled = true;
      btn.textContent = '...';
      try {
        const res = await fetch('/api/newsletter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(Object.fromEntries(new FormData(form)))
        });
        const data = await res.json();
        if (data.success) {
          form.innerHTML = `<p style="color:#fff;font-size:1rem;">🌿 ${data.message}</p>`;
        }
      } catch {
        btn.disabled = false;
        btn.textContent = 'Subscribe';
      }
    });
  });

  function showMessage(el, text, type) {
    if (!el) return;
    el.textContent = text;
    el.className = 'form-message ' + type;
    el.style.display = 'block';
    setTimeout(() => { el.style.display = 'none'; }, 6000);
  }

  // ── Class Toggle Tabs ─────────────────────────────
  document.querySelectorAll('.toggle-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const group = tab.closest('.toggle-tabs');
      group.querySelectorAll('.toggle-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.dataset.target;
      const parent = tab.closest('section') || document;
      parent.querySelectorAll('.tab-panel').forEach(p => {
        p.classList.toggle('hidden', p.id !== target);
      });
    });
  });

  // ── Smooth anchor scroll ──────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

});
