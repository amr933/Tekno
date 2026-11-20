const fs = require('fs');
const vm = require('vm');

// Load the translation library and extract keys via a sandbox
const libSrc = fs.readFileSync('js/translations-library-3.js', 'utf8');

// Create a sandbox with window.TEKNO
const sandbox = { window: { TEKNO: { keys: {} } } };
vm.createContext(sandbox);

// The library is an IIFE. We execute it directly in the context.
// It modifies window.TEKNO.keys
vm.runInContext(libSrc, sandbox);
const keys = sandbox.window.TEKNO.keys;

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

const keyMap = {
  'voltage-drop.html': 'voltage_drop',
  'motor-current.html': 'motor_current',
  'concrete.html': 'concrete',
  'steel.html': 'steel_weight',
  'cooling-load.html': 'cooling_load',
  'pump.html': 'pump',
  'unit-converter.html': 'unit_converter',
  'generator-size.html': 'generator_size',
  'solar-array.html': 'solar_array',
  'beam-deflection.html': 'beam_deflection'
};

let allOk = true;

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const basename = f.split('/').pop();
  const keyBase = keyMap[basename];
  const faqKey = `calc_${keyBase}_faq`;

  // Extract JSON-LD
  const jsonLdMatch = content.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (!jsonLdMatch) {
    console.log(f, 'NO JSON-LD');
    allOk = false;
    return;
  }

  let jsonLd;
  try {
    jsonLd = JSON.parse(jsonLdMatch[1].trim());
  } catch (e) {
    console.log(f, 'INVALID JSON-LD:', e.message);
    allOk = false;
    return;
  }

  if (jsonLd['@type'] !== 'FAQPage') {
    console.log(f, 'WRONG TYPE:', jsonLd['@type']);
    allOk = false;
    return;
  }

  const jsonQuestions = jsonLd.mainEntity.map(q => q.name);

  // Get FAQ HTML from library keys
  const faqEntry = keys[faqKey];
  if (!faqEntry) {
    console.log(f, `FAQ key "${faqKey}" NOT FOUND in library. Available keys:`, Object.keys(keys).filter(k => k.includes('faq')).join(', '));
    allOk = false;
    return;
  }

  const enFaqHtml = faqEntry[0];
  const arFaqHtml = faqEntry[1];

  // Extract <dt> texts from EN FAQ HTML
  const enDtMatches = enFaqHtml.match(/<dt>([\s\S]*?)<\/dt>/g);
  const enQuestions = enDtMatches ? enDtMatches.map(s => s.replace(/<\/?dt>/g, '').trim()) : [];

  // Compare with JSON-LD
  const matchCount = jsonQuestions.filter((q, i) => q === enQuestions[i]).length;
  const total = Math.max(jsonQuestions.length, enQuestions.length);

  if (matchCount === total && total > 0) {
    console.log(f, 'FAQ MATCH:', matchCount, '/', total, 'questions');
  } else {
    console.log(f, 'FAQ MISMATCH:', matchCount, '/', total);
    console.log('  JSON-LD:', JSON.stringify(jsonQuestions));
    console.log('  Visible:', JSON.stringify(enQuestions));
    allOk = false;
  }

  // Check Arabic FAQ exists and is different
  if (arFaqHtml === enFaqHtml) {
    console.log(f, 'AR FAQ SAME AS EN');
    allOk = false;
  } else {
    const arDtMatches = arFaqHtml.match(/<dt>([\s\S]*?)<\/dt>/g);
    const arQuestions = arDtMatches ? arDtMatches.map(s => s.replace(/<\/?dt>/g, '').trim()) : [];
    console.log(f, 'AR FAQ:', arQuestions.length, 'questions OK');
  }
});

console.log('\n' + (allOk ? 'ALL FAQ MATCHES VERIFIED' : 'SOME CHECKS FAILED'));