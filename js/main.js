/* =========================================================
   main.js — navigation highlight & magnetic buttons
   ========================================================= */

(function () {
  // Active nav link based on scroll position
  const navLinks = document.querySelectorAll('nav a');
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNav() {
    const scrollY = window.scrollY + 200;
    sections.forEach((section) => {
      if (
        scrollY >= section.offsetTop &&
        scrollY < section.offsetTop + section.offsetHeight
      ) {
        navLinks.forEach((link) => link.classList.remove('active'));
        const active = document.querySelector(`nav a[href="#${section.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // Magnetic button effect
  document.querySelectorAll('.btn').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) translateY(-3px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  // Smooth scroll polyfill (for older browsers)
  document.querySelectorAll('nav a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  console.log(
    '%c👋 Hi there!',
    'font-size: 24px; font-weight: bold; color: #7c3aed;'
  );
  console.log(
    '%cThanks for checking out the code. Built by Huỳnh Nguyễn Xuân Huy.',
    'color: #06b6d4; font-size: 13px;'
  );
})();
