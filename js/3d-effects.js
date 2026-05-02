/* =========================================================
   3d-effects.js — layered 3D polish for the portfolio
   ========================================================= */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const raf = window.requestAnimationFrame.bind(window);

  const pointer = {
    x: 0,
    y: 0,
    px: 0,
    py: 0,
  };

  function updatePointer(event) {
    pointer.x = (event.clientX / window.innerWidth - 0.5) * 2;
    pointer.y = -(event.clientY / window.innerHeight - 0.5) * 2;
    pointer.px = event.clientX - window.innerWidth / 2;
    pointer.py = event.clientY - window.innerHeight / 2;
  }

  document.addEventListener('pointermove', updatePointer, { passive: true });

  function injectEffectStyles() {
    if (document.getElementById('three-d-effect-styles')) return;

    const style = document.createElement('style');
    style.id = 'three-d-effect-styles';
    style.textContent = `
      #threeHeroCanvas {
        position: fixed;
        inset: 0;
        z-index: 1;
        width: 100vw;
        height: 100vh;
        pointer-events: none;
        opacity: .98;
        mix-blend-mode: screen;
      }

      .hero-3d-sculpture {
        position: absolute;
        top: 50%;
        right: clamp(20px, 8vw, 120px);
        width: clamp(220px, 27vw, 420px);
        aspect-ratio: 1;
        z-index: 1;
        pointer-events: none;
        transform-style: preserve-3d;
        perspective: 1000px;
        opacity: .94;
        filter: drop-shadow(0 40px 90px rgba(124, 58, 237, .34));
      }

      .hero-3d-core,
      .hero-3d-ring,
      .hero-3d-grid,
      .hero-3d-glow,
      .hero-3d-chip {
        position: absolute;
        inset: 0;
        transform-style: preserve-3d;
        border-radius: 50%;
      }

      .hero-3d-glow {
        inset: 13%;
        background:
          radial-gradient(circle at 42% 36%, rgba(255,255,255,.26), transparent 18%),
          radial-gradient(circle at 52% 52%, rgba(236,72,153,.36), rgba(124,58,237,.18) 46%, transparent 70%);
        filter: blur(18px);
        opacity: .78;
      }

      .hero-3d-core {
        inset: 25%;
        border-radius: 30%;
        background:
          linear-gradient(135deg, rgba(255,255,255,.2), rgba(255,255,255,.03)),
          linear-gradient(135deg, rgba(6,182,212,.22), rgba(124,58,237,.26), rgba(236,72,153,.2));
        border: 1px solid rgba(255,255,255,.22);
        box-shadow:
          inset 0 0 34px rgba(255,255,255,.08),
          0 0 48px rgba(124,58,237,.28),
          0 0 90px rgba(6,182,212,.14);
        transform: rotateX(58deg) rotateZ(45deg) translateZ(50px);
        animation: heroCoreFloat 7s ease-in-out infinite;
      }

      .hero-3d-core::before,
      .hero-3d-core::after {
        content: '';
        position: absolute;
        inset: 15%;
        border: 1px solid rgba(255,255,255,.2);
        border-radius: 28%;
        transform: translateZ(38px);
      }

      .hero-3d-core::after {
        inset: 32%;
        background: linear-gradient(135deg, #06b6d4, #ec4899, #f59e0b);
        box-shadow: 0 0 22px rgba(236,72,153,.62);
      }

      .hero-3d-ring {
        border: 1px solid rgba(167,139,250,.58);
        box-shadow: 0 0 26px rgba(124,58,237,.28), inset 0 0 26px rgba(6,182,212,.1);
      }

      .hero-3d-ring.r1 {
        inset: 12%;
        transform: rotateX(72deg) rotateZ(18deg);
        animation: heroRingSpin 11s linear infinite;
      }

      .hero-3d-ring.r2 {
        inset: 2%;
        border-color: rgba(6,182,212,.46);
        transform: rotateY(68deg) rotateZ(-18deg);
        animation: heroRingSpinReverse 14s linear infinite;
      }

      .hero-3d-ring.r3 {
        inset: 20%;
        border-color: rgba(245,158,11,.38);
        transform: rotateX(34deg) rotateY(58deg);
        animation: heroRingSpin 16s linear infinite;
      }

      .hero-3d-grid {
        inset: 18%;
        border-radius: 22%;
        opacity: .36;
        background:
          linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px);
        background-size: 26px 26px;
        transform: rotateX(68deg) rotateZ(45deg) translateZ(-72px);
        mask-image: radial-gradient(circle, #000 40%, transparent 72%);
      }

      .hero-3d-chip {
        inset: auto auto 18% 12%;
        width: 54px;
        height: 54px;
        border-radius: 16px;
        background: rgba(6, 182, 212, .16);
        border: 1px solid rgba(6, 182, 212, .38);
        box-shadow: 0 0 24px rgba(6, 182, 212, .24);
        transform: translateZ(90px) rotateX(18deg) rotateY(-24deg);
        animation: heroChipFloat 5.8s ease-in-out infinite;
      }

      .hero-3d-chip.c2 {
        inset: 15% 10% auto auto;
        width: 42px;
        height: 42px;
        border-radius: 14px;
        background: rgba(236, 72, 153, .16);
        border-color: rgba(236, 72, 153, .42);
        box-shadow: 0 0 24px rgba(236, 72, 153, .26);
        animation-delay: -2s;
      }

      @keyframes heroCoreFloat {
        0%, 100% { transform: rotateX(58deg) rotateZ(45deg) translateZ(50px) translateY(0); }
        50% { transform: rotateX(66deg) rotateZ(52deg) translateZ(70px) translateY(-12px); }
      }

      @keyframes heroRingSpin {
        to { transform: rotateX(72deg) rotateZ(378deg); }
      }

      @keyframes heroRingSpinReverse {
        to { transform: rotateY(68deg) rotateZ(-378deg); }
      }

      @keyframes heroChipFloat {
        0%, 100% { translate: 0 0; }
        50% { translate: 0 -16px; }
      }

      .hero > :not(.hero-3d-sculpture) {
        z-index: 2;
      }

      @media (max-width: 980px) {
        .hero-3d-sculpture {
          width: clamp(170px, 38vw, 280px);
          top: 30%;
          right: -6vw;
          opacity: .42;
        }
      }

      @media (max-width: 640px) {
        .hero-3d-sculpture {
          width: 220px;
          top: 24%;
          right: -86px;
          opacity: .28;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .hero-3d-core,
        .hero-3d-ring,
        .hero-3d-chip {
          animation: none;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function initHeroSculpture() {
    const hero = document.querySelector('.hero');
    if (!hero || document.querySelector('.hero-3d-sculpture')) return;

    const sculpture = document.createElement('div');
    sculpture.className = 'hero-3d-sculpture';
    sculpture.setAttribute('aria-hidden', 'true');
    sculpture.innerHTML = `
      <span class="hero-3d-glow"></span>
      <span class="hero-3d-grid"></span>
      <span class="hero-3d-ring r1"></span>
      <span class="hero-3d-ring r2"></span>
      <span class="hero-3d-ring r3"></span>
      <span class="hero-3d-core"></span>
      <span class="hero-3d-chip c1"></span>
      <span class="hero-3d-chip c2"></span>
    `;
    hero.appendChild(sculpture);

    if (prefersReducedMotion) return;

    let x = 0;
    let y = 0;

    function loop() {
      x += (pointer.x - x) * 0.06;
      y += (pointer.y - y) * 0.06;
      sculpture.style.transform = `translate3d(${x * 24}px, ${-y * 18}px, 0) rotateX(${-y * 8}deg) rotateY(${x * 12}deg)`;
      raf(loop);
    }

    loop();
  }

  function initHeroThree() {
    if (typeof THREE === 'undefined') return;

    let renderer;
    try {
      const canvas = document.createElement('canvas');
      canvas.id = 'threeHeroCanvas';
      canvas.setAttribute('aria-hidden', 'true');

      const bgCanvas = document.getElementById('bgCanvas');
      if (bgCanvas && bgCanvas.parentNode) {
        bgCanvas.parentNode.insertBefore(canvas, bgCanvas.nextSibling);
      } else {
        document.body.prepend(canvas);
      }

      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    } catch (error) {
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
    camera.position.z = 5.8;

    const heroRig = new THREE.Group();
    heroRig.position.set(1.9, 0.35, 0);
    scene.add(heroRig);

    const ico = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.35, 2),
      new THREE.MeshBasicMaterial({ color: 0xa78bfa, wireframe: true, transparent: true, opacity: 0.34 })
    );
    heroRig.add(ico);

    const ringA = new THREE.Mesh(
      new THREE.TorusGeometry(2.05, 0.01, 4, 96),
      new THREE.MeshBasicMaterial({ color: 0xc4b5fd, transparent: true, opacity: 0.24 })
    );
    ringA.rotation.x = Math.PI / 3;
    heroRig.add(ringA);

    const ringB = new THREE.Mesh(
      new THREE.TorusGeometry(2.62, 0.008, 4, 128),
      new THREE.MeshBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.18 })
    );
    ringB.rotation.x = Math.PI / 5;
    ringB.rotation.y = Math.PI / 4;
    heroRig.add(ringB);

    const accents = [
      { color: 0xc4b5fd, size: 0.48, position: [2.25, 1.05, -0.8], speed: 1.2 },
      { color: 0x22d3ee, size: 0.32, position: [-2.5, -1.1, -0.4], speed: 0.9 },
      { color: 0xf0abfc, size: 0.24, position: [0.4, -1.9, 0.2], speed: 1.55 },
    ].map((item) => {
      const mesh = new THREE.Mesh(
        new THREE.OctahedronGeometry(item.size, 0),
        new THREE.MeshBasicMaterial({ color: item.color, wireframe: true, transparent: true, opacity: 0.36 })
      );
      mesh.position.set(...item.position);
      mesh.userData = { baseY: item.position[1], speed: item.speed };
      scene.add(mesh);
      return mesh;
    });

    const starCount = 260;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i += 1) {
      starPositions[i * 3] = (Math.random() - 0.5) * 22;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      starPositions[i * 3 + 2] = Math.random() * -9 - 1;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const stars = new THREE.Points(
      starGeo,
      new THREE.PointsMaterial({ color: 0xddd6fe, size: 0.035, transparent: true, opacity: 0.68 })
    );
    scene.add(stars);

    function resize() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height, true);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      heroRig.position.x = width < 760 ? 0.85 : 1.9;
      heroRig.scale.setScalar(width < 760 ? 0.7 : 1.08);
    }

    resize();
    window.addEventListener('resize', resize, { passive: true });

    if (prefersReducedMotion) {
      renderer.render(scene, camera);
      return;
    }

    let time = 0;
    let easedX = 0;
    let easedY = 0;

    function animate() {
      time += 0.01;
      easedX += (pointer.x - easedX) * 0.045;
      easedY += (pointer.y - easedY) * 0.045;

      heroRig.rotation.y = time * 0.24 + easedX * 0.42;
      heroRig.rotation.x = Math.sin(time * 0.7) * 0.12 + easedY * 0.24;
      ico.rotation.y += 0.004;
      ico.rotation.z += 0.002;
      ringA.rotation.z += 0.0028;
      ringB.rotation.y += 0.002;
      stars.rotation.y = easedX * 0.035;
      stars.rotation.x = easedY * 0.025;

      accents.forEach((mesh, index) => {
        mesh.rotation.x += 0.006 + index * 0.001;
        mesh.rotation.y += 0.005;
        mesh.position.y = mesh.userData.baseY + Math.sin(time * mesh.userData.speed + index) * 0.16;
      });

      renderer.render(scene, camera);
      raf(animate);
    }

    animate();
  }

  function addCardGlare(card) {
    const glare = document.createElement('span');
    glare.className = 'js-3d-glare';
    glare.style.cssText = [
      'position:absolute',
      'inset:0',
      'border-radius:inherit',
      'opacity:0',
      'pointer-events:none',
      'transition:opacity .25s ease',
      'background:linear-gradient(135deg, rgba(255,255,255,.18), transparent 62%)',
      'z-index:2',
    ].join(';');

    if (getComputedStyle(card).position === 'static') card.style.position = 'relative';
    card.appendChild(glare);
    return glare;
  }

  function initTiltCards() {
    if (prefersReducedMotion) return;

    const targets = [
      { selector: '.skill-card', tilt: 13, scale: 1.035, glare: true },
      { selector: '.project', tilt: 8, scale: 1.018, glare: true },
      { selector: '.blog-card', tilt: 10, scale: 1.025, glare: false },
      { selector: '.contact-card', tilt: 12, scale: 1.035, glare: false },
      { selector: '.stat-card', tilt: 10, scale: 1.025, glare: false },
      { selector: '.tech-item', tilt: 18, scale: 1.06, glare: false },
    ];

    targets.forEach(({ selector, tilt, scale, glare }) => {
      document.querySelectorAll(selector).forEach((card) => {
        const glareEl = glare ? addCardGlare(card) : null;
        card.style.transformStyle = 'preserve-3d';
        card.style.backfaceVisibility = 'hidden';
        card.style.willChange = 'transform';

        card.addEventListener('pointermove', (event) => {
          const rect = card.getBoundingClientRect();
          const dx = (event.clientX - rect.left) / rect.width - 0.5;
          const dy = (event.clientY - rect.top) / rect.height - 0.5;
          const rotateX = -dy * tilt;
          const rotateY = dx * tilt;

          card.style.transition = 'transform 60ms linear';
          card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`;

          if (glareEl) {
            const angle = Math.atan2(dy, dx) * 180 / Math.PI + 90;
            glareEl.style.background = `linear-gradient(${angle}deg, rgba(255,255,255,.22), rgba(167,139,250,.14) 35%, transparent 72%)`;
            glareEl.style.opacity = '1';
          }
        }, { passive: true });

        card.addEventListener('pointerleave', () => {
          card.style.transition = 'transform .65s cubic-bezier(.23,1,.32,1)';
          card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
          if (glareEl) glareEl.style.opacity = '0';
        });
      });
    });
  }

  function initHeroParallax() {
    if (prefersReducedMotion) return;

    const layers = [
      { selector: '.hero-greeting', depth: 0.006 },
      { selector: '.hero-name', depth: 0.017 },
      { selector: '.hero-role', depth: 0.012 },
      { selector: '.hero-desc', depth: 0.006 },
      { selector: '.hero-cta', depth: 0.008 },
      { selector: '.hero-scroll', depth: 0.004 },
    ].map(({ selector, depth }) => ({ el: document.querySelector(selector), depth })).filter(({ el }) => el);

    let x = 0;
    let y = 0;

    function loop() {
      x += (pointer.px - x) * 0.055;
      y += (pointer.py - y) * 0.055;
      layers.forEach(({ el, depth }) => {
        el.style.transform = `translate3d(${x * depth}px, ${y * depth}px, 0)`;
      });
      raf(loop);
    }

    window.setTimeout(loop, 1700);
  }

  function initHeroTextDepth() {
    const heroName = document.querySelector('.hero-name');
    if (!heroName || prefersReducedMotion) return;

    document.addEventListener('pointermove', (event) => {
      const dx = (event.clientX / window.innerWidth - 0.5) * 18;
      const dy = (event.clientY / window.innerHeight - 0.5) * 18;
      const shadows = [];
      for (let i = 1; i <= 7; i += 1) {
        const ratio = i / 7;
        const opacity = 0.18 - ratio * 0.014;
        shadows.push(`${dx * ratio * 0.45}px ${dy * ratio * 0.45}px ${i * 2}px rgba(124,58,237,${opacity})`);
      }
      heroName.style.textShadow = shadows.join(', ');
    }, { passive: true });
  }

  function initTimeline3D() {
    if (prefersReducedMotion) return;

    const items = document.querySelectorAll('.timeline-item');
    if (!items.length) return;

    items.forEach((item, index) => {
      item.style.opacity = '0';
      item.style.transform = 'perspective(850px) rotateX(-22deg) translateY(38px) translateZ(-54px)';
      item.style.transformOrigin = '50% 0';
      item.style.transition = `opacity .72s ease ${index * 0.08}s, transform .72s cubic-bezier(.23,1,.32,1) ${index * 0.08}s`;
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'perspective(850px) rotateX(0deg) translateY(0) translateZ(0)';
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.15 });

    items.forEach((item) => observer.observe(item));
  }

  function initTechSpin() {
    if (prefersReducedMotion) return;

    document.querySelectorAll('.tech-item').forEach((item) => {
      const icon = item.querySelector('i');
      if (!icon) return;
      icon.style.display = 'inline-block';
      icon.style.transition = 'transform .5s cubic-bezier(.34,1.56,.64,1)';

      item.addEventListener('pointerenter', () => {
        icon.style.transform = 'rotateY(360deg) scale(1.28)';
      });
      item.addEventListener('pointerleave', () => {
        icon.style.transform = 'rotateY(0deg) scale(1)';
      });
    });
  }

  function initAvatarDepth() {
    const wrap = document.querySelector('.about-img-wrap');
    const img = document.querySelector('.about-img');
    if (!wrap || !img || prefersReducedMotion) return;

    wrap.style.perspective = '700px';
    img.style.transformStyle = 'preserve-3d';
    img.style.willChange = 'transform';

    wrap.addEventListener('pointermove', (event) => {
      const rect = wrap.getBoundingClientRect();
      const dx = (event.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const dy = (event.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      img.style.transition = 'transform 80ms linear';
      img.style.transform = `rotateY(${dx * 16}deg) rotateX(${-dy * 16}deg) scale(1.045)`;
    }, { passive: true });

    wrap.addEventListener('pointerleave', () => {
      img.style.transition = 'transform .65s cubic-bezier(.23,1,.32,1)';
      img.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1)';
    });
  }

  function initOrbDepth() {
    if (prefersReducedMotion) return;

    const orbs = [
      { el: document.querySelector('.orb.o1'), speed: 0.035 },
      { el: document.querySelector('.orb.o2'), speed: 0.024 },
      { el: document.querySelector('.orb.o3'), speed: 0.017 },
    ].filter(({ el }) => el);

    let targetScroll = window.scrollY;
    let currentScroll = targetScroll;
    window.addEventListener('scroll', () => { targetScroll = window.scrollY; }, { passive: true });

    function loop() {
      currentScroll += (targetScroll - currentScroll) * 0.06;
      orbs.forEach(({ el, speed }) => {
        el.style.transform = `translate3d(0, ${currentScroll * speed}px, 0)`;
      });
      raf(loop);
    }

    loop();
  }

  function initProjectDepth() {
    if (prefersReducedMotion) return;

    document.querySelectorAll('.project').forEach((card) => {
      const thumb = card.querySelector('.project-thumb');
      const title = card.querySelector('.project-body h3');
      const tags = card.querySelectorAll('.project-tags .skill-tag');

      [thumb, title, ...tags].filter(Boolean).forEach((el) => {
        el.style.transition = 'transform .42s ease';
        el.style.transformStyle = 'preserve-3d';
      });

      card.addEventListener('pointerenter', () => {
        if (thumb) thumb.style.transform = 'translateZ(18px)';
        if (title) title.style.transform = 'translateZ(26px)';
        tags.forEach((tag, index) => {
          tag.style.transform = `translateZ(${12 + index * 2}px)`;
          tag.style.transitionDelay = `${index * 0.025}s`;
        });
      });

      card.addEventListener('pointerleave', () => {
        if (thumb) thumb.style.transform = 'translateZ(0)';
        if (title) title.style.transform = 'translateZ(0)';
        tags.forEach((tag) => {
          tag.style.transitionDelay = '0s';
          tag.style.transform = 'translateZ(0)';
        });
      });
    });
  }

  function init() {
    injectEffectStyles();
    initHeroSculpture();
    initHeroThree();
    initTiltCards();
    initHeroParallax();
    initHeroTextDepth();
    initTimeline3D();
    initTechSpin();
    initAvatarDepth();
    initOrbDepth();
    initProjectDepth();
    console.log('%c3D Effects loaded', 'color:#a78bfa;font-weight:700;font-size:14px');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.setTimeout(init, 120));
  } else {
    window.setTimeout(init, 120);
  }
}());
