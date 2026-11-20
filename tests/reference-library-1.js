// Reference checks for calculator library batch 1 (js/calc-library-1.js).
// Expected values are worked out from the governing equations, independently of the code.
// Usage: node tests/reference-library-1.js
const fs = require('fs');
const path = require('path');
const defs = {};
global.window = { TEKNO: { fmt: (x) => String(x), registerCalc: (d) => { defs[d.id] = d; } } };
eval(fs.readFileSync(path.join(__dirname, '..', 'js', 'calc-library-1.js'), 'utf8'));

let pass = 0, fail = 0;
function near(name, got, want, relTol = 1e-4) {
  const ok = typeof got === 'number' && Math.abs(got - want) <= relTol * Math.max(Math.abs(want), 1e-12);
  ok ? pass++ : fail++;
  if (!ok) console.log('FAIL', name, 'got', got, 'want', want);
}
function isErr(name, out, key) {
  const ok = out && out.error === key;
  ok ? pass++ : fail++;
  if (!ok) console.log('FAIL', name, 'expected error', key, 'got', JSON.stringify(out));
}
const run = (id, variant, v) => defs[id].variants[variant].compute(v);

// ---- Ohm's law (reference: V = I·R, P = V·I) ----
near('ohm find V: 3 A, 4 Ω → 12 V', run('ohms-law', 'find_v', { current: 3, resistance: 4 }).main.value, 12);
near('ohm find V: power 36 W', run('ohms-law', 'find_v', { current: 3, resistance: 4 }).others[0].value, 36);
near('ohm find I: 12 V, 4 Ω → 3 A', run('ohms-law', 'find_i', { voltage: 12, resistance: 4 }).main.value, 3);
near('ohm find R: 12 V, 3 A → 4 Ω', run('ohms-law', 'find_r', { voltage: 12, current: 3 }).main.value, 4);
near('ohm edge: zero current gives zero volts', run('ohms-law', 'find_v', { current: 0, resistance: 4 }).main.value, 0);
near('ohm edge: 230 V, 10 Ω → 23 A', run('ohms-law', 'find_i', { voltage: 230, resistance: 10 }).main.value, 23);

// ---- Resistors in series and parallel ----
near('series 100+220+330 = 650 Ω', run('resistors-series-parallel', 'series', { r1: 100, r2: 220, r3: 330 }).main.value, 650);
near('parallel 100‖220‖330 = 56.8966 Ω', run('resistors-series-parallel', 'parallel', { r1: 100, r2: 220, r3: 330 }).main.value, 56.89655172, 1e-6);
near('parallel three equal 100 Ω = 33.333 Ω', run('resistors-series-parallel', 'parallel', { r1: 100, r2: 100, r3: 100 }).main.value, 100 / 3);
near('parallel is below smallest branch', run('resistors-series-parallel', 'parallel', { r1: 10, r2: 1000, r3: 1000 }).main.value < 10 ? 1 : 0, 1);

// ---- LED resistor (reference: R = (Vs − Vf) ÷ If, P = (Vs − Vf)·If) ----
const led1 = run('led-resistor', 'default', { vs: 5, vf: 2.0, ima: 20 });
near('LED 5 V, 2.0 V, 20 mA → 150 Ω', led1.main.value, 150);
near('LED power 0.06 W', led1.others[0].value, 0.06);
near('LED nearest E12 for 150 Ω is 150 Ω', led1.others[1].value, 150);
near('LED 12 V, 2.0 V, 20 mA → 500 Ω', run('led-resistor', 'default', { vs: 12, vf: 2.0, ima: 20 }).main.value, 500);
near('LED nearest E12 for 500 Ω is 470 Ω', run('led-resistor', 'default', { vs: 12, vf: 2.0, ima: 20 }).others[1].value, 470);
near('LED nearest E12 for 200 Ω is 220 Ω', run('led-resistor', 'default', { vs: 9, vf: 3.0, ima: 30 }).others[1].value, 220);
isErr('LED supply below forward voltage is rejected', run('led-resistor', 'default', { vs: 2, vf: 3, ima: 20 }), 'lib_err_led');

// ---- Reynolds number (reference: Re = ρ·v·D / μ) ----
const re1 = run('reynolds-number', 'default', { velocity: 1, diameter: 50, dunit: 'mm', density: 998.2, viscosity: 1.002, vunit: 'mPa.s' });
near('Re water 1 m/s, 50 mm → 49 810', re1.main.value, 49810.18, 1e-4);
near('velocity at Re = 2300 ≈ 0.04618 m/s', re1.others[0].value, 0.046176, 1e-4);
const re2 = run('reynolds-number', 'default', { velocity: 0.01, diameter: 50, dunit: 'mm', density: 998.2, viscosity: 1.002, vunit: 'mPa.s' });
near('Re at 0.01 m/s is 498.1 (laminar)', re2.main.value, 498.1, 1e-4);
near('Re with Pa·s viscosity matches mPa·s', run('reynolds-number', 'default', { velocity: 1, diameter: 0.05, dunit: 'm', density: 998.2, viscosity: 0.001002, vunit: 'Pa.s' }).main.value, 49810.18, 1e-4);

// ---- Moment of inertia (reference: rect bh³/12; hollow rect; πd⁴/64; π(D⁴−d⁴)/64) ----
near('I solid rect 100×200 mm = 66 666 667 mm⁴', run('moment-of-inertia', 'rect', { b: 100, h: 200, unit: 'mm' }).main.value, 66666666.67, 1e-6);
near('I hollow rect 100×200, t=10 mm = 27 786 667 mm⁴', run('moment-of-inertia', 'hrect', { b: 100, h: 200, t: 10, unit: 'mm' }).main.value, 27786666.67, 1e-6);
near('I solid circle d=100 mm = 4 908 738.5 mm⁴', run('moment-of-inertia', 'circle', { d: 100, unit: 'mm' }).main.value, 4908738.52, 1e-6);
near('I hollow circle 100/80 mm = 2 898 119 mm⁴', run('moment-of-inertia', 'hcircle', { D: 100, d: 80, unit: 'mm' }).main.value, 2898119.2, 1e-6);
near('I rect 100×200 mm in m⁴ = 6.6667e-5', run('moment-of-inertia', 'rect', { b: 100, h: 200, unit: 'mm' }).others[0].value, 6.666666667e-5, 1e-6);
near('I rect 10×20 cm = 6666.67 cm⁴', run('moment-of-inertia', 'rect', { b: 10, h: 20, unit: 'cm' }).main.value, 6666.667, 1e-6);
isErr('hollow rect with wall too thick is rejected', run('moment-of-inertia', 'hrect', { b: 100, h: 200, t: 100, unit: 'mm' }), 'lib_err_wall');
isErr('hollow circle with inner ≥ outer is rejected', run('moment-of-inertia', 'hcircle', { D: 80, d: 100, unit: 'mm' }), 'lib_err_inner');

// ---- Beam deflection (reference: 5wL⁴/384EI and PL³/48EI, simply supported) ----
const bU = run('beam-deflection', 'udl', { L: 6, w: 10, E: 200, I: 80000000, iunit: 'mm4' });
near('UDL 6 m, 10 kN/m, 200 GPa, 8e7 mm⁴ → 10.547 mm', bU.main.value, 10.546875, 1e-4);
near('UDL allowable L/360 = 16.667 mm', bU.others[0].value, 16.6667, 1e-4);
near('UDL span ratio ≈ 569', bU.others[1].value, 568.9, 1e-3);
near('Point 6 m, 20 kN, same section → 5.625 mm', run('beam-deflection', 'point', { L: 6, P: 20, E: 200, I: 80000000, iunit: 'mm4' }).main.value, 5.625, 1e-6);
near('UDL with I in m⁴ matches mm⁴ (8e-5 m⁴)', run('beam-deflection', 'udl', { L: 6, w: 10, E: 200, I: 0.00008, iunit: 'm4' }).main.value, 10.546875, 1e-4);
near('Zero load gives zero deflection', run('beam-deflection', 'point', { L: 6, P: 0, E: 200, I: 80000000, iunit: 'mm4' }).main.value, 0);

// ---- Tank volume (reference: π·D²/4·H, L·W·H) ----
near('cylinder D 2 m, H 3 m → 9.42478 m³', run('tank-volume', 'cyl', { D: 2, H: 3, unit: 'm' }).main.value, 9.42477796, 1e-6);
near('cylinder in litres = 9424.78 L', run('tank-volume', 'cyl', { D: 2, H: 3, unit: 'm' }).others[0].value, 9424.77796, 1e-6);
near('cylinder in US gallons ≈ 2489.6', run('tank-volume', 'cyl', { D: 2, H: 3, unit: 'm' }).others[1].value, 2489.6, 1e-3);
near('cylinder 200 × 300 cm (unit test) = 9.42478 m³', run('tank-volume', 'cyl', { D: 200, H: 300, unit: 'cm' }).main.value, 9.42477796, 1e-6);
near('rectangular 2 × 3 × 1.5 m = 9 m³', run('tank-volume', 'rect', { L: 2, W: 3, H: 1.5, unit: 'm' }).main.value, 9);
near('rectangular in mm: 2000 × 3000 × 1500 mm = 9 m³', run('tank-volume', 'rect', { L: 2000, W: 3000, H: 1500, unit: 'mm' }).main.value, 9, 1e-9);

// ---- Thermal expansion (reference: ΔL = α·L0·ΔT) ----
const tS = run('thermal-expansion', 'default', { material: 'steel', L0: 10, T1: 20, T2: 120 });
near('steel 10 m, 100 K → 12 mm', tS.main.value, 12);
near('steel final length 10.012 m', tS.others[0].value, 10.012);
near('aluminium 10 m, 50 K → 11.5 mm', run('thermal-expansion', 'default', { material: 'aluminium', L0: 10, T1: 20, T2: 70 }).main.value, 11.5);
near('copper 5 m, 40 K → 3.3 mm', run('thermal-expansion', 'default', { material: 'copper', L0: 5, T1: 20, T2: 60 }).main.value, 3.3);
near('cooling gives negative change (−12 mm)', run('thermal-expansion', 'default', { material: 'steel', L0: 10, T1: 120, T2: 20 }).main.value, -12);

console.log(`PASS ${pass}  FAIL ${fail}`);
process.exitCode = fail ? 1 : 0;
