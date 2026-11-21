/* TEKNO service worker: offline shell + runtime cache.
 * Bump CACHE on every deploy so updates roll out cleanly. */
var CACHE = "tekno-v4";
var SHELL = [
  "/",
  "/tools",
  "/404",
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
  "/assets/icon-180.png",
  "/tools/air-density",
  "/tools/area-volume",
  "/tools/battery-bank",
  "/tools/battery-runtime",
  "/tools/beam-deflection",
  "/tools/beam-reactions",
  "/tools/bearing-capacity",
  "/tools/bearing-life",
  "/tools/belt-length",
  "/tools/bend-allowance",
  "/tools/bending-stress",
  "/tools/bernoulli",
  "/tools/boiler-size",
  "/tools/bolt-torque",
  "/tools/breaker-size",
  "/tools/brick-mortar",
  "/tools/cable-resistance",
  "/tools/cable-size",
  "/tools/capacitors",
  "/tools/column-buckling",
  "/tools/concrete-mix",
  "/tools/concrete",
  "/tools/cooling-load",
  "/tools/cutting-speed",
  "/tools/darcy-weisbach",
  "/tools/dew-point",
  "/tools/duct-size",
  "/tools/electrical-load",
  "/tools/fan-power",
  "/tools/gear-ratio",
  "/tools/generator-size",
  "/tools/hazen-williams",
  "/tools/heat-conduction",
  "/tools/heating-load",
  "/tools/hp-torque",
  "/tools/hvac",
  "/tools/hyd-cylinder",
  "/tools/ideal-gas",
  "/tools/insulation-loss",
  "/tools/inverter-size",
  "/tools/led-resistor",
  "/tools/lmtd",
  "/tools/moment-of-inertia",
  "/tools/motor-current",
  "/tools/normal-stress",
  "/tools/ohms-law",
  "/tools/pf-correction",
  "/tools/pipe-flow",
  "/tools/pipe-weight",
  "/tools/pneu-cylinder",
  "/tools/psychrometric",
  "/tools/pump",
  "/tools/resistor-colour",
  "/tools/resistors-series-parallel",
  "/tools/retaining-wall",
  "/tools/reynolds-number",
  "/tools/room-ac",
  "/tools/section-modulus",
  "/tools/shear-moment",
  "/tools/solar-array",
  "/tools/spring-rate",
  "/tools/steel",
  "/tools/stormwater",
  "/tools/tank-fill-time",
  "/tools/tank-volume",
  "/tools/thermal-expansion",
  "/tools/transformer",
  "/tools/unit-converter",
  "/tools/valve-cv",
  "/tools/voltage-drop",
  "/tools/water-velocity",
  "/tools/welding-heat"
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
        var u = new URL(req.url);
        var variants = [u.pathname];
        if (u.pathname.slice(-5) === ".html") variants.push(u.pathname.slice(0, -5));
        if (u.pathname === "/index.html" || u.pathname === "/index") variants.push("/");
        var chain = caches.match(req).then(function (hit) {
          return hit || caches.match(req, { ignoreSearch: true });
        });
        variants.forEach(function (p) {
          chain = chain.then(function (hit) { return hit || caches.match(p); });
        });
        return chain.then(function (hit) { return hit || caches.match("/404"); });
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
