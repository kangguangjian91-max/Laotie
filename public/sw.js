// Service Worker for Laotie Steel Structure Website
// Provides offline support and cache-first strategy for faster repeat visits

const CACHE_NAME = "laotie-steel-v1.0.0";
const STATIC_CACHE = "laotie-static-v1";
const IMAGE_CACHE = "laotie-images-v1";

// Assets to pre-cache (critical for offline use)
const STATIC_ASSETS = [
  "/",
  "/about",
  "/products",
  "/projects",
  "/contact",
  "/images/hero-bg.webp",
  "/images/factory-building.webp",
  "/images/product-steel-building.webp",
  "/images/product-floor-deck.webp",
  "/images/product-space-frame.webp",
  "/images/product-cladding.webp",
  "/favicon.png",
];

// Install event - pre-cache static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then((cache) => {
        console.log("🚀 Pre-caching static assets");
        return cache.addAll(STATIC_ASSETS);
      }),
    ]).then(() => {
      console.log("✅ Service Worker installed successfully");
      return self.skipWaiting();
    })
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (![CACHE_NAME, STATIC_CACHE, IMAGE_CACHE].includes(cacheName)) {
            console.log("🗑️ Deleting old cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log("✅ Service Worker activated");
      return self.clients.claim();
    })
  );
});

// Fetch event - cache strategy
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== "GET") return;

  // Skip external requests
  if (!url.origin.includes(self.location.origin) && !url.origin.includes("vercel.app") && !url.origin.includes("laotie-steel.com")) {
    return;
  }

  // Strategy 1: Static assets - Cache first
  if (
    request.destination === "script" ||
    request.destination === "style" ||
    request.destination === "font" ||
    STATIC_ASSETS.some((asset) => request.url.includes(asset))
  ) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }

  // Strategy 2: Images - Cache first with fallback
  if (request.destination === "image") {
    event.respondWith(cacheFirst(request, IMAGE_CACHE));
    return;
  }

  // Strategy 3: HTML pages - Network first with cache fallback
  if (request.destination === "document") {
    event.respondWith(networkFirst(request, STATIC_CACHE));
    return;
  }

  // Default: Network only
  event.respondWith(fetch(request));
});

// Cache first strategy (for static assets and images)
async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);

  if (cachedResponse) {
    // Return cached version and update cache in background
    fetchAndCache(request, cache);
    return cachedResponse;
  }

  // Not in cache, fetch from network
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error("❌ Fetch failed:", error);
    // Return a fallback for images
    if (request.destination === "image") {
      return caches.match("/images/hero-bg.webp");
    }
    throw error;
  }
}

// Network first strategy (for HTML pages)
async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName);

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log("⚠️ Network failed, trying cache:", request.url);
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    // Return offline page if available
    return caches.match("/offline.html");
  }
}

// Helper: Fetch and cache
async function fetchAndCache(request, cache) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
  } catch (error) {
    console.error("❌ Background fetch failed:", error);
  }
}

// Listen for messages from the main thread
self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

console.log("🚀 Service Worker loaded - Laotie Steel Structure");
