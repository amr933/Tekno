// Reference check: runs the real calculator formulas against values computed independently.
// Usage: node tests/reference-check.js
// Independent reference check: loads the real calculators.js, runs compute() for each variant.
const fs = require('fs');
const defs = {};
global.window = { TEKNO: { fmt: x => String(x), t: x => x, registerCalc: d => { defs[d.id] = d; } } };
eval(fs.readFileSync(require('path').join(__dirname, '..', 'js', 'calculators.js'), 'utf8'));
const run = (id, variant, v) => defs[id].variants[variant].compute(v);
let pass = 0, fail = 0;
function check(name, got, want, tol = 1e-3) {
  const ok = typeof got === 'number' ? Math.abs(got - want) <= tol * Math.max(1, Math.abs(want)) : got === want;
  ok ? pass++ : fail++;
  if (!ok) console.log('FAIL', name, 'got', got, 'want', want);
}
const U = (id, cat, value, from, to) => run('unit-converter', cat, { value, from, to }).main.value;
// Unit converter: values from published conversion factors
check('mi->km', U(0, 'length', 1, 'mi', 'km'), 1.609344);
check('ft->m', U(0, 'length', 1, 'ft', 'm'), 0.3048);
check('acre->m2', U(0, 'area', 1, 'acre', 'm²'), 4046.8564224);
check('US gal->m3', U(0, 'volume', 1, 'gal (US)', 'm³'), 0.003785411784);
check('psi->kPa', U(0, 'pressure', 1, 'psi', 'kPa'), 6.894757, 1e-5);
check('kgf/cm2->bar', U(0, 'pressure', 1, 'kgf/cm²', 'bar'), 0.980665, 1e-5);
check('gpm->L/min', U(0, 'flow', 1, 'gpm (US)', 'L/min'), 3.785411784, 1e-5);
check('hp->W', U(0, 'power', 1, 'hp', 'W'), 745.69987, 1e-6);
check('TR->kW', U(0, 'power', 1, 'TR', 'kW'), 3.516852842);
check('lb->kg', U(0, 'weight', 1, 'lb', 'kg'), 0.45359237);
check('short ton->kg', U(0, 'weight', 1, 'short ton', 'kg'), 907.18474);
check('100C->F', U(0, 'temperature', 100, 'C', 'F'), 212);
check('0C->K', U(0, 'temperature', 0, 'C', 'K'), 273.15);
check('-40F->C', U(0, 'temperature', -40, 'F', 'C'), -40);
check('ft3->L', U(0, 'volume', 1, 'ft³', 'L'), 28.316846592, 1e-6);
// Concrete
check('concrete 3x2x0.2', run('concrete', 'default', { length: 3, width: 2, height: 0.2, unit: 'm' }).main.value, 1.2);
check('concrete mm', run('concrete', 'default', { length: 3000, width: 2000, height: 200, unit: 'mm' }).main.value, 1.2);
check('concrete ft', run('concrete', 'default', { length: 10, width: 10, height: 1, unit: 'ft' }).main.value, 100 * 0.3048 * 0.3048 * 0.3048);
// Steel: W = D^2/162 * L
check('steel 16mm 12m', run('steel-weight', 'default', { diameter: 16, length: 12 }).main.value, 256 / 162 * 12);
check('steel 25mm 6m', run('steel-weight', 'default', { diameter: 25, length: 6 }).main.value, 625 / 162 * 6);
check('steel 10mm 1m', run('steel-weight', 'default', { diameter: 10, length: 1 }).main.value, 100 / 162);
// HVAC
check('TR->kW 10', run('hvac', 'tr_kw', { value: 10, unit: 'TR' }).main.value, 35.16852842);
check('kW->TR 100', run('hvac', 'tr_kw', { value: 100, unit: 'kW' }).main.value, 100 / 3.516852842);
check('airflow 100kW dT10', run('hvac', 'airflow', { load: 100, loadUnit: 'kW', dt: 10, dtUnit: 'C' }).main.value, 100 / (1.2 * 1.005 * 10), 1e-3);
check('airflow 10TR dT20F', run('hvac', 'airflow', { load: 10, loadUnit: 'TR', dt: 20, dtUnit: 'F' }).main.value, 35.16852842 / (1.2 * 1.005 * 20 / 1.8), 1e-3);
check('water 100kW dT5', run('hvac', 'water', { load: 100, loadUnit: 'kW', dt: 5, dtUnit: 'C' }).main.value, 100 / (4.186 * 5), 1e-3);
check('water gpm', run('hvac', 'water', { load: 100, loadUnit: 'kW', dt: 5, dtUnit: 'C' }).others[1].value, 100 / (4.186 * 5) * 15.850323, 1e-3);
// Pump: P = rho g Q H
check('pump 10L/s 30m', run('pump', 'power', { flow: 10, flowUnit: 'L/s', head: 30, density: 1000, eff: 75 }).main.value, 1000 * 9.81 * 0.01 * 30 / 1000);
check('pump shaft', run('pump', 'power', { flow: 10, flowUnit: 'L/s', head: 30, density: 1000, eff: 75 }).others[0].value, 1000 * 9.81 * 0.01 * 30 / 1000 / 0.75);
check('pump 10 m3/h 30m', run('pump', 'power', { flow: 10, flowUnit: 'm³/h', head: 30, density: 1000, eff: 100 }).main.value, 1000 * 9.81 * (10 / 3600) * 30 / 1000, 1e-6);
check('pump 300kPa->head', run('pump', 'pressure', { pressure: 300, pUnit: 'kPa', density: 1000 }).main.value, 300000 / (1000 * 9.81), 1e-6);
check('pump 1 bar->m', run('pump', 'pressure', { pressure: 1, pUnit: 'bar', density: 1000 }).main.value, 100000 / 9810, 1e-6);
// Electrical
check('1ph 230V 10A pf.85', run('electrical-load', 'single', { voltage: 230, current: 10, pf: 0.85 }).main.value, 1.955);
check('3ph 400V 20A pf.85', run('electrical-load', 'three', { voltage: 400, current: 20, pf: 0.85 }).main.value, 1.7320508 * 400 * 20 * 0.85 / 1000, 1e-6);
check('3ph kVA', run('electrical-load', 'three', { voltage: 400, current: 20, pf: 0.85 }).others[0].value, 1.7320508 * 400 * 20 / 1000, 1e-6);
check('3ph kvar', run('electrical-load', 'three', { voltage: 400, current: 20, pf: 0.85 }).others[1].value, 1.7320508 * 400 * 20 * Math.sqrt(1 - 0.85 * 0.85) / 1000, 1e-6);
check('current 5kW 400V 3ph pf.85', run('electrical-load', 'current', { power: 5, pUnit: 'kW', voltage: 400, pf: 0.85, phase: 'three' }).main.value, 5000 / (1.7320508 * 400 * 0.85), 1e-6);
check('current 5kW 230V 1ph pf1', run('electrical-load', 'current', { power: 5, pUnit: 'kW', voltage: 230, pf: 1, phase: 'single' }).main.value, 5000 / 230, 1e-6);
// Voltage drop
const r = 0.0172 / 6, x = 0.08 / 1000, sn = Math.sqrt(1 - 0.85 * 0.85);
const z = r * 0.85 + x * sn;
const vd = (three, V, I, L, A, mat, X) => { const rr = (mat === 'cu' ? 0.0172 : 0.0282) / A, xx = X / 1000, zz = rr * 0.85 + xx * sn; return { dv: (three ? Math.sqrt(3) : 2) * I * L * zz, pct: (three ? Math.sqrt(3) : 2) * I * L * zz / V * 100 }; };
check('vd 1ph default', run('voltage-drop', 'single', { voltage: 230, current: 10, distance: 50, area: 6, material: 'cu', pf: 0.85, reactance: 0.08 }).main.value, vd(false, 230, 10, 50, 6, 'cu', 0.08).dv, 1e-6);
check('vd 3ph 400V 32A 50m 6mm cu', run('voltage-drop', 'three', { voltage: 400, current: 32, distance: 50, area: 6, material: 'cu', pf: 0.85, reactance: 0.08 }).main.value, vd(true, 400, 32, 50, 6, 'cu', 0.08).dv, 1e-6);
check('vd 3ph pct', run('voltage-drop', 'three', { voltage: 400, current: 32, distance: 50, area: 6, material: 'cu', pf: 0.85, reactance: 0.08 }).others[0].value, vd(true, 400, 32, 50, 6, 'cu', 0.08).pct, 1e-6);
check('vd alu', run('voltage-drop', 'three', { voltage: 400, current: 50, distance: 100, area: 25, material: 'al', pf: 1, reactance: 0 }).main.value, Math.sqrt(3) * 50 * 100 * 0.0282 / 25, 1e-6);
// Area & volume
check('rect 4x3', run('area-volume', 'rect', { length: 4, width: 3, unit: 'm' }).main.value, 12);
check('rect perim', run('area-volume', 'rect', { length: 4, width: 3, unit: 'm' }).others[0].value, 14);
check('tri 6x4', run('area-volume', 'tri', { base: 6, height: 4, unit: 'm' }).main.value, 12);
check('circle r2', run('area-volume', 'circle', { radius: 2, unit: 'm' }).main.value, 4 * Math.PI);
check('circle circ', run('area-volume', 'circle', { radius: 2, unit: 'm' }).others[0].value, 4 * Math.PI);
console.log('cyl keys:', Object.keys(defs['area-volume'].variants));
const cyl = run('area-volume', 'cyl', { radius: 1, height: 3, unit: 'm' });
console.log('cyl result:', JSON.stringify(cyl.main), JSON.stringify(cyl.others));
const box = run('area-volume', 'box', { length: 2, width: 3, height: 4, unit: 'm' });
console.log('box result:', JSON.stringify(box.main), JSON.stringify(box.others));
check('cyl volume', cyl.main.value, Math.PI * 3);
check('box volume', box.main.value, 24);
console.log(`PASS ${pass}  FAIL ${fail}`);
