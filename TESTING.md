# TEKNO — Testing report and remaining issues

Tested on 19 Nov 2026 against the TEKNO specification.

## How it was tested

| Check | Method | Result |
|---|---|---|
| Formula accuracy (all 8 calculators, 49 cases) | `tests/reference-check.js`. Each `compute()` is compared with values derived separately from the published formula or conversion factor (for example 1 mi = 1609.344 m, 1 TR = 3.516853 kW, the steel weight D²/162 × L, and voltage drop 2·I·L·(R·cos φ + X·sin φ)). Covers unit conversions, temperature offsets, steel, HVAC airflow and water flow, pump power and pressure, 1Φ and 3Φ power and current, voltage drop for copper and aluminium, and rectangle, triangle, circle, cylinder and box. | **49 / 49 pass** |
| Browser: console errors | Playwright (Chromium), all 10 pages, English and Arabic | **No errors** |
| Mobile layout (390 px) | Horizontal overflow measured on all pages, English and Arabic | **No overflow** (fixed two issues, see below) |
| Invalid inputs | Empty, text, negative and zero values on every calculator | **No result shown for invalid input**; field messages appear |
| Clear, Enter, Copy | Clear resets the form; Enter runs the calculation; Copy writes the results to the clipboard | **Pass** |
| Language switch | Result, formula, steps and labels update on switch; RTL/LTR set on `<html>` | **Pass** |
| Navigation and links | Every internal link in every page resolves to an existing file | **Pass** |
| Directory and homepage | Search ("concrete" → 1), category filter (Electrical → 2), `?q=` and `?cat=`, home search, homepage lists | **Pass** |
| Translation keys | All 128 keys referenced by the scripts and 48 keys used in HTML exist | **Pass** |
| Screenshots | Homepage (EN and AR) and pump calculator (AR) checked visually at phone width | **Looks correct** |

## Issues found and fixed in this pass

1. **Arabic pages scrolled sideways on phones.** The search labels were hidden with `left:-9999px`, which pushes the page's scroll area out in right-to-left layout. They now use a standard clipped `.sr-only` class.
2. **Flow input squeezed to a sliver (Arabic pump page).** The unit dropdown took most of the row. The input now has a minimum width.
3. **Breadcrumb stayed in English in Arabic mode.** It now uses the same translation key as the page title.
4. **Formulas and step labels stayed English after a language switch, and the result was not recalculated.** The engine now recomputes the stored result when the language changes, and the main word-based labels (Length, Width, Height, Volume, Weight, kg/m, Lateral, Total, result, factor) are translated.
5. **Enter did nothing in calculator fields.** Enter now runs the calculation.
6. **An old result stayed on screen after an input was edited.** This could show a misleading number for the values now entered. Editing any input now removes the result until Calculate is pressed. Only the output panel is replaced, so focus and typed values are kept.

## Remaining issues (honest list)

### Calculation scope
- **Voltage drop uses resistance at 20 °C only.** It does not correct for conductor operating temperature (for example 70–90 °C), so drops are slightly understated for loaded cables.
- **Voltage drop status uses only the 3% guideline.** The 5% total limit is mentioned in the assumptions but is not applied. This is a guide, not a code compliance check.
- **No cable sizing, grouping, derating or installation-method factors** in the voltage drop calculator.
- **HVAC airflow is sensible heat only** (no latent load). Air density is fixed at 1.2 kg/m³ and water density at 1 kg ≈ 1 L. Both are documented but not adjustable.
- **Pump** uses g = 9.81 m/s² and water-like fluids through the density input. It has no NPSH, system curve or pump curve checks. Shaft power depends on the efficiency you enter.
- **Steel weight** uses the spec's simplified formula (D²/162). It is not checked against a bar standard table.
- **Concrete** gives the net volume only. There is no waste or wastage allowance.
- **Triangle area** needs base and height only (no three-side input).

### Language and content
- **The Arabic text was written for this build and has not been reviewed by a native-speaking engineer.** Technical terms (for example power factor, reactance, cosφ) should be checked before launch.
- **Formula notation stays in Latin symbols** (V, I, cos φ, ΔV). Only the main word labels are translated.
- **Units are symbols** and are not translated (m³, kg, psi).

### Behaviour
- **Clear resets fields to their example values, not to blank.** This was a deliberate choice so every calculator shows a working example. Change it in `engine.js` (`resetRaw`) if you prefer blank fields.
- **Inputs are not saved in the URL**, so a calculation cannot be shared as a link.
- **Results are cleared when an input changes**, so a stale result is never shown. The user has to press Calculate again.

### Testing gaps
- **Browser tests run in headless Chromium only.** Safari, Firefox, iOS and Android were not tested on real devices.
- **Copy was tested only in Chromium** with clipboard permission. The fallback for browsers without the Clipboard API has not been run.
- **Accessibility was checked only for labels and roles.** A screen-reader pass and a formal WCAG audit are still needed.
- **The reference values are independent hand-derived checks, not an external engineering tool.** A licensed engineer should review the formulas and assumptions before the site is used for design work.

### Launch tasks
- **Replace `https://your-domain.example`** in the canonical tags, `sitemap.xml` and `robots.txt`.
- **Update the "Recently added" dates** in `js/main.js` when new tools are added. They currently come from fixed dates.
- **Monetization is prepared but not built.** The footer lists roadmap items as text. No ad slots, pricing pages, or purchase buttons exist, so nothing non-functional is displayed.

## Run the tests again

```bash
node tests/reference-check.js
npm i playwright && npx playwright install chromium
node tests/browser-smoke.js
```

## Calculator library, batch 1 (20 Nov 2026)

Calculators added: Ohm's Law, Resistors in Series & Parallel, LED Resistor, Reynolds Number, Moment of Inertia, Beam Deflection, Tank Volume, Thermal Expansion.

| Check | Method | Result |
|---|---|---|
| Formula accuracy (batch 1) | `tests/reference-library-1.js`: reference example plus several cases per calculator, unit conversions (mm, cm, in, m, Pa·s / mPa·s), and error cases (LED supply below forward voltage, hollow section with thick wall or inner ≥ outer) | **46 / 46 pass** |
| Existing formulas (regression) | `tests/reference-check.js` | **49 / 49 pass** |
| Browser (18 pages, EN + AR) | `tests/browser-smoke.js`: no console errors, no horizontal overflow, invalid input, Clear, Enter, language switch, directory search and filter | **All pass** |
| Variants and errors in browser | Ohm's Law variant switch, Beam Deflection default, LED invalid supply message, LED in Arabic | **Pass** |
| Translation keys | All keys used by new code and pages exist (247 checked) | **Pass** |

Every batch-1 calculator has at least three test cases and one reference example. Expected values were derived from the governing equations, not from the code.

### Batch 1 limitations
- Heat Transfer, Resistor colour code and the other batch 2–4 calculators are not built yet. See `TEKNO_CALCULATOR_GAP_ANALYSIS.md`.
- The Reynolds regime limits (2300 and 4000) are common pipe-flow thresholds, not exact transition points.
- Beam deflection considers simply supported beams only. It does not include self-weight, continuous spans or other supports.
- Thermal expansion uses typical coefficients. The datasheet value should be used for design.
- Resistors in series/parallel takes three fixed inputs (a variable count is not implemented).
- The 16-discipline listing is a filter in the directory. A dedicated page or section for each discipline is not built yet.
