const CACHE_NAME = 'quizheads-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  'https://i.imgur.com/qLzuPTL.png',  // Logo
  'https://i.imgur.com/RaS1oar.png',  // Red box image
  'https://i.imgur.com/HXXQ5NI.png',  // Green box image
  'https://i.imgur.com/bRFX1lp.png',  // Orange box image
  'https://i.imgur.com/VZUUjyW.png'   // Purple box image
];

// Install the service worker and cache files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Intercept network requests and serve cached files if available
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// Activate service worker and remove old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
