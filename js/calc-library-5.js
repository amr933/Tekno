/* Calculator library batch 5: room AC sizing, cable size (IEC 60364), concrete
 * quantities, inverter/UPS sizing, breaker sizing, brick & mortar, pipe weight.
 * Same conventions as batches 1-4: fields with gt/ge validation, compute() returns
 * { main, others, formula, steps, assumptions } or { error: "<key>" }.
 */
(function () {
  "use strict";
  var TEKNO = window.TEKNO;
  if (!TEKNO || !TEKNO.registerCalc) return;
  var fmt = TEKNO.fmt;
  var PI = Math.PI;

  function reg(id, variants) { TEKNO.registerCalc({ id: id, variants: variants }); }

  // ---------- Room AC sizing ----------
  // Rule-of-thumb cooling estimate: 550 BTU/h per m² for a typical room,
  // adjusted for sun exposure, insulation, occupancy and a top-floor roof.
  var AC_SIZES = [[12000, "1.5 HP"], [18000, "2.25 HP"], [24000, "3 HP"], [30000, "4 HP"], [36000, "5 HP"], [48000, "6 HP"], [60000, "7.5 HP"]];
  reg("room-ac", { calc: { label: "var_calc", fields: [
    { id: "A", type: "number", label: "f_room_area", gt: 0, initial: 16, unit: [["m²","m²"],["ft²","ft²"]] },
    { id: "sun", type: "select", label: "f_sun_exp", options: [["low","lib_opt_sun_low"],["avg","lib_opt_sun_avg"],["high","lib_opt_sun_high"]], default: "avg" },
    { id: "ins", type: "select", label: "f_insul_q", options: [["good","lib_opt_ins_good"],["avg","lib_opt_ins_avg"],["poor","lib_opt_ins_poor"]], default: "avg" },
    { id: "ppl", type: "number", label: "f_people", ge: 0, initial: 2 },
    { id: "top", type: "select", label: "f_top_floor", options: [["no","lib_opt_no"],["yes","lib_opt_yes"]], default: "no" }
  ], compute: function (v) {
    var A = v.A; if (v.A_unit === "ft²") A *= 0.09290304;
    var sunF = { low: 0.9, avg: 1, high: 1.15 }[v.sun];
    var insF = { good: 0.9, avg: 1, poor: 1.15 }[v.ins];
    var topF = v.top === "yes" ? 1.1 : 1;
    var extra = Math.max(0, v.ppl - 2) * 600;
    var btu = A * 550 * sunF * insF * topF + extra;
    var rec = null;
    for (var i = 0; i < AC_SIZES.length; i++) if (AC_SIZES[i][0] >= btu) { rec = AC_SIZES[i]; break; }
    var tr = btu / 12000, kw = btu * 0.29307107 / 1000, hp = btu / 8000;
    return {
      main: rec
        ? { label: "res_rec_unit", value: rec[0], unit: "BTU/h (" + rec[1] + ")" }
        : { label: "res_btu_req", value: btu, unit: "BTU/h" },
      others: [
        { label: "res_btu_req", value: btu, unit: "BTU/h" },
        { label: "res_tr_ac", value: tr, unit: "TR" },
        { label: "res_kw_ac", value: kw, unit: "kW" },
        { label: "res_hp_ac", value: hp, unit: "HP" }
      ],
      formula: "BTU = A(m²) × 550 × f(sun) × f(insulation) × f(top floor) + 600 × max(0, people − 2)",
      steps: [
        "A = " + fmt(A) + " m², sun ×" + fmt(sunF) + ", insulation ×" + fmt(insF) + ", top floor ×" + fmt(topF),
        "BTU = " + fmt(A) + " × 550 × " + fmt(sunF) + " × " + fmt(insF) + " × " + fmt(topF) + " + " + fmt(extra) + " = " + fmt(btu) + " BTU/h",
        rec ? "next nominal market size >= " + fmt(btu) + " = " + rec[0] + " BTU/h (" + rec[1] + ")" : "above 60000 BTU/h standard units"
      ],
      assumptions: ["lib_as_ac"]
    };
  } } });

  // ---------- Cable size by ampacity (IEC 60364-5-52) ----------
  // Copper, PVC 70°C, three loaded conductors (conservative for single-phase),
  // IEC 60364-5-52:2009 Table B.52.4, ambient 30°C, with Table B.52.14 air
  // temperature correction. Sizes in mm².
  var CABLE_SIZES = [1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120, 150, 185, 240, 300];
  var CABLE_AMP = {
    A1: [13.5, 18, 24, 31, 42, 56, 73, 89, 108, 136, 164, 188, 216, 245, 286, 328],
    B1: [15.5, 21, 28, 36, 50, 68, 89, 110, 134, 171, 207, 239, 262, 296, 346, 394],
    B2: [15, 20, 27, 34, 46, 62, 80, 99, 118, 149, 179, 206, 225, 255, 297, 339],
    C:  [17.5, 24, 32, 41, 57, 76, 96, 119, 144, 184, 223, 259, 299, 341, 403, 464]
  };
  var CABLE_KT = { "25": 1.06, "30": 1, "35": 0.94, "40": 0.87, "45": 0.79, "50": 0.71 };
  reg("cable-size", { calc: { label: "var_calc", fields: [
    { id: "I", type: "number", label: "f_load_current", gt: 0, initial: 40, unit: [["A","A"]] },
    { id: "method", type: "select", label: "f_method", options: [["A1","lib_opt_m_a1"],["B1","lib_opt_m_b1"],["B2","lib_opt_m_b2"],["C","lib_opt_m_c"]], default: "B1" },
    { id: "temp", type: "select", label: "f_ambient", options: [["25","lib_opt_t25"],["30","lib_opt_t30"],["35","lib_opt_t35"],["40","lib_opt_t40"],["45","lib_opt_t45"],["50","lib_opt_t50"]], default: "30" }
  ], compute: function (v) {
    var k = CABLE_KT[v.temp];
    var Icorr = v.I / k;
    var amps = CABLE_AMP[v.method];
    for (var i = 0; i < CABLE_SIZES.length; i++) {
      if (amps[i] >= Icorr) {
        return {
          main: { label: "res_cable_size", value: CABLE_SIZES[i], unit: "mm²" },
          others: [
            { label: "res_icorr", value: Icorr, unit: "A" },
            { label: "res_ampacity", value: amps[i], unit: "A" }
          ],
          formula: "I' = I ÷ k(temp); choose smallest size with Iz ≥ I'",
          steps: [
            "k(" + v.temp + "°C) = " + fmt(k) + " → I' = " + fmt(v.I) + " ÷ " + fmt(k) + " = " + fmt(Icorr) + " A",
            "method " + v.method + ": " + fmt(CABLE_SIZES[i]) + " mm² carries " + fmt(amps[i]) + " A ≥ " + fmt(Icorr) + " A"
          ],
          assumptions: ["lib_as_cable"]
        };
      }
    }
    return { error: "lib_err_cable" };
  } } });

  // ---------- Concrete quantities (nominal mixes) ----------
  var MIXES = {
    "1:3:6":  [1, 3, 6],
    "1:2:4":  [1, 2, 4],
    "1:1.5:3": [1, 1.5, 3],
    "1:1:2":  [1, 1, 2]
  };
  reg("concrete-mix", { calc: { label: "var_calc", fields: [
    { id: "V", type: "number", label: "f_volume", gt: 0, initial: 1, unit: [["m³","m³"],["ft³","ft³"],["L","L"]] },
    { id: "mix", type: "select", label: "f_mix", options: [["1:3:6","lib_opt_mix_136"],["1:2:4","lib_opt_mix_124"],["1:1.5:3","lib_opt_mix_1153"],["1:1:2","lib_opt_mix_112"]], default: "1:2:4" }
  ], compute: function (v) {
    var V = v.V; if (v.V_unit === "ft³") V *= 0.028316846592; if (v.V_unit === "L") V /= 1000;
    var m = MIXES[v.mix], sum = m[0] + m[1] + m[2];
    var dry = V * 1.54;
    var cemM3 = dry * m[0] / sum, sandM3 = dry * m[1] / sum, gravM3 = dry * m[2] / sum;
    var cemKg = cemM3 * 1440, bags = cemKg / 50;
    return {
      main: { label: "res_bags", value: bags, unit: "bags" },
      others: [
        { label: "res_cement", value: cemKg, unit: "kg" },
        { label: "res_sand", value: sandM3, unit: "m³" },
        { label: "res_gravel", value: gravM3, unit: "m³" }
      ],
      formula: "dry volume = 1.54 × V; split by mix ratio; cement = volume × 1440 kg/m³ ÷ 50 kg/bag",
      steps: [
        "dry = 1.54 × " + fmt(V) + " = " + fmt(dry) + " m³, mix " + v.mix + " (sum " + fmt(sum) + ")",
        "cement = " + fmt(cemM3) + " m³ = " + fmt(cemKg) + " kg = " + fmt(bags) + " bags",
        "sand = " + fmt(sandM3) + " m³, gravel = " + fmt(gravM3) + " m³"
      ],
      assumptions: ["lib_as_mix"]
    };
  } } });

  // ---------- Inverter / UPS sizing ----------
  var INV_SIZES = [600, 800, 1000, 1200, 1500, 2000, 2500, 3000, 4000, 5000, 6000, 8000, 10000];
  reg("inverter-size", { calc: { label: "var_calc", fields: [
    { id: "P", type: "number", label: "f_load_power_w", gt: 0, initial: 800, unit: [["W","W"],["kW","kW"]] },
    { id: "h", type: "number", label: "f_backup_hours", gt: 0, initial: 4 },
    { id: "V", type: "select", label: "f_sys_volt", options: [["12","12 V"],["24","24 V"],["48","48 V"]], default: "24" },
    { id: "dod", type: "select", label: "f_batt_type", options: [["0.5","lib_opt_dod50"],["0.8","lib_opt_dod80"]], default: "0.5" }
  ], compute: function (v) {
    var P = v.P; if (v.P_unit === "kW") P *= 1000;
    var dod = parseFloat(v.dod), Vb = parseFloat(v.V);
    var va = P / 0.8 * 1.25;
    var rec = null;
    for (var i = 0; i < INV_SIZES.length; i++) if (INV_SIZES[i] >= va) { rec = INV_SIZES[i]; break; }
    var E = P * v.h;
    var ah = E / (Vb * dod * 0.9);
    var n100 = Math.ceil(ah / 100);
    return {
      main: rec
        ? { label: "res_inverter", value: rec, unit: "VA" }
        : { label: "res_va_req", value: va, unit: "VA" },
      others: [
        { label: "res_va_req", value: va, unit: "VA" },
        { label: "res_energy", value: E, unit: "Wh" },
        { label: "res_battery_ah", value: ah, unit: "Ah @ " + Vb + " V" },
        { label: "res_batt_100", value: n100, unit: "× 100 Ah" }
      ],
      formula: "VA = P ÷ 0.8 × 1.25; Ah = P × h ÷ (V × DoD × 0.9)",
      steps: [
        "VA = " + fmt(P) + " ÷ 0.8 × 1.25 = " + fmt(va) + (rec ? " → " + rec + " VA" : ""),
        "E = " + fmt(P) + " × " + fmt(v.h) + " = " + fmt(E) + " Wh",
        "Ah = " + fmt(E) + " ÷ (" + fmt(Vb) + " × " + fmt(dod) + " × 0.9) = " + fmt(ah) + " Ah"
      ],
      assumptions: ["lib_as_inv"]
    };
  } } });

  // ---------- Breaker (MCB) sizing ----------
  var MCB = [6, 10, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125, 160];
  reg("breaker-size", { calc: { label: "var_calc", fields: [
    { id: "I", type: "number", label: "f_load_current", gt: 0, initial: 20, unit: [["A","A"]] }
  ], compute: function (v) {
    var In = v.I * 1.25;
    for (var i = 0; i < MCB.length; i++) {
      if (MCB[i] >= In) {
        return {
          main: { label: "res_mcb", value: MCB[i], unit: "A" },
          others: [{ label: "res_design_i", value: In, unit: "A" }],
          formula: "design current = 1.25 × load current; choose next standard MCB rating",
          steps: [
            "1.25 × " + fmt(v.I) + " = " + fmt(In) + " A → next standard rating = " + fmt(MCB[i]) + " A"
          ],
          assumptions: ["lib_as_mcb"]
        };
      }
    }
    return { error: "lib_err_mcb" };
  } } });

  // ---------- Brick / block & mortar quantities ----------
  reg("brick-mortar", { calc: { label: "var_calc", fields: [
    { id: "A", type: "number", label: "f_wall_area", gt: 0, initial: 10, unit: [["m²","m²"],["ft²","ft²"]] },
    { id: "bl", type: "number", label: "f_brick_l", gt: 0, initial: 20, unit: [["cm","cm"]] },
    { id: "bw", type: "number", label: "f_brick_w", gt: 0, initial: 10, unit: [["cm","cm"]] },
    { id: "bh", type: "number", label: "f_brick_h", gt: 0, initial: 6, unit: [["cm","cm"]] },
    { id: "j", type: "number", label: "f_joint", ge: 0, initial: 10, unit: [["mm","mm"]] },
    { id: "thk", type: "number", label: "f_wall_thk", gt: 0, initial: 10, unit: [["cm","cm"]] },
    { id: "pt", type: "number", label: "f_plaster_thk", ge: 0, initial: 2, unit: [["cm","cm"]] },
    { id: "sides", type: "select", label: "f_sides", options: [["2","lib_opt_both"],["1","lib_opt_one"]], default: "2" }
  ], compute: function (v) {
    var A = v.A; if (v.A_unit === "ft²") A *= 0.09290304;
    var L = v.bl / 100, W = v.bw / 100, H = v.bh / 100, j = v.j / 1000;
    var cell = (L + j) * (H + j);
    var bricks = Math.ceil(A / cell);
    var wallVol = A * v.thk / 100;
    var brickVol = bricks * L * W * H;
    var mortar = Math.max(0, wallVol - brickVol);
    var plaster = A * parseFloat(v.sides) * v.pt / 100;
    return {
      main: { label: "res_bricks", value: bricks, unit: "bricks" },
      others: [
        { label: "res_mortar", value: mortar, unit: "m³" },
        { label: "res_plaster", value: plaster, unit: "m³" },
        { label: "res_wall_vol", value: wallVol, unit: "m³" }
      ],
      formula: "bricks = A ÷ ((L+j) × (H+j)); mortar = wall volume − bricks volume; plaster = A × sides × t",
      steps: [
        "cell = (" + fmt(L) + " + " + fmt(j) + ") × (" + fmt(H) + " + " + fmt(j) + ") = " + fmt(cell) + " m²",
        "bricks = " + fmt(A) + " ÷ " + fmt(cell) + " = " + fmt(bricks),
        "mortar = " + fmt(wallVol) + " − " + fmt(brickVol) + " = " + fmt(mortar) + " m³; plaster = " + fmt(plaster) + " m³"
      ],
      assumptions: ["lib_as_brick"]
    };
  } } });

  // ---------- Pipe weight ----------
  var PIPE_RHO = { steel: 7850, stainless: 7900, copper: 8960, aluminium: 2700, pvc: 1400 };
  reg("pipe-weight", { calc: { label: "var_calc", fields: [
    { id: "OD", type: "number", label: "f_od", gt: 0, initial: 60.3, unit: [["mm","mm"],["in","in"]] },
    { id: "t", type: "number", label: "f_wall_t", gt: 0, initial: 3.9, unit: [["mm","mm"],["in","in"]] },
    { id: "L", type: "number", label: "f_pipe_len", gt: 0, initial: 6, unit: [["m","m"],["ft","ft"]] },
    { id: "mat", type: "select", label: "f_pipe_mat", options: [["steel","lib_opt_steel"],["stainless","lib_opt_stainless"],["copper","lib_opt_copper"],["aluminium","lib_opt_alu"],["pvc","lib_opt_pvc"]], default: "steel" }
  ], compute: function (v) {
    var OD = v.OD * (v.OD_unit === "in" ? 25.4 : 1);
    var t = v.t * (v.t_unit === "in" ? 25.4 : 1);
    var L = v.L * (v.L_unit === "ft" ? 0.3048 : 1);
    if (2 * t >= OD) return { error: "lib_err_inner" };
    var ID = OD - 2 * t;
    var rho = PIPE_RHO[v.mat];
    var Am = PI / 4 * (OD * OD - ID * ID) * 1e-6; // m²
    var kgm = Am * rho;
    var W = kgm * L;
    return {
      main: { label: "res_pipe_weight", value: W, unit: "kg" },
      others: [{ label: "res_kgm", value: kgm, unit: "kg/m" }],
      formula: "W = (π/4) × (OD² − ID²) × L × ρ; ID = OD − 2t",
      steps: [
        "ID = " + fmt(OD) + " − 2 × " + fmt(t) + " = " + fmt(ID) + " mm",
        "A = " + fmt(Am) + " m², ρ = " + fmt(rho) + " kg/m³ → " + fmt(kgm) + " kg/m",
        "W = " + fmt(kgm) + " × " + fmt(L) + " = " + fmt(W) + " kg"
      ],
      assumptions: ["lib_as_pipe"]
    };
  } } });

})();
