const cacheName = 'meal-plan-cache-v1';
const resourcesToCache = [
  '/',
  '/index.html',
  '/day1.html',
  '/day2.html',
  '/day3.html',
  '/day4.html',
  '/day5.html',
  '/day6.html',
  '/day7.html',
  '/styles.css',
  '/manifest.json',
  '/images/icon-192x192.png',
  '/images/icon-512x512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(resourcesToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [cacheName];
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(keyList.map(key => {
        if (cacheWhitelist.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    })
  );
});
