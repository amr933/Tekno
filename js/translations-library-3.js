/* Translation strings for the 10 enriched calculator pages: How it works, Worked example, FAQ.
 * Each entry is key: [English, Arabic]. Loaded after translations.js; adds to TEKNO.keys. */
(function () {
  "use strict";
  var TEKNO = window.TEKNO;
  if (!TEKNO || !TEKNO.keys) return;
  Object.assign(TEKNO.keys, {

    // ===================== SHARED HEADINGS =====================
    how_heading: ["How it works", "كيف تعمل"],
    example_heading: ["Worked example", "مثال محلول"],
    faq_heading: ["FAQ", "الأسئلة الشائعة"],

    // ===================== VOLTAGE DROP =====================
    calc_voltage_drop_how: [
      "This calculator estimates the voltage drop along a single-phase or three-phase AC circuit. " +
      "It uses the exact AC formula ΔV = k × I × L × (r·cos φ + x·sin φ), where k = √3 for three-phase and 2 for single-phase. " +
      "Resistance r = ρ/A with ρ = 0.0172 Ω·mm²/m (copper) or 0.0282 Ω·mm²/m (aluminium) at 20 °C. " +
      "Reactance x is the per-metre value in mΩ/m divided by 1000. " +
      "The result shows the drop in volts, the percentage of nominal voltage, the voltage at the load end, " +
      "and a status flag against the common 3 % guideline for branch circuits (IEC 60364-4-41, NEC 210.19). " +
      "Use this when sizing cables for motor feeders, lighting circuits or distribution boards to ensure the load receives adequate voltage.",
      "تحسب هذه الحاسبة هبوط الجهد على الدوائر أحادية وثلاثية الطور باستخدام صيغة التيار المتردد الدقيقة " +
      "ΔV = k × I × L × (r·cos φ + x·sin φ)، حيث k = √3 للطور الثلاثي و 2 للطور الأحادي. " +
      "المقاومة r = ρ/A مع ρ = 0.0172 Ω·مم²/م (نحاس) أو 0.0282 Ω·مم²/م (ألومنيوم) عند 20 °م. " +
      "المفاعلة x هي القيمة لكل متر بالملي أوم لكل متر مقسومة على 1000. " +
      "تعرض النتيجة الهبوط بالفولت، النسبة من الجهد الاسمي، الجهد عند نهاية الحمل، " +
      "وعلم حالة مقابل الحد الإرشادي الشائع 3% للدوائر الفرعية (IEC 60364-4-41، NEC 210.19). " +
      "استخدمها عند اختيار مقطع الكابلات للأحمال الحركية، دوائر الإضاءة، ولوحات التوزيع لضمان وصول جهد كافٍ للحمل."
    ],
    calc_voltage_drop_example: [
      "Example: A three-phase 400 V motor draws 32 A. The copper cable is 50 m one-way, 6 mm² cross-section, power factor 0.85, reactance 0.08 mΩ/m. " +
      "Step 1: r = 0.0172 ÷ 6 = 0.002867 Ω/m. " +
      "Step 2: x = 0.08 ÷ 1000 = 0.00008 Ω/m. " +
      "Step 3: sin φ = √(1 − 0.85²) = 0.5268. " +
      "Step 4: Z = r·cos φ + x·sin φ = 0.002867×0.85 + 0.00008×0.5268 = 0.002479 Ω/m. " +
      "Step 5: ΔV = √3 × 32 × 50 × 0.002479 = 6.87 V. " +
      "Step 6: ΔV% = 6.87 ÷ 400 × 100 = 1.72 %. " +
      "Voltage at load = 400 − 6.87 = 393.13 V. Status: Within the 3 % guideline.",
      "مثال: موتور ثلاثي الطور 400 فولت يسحب 32 أمبير. كابل نحاس 50 متر في اتجاه واحد، مقطع 6 مم²، معامل قدرة 0.85، مفاعلة 0.08 ملي أوم/م. " +
      "الخطوة 1: r = 0.0172 ÷ 6 = 0.002867 Ω/م. " +
      "الخطوة 2: x = 0.08 ÷ 1000 = 0.00008 Ω/م. " +
      "الخطوة 3: sin φ = √(1 − 0.85²) = 0.5268. " +
      "الخطوة 4: Z = r·cos φ + x·sin φ = 0.002867×0.85 + 0.00008×0.5268 = 0.002479 Ω/م. " +
      "الخطوة 5: ΔV = √3 × 32 × 50 × 0.002479 = 6.87 فولت. " +
      "الخطوة 6: ΔV% = 6.87 ÷ 400 × 100 = 1.72 %. " +
      "الجهد عند الحمل = 400 − 6.87 = 393.13 فولت. الحالة: ضمن الحد الإرشادي 3%."
    ],
    calc_voltage_drop_faq: [
      "<dl>" +
      "  <dt>What is the 3% voltage drop guideline?</dt>" +
      "  <dd>The 3% guideline (IEC 60364-4-41, NEC 210.19) recommends that voltage drop on branch circuits should not exceed 3% of the nominal voltage. For feeders, a combined 5% total (feeder + branch) is often allowed.</dd>" +
      "  <dt>Can I use this for DC circuits?</dt>" +
      "  <dd>No. This tool is for AC circuits only. For DC, use ΔV = 2 × I × L × R (single conductor out and back).</dd>" +
      "  <dt>Why is reactance included?</dt>" +
      "  <dd>AC circuits have inductance. The reactance term (x·sin φ) can add 10–30% to the drop at high power factors or large conductors. Ignoring it underestimates the drop.</dd>" +
      "  <dt>What power factor should I enter?</dt>" +
      "  <dd>Use the load's rated power factor (cos φ). For motors, typical values are 0.8–0.9. For resistive loads, use 1.0.</dd>" +
      "</dl>",
      "<dl>" +
      "  <dt>ما هو الحد الإرشادي 3% لهبوط الجهد؟</dt>" +
      "  <dd>يوصي الحد الإرشادي 3% (IEC 60364-4-41، NEC 210.19) بألا يتجاوز هبوط الجهد على الدوائر الفرعية 3% من الجهد الاسمي. بالنسبة للمغذيات، غالباً ما يُسمح بإجمالي 5% مشترك (المغذي + الفرعي).</dd>" +
      "  <dt>هل يمكنني استخدام هذا للدوائر المستمرة (DC)؟</dt>" +
      "  <dd>لا. هذه الأداة للتيار المتردد فقط. للتيار المستمر، استخدم ΔV = 2 × I × L × R (موصلة ذهاباً وإياباً).</dd>" +
      "  <dt>لماذا تُضمَّن المفاعلة؟</dt>" +
      "  <dd>الدوائر المتناوبة لها حثية. حد المفاعلة (x·sin φ) يمكن أن يضيف 10–30% للهبوط عند معاملات قدرة عالية أو مقاطع كبيرة. تجاهله يقلل من تقدير الهبوط.</dd>" +
      "  <dt>ما معامل القدرة الذي يجب إدخاله؟</dt>" +
      "  <dd>استخدم معامل القدرة المقنن للحمل (cos φ). للمحركات، القيم النموذجية 0.8–0.9. للأحمال المقاومة، استخدم 1.0.</dd>" +
      "</dl>"
    ],

    // ===================== MOTOR CURRENT =====================
    calc_motor_current_how: [
      "This calculator finds the full-load current of an AC motor from its rated power, voltage, power factor and efficiency. " +
      "For three-phase: I = P / (√3 × V × pf × η). For single-phase: I = P / (V × pf × η). " +
      "P is in watts (enter kW and the tool converts), V is line-to-line RMS voltage, pf is the rated power factor (cos φ), and η is the rated efficiency (per-unit). " +
      "The formula derives from P_out = P_in × η = √3 × V × I × pf × η for three-phase. " +
      "The result is the steady-state current the motor draws at rated load. Use it for cable sizing, overload relay setting, starter selection, and transformer/feeder capacity checks. " +
      "Note: starting current (DOL) is typically 5–7 × rated current; this tool gives rated current only.",
      "تحسب هذه الحاسبة تيار الحمل الكامل لمحرك تيار متردد من قدرته المقننة، الجهد، معامل القدرة والكفاءة. " +
      "للطور الثلاثي: I = P / (√3 × V × pf × η). للطور الأحادي: I = P / (V × pf × η). " +
      "P بالواط (أدخل كيلوواط والأداة تحوّل)، V هو جهد الخط RMS، pf هو معامل القدرة المقنن (cos φ)، و η هي الكفاءة المقننة (واحدية). " +
      "المشتقة من P_out = P_in × η = √3 × V × I × pf × η للطور الثلاثي. " +
      "النتيجة هي تيار الحالة المستقرة الذي يسحبه المحرك عند الحمل المقنن. استخدمها لاختيار مقطع الكابل، ضبط وقاية الحمل الزائد، اختيار المبدئ، وفحص سعة المحول/التغذية. " +
      "ملاحظة: تيار البدء (DOL) عادة 5–7 أضعاف التيار المقنن؛ هذه الحاسبة تعطي التيار المقنن فقط."
    ],
    calc_motor_current_example: [
      "Example: 5 kW three-phase motor, 400 V line-to-line, power factor 0.85, efficiency 0.90. " +
      "P = 5000 W. I = 5000 / (√3 × 400 × 0.85 × 0.90) = 5000 / 530.0 = 9.43 A. " +
      "Result: 9.43 A full-load current.",
      "مثال: موتور 5 كيلوواط ثلاثي الطور، 400 فولت خط-خط، معامل قدرة 0.85، كفاءة 0.90. " +
      "P = 5000 واط. I = 5000 / (√3 × 400 × 0.85 × 0.90) = 5000 / 530.0 = 9.43 أمبير. " +
      "النتيجة: 9.43 أمبير تيار الحمل الكامل."
    ],
    calc_motor_current_faq: [
      "<dl>" +
      "  <dt>Why do I need power factor and efficiency?</dt>" +
      "  <dd>Real output power = √3 × V × I × pf × η. Without pf and η you cannot relate the mechanical output (kW) to the electrical input current.</dd>" +
      "  <dt>Can I use this for VFD-fed motors?</dt>" +
      "  <dd>Yes, for the rated current at base speed. The VFD input current will differ due to rectifier losses and harmonics; check the VFD datasheet for input current.</dd>" +
      "  <dt>What if the motor is single-phase?</dt>" +
      "  <dd>Select single-phase in the calculator. The formula becomes I = P / (V × pf × η) without the √3 factor.</dd>" +
      "  <dt>Is this the starting current?</dt>" +
      "  <dd>No. This is the rated full-load current. Direct-on-line starting current is typically 5–7× this value.</dd>" +
      "</dl>",
      "<dl>" +
      "  <dt>لماذا أحتاج معامل القدرة والكفاءة؟</dt>" +
      "  <dd>القدرة الفعالة الناتجة = √3 × V × I × pf × η. بدون pf و η لا يمكن ربط القدرة الميكانيكية (كيلوواط) بالتيار الكهربائي الداخل.</dd>" +
      "  <dt>هل يمكنني استخدام هذا للمحركات المغذية من VFD؟</dt>" +
      "  <dd>نعم، للتيار المقنن عند السرعة الأساسية. تيار دخول VFD سيختلف بسبب فاقد المبدد والهارمونيك؛ راجع بيانات VFD لتيار الدخول.</dd>" +
      "  <dt>ماذا لو كان المحرك أحادي الطور؟</dt>" +
      "  <dd>اختر أحادي الطور في الحاسبة. تصبح الصيغة I = P / (V × pf × η) دون عامل √3.</dd>" +
      "  <dt>هل هذا هو تيار البدء؟</dt>" +
      "  <dd>لا. هذا هو تيار الحمل الكامل المقنن. تيار البدء المباشر (DOL) عادة 5–7 أضعاف هذه القيمة.</dd>" +
      "</dl>"
    ],

    // ===================== CONCRETE VOLUME =====================
    calc_concrete_how: [
      "This calculator computes the volume of a rectangular concrete element from length, width and height. " +
      "You may enter dimensions in metres, centimetres, millimetres, feet or inches; the tool converts all to metres and multiplies: V = L × W × H. " +
      "The formula is the standard volume of a rectangular prism. Results are shown in cubic metres (m³). " +
      "Use this for slabs, footings, beams, columns (rectangular), walls and pavements. " +
      "Always add a waste allowance (typically 3–5% for ready-mix, 5–10% for site-mixed) when ordering concrete. " +
      "The tool does not include waste, formwork volume, or reinforcement displacement.",
      "تحسب هذه الحاسبة حجم العنصر الخرساني المستطيل من الطول والعرض والارتفاع. " +
      "يمكنك إدخال الأبعاد بالأمتار، سنتيمترات، ملليمترات، أقدام أو بوصات؛ الأداة تحوّل الكل إلى أمتار وتضرب: V = L × W × H. " +
      "الصيغة هي حجم المنشور المستطيل القياسي. النتائج تظهر بالمتر المكعب (م³). " +
      "استخدمها للبلاطات، القواعد، الكمرات، الأعمدة (مستطيلة)، الجدران والأرضيات. " +
      "أضف دائماً نسبة هدر (عادة 3–5% للخرسانة الجاهزة، 5–10% للخرسانة الموقع) عند الطلب. " +
      "الأداة لا تتضمن الهدر، حجم الشدات، أو إزاحة التسليح."
    ],
    calc_concrete_example: [
      "Example: A floor slab 3 m long, 2 m wide, 0.2 m thick. " +
      "V = 3 × 2 × 0.2 = 1.20 m³. " +
      "With 5% waste allowance: order 1.26 m³.",
      "مثال: بلاطة أرضية طول 3 م، عرض 2 م، سماكة 0.2 م. " +
      "V = 3 × 2 × 0.2 = 1.20 م³. " +
      "مع 5% نسبة هدر: اطلب 1.26 م³."
    ],
    calc_concrete_faq: [
      "<dl>" +
      "  <dt>Can I use this for circular columns?</dt>" +
      "  <dd>No. This tool is for rectangular sections only. For circular columns use V = π × (d/2)² × h.</dd>" +
      "  <dt>Does the result include waste?</dt>" +
      "  <dd>No. The result is the net geometric volume. Add 3–10% waste depending on mix type and site conditions.</dd>" +
      "  <dt>What if my slab has varying thickness?</dt>" +
      "  <dd>Break it into rectangular zones of constant thickness, calculate each, and sum the volumes.</dd>" +
      "  <dt>Can I enter dimensions in feet and inches?</dt>" +
      "  <dd>Yes. Choose the unit for each dimension; the tool converts everything to metres internally.</dd>" +
      "</dl>",
      "<dl>" +
      "  <dt>هل يمكنني استخدام هذا للأعمدة الدائرية؟</dt>" +
      "  <dd>لا. هذه الأداة للمقاطع المستطيلة فقط. للأعمدة الدائرية استخدم V = π × (d/2)² × h.</dd>" +
      "  <dt>هل تتضمن النتيجة الهدر؟</dt>" +
      "  <dd>لا. النتيجة هي الحجم الهندسي الصافي. أضف 3–10% هدر حسب نوع الخلط وظروف الموقع.</dd>" +
      "  <dt>ماذا لو كانت بلاطتي ذات سماكة متغيرة؟</dt>" +
      "  <dd>قسّمها إلى مناطق مستطيلة ذات سماكة ثابتة، احسب كلاً منها، واجمع الأحجام.</dd>" +
      "  <dt>هل يمكنني إدخال الأبعاد بالأقدام والبوصات؟</dt>" +
      "  <dd>نعم. اختر الوحدة لكل بعد؛ الأداة تحوّل كل شيء إلى أمتار داخلياً.</dd>" +
      "</dl>"
    ],

    // ===================== STEEL BAR WEIGHT =====================
    calc_steel_weight_how: [
      "This calculator finds the weight of a reinforcing steel bar from its diameter and length. " +
      "The unit-weight formula is kg/m = d² / 162, where d is the bar diameter in millimetres. " +
      "This derives from the volume of a cylinder (π/4 × d² × 1 m) times steel density 7850 kg/m³: (π/4 × d² × 10⁻⁶) × 7850 = d² / 162.18 ≈ d² / 162. " +
      "Total weight = (d² / 162) × length (m). " +
      "The tool also shows weight per metre and weight in tonnes. " +
      "Use it for bar schedules, quantity take-offs, transport planning and cost estimates. " +
      "The formula assumes plain round bar; deformed bars have slightly higher weight due to ribs (typically +1–2%).",
      "تحسب هذه الحاسبة وزن قضيب حديد التسليح من قطره وطوله. " +
      "صيغة الوزن الطولي: كجم/م = d² / 162، حيث d هو قطر القضيب بالملليمتر. " +
      "مشتقة من حجم الأسطوانة (π/4 × d² × 1 م) مضروباً في كثافة الفولاذ 7850 كجم/م³: (π/4 × d² × 10⁻⁶) × 7850 = d² / 162.18 ≈ d² / 162. " +
      "الوزن الكلي = (d² / 162) × الطول (م). " +
      "تظهر الأداة أيضاً الوزن لكل متر والوزن بالطن. " +
      "استخدمها لجداول الحديد، حصر الكميات، تخطيط النقل وتقدير التكاليف. " +
      "الصيغة تفترض قضيباً دائرياً أملس؛ القضبان ذات الأضلاع أثقل قليلاً (عادة +1–2%)."
    ],
    calc_steel_weight_example: [
      "Example: 16 mm diameter bar, 12 m length. " +
      "kg/m = 16² / 162 = 256 / 162 = 1.580 kg/m. " +
      "Total weight = 1.580 × 12 = 18.96 kg. " +
      "In tonnes: 0.0190 t.",
      "مثال: قضيب قطر 16 مم، طول 12 م. " +
      "كجم/م = 16² / 162 = 256 / 162 = 1.580 كجم/م. " +
      "الوزن الكلي = 1.580 × 12 = 18.96 كجم. " +
      "بالطن: 0.0190 طن."
    ],
    calc_steel_weight_faq: [
      "<dl>" +
      "  <dt>Does this work for deformed (ribbed) bars?</dt>" +
      "  <dd>The formula assumes plain round bar. Deformed bars are about 1–2% heavier due to ribs. For precise schedules, use the manufacturer's mass-per-metre table.</dd>" +
      "  <dt>What steel density is assumed?</dt>" +
      "  <dd>7850 kg/m³, the standard density for carbon steel reinforcement.</dd>" +
      "  <dt>Can I calculate multiple bars at once?</dt>" +
      "  <dd>This tool calculates one bar size at a time. For a full schedule, calculate each size and multiply by the number of bars of that size.</dd>" +
      "  <dt>Why 162 in the denominator?</dt>" +
      "  <dd>It comes from (4/π) × (1/7850) × 10⁶ = 162.18, rounded to 162 for quick mental math.</dd>" +
      "</dl>",
      "<dl>" +
      "  <dt>هل يعمل هذا للقضبان ذات الأضلاع (المشوهة)؟</dt>" +
      "  <dd>الصيغة تفترض قضيباً دائرياً أملس. القضبان ذات الأضلاع أثقل بحوالي 1–2% بسبب الأضلاع. للجداول الدقيقة، استخدم جدول الشركة المصنعة للوزن لكل متر.</dd>" +
      "  <dt>ما كثافة الفولاذ المفترضة؟</dt>" +
      "  <dd>7850 كجم/م³، الكثافة القياسية لتسليح الفولاذ الكربوني.</dd>" +
      "  <dt>هل يمكنني حساب عدة قضبان دفعة واحدة؟</dt>" +
      "  <dd>هذه الأداة تحسب مقاساً واحداً في المرة. لجدول كامل، احسب كل مقاس واضربه في عدد القضبان من ذلك المقاس.</dd>" +
      "  <dt>لماذا 162 في المقام؟</dt>" +
      "  <dd>تأتي من (4/π) × (1/7850) × 10⁶ = 162.18، مدورة إلى 162 للحساب الذهني السريع.</dd>" +
      "</dl>"
    ],

    // ===================== COOLING LOAD =====================
    calc_cooling_load_how: [
      "This calculator estimates the total cooling load by adding sensible and latent components: Qt = Qs + Ql. " +
      "Sensible load (Qs) comes from heat gains through the building envelope (walls, roof, windows), solar radiation, people (sensible), lighting, and equipment. " +
      "Latent load (Ql) comes from moisture sources: people (latent), infiltration, ventilation, and process moisture. " +
      "The tool outputs total load in watts, kilowatts, and tons of refrigeration (TR) where 1 TR = 3.516853 kW exactly. " +
      "Use this for preliminary HVAC equipment sizing, load estimates for quotes, and checking if an existing unit is adequate. " +
      "For detailed design, a full room-by-room load calculation per ASHRAE Fundamentals or CIBSE Guide A is required.",
      "تحسب هذه الحاسبة حمل التبريد الكلي بجمع المكون المحسوس والكامن: Qt = Qs + Ql. " +
      "الحمل المحسوس (Qs) يأتي من المكتسبات الحرارية عبر الغلاف المعماري (الجدران، السقف، النوافذ)، الإشعاع الشمسي، الأشخاص (محسوس)، الإضاءة والمعدات. " +
      "الحمل الكامن (Ql) يأتي من مصادر الرطوبة: الأشخاص (كامن)، التسرب، التهوية، ورطوبة العمليات. " +
      "تعرض الأداة الحمل الكلي بالواط، الكيلوواط، وأطنان التبريد (TR) حيث 1 TR = 3.516853 كيلوواط بالضبط. " +
      "استخدمها لتحديد حجم معدات التكييف مبدئياً، تقديرات العروض، والتحقق من كفاية وحدة قائمة. " +
      "للتصميم التفصيلي، يلزم حساب حمولة غرفة بغرفة حسب ASHRAE Fundamentals أو CIBSE Guide A."
    ],
    calc_cooling_load_example: [
      "Example: An office room has sensible gains Qs = 5 kW and latent gains Ql = 1 kW. " +
      "Qt = 5 + 1 = 6 kW = 6000 W. " +
      "In TR: 6 / 3.516853 = 1.71 TR. " +
      "Select a unit rated at least 1.71 TR (typically a 2 TR unit).",
      "مثال: غرفة مكتب بمكاسب حسية Qs = 5 كيلوواط ومكاسب كامنة Ql = 1 كيلوواط. " +
      "Qt = 5 + 1 = 6 كيلوواط = 6000 واط. " +
      "بالأطنان: 6 / 3.516853 = 1.71 طن تبريد. " +
      "اختر وحدة مقننة 1.71 طن على الأقل (عادة وحدة 2 طن)."
    ],
    calc_cooling_load_faq: [
      "<dl>" +
      "  <dt>What is the difference between sensible and latent load?</dt>" +
      "  <dd>Sensible load changes air temperature. Latent load changes air moisture content (condensation). Both must be removed by the cooling coil.</dd>" +
      "  <dt>Why is the result in TR as well as kW?</dt>" +
      "  <dd>Many regions (Middle East, US) specify cooling equipment in tons of refrigeration. 1 TR = 12,000 BTU/h = 3.516853 kW exactly.</dd>" +
      "  <dt>Does this include ventilation load?</dt>" +
      "  <dd>Only if you add the ventilation sensible and latent components to Qs and Ql before entering them. The tool just adds the two numbers you provide.</dd>" +
      "  <dt>Can I use this for heating load?</dt>" +
      "  <dd>No. Heating load calculations use different assumptions (no latent component, different safety factors). Use a heating load calculator.</dd>" +
      "</dl>",
      "<dl>" +
      "  <dt>ما الفرق بين الحمل المحسوس والكامن؟</dt>" +
      "  <dd>الحمل المحسوس يغيّر حرارة الهواء. الحمل الكامن يغيّر محتوى الرطوبة (التكاثف). كلاهما يجب إزالتهما بملف التبريد.</dd>" +
      "  <dt>لماذا النتيجة بالأطنان والكيلوواط؟</dt>" +
      "  <dd>كثير من المناطق (الشرق الأوسط، الولايات المتحدة) تحدد معدات التبريد بأطنان التبريد. 1 طن = 12,000 وحدة حرارية/ساعة = 3.516853 كيلوواط بالضبط.</dd>" +
      "  <dt>هل يتضمن حمل التهوية؟</dt>" +
      "  <dd>فقط إذا أضفت مكونات التهوية المحسوسة والكامنة إلى Qs و Ql قبل إدخالهما. الأداة تجمع الرقمين المدخلين فقط.</dd>" +
      "  <dt>هل يمكنني استخدام هذا لحمل التدفئة؟</dt>" +
      "  <dd>لا. حسابات حمل التدفئة تستخدم افتراضات مختلفة (لا مكون كامن، عوامل أمان مختلفة). استخدم حاسبة حمل التدفئة.</dd>" +
      "</dl>"
    ],

    // ===================== PUMP POWER =====================
    calc_pump_how: [
      "This calculator computes pump hydraulic power and shaft power from flow rate and head. " +
      "Hydraulic power P_hyd = ρ × g × Q × H, where ρ is fluid density (kg/m³), g = 9.81 m/s², Q is volumetric flow (m³/s), and H is total head (m). " +
      "Shaft power P_shaft = P_hyd ÷ η, where η is pump efficiency (per-unit, e.g., 0.75 for 75%). " +
      "The pressure-to-head tool converts a pressure reading to head: H = p / (ρ × g), treating the input as gauge pressure. " +
      "Use this to size pump motors, check operating points against pump curves, and verify energy consumption. " +
      "The result assumes water at ~20 °C (ρ ≈ 1000 kg/m³) unless you change density.",
      "تحسب هذه الحاسبة القدرة الهيدروليكية للمضخة وقوة العمود من معدل التدفق والارتفاع. " +
      "القدرة الهيدروليكية P_hyd = ρ × g × Q × H، حيث ρ كثافة السائل (كجم/م³)، g = 9.81 م/ث²، Q التدفق الحجمي (م³/ث)، و H الارتفاع الكلي (م). " +
      "قوة العمود P_shaft = P_hyd ÷ η، حيث η كفاءة المضخة (واحدية، مثل 0.75 لـ 75%). " +
      "أداة تحويل الضغط إلى ارتفاع: H = p / (ρ × g)، معاملة الضغط كضغط قياسي (gauge). " +
      "استخدمها لتحديد حجم محرك المضخة، فحص نقطة التشغيل مقابل منحنيات المضخة، والتحقق من استهلاك الطاقة. " +
      "النتيجة تفترض ماء عند ~20 °م (ρ ≈ 1000 كجم/م³) ما لم تغير الكثافة."
    ],
    calc_pump_example: [
      "Example: Flow = 10 L/s = 0.01 m³/s, head = 30 m, water density = 1000 kg/m³, efficiency = 75%. " +
      "P_hyd = 1000 × 9.81 × 0.01 × 30 = 2943 W = 2.943 kW. " +
      "P_shaft = 2.943 ÷ 0.75 = 3.924 kW. " +
      "Select a motor rated ≥ 4 kW (typically 4 kW or 5.5 kW standard frame).",
      "مثال: تدفق = 10 لتر/ث = 0.01 م³/ث، ارتفاع = 30 م، كثافة الماء = 1000 كجم/م³، كفاءة = 75%. " +
      "P_hyd = 1000 × 9.81 × 0.01 × 30 = 2943 واط = 2.943 كيلوواط. " +
      "P_shaft = 2.943 ÷ 0.75 = 3.924 كيلوواط. " +
      "اختر محركاً مقنن ≥ 4 كيلوواط (عادة 4 أو 5.5 كيلوواط إطار قياسي)."
    ],
    calc_pump_faq: [
      "<dl>" +
      "  <dt>What is the difference between hydraulic and shaft power?</dt>" +
      "  <dd>Hydraulic power is the energy imparted to the fluid. Shaft power is the mechanical power the motor must deliver to the pump shaft; it is higher due to pump losses (efficiency < 100%).</dd>" +
      "  <dt>Can I use this for fluids other than water?</dt>" +
      "  <dd>Yes. Enter the fluid density (e.g., 850 kg/m³ for light oil, 1200 kg/m³ for some slurries). The head in metres is independent of density; power scales with density.</dd>" +
      "  <dt>What if I have pressure in bar instead of head in metres?</dt>" +
      "  <dd>Use the pressure-to-head variant: H = p / (ρ × g). For water at 1 bar gauge ≈ 10.2 m head.</dd>" +
      "  <dt>Does this include motor efficiency?</dt>" +
      "  <dd>No. Shaft power is the power at the pump shaft. Motor input power = shaft power ÷ motor efficiency (typically 0.90–0.95).</dd>" +
      "</dl>",
      "<dl>" +
      "  <dt>ما الفرق بين القدرة الهيدروليكية وقوة العمود؟</dt>" +
      "  <dd>القدرة الهيدروليكية هي الطاقة المنقولة للسائل. قوة العمود هي القدرة الميكانيكية التي يجب أن يسلمها المحرك لعمود المضخة؛ هي أعلى بسبب فاقد المضخة (الكفاءة < 100%).</dd>" +
      "  <dt>هل يمكنني استخدام هذا لسوائل غير الماء؟</dt>" +
      "  <dd>نعم. أدخل كثافة السائل (مثلاً 850 كجم/م³ للزيت الخفيف، 1200 كجم/م³ لبعض الملاط). الارتفاع بالأمتار مستقل عن الكثافة؛ القدرة تتناسب مع الكثافة.</dd>" +
      "  <dt>ماذا لو كان لدي ضغط بالبار بدلاً من الارتفاع بالأمتار؟</dt>" +
      "  <dd>استخدم متغير الضغط إلى ارتفاع: H = p / (ρ × g). للماء عند 1 بار قياسي ≈ 10.2 م ارتفاع.</dd>" +
      "  <dt>هل يتضمن هذا كفاءة المحرك؟</dt>" +
      "  <dd>لا. قوة العمود هي القدرة عند عمود المضخة. قدرة دخول المحرك = قوة العمود ÷ كفاءة المحرك (عادة 0.90–0.95).</dd>" +
      "</dl>"
    ],

    // ===================== UNIT CONVERTER =====================
    calc_unit_converter_how: [
      "This converter handles length, area, volume, pressure, flow, temperature, power and weight. " +
      "Each non-temperature quantity uses a fixed conversion factor to a base SI unit (e.g., 1 ft = 0.3048 m exactly, 1 psi = 6894.757 Pa exactly). " +
      "The result is value × (factor_from ÷ factor_to). " +
      "Temperature uses offset formulas because Celsius, Fahrenheit and Kelvin do not share a zero point: " +
      "°C = (°F − 32) × 5/9, K = °C + 273.15, °F = °C × 9/5 + 32. " +
      "All factors are from NIST or exact definitions. The tool shows the exact factor used for traceability. " +
      "Use it for quick engineering unit conversions without looking up tables.",
      "يحوي هذا المحوّل الطول، المساحة، الحجم، الضغط، التدفق، درجة الحرارة، القدرة والوزن. " +
      "كل كمية غير الحرارة تستخدم معامل تحويل ثابت إلى وحدة SI أساسية (مثلاً 1 قدم = 0.3048 م بالضبط، 1 psi = 6894.757 باسكال بالضبط). " +
      "النتيجة = القيمة × (معامل_من ÷ معامل_إلى). " +
      "تستخدم الحرارة معادلات الإزاحة لأن مئوية، فهرنهايت وكلفن لا تشترك في نقطة صفر: " +
      "°م = (°ف − 32) × 5/9، K = °م + 273.15، °ف = °م × 9/5 + 32. " +
      "جميع المعاملات من NIST أو تعريفات دقيقة. الأداة تظهر المعامل الدقيق المستخدم للتتبع. " +
      "استخدمها لتحويلات هندسية سريعة دون الرجوع للجداول."
    ],
    calc_unit_converter_example: [
      "Example: Convert 1 ft to metres. " +
      "Base factors: 1 ft = 0.3048 m (exact), 1 m = 1 m. " +
      "Factor = 0.3048 ÷ 1 = 0.3048. " +
      "Result = 1 × 0.3048 = 0.3048 m.",
      "مثال: تحويل 1 قدم إلى أمتار. " +
      "معاملات الأساس: 1 قدم = 0.3048 م (دقيق)، 1 م = 1 م. " +
      "المعامل = 0.3048 ÷ 1 = 0.3048. " +
      "النتيجة = 1 × 0.3048 = 0.3048 م."
    ],
    calc_unit_converter_faq: [
      "<dl>" +
      "  <dt>Why does temperature not use a simple ratio?</dt>" +
      "  <dd>Celsius, Fahrenheit and Kelvin have different zero points. 0 °C = 273.15 K = 32 °F. A ratio works only when zero is shared (e.g., length, weight).</dd>" +
      "  <dt>Are the conversion factors exact?</dt>" +
      "  <dd>Most are exact definitions (e.g., 1 inch = 25.4 mm exactly). Some are defined values (e.g., 1 psi = 6894.757 Pa exactly). The tool uses NIST values.</dd>" +
      "  <dt>Can I convert between mass and force (kg to N)?</dt>" +
      "  <dd>No. This tool converts within the same physical quantity. Mass (kg) and force (N) are different quantities; use F = m × g with g = 9.81 m/s².</dd>" +
      "  <dt>What flow units are supported?</dt>" +
      "  <dd>L/s, m³/h, m³/s, GPM (US), CFM, and more. Select 'Flow' as the quantity.</dd>" +
      "</dl>",
      "<dl>" +
      "  <dt>لماذا لا تستخدم الحرارة نسبة بسيطة؟</dt>" +
      "  <dd>مئوية، فهرنهايت وكلفن لها نقاط صفر مختلفة. 0 °م = 273.15 K = 32 °ف. النسبة تعمل فقط عند مشاركة نقطة الصفر (مثلاً الطول، الوزن).</dd>" +
      "  <dt>هل معاملات التحويل دقيقة؟</dt>" +
      "  <dd>معظمها تعريفات دقيقة (مثلاً 1 بوصة = 25.4 مم بالضبط). بعضها قيم محددة (مثلاً 1 psi = 6894.757 باسكال بالضبط). الأداة تستخدم قيم NIST.</dd>" +
      "  <dt>هل يمكنني التحويل بين الكتلة والقوة (كجم إلى نيوتن)؟</dt>" +
      "  <dd>لا. هذه الأداة تحوّل ضمن نفس الكمية الفيزيائية. الكتلة (كجم) والقوة (نيوتن) كميتان مختلفتان؛ استخدم F = m × g مع g = 9.81 م/ث².</dd>" +
      "  <dt>ما وحدات التدفق المدعومة؟</dt>" +
      "  <dd>لتر/ث، م³/س، م³/ث، جالون/دقيقة (أمريكي)، قدم³/دقيقة، والمزيد. اختر 'التدفق' ككمية.</dd>" +
      "</dl>"
    ],

    // ===================== GENERATOR SIZE =====================
    calc_generator_size_how: [
      "This calculator sizes a standby generator in kVA from the total connected load in kW and a sizing factor (reserve margin). " +
      "Apparent power S (kVA) = P (kW) × sf, where sf is the sizing factor (typically 1.1–1.3 for commercial, 1.25–1.5 for industrial with motor starting). " +
      "The factor accounts for power factor (kW ≠ kVA), motor starting transients, future load growth, and harmonics. " +
      "The tool outputs the minimum generator apparent power in kVA. " +
      "Use it for preliminary generator selection, budget estimates, and checking if an existing genset can handle a new load. " +
      "For final sizing, perform a motor-starting study (voltage dip) and harmonic analysis per ISO 8528 and the genset manufacturer's data.",
      "تحسب هذه الحاسبة حجم المولد الاحتياطي بالكيلوفولت أمبير من إجمالي الحمل الموصل بالكيلوواط ومعامل تحديد الحجم (هامش احتياطي). " +
      "القدرة الظاهرية S (كيلوفولت أمبير) = P (كيلوواط) × sf، حيث sf معامل التحديد (عادة 1.1–1.3 للتجاري، 1.25–1.5 للصناعي مع بدء المحركات). " +
      "المعامل يراعي معامل القدرة (كيلوواط ≠ كيلوفولت أمبير)، حالات بدء المحركات، نمو الحمل المستقبلي، والهارمونيك. " +
      "تخرج الأداة أدنى قدرة ظاهرية للمولد بالكيلوفولت أمبير. " +
      "استخدمها للاختيار المبدئي للمولد، تقديرات الميزانية، والتحقق من قدرة مولد قائم على حمل جديد. " +
      "للتحديد النهائي، أجرِ دراسة بدء محركات (هبوط جهد) وتحليل هارمونيك حسب ISO 8528 وبيانات مصنع المولد."
    ],
    calc_generator_size_example: [
      "Example: Total connected load = 50 kW, sizing factor = 1.25. " +
      "S = 50 × 1.25 = 62.5 kVA. " +
      "Select a genset rated ≥ 62.5 kVA (typically 65 kVA or 75 kVA standard rating).",
      "مثال: إجمالي الحمل الموصل = 50 كيلوواط، معامل تحديد = 1.25. " +
      "S = 50 × 1.25 = 62.5 كيلوفولت أمبير. " +
      "اختر مولداً مقنن ≥ 62.5 كيلوفولت أمبير (عادة 65 أو 75 كيلوفولت أمبير تصنيف قياسي)."
    ],
    calc_generator_size_faq: [
      "<dl>" +
      "  <dt>Why is the result in kVA not kW?</dt>" +
      "  <dd>Generators are rated by apparent power (kVA) because they must supply both real (kW) and reactive (kVAR) power. The power factor of the load determines the kW/kVA ratio.</dd>" +
      "  <dt>What sizing factor should I use?</dt>" +
      "  <dd>1.25 is common for mixed loads with motors. Use 1.1 for mostly resistive/lighting loads. Use 1.3–1.5 for heavy motor starting or large future growth. Consult the genset manufacturer.</dd>" +
      "  <dt>Does this account for motor starting voltage dip?</dt>" +
      "  <dd>No. This is a steady-state sizing only. Motor starting can cause 15–30% voltage dip. A motor-starting study is required for final selection.</dd>" +
      "  <dt>Can I use this for prime power (continuous) applications?</dt>" +
      "  <dd>The formula is the same, but prime power ratings are typically 10% lower than standby. Check the manufacturer's prime vs. standby rating.</dd>" +
      "</dl>",
      "<dl>" +
      "  <dt>لماذا النتيجة بالكيلوفولت أمبير لا بالكيلوواط؟</dt>" +
      "  <dd>المولدات مقننة بالقدرة الظاهرية (كيلوفولت أمبير) لأنها يجب أن تزود كلاً من القدرة الفعالة (كيلوواط) وغير الفعالة (كيلوفولت أمبير تفاعلي). معامل قدرة الحمل يحدد نسبة كيلوواط/كيلوفولت أمبير.</dd>" +
      "  <dt>ما معامل التحديد الذي يجب استخدامه؟</dt>" +
      "  <dd>1.25 شائع للأحمال المختلطة مع محركات. استخدم 1.1 للأحمال المقاومة/الإضاءة غالباً. استخدم 1.3–1.5 لبدء محركات ثقيل أو نمو مستقبلي كبير. راجع مصنع المولد.</dd>" +
      "  <dt>هل يراعي هذا هبوط جهد بدء المحركات؟</dt>" +
      "  <dd>لا. هذا تحديد حجم للحالة المستقرة فقط. بدء المحركات يمكن أن يسبب هبوط جهد 15–30%. دراسة بدء محركات مطلوبة للاختيار النهائي.</dd>" +
      "  <dt>هل يمكنني استخدام هذا لتطبيقات القدرة الأساسية (المستمرة)؟</dt>" +
      "  <dd>الصيغة نفسها، لكن تصنيفات القدرة الأساسية عادة أقل 10% من الاحتياطي. تحقق من تصنيف المصنع للاحتياطي مقابل الأساسي.</dd>" +
      "</dl>"
    ],

    // ===================== SOLAR ARRAY =====================
    calc_solar_array_how: [
      "This calculator sizes a photovoltaic array: number of panels and total area from daily energy need, peak sun hours and system performance ratio. " +
      "DC array power P_dc (kWp) = E / (PSH × PR), where E is daily energy need (kWh/day), PSH is peak sun hours (kWh/m²/day), and PR is performance ratio (typically 0.70–0.80). " +
      "Number of panels n = ceil(P_dc / P_panel), where P_panel is the rated panel power (kWp). " +
      "Total area ≈ n × panel_area (typical 60-cell panel ≈ 1.7 m², 72-cell ≈ 2.0 m²). " +
      "Use this for preliminary PV system sizing, roof area checks, and budget estimates. " +
      "For final design, perform shading analysis, string sizing to inverter MPPT window, and cable loss calculations per IEC 62548.",
      "تحسب هذه الحاسبة أبعاد المصفوفة الكهروضوئية: عدد الألواح والمساحة الكلية من الاحتياج اليومي للطاقة، ساعات الشمس الذروية، ونسبة أداء النظام. " +
      "قدرة المصفوفة المستمرة P_dc (كيلوواط ذروة) = E / (PSH × PR)، حيث E الاحتياج اليومي (كيلوواط ساعة/يوم)، PSH ساعات الشمس الذروية (كيلوواط ساعة/م²/يوم)، و PR نسبة الأداء (عادة 0.70–0.80). " +
      "عدد الألواح n = ceil(P_dc / P_panel)، حيث P_panel القدرة المقننة للوحة (كيلوواط ذروة). " +
      "المساحة الكلية ≈ n × مساحة_اللوحة (لوحة 60 خلية نموذجية ≈ 1.7 م²، 72 خلية ≈ 2.0 م²). " +
      "استخدمها لتحديد حجم نظام PV مبدئياً، فحص مساحة السقف، وتقديرات الميزانية. " +
      "للتصميم النهائي، أجرِ تحليل تظليل، تحديد السلاسل لنافذة MPPT للعاكس، وحسابات فاقد الكابلات حسب IEC 62548."
    ],
    calc_solar_array_example: [
      "Example: Daily need E = 10 kWh, PSH = 5.0, PR = 0.75, panel = 400 W (0.4 kWp). " +
      "P_dc = 10 / (5.0 × 0.75) = 2.667 kWp. " +
      "n = ceil(2.667 / 0.4) = ceil(6.67) = 7 panels. " +
      "Area ≈ 7 × 1.7 = 11.9 m².",
      "مثال: احتياج يومي E = 10 كيلوواط ساعة، PSH = 5.0، PR = 0.75، لوحة = 400 واط (0.4 كيلوواط ذروة). " +
      "P_dc = 10 / (5.0 × 0.75) = 2.667 كيلوواط ذروة. " +
      "n = ceil(2.667 / 0.4) = ceil(6.67) = 7 ألواح. " +
      "المساحة ≈ 7 × 1.7 = 11.9 م²."
    ],
    calc_solar_array_faq: [
      "<dl>" +
      "  <dt>What are peak sun hours (PSH)?</dt>" +
      "  <dd>PSH is the equivalent hours per day at 1000 W/m² irradiance. It equals the daily insolation in kWh/m²/day. Typical values: 4–6 in sunny regions, 2–3 in cloudy regions.</dd>" +
      "  <dt>What is the performance ratio (PR)?</dt>" +
      "  <dd>PR is the ratio of actual AC output to theoretical DC output under STC. It includes inverter losses, cable losses, temperature losses, soiling, etc. Typical 0.70–0.80.</dd>" +
      "  <dt>Why do you round up the number of panels?</dt>" +
      "  <dd>You cannot buy a fraction of a panel. Rounding up ensures the array meets or exceeds the energy target.</dd>" +
      "  <dt>Does this include battery storage?</dt>" +
      "  <dd>No. This is for grid-tied or direct-use PV only. Battery sizing requires autonomy days, depth of discharge, and inverter/charger efficiency.</dd>" +
      "</dl>",
      "<dl>" +
      "  <dt>ما هي ساعات الشمس الذروية (PSH)؟</dt>" +
      "  <dd>PSH هي الساعات المكافئة يومياً عند إشعاع 1000 واط/م². تساوي الإشعاع اليومي بالكيلوواط ساعة/م²/يوم. قيم نموذجية: 4–6 في المناطق المشمسة، 2–3 في المناطق الملبدة.</dd>" +
      "  <dt>ما هي نسبة الأداء (PR)؟</dt>" +
      "  <dd>PR هي نسبة الخرج الفعلي AC إلى الخرج النظري DC تحت ظروف STC. تتضمن فاقد العاكس، الكابلات، الحرارة، الاتساخ، إلخ. نموذجية 0.70–0.80.</dd>" +
      "  <dt>لماذا تُقرب عدد الألواح للأعلى؟</dt>" +
      "  <dd>لا يمكن شراء كسر من لوحة. التقريب للأعلى يضمن أن المصفوفة تحقق أو تتجاوز هدف الطاقة.</dd>" +
      "  <dt>هل يتضمن هذا تخزين البطارية؟</dt>" +
      "  <dd>لا. هذا للربط بالشبكة أو الاستخدام المباشر فقط. تحديد حجم البطارية يتطلب أيام استقلالية، عمق تفريغ، وكفاءة العاكس/الشاحن.</dd>" +
      "</dl>"
    ],

    // ===================== BEAM DEFLECTION =====================
    calc_beam_deflection_how: [
      "This calculator finds the midspan deflection of a simply supported, prismatic, linear-elastic beam under a uniformly distributed load (UDL) or a midspan point load. " +
      "UDL: δ = 5 w L⁴ / (384 E I). Point load at midspan: δ = P L³ / (48 E I). " +
      "L = span (m), w = uniform load (kN/m), P = point load (kN), E = elastic modulus (GPa), I = second moment of area (mm⁴ or cm⁴ or m⁴ — choose unit). " +
      "The result is in millimetres. A serviceability reference limit of span ÷ 360 is shown for comparison (common in EN 1992, ACI 318, BS 8110 for total deflection). " +
      "Use this for quick deflection checks on floor beams, roof joists, bridge decks and gantry girders. " +
      "Assumes small deflections, elastic material, no shear deformation, no creep/shrinkage (concrete), and no composite action.",
      "تحسب هذه الحاسبة هبوط منتصف الكمرة بسيطة الارتكاز، المنشورية، المرنة خطياً تحت حمل موزع منتظم (UDL) أو حمل مركّز في المنتصف. " +
      "حمل منتظم: δ = 5 w L⁴ / (384 E I). حمل مركّز في المنتصف: δ = P L³ / (48 E I). " +
      "L = البحر (م)، w = الحمل الموزع (كيلونيوتن/م)، P = الحمل المركّز (كيلونيوتن)، E = معامل المرونة (جيجا باسكال)، I = عزم القصور الذاتي (مم⁴ أو سم⁴ أو م⁴ — اختر الوحدة). " +
      "النتيجة بالملليمتر. يُعرض حد مرجعي للصلاحية هو البحر ÷ 360 للمقارنة (شائع في EN 1992، ACI 318، BS 8110 للهبوط الكلي). " +
      "استخدمها لفحص هبوط سريع لكمرات الأسقف، كمرات الأرضيات، أسطح الكباري، وكمرات الرافعات. " +
      "تفترض هبوطاً صغيراً، مادة مرنة، لا تشوه قص، لا زحف/انكماش (خرسانة)، ولا فعل مركب."
    ],
    calc_beam_deflection_example: [
      "Example: Simply supported steel beam, span L = 6 m, UDL w = 10 kN/m, E = 200 GPa, I = 80 × 10⁶ mm⁴. " +
      "I in m⁴ = 80 × 10⁶ × 10⁻¹² = 8.0 × 10⁻⁵ m⁴. " +
      "δ = 5 × 10 × 6⁴ / (384 × 200 × 10⁹ × 8.0 × 10⁻⁵) = 0.01055 m = 10.55 mm. " +
      "Reference limit = 6000 / 360 = 16.67 mm. Deflection is within limit.",
      "مثال: كمرة فولاذ بسيطة الارتكاز، بحر L = 6 م، حمل منتظم w = 10 كيلونيوتن/م، E = 200 جيجا باسكال، I = 80 × 10⁶ مم⁴. " +
      "I بالم⁴ = 80 × 10⁶ × 10⁻¹² = 8.0 × 10⁻⁵ م⁴. " +
      "δ = 5 × 10 × 6⁴ / (384 × 200 × 10⁹ × 8.0 × 10⁻⁵) = 0.01055 م = 10.55 مم. " +
      "الحد المرجعي = 6000 / 360 = 16.67 مم. الهبوط ضمن الحد."
    ],
    calc_beam_deflection_faq: [
      "<dl>" +
      "  <dt>Can I use this for cantilever beams?</dt>" +
      "  <dd>No. This tool is for simply supported beams only. Cantilever deflection formulas are different (δ = wL⁴/8EI for UDL, δ = PL³/3EI for tip load).</dd>" +
      "  <dt>What is the span ÷ 360 limit?</dt>" +
      "  <dd>A common serviceability deflection limit for floors and roofs in many codes (EN 1992, ACI 318, BS 8110). It is not a universal limit; check your governing code for the applicable limit (span/250, span/300, span/360, etc.).</dd>" +
      "  <dt>Does this include self-weight?</dt>" +
      "  <dd>No. Enter the total UDL including self-weight, or add self-weight to w before calculating.</dd>" +
      "  <dt>Can I use I in cm⁴?</dt>" +
      "  <dd>Yes. Select 'cm⁴' from the I unit dropdown. The tool converts to m⁴ internally (1 cm⁴ = 10⁻⁸ m⁴).</dd>" +
      "</dl>",
      "<dl>" +
      "  <dt>هل يمكنني استخدام هذا للكمرات المعلقة؟</dt>" +
      "  <dd>لا. هذه الأداة للكمرات بسيطة الارتكاز فقط. صيغ هبوط الكمرات المعلقة مختلفة (δ = wL⁴/8EI للحمل المنتظم، δ = PL³/3EI للحمل الطرفي).</dd>" +
      "  <dt>ما هو حد البحر ÷ 360؟</dt>" +
      "  <dd>حد هبوط شائع للصلاحية للأرضيات والأسقف في كثير من الكودات (EN 1992، ACI 318، BS 8110). ليس حداً عاماً؛ راجع الكود الحاكم للحد المطبق (بحر/250، بحر/300، بحر/360، إلخ).</dd>" +
      "  <dt>هل يتضمن الوزن الذاتي؟</dt>" +
      "  <dd>لا. أدخل الحمل الموزع الكلي متضمناً الوزن الذاتي، أو أضف الوزن الذاتي إلى w قبل الحساب.</dd>" +
      "  <dt>هل يمكنني استخدام I بالسم⁴؟</dt>" +
      "  <dd>نعم. اختر 'سم⁴' من قائمة وحدة I. الأداة تحوّل إلى م⁴ داخلياً (1 سم⁴ = 10⁻⁸ م⁴).</dd>" +
      "</dl>"
    ]

  });
})();