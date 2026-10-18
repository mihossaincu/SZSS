/* ============================================================
   utils.js — helpers (toast, digits, debounce, etc.)
   ============================================================ */

/** Show a temporary toast message */
export function toast(msg, duration = 2800) {
  let el = document.getElementById('toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'toast';
    el.className = 'toast';
    el.setAttribute('role', 'status');
    el.setAttribute('aria-live', 'polite');
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(el._timer);
  el._timer = setTimeout(() => el.classList.remove('show'), duration);
}

/** Convert Western digits to Bangla digits */
export function toBnDigits(str) {
  const map = ['০','১','২','৩','৪','৫','৬','৭','৮','৯'];
  return String(str).replace(/\d/g, d => map[d]);
}

/** Debounce helper */
export function debounce(fn, ms = 150) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}

/** Simple image fallback handler */
export function setImgFallback(img, fallbackSrc) {
  img.addEventListener('error', function handler() {
    img.removeEventListener('error', handler);
    if (fallbackSrc) img.src = fallbackSrc;
  });
}

/** Safe localStorage get/set */
export function storageGet(key, fallback = null) {
  try { return localStorage.getItem(key) ?? fallback; }
  catch { return fallback; }
}
export function storageSet(key, val) {
  try { localStorage.setItem(key, val); } catch { /* noop */ }
}
