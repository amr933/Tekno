# TEKNO — Calculator Gap Analysis (Phase 1)

Date: 20 Nov 2026. Scope: audit of the existing TEKNO code and mapping against the functional benchmark (75 calculators across 16 disciplines). Reference material is used only to identify which calculations to build. No reference code, text or branding is copied; every formula is implemented from standard engineering equations.

## 1. Existing TEKNO audit

| Item | Finding |
|---|---|
| Stack | Plain HTML5, CSS3, vanilla JavaScript. No framework, backend, database or build step. |
| Structure | `index.html`, `tools.html`, `tools/*.html` (one page per calculator), `js/` (engine, calculators, main, translations), `css/style.css`, `tests/`. |
| Calculator engine | `js/engine.js` builds the form from a definition, validates inputs, shows result, formula, steps and assumptions, and provides Reset and Copy. Engine is separate from the calculation functions (`compute()`), so each calculation is testable in Node. |
| Translations | `js/translations.js` holds every UI string as `key: [English, Arabic]`. |
| Existing calculators | 8 functional calculators (listed below). |
| Categories | Five original categories: civil, mechanical, electrical, architecture, general. These do not match the 16 required disciplines. |
| Tests | 49 formula reference checks (`tests/reference-check.js`) and a Playwright smoke test (`tests/browser-smoke.js`). |
| Live deployment | `https://tekno-eg.pages.dev` could not be reached from the build environment (proxy returned 403). It was not verified in this audit. |

### Existing calculators (8)

| TEKNO id | Title | Discipline (current → target) | Notes |
|---|---|---|---|
| `unit-converter` | Unit Converter | General → General | Covers length, area, volume, pressure, flow, temperature, power, weight. Also covers the reference's Pressure and Power converters. |
| `concrete` | Concrete Volume | Civil → Civil | Correct. |
| `steel-weight` | Steel Bar Weight | Civil → Civil | Covers the reference's Rebar Weight and Weight of Steel. |
| `hvac` | HVAC | Mechanical → HVAC | Correct for TR↔kW, airflow and chilled-water flow. Reclassified to HVAC. |
| `pump` | Pump | Mechanical → Fluid Mechanics | Hydraulic power, pressure↔head. Reclassified. |
| `electrical-load` | Electrical Load | Electrical → Electrical | Covers single-phase, three-phase power and current. |
| `voltage-drop` | Cable Voltage Drop | Electrical → Electrical | Correct. Limitations listed in TESTING.md. |
| `area-volume` | Area & Volume | Architecture → General | Not a reference calculator. "Architecture" is not one of the 16 required disciplines, so it moves to General. |

### Bugs and gaps found in the audit

- No bugs remain open from the earlier testing pass (see TESTING.md, items 1–6, all fixed).
- Voltage drop ignores conductor operating temperature (resistance taken at 20 °C). Listed as a limitation; to be improved in a later batch.
- HVAC airflow assumes sensible load only.
- The directory has five categories, not sixteen. Addressed in Phase 2.

## 2. Reference inventory and mapping (75 calculators)

Status key: **Existing** = covered by a TEKNO calculator now. **B1** = built in this batch. **B2 / B3 / B4** = planned batch. **Deferred** = not built yet, with the reason.

| # | Discipline | Reference calculator | Status | TEKNO plan |
|---|---|---|---|---|
| 1 | General | Engineering Unit Converter | Existing | `unit-converter` |
| 2 | General | Pressure Converter | Existing | Covered by `unit-converter` (same category). Not counted twice. |
| 3 | General | Power Converter | Existing | Covered by `unit-converter`. Not counted twice. |
| 4 | Civil | Concrete Volume | Existing | `concrete` |
| 5 | Civil | Rebar Weight | Existing | `steel-weight` (same formula). Not counted twice. |
| 6 | Civil | Concrete Mix | Deferred | Needs mix-design tables (ACI 211.1 or equivalent) checked against the edition in use. |
| 7 | Civil | Retaining Wall | B4 | Rankine active earth pressure and overturning check. Needs clear assumptions for backfill and surcharge. |
| 8 | Civil | Drainage & Stormwater Runoff | B4 | Rational method, Q = C·i·A. |
| 9 | Electrical | Ohm's Law | **B1** | `ohms-law` |
| 10 | Electrical | Voltage Drop | Existing | `voltage-drop` |
| 11 | Electrical | Wire / Cable Size | Deferred | Needs ampacity tables (IEC 60364-5-52 or NEC) verified against the edition. |
| 12 | Electrical | Electrical Power | Existing | `electrical-load` |
| 13 | Electrical | Three-Phase Power | Existing | `electrical-load` |
| 14 | Electrical | Battery Runtime | B3 | Energy-based runtime with efficiency and depth-of-discharge inputs. |
| 15 | Electrical | AC Single-Phase Power | Existing | `electrical-load` |
| 16 | Electrical | Power Factor Correction | B3 | Required kVAR = P(tan φ₁ − tan φ₂). |
| 17 | Electrical | Transformer | B3 | Turns ratio, full-load current, kVA. |
| 18 | Electrical | Motor Current | B3 | I = P / (√3·V·PF·η). |
| 19 | Electrical | Generator Size | B3 | Load sum with demand and efficiency assumptions. |
| 20 | Electrical | Battery Bank Size | B3 | Ah from daily energy, DoD, efficiency and autonomy. |
| 21 | Electrical | Cable Resistance | B3 | R = ρ·L/A with temperature correction. |
| 22 | Electrical | Short-Circuit Current | Deferred | Needs source and cable impedance data that the user must supply, with a verified method. |
| 23 | Structural | Beam Deflection | **B1** | `beam-deflection` (simply supported, UDL and midspan point load). |
| 24 | Structural | Bending Stress | B2 | σ = M·c / I. |
| 25 | Structural | Moment of Inertia | **B1** | `moment-of-inertia` (rectangle, hollow rectangle, circle, hollow circle). |
| 26 | Structural | Beam Load & Reaction | B2 | Simply supported reactions. |
| 27 | Structural | Shear Force & Bending Moment | B2 | Simply supported, UDL and point load. |
| 28 | Structural | Column Buckling | B2 | Euler critical load with effective length factor. |
| 29 | Structural | Section Modulus | B2 | S = I / c. |
| 30 | Fluids | Pipe Flow | B2 | Q = v·A. |
| 31 | Fluids | Reynolds Number | **B1** | `reynolds-number`. |
| 32 | Fluids | Pump Head & Power | Existing | `pump` |
| 33 | Fluids | Pipe Pressure Loss | B2 | Darcy–Weisbach or Hazen–Williams (see rows 40 and 41). |
| 34 | Fluids | Water Velocity | B2 | v = Q / A. |
| 35 | Fluids | Darcy–Weisbach | B4 | Needs Colebrook / Haaland friction factor, iterated. |
| 36 | Fluids | Hazen–Williams | B2 | Valid for water in the stated range. |
| 37 | Fluids | Bernoulli Equation | B2 | Energy balance with stated assumptions. |
| 38 | Fluids | Air Density | B2 | Ideal gas with humidity option. |
| 39 | Fluids | Pump Size | B3 | Selection from head, flow and efficiency. Gives a sizing estimate only. |
| 40 | Mechanical | Horsepower & Torque | B2 | P = 2πNT / 60 (SI) and imperial form. |
| 41 | Mechanical | Gear Ratio | B2 | Speed and torque relationship with efficiency. |
| 42 | Mechanical | Belt Length & Pulley | B2 | Open belt length formula. |
| 43 | Mechanical | Bolt Torque | B2 | T = K·F·d with stated K. |
| 44 | Mechanical | Normal Stress | B2 | σ = F / A. |
| 45 | Mechanical | Shaft Size | Deferred | Needs ASME shaft design equations with stated safety factors and material data; to be verified before building. |
| 46 | Mechanical | Spring Rate | B2 | k = G·d⁴ / (8·D³·N). |
| 47 | Mechanical | Bearing Life | B2 | L10 life from C and P. |
| 48 | Materials | Weight of Steel | Existing | `steel-weight` |
| 49 | Materials | Steel Beam Weight | Deferred | Needs verified section property tables (for example AISC or EN) for standard sections. |
| 50 | HVAC | Heating Load | B3 | Simplified steady-state transmission load. Method and assumptions to be clearly labelled. |
| 51 | HVAC | Cooling Load | B3 | Simplified steady-state load; full CLTD/CLF method not implemented. |
| 52 | HVAC | Airflow & Duct Size | B3 | Equal-friction method. |
| 53 | HVAC | Dew Point & Relative Humidity | B3 | Magnus formula. |
| 54 | HVAC | Psychrometric | B3 | Humidity ratio and enthalpy from dry-bulb and RH at standard pressure. |
| 55 | HVAC | Fan Power | B3 | P = Q·Δp / η. |
| 56 | HVAC | Boiler Size | B3 | Heat output from load with safety margin. |
| 57 | Electronics | Resistor Colour Code | B3 | Lookup table (IEC 60062). |
| 58 | Electronics | Resistors in Series & Parallel | **B1** | `resistors-series-parallel`. |
| 59 | Electronics | Capacitors in Series & Parallel | B3 | Reciprocal rules for capacitors. |
| 60 | Electronics | LED Resistor | **B1** | `led-resistor`. |
| 61 | Energy | Solar Panel & Array Size | B3 | Energy yield from peak sun hours and performance ratio. |
| 62 | Geotechnical | Foundation Bearing Capacity | B4 | Terzaghi strip footing. Factors and assumptions stated. |
| 63 | Hydraulics | Hydraulic Cylinder Force | B3 | F = p·A (extend and retract). |
| 64 | Pneumatics | Pneumatic Cylinder Force | B3 | F = p·A with efficiency. |
| 65 | Process | Cv & Kv Valve Size | B3 | Water flow form of the Cv equation. |
| 66 | Process | Tank Volume | **B1** | `tank-volume` (vertical cylinder, rectangular). |
| 67 | Process | Tank Fill & Drain Time | B3 | t = V / Q. |
| 68 | Thermal | Heat Transfer (conduction) | B2 | Fourier's law through a flat wall. |
| 69 | Thermal | Heat Exchanger LMTD | B4 | Log-mean temperature difference for counter/parallel flow. |
| 70 | Thermal | Thermal Expansion | **B1** | `thermal-expansion`. |
| 71 | Thermal | Insulation & Heat Loss | B4 | Cylindrical and flat insulation with stated conductivity. |
| 72 | Thermal | Ideal Gas Law | B2 | PV = nRT, solve for any variable. |
| 73 | Manufacturing | Welding Heat Input | B4 | HI = V·I·60 / (S·1000). |
| 74 | Manufacturing | Cutting Speed, Feed & RPM | B4 | N = 1000·Vc / (π·D). |
| 75 | Manufacturing | Sheet-Metal Bend Allowance | B4 | BA with K-factor stated as an assumption. |

## 3. Summary

| Status | Count |
|---|---|
| Existing (covered now, counting each TEKNO calculator once) | 8 TEKNO tools; 11 reference items |
| Built in batch 1 | 8 |
| Planned batch 2 | 20 |
| Planned batch 3 | 22 |
| Planned batch 4 | 9 |
| Deferred (needs verified data or tables) | 5 (rows 6, 11, 22, 45, 49) |

Check: 11 existing + 8 + 20 + 22 + 9 + 5 = 75 reference items.

Counting TEKNO tools: 8 existing + 8 batch-1 = 16 at the end of this batch. If batches 2–4 are completed, the total is 8 + 8 + 20 + 22 + 9 = 67 TEKNO tools. The three duplicate reference items (Pressure converter, Power converter, Rebar weight) are not counted again. Reaching about 75 needs the five deferred items, and each of those must be verified before it is built. The final report will state the exact count.

## 4. Discipline coverage target

Each of the 16 disciplines gets its own listing section in the directory. By the end of batch 4 every discipline has at least one calculator, because Materials already has Steel Bar Weight. Geotechnical and Manufacturing get their first calculators in batch 4.

| Discipline | Existing | Batch 1 | Planned |
|---|---|---|---|
| General Engineering | 2 | 0 | — |
| Civil | 2 | 0 | Retaining wall, stormwater (B4) |
| Electrical | 2 | 1 | Battery, PF correction, transformer, motor, generator, battery bank, cable resistance (B3) |
| Structural | 0 | 2 | Bending stress, reactions, shear/moment, buckling, section modulus (B2) |
| Fluid Mechanics | 1 | 1 | Pipe flow, velocity, Hazen–Williams, Bernoulli, air density (B2); Darcy (B4) |
| Mechanical | 0 | 0 | Horsepower, gear, belt, bolt, normal stress, spring, bearing (B2) |
| Materials | 1 | 0 | Steel beam weight (deferred) |
| HVAC | 1 | 0 | Heating, cooling, duct, dew point, psychrometric, fan, boiler (B3) |
| Electronics | 0 | 2 | Colour code, capacitors (B3) |
| Energy | 0 | 0 | Solar array (B3) |
| Geotechnical | 0 | 0 | Bearing capacity (B4) |
| Hydraulics | 0 | 0 | Cylinder force (B3) |
| Pneumatics | 0 | 0 | Cylinder force (B3) |
| Process | 0 | 1 | Valve Cv, fill time (B3) |
| Thermal | 0 | 1 | Conduction, LMTD, insulation, ideal gas (B2/B4) |
| Manufacturing | 0 | 0 | Welding, cutting, bend allowance (B4) |

Note: the `area-volume` tool (existing, moved to General) makes General 2 calculators, not 0.

## 5. Plan

1. **Phase 2 (this batch):** 16-discipline registry, directory filter by discipline, discipline listing sections.
2. **Batch 1 (this batch):** 8 calculators listed above, each with reference tests.
3. **Batch 2:** 21 calculators (structural, mechanical, fluids, thermal basics, ideal gas).
4. **Batch 3:** 19 calculators (electrical, electronics, energy, HVAC, hydraulic, pneumatic, process).
5. **Batch 4:** 9 calculators (advanced fluids, geotechnical, thermal exchangers, manufacturing).
6. **Deferred:** 6 items, each to be built only after its data source is verified.

Verification for every calculator: formula written against a named reference (textbook or standard) in the calculator's assumptions; at least three test cases and one independently verified reference example; invalid, zero and negative input tests; unit conversion tests where relevant. A calculator is marked complete only when its tests run and pass.
