/* auth.js — Quản lý đăng nhập admin */

// 🔐 THÔNG TIN ĐĂNG NHẬP MẶC ĐỊNH:
const ADMIN_USERNAME = 'xuanhuy132005@gmail.com';
const ADMIN_PASSWORD = 'Huy132005';
// ⚠️ Lưu ý: Đây là client-side auth. Đừng dùng cho dữ liệu nhạy cảm.
// Nếu cần đổi lại, sửa 2 dòng trên là xong.

const AUTH_KEY = 'portfolio_auth';
const SESSION_HOURS = 24; // Tự đăng xuất sau 24 giờ

function isAuthenticated() {
  const stored = localStorage.getItem(AUTH_KEY);
  if (!stored) return false;
  try {
    const session = JSON.parse(stored);
    if (Date.now() < session.expiresAt) return true;
    localStorage.removeItem(AUTH_KEY);
    return false;
  } catch (e) {
    return false;
  }
}

function requireAuth() {
  if (!isAuthenticated()) window.location.href = './login.html';
}

function login(username, password) {
  // So sánh username không phân biệt hoa thường (vì là email)
  if (
    username.toLowerCase() === ADMIN_USERNAME.toLowerCase() &&
    password === ADMIN_PASSWORD
  ) {
    const session = {
      user: username.toLowerCase(),
      loginAt: Date.now(),
      expiresAt: Date.now() + SESSION_HOURS * 60 * 60 * 1000,
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(session));
    return true;
  }
  return false;
}

function logout() {
  localStorage.removeItem(AUTH_KEY);
  window.location.href = './login.html';
}

function getCurrentUser() {
  const stored = localStorage.getItem(AUTH_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch (e) {
    return null;
  }
}