// ============ PRELOADER ============
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('preloader')?.classList.add('hidden');
    document.body.classList.add('loaded');
  }, 1400);
});

// ============ HEADER SCROLL ============
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 60);
});

// ============ MOBILE MENU ============
const toggle = document.querySelector('.menu-toggle');
const navUl = document.querySelector('nav ul');
toggle?.addEventListener('click', () => navUl?.classList.toggle('open'));

// ============ SCROLL REVEAL ============
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ============ RIPPLE (Buton Tıklama Efekti) ============
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function (e) {
    const r = document.createElement('span');
    r.className = 'ripple';
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    r.style.width = r.style.height = size + 'px';
    r.style.left = (e.clientX - rect.left - size / 2) + 'px';
    r.style.top = (e.clientY - rect.top - size / 2) + 'px';
    this.appendChild(r);
    setTimeout(() => r.remove(), 600);
  });
});

// ============ PAGE TRANSITION (Sayfa Geçiş Animasyonu) ============
document.querySelectorAll('a[href$=".html"]').forEach(link => {
  link.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href && !href.startsWith('#') && !href.startsWith('http')) {
      e.preventDefault();
      document.body.style.opacity = '0';
      document.body.style.transition = 'opacity 0.35s ease';
      setTimeout(() => { window.location.href = href; }, 350);
    }
  });
});

// ============ COUNTER (İstatistik Sayacı) ============
const counters = document.querySelectorAll('.stat-num');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const el = e.target;
      const target = +el.dataset.count;
      let current = 0;
      const step = target / 60;
      const update = () => {
        current += step;
        if (current < target) {
          el.textContent = Math.ceil(current) + '+';
          requestAnimationFrame(update);
        } else {
          el.textContent = target + '+';
        }
      };
      update();
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.4 });
counters.forEach(c => counterObserver.observe(c));