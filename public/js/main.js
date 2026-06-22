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


/* ═══════════════════════════════════════════════════
   PREMIUM EDITORIAL REDESIGN (v2) — interactions
═══════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {

  // ── Appear-on-scroll ──────────────────────────────
  const appearEls = document.querySelectorAll('.appear-on-scroll');
  if (appearEls.length) {
    const appearObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          appearObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
    appearEls.forEach(el => appearObserver.observe(el));
  }

  // ── Hero parallax ─────────────────────────────────
  const heroImage = document.querySelector('.hero-editorial .hero-image');
  if (heroImage) {
    window.addEventListener('scroll', () => {
      heroImage.style.transform = `translateY(${window.scrollY * 0.22}px)`;
    }, { passive: true });
  }

  // ── Philosophy slideshow ──────────────────────────
  (function () {
    const slides = document.querySelectorAll('.philosophy-slide');
    if (!slides.length) return;
    let idx = 0;
    const show = (n) => {
      idx = (n + slides.length) % slides.length;
      slides.forEach((s, i) => s.classList.toggle('active', i === idx));
    };
    document.querySelector('.slide-next')?.addEventListener('click', () => show(idx + 1));
    document.querySelector('.slide-prev')?.addEventListener('click', () => show(idx - 1));
    let auto = setInterval(() => show(idx + 1), 5000);
    document.querySelector('.philosophy-slideshow')?.addEventListener('mouseenter', () => clearInterval(auto));
    document.querySelector('.philosophy-slideshow')?.addEventListener('mouseleave', () => { auto = setInterval(() => show(idx + 1), 5000); });
  })();

  // ── Stats counter ─────────────────────────────────
  (function () {
    const statsSection = document.querySelector('.stats-section');
    if (!statsSection) return;
    const animateCounters = () => {
      document.querySelectorAll('.stat-number').forEach(el => {
        const target = parseInt(el.dataset.target, 10) || 0;
        const suffix = el.dataset.suffix || '';
        const duration = 1800;
        const step = target / (duration / 16);
        let current = 0;
        const tick = () => {
          current = Math.min(current + step, target);
          el.textContent = Math.floor(current) + suffix;
          if (current < target) requestAnimationFrame(tick);
        };
        tick();
      });
    };
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { animateCounters(); statsObserver.disconnect(); }
      });
    }, { threshold: 0.3 });
    statsObserver.observe(statsSection);
  })();

  // ── Drag-to-scroll sliders ────────────────────────
  document.querySelectorAll('.cards-slider').forEach(slider => {
    let isDown = false, startX, scrollLeft;
    slider.addEventListener('mousedown', e => {
      isDown = true; slider.classList.add('active');
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener('mouseleave', () => { isDown = false; });
    slider.addEventListener('mouseup', () => { isDown = false; });
    slider.addEventListener('mousemove', e => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      slider.scrollLeft = scrollLeft - (x - startX) * 1.5;
    });
  });

  // ── 3D perspective tilt ───────────────────────────
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    bindTilt(document);
  }

  // ── Editorial FAQ accordion ───────────────────────
  bindEditorialFaq(document);

  // ── Footer year ───────────────────────────────────
  const yearEl = document.getElementById('footerYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});

// Exposed helpers so dynamically-injected cards can rebind
function bindTilt(scope) {
  scope.querySelectorAll('.class-card-portrait:not([data-tilt]), .blog-card-featured:not([data-tilt])').forEach(card => {
    card.setAttribute('data-tilt', '1');
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left, y = e.clientY - rect.top;
      const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -4;
      const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 4;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseenter', () => { card.style.transition = 'transform 0.1s ease'; });
    card.addEventListener('mouseleave', () => { card.style.transition = 'transform 0.5s ease'; card.style.transform = ''; });
  });
}

function bindEditorialFaq(scope) {
  scope.querySelectorAll('.faq-acc-question').forEach(btn => {
    if (btn.dataset.bound) return;
    btn.dataset.bound = '1';
    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      const answer = btn.nextElementSibling;
      btn.closest('.faq-list')?.querySelectorAll('.faq-acc-question').forEach(b => {
        b.setAttribute('aria-expanded', 'false');
        if (b.nextElementSibling) b.nextElementSibling.style.maxHeight = null;
      });
      if (!isOpen) {
        btn.setAttribute('aria-expanded', 'true');
        if (answer) answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

// Re-init drag scroll for sliders created after load
function bindDragScroll(slider) {
  let isDown = false, startX, scrollLeft;
  slider.addEventListener('mousedown', e => { isDown = true; startX = e.pageX - slider.offsetLeft; scrollLeft = slider.scrollLeft; });
  slider.addEventListener('mouseleave', () => { isDown = false; });
  slider.addEventListener('mouseup', () => { isDown = false; });
  slider.addEventListener('mousemove', e => { if (!isDown) return; e.preventDefault(); const x = e.pageX - slider.offsetLeft; slider.scrollLeft = scrollLeft - (x - startX) * 1.5; });
}

// Re-run appear-on-scroll for dynamically added elements
function observeAppear(scope) {
  const els = (scope || document).querySelectorAll('.appear-on-scroll:not(.visible)');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); obs.unobserve(entry.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
  els.forEach(el => obs.observe(el));
}
