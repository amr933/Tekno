/* TEKNO service worker: offline shell + runtime cache.
 * Bump CACHE on every deploy so updates roll out cleanly. */
var CACHE = "tekno-v2";
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
  "/assets/icon-180.png",
  "/tools/air-density.html",
  "/tools/area-volume.html",
  "/tools/battery-bank.html",
  "/tools/battery-runtime.html",
  "/tools/beam-deflection.html",
  "/tools/beam-reactions.html",
  "/tools/bearing-capacity.html",
  "/tools/bearing-life.html",
  "/tools/belt-length.html",
  "/tools/bend-allowance.html",
  "/tools/bending-stress.html",
  "/tools/bernoulli.html",
  "/tools/boiler-size.html",
  "/tools/bolt-torque.html",
  "/tools/breaker-size.html",
  "/tools/brick-mortar.html",
  "/tools/cable-resistance.html",
  "/tools/cable-size.html",
  "/tools/capacitors.html",
  "/tools/column-buckling.html",
  "/tools/concrete-mix.html",
  "/tools/concrete.html",
  "/tools/cooling-load.html",
  "/tools/cutting-speed.html",
  "/tools/darcy-weisbach.html",
  "/tools/dew-point.html",
  "/tools/duct-size.html",
  "/tools/electrical-load.html",
  "/tools/fan-power.html",
  "/tools/gear-ratio.html",
  "/tools/generator-size.html",
  "/tools/hazen-williams.html",
  "/tools/heat-conduction.html",
  "/tools/heating-load.html",
  "/tools/hp-torque.html",
  "/tools/hvac.html",
  "/tools/hyd-cylinder.html",
  "/tools/ideal-gas.html",
  "/tools/insulation-loss.html",
  "/tools/inverter-size.html",
  "/tools/led-resistor.html",
  "/tools/lmtd.html",
  "/tools/moment-of-inertia.html",
  "/tools/motor-current.html",
  "/tools/normal-stress.html",
  "/tools/ohms-law.html",
  "/tools/pf-correction.html",
  "/tools/pipe-flow.html",
  "/tools/pipe-weight.html",
  "/tools/pneu-cylinder.html",
  "/tools/psychrometric.html",
  "/tools/pump.html",
  "/tools/resistor-colour.html",
  "/tools/resistors-series-parallel.html",
  "/tools/retaining-wall.html",
  "/tools/reynolds-number.html",
  "/tools/room-ac.html",
  "/tools/section-modulus.html",
  "/tools/shear-moment.html",
  "/tools/solar-array.html",
  "/tools/spring-rate.html",
  "/tools/steel.html",
  "/tools/stormwater.html",
  "/tools/tank-fill-time.html",
  "/tools/tank-volume.html",
  "/tools/thermal-expansion.html",
  "/tools/transformer.html",
  "/tools/unit-converter.html",
  "/tools/valve-cv.html",
  "/tools/voltage-drop.html",
  "/tools/water-velocity.html",
  "/tools/welding-heat.html"
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
