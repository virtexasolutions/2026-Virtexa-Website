/* ═══════════════════════════════════════════════════════════════
   VIRTEXA SOLUTIONS — main.js
   ═══════════════════════════════════════════════════════════════ */
'use strict';

/* ── Utility: respects prefers-reduced-motion ─────────────────── */
const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ── Utility: debounce via rAF ────────────────────────────────── */
function rafDebounce(fn) {
  let rafId = null;
  return function (...args) {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      fn.apply(this, args);
      rafId = null;
    });
  };
}

/* ═══════════════════════════════════════════ NAVIGATION ═══ */
(function initNav() {
  const nav    = document.getElementById('nav');
  const burger = document.getElementById('nav-burger');
  const menu   = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.nav__mobile-link');
  let menuOpen = false;

  /* Scroll → frosted glass effect */
  const handleScroll = rafDebounce(() => {
    nav.classList.toggle('scrolled', window.scrollY > 48);

    /* Back to top button */
    const btt = document.getElementById('back-to-top');
    if (btt) {
      btt.hidden = window.scrollY < 400;
    }
  });

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* Mobile menu toggle */
  function openMenu() {
    menuOpen = true;
    menu.style.display = 'flex';
    burger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    // Animate burger → X
    const spans = burger.querySelectorAll('span');
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  }

  function closeMenu() {
    menuOpen = false;
    menu.style.display = 'none';
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    const spans = burger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity   = '';
    spans[2].style.transform = '';
  }

  burger.addEventListener('click', () => menuOpen ? closeMenu() : openMenu());

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menuOpen) closeMenu();
  });

  // Active link highlight on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  const highlightNav = rafDebounce(() => {
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 120) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  });

  window.addEventListener('scroll', highlightNav, { passive: true });
})();

/* ════════════════════════════════════ REVEAL ANIMATIONS ═══ */
(function initReveal() {
  document.documentElement.classList.add('reveal-ready');

  if (prefersReducedMotion()) {
    document.querySelectorAll('.reveal-up').forEach(el => {
      el.classList.add('is-visible');
    });
    return;
  }

  const elements = document.querySelectorAll('.reveal-up');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el    = entry.target;
          const delay = parseInt(el.dataset.delay || '0', 10);
          setTimeout(() => {
            el.classList.add('is-visible');
          }, delay);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.01, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach(el => observer.observe(el));
})();

/* ══════════════════════════════════════════ STAT COUNTERS ═══ */
(function initCounters() {
  const statNums = document.querySelectorAll('.stat__num[data-target]');
  if (!statNums.length) return;

  function animateCounter(el) {
    const target   = parseInt(el.dataset.target, 10);
    const duration = prefersReducedMotion() ? 0 : 1600;
    const start    = performance.now();

    function step(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased    = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(step);
    }

    if (duration === 0) {
      el.textContent = target;
    } else {
      requestAnimationFrame(step);
    }
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNums.forEach(el => observer.observe(el));
})();

/* ════════════════════════════════════════ 3D CARD TILT ═══ */
(function initTilt() {
  if (prefersReducedMotion()) return;

  // Only on pointer devices (not touch)
  if (!window.matchMedia('(pointer: fine)').matches) return;

  const cards = document.querySelectorAll('.tilt-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', rafDebounce((e) => {
      const rect   = card.getBoundingClientRect();
      const cx     = rect.left + rect.width  / 2;
      const cy     = rect.top  + rect.height / 2;
      const dx     = (e.clientX - cx) / (rect.width  / 2); // -1 to 1
      const dy     = (e.clientY - cy) / (rect.height / 2); // -1 to 1
      const rotX   = -(dy * 3);  // max 3deg
      const rotY   =   dx * 3;
      card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
    }));

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();

/* ═════════════════════════════════ OS SHOWCASE TABS ═══ */
(function initOSTabs() {
  const tabs   = document.querySelectorAll('.os-tab');
  const panels = document.querySelectorAll('.os-panel');

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      panels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      panels[i].classList.add('active');
    });
  });

  // Keyboard nav for tabs
  tabs.forEach((tab, i) => {
    tab.addEventListener('keydown', (e) => {
      let newIndex = i;
      if (e.key === 'ArrowRight') newIndex = (i + 1) % tabs.length;
      if (e.key === 'ArrowLeft')  newIndex = (i - 1 + tabs.length) % tabs.length;
      if (newIndex !== i) {
        tabs[newIndex].focus();
        tabs[newIndex].click();
      }
    });
  });
})();



/* ═══════════════════════════════════════ CONTACT FORM ═══ */
(function initForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const submitBtn = document.getElementById('form-submit');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Minimal validation
    const inputs = form.querySelectorAll('[required]');
    let valid = true;

    inputs.forEach(input => {
      input.style.borderColor = '';
      if (!input.value.trim()) {
        input.style.borderColor = '#ff6b6b';
        valid = false;
      } else if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
        input.style.borderColor = '#ff6b6b';
        valid = false;
      }
    });

    if (!valid) return;

    // Real submission via Fetch
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        submitBtn.textContent = '✓ Brief received — we\'ll be in touch';
        submitBtn.style.background = '#2a5c42';
        form.querySelectorAll('.form-input').forEach(i => i.disabled = true);
        
        // Reset after 5s
        setTimeout(() => {
          form.reset();
          submitBtn.textContent = originalText;
          submitBtn.style.background = '';
          submitBtn.disabled = false;
          form.querySelectorAll('.form-input').forEach(i => i.disabled = false);
        }, 5000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      submitBtn.textContent = '✕ Error — Please try again';
      submitBtn.style.background = '#ff6b6b';
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.background = '';
        submitBtn.disabled = false;
      }, 3000);
    }
  });

  // Clear error state on input
  form.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('input', () => {
      input.style.borderColor = '';
    });
  });
})();

/* ═══════════════════════════════════════ BACK TO TOP ═══ */
(function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  });
})();

/* ════════════════════════════════ SMOOTH ANCHOR SCROLL ═══ */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const navHeight = document.getElementById('nav')?.offsetHeight || 72;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({
        top,
        behavior: prefersReducedMotion() ? 'auto' : 'smooth'
      });
    });
  });
})();
