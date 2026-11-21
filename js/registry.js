/* TEKNO calculator registry: the single list of calculators and disciplines.
 * The directory, homepage and footer read from here.
 * To add a calculator: register its engine definition (js/calc-library-*.js), add its page
 * in tools/, its translation keys (calc_<id>_title, _desc, _about), and one entry below.
 * Each entry id must match the calculator id used by TEKNO.registerCalc. */
(function () {
  "use strict";
  var TEKNO = window.TEKNO;

  // The 16 engineering disciplines, in the order shown in the directory.
  TEKNO.disciplines = [
    "general", "civil", "electrical", "structural", "fluids", "mechanical", "materials", "hvac",
    "electronics", "energy", "geotechnical", "hydraulics", "pneumatics", "process", "thermal", "manufacturing"
  ];

  TEKNO.registry = [
    // Existing calculators
    { id: "unit-converter", file: "unit-converter.html", cat: "general", popular: true, added: "2026-09-01",
      keywords: "unit conversion length area volume pressure flow temperature power weight" },
    { id: "concrete", file: "concrete.html", cat: "civil", popular: true, added: "2026-08-10",
      keywords: "concrete volume cubic metre slab footing beam" },
    { id: "steel-weight", file: "steel.html", cat: "materials", popular: true, added: "2026-08-10",
      keywords: "steel rebar bar weight reinforcement diameter" },
    { id: "hvac", file: "hvac.html", cat: "hvac", popular: true, added: "2026-10-05",
      keywords: "hvac tr ton refrigeration kw airflow cfm chilled water gpm cooling" },
    { id: "pump", file: "pump.html", cat: "fluids", popular: false, added: "2026-10-20",
      keywords: "pump head hydraulic power flow pressure efficiency bar psi" },
    { id: "electrical-load", file: "electrical-load.html", cat: "electrical", popular: true, added: "2026-11-02",
      keywords: "electrical load single phase three phase power factor current kva kw" },
    { id: "voltage-drop", file: "voltage-drop.html", cat: "electrical", popular: false, added: "2026-11-10",
      keywords: "cable voltage drop copper aluminium conductor single three phase" },
    { id: "area-volume", file: "area-volume.html", cat: "general", popular: false, added: "2026-11-12",
      keywords: "area volume rectangle triangle circle cylinder box surface" },

    // Library batch 1
    { id: "ohms-law", file: "ohms-law.html", cat: "electrical", popular: true, added: "2026-11-20",
      keywords: "ohm ohms law voltage current resistance power v i r" },
    { id: "resistors-series-parallel", file: "resistors-series-parallel.html", cat: "electronics", popular: false, added: "2026-11-20",
      keywords: "resistor series parallel equivalent resistance combine" },
    { id: "led-resistor", file: "led-resistor.html", cat: "electronics", popular: true, added: "2026-11-20",
      keywords: "led resistor current limiting forward voltage e12" },
    { id: "reynolds-number", file: "reynolds-number.html", cat: "fluids", popular: false, added: "2026-11-20",
      keywords: "reynolds number laminar turbulent pipe flow viscosity density" },
    { id: "moment-of-inertia", file: "moment-of-inertia.html", cat: "structural", popular: true, added: "2026-11-20",
      keywords: "moment of inertia second moment area rectangle circle hollow section beam" },
    { id: "beam-deflection", file: "beam-deflection.html", cat: "structural", popular: true, added: "2026-11-20",
      keywords: "beam deflection simply supported uniform load point load span stiffness" },
    { id: "tank-volume", file: "tank-volume.html", cat: "process", popular: false, added: "2026-11-20",
      keywords: "tank volume cylinder rectangular litres gallons capacity" },
    { id: "thermal-expansion", file: "thermal-expansion.html", cat: "thermal", popular: false, added: "2026-11-20",
      keywords: "thermal expansion linear coefficient steel aluminium copper concrete temperature" },

    // Library batch 2
    { id: "bending-stress", file: "bending-stress.html", cat: "structural", popular: false, added: "2026-11-21", keywords: "bending stress sigma M c I" },
    { id: "section-modulus", file: "section-modulus.html", cat: "structural", popular: false, added: "2026-11-21", keywords: "section modulus S I c" },
    { id: "column-buckling", file: "column-buckling.html", cat: "structural", popular: false, added: "2026-11-21", keywords: "column buckling euler critical load" },
    { id: "beam-reactions", file: "beam-reactions.html", cat: "structural", popular: false, added: "2026-11-21", keywords: "beam reactions simply supported" },
    { id: "shear-moment", file: "shear-moment.html", cat: "structural", popular: false, added: "2026-11-21", keywords: "shear moment bending diagram" },
    { id: "pipe-flow", file: "pipe-flow.html", cat: "fluids", popular: false, added: "2026-11-21", keywords: "pipe flow velocity area discharge" },
    { id: "water-velocity", file: "water-velocity.html", cat: "fluids", popular: false, added: "2026-11-21", keywords: "water velocity flow diameter" },
    { id: "hazen-williams", file: "hazen-williams.html", cat: "fluids", popular: false, added: "2026-11-21", keywords: "hazen williams friction velocity" },
    { id: "bernoulli", file: "bernoulli.html", cat: "fluids", popular: false, added: "2026-11-21", keywords: "bernoulli energy pressure velocity" },
    { id: "air-density", file: "air-density.html", cat: "fluids", popular: false, added: "2026-11-21", keywords: "air density ideal gas" },
    { id: "hp-torque", file: "hp-torque.html", cat: "mechanical", popular: false, added: "2026-11-21", keywords: "horsepower torque power rpm" },
    { id: "gear-ratio", file: "gear-ratio.html", cat: "mechanical", popular: false, added: "2026-11-21", keywords: "gear ratio speed torque" },
    { id: "belt-length", file: "belt-length.html", cat: "mechanical", popular: false, added: "2026-11-21", keywords: "belt length pulley open belt" },
    { id: "bolt-torque", file: "bolt-torque.html", cat: "mechanical", popular: false, added: "2026-11-21", keywords: "bolt torque clamping" },
    { id: "normal-stress", file: "normal-stress.html", cat: "mechanical", popular: false, added: "2026-11-21", keywords: "normal stress force area" },
    { id: "spring-rate", file: "spring-rate.html", cat: "mechanical", popular: false, added: "2026-11-21", keywords: "spring rate stiffness coil" },
    { id: "bearing-life", file: "bearing-life.html", cat: "mechanical", popular: false, added: "2026-11-21", keywords: "bearing life L10" },
    { id: "heat-conduction", file: "heat-conduction.html", cat: "thermal", popular: false, added: "2026-11-21", keywords: "heat conduction fourier" },
    { id: "ideal-gas", file: "ideal-gas.html", cat: "thermal", popular: false, added: "2026-11-21", keywords: "ideal gas law PV nRT" },

    // Library batch 3
    { id: "battery-runtime", file: "battery-runtime.html", cat: "electrical", popular: false, added: "2026-11-22", keywords: "battery runtime energy efficiency" },
    { id: "pf-correction", file: "pf-correction.html", cat: "electrical", popular: false, added: "2026-11-22", keywords: "power factor correction kvar" },
    { id: "transformer", file: "transformer.html", cat: "electrical", popular: false, added: "2026-11-22", keywords: "transformer turns ratio current" },
    { id: "motor-current", file: "motor-current.html", cat: "electrical", popular: false, added: "2026-11-22", keywords: "motor current three phase" },
    { id: "generator-size", file: "generator-size.html", cat: "electrical", popular: false, added: "2026-11-22", keywords: "generator sizing load" },
    { id: "battery-bank", file: "battery-bank.html", cat: "electrical", popular: false, added: "2026-11-22", keywords: "battery bank ah capacity" },
    { id: "cable-resistance", file: "cable-resistance.html", cat: "electrical", popular: false, added: "2026-11-22", keywords: "cable resistance conductor" },
    { id: "heating-load", file: "heating-load.html", cat: "hvac", popular: false, added: "2026-11-22", keywords: "heating load transmission" },
    { id: "cooling-load", file: "cooling-load.html", cat: "hvac", popular: false, added: "2026-11-22", keywords: "cooling load sensible latent" },
    { id: "duct-size", file: "duct-size.html", cat: "hvac", popular: false, added: "2026-11-22", keywords: "duct size airflow velocity" },
    { id: "dew-point", file: "dew-point.html", cat: "hvac", popular: false, added: "2026-11-22", keywords: "dew point humidity" },
    { id: "psychrometric", file: "psychrometric.html", cat: "hvac", popular: false, added: "2026-11-22", keywords: "psychrometric humidity ratio enthalpy" },
    { id: "fan-power", file: "fan-power.html", cat: "hvac", popular: false, added: "2026-11-22", keywords: "fan power airflow pressure" },
    { id: "boiler-size", file: "boiler-size.html", cat: "hvac", popular: false, added: "2026-11-22", keywords: "boiler size heating" },
    { id: "capacitors", file: "capacitors.html", cat: "electronics", popular: false, added: "2026-11-22", keywords: "capacitor series parallel" },
    { id: "resistor-colour", file: "resistor-colour.html", cat: "electronics", popular: false, added: "2026-11-22", keywords: "resistor colour code value" },
    { id: "solar-array", file: "solar-array.html", cat: "energy", popular: false, added: "2026-11-22", keywords: "solar panel array size" },
    { id: "hyd-cylinder", file: "hyd-cylinder.html", cat: "hydraulics", popular: false, added: "2026-11-22", keywords: "hydraulic cylinder force" },
    { id: "pneu-cylinder", file: "pneu-cylinder.html", cat: "pneumatics", popular: false, added: "2026-11-22", keywords: "pneumatic cylinder force" },
    { id: "valve-cv", file: "valve-cv.html", cat: "process", popular: false, added: "2026-11-22", keywords: "valve cv kv flow" },
    { id: "tank-fill-time", file: "tank-fill-time.html", cat: "process", popular: false, added: "2026-11-22", keywords: "tank fill drain time" },

    // Library batch 4
    { id: "retaining-wall", file: "retaining-wall.html", cat: "civil", popular: false, added: "2026-11-23", keywords: "retaining wall rankine earth pressure" },
    { id: "stormwater", file: "stormwater.html", cat: "civil", popular: false, added: "2026-11-23", keywords: "stormwater rational method runoff" },
    { id: "darcy-weisbach", file: "darcy-weisbach.html", cat: "fluids", popular: false, added: "2026-11-23", keywords: "darcy weisbach friction loss" },
    { id: "bearing-capacity", file: "bearing-capacity.html", cat: "geotechnical", popular: false, added: "2026-11-23", keywords: "bearing capacity terzaghi foundation" },
    { id: "lmtd", file: "lmtd.html", cat: "thermal", popular: false, added: "2026-11-23", keywords: "lmtd heat exchanger" },
    { id: "insulation-loss", file: "insulation-loss.html", cat: "thermal", popular: false, added: "2026-11-23", keywords: "insulation heat loss cylindrical" },
    { id: "welding-heat", file: "welding-heat.html", cat: "manufacturing", popular: false, added: "2026-11-23", keywords: "welding heat input" },
    { id: "cutting-speed", file: "cutting-speed.html", cat: "manufacturing", popular: false, added: "2026-11-23", keywords: "cutting speed rpm machining" },
    { id: "bend-allowance", file: "bend-allowance.html", cat: "manufacturing", popular: false, added: "2026-11-23", keywords: "sheet metal bend allowance" },

    // Library batch 5
    { id: "room-ac", file: "room-ac.html", cat: "hvac", popular: true, added: "2026-11-21", keywords: "air conditioner ac sizing room btu hp ton cooling capacity" },
    { id: "cable-size", file: "cable-size.html", cat: "electrical", popular: true, added: "2026-11-21", keywords: "cable size ampacity cross section iec 60364 copper wire current" },
    { id: "concrete-mix", file: "concrete-mix.html", cat: "civil", popular: true, added: "2026-11-21", keywords: "concrete mix cement bags sand gravel quantities ratio" },
    { id: "inverter-size", file: "inverter-size.html", cat: "electrical", popular: true, added: "2026-11-21", keywords: "inverter ups sizing battery backup hours ah va home load" },
    { id: "breaker-size", file: "breaker-size.html", cat: "electrical", popular: false, added: "2026-11-21", keywords: "breaker mcb sizing rating protection load current" },
    { id: "brick-mortar", file: "brick-mortar.html", cat: "civil", popular: true, added: "2026-11-21", keywords: "brick block mortar plaster wall quantity masonry" },
    { id: "pipe-weight", file: "pipe-weight.html", cat: "materials", popular: false, added: "2026-11-21", keywords: "pipe weight tube mass steel copper diameter thickness" },
  ];
})();
