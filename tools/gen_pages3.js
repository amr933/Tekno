const fs=require('fs');
const ids=['battery-runtime','pf-correction','transformer','motor-current','generator-size','battery-bank','cable-resistance','heating-load','cooling-load','duct-size','dew-point','psychrometric','fan-power','boiler-size','capacitors','resistor-colour','solar-array','hyd-cylinder','pneu-cylinder','valve-cv','tank-fill-time'];
for (const cid of ids) {
  const key = cid.replace(/-/g,'_');
  const title = cid.replace(/-/g,' ').replace(/\b\w/g,c=>c.toUpperCase()) + ' Calculator';
  const html = `<!doctype html>
<html lang="en" dir="ltr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title} | TEKNO</title>
  <meta name="description" content="${title}.">
  <link rel="canonical" href="https://your-domain.example/tools/${cid}.html">
  <link rel="stylesheet" href="../css/style.css">
</head>
<body data-root="../" data-page="calc" data-title-key="calc_${key}_title" data-desc-key="calc_${key}_desc">
  <div id="site-header"></div>
  <main>
    <section style="padding-bottom:1.5rem">
      <div class="container">
        <p class="crumbs"><a href="../tools.html" data-key="nav_tools">Tools</a> / <span data-key="calc_${key}_title">${title}</span></p>
        <h1 data-key="calc_${key}_title">${title}</h1>
        <p style="color:var(--muted)" data-key="calc_${key}_desc">${title}.</p>
      </div>
    </section>
    <section style="border-top:0;padding-top:0">
      <div class="container">
        <div class="calc-wrap" data-calc="${cid}"></div>
      </div>
    </section>
    <section>
      <div class="container">
        <h2 data-key="about_heading">About this calculator</h2>
        <p data-key="calc_${key}_about" style="max-width:75ch">${title}.</p>
        <p><a href="../tools.html" data-key="back_to_tools">Back to all tools</a></p>
      </div>
    </section>
  </main>
  <div id="site-footer"></div>
  <script src="../js/translations.js"></script>
  <script src="../js/translations-library-1.js"></script>
  <script src="../js/translations-library-2.js"></script>
  <script src="../js/engine.js"></script>
  <script src="../js/calculators.js"></script>
  <script src="../js/calc-library-1.js"></script>
  <script src="../js/calc-library-2.js"></script>
  <script src="../js/calc-library-3.js"></script>
  <script src="../js/registry.js"></script>
  <script src="../js/main.js"></script>
</body>
</html>`;
  fs.writeFileSync('tools/'+cid+'.html', html, 'utf8');
}
console.log('done');
