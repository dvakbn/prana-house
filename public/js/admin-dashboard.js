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
    
    // Check if server returned an error
    if (!res.ok) {
      throw new Error(`Server error: ${res.status}`);
    }
    
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
    const tbody = document.querySelector('#gallery-table tbody');
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;padding:2rem;">
      <div style="color:#c94a4a;margin-bottom:0.5rem;">⚠️ Failed to connect to database</div>
      <div style="color:var(--text-light);font-size:0.9rem;">Please check that environment variables are set in Vercel.</div>
      <div style="color:var(--text-light);font-size:0.9rem;margin-top:0.5rem;">See <code>VERCEL_SETUP_GUIDE.md</code> for instructions.</div>
    </td></tr>`;
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
    
    const result = await res.json();
    
    if (res.ok) {
      closeModal('gallery-modal');
      loadGalleryData();
      alert('✅ Image saved successfully!');
    } else {
      alert('❌ Failed to save image\n\n' + (result.error || 'Please check Vercel environment variables'));
    }
  } catch (err) {
    alert('❌ Error: ' + err.message + '\n\nCheck VERCEL_SETUP_GUIDE.md for setup instructions');
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
    
    const result = await res.json();
    
    if (res.ok) {
      loadGalleryData();
      alert('✅ Image deleted');
    } else {
      alert('❌ Failed to delete\n\n' + (result.error || 'Unknown error'));
    }
  } catch (err) {
    alert('❌ Error: ' + err.message);
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
  try {
    const res = await fetch('/api/blogs');
    const data = await res.json();
    
    document.getElementById('blog-count').textContent = data.length;
    document.getElementById('blog-published').textContent = data.filter(b => b.published).length;
    
    const tbody = document.querySelector('#blog-table tbody');
    if (data.length === 0) {
      tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;padding:2rem;color:var(--text-light);">No blog posts yet. Click "New Blog Post" to create one.</td></tr>';
      return;
    }
    
    tbody.innerHTML = data.map(blog => `
      <tr>
        <td>${blog.title}</td>
        <td><span style="background:var(--bg-alt);padding:0.25rem 0.75rem;border-radius:50px;font-size:0.8rem;">${blog.category || 'General'}</span></td>
        <td>${blog.author}</td>
        <td>${blog.published ? '<span style="color:var(--accent);">✓ Published</span>' : '<span style="color:var(--text-light);">Draft</span>'}</td>
        <td>
          <div class="btn-group">
            <button class="btn btn-outline btn-sm-action" onclick="editBlog('${blog.id}')">Edit</button>
            <button class="btn btn-outline btn-sm-action" onclick="deleteBlog('${blog.id}')" style="color:#c94a4a;">Delete</button>
          </div>
        </td>
      </tr>
    `).join('');
  } catch (err) {
    console.error('Failed to load blogs:', err);
    const tbody = document.querySelector('#blog-table tbody');
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;padding:2rem;">
      <div style="color:#c94a4a;margin-bottom:0.5rem;">⚠️ Failed to load blogs</div>
      <div style="color:var(--text-light);font-size:0.9rem;">Make sure the 'blogs' table exists in Supabase.</div>
      <div style="color:var(--text-light);font-size:0.9rem;margin-top:0.5rem;">Run <code>SUPABASE_TABLES_SETUP.sql</code> in Supabase SQL Editor.</div>
    </td></tr>`;
  }
}

document.getElementById('blog-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);
  const blogId = document.getElementById('blog-id').value;
  
  data.published = document.getElementById('blog-published').checked;
  data.slug = data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  
  try {
    const url = blogId ? `/api/admin/blogs/${blogId}` : '/api/admin/blogs';
    const method = blogId ? 'PUT' : 'POST';
    
    const res = await fetch(url, {
      method,
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
      },
      body: JSON.stringify(data)
    });
    
    const result = await res.json();
    
    if (res.ok) {
      closeModal('blog-modal');
      loadBlogData();
      alert('✅ Blog post saved successfully!');
    } else {
      alert('❌ Failed to save blog post\n\n' + (result.error || 'Please make sure blogs table exists in Supabase'));
    }
  } catch (err) {
    alert('❌ Error: ' + err.message + '\n\nRun SUPABASE_TABLES_SETUP.sql in Supabase SQL Editor');
  }
});

window.editBlog = async (id) => {
  try {
    const res = await fetch('/api/blogs');
    const data = await res.json();
    const blog = data.find(b => b.id === id);
    
    if (blog) {
      document.getElementById('blog-modal-title').textContent = 'Edit Blog Post';
      document.getElementById('blog-id').value = blog.id;
      document.querySelector('[name="title"]').value = blog.title;
      document.querySelector('[name="slug"]').value = blog.slug;
      document.querySelector('[name="author"]').value = blog.author || 'Dr. Fareen Tak';
      document.querySelector('[name="category"]').value = blog.category || '';
      document.querySelector('[name="image"]').value = blog.image || '';
      document.querySelector('[name="excerpt"]').value = blog.excerpt || '';
      document.querySelector('[name="content"]').value = blog.content;
      document.getElementById('blog-published').checked = blog.published;
      openModal('blog-modal');
    }
  } catch (err) {
    alert('Failed to load blog details');
  }
};

window.deleteBlog = async (id) => {
  if (!confirm('Delete this blog post?')) return;
  
  try {
    const res = await fetch(`/api/admin/blogs/${id}`, {
      method: 'DELETE',
      headers: { 
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
      }
    });
    
    const result = await res.json();
    
    if (res.ok) {
      loadBlogData();
      alert('✅ Blog post deleted');
    } else {
      alert('❌ Failed to delete\n\n' + (result.error || 'Unknown error'));
    }
  } catch (err) {
    alert('❌ Error: ' + err.message);
  }
};

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
  try {
    const res = await fetch('/api/retreats');
    const data = await res.json();
    
    const tbody = document.querySelector('#retreat-table tbody');
    if (data.length === 0) {
      tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;padding:2rem;color:var(--text-light);">No retreats scheduled. Add one to get started!</td></tr>';
      return;
    }
    
    tbody.innerHTML = data.map(retreat => `
      <tr>
        <td>${retreat.title}</td>
        <td>${new Date(retreat.start_date).toLocaleDateString('en-IN')}</td>
        <td>${retreat.location}</td>
        <td>${retreat.active ? '<span style="color:var(--accent);">✓ Active</span>' : '<span style="color:var(--text-light);">Inactive</span>'}</td>
        <td>
          <div class="btn-group">
            <button class="btn btn-outline btn-sm-action" onclick="editRetreat('${retreat.id}')">Edit</button>
            <button class="btn btn-outline btn-sm-action" onclick="deleteRetreat('${retreat.id}')" style="color:#c94a4a;">Delete</button>
          </div>
        </td>
      </tr>
    `).join('');
  } catch (err) {
    console.error('Failed to load retreats:', err);
    const tbody = document.querySelector('#retreat-table tbody');
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;padding:2rem;">
      <div style="color:#c94a4a;margin-bottom:0.5rem;">⚠️ Failed to load retreats</div>
      <div style="color:var(--text-light);font-size:0.9rem;">Run <code>SUPABASE_TABLES_SETUP.sql</code> in Supabase SQL Editor.</div>
    </td></tr>`;
  }
}

document.getElementById('retreat-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);
  const retreatId = document.getElementById('retreat-id').value;
  
  data.active = document.getElementById('retreat-active').checked;
  data.highlights = data.highlights.split('\n').filter(h => h.trim());
  data.price = parseInt(data.price) || null;
  data.max_participants = parseInt(data.max_participants) || null;
  
  try {
    const url = retreatId ? `/api/admin/retreats/${retreatId}` : '/api/admin/retreats';
    const method = retreatId ? 'PUT' : 'POST';
    
    const res = await fetch(url, {
      method,
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
      },
      body: JSON.stringify(data)
    });
    
    const result = await res.json();
    
    if (res.ok) {
      closeModal('retreat-modal');
      loadRetreatData();
      alert('✅ Retreat saved successfully!');
    } else {
      alert('❌ Failed to save retreat\n\n' + (result.error || 'Please make sure retreats table exists in Supabase'));
    }
  } catch (err) {
    alert('❌ Error: ' + err.message + '\n\nRun SUPABASE_TABLES_SETUP.sql in Supabase SQL Editor');
  }
});

window.editRetreat = async (id) => {
  try {
    const res = await fetch('/api/retreats');
    const data = await res.json();
    const retreat = data.find(r => r.id === id);
    
    if (retreat) {
      document.getElementById('retreat-modal-title').textContent = 'Edit Retreat';
      document.getElementById('retreat-id').value = retreat.id;
      document.querySelector('[name="title"]').value = retreat.title;
      document.querySelector('[name="start_date"]').value = retreat.start_date;
      document.querySelector('[name="end_date"]').value = retreat.end_date;
      document.querySelector('[name="location"]').value = retreat.location;
      document.querySelector('[name="price"]').value = retreat.price || '';
      document.querySelector('[name="max_participants"]').value = retreat.max_participants || '';
      document.querySelector('[name="description"]').value = retreat.description || '';
      document.querySelector('[name="highlights"]').value = (retreat.highlights || []).join('\n');
      document.querySelector('[name="image"]').value = retreat.image || '';
      document.getElementById('retreat-active').checked = retreat.active;
      openModal('retreat-modal');
    }
  } catch (err) {
    alert('Failed to load retreat details');
  }
};

window.deleteRetreat = async (id) => {
  if (!confirm('Delete this retreat?')) return;
  
  try {
    const res = await fetch(`/api/admin/retreats/${id}`, {
      method: 'DELETE',
      headers: { 
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
      }
    });
    
    const result = await res.json();
    
    if (res.ok) {
      loadRetreatData();
      alert('✅ Retreat deleted');
    } else {
      alert('❌ Failed to delete\n\n' + (result.error || 'Unknown error'));
    }
  } catch (err) {
    alert('❌ Error: ' + err.message);
  }
};

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
  try {
    const res = await fetch('/api/classes');
    const data = await res.json();
    
    const tbody = document.querySelector('#class-table tbody');
    if (data.length === 0) {
      tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;padding:2rem;color:var(--text-light);">No classes scheduled. Add one to get started!</td></tr>';
      return;
    }
    
    tbody.innerHTML = data.map(cls => `
      <tr>
        <td>${cls.name}</td>
        <td><span style="background:var(--bg-alt);padding:0.25rem 0.75rem;border-radius:50px;font-size:0.8rem;">${cls.type}</span></td>
        <td>${cls.schedule}</td>
        <td>${cls.active ? '<span style="color:var(--accent);">✓ Active</span>' : '<span style="color:var(--text-light);">Inactive</span>'}</td>
        <td>
          <div class="btn-group">
            <button class="btn btn-outline btn-sm-action" onclick="editClass('${cls.id}')">Edit</button>
            <button class="btn btn-outline btn-sm-action" onclick="deleteClass('${cls.id}')" style="color:#c94a4a;">Delete</button>
          </div>
        </td>
      </tr>
    `).join('');
  } catch (err) {
    console.error('Failed to load classes:', err);
    const tbody = document.querySelector('#class-table tbody');
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;padding:2rem;">
      <div style="color:#c94a4a;margin-bottom:0.5rem;">⚠️ Failed to load classes</div>
      <div style="color:var(--text-light);font-size:0.9rem;">Run <code>SUPABASE_TABLES_SETUP.sql</code> in Supabase SQL Editor.</div>
    </td></tr>`;
  }
}

document.getElementById('class-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);
  const classId = document.getElementById('class-id').value;
  
  data.active = document.getElementById('class-active').checked;
  data.duration = parseInt(data.duration) || null;
  data.price = parseInt(data.price) || null;
  data.max_students = parseInt(data.max_students) || null;
  
  try {
    const url = classId ? `/api/admin/classes/${classId}` : '/api/admin/classes';
    const method = classId ? 'PUT' : 'POST';
    
    const res = await fetch(url, {
      method,
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
      },
      body: JSON.stringify(data)
    });
    
    const result = await res.json();
    
    if (res.ok) {
      closeModal('class-modal');
      loadClassData();
      alert('✅ Class saved successfully!');
    } else {
      alert('❌ Failed to save class\n\n' + (result.error || 'Please make sure classes table exists in Supabase'));
    }
  } catch (err) {
    alert('❌ Error: ' + err.message + '\n\nRun SUPABASE_TABLES_SETUP.sql in Supabase SQL Editor');
  }
});

window.editClass = async (id) => {
  try {
    const res = await fetch('/api/classes');
    const data = await res.json();
    const cls = data.find(c => c.id === id);
    
    if (cls) {
      document.getElementById('class-modal-title').textContent = 'Edit Class';
      document.getElementById('class-id').value = cls.id;
      document.querySelector('[name="name"]').value = cls.name;
      document.querySelector('[name="type"]').value = cls.type;
      document.querySelector('[name="level"]').value = cls.level || 'all';
      document.querySelector('[name="schedule"]').value = cls.schedule;
      document.querySelector('[name="duration"]').value = cls.duration || '';
      document.querySelector('[name="price"]').value = cls.price || '';
      document.querySelector('[name="description"]').value = cls.description || '';
      document.querySelector('[name="max_students"]').value = cls.max_students || '';
      document.getElementById('class-active').checked = cls.active;
      openModal('class-modal');
    }
  } catch (err) {
    alert('Failed to load class details');
  }
};

window.deleteClass = async (id) => {
  if (!confirm('Delete this class?')) return;
  
  try {
    const res = await fetch(`/api/admin/classes/${id}`, {
      method: 'DELETE',
      headers: { 
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
      }
    });
    
    const result = await res.json();
    
    if (res.ok) {
      loadClassData();
      alert('✅ Class deleted');
    } else {
      alert('❌ Failed to delete\n\n' + (result.error || 'Unknown error'));
    }
  } catch (err) {
    alert('❌ Error: ' + err.message);
  }
};

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
