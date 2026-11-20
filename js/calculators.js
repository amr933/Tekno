/* TEKNO calculator definitions.
 * Each calculator lists variants. A variant has input fields and a compute(values)
 * function that returns { main, others, formula, steps, assumptions } or { error }.
 * All formulas are written out in the result so they can be checked by hand.
 */
(function () {
  "use strict";

  var TEKNO = window.TEKNO;
  if (!TEKNO || !TEKNO.registerCalc) return;
  var fmt = TEKNO.fmt;
  var SQRT3 = Math.sqrt(3);
  var G = 9.81;            // m/s²
  var RHO_WATER = 1000;    // kg/m³
  var TR_KW = 3.516852842; // kW per TR (12,000 BTU/h)

  function opts(list) { return list.map(function (u) { return [u[0], u[0]]; }); }
  // Picks the English or Arabic wording at calculation time (re-run on language change).
  function pick(en, ar) { return TEKNO.lang === "ar" ? ar : en; }
  function factorOf(list, sym) {
    for (var i = 0; i < list.length; i++) if (list[i][0] === sym) return list[i][1];
    return NaN;
  }

  // ---------- Unit tables (factor to the SI base unit) ----------

  var LENGTH = [["mm", 0.001], ["cm", 0.01], ["m", 1], ["km", 1000], ["in", 0.0254], ["ft", 0.3048], ["yd", 0.9144], ["mi", 1609.344]];
  var AREA = [["mm²", 1e-6], ["cm²", 1e-4], ["m²", 1], ["km²", 1e6], ["in²", 0.00064516], ["ft²", 0.09290304], ["yd²", 0.83612736], ["acre", 4046.8564224], ["ha", 10000]];
  var VOLUME = [["mL", 1e-6], ["L", 1e-3], ["m³", 1], ["in³", 0.000016387064], ["ft³", 0.028316846592], ["gal (US)", 0.003785411784], ["yd³", 0.764554857984]];
  var PRESSURE = [["Pa", 1], ["kPa", 1000], ["MPa", 1e6], ["bar", 1e5], ["atm", 101325], ["psi", 6894.757293168], ["mmHg", 133.322387415], ["kgf/cm²", 98066.5]];
  var FLOW = [["L/min", 1 / 60000], ["L/s", 0.001], ["m³/h", 1 / 3600], ["m³/s", 1], ["gpm (US)", 0.0000630901964], ["cfm", 0.000471947443]];
  var POWER = [["W", 1], ["kW", 1000], ["MW", 1e6], ["hp", 745.69987158], ["BTU/h", 0.29307107], ["TR", 3516.852842]];
  var WEIGHT = [["mg", 1e-6], ["g", 0.001], ["kg", 1], ["t", 1000], ["oz", 0.028349523125], ["lb", 0.45359237], ["short ton", 907.18474]];

  // Linear conversion between units in one table.
  function linearVariant(label, list, fromDefault, toDefault) {
    return {
      label: label,
      fields: [
        { id: "value", type: "number", label: "f_value", ge: 0, initial: 1,
          unit: { id: "from", options: opts(list), default: fromDefault } },
        { id: "to", type: "select", label: "f_to", options: opts(list), default: toDefault }
      ],
      compute: function (v) {
        var f = factorOf(list, v.from), g = factorOf(list, v.to);
        var ratio = f / g;
        var out = v.value * ratio;
        return {
          main: { label: "res_converted", value: out, unit: v.to },
          formula: pick("result = value × (factor of From ÷ factor of To)", "الناتج = القيمة × (معامل «من» ÷ معامل «إلى»)"),
          steps: [
            pick("factor = ", "المعامل = ") + fmt(f) + " ÷ " + fmt(g) + " = " + fmt(ratio),
            fmt(v.value) + " × " + fmt(ratio) + " = " + fmt(out) + " " + v.to
          ],
          assumptions: ["as_unit"]
        };
      }
    };
  }

  // Temperature uses offset formulas through kelvin.
  var TEMP_OPTS = [["C", "°C"], ["F", "°F"], ["K", "K"]];
  function toK(x, u) {
    if (u === "C") return x + 273.15;
    if (u === "F") return (x - 32) * 5 / 9 + 273.15;
    return x;
  }
  function fromK(k, u) {
    if (u === "C") return k - 273.15;
    if (u === "F") return (k - 273.15) * 9 / 5 + 32;
    return k;
  }
  var TEMP_VARIANT = {
    label: "var_temperature",
    fields: [
      { id: "value", type: "number", label: "f_value", initial: 25,
        unit: { id: "from", options: TEMP_OPTS, default: "C" } },
      { id: "to", type: "select", label: "f_to", options: TEMP_OPTS, default: "F" }
    ],
    compute: function (v) {
      var k = toK(v.value, v.from);
      if (k < 0) return { error: "err_abs_zero" };
      var y = fromK(k, v.to);
      var kexp = v.from === "C" ? fmt(v.value) + " + 273.15"
        : v.from === "F" ? "(" + fmt(v.value) + " − 32) × 5/9 + 273.15"
        : fmt(v.value);
      var yexp = v.to === "C" ? "K − 273.15"
        : v.to === "F" ? "(K − 273.15) × 9/5 + 32"
        : "K";
      return {
        main: { label: "res_converted", value: y, unit: v.to === "C" ? "°C" : v.to === "F" ? "°F" : "K" },
        formula: pick("K = from-scale to kelvin, then K → to-scale", "K = تحويل من المقياس الأصلي إلى الكلفن، ثم من الكلفن إلى المقياس المطلوب"),
        steps: [
          "K = " + kexp + " = " + fmt(k) + " K",
          pick("result = ", "الناتج = ") + yexp + " = " + fmt(y)
        ],
        assumptions: ["as_temp"]
      };
    }
  };

  // ---------- Unit converter ----------

  TEKNO.registerCalc({
    id: "unit-converter",
    variants: {
      length: linearVariant("var_length", LENGTH, "m", "ft"),
      area: linearVariant("var_area", AREA, "m²", "ft²"),
      volume: linearVariant("var_volume", VOLUME, "m³", "L"),
      pressure: linearVariant("var_pressure", PRESSURE, "kPa", "psi"),
      flow: linearVariant("var_flow", FLOW, "L/s", "gpm (US)"),
      power: linearVariant("var_power", POWER, "kW", "TR"),
      weight: linearVariant("var_weight", WEIGHT, "kg", "lb"),
      temperature: TEMP_VARIANT
    }
  });

  // ---------- Concrete volume ----------

  var LEN_SIMPLE = [["m", "m"], ["cm", "cm"], ["mm", "mm"], ["ft", "ft"], ["in", "in"]];
  var LEN_FACTOR = { m: 1, cm: 0.01, mm: 0.001, ft: 0.3048, in: 0.0254 };

  TEKNO.registerCalc({
    id: "concrete",
    variants: {
      default: {
        label: "calc_concrete_title",
        fields: [
          { id: "length", type: "number", label: "f_length", gt: 0, initial: 3,
            unit: { id: "unit", options: LEN_SIMPLE, default: "m" } },
          { id: "width", type: "number", label: "f_width", gt: 0, initial: 2 },
          { id: "height", type: "number", label: "f_height", gt: 0, initial: 0.2 }
        ],
        compute: function (v) {
          var f = LEN_FACTOR[v.unit];
          var L = v.length * f, W = v.width * f, H = v.height * f;
          var vol = L * W * H;
          return {
            main: { label: "res_volume", value: vol, unit: "m³" },
            formula: pick("Volume = Length × Width × Height", "الحجم = الطول × العرض × الارتفاع"),
            steps: [
              pick("Length", "الطول") + " = " + fmt(v.length) + " " + v.unit + " = " + fmt(L) + " m",
              pick("Width", "العرض") + " = " + fmt(v.width) + " " + v.unit + " = " + fmt(W) + " m",
              pick("Height", "الارتفاع") + " = " + fmt(v.height) + " " + v.unit + " = " + fmt(H) + " m",
              pick("Volume", "الحجم") + " = " + fmt(L) + " × " + fmt(W) + " × " + fmt(H) + " = " + fmt(vol) + " m³"
            ],
            assumptions: ["as_concrete"]
          };
        }
      }
    }
  });

  // ---------- Steel bar weight ----------

  TEKNO.registerCalc({
    id: "steel-weight",
    variants: {
      default: {
        label: "calc_steel_weight_title",
        fields: [
          { id: "diameter", type: "number", label: "f_diameter", gt: 0, le: 100, initial: 16 },
          { id: "length", type: "number", label: "f_bar_length", gt: 0, initial: 12 }
        ],
        compute: function (v) {
          var perM = v.diameter * v.diameter / 162;
          var w = perM * v.length;
          return {
            main: { label: "res_weight", value: w, unit: "kg" },
            others: [
              { label: "res_kgm", value: perM, unit: "kg/m" },
              { label: "res_tonnes", value: w / 1000, unit: "t" }
            ],
            formula: pick("Weight (kg) = Diameter² ÷ 162 × Length", "الوزن (كجم) = القطر² ÷ 162 × الطول"),
            steps: [
              pick("kg/m", "كجم/م") + " = " + fmt(v.diameter) + "² ÷ 162 = " + fmt(v.diameter * v.diameter) + " ÷ 162 = " + fmt(perM),
              pick("Weight", "الوزن") + " = " + fmt(perM) + " × " + fmt(v.length) + " = " + fmt(w) + " kg"
            ],
            assumptions: ["as_steel"]
          };
        }
      }
    }
  });

  // ---------- HVAC ----------

  var HVAC_LOAD = [["kW", "kW"], ["TR", "TR"]];
  var HVAC_DT = [["C", "°C"], ["F", "°F"]];
  var RHO_AIR = 1.2, CP_AIR = 1.005, CP_WATER = 4.186, CFM_PER_M3S = 2118.88;

  function loadKw(value, unit) { return unit === "TR" ? value * TR_KW : value; }
  function dtK(value, unit) { return unit === "F" ? value / 1.8 : value; }

  TEKNO.registerCalc({
    id: "hvac",
    variants: {
      tr_kw: {
        label: "var_tr_kw",
        fields: [
          { id: "value", type: "number", label: "f_value", ge: 0, initial: 10,
            unit: { id: "unit", options: [["TR", "TR"], ["kW", "kW"]], default: "TR" } }
        ],
        compute: function (v) {
          if (v.unit === "TR") {
            var kw = v.value * TR_KW;
            return {
              main: { label: "res_kw", value: kw, unit: "kW" },
              formula: "kW = TR × 3.516853",
              steps: ["1 TR = 3.516853 kW", fmt(v.value) + " × 3.516853 = " + fmt(kw) + " kW"],
              assumptions: ["as_tr"]
            };
          }
          var tr = v.value / TR_KW;
          return {
            main: { label: "res_tr", value: tr, unit: "TR" },
            formula: "TR = kW ÷ 3.516853",
            steps: ["1 TR = 3.516853 kW", fmt(v.value) + " ÷ 3.516853 = " + fmt(tr) + " TR"],
            assumptions: ["as_tr"]
          };
        }
      },
      airflow: {
        label: "var_airflow",
        fields: [
          { id: "load", type: "number", label: "f_load", gt: 0, initial: 100,
            unit: { id: "loadUnit", options: HVAC_LOAD, default: "kW" } },
          { id: "dt", type: "number", label: "f_dt", gt: 0, initial: 10,
            unit: { id: "dtUnit", options: HVAC_DT, default: "C" } }
        ],
        compute: function (v) {
          var q = loadKw(v.load, v.loadUnit);
          var dk = dtK(v.dt, v.dtUnit);
          var m3s = q / (RHO_AIR * CP_AIR * dk);
          var cfm = m3s * CFM_PER_M3S;
          return {
            main: { label: "res_m3s", value: m3s, unit: "m³/s" },
            others: [{ label: "res_cfm", value: cfm, unit: "CFM" }],
            formula: "V̇ = Q ÷ (ρ × cp × ΔT)",
            steps: [
              "Q = " + fmt(q) + " kW",
              "ΔT = " + fmt(dk) + " K",
              "V̇ = " + fmt(q) + " ÷ (1.2 × 1.005 × " + fmt(dk) + ") = " + fmt(m3s) + " m³/s",
              "CFM = " + fmt(m3s) + " × 2118.88 = " + fmt(cfm)
            ],
            assumptions: ["as_air"]
          };
        }
      },
      water: {
        label: "var_water",
        fields: [
          { id: "load", type: "number", label: "f_load", gt: 0, initial: 100,
            unit: { id: "loadUnit", options: HVAC_LOAD, default: "kW" } },
          { id: "dt", type: "number", label: "f_dt", gt: 0, initial: 5,
            unit: { id: "dtUnit", options: HVAC_DT, default: "C" } }
        ],
        compute: function (v) {
          var q = loadKw(v.load, v.loadUnit);
          var dk = dtK(v.dt, v.dtUnit);
          var lps = q / (CP_WATER * dk);
          var m3h = lps * 3.6;
          var gpm = lps * 15.850323;
          return {
            main: { label: "res_lps", value: lps, unit: "L/s" },
            others: [
              { label: "res_m3h", value: m3h, unit: "m³/h" },
              { label: "res_gpm", value: gpm, unit: "GPM" }
            ],
            formula: "ṁ = Q ÷ (cp × ΔT)   (1 kg ≈ 1 L)",
            steps: [
              "Q = " + fmt(q) + " kW",
              "ΔT = " + fmt(dk) + " K",
              "ṁ = " + fmt(q) + " ÷ (4.186 × " + fmt(dk) + ") = " + fmt(lps) + " L/s",
              "m³/h = " + fmt(lps) + " × 3.6 = " + fmt(m3h),
              "GPM = " + fmt(lps) + " × 15.850 = " + fmt(gpm)
            ],
            assumptions: ["as_water"]
          };
        }
      }
    }
  });

  // ---------- Pump ----------

  var FLOW_UNITS = [["L/s", 0.001], ["L/min", 1 / 60000], ["m³/h", 1 / 3600], ["m³/s", 1], ["gpm (US)", 0.0000630901964]];
  var PRESS_UNITS = [["kPa", 1000], ["bar", 1e5], ["psi", 6894.757293168], ["kgf/cm²", 98066.5], ["MPa", 1e6]];

  TEKNO.registerCalc({
    id: "pump",
    variants: {
      power: {
        label: "var_pump_power",
        fields: [
          { id: "flow", type: "number", label: "f_flow", gt: 0, initial: 10,
            unit: { id: "flowUnit", options: opts(FLOW_UNITS), default: "L/s" } },
          { id: "head", type: "number", label: "f_head", gt: 0, initial: 30 },
          { id: "density", type: "number", label: "f_density", gt: 0, initial: 1000 },
          { id: "eff", type: "number", label: "f_efficiency", gt: 0, le: 100, initial: 75, optional: true, default: 100 }
        ],
        compute: function (v) {
          var qm3s = v.flow * factorOf(FLOW_UNITS, v.flowUnit);
          var pw = v.density * G * qm3s * v.head;
          var hydKw = pw / 1000;
          var shaftKw = hydKw / (v.eff / 100);
          return {
            main: { label: "res_hyd_kw", value: hydKw, unit: "kW" },
            others: [{ label: "res_shaft_kw", value: shaftKw, unit: "kW" }],
            formula: "P_hyd = ρ × g × Q × H ;  P_shaft = P_hyd ÷ η",
            steps: [
              "Q = " + fmt(v.flow) + " " + v.flowUnit + " = " + fmt(qm3s) + " m³/s",
              "P_hyd = " + fmt(v.density) + " × 9.81 × " + fmt(qm3s) + " × " + fmt(v.head) + " = " + fmt(pw) + " W",
              "P_shaft = " + fmt(hydKw) + " ÷ " + fmt(v.eff / 100) + " = " + fmt(shaftKw) + " kW"
            ],
            assumptions: ["as_pump"]
          };
        }
      },
      pressure: {
        label: "var_pump_pressure",
        fields: [
          { id: "pressure", type: "number", label: "f_pressure", ge: 0, initial: 300,
            unit: { id: "pUnit", options: opts(PRESS_UNITS), default: "kPa" } },
          { id: "density", type: "number", label: "f_density", gt: 0, initial: 1000 }
        ],
        compute: function (v) {
          var pa = v.pressure * factorOf(PRESS_UNITS, v.pUnit);
          var head = pa / (v.density * G);
          return {
            main: { label: "res_head", value: head, unit: "m" },
            others: [
              { label: "res_kpa", value: pa / 1000, unit: "kPa" },
              { label: "res_bar", value: pa / 1e5, unit: "bar" },
              { label: "res_psi", value: pa / 6894.757293168, unit: "psi" }
            ],
            formula: "H = P ÷ (ρ × g)",
            steps: [
              "P = " + fmt(v.pressure) + " " + v.pUnit + " = " + fmt(pa) + " Pa",
              "H = " + fmt(pa) + " ÷ (" + fmt(v.density) + " × 9.81) = " + fmt(head) + " m"
            ],
            assumptions: ["as_head"]
          };
        }
      }
    }
  });

  // ---------- Electrical load ----------

  var POWER_UNITS = [["kW", "kW"], ["W", "W"]];
  var PHASE_OPTS = [["single", "f_ph_single"], ["three", "f_ph_three"]];

  function elecPower(v, three) {
    var k = three ? SQRT3 : 1;
    var p = k * v.voltage * v.current * v.pf;
    var s = k * v.voltage * v.current;
    var q = s * Math.sqrt(1 - v.pf * v.pf);
    var pre = three ? "√3 × " : "";
    return {
      main: { label: "res_kw_real", value: p / 1000, unit: "kW" },
      others: [
        { label: "res_kva", value: s / 1000, unit: "kVA" },
        { label: "res_kvar", value: q / 1000, unit: "kvar" }
      ],
      formula: (three ? "P = √3 × V × I × PF" : "P = V × I × PF") + " ;  S = " + pre + "V × I",
      steps: [
        "P = " + pre + fmt(v.voltage) + " × " + fmt(v.current) + " × " + fmt(v.pf) + " = " + fmt(p) + " W",
        "S = " + pre + fmt(v.voltage) + " × " + fmt(v.current) + " = " + fmt(s) + " VA",
        "Q = S × √(1 − PF²) = " + fmt(s) + " × " + fmt(Math.sqrt(1 - v.pf * v.pf)) + " = " + fmt(q) + " var"
      ],
      assumptions: ["as_elec"]
    };
  }

  var PF_FIELD = { id: "pf", type: "number", label: "f_pf", gt: 0, le: 1, initial: 0.85 };

  TEKNO.registerCalc({
    id: "electrical-load",
    variants: {
      single: {
        label: "var_elec_single",
        fields: [
          { id: "voltage", type: "number", label: "f_voltage", gt: 0, initial: 230 },
          { id: "current", type: "number", label: "f_current", gt: 0, initial: 10 },
          PF_FIELD
        ],
        compute: function (v) { return elecPower(v, false); }
      },
      three: {
        label: "var_elec_three",
        fields: [
          { id: "voltage", type: "number", label: "f_voltage", gt: 0, initial: 400 },
          { id: "current", type: "number", label: "f_current", gt: 0, initial: 20 },
          PF_FIELD
        ],
        compute: function (v) { return elecPower(v, true); }
      },
      current: {
        label: "var_elec_current",
        fields: [
          { id: "power", type: "number", label: "f_power", gt: 0, initial: 5,
            unit: { id: "pUnit", options: POWER_UNITS, default: "kW" } },
          { id: "voltage", type: "number", label: "f_voltage", gt: 0, initial: 400 },
          PF_FIELD,
          { id: "phase", type: "select", label: "f_phase", options: PHASE_OPTS, default: "three" }
        ],
        compute: function (v) {
          var pw = v.pUnit === "kW" ? v.power * 1000 : v.power;
          var three = v.phase === "three";
          var k = three ? SQRT3 : 1;
          var amps = pw / (k * v.voltage * v.pf);
          var pre = three ? "√3 × " : "";
          return {
            main: { label: "res_amps", value: amps, unit: "A" },
            formula: "I = P ÷ (" + pre + "V × PF)",
            steps: [
              "P = " + fmt(pw) + " W",
              "I = " + fmt(pw) + " ÷ (" + pre + fmt(v.voltage) + " × " + fmt(v.pf) + ") = " + fmt(amps) + " A"
            ],
            assumptions: ["as_elec"]
          };
        }
      }
    }
  });

  // ---------- Cable voltage drop ----------

  var MAT_RHO = { cu: 0.0172, al: 0.0282 };
  var MAT_OPTS = [["cu", "f_mat_cu"], ["al", "f_mat_al"]];

  function vdFields() {
    return [
      { id: "voltage", type: "number", label: "f_voltage", gt: 0, initial: 400 },
      { id: "current", type: "number", label: "f_current", gt: 0, initial: 32 },
      { id: "distance", type: "number", label: "f_distance", gt: 0, initial: 50 },
      { id: "area", type: "number", label: "f_area", gt: 0, initial: 6 },
      { id: "material", type: "select", label: "f_material", options: MAT_OPTS, default: "cu" },
      { id: "pf", type: "number", label: "f_pf", gt: 0, le: 1, initial: 0.85 },
      { id: "reactance", type: "number", label: "f_reactance", ge: 0, initial: 0.08, optional: true, default: 0 }
    ];
  }

  function vdCompute(v, three) {
    var rho = MAT_RHO[v.material];
    var r = rho / v.area;                 // Ω/m
    var x = v.reactance / 1000;           // Ω/m
    var sinPhi = Math.sqrt(1 - v.pf * v.pf);
    var z = r * v.pf + x * sinPhi;        // Ω/m effective
    var k = three ? SQRT3 : 2;
    var dv = k * v.current * v.distance * z;
    var pct = dv / v.voltage * 100;
    var recv = v.voltage - dv;
    var status = pct <= 3 ? { i18n: "status_ok" } : { i18n: "status_high" };
    return {
      main: { label: "res_drop_v", value: dv, unit: "V" },
      others: [
        { label: "res_drop_pct", value: pct, unit: "%" },
        { label: "res_recv_v", value: recv, unit: "V" },
        { label: "res_status", value: status, unit: "" }
      ],
      formula: three
        ? "ΔV = √3 × I × L × (r·cos φ + x·sin φ)"
        : "ΔV = 2 × I × L × (r·cos φ + x·sin φ)",
      steps: [
        "r = ρ ÷ A = " + fmt(rho) + " ÷ " + fmt(v.area) + " = " + fmt(r) + " Ω/m",
        "x = " + fmt(v.reactance) + " mΩ/m = " + fmt(x) + " Ω/m",
        "sin φ = √(1 − " + fmt(v.pf) + "²) = " + fmt(sinPhi),
        "Z = " + fmt(r) + " × " + fmt(v.pf) + " + " + fmt(x) + " × " + fmt(sinPhi) + " = " + fmt(z) + " Ω/m",
        "ΔV = " + fmt(k) + " × " + fmt(v.current) + " × " + fmt(v.distance) + " × " + fmt(z) + " = " + fmt(dv) + " V",
        "ΔV % = " + fmt(dv) + " ÷ " + fmt(v.voltage) + " × 100 = " + fmt(pct) + " %"
      ],
      assumptions: ["as_vd"]
    };
  }

  TEKNO.registerCalc({
    id: "voltage-drop",
    variants: {
      single: {
        label: "var_vd_single",
        fields: vdFields(),
        compute: function (v) { return vdCompute(v, false); }
      },
      three: {
        label: "var_vd_three",
        fields: vdFields(),
        compute: function (v) { return vdCompute(v, true); }
      }
    }
  });

  // ---------- Area and volume ----------

  function shapeUnit() {
    return { id: "unit", options: LEN_SIMPLE, default: "m" };
  }

  TEKNO.registerCalc({
    id: "area-volume",
    variants: {
      rect: {
        label: "var_rect",
        fields: [
          { id: "length", type: "number", label: "f_length", gt: 0, initial: 4, unit: shapeUnit() },
          { id: "width", type: "number", label: "f_width", gt: 0, initial: 3 }
        ],
        compute: function (v) {
          var a = v.length * v.width, p = 2 * (v.length + v.width);
          return {
            main: { label: "res_area", value: a, unit: v.unit + "²" },
            others: [{ label: "res_perimeter", value: p, unit: v.unit }],
            formula: pick("A = Length × Width ;  P = 2 × (Length + Width)", "A = الطول × العرض ؛  P = 2 × (الطول + العرض)"),
            steps: [
              "A = " + fmt(v.length) + " × " + fmt(v.width) + " = " + fmt(a),
              "P = 2 × (" + fmt(v.length) + " + " + fmt(v.width) + ") = " + fmt(p)
            ],
            assumptions: ["as_area"]
          };
        }
      },
      tri: {
        label: "var_tri",
        fields: [
          { id: "base", type: "number", label: "f_base", gt: 0, initial: 6, unit: shapeUnit() },
          { id: "height", type: "number", label: "f_height", gt: 0, initial: 4 }
        ],
        compute: function (v) {
          var a = v.base * v.height / 2;
          return {
            main: { label: "res_area", value: a, unit: v.unit + "²" },
            formula: "A = ½ × Base × Height",
            steps: ["A = ½ × " + fmt(v.base) + " × " + fmt(v.height) + " = " + fmt(a)],
            assumptions: ["as_area"]
          };
        }
      },
      circle: {
        label: "var_circle",
        fields: [
          { id: "radius", type: "number", label: "f_radius", gt: 0, initial: 2, unit: shapeUnit() }
        ],
        compute: function (v) {
          var a = Math.PI * v.radius * v.radius, c = 2 * Math.PI * v.radius;
          return {
            main: { label: "res_area", value: a, unit: v.unit + "²" },
            others: [{ label: "res_circ", value: c, unit: v.unit }],
            formula: "A = π × r² ;  C = 2 × π × r",
            steps: [
              "A = π × " + fmt(v.radius) + "² = " + fmt(a),
              "C = 2 × π × " + fmt(v.radius) + " = " + fmt(c)
            ],
            assumptions: ["as_area"]
          };
        }
      },
      cyl: {
        label: "var_cyl",
        fields: [
          { id: "radius", type: "number", label: "f_radius", gt: 0, initial: 1, unit: shapeUnit() },
          { id: "height", type: "number", label: "f_height", gt: 0, initial: 3 }
        ],
        compute: function (v) {
          var vol = Math.PI * v.radius * v.radius * v.height;
          var lsa = 2 * Math.PI * v.radius * v.height;
          var tsa = 2 * Math.PI * v.radius * (v.radius + v.height);
          return {
            main: { label: "res_volume_3d", value: vol, unit: v.unit + "³" },
            others: [
              { label: "res_lsa", value: lsa, unit: v.unit + "²" },
              { label: "res_tsa", value: tsa, unit: v.unit + "²" }
            ],
            formula: pick("V = π × r² × h ;  Lateral = 2 × π × r × h ;  Total = 2 × π × r × (r + h)", "V = π × r² × h ؛  الجانبية = 2 × π × r × h ؛  الكلية = 2 × π × r × (r + h)"),
            steps: [
              "V = π × " + fmt(v.radius) + "² × " + fmt(v.height) + " = " + fmt(vol),
              pick("Lateral", "الجانبية") + " = 2 × π × " + fmt(v.radius) + " × " + fmt(v.height) + " = " + fmt(lsa),
              pick("Total", "الكلية") + " = 2 × π × " + fmt(v.radius) + " × (" + fmt(v.radius) + " + " + fmt(v.height) + ") = " + fmt(tsa)
            ],
            assumptions: ["as_area"]
          };
        }
      },
      box: {
        label: "var_box",
        fields: [
          { id: "length", type: "number", label: "f_length", gt: 0, initial: 2, unit: shapeUnit() },
          { id: "width", type: "number", label: "f_width", gt: 0, initial: 1.5 },
          { id: "height", type: "number", label: "f_height", gt: 0, initial: 1 }
        ],
        compute: function (v) {
          var vol = v.length * v.width * v.height;
          var sa = 2 * (v.length * v.width + v.width * v.height + v.height * v.length);
          return {
            main: { label: "res_volume_3d", value: vol, unit: v.unit + "³" },
            others: [{ label: "res_tsa", value: sa, unit: v.unit + "²" }],
            formula: "V = L × W × H ;  SA = 2 × (LW + WH + HL)",
            steps: [
              "V = " + fmt(v.length) + " × " + fmt(v.width) + " × " + fmt(v.height) + " = " + fmt(vol),
              "SA = 2 × (" + fmt(v.length * v.width) + " + " + fmt(v.width * v.height) + " + " + fmt(v.height * v.length) + ") = " + fmt(sa)
            ],
            assumptions: ["as_area"]
          };
        }
      }
    }
  });
})();
