/* ============================================================
   chuti.js — ছুটির পেজের logic
   ============================================================ */
import { holidays } from '../data/holidays.js';
import { toast } from './utils.js';

function renderHolidays() {
  const tbody = document.getElementById('holidaysBody');
  if (!tbody) return;
  tbody.innerHTML = holidays.map(h => `
    <tr>
      <td>${h.name}</td>
      <td>${h.date}</td>
      <td>${h.apply}</td>
    </tr>
  `).join('');
}

function initSaveAsImage() {
  const btn = document.querySelector('.btn-save');
  if (!btn) return;
  btn.addEventListener('click', async () => {
    const target = document.getElementById('capture');
    if (!target || typeof html2canvas === 'undefined') {
      toast('ছবি তৈরি করা যায়নি');
      return;
    }
    btn.disabled = true;
    btn.textContent = '⏳ তৈরি হচ্ছে…';
    try {
      const canvas = await html2canvas(target, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
      });
      const link = document.createElement('a');
      link.download = 'cu-holiday-list-2026.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
      toast('ছবি সেভ হয়েছে ✓');
    } catch {
      toast('ছবি তৈরি করা যায়নি');
    } finally {
      btn.disabled = false;
      btn.textContent = '⬇️ ছবি হিসেবে সেভ';
    }
  });
}

function initPrint() {
  const btn = document.querySelector('.btn-print');
  if (!btn) return;
  btn.addEventListener('click', () => window.print());
}

document.addEventListener('DOMContentLoaded', () => {
  renderHolidays();
  initSaveAsImage();
  initPrint();
});
