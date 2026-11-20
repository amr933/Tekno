const fs = require('fs');
const files = [
  'tools/voltage-drop.html',
  'tools/motor-current.html', 
  'tools/concrete.html',
  'tools/steel.html',
  'tools/cooling-load.html',
  'tools/pump.html',
  'tools/unit-converter.html',
  'tools/generator-size.html',
  'tools/solar-array.html',
  'tools/beam-deflection.html'
];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  // Extract JSON-LD
  const match = content.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (match) {
    try {
      const json = JSON.parse(match[1].trim());
      console.log(f, 'JSON-LD valid:', true, 'type:', json['@type'], 'questions:', json.mainEntity?.length || 0);
    } catch (e) {
      console.log(f, 'JSON-LD valid:', false, 'error:', e.message);
    }
  } else {
    console.log(f, 'JSON-LD: NOT FOUND');
  }
});