(function () {
  "use strict";
  var TEKNO = window.TEKNO;
  if (!TEKNO || !TEKNO.registerCalc) return;
  var fmt = TEKNO.fmt;
  var PI = Math.PI;
  var LEN_F = { m: 1, cm: 0.01, mm: 0.001, in: 0.0254, ft: 0.3048 };
  function reg(id, variants) { TEKNO.registerCalc({ id: id, variants: variants }); }

  // Retaining wall - Rankine active earth pressure
  reg("retaining-wall", { calc: { label: "var_calc", fields: [
    { id: "H", type: "number", label: "f_height", gt: 0, initial: 3, unit: [["m","m"],["ft","ft"]] },
    { id: "gamma", type: "number", label: "f_gamma", gt: 0, initial: 18 },
    { id: "phi", type: "number", label: "f_phi", gt: 0, initial: 30 }
  ], compute: function (v) {
    var H = v.H; if (v.H_unit === "ft") H *= 0.3048;
    var Ka = Math.pow(Math.tan((45 - v.phi/2)*Math.PI/180), 2);
    var Pa = 0.5 * v.gamma * Ka * H * H;
    return { main: { label: "res_pa", value: Pa, unit: "kN/m" }, others: [{ label: "res_ka", value: Ka, unit: "" }],
      formula: "Ka = tan^2(45-phi/2); Pa = 0.5 gamma Ka H^2", steps: ["Pa=" + fmt(Pa) + " kN/m"], assumptions: ["lib_as_rw"] };
  } } });

  // Stormwater rational method
  reg("stormwater", { calc: { label: "var_calc", fields: [
    { id: "C", type: "number", label: "f_c", gt: 0, initial: 0.5 },
    { id: "i", type: "number", label: "f_intensity", gt: 0, initial: 50, unit: [["mm/h","mm/h"],["in/h","in/h"]] },
    { id: "A", type: "number", label: "f_catch_area", gt: 0, initial: 2, unit: [["ha","ha"],["acre","acre"]] }
  ], compute: function (v) {
    var i = v.i; if (v.i_unit === "in/h") i *= 25.4;
    var A = v.A; if (v.A_unit === "acre") A *= 0.404686;
    var Q = v.C * i * A / 360;
    return { main: { label: "res_q", value: Q, unit: "m^3/s" }, formula: "Q = C*i*A/360 (i mm/h, A ha)", steps: ["Q=" + fmt(Q) + " m^3/s"], assumptions: ["lib_as_sw"] };
  } } });

  // Darcy-Weisbach pressure loss
  reg("darcy-weisbach", { calc: { label: "var_calc", fields: [
    { id: "f", type: "number", label: "f_friction", gt: 0, initial: 0.02 },
    { id: "L", type: "number", label: "f_length", gt: 0, initial: 100, unit: [["m","m"]] },
    { id: "D", type: "number", label: "f_pipe_dia", gt: 0, initial: 0.1, unit: [["m","m"]] },
    { id: "v", type: "number", label: "f_velocity", ge: 0, initial: 2, unit: [["m/s","m/s"]] },
    { id: "rho", type: "number", label: "f_density", gt: 0, initial: 1000 }
  ], compute: function (v) {
    var hf = v.f * (v.L / v.D) * (v.v * v.v / (2 * 9.81));
    var dp = v.rho * 9.81 * hf;
    return { main: { label: "res_hf", value: hf, unit: "m" }, others: [{ label: "res_pdrop", value: dp, unit: "Pa" }],
      formula: "hf = f*(L/D)*v^2/(2g)", steps: ["hf=" + fmt(hf) + " m"], assumptions: ["lib_as_dw"] };
  } } });

  // Foundation bearing capacity (Terzaghi strip)
  reg("bearing-capacity", { calc: { label: "var_calc", fields: [
    { id: "c", type: "number", label: "f_cohesion", ge: 0, initial: 20 },
    { id: "q", type: "number", label: "f_surcharge", ge: 0, initial: 10 },
    { id: "gamma", type: "number", label: "f_gamma", gt: 0, initial: 18 },
    { id: "B", type: "number", label: "f_width", gt: 0, initial: 1.5 },
    { id: "Nc", type: "number", label: "f_nc", gt: 0, initial: 30.14 },
    { id: "Nq", type: "number", label: "f_nq", gt: 0, initial: 18.4 },
    { id: "Ng", type: "number", label: "f_ngamma", gt: 0, initial: 15.7 }
  ], compute: function (v) {
    var qu = v.c * v.Nc + v.q * v.Nq + 0.5 * v.gamma * v.B * v.Ng;
    return { main: { label: "res_qu", value: qu, unit: "kPa" }, formula: "qu = cNc + qNq + 0.5 gamma B Ngamma", steps: ["qu=" + fmt(qu) + " kPa"], assumptions: ["lib_as_bc"] };
  } } });

  // Heat exchanger LMTD
  reg("lmtd", { calc: { label: "var_calc", fields: [
    { id: "Thi", type: "number", label: "f_thi", initial: 80 },
    { id: "Tho", type: "number", label: "f_tho", initial: 65 },
    { id: "Tci", type: "number", label: "f_tci", initial: 25 },
    { id: "Tco", type: "number", label: "f_tco", initial: 55 }
  ], compute: function (v) {
    var dT1 = v.Thi - v.Tco; var dT2 = v.Tho - v.Tci;
    if (dT1 <= 0 || dT2 <= 0) return { error: "err_gt" };
    var lmtd;
    if (Math.abs(dT1 - dT2) < 1e-9) lmtd = dT1;
    else lmtd = (dT1 - dT2) / Math.log(dT1 / dT2);
    return { main: { label: "res_lmtd", value: lmtd, unit: "K" }, formula: "LMTD = (dT1-dT2)/ln(dT1/dT2)", steps: ["LMTD=" + fmt(lmtd) + " K"], assumptions: ["lib_as_lmtd"] };
  } } });

  // Insulation heat loss (cylindrical)
  reg("insulation-loss", { calc: { label: "var_calc", fields: [
    { id: "k", type: "number", label: "f_thermal_k", gt: 0, initial: 0.04 },
    { id: "L", type: "number", label: "f_length", gt: 0, initial: 10 },
    { id: "r1", type: "number", label: "f_r1", gt: 0, initial: 0.05 },
    { id: "r2", type: "number", label: "f_r2", gt: 0, initial: 0.1 },
    { id: "dT", type: "number", label: "f_dT", initial: 100 }
  ], compute: function (v) {
    if (v.r2 <= v.r1) return { error: "lib_err_radii" };
    var Q = 2 * PI * v.k * v.L * v.dT / Math.log(v.r2 / v.r1);
    return { main: { label: "res_heat_loss", value: Q, unit: "W" }, formula: "Q = 2 pi k L dT / ln(r2/r1)", steps: ["Q=" + fmt(Q) + " W"], assumptions: ["lib_as_ins"] };
  } } });

  // Welding heat input
  reg("welding-heat", { calc: { label: "var_calc", fields: [
    { id: "V", type: "number", label: "f_voltage", gt: 0, initial: 24 },
    { id: "I", type: "number", label: "f_current", gt: 0, initial: 150 },
    { id: "s", type: "number", label: "f_speed", gt: 0, initial: 5, unit: [["mm/s","mm/s"],["mm/min","mm/min"]] }
  ], compute: function (v) {
    var s = v.s;
    var HI, hiFormula;
    if (v.s_unit === "mm/min") {
      HI = v.V * v.I * 60 / (s * 1000);
      hiFormula = "HI = V*I*60/(s*1000)";
    } else {
      HI = v.V * v.I / (s * 1000);
      hiFormula = "HI = V*I/(s*1000)";
    }
    return { main: { label: "res_hi", value: HI, unit: "kJ/mm" }, formula: hiFormula, steps: ["HI=" + fmt(HI) + " kJ/mm"], assumptions: ["lib_as_weld"] };
  } } });

  // Cutting speed RPM
  reg("cutting-speed", { calc: { label: "var_calc", fields: [
    { id: "Vc", type: "number", label: "f_vc", gt: 0, initial: 100, unit: [["m/min","m/min"]] },
    { id: "D", type: "number", label: "f_dia", gt: 0, initial: 50, unit: [["mm","mm"],["in","in"]] }
  ], compute: function (v) {
    var D = v.D; if (v.D_unit === "in") D *= 25.4;
    var N = 1000 * v.Vc / (PI * D);
    return { main: { label: "res_rpm", value: N, unit: "rpm" }, formula: "N = 1000*Vc/(pi*D)", steps: ["N=" + fmt(N) + " rpm"], assumptions: ["lib_as_cut"] };
  } } });

  // Sheet metal bend allowance
  reg("bend-allowance", { calc: { label: "var_calc", fields: [
    { id: "angle", type: "number", label: "f_angle", gt: 0, initial: 90 },
    { id: "R", type: "number", label: "f_radius", gt: 0, initial: 5, unit: [["mm","mm"],["in","in"]] },
    { id: "T", type: "number", label: "f_sheet_thk", gt: 0, initial: 2, unit: [["mm","mm"],["in","in"]] },
    { id: "K", type: "number", label: "f_kfactor", gt: 0, initial: 0.44 }
  ], compute: function (v) {
    var R = v.R; if (v.R_unit === "in") R *= 25.4;
    var T = v.T; if (v.T_unit === "in") T *= 25.4;
    var BA = (v.angle * Math.PI / 180) * (R + v.K * T);
    return { main: { label: "res_ba", value: BA, unit: "mm" }, formula: "BA = angle(rad)*(R+K*T)", steps: ["BA=" + fmt(BA) + " mm"], assumptions: ["lib_as_ba"] };
  } } });

})();
