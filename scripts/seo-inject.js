// scripts/seo-inject.js
// Injects unique meta description, canonical, hreflang, OG, Twitter tags into every HTML page.
// Base URL from SITE_URL env var.
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SITE_URL = (process.env.SITE_URL || 'https://tekno-eg.pages.dev').replace(/\/$/, '');

const htmlFiles = [];
function collect(dir) {
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (f === 'node_modules' || f === '.git' || f === '.wrangler') continue;
      collect(full);
    } else if (f.endsWith('.html')) {
      htmlFiles.push(full);
    }
  }
}
collect(ROOT);

function titleFromHtml(html) {
  const m = html.match(/<title>([^<]+)<\/title>/i);
  return m ? m[1].trim() : 'TEKNO Engineering Calculators';
}

function descFor(title, relPath) {
  const clean = title.replace(/\s*\|\s*TEKNO.*$/i, '').trim();
  if (relPath === 'index.html') {
    return 'Free, practical engineering calculators for civil, mechanical, electrical, and architecture professionals. Runs in your browser, bilingual English and Arabic.';
  }
  if (relPath === 'tools.html') {
    return 'Browse the full TEKNO directory of free engineering calculators across 16 disciplines. Search and filter by category.';
  }
  return `Free online ${clean} calculator. Compute results instantly in your browser with step-by-step formulas. Bilingual English and Arabic.`;
}

for (const file of htmlFiles) {
  let html = fs.readFileSync(file, 'utf8');
  const rel = path.relative(ROOT, file).replace(/\\/g, '/');
  const title = titleFromHtml(html);
  const desc = descFor(title, rel);
  const url = SITE_URL + '/' + rel.replace(/^index\.html$/, '');
  const urlFinal = url.endsWith('/') ? url : url;

  // Remove existing canonical / meta description / og / twitter / hreflang blocks we manage
  html = html.replace(/\s*<link rel="canonical"[^>]*>\n?/gi, '\n');
  html = html.replace(/\s*<meta name="description"[^>]*>\n?/gi, '\n');
  html = html.replace(/\s*<link rel="alternate" hreflang="[^"]*"[^>]*>\n?/gi, '\n');
  html = html.replace(/\s*<meta property="og:[^"]*"[^>]*>\n?/gi, '\n');
  html = html.replace(/\s*<meta name="twitter:[^"]*"[^>]*>\n?/gi, '\n');

  const block = `
  <meta name="description" content="${desc.replace(/"/g, '&quot;')}">
  <link rel="canonical" href="${urlFinal}">
  <link rel="alternate" hreflang="en" href="${urlFinal}">
  <link rel="alternate" hreflang="ar" href="${urlFinal}">
  <link rel="alternate" hreflang="x-default" href="${urlFinal}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${title.replace(/"/g, '&quot;')}">
  <meta property="og:description" content="${desc.replace(/"/g, '&quot;')}">
  <meta property="og:url" content="${urlFinal}">
  <meta property="og:image" content="${SITE_URL}/assets/og-card.svg">
  <meta property="og:site_name" content="TEKNO">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title.replace(/"/g, '&quot;')}">
  <meta name="twitter:description" content="${desc.replace(/"/g, '&quot;')}">
  <meta name="twitter:image" content="${SITE_URL}/assets/og-card.svg">`;

  html = html.replace(/<\/head>/i, block + '\n</head>');
  fs.writeFileSync(file, html, 'utf8');
}
console.log(`Injected SEO tags into ${htmlFiles.length} HTML files (base: ${SITE_URL})`);
