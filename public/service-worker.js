// service-worker.js

const CACHE_NAME = 'pwa-cache-v3';
const CACHE_URLS = [
  '/', // Add all your core pages here
  '/analyse',
  '/chatwithAI',
  '/analyse/interest',
  '/analyse/aptitude',
  '/roadmap',
  '/assets/css/style.css',
  '/assets/css/aptitude/style.css',
  '/assets/js/script.js',
  '/assets/js/scroll.js',
  '/assets/roadmap/d3.js',
  '/assets/roadmap/data.json',
  '/assets/roadmap/dndTree.js',
  '/assets/roadmap/graph.json',
  '/assets/roadmap/jquery-text.js',
  '/assets/roadmap/style.css',
  '/assets/site-img/creativity.png',  // Include important images here
  '/assets/site-img/hobbies.png',  // Include important images here
  '/assets/site-img/h1.png',  // Include important images here
  '/assets/site-img/A&I Test.mp4',  // Include important images here
  '/assets/site-img/chat-bot.mp4',  // Include important images here
  '/assets/site-img/joomla.ico',  // Include important images here
  '/assets/site-img/Roadmap1.mp4',  // Include important images here
  '/manifest.json',  // Include important images here
  // Add more files as required
];

// Install event: Caches the required assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching assets...');
      return cache.addAll(CACHE_URLS);
    })
  );
});

// Fetch event: Intercepts requests to serve cached files
self.addEventListener('fetch', (event) => {

  event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
              // Serve the cached response if available
              return cachedResponse;
          }

          // Attempt to fetch from the network
          return fetch(event.request)
              .then((networkResponse) => {
                  if (!networkResponse || networkResponse.status !== 200) {
                      console.error('Network response failed for:', event.request.url);
                  }
                  return networkResponse;
              })
              .catch((error) => {
                  console.error('Fetch error for:', event.request.url, error);
              });
      })
  );
});

// Activate event: Cleans up old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);  // Delete old caches
          }
        })
      );
    })
  );
});
