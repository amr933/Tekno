const fs = require('fs');

// Check robots.txt
const robots = fs.readFileSync('robots.txt', 'utf8');
console.log('robots.txt:');
console.log(robots);
console.log('---');

// Check for /ar/ paths
const allHtml = fs.readdirSync('tools').filter(f => f.endsWith('.html'));
let hasArPaths = false;
allHtml.forEach(f => {
  const content = fs.readFileSync('tools/' + f, 'utf8');
  if (content.includes('/ar/')) {
    console.log(f, 'contains /ar/ path');
    hasArPaths = true;
  }
});
if (!hasArPaths) {
  console.log('No /ar/ paths found in any tool page');
}

// Check H1 unchanged
const targetTools = ['voltage-drop.html', 'motor-current.html', 'concrete.html', 'steel.html', 'cooling-load.html', 'pump.html', 'unit-converter.html', 'generator-size.html', 'solar-array.html', 'beam-deflection.html'];
targetTools.forEach(f => {
  const content = fs.readFileSync('tools/' + f, 'utf8');
  const h1Match = content.match(/<h1[^>]*data-key=["']([^"']+)["'][^>]*>([^<]+)<\/h1>/);
  if (h1Match) {
    console.log(f, 'H1 key:', h1Match[1]);
  } else {
    const h1Match2 = content.match(/<h1[^>]*>([^<]+)<\/h1>/);
    if (h1Match2) console.log(f, 'H1 (no key):', h1Match2[1]);
  }
});

// Check canonical unchanged
targetTools.forEach(f => {
  const content = fs.readFileSync('tools/' + f, 'utf8');
  const canonicalMatch = content.match(/<link rel="canonical" href="([^"]+)">/);
  if (canonicalMatch) {
    console.log(f, 'canonical:', canonicalMatch[1]);
  }
});

// Check meta description (should be from DESC_TABLE via seo-inject, not hardcoded)
targetTools.forEach(f => {
  const content = fs.readFileSync('tools/' + f, 'utf8');
  const descMatch = content.match(/<meta name="description" content="([^"]+)">/);
  if (descMatch) {
    console.log(f, 'meta desc:', descMatch[1].substring(0, 60) + '...');
  }
});

// Check exactly one H2 for each section
targetTools.forEach(f => {
  const content = fs.readFileSync('tools/' + f, 'utf8');
  const h2Matches = content.match(/<h2[^>]*>/g);
  console.log(f, 'H2 count:', h2Matches ? h2Matches.length : 0);
});