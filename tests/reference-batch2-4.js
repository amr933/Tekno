// Reference checks for calculator library batches 2-4.
const fs = require('fs');
const path = require('path');
const defs = {};
global.window = { TEKNO: { fmt: (x) => String(x), lang: 'en', registerCalc: (d) => { defs[d.id] = d; } } };
for (const f of ['calc-library-1.js','calc-library-2.js','calc-library-3.js','calc-library-4.js']) {
  eval(fs.readFileSync(path.join(__dirname, '..', 'js', f), 'utf8'));
}
let pass = 0, fail = 0;
function near(name, got, want, relTol = 1e-4) {
  const ok = typeof got === 'number' && Math.abs(got - want) <= relTol * Math.max(Math.abs(want), 1e-12);
  ok ? pass++ : fail++;
  if (!ok) console.log('FAIL', name, 'got', got, 'want', want);
}
const run = (id, variant, v) => defs[id].variants[variant].compute(v);

near('bending stress', run('bending-stress','calc',{M:10,c:0.1,I:0.0001}).main.value, 10000);
near('section modulus', run('section-modulus','calc',{I:0.0001,c:0.1}).main.value, 0.001);
near('column buckling', run('column-buckling','calc',{E:200,E_unit:'GPa',I:0.0001,I_unit:'m^4',L:3,L_unit:'m',K:1}).main.value, 21932454.22, 1e-2);
near('pipe flow', run('pipe-flow','calc',{v:2,d:0.1}).main.value, 0.015708, 1e-4);
near('ideal gas P', run('ideal-gas','solve_p',{n:1,T:293,T_unit:'K',V:0.024,V_unit:'m^3'}).main.value, 101500, 1e-2);
near('heat conduction', run('heat-conduction','calc',{k:0.5,A:1,dT:20,L:0.1}).main.value, 100);

near('motor current', run('motor-current','calc',{P:5,P_unit:'kW',V:400,pf:0.85,eff:0.9}).main.value, 9.43, 1e-2);
near('fan power', run('fan-power','calc',{Q:1,Q_unit:'m^3/s',dp:500,eta:0.7}).main.value, 714.29, 1e-2);
near('solar panels', run('solar-array','calc',{E:10,E_unit:'kWh',PSH:5,PR:0.75,Pp:0.4}).main.value, 7);

near('retaining wall Pa', run('retaining-wall','calc',{H:3,gamma:18,phi:30}).main.value, 26.94, 1e-2);
near('stormwater Q', run('stormwater','calc',{C:0.5,i:50,A:2}).main.value, 0.1389, 1e-2);
near('darcy hf', run('darcy-weisbach','calc',{f:0.02,L:100,D:0.1,v:2,rho:1000}).main.value, 4.077, 1e-2);
near('lmtd', run('lmtd','calc',{Thi:90,Tho:60,Tci:30,Tco:50}).main.value, 34.76, 1e-2);
near('welding heat', run('welding-heat','calc',{V:24,I:150,s:5,s_unit:'mm/s'}).main.value, 43.2, 1e-2);
near('cutting rpm', run('cutting-speed','calc',{Vc:100,D:50,D_unit:'mm'}).main.value, 636.62, 1e-2);

console.log('PASS', pass, 'FAIL', fail);
