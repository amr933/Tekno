/*
 * TEKNO calculator library, batch 1.
 * Each calculator is a pure compute() function registered with the shared engine.
 * Governing equations are noted in the formula and assumption keys.
 */
(function () {
  "use strict";
  var TEKNO = window.TEKNO;
  if (!TEKNO || !TEKNO.registerCalc) return;

  function pick(en, ar) { return TEKNO.lang === "ar" ? ar : en; }
  var fmt = TEKNO.fmt;
  var PI = Math.PI;

  // Length factors to metres, shared by several calculators.
  var LEN_OPTS = [["m", "m"], ["cm", "cm"], ["mm", "mm"], ["in", "in"], ["ft", "ft"]];
  var LEN_F = { m: 1, cm: 0.01, mm: 0.001, in: 0.0254, ft: 0.3048 };

  // ---------- Ohm's law ----------
  TEKNO.registerCalc({
    id: "ohms-law",
    variants: {
      find_v: {
        label: "lib_v_find_v",
        fields: [
          { id: "current", type: "number", label: "lib_f_current", ge: 0, initial: 3 },
          { id: "resistance", type: "number", label: "lib_f_resistance", gt: 0, initial: 4 }
        ],
        compute: function (v) {
          var V = v.current * v.resistance, P = V * v.current;
          return {
            main: { label: "lib_res_voltage", value: V, unit: "V" },
            others: [{ label: "lib_res_power", value: P, unit: "W" }],
            formula: "V = I × R ;  P = V × I",
            steps: [
              "V = " + fmt(v.current) + " A × " + fmt(v.resistance) + " Ω = " + fmt(V) + " V",
              "P = " + fmt(V) + " V × " + fmt(v.current) + " A = " + fmt(P) + " W"
            ],
            assumptions: ["lib_as_ohm"]
          };
        }
      },
      find_i: {
        label: "lib_v_find_i",
        fields: [
          { id: "voltage", type: "number", label: "lib_f_voltage", ge: 0, initial: 12 },
          { id: "resistance", type: "number", label: "lib_f_resistance", gt: 0, initial: 4 }
        ],
        compute: function (v) {
          var I = v.voltage / v.resistance, P = v.voltage * I;
          return {
            main: { label: "lib_res_current", value: I, unit: "A" },
            others: [{ label: "lib_res_power", value: P, unit: "W" }],
            formula: "I = V ÷ R ;  P = V × I",
            steps: [
              "I = " + fmt(v.voltage) + " V ÷ " + fmt(v.resistance) + " Ω = " + fmt(I) + " A",
              "P = " + fmt(v.voltage) + " V × " + fmt(I) + " A = " + fmt(P) + " W"
            ],
            assumptions: ["lib_as_ohm"]
          };
        }
      },
      find_r: {
        label: "lib_v_find_r",
        fields: [
          { id: "voltage", type: "number", label: "lib_f_voltage", ge: 0, initial: 12 },
          { id: "current", type: "number", label: "lib_f_current", gt: 0, initial: 3 }
        ],
        compute: function (v) {
          var R = v.voltage / v.current, P = v.voltage * v.current;
          return {
            main: { label: "lib_res_resistance", value: R, unit: "Ω" },
            others: [{ label: "lib_res_power", value: P, unit: "W" }],
            formula: "R = V ÷ I ;  P = V × I",
            steps: [
              "R = " + fmt(v.voltage) + " V ÷ " + fmt(v.current) + " A = " + fmt(R) + " Ω",
              "P = " + fmt(v.voltage) + " V × " + fmt(v.current) + " A = " + fmt(P) + " W"
            ],
            assumptions: ["lib_as_ohm"]
          };
        }
      }
    }
  });

  // ---------- Resistors in series and parallel ----------
  TEKNO.registerCalc({
    id: "resistors-series-parallel",
    variants: {
      series: {
        label: "lib_v_series",
        fields: [
          { id: "r1", type: "number", label: "lib_f_r1", gt: 0, initial: 100 },
          { id: "r2", type: "number", label: "lib_f_r2", gt: 0, initial: 220 },
          { id: "r3", type: "number", label: "lib_f_r3", gt: 0, initial: 330 }
        ],
        compute: function (v) {
          var R = v.r1 + v.r2 + v.r3;
          return {
            main: { label: "lib_res_total_r", value: R, unit: "Ω" },
            formula: "R_total = R1 + R2 + R3",
            steps: ["R_total = " + fmt(v.r1) + " + " + fmt(v.r2) + " + " + fmt(v.r3) + " = " + fmt(R) + " Ω"],
            assumptions: ["lib_as_resistors"]
          };
        }
      },
      parallel: {
        label: "lib_v_parallel",
        fields: [
          { id: "r1", type: "number", label: "lib_f_r1", gt: 0, initial: 100 },
          { id: "r2", type: "number", label: "lib_f_r2", gt: 0, initial: 220 },
          { id: "r3", type: "number", label: "lib_f_r3", gt: 0, initial: 330 }
        ],
        compute: function (v) {
          var sum = 1 / v.r1 + 1 / v.r2 + 1 / v.r3, R = 1 / sum;
          return {
            main: { label: "lib_res_total_r", value: R, unit: "Ω" },
            formula: "1 / R_total = 1/R1 + 1/R2 + 1/R3",
            steps: [
              "1/R_total = 1/" + fmt(v.r1) + " + 1/" + fmt(v.r2) + " + 1/" + fmt(v.r3) + " = " + fmt(sum) + " S",
              "R_total = 1 ÷ " + fmt(sum) + " = " + fmt(R) + " Ω"
            ],
            assumptions: ["lib_as_resistors"]
          };
        }
      }
    }
  });

  // ---------- LED current-limiting resistor ----------
  // Standard E12 resistor values, one decade: 1.0 to 8.2.
  var E12 = [1.0, 1.2, 1.5, 1.8, 2.2, 2.7, 3.3, 3.9, 4.7, 5.6, 6.8, 8.2];
  function nearestE12(R) {
    var decade = Math.pow(10, Math.floor(Math.log10(R)));
    var best = null, bestErr = Infinity;
    [1.0, 1.2, 1.5, 1.8, 2.2, 2.7, 3.3, 3.9, 4.7, 5.6, 6.8, 8.2, 10].forEach(function (m) {
      var cand = m * decade, err = Math.abs(Math.log(cand / R));
      if (err < bestErr) { bestErr = err; best = cand; }
    });
    return best;
  }
  TEKNO.registerCalc({
    id: "led-resistor",
    variants: {
      default: {
        label: "lib_v_default",
        fields: [
          { id: "vs", type: "number", label: "lib_f_supply", gt: 0, initial: 5 },
          { id: "vf", type: "number", label: "lib_f_vf", ge: 0, initial: 2.0 },
          { id: "ima", type: "number", label: "lib_f_if", gt: 0, le: 1000, initial: 20 }
        ],
        compute: function (v) {
          if (v.vs <= v.vf) return { error: "lib_err_led" };
          var I = v.ima / 1000, drop = v.vs - v.vf;
          var R = drop / I, P = drop * I;
          var std = nearestE12(R);
          return {
            main: { label: "lib_res_led_r", value: R, unit: "Ω" },
            others: [
              { label: "lib_res_power", value: P, unit: "W" },
              { label: "lib_res_e12", value: std, unit: "Ω" }
            ],
            formula: "R = (Vs − Vf) ÷ If ;  P = (Vs − Vf) × If",
            steps: [
              "Vs − Vf = " + fmt(v.vs) + " − " + fmt(v.vf) + " = " + fmt(drop) + " V",
              "R = " + fmt(drop) + " V ÷ " + fmt(I) + " A = " + fmt(R) + " Ω",
              "P = " + fmt(drop) + " V × " + fmt(I) + " A = " + fmt(P) + " W",
              pick("Nearest E12 value (practical choice):", "أقرب قيمة قياسية E12 (للاختيار العملي):") + " " + fmt(std) + " Ω"
            ],
            assumptions: ["lib_as_led"]
          };
        }
      }
    }
  });

  // ---------- Reynolds number ----------
  TEKNO.registerCalc({
    id: "reynolds-number",
    variants: {
      default: {
        label: "lib_v_default",
        fields: [
          { id: "velocity", type: "number", label: "lib_f_velocity", gt: 0, initial: 1 },
          { id: "diameter", type: "number", label: "lib_f_diameter_pipe", gt: 0, initial: 50,
            unit: { id: "dunit", options: [["mm", "mm"], ["m", "m"], ["in", "in"]], default: "mm" } },
          { id: "density", type: "number", label: "lib_f_density", gt: 0, initial: 998.2 },
          { id: "viscosity", type: "number", label: "lib_f_viscosity", gt: 0, initial: 1.002,
            unit: { id: "vunit", options: [["mPa.s", "mPa·s"], ["Pa.s", "Pa·s"]], default: "mPa.s" } }
        ],
        compute: function (v) {
          var D = v.diameter * (v.dunit === "mm" ? 0.001 : v.dunit === "in" ? 0.0254 : 1);
          var mu = v.viscosity * (v.vunit === "mPa.s" ? 0.001 : 1);
          var Re = v.density * v.velocity * D / mu;
          var vcrit = 2300 * mu / (v.density * D);
          var regime = Re < 2300 ? pick("laminar", "طبقي")
            : Re <= 4000 ? pick("transitional", "انتقالي") : pick("turbulent", "مضطرب");
          return {
            main: { label: "lib_res_re", value: Re, unit: "" },
            others: [{ label: "lib_res_vcrit", value: vcrit, unit: "m/s" }],
            formula: "Re = ρ × v × D ÷ μ",
            steps: [
              "D = " + fmt(v.diameter) + " " + v.dunit + " = " + fmt(D) + " m",
              "μ = " + fmt(mu) + " Pa·s",
              "Re = " + fmt(v.density) + " × " + fmt(v.velocity) + " × " + fmt(D) + " ÷ " + fmt(mu) + " = " + fmt(Re),
              pick("Regime: ", "نظام الجريان: ") + regime + pick(" (laminar < 2300, turbulent > 4000 for pipes)", " (طبقي < 2300، مضطرب > 4000 للأنابيب)")
            ],
            assumptions: ["lib_as_reynolds"]
          };
        }
      }
    }
  });

  // ---------- Second moment of area ----------
  var LEN4 = [["m", "m"], ["cm", "cm"], ["mm", "mm"], ["in", "in"]];
  TEKNO.registerCalc({
    id: "moment-of-inertia",
    variants: {
      rect: {
        label: "lib_v_rect",
        fields: [
          { id: "b", type: "number", label: "lib_f_width", gt: 0, initial: 100 },
          { id: "h", type: "number", label: "lib_f_height", gt: 0, initial: 200 },
          { id: "unit", type: "select", label: "lib_f_unit", options: LEN4, default: "mm" }
        ],
        compute: function (v) {
          var f = LEN_F[v.unit];
          var I = v.b * Math.pow(v.h, 3) / 12;
          return result(I, v.unit, f, "I = b × h³ ÷ 12", "b × h³ ÷ 12 = " + fmt(v.b) + " × " + fmt(v.h) + "³ ÷ 12");
        }
      },
      hrect: {
        label: "lib_v_hrect",
        fields: [
          { id: "b", type: "number", label: "lib_f_width", gt: 0, initial: 100 },
          { id: "h", type: "number", label: "lib_f_height", gt: 0, initial: 200 },
          { id: "t", type: "number", label: "lib_f_wall", gt: 0, initial: 10 },
          { id: "unit", type: "select", label: "lib_f_unit", options: LEN4, default: "mm" }
        ],
        compute: function (v) {
          if (2 * v.t >= Math.min(v.b, v.h)) return { error: "lib_err_wall" };
          var f = LEN_F[v.unit];
          var I = (v.b * Math.pow(v.h, 3) - (v.b - 2 * v.t) * Math.pow(v.h - 2 * v.t, 3)) / 12;
          return result(I, v.unit, f, "I = (b × h³ − b_i × h_i³) ÷ 12", "(b × h³ − (b − 2t) × (h − 2t)³) ÷ 12");
        }
      },
      circle: {
        label: "lib_v_circle",
        fields: [
          { id: "d", type: "number", label: "lib_f_diameter", gt: 0, initial: 100 },
          { id: "unit", type: "select", label: "lib_f_unit", options: LEN4, default: "mm" }
        ],
        compute: function (v) {
          var f = LEN_F[v.unit];
          var I = PI * Math.pow(v.d, 4) / 64;
          return result(I, v.unit, f, "I = π × d⁴ ÷ 64", "π × " + fmt(v.d) + "⁴ ÷ 64");
        }
      },
      hcircle: {
        label: "lib_v_hcircle",
        fields: [
          { id: "D", type: "number", label: "lib_f_outer_d", gt: 0, initial: 100 },
          { id: "d", type: "number", label: "lib_f_inner_d", gt: 0, initial: 80 },
          { id: "unit", type: "select", label: "lib_f_unit", options: LEN4, default: "mm" }
        ],
        compute: function (v) {
          if (v.d >= v.D) return { error: "lib_err_inner" };
          var f = LEN_F[v.unit];
          var I = PI * (Math.pow(v.D, 4) - Math.pow(v.d, 4)) / 64;
          return result(I, v.unit, f, "I = π × (D⁴ − d⁴) ÷ 64", "π × (" + fmt(v.D) + "⁴ − " + fmt(v.d) + "⁴) ÷ 64");
        }
      }
    }
  });

  function result(I, unit, f, formula, step) {
    return {
      main: { label: "lib_res_i", value: I, unit: unit + "⁴" },
      others: [{ label: "lib_res_i_m4", value: I * Math.pow(f, 4), unit: "m⁴" }],
      formula: formula,
      steps: [step + " = " + fmt(I) + " " + unit + "⁴"],
      assumptions: ["lib_as_moi"]
    };
  }

  // ---------- Simply supported beam deflection ----------
  var I_UNITS = [["m4", "m⁴", 1], ["cm4", "cm⁴", 1e-8], ["mm4", "mm⁴", 1e-12], ["in4", "in⁴", 4.162314e-7]];
  function iFactor(u) { for (var i = 0; i < I_UNITS.length; i++) if (I_UNITS[i][0] === u) return I_UNITS[i][2]; return 1; }
  TEKNO.registerCalc({
    id: "beam-deflection",
    variants: {
      udl: {
        label: "lib_v_udl",
        fields: [
          { id: "L", type: "number", label: "lib_f_span", gt: 0, initial: 6 },
          { id: "w", type: "number", label: "lib_f_udl", ge: 0, initial: 10 },
          { id: "E", type: "number", label: "lib_f_modulus", gt: 0, initial: 200 },
          { id: "I", type: "number", label: "lib_f_inertia", gt: 0, initial: 80000000,
            unit: { id: "iunit", options: I_UNITS.map(function (u) { return [u[0], u[1]]; }), default: "mm4" } }
        ],
        compute: function (v) {
          var Im4 = v.I * iFactor(v.iunit), Ep = v.E * 1e9, wN = v.w * 1000;
          var d = 5 * wN * Math.pow(v.L, 4) / (384 * Ep * Im4) * 1000; // mm
          return beamResult(d, v.L, "δ = 5 × w × L⁴ ÷ (384 × E × I)",
            "δ = 5 × " + fmt(wN) + " × " + fmt(v.L) + "⁴ ÷ (384 × " + fmt(Ep) + " × " + fmt(Im4) + ")");
        }
      },
      point: {
        label: "lib_v_point",
        fields: [
          { id: "L", type: "number", label: "lib_f_span", gt: 0, initial: 6 },
          { id: "P", type: "number", label: "lib_f_point", ge: 0, initial: 20 },
          { id: "E", type: "number", label: "lib_f_modulus", gt: 0, initial: 200 },
          { id: "I", type: "number", label: "lib_f_inertia", gt: 0, initial: 80000000,
            unit: { id: "iunit", options: I_UNITS.map(function (u) { return [u[0], u[1]]; }), default: "mm4" } }
        ],
        compute: function (v) {
          var Im4 = v.I * iFactor(v.iunit), Ep = v.E * 1e9, PN = v.P * 1000;
          var d = PN * Math.pow(v.L, 3) / (48 * Ep * Im4) * 1000; // mm
          return beamResult(d, v.L, "δ = P × L³ ÷ (48 × E × I)",
            "δ = " + fmt(PN) + " × " + fmt(v.L) + "³ ÷ (48 × " + fmt(Ep) + " × " + fmt(Im4) + ")");
        }
      }
    }
  });

  function beamResult(dMm, L, formula, step) {
    var allow = L * 1000 / 360;
    return {
      main: { label: "lib_res_deflection", value: dMm, unit: "mm" },
      others: [
        { label: "lib_res_allow", value: allow, unit: "mm" },
        { label: "lib_res_ratio", value: dMm > 0 ? L * 1000 / dMm : 0, unit: "" }
      ],
      formula: formula,
      steps: [step + " = " + fmt(dMm / 1000) + " m = " + fmt(dMm) + " mm",
        pick("Serviceability check reference: span ÷ 360 =", "مرجع فحص الصلابة: البحر ÷ 360 =") + " " + fmt(allow) + " mm"],
      assumptions: ["lib_as_beam"]
    };
  }

  // ---------- Tank volume ----------
  TEKNO.registerCalc({
    id: "tank-volume",
    variants: {
      cyl: {
        label: "lib_v_cyl",
        fields: [
          { id: "D", type: "number", label: "lib_f_tank_d", gt: 0, initial: 2 },
          { id: "H", type: "number", label: "lib_f_tank_h", gt: 0, initial: 3,
            unit: { id: "unit", options: LEN_OPTS, default: "m" } }
        ],
        compute: function (v) {
          var f = LEN_F[v.unit], D = v.D * f, H = v.H * f;
          var V = PI * D * D / 4 * H;
          return tankResult(V, "V = π × D² ÷ 4 × H", "π × " + fmt(D) + "² ÷ 4 × " + fmt(H));
        }
      },
      rect: {
        label: "lib_v_rect_tank",
        fields: [
          { id: "L", type: "number", label: "lib_f_tank_l", gt: 0, initial: 2 },
          { id: "W", type: "number", label: "lib_f_tank_w", gt: 0, initial: 3 },
          { id: "H", type: "number", label: "lib_f_tank_h", gt: 0, initial: 1.5,
            unit: { id: "unit", options: LEN_OPTS, default: "m" } }
        ],
        compute: function (v) {
          var f = LEN_F[v.unit], L = v.L * f, W = v.W * f, H = v.H * f;
          var V = L * W * H;
          return tankResult(V, "V = L × W × H", fmt(L) + " × " + fmt(W) + " × " + fmt(H));
        }
      }
    }
  });

  function tankResult(V, formula, step) {
    return {
      main: { label: "lib_res_tank_m3", value: V, unit: "m³" },
      others: [
        { label: "lib_res_tank_l", value: V * 1000, unit: "L" },
        { label: "lib_res_tank_gal", value: V * 264.172052, unit: "US gal" }
      ],
      formula: formula,
      steps: [step + " = " + fmt(V) + " m³"],
      assumptions: ["lib_as_tank"]
    };
  }

  // ---------- Linear thermal expansion ----------
  var ALPHA = { steel: 12, aluminium: 23, copper: 16.5, concrete: 10 };
  TEKNO.registerCalc({
    id: "thermal-expansion",
    variants: {
      default: {
        label: "lib_v_default",
        fields: [
          { id: "material", type: "select", label: "lib_f_material", default: "steel",
            options: [["steel", "lib_mat_steel"], ["aluminium", "lib_mat_alu"], ["copper", "lib_mat_cu"], ["concrete", "lib_mat_conc"]] },
          { id: "L0", type: "number", label: "lib_f_length0", gt: 0, initial: 10 },
          { id: "T1", type: "number", label: "lib_f_t1", initial: 20 },
          { id: "T2", type: "number", label: "lib_f_t2", initial: 120 }
        ],
        compute: function (v) {
          var a = ALPHA[v.material] * 1e-6, dT = v.T2 - v.T1;
          var dL = a * v.L0 * dT, Lf = v.L0 + dL;
          return {
            main: { label: "lib_res_dl", value: dL * 1000, unit: "mm" },
            others: [{ label: "lib_res_lf", value: Lf, unit: "m" }],
            formula: "ΔL = α × L₀ × ΔT ;  L = L₀ + ΔL",
            steps: [
              "α = " + fmt(ALPHA[v.material]) + " × 10⁻⁶ /K ; ΔT = " + fmt(v.T2) + " − " + fmt(v.T1) + " = " + fmt(dT) + " K",
              "ΔL = " + fmt(a) + " × " + fmt(v.L0) + " × " + fmt(dT) + " = " + fmt(dL) + " m = " + fmt(dL * 1000) + " mm"
            ],
            assumptions: ["lib_as_thermal"]
          };
        }
      }
    }
  });
})();
