# TEKNO — Engineering Made Simple

Free, practical engineering calculators for civil, mechanical, electrical and architectural work.
Plain HTML5, CSS3 and vanilla JavaScript. No backend, no database, no accounts, no build step.
English and Arabic (RTL) are both supported.

## Project structure

```
tekno/
├── index.html              Homepage (hero, search, disciplines, popular, recent, why TEKNO)
├── tools.html              Tools directory (search, category filter, ?q= and ?cat= URL params)
├── tools/                  One page per calculator (8 pages, SEO-friendly URLs)
│   ├── unit-converter.html
│   ├── concrete.html
│   ├── steel.html
│   ├── hvac.html
│   ├── pump.html
│   ├── electrical-load.html
│   ├── voltage-drop.html
│   └── area-volume.html
├── css/style.css           All styles (cobalt blue, white and light grey, responsive)
├── js/
│   ├── translations.js     Every UI string: key → [English, Arabic]
│   ├── main.js             Shared header/footer, language switch, homepage, directory
│   ├── registry.js         Single list of calculators and the 16 disciplines
│   ├── calc-library-1.js   Calculator library, batch 1 (formulas)
│   ├── translations-library-1.js  Strings for batch 1 and discipline names
│   ├── engine.js           Calculator engine: form, validation, results, copy button
│   └── calculators.js      Calculator definitions (formulas, steps, assumptions)
├── tests/
│   ├── reference-check.js  Node: checks every formula against independent reference values
│   ├── reference-library-1.js  Node: batch 1 formula checks
│   └── browser-smoke.js    Playwright: errors, layout, validation, language, navigation
├── sitemap.xml
├── robots.txt
├── TESTING.md              Testing report and list of remaining issues
├── TEKNO_CALCULATOR_GAP_ANALYSIS.md  Reference mapping (75 calculators) and batch plan
└── README.md
```

## Run locally

No install is needed. Either:

- open `index.html` directly in a browser, or
- serve the folder (recommended, so every URL behaves like production):

  ```bash
  cd tekno
  python3 -m http.server 8000
  # then open http://localhost:8000
  ```

## Run the tests

```bash
node tests/reference-check.js          # formula checks, no dependencies
node tests/reference-library-1.js      # batch 1 formula checks
npm i playwright && npx playwright install chromium
node tests/browser-smoke.js            # browser checks (Chromium)
```

## Before you deploy: replace the placeholder domain

The files use `https://your-domain.example` as a placeholder. Replace it with your real domain in:

- the `<link rel="canonical">` tag on each HTML page (10 pages)
- `sitemap.xml`
- `robots.txt`

## Deploy for free

The site is static and uses relative paths, so it works at a domain root or in a sub-folder.

### Cloudflare Pages

1. Push this folder to a GitHub repository.
2. In the Cloudflare dashboard, go to **Workers & Pages → Create → Pages → Connect to Git** and select the repository.
3. Build command: leave empty. Build output directory: `/` (or `.`).
4. Deploy. Add your custom domain under **Custom domains**.

### GitHub Pages

1. Push this folder to a GitHub repository (branch `main`).
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, branch `main`, folder `/ (root)`.
4. Save. The site appears at `https://<user>.github.io/<repo>/`. Then update the domain placeholders (above).

## Adding a calculator

1. Add the formula to `js/calculators.js` with `TEKNO.registerCalc({ id, variants: { … } })`.
   Each variant lists its input `fields` and a `compute(values)` function that returns `main`, `others`, `formula`, `steps` and `assumptions`.
   Return `{ error: 'key' }` for inputs that cannot be calculated.
2. Add the strings (`title`, labels, assumptions) as `key: [English, Arabic]` in `js/translations.js`.
3. Copy an existing page in `tools/`, change the `data-calc` id, and add the page to `sitemap.xml`.
4. Add the tool to the `TOOLS` list in `js/main.js` so it appears in the directory and homepage.
5. Add a reference check to `tests/reference-check.js`.

## Notes on design

- Calculations run in the browser. Inputs are validated before any number is shown. Invalid, empty, zero-where-not-allowed or negative values show a message next to the field, and no result.
- Numbers accept ASCII and Arabic-Indic digits. A comma decimal is rejected rather than read as a different number.
- The language choice is kept in the browser's `localStorage` (with a safe fallback if storage is blocked).
- No payment, subscription or ad code exists yet. The footer lists roadmap items as plain text, not as buttons.

## Disclaimer

Results are for guidance. Check every design against the applicable codes and standards, and have it reviewed by a licensed professional.
