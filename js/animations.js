/* =========================================================
   animations.js — scroll reveal & counter animation
   ========================================================= */

(function () {
  // Reveal on scroll
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

  // Counter animation
  const counters = document.querySelectorAll('.stat-num');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      const target = +el.dataset.target;
      let current = 0;
      const step = Math.max(1, Math.floor(target / 40));

      const interval = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(interval);
          el.textContent = target + '+';
          return;
        }
        el.textContent = current;
      }, 40);

      counterObserver.unobserve(el);
    });
  });

  counters.forEach((c) => counterObserver.observe(c));
})();
