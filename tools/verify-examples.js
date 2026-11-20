// Verify worked-example outputs against the real calculator code.
const fs = require('fs');
const path = require('path');
const defs = {};
global.window = { TEKNO: { fmt: x => String(x), t: x => x, registerCalc: d => { defs[d.id] = d; } } };
eval(fs.readFileSync(path.join(__dirname, '..', 'js', 'calculators.js'), 'utf8'));
['calc-library-1.js','calc-library-2.js','calc-library-3.js','calc-library-4.js'].forEach(f => {
  eval(fs.readFileSync(path.join(__dirname, '..', 'js', f), 'utf8'));
});
const run = (id, variant, v) => defs[id].variants[variant].compute(v);

console.log('--- voltage-drop three-phase (V=400,I=32,L=50,A=6,cu,pf=0.85,x=0.08) ---');
console.log(JSON.stringify(run('voltage-drop','three',{voltage:400,current:32,distance:50,area:6,material:'cu',pf:0.85,reactance:0.08}), null, 1));

console.log('--- motor-current (P=5kW,V=400,pf=0.85,eff=0.9) ---');
console.log(JSON.stringify(run('motor-current','calc',{P:5,P_unit:'kW',V:400,pf:0.85,eff:0.9}), null, 1));

console.log('--- concrete (3,2,0.2,m) ---');
console.log(JSON.stringify(run('concrete','default',{length:3,width:2,height:0.2,unit:'m'}), null, 1));

console.log('--- steel-weight (d=16,L=12) ---');
console.log(JSON.stringify(run('steel-weight','default',{diameter:16,length:12}), null, 1));

console.log('--- cooling-load (Qs=5kW,Ql=1kW) ---');
console.log(JSON.stringify(run('cooling-load','calc',{Qs:5,Qs_unit:'kW',Ql:1,Ql_unit:'kW'}), null, 1));

console.log('--- pump power (10 L/s, 30m, 1000, 75) ---');
console.log(JSON.stringify(run('pump','power',{flow:10,flowUnit:'L/s',head:30,density:1000,eff:75}), null, 1));

console.log('--- unit-converter length 1 ft->m ---');
console.log(JSON.stringify(run('unit-converter','length',{value:1,from:'ft',to:'m'}), null, 1));

console.log('--- generator-size (50kW, sf=1.25) ---');
console.log(JSON.stringify(run('generator-size','calc',{P:50,P_unit:'kW',sf:1.25}), null, 1));

console.log('--- solar-array (10kWh, PSH=5, PR=0.75, Pp=0.4kW) ---');
console.log(JSON.stringify(run('solar-array','calc',{E:10,E_unit:'kWh',PSH:5,PR:0.75,Pp:0.4,P_unit:'kW'}), null, 1));

console.log('--- beam-deflection udl (L=6,w=10,E=200,I=8e7 mm4) ---');
console.log(JSON.stringify(run('beam-deflection','udl',{L:6,w:10,E:200,I:80000000,iunit:'mm4'}), null, 1));