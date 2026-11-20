const fs = require('fs');
const p = 'C:\\Users\\HP\\Desktop\\Tekno project\\tekno\\js';
const keys = new Set();
['translations.js','translations-library-1.js','translations-library-2.js','translations-ar-batch.js'].forEach(f => {
  const s = fs.readFileSync(p + '\\' + f, 'utf8');
  const re = /(\w+):\s*\[/g; let m;
  while ((m = re.exec(s))) keys.add(m[1]);
});
['calc_electrical_load_title','calc_motor_current_title','calc_area_volume_title','calc_moment_of_inertia_title','calc_hvac_title','calc_heating_load_title','calc_hazen_williams_title','calc_water_velocity_title','calc_battery_bank_title','calc_bending_stress_title','calc_solar_array_title','calc_generator_size_title','calc_pump_title','calc_cooling_load_title','calc_concrete_title','calc_steel_weight_title','calc_voltage_drop_title','calc_unit_converter_title','calc_beam_deflection_title'].forEach(k => console.log(k, keys.has(k) ? 'OK' : 'MISSING'));