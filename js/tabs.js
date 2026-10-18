/* ============================================================
   tabs.js — ARIA tabs + keyboard navigation
   ============================================================ */

export function initTabs() {
  const tablists = document.querySelectorAll('[role="tablist"], .tabs__nav');
  tablists.forEach(tablist => {
    const tabs = [...tablist.querySelectorAll('.tabs__btn, [role="tab"]')];
    const panels = tablist.parentElement.querySelectorAll('.tabs__panel, [role="tabpanel"]');
    if (!tabs.length) return;

    // Ensure ARIA attributes
    tabs.forEach((tab, i) => {
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
      tab.setAttribute('tabindex', i === 0 ? '0' : '-1');
      if (!tab.id) tab.id = `tab-${i}`;
      if (panels[i]) {
        panels[i].setAttribute('role', 'tabpanel');
        panels[i].setAttribute('aria-labelledby', tab.id);
        if (i !== 0) panels[i].hidden = true;
      }
    });

    function activate(index) {
      tabs.forEach((t, i) => {
        const selected = i === index;
        t.classList.toggle('active', selected);
        t.setAttribute('aria-selected', selected);
        t.setAttribute('tabindex', selected ? '0' : '-1');
        if (panels[i]) {
          panels[i].classList.toggle('active', selected);
          panels[i].hidden = !selected;
        }
      });
      tabs[index].focus();
    }

    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => activate(i));
      tab.addEventListener('keydown', e => {
        let next = i;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (i + 1) % tabs.length;
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (i - 1 + tabs.length) % tabs.length;
        else if (e.key === 'Home') next = 0;
        else if (e.key === 'End') next = tabs.length - 1;
        else return;
        e.preventDefault();
        activate(next);
      });
    });
  });
}
