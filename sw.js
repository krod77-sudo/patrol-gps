const VERSION = 'patrol-gps-v1';
const SHELL = ['./', 'index.html', 'manifest.json', 'icon.svg'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // App files: network first (so updates arrive), cache when offline.
  if (url.origin === location.origin) {
    e.respondWith(
      fetch(req).then(r => { caches.open(VERSION).then(c => c.put(req, r.clone())); return r; })
        .catch(() => caches.match(req))
    );
    return;
  }
  // Leaflet from CDN: cache first.
  if (url.hostname === 'cdnjs.cloudflare.com') {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => { caches.open(VERSION).then(c => c.put(req, r.clone())); return r; })));
  }
  // Overpass + map tiles: straight to network.
});
