// Create new service worker file
const CACHE_NAME = 'portfolio-cache-v1';
const urlsToCache = [
  '/',
  '/style.css',
  '/script.js',
  'Kez.ai|studio.jpg',
  'Kite-Fest.html',
  'vidflow.html',
  'ketra.html',
  'amazebot.html',
  'table-cal.html',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        // Cache what we can and ignore failures
        return Promise.allSettled(
          urlsToCache.map(url => 
            cache.add(url).catch(err => console.log('Failed to cache:', url))
          )
        );
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
      .catch(() => fetch(event.request))
  );
}); 