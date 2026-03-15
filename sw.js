const CACHE_NAME = "taqueria-cache-v2"; // sube la versión cuando cambies
const urlsToCache = [
  "./index.html",
  "./manifest.json",
  "./sw.js",
  // aquí puedes añadir tus CSS, JS y otros recursos
];

// Instalar
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting(); // fuerza al SW a activarse inmediatamente
});

// Activar
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => 
      Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))
    )
  );
  self.clients.claim(); // toma control de la página
});

// Fetch
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
