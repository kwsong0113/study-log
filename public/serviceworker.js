const CACHE_NAME = 'slog-pwa';
const urlsToCache = [
  'index.html',
  'offline.html',
  './images/icon-192x192.png',
  './images/icon-192x192-1.png',
  './images/offline.png'
];

// Install a service worker
self.addEventListener('install', event => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        // console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Cache and return requests
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (event.request.destination === 'image') {
          return response;
        }
        return fetch(event.request)
          .catch(() => caches.match('offline.html'))
      }
    )
  );
});

// Update a service worker
self.addEventListener('activate', event => {
  const cacheWhiteList = [];
  cacheWhiteList.push(CACHE_NAME);

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhiteList.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});