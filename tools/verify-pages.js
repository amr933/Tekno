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
  const hasHow = content.includes('data-i18n="how_heading"');
  const hasExample = content.includes('data-i18n="example_heading"');
  const hasFaq = content.includes('data-i18n="faq_heading"');
  const hasJsonLd = content.includes('"@type": "FAQPage"');
  const hasTransLib3 = content.includes('translations-library-3.js');
  console.log(f, 'How:', hasHow, 'Example:', hasExample, 'FAQ:', hasFaq, 'JSON-LD:', hasJsonLd, 'Lib3:', hasTransLib3);
});