(function () {
  "use strict";
  var TEKNO = window.TEKNO;
  if (!TEKNO || !TEKNO.registerCalc) return;
  var fmt = TEKNO.fmt;
  var PI = Math.PI;
  var LEN_F = { m: 1, cm: 0.01, mm: 0.001, in: 0.0254, ft: 0.3048 };

  function reg(id, variants) { TEKNO.registerCalc({ id: id, variants: variants }); }

  // Battery runtime
  reg("battery-runtime", { calc: { label: "var_calc", fields: [
    { id: "E", type: "number", label: "f_energy", gt: 0, initial: 100, unit: [["Wh","Wh"],["kWh","kWh"]] },
    { id: "P", type: "number", label: "f_power", gt: 0, initial: 20, unit: [["W","W"],["kW","kW"]] },
    { id: "eta", type: "number", label: "f_eff", gt: 0, initial: 0.9 }
  ], compute: function (v) {
    var E = v.E; if (v.E_unit === "kWh") E *= 1000;
    var P = v.P; if (v.P_unit === "kW") P *= 1000;
    var t = E * v.eta / P;
    return { main: { label: "res_time", value: t, unit: "h" }, formula: "t = E*eta/P", steps: ["t=" + fmt(t) + " h"], assumptions: ["lib_as_bat"] };
  } } });

  // Power factor correction
  reg("pf-correction", { calc: { label: "var_calc", fields: [
    { id: "P", type: "number", label: "f_power", gt: 0, initial: 10, unit: [["kW","kW"],["W","W"]] },
    { id: "pf1", type: "number", label: "f_pf_old", gt: 0, initial: 0.8 },
    { id: "pf2", type: "number", label: "f_pf_new", gt: 0, initial: 0.95 }
  ], compute: function (v) {
    var P = v.P; if (v.P_unit === "W") P /= 1000;
    var Qc = P * (Math.tan(Math.acos(v.pf1)) - Math.tan(Math.acos(v.pf2)));
    return { main: { label: "res_kvar", value: Qc, unit: "kVAR" }, formula: "Qc = P(tan phi1 - tan phi2)", steps: ["Qc=" + fmt(Qc) + " kVAR"], assumptions: ["lib_as_pf"] };
  } } });

  // Transformer
  reg("transformer", { calc: { label: "var_calc", fields: [
    { id: "Vp", type: "number", label: "f_vp", gt: 0, initial: 400 },
    { id: "Vs", type: "number", label: "f_vs", gt: 0, initial: 230 },
    { id: "S", type: "number", label: "f_kva", gt: 0, initial: 10, unit: [["kVA","kVA"],["VA","VA"]] }
  ], compute: function (v) {
    var S = v.S; if (v.S_unit === "VA") S /= 1000;
    var ratio = v.Vp / v.Vs;
    var Ip = S * 1000 / v.Vp; var Is = S * 1000 / v.Vs;
    return { main: { label: "res_ratio", value: ratio, unit: "" }, others: [
      { label: "res_ip", value: Ip, unit: "A" }, { label: "res_is", value: Is, unit: "A" } ],
      formula: "ratio = Vp/Vs ; I = S/V", steps: ["ratio=" + fmt(ratio)], assumptions: ["lib_as_tr"] };
  } } });

  // Motor current (3-phase)
  reg("motor-current", { calc: { label: "var_calc", fields: [
    { id: "P", type: "number", label: "f_power", gt: 0, initial: 5, unit: [["kW","kW"],["W","W"]] },
    { id: "V", type: "number", label: "f_voltage", gt: 0, initial: 400 },
    { id: "pf", type: "number", label: "f_pf", gt: 0, initial: 0.85 },
    { id: "eff", type: "number", label: "f_eff", gt: 0, initial: 0.9 }
  ], compute: function (v) {
    var P = v.P; if (v.P_unit === "W") P /= 1000;
    var I = P * 1000 / (Math.sqrt(3) * v.V * v.pf * v.eff);
    return { main: { label: "res_current", value: I, unit: "A" }, formula: "I = P/(sqrt3 V pf eta)", steps: ["I=" + fmt(I) + " A"], assumptions: ["lib_as_mc"] };
  } } });

  // Generator size
  reg("generator-size", { calc: { label: "var_calc", fields: [
    { id: "P", type: "number", label: "f_load", gt: 0, initial: 50, unit: [["kW","kW"],["W","W"]] },
    { id: "sf", type: "number", label: "f_safety", gt: 0, initial: 1.25 }
  ], compute: function (v) {
    var P = v.P; if (v.P_unit === "W") P /= 1000;
    var S = P * v.sf;
    return { main: { label: "res_genset", value: S, unit: "kVA (approx)" }, formula: "S = P*sf", steps: ["S=" + fmt(S)], assumptions: ["lib_as_gen"] };
  } } });

  // Battery bank size
  reg("battery-bank", { calc: { label: "var_calc", fields: [
    { id: "E", type: "number", label: "f_daily", gt: 0, initial: 5, unit: [["kWh","kWh"],["Wh","Wh"]] },
    { id: "V", type: "number", label: "f_voltage", gt: 0, initial: 48 },
    { id: "dod", type: "number", label: "f_dod", gt: 0, initial: 0.5 },
    { id: "eta", type: "number", label: "f_eff", gt: 0, initial: 0.9 },
    { id: "days", type: "number", label: "f_autonomy", gt: 0, initial: 1 }
  ], compute: function (v) {
    var E = v.E; if (v.E_unit === "Wh") E /= 1000;
    var Ah = E * v.days * 1000 / (v.V * v.dod * v.eta);
    return { main: { label: "res_ah", value: Ah, unit: "Ah" }, formula: "Ah = E*days/(V*DoD*eta)", steps: ["Ah=" + fmt(Ah)], assumptions: ["lib_as_bb"] };
  } } });

  // Cable resistance
  reg("cable-resistance", { calc: { label: "var_calc", fields: [
    { id: "rho", type: "number", label: "f_rho", gt: 0, initial: 0.0175, unit: [["ohm*mm2/m","ohm*mm2/m"]] },
    { id: "L", type: "number", label: "f_length", gt: 0, initial: 100, unit: [["m","m"],["km","km"]] },
    { id: "A", type: "number", label: "f_area", gt: 0, initial: 10, unit: [["mm2","mm2"]] }
  ], compute: function (v) {
    var L = v.L; if (v.L_unit === "km") L *= 1000;
    var R = v.rho * L / v.A;
    return { main: { label: "res_R", value: R, unit: "ohm" }, formula: "R = rho*L/A", steps: ["R=" + fmt(R) + " ohm"], assumptions: ["lib_as_cr"] };
  } } });

  // Heating load (simplified)
  reg("heating-load", { calc: { label: "var_calc", fields: [
    { id: "U", type: "number", label: "f_u", gt: 0, initial: 0.5 },
    { id: "A", type: "number", label: "f_area", gt: 0, initial: 100 },
    { id: "dT", type: "number", label: "f_dT", initial: 20 }
  ], compute: function (v) {
    var Q = v.U * v.A * v.dT;
    return { main: { label: "res_heat", value: Q, unit: "W" }, others: [{ label: "res_kw", value: Q / 1000, unit: "kW" }],
      formula: "Q = U*A*dT", steps: ["Q=" + fmt(Q) + " W"], assumptions: ["lib_as_hl"] };
  } } });

  // Cooling load (simplified)
  reg("cooling-load", { calc: { label: "var_calc", fields: [
    { id: "Qs", type: "number", label: "f_sensible", ge: 0, initial: 5000, unit: [["W","W"],["kW","kW"]] },
    { id: "Ql", type: "number", label: "f_latent", ge: 0, initial: 1000, unit: [["W","W"],["kW","kW"]] }
  ], compute: function (v) {
    var Qs = v.Qs; if (v.Qs_unit === "kW") Qs *= 1000;
    var Ql = v.Ql; if (v.Ql_unit === "kW") Ql *= 1000;
    var Qt = Qs + Ql;
    return { main: { label: "res_total", value: Qt, unit: "W" }, others: [{ label: "res_kw", value: Qt / 1000, unit: "kW" }, { label: "res_tr", value: Qt / 3516.85, unit: "TR" }],
      formula: "Qt = Qs + Ql", steps: ["Qt=" + fmt(Qt) + " W"], assumptions: ["lib_as_cl"] };
  } } });

  // Airflow & duct size (equal friction simplified)
  reg("duct-size", { calc: { label: "var_calc", fields: [
    { id: "Q", type: "number", label: "f_flow", gt: 0, initial: 0.5, unit: [["m^3/s","m^3/s"],["cfm","cfm"]] },
    { id: "v", type: "number", label: "f_velocity", gt: 0, initial: 8, unit: [["m/s","m/s"],["ft/s","ft/s"]] }
  ], compute: function (v) {
    var Q = v.Q; if (v.Q_unit === "cfm") Q *= 0.000471947;
    var vel = v.v; if (v.v_unit === "ft/s") vel *= 0.3048;
    var A = Q / vel;
    var D = Math.sqrt(4 * A / PI);
    return { main: { label: "res_duct", value: D, unit: "m" }, others: [{ label: "res_area", value: A, unit: "m^2" }],
      formula: "A = Q/v ; D = sqrt(4A/pi)", steps: ["D=" + fmt(D) + " m"], assumptions: ["lib_as_duct"] };
  } } });

  // Dew point (Magnus)
  reg("dew-point", { calc: { label: "var_calc", fields: [
    { id: "T", type: "number", label: "f_temp", initial: 25, unit: [["C","C"]] },
    { id: "RH", type: "number", label: "f_rh", gt: 0, initial: 60 }
  ], compute: function (v) {
    var a = 17.27; var b = 237.7;
    var alpha = (a * v.T) / (b + v.T) + Math.log(v.RH / 100);
    var dp = (b * alpha) / (a - alpha);
    return { main: { label: "res_dp", value: dp, unit: "C" }, formula: "Magnus dew point", steps: ["dp=" + fmt(dp) + " C"], assumptions: ["lib_as_dp"] };
  } } });

  // Psychrometric humidity ratio
  reg("psychrometric", { calc: { label: "var_calc", fields: [
    { id: "T", type: "number", label: "f_temp", initial: 25, unit: [["C","C"]] },
    { id: "RH", type: "number", label: "f_rh", gt: 0, initial: 60 },
    { id: "P", type: "number", label: "f_pressure", gt: 0, initial: 101.325, unit: [["kPa","kPa"]] }
  ], compute: function (v) {
    var P = v.P; if (v.P_unit === "kPa") P *= 1000;
    var Ps = 610.78 * Math.exp((17.27 * v.T) / (v.T + 237.3));
    var Pv = (v.RH / 100) * Ps;
    var W = 0.622 * Pv / (P - Pv);
    var h = 1.006 * v.T + W * (2501 + 1.86 * v.T);
    return { main: { label: "res_w", value: W, unit: "kg/kg" }, others: [{ label: "res_h", value: h, unit: "kJ/kg" }],
      formula: "W = 0.622 Pv/(P-Pv)", steps: ["W=" + fmt(W)], assumptions: ["lib_as_psych"] };
  } } });

  // Fan power
  reg("fan-power", { calc: { label: "var_calc", fields: [
    { id: "Q", type: "number", label: "f_flow", gt: 0, initial: 1, unit: [["m^3/s","m^3/s"],["cfm","cfm"]] },
    { id: "dp", type: "number", label: "f_dp", gt: 0, initial: 500, unit: [["Pa","Pa"]] },
    { id: "eta", type: "number", label: "f_eff", gt: 0, initial: 0.7 }
  ], compute: function (v) {
    var Q = v.Q; if (v.Q_unit === "cfm") Q *= 0.000471947;
    var P = Q * v.dp / v.eta;
    return { main: { label: "res_power", value: P, unit: "W" }, others: [{ label: "res_kw", value: P / 1000, unit: "kW" }],
      formula: "P = Q*dp/eta", steps: ["P=" + fmt(P) + " W"], assumptions: ["lib_as_fan"] };
  } } });

  // Boiler size
  reg("boiler-size", { calc: { label: "var_calc", fields: [
    { id: "Q", type: "number", label: "f_load", gt: 0, initial: 50, unit: [["kW","kW"],["W","W"]] },
    { id: "sf", type: "number", label: "f_safety", gt: 0, initial: 1.15 }
  ], compute: function (v) {
    var Q = v.Q; if (v.Q_unit === "W") Q /= 1000;
    var S = Q * v.sf;
    return { main: { label: "res_boiler", value: S, unit: "kW" }, formula: "S = Q*sf", steps: ["S=" + fmt(S) + " kW"], assumptions: ["lib_as_boil"] };
  } } });

  // Capacitors series/parallel
  reg("capacitors", { calc: { label: "var_calc", fields: [
    { id: "C1", type: "number", label: "f_c1", gt: 0, initial: 10, unit: [["uF","uF"]] },
    { id: "C2", type: "number", label: "f_c2", gt: 0, initial: 20, unit: [["uF","uF"]] },
    { id: "mode", type: "select", label: "f_mode", options: [["series","series"],["parallel","parallel"]] }
  ], compute: function (v) {
    var Ceq = (v.mode === "series") ? (v.C1 * v.C2) / (v.C1 + v.C2) : (v.C1 + v.C2);
    return { main: { label: "res_ceq", value: Ceq, unit: "uF" }, formula: v.mode === "series" ? "1/Ceq = 1/C1 + 1/C2" : "Ceq = C1 + C2", steps: ["Ceq=" + fmt(Ceq) + " uF"], assumptions: ["lib_as_cap"] };
  } } });

  // Solar panel array size
  reg("solar-array", { calc: { label: "var_calc", fields: [
    { id: "E", type: "number", label: "f_daily", gt: 0, initial: 10, unit: [["kWh","kWh"],["Wh","Wh"]] },
    { id: "PSH", type: "number", label: "f_psh", gt: 0, initial: 5 },
    { id: "PR", type: "number", label: "f_pr", gt: 0, initial: 0.75 },
    { id: "Pp", type: "number", label: "f_panel", gt: 0, initial: 0.4, unit: [["kW","kW"]] }
  ], compute: function (v) {
    var E = v.E; if (v.E_unit === "Wh") E /= 1000;
    var Pdc = E / (v.PSH * v.PR);
    var n = Math.ceil(Pdc / v.Pp);
    return { main: { label: "res_panels", value: n, unit: "panels" }, others: [{ label: "res_kwp", value: Pdc, unit: "kWp" }],
      formula: "Pdc = E/(PSH*PR)", steps: ["panels=" + n], assumptions: ["lib_as_sol"] };
  } } });

  // Hydraulic cylinder force
  reg("hyd-cylinder", { calc: { label: "var_calc", fields: [
    { id: "p", type: "number", label: "f_pressure", gt: 0, initial: 10, unit: [["MPa","MPa"],["bar","bar"],["psi","psi"]] },
    { id: "D", type: "number", label: "f_bore", gt: 0, initial: 50, unit: [["mm","mm"],["in","in"]] },
    { id: "d", type: "number", label: "f_rod", gt: 0, initial: 25, unit: [["mm","mm"],["in","in"]] }
  ], compute: function (v) {
    var p = v.p; if (v.p_unit === "bar") p *= 1e5; if (v.p_unit === "MPa") p *= 1e6; if (v.p_unit === "psi") p *= 6894.76;
    var D = v.D * (v.D_unit === "in" ? 0.0254 : 0.001);
    var d = v.d * (v.d_unit === "in" ? 0.0254 : 0.001);
    var Ae = PI * D * D / 4; var Ar = PI * d * d / 4;
    var Fext = p * Ae; var Fret = p * (Ae - Ar);
    return { main: { label: "res_fext", value: Fext, unit: "N" }, others: [{ label: "res_fret", value: Fret, unit: "N" }],
      formula: "F = p*A", steps: ["Fext=" + fmt(Fext) + " N"], assumptions: ["lib_as_hyd"] };
  } } });

  // Pneumatic cylinder force
  reg("pneu-cylinder", { calc: { label: "var_calc", fields: [
    { id: "p", type: "number", label: "f_pressure", gt: 0, initial: 6, unit: [["bar","bar"],["psi","psi"]] },
    { id: "D", type: "number", label: "f_bore", gt: 0, initial: 50, unit: [["mm","mm"],["in","in"]] },
    { id: "eta", type: "number", label: "f_eff", gt: 0, initial: 0.85 }
  ], compute: function (v) {
    var p = v.p; if (v.p_unit === "bar") p *= 1e5; if (v.p_unit === "psi") p *= 6894.76;
    var D = v.D * (v.D_unit === "in" ? 0.0254 : 0.001);
    var A = PI * D * D / 4;
    var F = p * A * v.eta;
    return { main: { label: "res_force", value: F, unit: "N" }, formula: "F = p*A*eta", steps: ["F=" + fmt(F) + " N"], assumptions: ["lib_as_pneu"] };
  } } });

  // Valve Cv
  reg("valve-cv", { calc: { label: "var_calc", fields: [
    { id: "Q", type: "number", label: "f_flow", gt: 0, initial: 10, unit: [["gpm","gpm"],["m^3/h","m^3/h"]] },
    { id: "SG", type: "number", label: "f_sg", gt: 0, initial: 1 },
    { id: "dp", type: "number", label: "f_dp", gt: 0, initial: 5, unit: [["psi","psi"],["bar","bar"]] }
  ], compute: function (v) {
    var Q = v.Q; if (v.Q_unit === "m^3/h") Q *= 4.40287;
    var dp = v.dp; if (v.dp_unit === "bar") dp *= 14.5038;
    var Cv = Q * Math.sqrt(v.SG / dp);
    return { main: { label: "res_cv", value: Cv, unit: "Cv" }, formula: "Cv = Q*sqrt(SG/dp)", steps: ["Cv=" + fmt(Cv)], assumptions: ["lib_as_cv"] };
  } } });

  // Tank fill/drain time
  reg("tank-fill-time", { calc: { label: "var_calc", fields: [
    { id: "V", type: "number", label: "f_volume", gt: 0, initial: 1, unit: [["m^3","m^3"],["L","L"]] },
    { id: "Q", type: "number", label: "f_flow", gt: 0, initial: 10, unit: [["L/min","L/min"],["m^3/h","m^3/h"]] }
  ], compute: function (v) {
    var V = v.V; if (v.V_unit === "L") V /= 1000;
    var Q = v.Q; if (v.Q_unit === "L/min") Q /= 60000; if (v.Q_unit === "m^3/h") Q /= 3600;
    var t = V / Q;
    return { main: { label: "res_time", value: t, unit: "s" }, others: [{ label: "res_min", value: t / 60, unit: "min" }],
      formula: "t = V/Q", steps: ["t=" + fmt(t) + " s"], assumptions: ["lib_as_fill"] };
  } } });

  // Resistor colour code (value from bands) - simplified: compute from 4 bands
  reg("resistor-colour", { calc: { label: "var_calc", fields: [
    { id: "b1", type: "number", label: "f_band1", ge: 0, initial: 1 },
    { id: "b2", type: "number", label: "f_band2", ge: 0, initial: 0 },
    { id: "mult", type: "number", label: "f_mult", ge: 0, initial: 2 },
    { id: "tol", type: "number", label: "f_tol", ge: 0, initial: 5 }
  ], compute: function (v) {
    var val = (v.b1 * 10 + v.b2) * Math.pow(10, v.mult);
    return { main: { label: "res_value", value: val, unit: "ohm" }, others: [{ label: "res_tol", value: v.tol, unit: "%" }],
      formula: "R = (10*b1+b2)*10^mult", steps: ["R=" + fmt(val) + " ohm"], assumptions: ["lib_as_rc"] };
  } } });

})();
