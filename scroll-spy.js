/* ============================================================
   scroll-spy.js — active nav highlight
   ============================================================ */
import { debounce } from './utils.js';

export function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__list a[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  const map = new Map();
  navLinks.forEach(a => {
    const id = a.getAttribute('href').slice(1);
    if (id) map.set(id, a);
  });

  function update() {
    const scrollY = window.scrollY + 120;
    let current = null;

    sections.forEach(sec => {
      if (sec.offsetTop <= scrollY) current = sec.id;
    });

    navLinks.forEach(a => a.classList.remove('active'));
    if (current && map.has(current)) {
      map.get(current).classList.add('active');
    } else {
      // Home link when at top
      const home = document.querySelector('.nav__list a[href="#"], .nav__list a[href="/"], .nav__list a[href="./"]');
      if (home && window.scrollY < 200) home.classList.add('active');
    }
  }

  window.addEventListener('scroll', debounce(update, 80), { passive: true });
  update();
}
