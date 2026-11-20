const fs = require('fs');
const p = 'C:\\Users\\HP\\Desktop\\Tekno project\\tekno\\js';
const files = fs.readdirSync(p).filter(f => f.endsWith('.js'));
const keys = new Set();
files.forEach(f => {
  const s = fs.readFileSync(p + '\\' + f, 'utf8');
  const re = /(\w+):\s*\[/g; let m;
  while ((m = re.exec(s))) keys.add(m[1]);
});
console.log('total keys:', keys.size);
const targets = ['calc_generator_size_title','calc_generator_size_desc','calc_generator_size_about','calc_cooling_load_title','calc_cooling_load_desc','calc_cooling_load_about','calc_motor_current_title','calc_motor_current_desc','calc_motor_current_about','calc_solar_array_title','calc_solar_array_desc','calc_solar_array_about'];
targets.forEach(k => console.log(k, keys.has(k) ? 'OK' : 'MISSING'));