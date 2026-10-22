/* ============================================================
   lang.js — ভাষা টগল (pub/sub)
   ============================================================ */
import { config } from './config.js';
import { storageGet, storageSet } from './utils.js';

const listeners = new Set();
let currentLang = config.defaultLang;

export function getLang() {
  return currentLang;
}

export function onLangChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function setLang(lang, btn) {
  if (lang !== 'bn' && lang !== 'en') return;
  currentLang = lang;
  document.documentElement.lang = lang === 'bn' ? 'bn-BD' : 'en';

  // Text content
  document.querySelectorAll('[data-bn]').forEach(el => {
    const txt = el.getAttribute('data-' + lang);
    if (!txt) return;
    if (txt.includes('<')) el.innerHTML = txt;
    else el.textContent = txt;
  });

  // Placeholders
  document.querySelectorAll('[data-bn-placeholder]').forEach(el => {
    const ph = el.getAttribute('data-' + lang + '-placeholder');
    if (ph) el.placeholder = ph;
  });

  // Toggle buttons UI
  document.querySelectorAll('.lang-toggle button').forEach(b => {
    b.classList.remove('active');
    b.setAttribute('aria-pressed', 'false');
  });
  if (btn) {
    btn.classList.add('active');
    btn.setAttribute('aria-pressed', 'true');
  } else {
    const target = document.querySelector(
      `.lang-toggle button:nth-child(${lang === 'bn' ? 1 : 2})`
    );
    if (target) {
      target.classList.add('active');
      target.setAttribute('aria-pressed', 'true');
    }
  }

  storageSet(config.langKey, lang);
  listeners.forEach(fn => fn(lang));
}

export function initLang() {
  const saved = storageGet(config.langKey, config.defaultLang);
  if (saved === 'en') {
    const enBtn = document.querySelector('.lang-toggle button:nth-child(2)');
    setLang('en', enBtn);
  }

  // Bind click handlers
  document.querySelectorAll('.lang-toggle button').forEach((btn, i) => {
    btn.addEventListener('click', () => setLang(i === 0 ? 'bn' : 'en', btn));
  });
}
