/* ============================================================
   main.js — entry point
   ============================================================ */
import { initLang } from './lang.js';
import { initNav } from './nav.js';
import { initScrollSpy } from './scroll-spy.js';
import { initTabs } from './tabs.js';
import { initLightbox } from './lightbox.js';
import { initForms } from './forms.js';
import { initRender } from './render.js';

document.addEventListener('DOMContentLoaded', () => {
  initLang();
  initNav();
  initScrollSpy();
  initTabs();
  initLightbox();
  initForms();
  initRender();
});
