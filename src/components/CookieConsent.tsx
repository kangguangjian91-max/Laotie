'use client';

import { useEffect, useState } from 'react';

interface Consent {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

const STORAGE_KEY = 'oldtie-cookie-consent';

function getStoredConsent(): Consent | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function storeConsent(c: Consent) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(c));
  } catch { /* ignore */ }
}

function loadGtag() {
  if (typeof window === 'undefined') return;
  if (document.querySelector('script[src*="googletagmanager"]')) return;

  const s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=G-396908953';
  document.head.appendChild(s);

  const w = window as any;
  w.dataLayer = w.dataLayer || [];
  w.gtag = function () { w.dataLayer.push(arguments); };
  w.gtag('js', new Date());
  w.gtag('config', 'G-396908953');
}

// Clarity — add your project ID and uncomment when ready:
// function loadClarity(id: string) {
//   if (typeof window === 'undefined') return;
//   const w = window as any;
//   w.clarity = w.clarity || function () { (w.clarity.q = w.clarity.q || []).push(arguments); };
//   const t = document.createElement('script');
//   t.async = true;
//   t.src = 'https://www.clarity.ms/tag/' + id;
//   document.head.appendChild(t);
// }

// Toggle switch sub-component
function Toggle({ checked, disabled = false, onChange }: { checked: boolean; disabled?: boolean; onChange?: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={onChange}
      className={`
        relative inline-flex h-5 w-9 items-center rounded-full transition-colors flex-shrink-0
        ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}
        ${checked ? 'bg-steel' : 'bg-gray-300'}
      `}
    >
      <span
        className={`
          inline-block h-4 w-4 rounded-full bg-white transition-transform
          ${checked ? 'translate-x-4' : 'translate-x-0.5'}
        `}
      />
    </button>
  );
}

export default function CookieConsent() {
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);
  const [consent, setConsent] = useState<Consent>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    setMounted(true);
    const stored = getStoredConsent();
    if (stored) {
      if (stored.analytics) {
        loadGtag();
      }
      return;
    }
    // slight delay for smooth entry
    const t = setTimeout(() => setShow(true), 200);
    return () => clearTimeout(t);
  }, []);

  function applyAndClose(c: Consent) {
    storeConsent(c);
    if (c.analytics) {
      loadGtag();
    }
    setShow(false);
  }

  if (!mounted || !show) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/25 z-40 animate-fade-in"
        onClick={() => setShow(false)}
      />

      {/* Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-2xl animate-slide-up-cookie">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
            <div>
              <h3 className="text-base font-bold text-gray-900 mb-1">
                🍪 Cookie Settings
              </h3>
              <p className="text-sm text-gray-600 max-w-2xl leading-relaxed">
                We use cookies to analyze traffic and improve your experience.
                By accepting, you consent to our use of cookies. See our{' '}
                <a href="/privacy" className="text-steel-accent underline">
                  Privacy Policy
                </a>
                .
              </p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={() =>
                  applyAndClose({ necessary: true, analytics: false, marketing: false })
                }
                className="px-3 py-2 text-xs font-semibold text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
              >
                Reject All
              </button>
              <button
                onClick={() =>
                  applyAndClose({ necessary: true, analytics: true, marketing: true })
                }
                className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-steel to-steel-accent hover:from-steel-accent hover:to-steel rounded-lg transition-all shadow-sm"
              >
                Accept All
              </button>
            </div>
          </div>

          {/* Preferences */}
          <div className="space-y-1.5 mb-4">
            {/* Necessary */}
            <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-gray-50">
              <div>
                <span className="text-sm font-semibold text-gray-700">Necessary</span>
                <span className="text-xs text-gray-400 ml-2">Always active</span>
                <p className="text-xs text-gray-400 mt-0.5">
                  Required for the website to function.
                </p>
              </div>
              <Toggle checked disabled />
            </div>

            {/* Analytics */}
            <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-gray-50">
              <div>
                <span className="text-sm font-semibold text-gray-700">Analytics</span>
                <p className="text-xs text-gray-400 mt-0.5">
                  Google Analytics &amp; Clarity — helps us understand visitor behavior.
                </p>
              </div>
              <Toggle
                checked={consent.analytics}
                onChange={() =>
                  setConsent((prev) => ({ ...prev, analytics: !prev.analytics }))
                }
              />
            </div>

            {/* Marketing */}
            <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-gray-50">
              <div>
                <span className="text-sm font-semibold text-gray-700">Marketing</span>
                <p className="text-xs text-gray-400 mt-0.5">
                  Personalized advertising and remarketing.
                </p>
              </div>
              <Toggle
                checked={consent.marketing}
                onChange={() =>
                  setConsent((prev) => ({ ...prev, marketing: !prev.marketing }))
                }
              />
            </div>
          </div>

          {/* Save */}
          <div className="flex justify-end">
            <button
              onClick={() => applyAndClose({ ...consent })}
              className="px-4 py-2 text-xs font-semibold text-steel border border-steel/30 hover:bg-steel/5 rounded-lg transition-colors"
            >
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
