/* ============================================================
   lightbox.js — accessible gallery lightbox
   ============================================================ */

export function initLightbox() {
  const grid = document.getElementById('galleryGrid');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  if (!grid || !lightbox || !lightboxImg) return;

  let items = [];
  let currentIndex = 0;
  let lastFocus = null;

  function collect() {
    items = [...grid.querySelectorAll('.gallery__item img')];
  }

  function open(i) {
    collect();
    if (!items.length) return;
    currentIndex = i;
    lastFocus = document.activeElement;
    lightboxImg.src = items[i].src;
    lightboxImg.alt = items[i].alt || '';
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');
    lightbox.querySelector('.lightbox__close')?.focus();
  }

  function close() {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-open');
    if (lastFocus) lastFocus.focus();
  }

  function nav(dir) {
    if (!items.length) return;
    currentIndex = (currentIndex + dir + items.length) % items.length;
    lightboxImg.src = items[currentIndex].src;
    lightboxImg.alt = items[currentIndex].alt || '';
  }

  // Delegate clicks on gallery items
  grid.addEventListener('click', e => {
    const item = e.target.closest('.gallery__item');
    if (!item) return;
    collect();
    const img = item.querySelector('img');
    const idx = items.indexOf(img);
    if (idx >= 0) open(idx);
  });

  lightbox.querySelector('.lightbox__close')?.addEventListener('click', e => {
    e.stopPropagation();
    close();
  });
  lightbox.querySelector('.lightbox__prev')?.addEventListener('click', e => {
    e.stopPropagation();
    nav(-1);
  });
  lightbox.querySelector('.lightbox__next')?.addEventListener('click', e => {
    e.stopPropagation();
    nav(1);
  });

  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) close();
  });

  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') nav(1);
    if (e.key === 'ArrowLeft') nav(-1);
  });

  // Basic swipe support
  let touchStartX = 0;
  lightbox.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  lightbox.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(dx) > 50) nav(dx < 0 ? 1 : -1);
  }, { passive: true });
}
