/* ═══════════════════════════════════════════════════
   PRANA HOUSE — Dynamic Content Loader
   Fetches blogs, retreats, and classes from API
═══════════════════════════════════════════════════ */

// ── Load Gallery Images ──────────────────────────────────────────────────────
async function loadGalleryImages() {
  const container = document.getElementById('gallery-grid');
  if (!container) return;
  
  try {
    const response = await fetch('/api/gallery');
    const images = await response.json();
    
    if (images.length === 0) {
      container.innerHTML = '<p style="text-align:center;padding:3rem;color:var(--text-light);">No images yet.</p>';
      return;
    }
    
    container.innerHTML = images.map(img => `
      <div class="gallery-item" data-category="${img.category}">
        <img src="${img.url}" alt="${img.alt || img.caption}" loading="lazy">
        ${img.caption ? `<p class="caption">${img.caption}</p>` : ''}
      </div>
    `).join('');
  } catch (err) {
    console.error('Failed to load gallery:', err);
  }
}

// ── Load Blog Posts ──────────────────────────────────────────────────────────
async function loadBlogPosts() {
  const container = document.getElementById('blog-list');
  if (!container) return;
  
  try {
    const response = await fetch('/api/blogs');
    const blogs = await response.json();
    
    if (blogs.length === 0) {
      container.innerHTML = '<p style="text-align:center;padding:3rem;color:var(--text-light);">No blog posts yet.</p>';
      return;
    }
    
    container.innerHTML = blogs.map(blog => `
      <article class="blog-card">
        ${blog.image ? `<img src="${blog.image}" alt="${blog.title}" loading="lazy">` : ''}
        <div class="blog-content">
          <span class="blog-category">${blog.category || 'General'}</span>
          <h2>${blog.title}</h2>
          <p class="blog-excerpt">${blog.excerpt || ''}</p>
          <div class="blog-meta">
            <span>By ${blog.author}</span>
            <span>${new Date(blog.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
          </div>
          <a href="/blog/${blog.slug}" class="read-more">Read More →</a>
        </div>
      </article>
    `).join('');
  } catch (err) {
    console.error('Failed to load blogs:', err);
  }
}

// ── Load Retreats ────────────────────────────────────────────────────────────
async function loadRetreats() {
  const container = document.getElementById('retreats-list');
  if (!container) return;
  
  try {
    const response = await fetch('/api/retreats');
    const retreats = await response.json();
    
    if (retreats.length === 0) {
      container.innerHTML = '<p style="text-align:center;padding:3rem;color:var(--text-light);">No upcoming retreats.</p>';
      return;
    }
    
    container.innerHTML = retreats.map(retreat => `
      <div class="retreat-card">
        ${retreat.image ? `<img src="${retreat.image}" alt="${retreat.title}" loading="lazy">` : ''}
        <div class="retreat-content">
          <h3>${retreat.title}</h3>
          <div class="retreat-details">
            <p><strong>📍 Location:</strong> ${retreat.location}</p>
            <p><strong>📅 Dates:</strong> ${new Date(retreat.start_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} - ${new Date(retreat.end_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
            ${retreat.price ? `<p><strong>💰 Price:</strong> ₹${retreat.price.toLocaleString('en-IN')}</p>` : ''}
            ${retreat.max_participants ? `<p><strong>👥 Capacity:</strong> ${retreat.max_participants} participants</strong></p>` : ''}
          </div>
          ${retreat.description ? `<p class="retreat-description">${retreat.description}</p>` : ''}
          ${retreat.highlights && retreat.highlights.length > 0 ? `
            <div class="retreat-highlights">
              <h4>Highlights</h4>
              <ul>
                ${retreat.highlights.map(h => `<li>${h}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
          <a href="https://wa.me/919599839737?text=I'm interested in ${encodeURIComponent(retreat.title)}" class="btn">Enquire Now</a>
        </div>
      </div>
    `).join('');
  } catch (err) {
    console.error('Failed to load retreats:', err);
  }
}

// ── Load Classes ─────────────────────────────────────────────────────────────
async function loadClasses() {
  const container = document.getElementById('classes-list');
  if (!container) return;
  
  try {
    const response = await fetch('/api/classes');
    const classes = await response.json();
    
    if (classes.length === 0) {
      container.innerHTML = '<p style="text-align:center;padding:3rem;color:var(--text-light);">No classes available at the moment.</p>';
      return;
    }
    
    container.innerHTML = classes.map(cls => `
      <div class="class-card">
        <div class="class-header">
          <h3>${cls.name}</h3>
          <span class="class-type ${cls.type.toLowerCase()}">${cls.type}</span>
        </div>
        <div class="class-details">
          <p><strong>📅 Schedule:</strong> ${cls.schedule}</p>
          ${cls.duration ? `<p><strong>⏱️ Duration:</strong> ${cls.duration} minutes</p>` : ''}
          <p><strong>📊 Level:</strong> ${cls.level === 'all' ? 'All Levels' : cls.level.charAt(0).toUpperCase() + cls.level.slice(1)}</p>
          ${cls.price ? `<p><strong>💰 Price:</strong> ₹${cls.price.toLocaleString('en-IN')}/month</p>` : ''}
          ${cls.max_students ? `<p><strong>👥 Max Students:</strong> ${cls.max_students}</p>` : ''}
        </div>
        ${cls.description ? `<p class="class-description">${cls.description}</p>` : ''}
        <a href="https://wa.me/919599839737?text=I want to join ${encodeURIComponent(cls.name)}" class="btn">Join Class</a>
      </div>
    `).join('');
  } catch (err) {
    console.error('Failed to load classes:', err);
  }
}

// ── Auto-load on page ready ──────────────────────────────────────────────────
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initDynamicContent);
} else {
  initDynamicContent();
}

function initDynamicContent() {
  loadGalleryImages();
  loadBlogPosts();
  loadRetreats();
  loadClasses();
}
