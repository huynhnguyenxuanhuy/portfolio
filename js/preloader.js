/* preloader.js — Beautiful loading screen */
(function () {
  // ===== CSS =====
  const css = `
    #preloader {
      position: fixed; inset: 0; z-index: 99999;
      background: #05060a;
      display: flex; align-items: center; justify-content: center;
      flex-direction: column;
      transition: opacity .7s ease, visibility .7s ease;
      overflow: hidden;
      font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif;
    }
    #preloader::before, #preloader::after {
      content: ''; position: absolute; border-radius: 50%;
      filter: blur(80px); opacity: .35;
      animation: plOrb 8s ease-in-out infinite;
    }
    #preloader::before {
      width: 420px; height: 420px;
      background: #7c3aed;
      top: 15%; left: 15%;
    }
    #preloader::after {
      width: 360px; height: 360px;
      background: #06b6d4;
      bottom: 15%; right: 15%;
      animation-delay: -4s;
    }
    @keyframes plOrb {
      0%,100% { transform: translate(0,0) scale(1); }
      50% { transform: translate(60px,-40px) scale(1.1); }
    }
    #preloader.hide {
      opacity: 0; visibility: hidden; pointer-events: none;
    }

    .pl-wrap {
      position: relative; z-index: 1; text-align: center;
    }
    .pl-ring {
      width: 180px; height: 180px;
      border: 2px solid rgba(255,255,255,.05);
      border-top-color: #7c3aed;
      border-right-color: #ec4899;
      border-radius: 50%;
      animation: plSpin 1.5s linear infinite;
      margin: 0 auto;
      display: flex; align-items: center; justify-content: center;
      position: relative;
    }
    .pl-ring::before {
      content: ''; position: absolute; inset: 12px;
      border: 2px solid rgba(255,255,255,.03);
      border-bottom-color: #06b6d4;
      border-radius: 50%;
      animation: plSpin 2.5s linear infinite reverse;
    }
    @keyframes plSpin { to { transform: rotate(360deg); } }

    .pl-logo {
      font-size: 80px; font-weight: 700; line-height: 1;
      background: linear-gradient(135deg, #7c3aed, #ec4899, #f59e0b);
      -webkit-background-clip: text; background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: plPulse 1.5s ease-in-out infinite;
    }
    @keyframes plPulse {
      0%,100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.08); opacity: .85; }
    }

    .pl-name {
      color: #8a8f9c; font-size: 11px;
      margin-top: 32px;
      font-family: 'JetBrains Mono', 'Courier New', monospace;
      letter-spacing: 4px; text-transform: uppercase;
    }
    .pl-bar {
      width: 240px; height: 2px;
      background: rgba(255,255,255,.08);
      border-radius: 100px; margin: 22px auto 12px;
      overflow: hidden;
    }
    .pl-bar-fill {
      height: 100%; width: 0%;
      background: linear-gradient(90deg, #7c3aed, #ec4899, #06b6d4);
      border-radius: 100px;
      transition: width .3s ease;
      box-shadow: 0 0 12px rgba(124,58,237,.6);
    }
    .pl-percent {
      color: #8a8f9c; font-size: 11px;
      font-family: 'JetBrains Mono', 'Courier New', monospace;
      letter-spacing: 1px;
    }
    .pl-loading {
      color: #6b7280; font-size: 10px;
      margin-top: 8px;
      font-family: 'JetBrains Mono', monospace;
      letter-spacing: 2px;
    }
    .pl-loading::after {
      content: '...';
      animation: plDots 1.5s steps(4) infinite;
    }
    @keyframes plDots {
      0% { content: ''; }
      25% { content: '.'; }
      50% { content: '..'; }
      75% { content: '...'; }
    }
  `;

  // ===== HTML =====
  const html = `
    <div class="pl-wrap">
      <div class="pl-ring">
        <div class="pl-logo">H</div>
      </div>
      <div class="pl-name">Huỳnh Nguyễn Xuân Huy</div>
      <div class="pl-bar"><div class="pl-bar-fill"></div></div>
      <div class="pl-percent">0%</div>
      <div class="pl-loading">Loading</div>
    </div>
  `;

  // Inject CSS into <head>
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // Inject preloader markup
  function inject() {
    const div = document.createElement('div');
    div.id = 'preloader';
    div.innerHTML = html;
    document.body.insertBefore(div, document.body.firstChild);
    startProgress(div);
  }

  // Progress animation
  function startProgress(el) {
    const fill = el.querySelector('.pl-bar-fill');
    const percent = el.querySelector('.pl-percent');
    let progress = 0;

    const tick = () => {
      const increment = progress < 60 ? Math.random() * 12 : Math.random() * 4;
      progress = Math.min(progress + increment, 99);
      if (fill) fill.style.width = progress + '%';
      if (percent) percent.textContent = Math.floor(progress) + '%';

      // When page is fully loaded, finish to 100% and hide
      if (progress >= 99 && document.readyState === 'complete') {
        if (fill) fill.style.width = '100%';
        if (percent) percent.textContent = '100%';
        setTimeout(() => {
          el.classList.add('hide');
          setTimeout(() => el.remove(), 800);
        }, 400);
        return;
      }
      setTimeout(tick, 90);
    };
    tick();
  }

  // Wait for body to exist
  if (document.body) {
    inject();
  } else {
    document.addEventListener('DOMContentLoaded', inject);
  }
})();