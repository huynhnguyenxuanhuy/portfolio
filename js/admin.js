/* admin.js — logic admin + đồng bộ real-time với index */
const STORAGE_KEY = 'portfolio_data';
const CHANNEL_NAME = 'portfolio-sync';

let data = {};
const channel = 'BroadcastChannel' in window ? new BroadcastChannel(CHANNEL_NAME) : null;

function getNested(obj, path) {
  return path.split('.').reduce((o, k) => (o ? o[k] : undefined), obj);
}
function setNested(obj, path, val) {
  const keys = path.split('.');
  const last = keys.pop();
  const target = keys.reduce((o, k) => (o[k] = o[k] || {}), obj);
  target[last] = val;
}

// Đồng bộ thay đổi: localStorage + broadcast tới tab khác
function syncChanges() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  if (channel) channel.postMessage({ type: 'update', data });
}

// Load data — ưu tiên localStorage, fallback data.json
async function loadData() {
  const cached = localStorage.getItem(STORAGE_KEY);
  if (cached) {
    try {
      data = JSON.parse(cached);
      populateForm();
      renderStats();
      return;
    } catch (e) {}
  }
  try {
    const r = await fetch('./data.json');
    data = await r.json();
    populateForm();
    renderStats();
  } catch (e) {
    showToast('❌ Không tải được data.json', 'error');
  }
}

function populateForm() {
  document.querySelectorAll('[data-key]').forEach((input) => {
    const val = getNested(data, input.dataset.key);
    if (val !== undefined) input.value = val;
    input.addEventListener('input', () => {
      setNested(data, input.dataset.key, input.value);
      syncChanges(); // ← LIVE SYNC mỗi lần gõ phím
    });
  });
}

function renderStats() {
  const grid = document.getElementById('statsGrid');
  grid.innerHTML = '';
  data.about.stats.forEach((s, i) => {
    const div = document.createElement('div');
    div.className = 'stat-input';
    div.innerHTML = `
      <label>Số liệu #${i + 1}</label>
      <input type="number" value="${s.number}" data-stat-num="${i}" />
      <label>Nhãn</label>
      <input type="text" value="${s.label}" data-stat-label="${i}" />
    `;
    grid.appendChild(div);
  });
  grid.querySelectorAll('[data-stat-num]').forEach((inp) => {
    inp.addEventListener('input', (e) => {
      data.about.stats[+e.target.dataset.statNum].number = +e.target.value;
      syncChanges();
    });
  });
  grid.querySelectorAll('[data-stat-label]').forEach((inp) => {
    inp.addEventListener('input', (e) => {
      data.about.stats[+e.target.dataset.statLabel].label = e.target.value;
      syncChanges();
    });
  });
}

// Tải data.json về máy (để deploy)
function downloadData() {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'data.json';
  a.click();
  URL.revokeObjectURL(url);
  showToast('✅ Đã tải về data.json — thay file cũ trong folder portfolio để lưu vĩnh viễn!');
}

// Reset về data.json gốc
async function resetData() {
  if (!confirm('Xóa hết thay đổi và quay về data.json gốc?')) return;
  localStorage.removeItem(STORAGE_KEY);
  try {
    const r = await fetch('./data.json');
    data = await r.json();
    populateForm();
    renderStats();
    syncChanges();
    showToast('🔄 Đã reset về data.json gốc');
  } catch (e) {}
}

function showToast(msg, type = 'success') {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.style.background = type === 'error' ? '#ef4444' : '#10b981';
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

// Sidebar nav active state
document.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    document.querySelectorAll('.nav-link').forEach((l) => l.classList.remove('active'));
    link.classList.add('active');
  });
});

// Hiển thị thông tin user đã đăng nhập (nếu có)
function showUserInfo() {
  if (typeof getCurrentUser === 'function') {
    const user = getCurrentUser();
    if (user && user.user) {
      const tag = document.querySelector('.brand .tag');
      if (tag) {
        tag.innerHTML = `<i class="fa-solid fa-user-shield"></i> ${user.user}`;
        tag.style.background = 'rgba(16, 185, 129, 0.2)';
        tag.style.color = '#6ee7b7';
      }
    }
  }
}
showUserInfo();

// Button handlers
document.getElementById('saveBtn').addEventListener('click', downloadData);
document.getElementById('resetBtn').addEventListener('click', resetData);

// 🔓 Đăng xuất
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    if (confirm('Bạn có chắc muốn đăng xuất?')) {
      if (typeof logout === 'function') {
        logout();
      } else {
        // Fallback nếu auth.js chưa load
        localStorage.removeItem('portfolio_auth');
        window.location.href = './login.html';
      }
    }
  });
}

loadData();