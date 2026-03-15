const CACHE_NAME = "taqueria-cache-v1";
const urlsToCache = [
  "./index.html",
  "./manifest.json",
  "./style.css", // si sacas el CSS a un archivo aparte
  "./main.js",   // si sacas JS a un archivo aparte
  "./icon-192.png",
  "./icon-512.png"
];

// Instalar SW y cachear archivos esenciales
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting(); // fuerza activar SW
});

// Activar SW y eliminar caches viejos
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

// Interceptar peticiones y servir desde cache
self.addEventListener("fetch", event => {
  // Solo cachea archivos locales, no Firebase
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then(response => response || fetch(event.request))
    );
  }
});

