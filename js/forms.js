/* ============================================================
   forms.js — Formspree fetch + validation
   ============================================================ */
import { config } from './config.js';
import { getLang } from './lang.js';

const messages = {
  bn: {
    success: 'আপনার আবেদন সফলভাবে জমা হয়েছে। ধন্যবাদ!',
    error: 'কিছু সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।',
    required: 'এই ঘরটি পূরণ করুন',
    email: 'সঠিক ইমেইল লিখুন',
    sending: 'পাঠানো হচ্ছে…',
  },
  en: {
    success: 'Your application has been submitted successfully. Thank you!',
    error: 'Something went wrong. Please try again.',
    required: 'This field is required',
    email: 'Please enter a valid email',
    sending: 'Sending…',
  },
};

function msg(key) {
  return messages[getLang()]?.[key] || messages.bn[key];
}

function validateField(field) {
  const errorEl = field.closest('.form__field')?.querySelector(`[data-fs-error="${field.name}"]`)
    || field.parentElement?.querySelector('.form__field-error');
  let error = '';

  if (field.required && !field.value.trim()) {
    error = msg('required');
  } else if (field.type === 'email' && field.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
    error = msg('email');
  }

  field.setAttribute('aria-invalid', error ? 'true' : 'false');
  if (errorEl) errorEl.textContent = error;
  return !error;
}

function validateForm(form) {
  const fields = form.querySelectorAll('[data-fs-field], [required]');
  let ok = true;
  fields.forEach(f => { if (!validateField(f)) ok = false; });
  return ok;
}

async function submitForm(form) {
  const successEl = form.querySelector('[data-fs-success]');
  const errorEl = form.querySelector('[data-fs-error]');
  const btn = form.querySelector('[data-fs-submit-btn], button[type="submit"]');
  const originalText = btn?.textContent;

  if (successEl) successEl.textContent = '';
  if (errorEl) errorEl.textContent = '';

  if (!validateForm(form)) return;

  if (btn) {
    btn.disabled = true;
    btn.textContent = msg('sending');
  }

  try {
    const data = new FormData(form);
    const res = await fetch(form.action || config.formspree.endpoint, {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' },
    });

    if (res.ok) {
      if (successEl) successEl.textContent = msg('success');
      form.reset();
    } else {
      const body = await res.json().catch(() => ({}));
      if (errorEl) errorEl.textContent = body.error || msg('error');
    }
  } catch {
    if (errorEl) errorEl.textContent = msg('error');
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.textContent = originalText;
    }
  }
}

export function initForms() {
  document.querySelectorAll('form[action*="formspree"], #membership-form, #newsletter-form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      submitForm(form);
    });

    // Live validation
    form.querySelectorAll('[data-fs-field], [required]').forEach(field => {
      field.addEventListener('blur', () => validateField(field));
      field.addEventListener('input', () => {
        if (field.getAttribute('aria-invalid') === 'true') validateField(field);
      });
    });
  });
}
