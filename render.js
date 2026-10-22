/* ============================================================
   render.js — data → DOM rendering
   ============================================================ */
import { committeeTop, committeeList } from '../data/committee.js';
import { events } from '../data/events.js';
import { news } from '../data/news.js';
import { gallery } from '../data/gallery.js';
import { getLang, onLangChange } from './lang.js';

function escapeHtml(str) {
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

export function renderCommitteeTop() {
  const el = document.getElementById('committeeTop');
  if (!el) return;
  el.innerHTML = committeeTop.map(m => `
    <div class="member">
      <div class="member__photo">
        <img src="${escapeHtml(m.photo)}" alt="${escapeHtml(m.name)}"
             onerror="this.onerror=null;this.src='${escapeHtml(m.fallback)}'">
      </div>
      <h3 class="member__name">${escapeHtml(m.name)}</h3>
      <span class="member__role ${m.roleClass}">${escapeHtml(m.role)}</span>
    </div>
  `).join('');
}

export function renderCommitteeTable() {
  const el = document.getElementById('committeeTableBody');
  if (!el) return;
  el.innerHTML = committeeList.map(m => `
    <tr>
      <td class="pos">${escapeHtml(m.pos)}</td>
      <td class="name">${escapeHtml(m.name)}</td>
      <td class="dept">${escapeHtml(m.dept)}</td>
      <td class="mobile">${escapeHtml(m.mobile)}</td>
    </tr>
  `).join('');
}

export function renderNews() {
  const el = document.getElementById('newsGrid');
  if (!el) return;
  const lang = getLang();
  el.innerHTML = news.map(n => `
    <article class="news__card">
      <div class="news__img">
        <img src="${escapeHtml(n.img)}" alt="${escapeHtml(lang === 'bn' ? n.tagBn : n.tagEn)}" loading="lazy" decoding="async">
        <span class="news__tag" data-bn="${escapeHtml(n.tagBn)}" data-en="${escapeHtml(n.tagEn)}">${escapeHtml(lang === 'bn' ? n.tagBn : n.tagEn)}</span>
      </div>
      <div class="news__body">
        <div class="news__date" data-bn="${escapeHtml(n.dateBn)}" data-en="${escapeHtml(n.dateEn)}">${escapeHtml(lang === 'bn' ? n.dateBn : n.dateEn)}</div>
        <h3 class="news__title">
          <a href="${escapeHtml(n.link)}" data-bn="${escapeHtml(n.titleBn)}" data-en="${escapeHtml(n.titleEn)}">${escapeHtml(lang === 'bn' ? n.titleBn : n.titleEn)}</a>
        </h3>
        <p class="news__excerpt" data-bn="${escapeHtml(n.excerptBn)}" data-en="${escapeHtml(n.excerptEn)}">${escapeHtml(lang === 'bn' ? n.excerptBn : n.excerptEn)}</p>
        <a href="${escapeHtml(n.link)}" class="news__more" data-bn="আরও পড়ুন" data-en="Read More">${lang === 'bn' ? 'আরও পড়ুন →' : 'Read More →'}</a>
      </div>
    </article>
  `).join('');
}

export function renderEvents() {
  const el = document.getElementById('eventsList');
  if (!el) return;
  const lang = getLang();
  el.innerHTML = events.map(e => `
    <div class="event">
      <div class="event__date">
        <div class="event__day">${escapeHtml(e.day)}</div>
        <div class="event__month" data-bn="${escapeHtml(e.monthBn)}" data-en="${escapeHtml(e.monthEn)}">${escapeHtml(lang === 'bn' ? e.monthBn : e.monthEn)}</div>
      </div>
      <div class="event__info">
        <h3 data-bn="${escapeHtml(e.titleBn)}" data-en="${escapeHtml(e.titleEn)}">${escapeHtml(lang === 'bn' ? e.titleBn : e.titleEn)}</h3>
        <div class="event__meta">
          <span>🕐 <span data-bn="${escapeHtml(e.timeBn)}" data-en="${escapeHtml(e.timeEn)}">${escapeHtml(lang === 'bn' ? e.timeBn : e.timeEn)}</span></span>
          <span>📍 <span data-bn="${escapeHtml(e.placeBn)}" data-en="${escapeHtml(e.placeEn)}">${escapeHtml(lang === 'bn' ? e.placeBn : e.placeEn)}</span></span>
        </div>
      </div>
      <a href="#membership" class="btn btn--outline btn--sm event__cta" data-bn="রেজিস্ট্রেশন" data-en="Register">${lang === 'bn' ? 'রেজিস্ট্রেশন' : 'Register'}</a>
    </div>
  `).join('');
}

export function renderGallery() {
  const el = document.getElementById('galleryGrid');
  if (!el) return;
  el.innerHTML = gallery.map(g => `
    <div class="gallery__item">
      <img src="${escapeHtml(g.src)}" alt="${escapeHtml(g.alt)}" loading="lazy" decoding="async">
    </div>
  `).join('');
}

export function renderAll() {
  renderCommitteeTop();
  renderCommitteeTable();
  renderNews();
  renderEvents();
  renderGallery();
}

export function initRender() {
  renderAll();
  onLangChange(() => {
    renderNews();
    renderEvents();
  });
}
