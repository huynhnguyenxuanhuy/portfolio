/* loader.js — đọc data.json + đồng bộ real-time với admin */
(function () {
  const STORAGE_KEY = 'portfolio_data';
  const CHANNEL_NAME = 'portfolio-sync';

  // Hàm render dữ liệu lên trang
  function render(data) {
    if (!data) return;

    // ===== HERO =====
    const greeting = document.querySelector('.hero-greeting');
    if (greeting && data.hero) greeting.textContent = data.hero.greeting;

    const name = document.querySelector('.hero-name');
    if (name && data.hero) {
      name.innerHTML = `${data.hero.nameLine1}<br/><span class="accent">${data.hero.nameLine2}</span>`;
    }

    const desc = document.querySelector('.hero-desc');
    if (desc && data.hero) desc.textContent = data.hero.description;

    // ===== ABOUT =====
    const ps = document.querySelectorAll('.about-text > p');
    if (data.about) {
      if (ps[0]) ps[0].innerHTML = data.about.paragraph1;
      if (ps[1]) ps[1].innerHTML = data.about.paragraph2;
      if (ps[2]) ps[2].innerHTML = data.about.paragraph3;

      const nums = document.querySelectorAll('.stat-num');
      const labels = document.querySelectorAll('.stat-label');
      data.about.stats.forEach((s, i) => {
        if (nums[i]) {
          nums[i].dataset.target = s.number;
          nums[i].textContent = s.number + '+';
        }
        if (labels[i]) labels[i].textContent = s.label;
      });
    }

    // ===== CONTACT =====
    const cards = document.querySelectorAll('.contact-card');
    if (cards[0] && data.contact) {
      cards[0].href = `mailto:${data.contact.email}`;
      cards[0].querySelector('.value').textContent = data.contact.email;
    }
    if (cards[1] && data.contact) {
      cards[1].href = `tel:${data.contact.phone}`;
      cards[1].querySelector('.value').textContent = data.contact.phone.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
    }
    if (cards[2] && data.contact) {
      cards[2].href = data.contact.facebook;
      const username = data.contact.facebook.replace(/.*facebook\.com\/(.*?)\/?$/, '$1');
      cards[2].querySelector('.value').textContent = username;
    }
  }

  // Load dữ liệu — ưu tiên localStorage, fallback data.json
  async function load() {
    const cached = localStorage.getItem(STORAGE_KEY);
    if (cached) {
      try {
        render(JSON.parse(cached));
        return;
      } catch (e) {}
    }
    try {
      const r = await fetch('./data.json');
      const data = await r.json();
      render(data);
    } catch (e) {
      console.warn('⚠️ Không load được data.json:', e);
    }
  }

  // Lắng nghe thay đổi từ admin (real-time sync)
  if ('BroadcastChannel' in window) {
    const channel = new BroadcastChannel(CHANNEL_NAME);
    channel.addEventListener('message', (e) => {
      if (e.data && e.data.type === 'update') {
        render(e.data.data);
      }
    });
  }

  load();
})();