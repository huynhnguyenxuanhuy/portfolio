/* =========================================================
   typing.js — typewriter effect for hero role
   ========================================================= */

(function () {
  const target = document.getElementById('typed');
  if (!target) return;

  const phrases = [
    'Frontend Developer',
    'Backend Developer',
    'UI/UX Enthusiast',
    'Problem Solver',
    'Coffee Lover ☕',
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function tick() {
    const current = phrases[phraseIndex];

    if (!isDeleting) {
      charIndex++;
      target.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        isDeleting = true;
        setTimeout(tick, 1600);
        return;
      }
    } else {
      charIndex--;
      target.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }

    setTimeout(tick, isDeleting ? 40 : 80);
  }

  // Start after hero animation finishes
  setTimeout(tick, 1500);
})();
