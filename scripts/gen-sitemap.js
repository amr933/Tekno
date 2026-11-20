// scripts/gen-sitemap.js
// Regenerates sitemap.xml from the actual files in tools/.
// Base URL comes from SITE_URL env var (or defaults to production .pages.dev domain).
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SITE_URL = (process.env.SITE_URL || 'https://tekno-eg.pages.dev').replace(/\/$/, '');
const TODAY = new Date().toISOString().slice(0, 10);

const urls = [];
function add(loc, priority = 0.8, changefreq = 'monthly') {
  urls.push({ loc: SITE_URL + loc, lastmod: TODAY, changefreq, priority });
}

add('/', 1.0);
add('/tools', 0.9);

const toolsDir = path.join(ROOT, 'tools');
const files = fs.readdirSync(toolsDir)
  .filter(f => f.endsWith('.html'))
  .sort();
for (const f of files) {
  add('/tools/' + f.replace(/\.html$/, ''), 0.8);
}

let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
for (const u of urls) {
  xml += `  <url><loc>${u.loc}</loc><lastmod>${u.lastmod}</lastmod><changefreq>${u.changefreq}</changefreq><priority>${u.priority}</priority></url>\n`;
}
xml += '</urlset>\n';

fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), xml, 'utf8');

const robots = `# TEKNO robots.txt\nUser-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;
fs.writeFileSync(path.join(ROOT, 'robots.txt'), robots, 'utf8');

console.log(`Generated sitemap.xml (${urls.length} URLs) and robots.txt (base: ${SITE_URL})`);
