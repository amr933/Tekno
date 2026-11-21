/* TEKNO service worker: offline shell + runtime cache.
 * Bump CACHE on every deploy so updates roll out cleanly. */
var CACHE = "tekno-v1";
var SHELL = [
  "/",
  "/index.html",
  "/tools.html",
  "/404.html",
  "/manifest.webmanifest",
  "/css/style.css",
  "/js/registry.js",
  "/js/translations.js",
  "/js/translations-library-1.js",
  "/js/translations-library-2.js",
  "/js/translations-library-3.js",
  "/js/translations-library-4.js",
  "/js/translations-library-5.js",
  "/js/translations-ar-batch.js",
  "/js/engine.js",
  "/js/calculators.js",
  "/js/calc-library-1.js",
  "/js/calc-library-2.js",
  "/js/calc-library-3.js",
  "/js/calc-library-4.js",
  "/js/calc-library-5.js",
  "/js/main.js",
  "/assets/favicon.svg",
  "/assets/icon-192.png",
  "/assets/icon-512.png",
  "/assets/icon-maskable-512.png",
  "/assets/icon-180.png"
];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) { return c.addAll(SHELL); }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) { return k === CACHE ? undefined : caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;
  var url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // Page navigations: network first, cache fallback when offline.
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req).then(function (res) {
        var copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put(req, copy); });
        return res;
      }).catch(function () {
        return caches.match(req).then(function (hit) {
          return hit || caches.match("/404.html");
        });
      })
    );
    return;
  }

  // Same-origin assets: stale-while-revalidate.
  e.respondWith(
    caches.match(req).then(function (hit) {
      var net = fetch(req).then(function (res) {
        if (res && res.status === 200) {
          var copy = res.clone();
          caches.open(CACHE).then(function (c) { c.put(req, copy); });
        }
        return res;
      }).catch(function () { return hit; });
      return hit || net;
    })
  );
});
