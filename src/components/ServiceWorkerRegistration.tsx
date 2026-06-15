"use client";

import { useEffect } from "react";

/**
 * Register Service Worker for PWA support
 * - Enables offline access
 * - Caches static assets for faster repeat visits
 * - Provides background sync capabilities
 */
export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
      return;
    }

    const registerSW = async () => {
      try {
        const registration = await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
        });

        if (registration.installing) {
          console.log("🚀 Service Worker installing...");
        } else if (registration.waiting) {
          console.log("⏳ Service Worker installed, waiting to activate");
        } else if (registration.active) {
          console.log("✅ Service Worker active");
        }

        // Listen for updates
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener("statechange", () => {
              if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                console.log("🔄 New Service Worker installed, refresh to update");
              }
            });
          }
        });
      } catch (error) {
        console.error("❌ Service Worker registration failed:", error);
      }
    };

    // Register on load (not on first paint)
    if (document.readyState === "complete") {
      registerSW();
    } else {
      window.addEventListener("load", registerSW);
    }

    // Listen for messages from Service Worker
    navigator.serviceWorker.addEventListener("message", (event) => {
      console.log("📨 Message from SW:", event.data);
    });
  }, []);

  return null;
}
