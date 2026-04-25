/* =========================================================
   cursor.js — custom animated cursor (dot + ring)
   ========================================================= */

(function () {
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');

  // Skip on touch devices
  if (!dot || !ring || window.matchMedia('(hover: none)').matches) return;

  let mouseX = 0;
  let mouseY = 0;
  let ringX = 0;
  let ringY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover state on interactive elements
  const hoverSelectors = 'a, .btn, .skill-card, .project, .tech-item, .blog-card, .contact-card, .stat-card';
  document.querySelectorAll(hoverSelectors).forEach((el) => {
    el.addEventListener('mouseenter', () => ring.classList.add('hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
  });
})();
