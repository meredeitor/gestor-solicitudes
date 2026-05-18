const CACHE_NAME = "rh-app-v2";

/* =========================
   ARCHIVOS A CACHEAR
========================= */
const URLS = [
  "./",
  "./login.html",
  "./css/app.css",

  "./admin/dashboard.html",
  "./rh/dashboard.html",
  "./rh/vacaciones.html",
  "./rh/empleados.html",
  "./jefe/dashboard.html",
  "./colaborador/dashboard.html"
];

/* =========================
   INSTALL
========================= */
self.addEventListener("install", event => {

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log("Cacheando app...");
        return cache.addAll(URLS);
      })
  );
});

/* =========================
   ACTIVATE (limpiar cache viejo)
========================= */
self.addEventListener("activate", event => {

  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(k => {
          if(k !== CACHE_NAME){
            return caches.delete(k);
          }
        })
      );
    })
  );
});

/* =========================
   FETCH (offline-first)
========================= */
self.addEventListener("fetch", event => {

  event.respondWith(
    caches.match(event.request)
      .then(response => {

        // ✅ si existe en cache → usarlo
        if(response){
          return response;
        }

        // ✅ si no → ir a red
        return fetch(event.request)
          .catch(() => {
            // fallback offline
            return caches.match("./login.html");
          });

      })
  );

});