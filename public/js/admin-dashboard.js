/* ═══════════════════════════════════════════════════
   PRANA HOUSE — Admin Dashboard JavaScript
═══════════════════════════════════════════════════ */

// Check authentication
function checkAuth() {
  const token = localStorage.getItem('adminToken');
  if (!token) {
    window.location.href = '/admin/login';
    return false;
  }
  return true;
}

if (!checkAuth()) {
  throw new Error('Not authenticated');
}

// Logout
document.getElementById('logout-btn')?.addEventListener('click', () => {
  localStorage.removeItem('adminToken');
  window.location.href = '/admin/login';
});

// Theme toggle
const themeToggle = document.getElementById('theme-toggle-admin');
const currentTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);
themeToggle.textContent = currentTheme === 'dark' ? '☀️' : '🌙';

themeToggle?.addEventListener('click', () => {
  const theme = document.documentElement.getAttribute('data-theme');
  const newTheme = theme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
});

// Section Navigation
const navCards = document.querySelectorAll('.admin-nav-card');
const sections = document.querySelectorAll('.admin-section');

navCards.forEach(card => {
  card.addEventListener('click', () => {
    const sectionId = card.dataset.section;
    
    navCards.forEach(c => c.classList.remove('active'));
    card.classList.add('active');
    
    sections.forEach(s => s.classList.remove('active'));
    document.getElementById(`section-${sectionId}`).classList.add('active');
    
    // Load data for the section
    loadSectionData(sectionId);
  });
});

// Modal Functions
function openModal(modalId) {
  document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove('active');
  const form = document.querySelector(`#${modalId} form`);
  if (form) form.reset();
}

// Close modal on backdrop click
document.querySelectorAll('.modal').forEach(modal => {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal(modal.id);
    }
  });
});

// ══════════════════════════════════════════════════════════════
// GALLERY MANAGEMENT
// ══════════════════════════════════════════════════════════════

document.getElementById('add-gallery-btn')?.addEventListener('click', () => {
  document.getElementById('gallery-modal-title').textContent = 'Add Gallery Image';
  document.getElementById('gallery-form').reset();
  document.getElementById('gallery-id').value = '';
  openModal('gallery-modal');
});

async function loadGalleryData() {
  try {
    const res = await fetch('/api/gallery');
    const data = await res.json();
    
    document.getElementById('gallery-count').textContent = data.length;
    document.getElementById('gallery-visible').textContent = data.filter(i => i.visible).length;
    
    const tbody = document.querySelector('#gallery-table tbody');
    if (data.length === 0) {
      tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;padding:2rem;color:var(--text-light);">No images yet. Click "Add Image" to get started.</td></tr>';
      return;
    }
    
    tbody.innerHTML = data.map(item => `
      <tr>
        <td><img src="${item.url}" alt="${item.alt || item.caption}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'60\\' height=\\'60\\'%3E%3Crect fill=\\'%23ddd\\' width=\\'60\\' height=\\'60\\'/%3E%3C/svg%3E'"/></td>
        <td>${item.caption || '-'}</td>
        <td><span style="background:var(--bg-alt);padding:0.25rem 0.75rem;border-radius:50px;font-size:0.8rem;">${item.category}</span></td>
        <td>${item.visible ? '<span style="color:var(--accent);">✓ Visible</span>' : '<span style="color:var(--text-light);">Hidden</span>'}</td>
        <td>
          <div class="btn-group">
            <button class="btn btn-outline btn-sm-action" onclick="editGallery('${item.url}')">Edit</button>
            <button class="btn btn-outline btn-sm-action" onclick="deleteGallery('${item.url}')" style="color:#c94a4a;">Delete</button>
          </div>
        </td>
      </tr>
    `).join('');
  } catch (err) {
    console.error('Failed to load gallery:', err);
  }
}

document.getElementById('gallery-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);
  data.visible = document.getElementById('gallery-visible').checked;
  data.sort_order = parseInt(data.sort_order) || 0;
  
  try {
    const res = await fetch('/api/admin/gallery', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
      },
      body: JSON.stringify(data)
    });
    
    if (res.ok) {
      closeModal('gallery-modal');
      loadGalleryData();
      alert('Image saved successfully!');
    } else {
      alert('Failed to save image');
    }
  } catch (err) {
    alert('Error: ' + err.message);
  }
});

window.editGallery = async (url) => {
  try {
    const res = await fetch('/api/gallery');
    const data = await res.json();
    const item = data.find(i => i.url === url);
    
    if (item) {
      document.getElementById('gallery-modal-title').textContent = 'Edit Gallery Image';
      document.querySelector('[name="url"]').value = item.url;
      document.querySelector('[name="caption"]').value = item.caption || '';
      document.querySelector('[name="category"]').value = item.category;
      document.querySelector('[name="alt"]').value = item.alt || '';
      document.querySelector('[name="sort_order"]').value = item.sort_order || 0;
      document.getElementById('gallery-visible').checked = item.visible;
      openModal('gallery-modal');
    }
  } catch (err) {
    alert('Failed to load image details');
  }
};

window.deleteGallery = async (url) => {
  if (!confirm('Delete this image?')) return;
  
  try {
    const res = await fetch('/api/admin/gallery', {
      method: 'DELETE',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
      },
      body: JSON.stringify({ url })
    });
    
    if (res.ok) {
      loadGalleryData();
      alert('Image deleted');
    }
  } catch (err) {
    alert('Failed to delete');
  }
};

// ══════════════════════════════════════════════════════════════
// BLOG MANAGEMENT
// ══════════════════════════════════════════════════════════════

document.getElementById('add-blog-btn')?.addEventListener('click', () => {
  document.getElementById('blog-modal-title').textContent = 'New Blog Post';
  document.getElementById('blog-form').reset();
  document.getElementById('blog-id').value = '';
  openModal('blog-modal');
});

async function loadBlogData() {
  const tbody = document.querySelector('#blog-table tbody');
  tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;padding:2rem;color:var(--text-light);">Blog management coming soon. Data stored in Supabase.</td></tr>';
  document.getElementById('blog-count').textContent = '0';
  document.getElementById('blog-published').textContent = '0';
}

document.getElementById('blog-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);
  data.published = document.getElementById('blog-published').checked;
  data.slug = data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  
  alert('Blog post saved! (Connect to Supabase blogs table)');
  closeModal('blog-modal');
});

// ══════════════════════════════════════════════════════════════
// RETREAT MANAGEMENT
// ══════════════════════════════════════════════════════════════

document.getElementById('add-retreat-btn')?.addEventListener('click', () => {
  document.getElementById('retreat-modal-title').textContent = 'New Retreat';
  document.getElementById('retreat-form').reset();
  document.getElementById('retreat-id').value = '';
  openModal('retreat-modal');
});

async function loadRetreatData() {
  const tbody = document.querySelector('#retreat-table tbody');
  tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;padding:2rem;color:var(--text-light);">No retreats scheduled. Add one to get started!</td></tr>';
}

document.getElementById('retreat-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);
  data.active = document.getElementById('retreat-active').checked;
  data.highlights = data.highlights.split('\n').filter(h => h.trim());
  
  alert('Retreat saved! (Connect to Supabase retreats table)');
  closeModal('retreat-modal');
});

// ══════════════════════════════════════════════════════════════
// CLASS MANAGEMENT
// ══════════════════════════════════════════════════════════════

document.getElementById('add-class-btn')?.addEventListener('click', () => {
  document.getElementById('class-modal-title').textContent = 'New Class';
  document.getElementById('class-form').reset();
  document.getElementById('class-id').value = '';
  openModal('class-modal');
});

async function loadClassData() {
  const tbody = document.querySelector('#class-table tbody');
  tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;padding:2rem;color:var(--text-light);">No classes scheduled. Add one to get started!</td></tr>';
}

document.getElementById('class-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);
  data.active = document.getElementById('class-active').checked;
  
  alert('Class saved! (Connect to Supabase classes table)');
  closeModal('class-modal');
});

// ══════════════════════════════════════════════════════════════
// LOAD SECTION DATA
// ══════════════════════════════════════════════════════════════

function loadSectionData(section) {
  switch(section) {
    case 'gallery':
      loadGalleryData();
      break;
    case 'blogs':
      loadBlogData();
      break;
    case 'retreats':
      loadRetreatData();
      break;
    case 'classes':
      loadClassData();
      break;
  }
}

// Initial load
loadGalleryData();
