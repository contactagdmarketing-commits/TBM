/* =============================================
   TRANS BIO MÉDIC — JavaScript Principal
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Cookie Banner ---- */
  const cookieBanner = document.getElementById('cookieBanner');
  const cookieAccept = document.getElementById('cookieAccept');
  const cookieSettings = document.getElementById('cookieSettings');

  if (cookieBanner && !localStorage.getItem('tbm_cookies_accepted')) {
    setTimeout(() => cookieBanner.classList.add('visible'), 800);
  }
  if (cookieAccept) {
    cookieAccept.addEventListener('click', () => {
      localStorage.setItem('tbm_cookies_accepted', 'true');
      cookieBanner.classList.remove('visible');
    });
  }
  if (cookieSettings) {
    cookieSettings.addEventListener('click', () => {
      cookieBanner.classList.remove('visible');
    });
  }

  /* ---- Header scroll effect ---- */
  const header = document.getElementById('header');
  const onScroll = () => {
    if (window.scrollY > 50) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Mobile menu ---- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks?.classList.toggle('open');
    document.body.style.overflow = navLinks?.classList.contains('open') ? 'hidden' : '';
  });

  // Ferme le menu au clic sur un lien
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger?.classList.remove('open');
      navLinks?.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* ---- Intersection Observer — Fade-in animations ---- */
  const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(
    '.stat-card, .solution-card, .about-grid, .quality-grid, .partner-item, .certif-badge, .recruitment-card, .page-section-content, .job-card, .equip-card, .quality-block'
  ).forEach((el, i) => {
    el.classList.add('fade-in');
    if (i % 6 === 1) el.classList.add('fade-in-delay-1');
    if (i % 6 === 2) el.classList.add('fade-in-delay-2');
    if (i % 6 === 3) el.classList.add('fade-in-delay-3');
    if (i % 6 === 4) el.classList.add('fade-in-delay-4');
    if (i % 6 === 5) el.classList.add('fade-in-delay-5');
    observer.observe(el);
  });

  /* ---- Counter animation ---- */
  const counters = document.querySelectorAll('.stat-number[data-target]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 1800;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        el.textContent = target;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current);
      }
    }, duration / steps);
  }

  /* ---- Active nav link ---- */
  const currentPage = window.location.pathname.split('/').pop();
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href').split('/').pop();
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  /* ---- Scroll to section (hero scroll button) ---- */
  const heroScroll = document.querySelector('.hero-scroll');
  heroScroll?.addEventListener('click', () => {
    const stats = document.querySelector('.stats');
    stats?.scrollIntoView({ behavior: 'smooth' });
  });

  /* ---- Contact form handler ---- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Message envoyé ✓';
      btn.disabled = true;
      btn.style.background = '#27ae60';
      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        btn.style.background = '';
        contactForm.reset();
      }, 3500);
    });
  }

  /* ---- Recrutement — accordion / toggle ---- */
  document.querySelectorAll('.job-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.job-card');
      const isOpen = card.classList.contains('open');
      document.querySelectorAll('.job-card').forEach(c => c.classList.remove('open'));
      if (!isOpen) card.classList.add('open');
    });
  });

});
