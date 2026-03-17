const CACHE_NAME = "taqueria-cache-v8";

const urlsToCache = [
"/",
"/index.html",
"/manifest.json",
"/icon-192.png",
"/icon-512.png"
];

/* INSTALAR SERVICE WORKER */

self.addEventListener("install", (event) => {

event.waitUntil(

caches.open(CACHE_NAME).then((cache)=>{

return cache.addAll(urlsToCache);

})

);

self.skipWaiting();

});


/* ACTIVAR SERVICE WORKER */

self.addEventListener("activate",(event)=>{

event.waitUntil(

caches.keys().then((cacheNames)=>{

return Promise.all(

cacheNames.map((name)=>{

if(name!==CACHE_NAME){
return caches.delete(name);
}

})

);

})

);

self.clients.claim();

});


/* INTERCEPTAR PETICIONES */

self.addEventListener("fetch",(event)=>{

event.respondWith(

caches.match(event.request).then((response)=>{

return response || fetch(event.request);

})

);

});


/* PERMITIR ACTUALIZACIÓN DESDE BOTÓN */

self.addEventListener("message",(event)=>{

if(event.data && event.data.action==="skipWaiting"){

self.skipWaiting();

}

});
