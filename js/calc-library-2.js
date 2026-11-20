(function () {
  "use strict";
  var TEKNO = window.TEKNO;
  if (!TEKNO || !TEKNO.registerCalc) return;
  function pick(en, ar) { return TEKNO.lang === "ar" ? ar : en; }
  var fmt = TEKNO.fmt;
  var PI = Math.PI;
  var LEN_F = { m: 1, cm: 0.01, mm: 0.001, in: 0.0254, ft: 0.3048 };

  TEKNO.registerCalc({ id: "bending-stress", variants: { calc: { label: "var_calc", fields: [
    { id: "M", type: "number", label: "f_moment", initial: 10, unit: [["N*m","N*m"],["kN*m","kN*m"]] },
    { id: "c", type: "number", label: "f_distance", gt: 0, initial: 0.1, unit: [["m","m"],["mm","mm"],["cm","cm"],["in","in"]] },
    { id: "I", type: "number", label: "f_inertia", gt: 0, initial: 0.0001, unit: [["m^4","m^4"],["cm^4","cm^4"],["in^4","in^4"]] }
  ], compute: function (v) {
    var M = v.M; if (v.M_unit === "kN*m") M *= 1000;
    var c = v.c; var cf = LEN_F[v.c_unit] || 1; c *= cf;
    var I = v.I; if (v.I_unit === "cm^4") I *= 1e-8; if (v.I_unit === "in^4") I *= 4.16231e-7;
    var sigma = M * c / I;
    return { main: { label: "res_stress", value: sigma, unit: "Pa" }, others: [{ label: "res_stress_mpa", value: sigma / 1e6, unit: "MPa" }],
      formula: "sigma = M*c/I", steps: ["sigma = " + fmt(sigma) + " Pa"], assumptions: ["lib_as_bs"] };
  } } } } );

  TEKNO.registerCalc({ id: "section-modulus", variants: { calc: { label: "var_calc", fields: [
    { id: "I", type: "number", label: "f_inertia", gt: 0, initial: 0.0001, unit: [["m^4","m^4"],["cm^4","cm^4"]] },
    { id: "c", type: "number", label: "f_distance", gt: 0, initial: 0.1, unit: [["m","m"],["mm","mm"],["cm","cm"]] }
  ], compute: function (v) {
    var I = v.I; if (v.I_unit === "cm^4") I *= 1e-8;
    var c = v.c; var cf = LEN_F[v.c_unit] || 1; c *= cf;
    var S = I / c;
    return { main: { label: "res_S", value: S, unit: "m^3" }, formula: "S = I/c", steps: ["S = " + fmt(S)], assumptions: ["lib_as_sm"] };
  } } } } );

  TEKNO.registerCalc({ id: "column-buckling", variants: { calc: { label: "var_calc", fields: [
    { id: "E", type: "number", label: "f_modulus", gt: 0, initial: 200, unit: [["GPa","GPa"],["Pa","Pa"]] },
    { id: "I", type: "number", label: "f_inertia", gt: 0, initial: 0.0001, unit: [["m^4","m^4"],["cm^4","cm^4"]] },
    { id: "L", type: "number", label: "f_length", gt: 0, initial: 3, unit: [["m","m"],["mm","mm"],["ft","ft"]] },
    { id: "K", type: "number", label: "f_kfactor", gt: 0, initial: 1 }
  ], compute: function (v) {
    var E = v.E; if (v.E_unit === "GPa") E *= 1e9;
    var I = v.I; if (v.I_unit === "cm^4") I *= 1e-8;
    var L = v.L; var lf = LEN_F[v.L_unit] || 1; L *= lf;
    var Pcr = Math.PI * Math.PI * E * I / (v.K * v.K * L * L);
    return { main: { label: "res_pcr", value: Pcr, unit: "N" }, others: [{ label: "res_pcr_kn", value: Pcr / 1000, unit: "kN" }],
      formula: "Pcr = pi^2 E I / (K L)^2", steps: ["Pcr = " + fmt(Pcr) + " N"], assumptions: ["lib_as_euler"] };
  } } } } );

  TEKNO.registerCalc({ id: "beam-reactions", variants: { calc: { label: "var_calc", fields: [
    { id: "w", type: "number", label: "f_udl", ge: 0, initial: 5, unit: [["N/m","N/m"],["kN/m","kN/m"]] },
    { id: "P", type: "number", label: "f_pointload", ge: 0, initial: 10, unit: [["N","N"],["kN","kN"]] },
    { id: "a", type: "number", label: "f_dist_a", ge: 0, initial: 2, unit: [["m","m"],["mm","mm"],["ft","ft"]] },
    { id: "L", type: "number", label: "f_span", gt: 0, initial: 6, unit: [["m","m"],["mm","mm"],["ft","ft"]] }
  ], compute: function (v) {
    var w = v.w; if (v.w_unit === "kN/m") w *= 1000;
    var P = v.P; if (v.P_unit === "kN") P *= 1000;
    var a = v.a; var lf = LEN_F[v.a_unit] || 1; a *= lf;
    var L = v.L; var lf2 = LEN_F[v.L_unit] || 1; L *= lf2;
    if (a > L) return { error: "err_invalid" };
    var RB = (w * L * L / 2 + P * a) / L;
    var RA = w * L + P - RB;
    return { main: { label: "res_ra", value: RA, unit: "N" }, others: [{ label: "res_rb", value: RB, unit: "N" }],
      formula: "RA = wL + P - RB", steps: ["RA=" + fmt(RA) + " N", "RB=" + fmt(RB) + " N"], assumptions: ["lib_as_beam"] };
  } } } } );

  TEKNO.registerCalc({ id: "shear-moment", variants: { calc: { label: "var_calc", fields: [
    { id: "w", type: "number", label: "f_udl", ge: 0, initial: 5, unit: [["N/m","N/m"],["kN/m","kN/m"]] },
    { id: "L", type: "number", label: "f_span", gt: 0, initial: 6, unit: [["m","m"],["mm","mm"],["ft","ft"]] },
    { id: "x", type: "number", label: "f_dist_x", ge: 0, initial: 3, unit: [["m","m"],["mm","mm"],["ft","ft"]] }
  ], compute: function (v) {
    var w = v.w; if (v.w_unit === "kN/m") w *= 1000;
    var L = v.L; var lf = LEN_F[v.L_unit] || 1; L *= lf;
    var x = v.x; var lf2 = LEN_F[v.x_unit] || 1; x *= lf2;
    if (x > L) return { error: "err_invalid" };
    var R = L * w / 2;
    var V = R - w * x;
    var M = R * x - w * x * x / 2;
    return { main: { label: "res_moment", value: M, unit: "N*m" }, others: [{ label: "res_shear", value: V, unit: "N" }],
      formula: "V = wL/2 - wx ; M = wLx/2 - wx^2/2", steps: ["V=" + fmt(V) + " N", "M=" + fmt(M) + " N*m"], assumptions: ["lib_as_beam"] };
  } } } } );

  TEKNO.registerCalc({ id: "pipe-flow", variants: { calc: { label: "var_calc", fields: [
    { id: "v", type: "number", label: "f_velocity", ge: 0, initial: 2, unit: [["m/s","m/s"],["ft/s","ft/s"]] },
    { id: "d", type: "number", label: "f_diameter", gt: 0, initial: 0.1, unit: [["m","m"],["mm","mm"],["in","in"],["cm","cm"]] }
  ], compute: function (v) {
    var vel = v.v; if (v.v_unit === "ft/s") vel *= 0.3048;
    var d = v.d; var df = LEN_F[v.d_unit] || 1; d *= df;
    var A = Math.PI * d * d / 4;
    var Q = vel * A;
    return { main: { label: "res_flow", value: Q, unit: "m^3/s" }, others: [{ label: "res_flow_lpm", value: Q * 60000, unit: "L/min" }],
      formula: "Q = v * A", steps: ["Q=" + fmt(Q) + " m^3/s"], assumptions: ["lib_as_pipe"] };
  } } } } );

  TEKNO.registerCalc({ id: "water-velocity", variants: { calc: { label: "var_calc", fields: [
    { id: "Q", type: "number", label: "f_flow", ge: 0, initial: 0.01, unit: [["m^3/s","m^3/s"],["L/s","L/s"]] },
    { id: "d", type: "number", label: "f_diameter", gt: 0, initial: 0.1, unit: [["m","m"],["mm","mm"],["in","in"]] }
  ], compute: function (v) {
    var Q = v.Q; if (v.Q_unit === "L/s") Q /= 1000;
    var d = v.d; var df = LEN_F[v.d_unit] || 1; d *= df;
    var A = Math.PI * d * d / 4;
    var vout = Q / A;
    return { main: { label: "res_velocity", value: vout, unit: "m/s" }, formula: "v = Q/A", steps: ["v=" + fmt(vout) + " m/s"], assumptions: ["lib_as_pipe"] };
  } } } } );

  TEKNO.registerCalc({ id: "hazen-williams", variants: { calc: { label: "var_calc", fields: [
    { id: "C", type: "number", label: "f_hw_c", gt: 0, initial: 100 },
    { id: "d", type: "number", label: "f_diameter", gt: 0, initial: 0.1, unit: [["m","m"],["mm","mm"],["in","in"]] },
    { id: "S", type: "number", label: "f_slope", gt: 0, initial: 0.01 }
  ], compute: function (v) {
    var d = v.d; var df = LEN_F[v.d_unit] || 1; d *= df;
    var vout = 0.849 * v.C * Math.pow(d, 0.63) * Math.pow(v.S, 0.54);
    return { main: { label: "res_velocity", value: vout, unit: "m/s" }, formula: "v = 0.849 C d^0.63 S^0.54", steps: ["v=" + fmt(vout) + " m/s"], assumptions: ["lib_as_hw"] };
  } } } } );

  TEKNO.registerCalc({ id: "bernoulli", variants: { calc: { label: "var_calc", fields: [
    { id: "p1", type: "number", label: "f_p1", ge: 0, initial: 200, unit: [["kPa","kPa"],["Pa","Pa"]] },
    { id: "v1", type: "number", label: "f_v1", ge: 0, initial: 2 },
    { id: "z1", type: "number", label: "f_z1", initial: 10 },
    { id: "v2", type: "number", label: "f_v2", ge: 0, initial: 4 },
    { id: "z2", type: "number", label: "f_z2", initial: 0 },
    { id: "rho", type: "number", label: "f_density", gt: 0, initial: 1000 }
  ], compute: function (v) {
    var p1 = v.p1; if (v.p1_unit === "kPa") p1 *= 1000;
    var g = 9.81;
    var p2 = p1 + 0.5 * v.rho * (v.v1 * v.v1 - v.v2 * v.v2) + v.rho * g * (v.z1 - v.z2);
    return { main: { label: "res_p2", value: p2, unit: "Pa" }, others: [{ label: "res_p2_kpa", value: p2 / 1000, unit: "kPa" }],
      formula: "p2 = p1 + rho/2(v1^2-v2^2)+rho*g(z1-z2)", steps: ["p2=" + fmt(p2) + " Pa"], assumptions: ["lib_as_bern"] };
  } } } } );

  TEKNO.registerCalc({ id: "air-density", variants: { calc: { label: "var_calc", fields: [
    { id: "P", type: "number", label: "f_pressure", gt: 0, initial: 101.325, unit: [["kPa","kPa"],["Pa","Pa"]] },
    { id: "T", type: "number", label: "f_temp", initial: 20, unit: [["C","C"],["K","K"]] }
  ], compute: function (v) {
    var P = v.P; if (v.P_unit === "kPa") P *= 1000;
    var T = v.T; if (v.T_unit === "C") T += 273.15;
    var R = 287.05;
    var rho = P / (R * T);
    return { main: { label: "res_density", value: rho, unit: "kg/m^3" }, formula: "rho = P/(R_specific T)", steps: ["rho=" + fmt(rho) + " kg/m^3"], assumptions: ["lib_as_air"] };
  } } } } );

  TEKNO.registerCalc({ id: "hp-torque", variants: {
    find_hp: { label: "lib_v_find_hp", fields: [
      { id: "T", type: "number", label: "f_torque", ge: 0, initial: 100 },
      { id: "N", type: "number", label: "f_rpm", gt: 0, initial: 1500 }
    ], compute: function (v) { var P = 2 * PI * v.N * v.T / 60; return { main: { label: "res_power", value: P, unit: "W" }, others: [{ label: "res_hp", value: P / 745.7, unit: "hp" }], formula: "P = 2*pi*N*T/60", steps: ["P=" + fmt(P) + " W"], assumptions: ["lib_as_hp"] }; } },
    find_t: { label: "lib_v_find_t", fields: [
      { id: "P", type: "number", label: "f_power", ge: 0, initial: 1000, unit: [["W","W"],["hp","hp"]] },
      { id: "N", type: "number", label: "f_rpm", gt: 0, initial: 1500 }
    ], compute: function (v) { var P = v.P; if (v.P_unit === "hp") P *= 745.7; var T = P * 60 / (2 * PI * v.N); return { main: { label: "res_torque", value: T, unit: "N*m" }, formula: "T = P*60/(2*pi*N)", steps: ["T=" + fmt(T) + " N*m"], assumptions: ["lib_as_hp"] }; } }
  } });

  TEKNO.registerCalc({ id: "gear-ratio", variants: { calc: { label: "var_calc", fields: [
    { id: "N1", type: "number", label: "f_rpm_in", gt: 0, initial: 1000 },
    { id: "N2", type: "number", label: "f_rpm_out", gt: 0, initial: 250 },
    { id: "T1", type: "number", label: "f_torque", ge: 0, initial: 10 }
  ], compute: function (v) {
    var ratio = v.N1 / v.N2;
    var T2 = v.T1 * ratio * 0.95;
    return { main: { label: "res_ratio", value: ratio, unit: "" }, others: [{ label: "res_torque_out", value: T2, unit: "N*m" }],
      formula: "ratio = N1/N2", steps: ["ratio=" + fmt(ratio)], assumptions: ["lib_as_gear"] };
  } } } } );

  TEKNO.registerCalc({ id: "belt-length", variants: { calc: { label: "var_calc", fields: [
    { id: "D1", type: "number", label: "f_d1", gt: 0, initial: 0.2, unit: [["m","m"],["mm","mm"],["in","in"]] },
    { id: "D2", type: "number", label: "f_d2", gt: 0, initial: 0.4, unit: [["m","m"],["mm","mm"],["in","in"]] },
    { id: "C", type: "number", label: "f_center", gt: 0, initial: 1, unit: [["m","m"],["mm","mm"],["in","in"]] }
  ], compute: function (v) {
    var D1 = v.D1 * (LEN_F[v.D1_unit] || 1);
    var D2 = v.D2 * (LEN_F[v.D2_unit] || 1);
    var C = v.C * (LEN_F[v.C_unit] || 1);
    var L = 2 * C + Math.PI * (D1 + D2) / 2 + (D2 - D1) * (D2 - D1) / (4 * C);
    return { main: { label: "res_length", value: L, unit: "m" }, formula: "L = 2C + pi(D1+D2)/2 + (D2-D1)^2/(4C)", steps: ["L=" + fmt(L) + " m"], assumptions: ["lib_as_belt"] };
  } } } } );

  TEKNO.registerCalc({ id: "bolt-torque", variants: { calc: { label: "var_calc", fields: [
    { id: "K", type: "number", label: "f_k", gt: 0, initial: 0.2 },
    { id: "F", type: "number", label: "f_force", gt: 0, initial: 10000, unit: [["N","N"],["kN","kN"]] },
    { id: "d", type: "number", label: "f_diameter", gt: 0, initial: 0.012, unit: [["m","m"],["mm","mm"],["in","in"]] }
  ], compute: function (v) {
    var F = v.F; if (v.F_unit === "kN") F *= 1000;
    var d = v.d * (LEN_F[v.d_unit] || 1);
    var T = v.K * F * d;
    return { main: { label: "res_torque", value: T, unit: "N*m" }, formula: "T = K*F*d", steps: ["T=" + fmt(T) + " N*m"], assumptions: ["lib_as_bolt"] };
  } } } } );

  TEKNO.registerCalc({ id: "normal-stress", variants: { calc: { label: "var_calc", fields: [
    { id: "F", type: "number", label: "f_force", initial: 10000, unit: [["N","N"],["kN","kN"]] },
    { id: "A", type: "number", label: "f_area", gt: 0, initial: 0.001, unit: [["m^2","m^2"],["cm^2","cm^2"],["mm^2","mm^2"]] }
  ], compute: function (v) {
    var F = v.F; if (v.F_unit === "kN") F *= 1000;
    var A = v.A; if (v.A_unit === "cm^2") A *= 1e-4; if (v.A_unit === "mm^2") A *= 1e-6;
    var s = F / A;
    return { main: { label: "res_stress", value: s, unit: "Pa" }, others: [{ label: "res_mpa", value: s / 1e6, unit: "MPa" }],
      formula: "sigma = F/A", steps: ["sigma=" + fmt(s) + " Pa"], assumptions: ["lib_as_ns"] };
  } } } } );

  TEKNO.registerCalc({ id: "spring-rate", variants: { calc: { label: "var_calc", fields: [
    { id: "G", type: "number", label: "f_shear_mod", gt: 0, initial: 79, unit: [["GPa","GPa"],["Pa","Pa"]] },
    { id: "d", type: "number", label: "f_wire_dia", gt: 0, initial: 2, unit: [["mm","mm"],["m","m"],["in","in"]] },
    { id: "D", type: "number", label: "f_coil_dia", gt: 0, initial: 20, unit: [["mm","mm"],["m","m"],["in","in"]] },
    { id: "N", type: "number", label: "f_active_coils", gt: 0, initial: 10 }
  ], compute: function (v) {
    var G = v.G; if (v.G_unit === "GPa") G *= 1e9;
    var d = v.d * (LEN_F[v.d_unit] || 1);
    var D = v.D * (LEN_F[v.D_unit] || 1);
    var k = G * Math.pow(d, 4) / (8 * Math.pow(D, 3) * v.N);
    return { main: { label: "res_k", value: k, unit: "N/m" }, formula: "k = G d^4/(8 D^3 N)", steps: ["k=" + fmt(k) + " N/m"], assumptions: ["lib_as_spring"] };
  } } } } );

  TEKNO.registerCalc({ id: "bearing-life", variants: { calc: { label: "var_calc", fields: [
    { id: "C", type: "number", label: "f_dyn_load", gt: 0, initial: 10000, unit: [["N","N"],["kN","kN"]] },
    { id: "P", type: "number", label: "f_equiv_load", gt: 0, initial: 5000, unit: [["N","N"],["kN","kN"]] },
    { id: "p", type: "number", label: "f_exponent", gt: 0, initial: 3 }
  ], compute: function (v) {
    var C = v.C; if (v.C_unit === "kN") C *= 1000;
    var P = v.P; if (v.P_unit === "kN") P *= 1000;
    var L10 = Math.pow(C / P, v.p) * 1e6;
    return { main: { label: "res_L10", value: L10, unit: "rev" }, others: [{ label: "res_hours", value: L10 / (60 * 1000), unit: "h (at 1000 rpm)" }],
      formula: "L10 = (C/P)^p million rev", steps: ["L10=" + fmt(L10) + " rev"], assumptions: ["lib_as_bearing"] };
  } } } } );

  TEKNO.registerCalc({ id: "heat-conduction", variants: { calc: { label: "var_calc", fields: [
    { id: "k", type: "number", label: "f_k", gt: 0, initial: 0.5 },
    { id: "A", type: "number", label: "f_area", gt: 0, initial: 1 },
    { id: "dT", type: "number", label: "f_dT", initial: 20 },
    { id: "L", type: "number", label: "f_thickness", gt: 0, initial: 0.1, unit: [["m","m"],["mm","mm"]] }
  ], compute: function (v) {
    var L = v.L; if (v.L_unit === "mm") L /= 1000;
    var Q = v.k * v.A * v.dT / L;
    return { main: { label: "res_heat", value: Q, unit: "W" }, formula: "Q = k A dT / L", steps: ["Q=" + fmt(Q) + " W"], assumptions: ["lib_as_cond"] };
  } } } } );

  TEKNO.registerCalc({ id: "ideal-gas", variants: {
    solve_p: { label: "lib_v_solve_p", fields: [
      { id: "n", type: "number", label: "f_moles", gt: 0, initial: 1 },
      { id: "T", type: "number", label: "f_temp", initial: 293, unit: [["K","K"],["C","C"]] },
      { id: "V", type: "number", label: "f_volume", gt: 0, initial: 0.024, unit: [["m^3","m^3"],["L","L"]] }
    ], compute: function (v) {
      var T = v.T; if (v.T_unit === "C") T += 273.15;
      var V = v.V; if (v.V_unit === "L") V /= 1000;
      var R = 8.314; var P = v.n * R * T / V;
      return { main: { label: "res_pressure", value: P, unit: "Pa" }, others: [{ label: "res_kpa", value: P / 1000, unit: "kPa" }],
        formula: "P = nRT/V", steps: ["P=" + fmt(P) + " Pa"], assumptions: ["lib_as_ig"] };
    } },
    solve_v: { label: "lib_v_solve_v", fields: [
      { id: "n", type: "number", label: "f_moles", gt: 0, initial: 1 },
      { id: "T", type: "number", label: "f_temp", initial: 293, unit: [["K","K"],["C","C"]] },
      { id: "P", type: "number", label: "f_pressure", gt: 0, initial: 101.325, unit: [["kPa","kPa"],["Pa","Pa"]] }
    ], compute: function (v) {
      var T = v.T; if (v.T_unit === "C") T += 273.15;
      var P = v.P; if (v.P_unit === "kPa") P *= 1000;
      var R = 8.314; var V = v.n * R * T / P;
      return { main: { label: "res_volume", value: V, unit: "m^3" }, formula: "V = nRT/P", steps: ["V=" + fmt(V) + " m^3"], assumptions: ["lib_as_ig"] };
    } },
    solve_t: { label: "lib_v_solve_t", fields: [
      { id: "P", type: "number", label: "f_pressure", gt: 0, initial: 101.325, unit: [["kPa","kPa"],["Pa","Pa"]] },
      { id: "V", type: "number", label: "f_volume", gt: 0, initial: 0.024, unit: [["m^3","m^3"],["L","L"]] },
      { id: "n", type: "number", label: "f_moles", gt: 0, initial: 1 }
    ], compute: function (v) {
      var P = v.P; if (v.P_unit === "kPa") P *= 1000;
      var V = v.V; if (v.V_unit === "L") V /= 1000;
      var R = 8.314; var T = P * V / (v.n * R);
      return { main: { label: "res_temp", value: T, unit: "K" }, formula: "T = PV/nR", steps: ["T=" + fmt(T) + " K"], assumptions: ["lib_as_ig"] };
    } }
  } });
})();
