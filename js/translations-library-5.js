/* Translation strings for calculator library batch 5. */
(function () {
  "use strict";
  var TEKNO = window.TEKNO;
  if (!TEKNO || !TEKNO.keys) return;
  Object.assign(TEKNO.keys, {

    // Room AC sizing
    calc_room_ac_title: ["Room AC Sizing Calculator", "حاسبة حجم التكييف للغرفة"],
    calc_room_ac_desc: ["Estimate the cooling capacity a room needs in BTU/h and HP from its area, sun exposure, insulation, occupancy and floor.", "قدّر قدرة التبريد التي تحتاجها الغرفة بوحدة BTU/h والحصان من مساحتها والتعرض للشمس والعزل وعدد الأشخاص والدور."],
    calc_room_ac_about: ["Rule-of-thumb estimate: 550 BTU/h per square metre, adjusted for sun exposure, insulation quality, people beyond two, and a top-floor roof. The HP figure uses the Egyptian market convention (1 HP = 8000 BTU/h). Always confirm with a proper cooling-load calculation for large or critical spaces.", "تقدير استرشادي: 550 وحدة حرارية بريطانية/ساعة لكل متر مربع، مع تعديله حسب التعرض للشمس وجودة العزل وعدد الأشخاص بعد أول شخصين والدور الأخير. قيمة الحصان تتبع المتعارف عليه في السوق المصري (1 حصان = 8000 وحدة/ساعة). للمساحات الكبيرة أو الحرجة، راجع حساب حمل تبريد تفصيلي."],
    f_room_area: ["Room area", "مساحة الغرفة"],
    f_sun_exp: ["Sun exposure", "التعرض للشمس"],
    f_insul_q: ["Insulation quality", "جودة العزل"],
    f_people: ["People in the room", "عدد الأشخاص"],
    f_top_floor: ["Top floor (roof above)", "الدور الأخير (سطح فوق الغرفة)"],
    lib_opt_sun_low: ["Shaded / north-facing", "مظللة / شمالية"],
    lib_opt_sun_avg: ["Average", "متوسط"],
    lib_opt_sun_high: ["Strong sun / west-facing", "شمس قوية / غربية"],
    lib_opt_ins_good: ["Good", "جيد"],
    lib_opt_ins_avg: ["Average", "متوسط"],
    lib_opt_ins_poor: ["Poor / none", "ضعيف / معدوم"],
    lib_opt_no: ["No", "لا"],
    lib_opt_yes: ["Yes", "نعم"],
    res_rec_unit: ["Recommended unit", "الوحدة المقترحة"],
    res_btu_req: ["Required capacity", "القدرة المطلوبة"],
    res_tr_ac: ["In tons of refrigeration", "بالطن التبريدي"],
    res_kw_ac: ["In kilowatts", "بالكيلوواط"],
    res_hp_ac: ["Approx. HP (8000 BTU/h each)", "بالحصان تقريباً (8000 وحدة/حصان)"],
    lib_as_ac: ["Estimate only: 550 BTU/h per m² base, factors for sun, insulation, occupancy and top floor. HP here is the Egyptian nominal market class at about 8000 BTU/h each. The recommended size's HP is the nominal market name and can differ from the exact 8000-ratio figure (e.g. 30000 BTU/h is sold as 4 HP, which is 3.75 by exact ratio).", "تقدير استرشادي فقط: أساس 550 وحدة/ساعة لكل م² مع عوامل للشمس والعزل والأشخاص والدور الأخير. الحصان هنا هو التصنيف السوقي الاسمي المتعارف عليه في مصر بحوالي 8000 وحدة/ساعة للحصان. حصان الوحدة المقترحة هو الاسم السوقي الاسمي وقد يختلف عن ناتج قسمة 8000 بالضبط (مثلاً 30000 وحدة/ساعة تُباع كـ 4 حصان، وهي 3.75 بالنسبة الدقيقة)."],

    // Cable size (IEC 60364-5-52)
    calc_cable_size_title: ["Cable Size Calculator (IEC 60364)", "حاسبة مقطع الكابل (IEC 60364)"],
    calc_cable_size_desc: ["Select the copper cable cross-section from the load current, installation method and ambient temperature per IEC 60364-5-52.", "اختر مقطع الكابل النحاسي من تيار الحمل وطريقة التمديد ودرجة حرارة الجو وفق المواصفة IEC 60364-5-52."],
    calc_cable_size_about: ["Ampacities from IEC 60364-5-52:2009 Table B.52.4 (copper, PVC 70 °C, three loaded conductors — conservative for single-phase) with the Table B.52.14 ambient-temperature correction. This checks ampacity only; always verify voltage drop with the Cable Voltage Drop calculator and coordinate with the breaker rating.", "سعات التيار من الجدول B.52.4 في المواصفة IEC 60364-5-52:2009 (نحاس، عزل PVC بدرجة 70°، ثلاثة موصلات محملة — وهو متحفظ للأحادية الفاز) مع معامل تصحيح درجة حرارة الجو من الجدول B.52.14. هذا الفحص للسعة الحرارية فقط؛ تحقق دائماً من هبوط الجهد بحاسبة هبوط الجهد ونسّق مع سعة القاطع."],
    f_load_current: ["Load current (A)", "تيار الحمل (أمبير)"],
    f_method: ["Installation method", "طريقة التمديد"],
    f_ambient: ["Ambient temperature", "درجة حرارة الجو"],
    lib_opt_m_a1: ["A1: conductors in conduit in insulated wall", "A1: موصلات في ماسورة داخل حائط معزول"],
    lib_opt_m_b1: ["B1: conductors in conduit on a wall", "B1: موصلات في ماسورة على حائط"],
    lib_opt_m_b2: ["B2: multicore cable in conduit on a wall", "B2: كابل متعدد النوى في ماسورة على حائط"],
    lib_opt_m_c: ["C: cable clipped directly on a wall", "C: كابل مثبت مباشرة على حائط"],
    lib_opt_t25: ["25 °C", "٢٥ °م"],
    lib_opt_t30: ["30 °C", "٣٠ °م"],
    lib_opt_t35: ["35 °C", "٣٥ °م"],
    lib_opt_t40: ["40 °C", "٤٠ °م"],
    lib_opt_t45: ["45 °C", "٤٥ °م"],
    lib_opt_t50: ["50 °C", "٥٠ °م"],
    res_cable_size: ["Required cross-section", "المقطع المطلوب"],
    res_icorr: ["Corrected current", "التيار بعد التصحيح"],
    res_ampacity: ["Ampacity of chosen size", "سعة المقطع المختار"],
    lib_err_cable: ["Load exceeds 300 mm²; use parallel runs or busbar.", "الحمل يتجاوز ٣٠٠ مم²؛ استخدم موصلات متوازية أو قضبان توزيع."],
    lib_as_cable: ["IEC 60364-5-52:2009 Table B.52.4, copper PVC 70 °C, 3 loaded conductors, with Table B.52.14 air-temperature correction. Ampacity only.", "المواصفة IEC 60364-5-52:2009 الجدول B.52.4 (نحاس PVC بدرجة 70°، ٣ موصلات محملة) مع تصحيح حرارة الجو من الجدول B.52.14. سعة حرارية فقط."],

    // Concrete quantities
    calc_concrete_mix_title: ["Concrete Quantities Calculator", "حاسبة كميات الخرسانة"],
    calc_concrete_mix_desc: ["Cement bags, sand and gravel for a concrete volume at a chosen nominal mix ratio.", "شكاير الأسمنت والرمل والزلط لحجم خرسانة معين بنسبة خلط اختيارية."],
    calc_concrete_mix_about: ["Nominal volumetric mixes (for example 1:2:4). Dry volume is taken as 1.54 times the wet volume; cement at 1440 kg/m³ in 50 kg bags. Add your own waste allowance on site.", "نسب خلط حجمية اعتيادية (مثل 1:2:4). الحجم الجاف يساوي 1.54 ضعف الحجم الطازج؛ الأسمنت بكثافة 1440 كجم/م³ في شكاير 50 كجم. أضف نسبة الهالك المناسبة في الموقع."],
    f_volume: ["Concrete volume", "حجم الخرسانة"],
    f_mix: ["Mix ratio (cement:sand:gravel)", "نسبة الخلط (أسمنت:رمل:زلط)"],
    lib_opt_mix_136: ["1:3:6 (plain/lean)", "1:3:6 (خرسانة عادية)"],
    lib_opt_mix_124: ["1:2:4 (common reinforced)", "1:2:4 (مسلحة شائعة)"],
    lib_opt_mix_1153: ["1:1.5:3 (strong)", "1:1.5:3 (قوية)"],
    lib_opt_mix_112: ["1:1:2 (very strong)", "1:1:2 (قوية جداً)"],
    res_bags: ["Cement (50 kg bags)", "الأسمنت (شكاير ٥٠ كجم)"],
    res_cement: ["Cement weight", "وزن الأسمنت"],
    res_sand: ["Sand", "الرمل"],
    res_gravel: ["Gravel", "الزلط"],
    lib_as_mix: ["Nominal volumetric mix, dry factor 1.54, cement 1440 kg/m³, 50 kg bags; no waste or slump adjustment.", "خلط حجمي اعتيادي، معامل جفاف 1.54، أسمنت 1440 كجم/م³، شكاير 50 كجم؛ بدون هالك أو تعديل هبوط."],

    // Inverter / UPS sizing
    calc_inverter_size_title: ["Inverter & Battery Sizing Calculator", "حاسبة الانفرتر والبطاريات"],
    calc_inverter_size_desc: ["Size an inverter and battery bank from the home load and the backup hours needed.", "حدد سعة الانفرتر وبنك البطاريات من أحمال المنزل وساعات التشغيل المطلوبة."],
    calc_inverter_size_about: ["Inverter VA = load ÷ 0.8 power factor × 1.25 margin. Battery amp-hours = load × hours ÷ (system voltage × depth of discharge × 0.9 efficiency). Lead-acid at 50% DoD, lithium at 80% DoD.", "سعة الانفرتر = الحمل ÷ معامل قدرة 0.8 × معامل أمان 1.25. أمبير.ساعة البطاريات = الحمل × الساعات ÷ (جهد النظام × عمق التفريغ × كفاءة 0.9). للرصاص الحمضي 50% تفريغ، وللليثيوم 80%."],
    f_load_power_w: ["Total load", "الحمل الكلي"],
    f_backup_hours: ["Backup hours", "ساعات التشغيل المطلوبة"],
    f_sys_volt: ["Battery system voltage", "جهد نظام البطاريات"],
    f_batt_type: ["Battery type (depth of discharge)", "نوع البطارية (عمق التفريغ)"],
    f_pipe_len: ["Length", "الطول"],
    lib_opt_dod50: ["Lead-acid (50%)", "رصاص حمضي (50%)"],
    lib_opt_dod80: ["Lithium (80%)", "ليثيوم (80%)"],
    res_inverter: ["Recommended inverter", "الانفرتر المقترح"],
    res_va_req: ["Required inverter size", "السعة المطلوبة"],
    res_energy: ["Energy to store", "الطاقة المطلوب تخزينها"],
    res_battery_ah: ["Battery capacity", "سعة البطاريات"],
    res_batt_100: ["As 100 Ah batteries", "ما يعادل بطاريات 100 أمبير.ساعة"],
    lib_as_inv: ["PF 0.8, 25% margin, battery efficiency 90%; standard inverter sizes 600 VA to 10 kVA.", "معامل قدرة 0.8 وهامش 25% وكفاءة بطاريات 90%؛ سعات قياسية من 600 فولت.أمبير حتى 10 كيلو فولت.أمبير."],

    // Breaker sizing
    calc_breaker_size_title: ["Breaker Size Calculator", "حاسبة القاطع الكهربائي"],
    calc_breaker_size_desc: ["Pick the standard MCB rating for a continuous load current with the 1.25 factor.", "اختر سعة القاطع القياسية لتيار حمل مستمر بمعامل 1.25."],
    calc_breaker_size_about: ["Continuous loads are sized at 125% of the load current, then rounded up to the next standard MCB rating (IEC 60898 series). The cable ampacity must be at least the breaker rating — check with the Cable Size calculator.", "الأحمال المستمرة تحسب بنسبة 125% من تيار الحمل ثم تقرّب لأقرب سعة قاطع قياسية أكبر (سلسلة IEC 60898). يجب ألا تقل سعة الكابل عن سعة القاطع — تحقق منها بحاسبة مقطع الكابل."],
    res_mcb: ["MCB rating", "سعة القاطع"],
    res_design_i: ["Design current (×1.25)", "تيار التصميم (×1.25)"],
    lib_err_mcb: ["Load exceeds 160 A; use an MCCB or multiple circuits.", "الحمل يتجاوز 160 أمبير؛ استخدم قاطع MCCB أو وزّع الحمل على دوائر."],
    lib_as_mcb: ["125% continuous-load factor, standard IEC 60898 ratings 6-160 A. Cable must be coordinated with the breaker.", "معامل 125% للحمل المستمر وسعات قياسية وفق IEC 60898 من 6 إلى 160 أمبير. يجب تنسيق الكابل مع القاطع."],

    // Brick & mortar
    calc_brick_mortar_title: ["Brick & Mortar Calculator", "حاسبة الطوب والمونة"],
    calc_brick_mortar_desc: ["Brick count and mortar and plaster quantities for a wall area, with the Egyptian standard brick as default.", "عدد الطوب وكميات مونة البناء والمحارة لمساحة حائط، بمقاس الطوبة المصرية القياسية افتراضياً."],
    calc_brick_mortar_about: ["Bricks are counted from the wall area and the brick face plus one mortar joint. Mortar is the wall volume minus the brick volume. Plaster is wall area × sides × thickness. Defaults: Egyptian red brick 20×10×6 cm, 10 mm joint, 10 cm wall, 2 cm plaster both sides. Add waste on site.", "يُحسب عدد الطوب من مساحة الحائط ومساحة وجه الطوبة مضافاً إليها مونة العراميس. حجم المونة = حجم الحائط ناقص حجم الطوب. المحارة = مساحة الحائط × عدد الأوجه × السماكة. الافتراضيات: طوبة حمراء مصرية 20×10×6 سم، عراميس 10 مم، حائط 10 سم، محارة 2 سم على الوجهين. أضف نسبة الهالك في الموقع."],
    f_wall_area: ["Wall area", "مساحة الحائط"],
    f_brick_l: ["Brick length", "طول الطوبة"],
    f_brick_w: ["Brick width", "عرض الطوبة"],
    f_brick_h: ["Brick height", "ارتفاع الطوبة"],
    f_joint: ["Mortar joint", "سماكة العراميس"],
    f_wall_thk: ["Wall thickness", "سماكة الحائط"],
    f_plaster_thk: ["Plaster thickness", "سماكة المحارة"],
    f_sides: ["Plaster sides", "أوجه المحارة"],
    lib_opt_both: ["Both sides", "الوجهان"],
    lib_opt_one: ["One side", "وجه واحد"],
    res_bricks: ["Bricks", "عدد الطوب"],
    res_mortar: ["Laying mortar", "مونة البناء"],
    res_plaster: ["Plaster mortar", "مونة المحارة"],
    res_wall_vol: ["Wall volume", "حجم الحائط"],
    lib_as_brick: ["Single-wythe wall; mortar = wall volume − brick volume; no openings deducted; add waste.", "حائط نصف/كل طوبة بحساب حجومي؛ المونة = حجم الحائط ناقص حجم الطوب؛ لم تُخصم الفتحات؛ أضف نسبة هالك."],

    // Pipe weight
    calc_pipe_weight_title: ["Pipe Weight Calculator", "حاسبة وزن المواسير"],
    calc_pipe_weight_desc: ["Weight of a pipe from its outer diameter, wall thickness, length and material.", "وزن الماسورة من قطرها الخارجي وسماكة الجدار وطولها وخامتها."],
    calc_pipe_weight_about: ["W = (π/4) × (OD² − ID²) × L × density, with ID = OD − 2 × wall thickness. Densities: steel 7850, stainless 7900, copper 8960, aluminium 2700, PVC 1400 kg/m³.", "الوزن = (π/4) × (القطر الخارجي² − الداخلي²) × الطول × الكثافة، حيث القطر الداخلي = الخارجي − 2 × سماكة الجدار. الكثافات: صلب 7850، ستانلس 7900، نحاس 8960، ألومنيوم 2700، PVC 1400 كجم/م³."],
    f_od: ["Outer diameter", "القطر الخارجي"],
    f_wall_t: ["Wall thickness", "سماكة الجدار"],
    f_pipe_mat: ["Material", "الخامة"],
    lib_opt_steel: ["Carbon steel (7850 kg/m³)", "صلب كربوني (7850 كجم/م³)"],
    lib_opt_stainless: ["Stainless steel (7900 kg/m³)", "ستانلس ستيل (7900 كجم/م³)"],
    lib_opt_copper: ["Copper (8960 kg/m³)", "نحاس (8960 كجم/م³)"],
    lib_opt_alu: ["Aluminium (2700 kg/m³)", "ألومنيوم (2700 كجم/م³)"],
    lib_opt_pvc: ["PVC (1400 kg/m³)", "بلاستيك PVC (1400 كجم/م³)"],
    res_pipe_weight: ["Pipe weight", "وزن الماسورة"],
    res_kgm: ["Weight per metre", "الوزن لكل متر"],
    lib_as_pipe: ["Plain hollow cylinder, constant wall, material density as listed.", "أسطوانة مجوفة منتظمة السماكة بكثافة الخامة الموضحة."],

    // Room AC page content (approved model, 2026-11-21)
    calc_room_ac_how: [
      "This calculator estimates the cooling capacity a room needs in BTU/h. " +
      "It starts from the floor area in square metres times 550 BTU/h per m², a rule-of-thumb rate suited to hot climates, then adjusts for conditions: " +
      "strong sun ×1.15 or shaded ×0.90, poor insulation ×1.15 or good ×0.90, a top-floor room under the roof ×1.10, plus 600 BTU/h for every person beyond the first two. " +
      "It then recommends the nearest market unit size above the required capacity (1.5, 2.25, 3, 4, 5, 6 or 7.5 HP), " +
      "and shows the result in refrigeration tons, kilowatts and approximate HP at 8,000 BTU/h per HP as used in the Egyptian market. " +
      "The exact figures (550 BTU/h per m², the adjustment factors, 8,000 BTU/h per HP) are TEKNO's own calibration informed by the published rules of thumb cited in the references below, not text from any binding standard.",
      "تقدّر هذه الحاسبة قدرة التبريد التي تحتاجها الغرفة بوحدة BTU/h. " +
      "تبدأ من مساحة الغرفة بالمتر المربع مضروبة في 550 وحدة لكل متر مربع، وهي قاعدة إرشادية مناسبة للمناطق الحارة، ثم تعدّل الناتج حسب الظروف: " +
      "شمس قوية ×1.15 أو مظللة ×0.90، عزل ضعيف ×1.15 أو جيد ×0.90، الدور الأخير تحت السطح مباشرة ×1.10، بالإضافة إلى 600 وحدة عن كل شخص بعد أول شخصين. " +
      "بعدها تقترح الحاسبة أقرب فئة سوقية أكبر من القدرة المطلوبة (1.5 أو 2.25 أو 3 أو 4 أو 5 أو 6 أو 7.5 حصان)، " +
      "وتعرض النتيجة أيضًا بالطن التبريدي والكيلوواط وبالحصان التقريبي باعتبار 8000 وحدة لكل حصان كما هو متداول في السوق المصري. " +
      "الأرقام الدقيقة (550 وحدة لكل متر مربع ومعاملات التعديل و8000 وحدة للحصان) معايرة خاصة بـTEKNO مستندة إلى القواعد الإرشادية المنشورة في المراجع أدناه، وليست نصًا من معيار ملزم."
    ],
    calc_room_ac_example: [
      "Example: a 24 m² living room, average sun, average insulation, 3 occupants, not on the top floor. " +
      "Base: 24 × 550 = 13,200 BTU/h. Factors all ×1. Occupancy: 600 × (3 − 2) = 600 BTU/h. Total: 13,800 BTU/h. " +
      "The nearest market size above that is 18,000 BTU/h, a 2.25 HP unit (1.15 TR, 4.0444 kW, 1.725 HP actual).",
      "مثال: صالة معيشة مساحتها 24 م²، تعرض متوسط للشمس، عزل متوسط، 3 أشخاص، وليست في الدور الأخير. " +
      "الأساس: 24 × 550 = 13,200 وحدة/ساعة. المعاملات كلها ×1. إضافة الأشخاص: 600 × (3 − 2) = 600 وحدة/ساعة. الإجمالي: 13,800 وحدة/ساعة. " +
      "أقرب فئة سوقية أكبر منها هي 18,000 وحدة/ساعة أي تكييف 2.25 حصان (1.15 طن تبريدي، 4.0444 كيلوواط، 1.725 حصان فعلي)."
    ],
    calc_room_ac_faq: [
      "<dl>" +
      "  <dt>Is the HP in the result the real horsepower?</dt>" +
      "  <dd>Market sizes are nominal: a 2.25 HP unit in Egypt is an 18,000 BTU/h machine. That is why the calculator also shows actual computed horsepower at the common approximate rate of 8,000 BTU/h per HP.</dd>" +
      "  <dt>What if the room is a kitchen or has an open kitchen?</dt>" +
      "  <dd>Kitchens add a large heat load. ENERGY STAR suggests adding about 4,000 BTU/h for a kitchen; pick the larger size or consult a technician.</dd>" +
      "  <dt>Does the result work for high ceilings?</dt>" +
      "  <dd>The calculator does not take ceiling height; the Fujitsu guide's rule of thumb assumes about 2.4 m ceilings. Higher ceilings mean more volume and more capacity than the area alone suggests.</dd>" +
      "  <dt>Is the result binding?</dt>" +
      "  <dd>No, it is an indicative estimate. Real load depends on windows, appliances and the building itself; when in doubt, consult an AC technician.</dd>" +
      "</dl>",
      "<dl>" +
      "  <dt>هل الحصان في النتيجة هو الحصان الحقيقي؟</dt>" +
      "  <dd>الفئات السوقية اسمية: تكييف «2.25 حصان» في السوق المصري هو وحدة بسعة 18,000 وحدة/ساعة. لذلك تعرض الحاسبة أيضًا الحصان الفعلي المحسوب بمعدل تقريبي متداول 8,000 وحدة لكل حصان.</dd>" +
      "  <dt>ماذا لو كانت الغرفة مطبخًا أو فيها مطبخ مفتوح؟</dt>" +
      "  <dd>المطبخ يضيف حملًا حراريًا كبيرًا. توصي ENERGY STAR بإضافة نحو 4,000 وحدة للمطبخ؛ عندها اختر الفئة الأكبر أو راجع مختصًا.</dd>" +
      "  <dt>هل تصلح النتيجة للأسقف العالية؟</dt>" +
      "  <dd>الحاسبة لا تدخل ارتفاع السقف في الحساب، والقاعدة الإرشادية في دليل Fujitsu تفترض سقفًا بنحو 2.4 متر. للأسقف الأعلى من ذلك يزيد حجم الغرفة وتحتاج قدرة أكبر من ناتج المساحة وحدها.</dd>" +
      "  <dt>هل النتيجة ملزمة؟</dt>" +
      "  <dd>لا، هي تقدير إرشادي. الحمل الفعلي يتأثر بالنوافذ والأجهزة وحالة المبنى؛ عند الشك راجع فني تكييف.</dd>" +
      "</dl>"
    ],
    calc_room_ac_refs: [
      "<ul>" +
      "  <li><a href=\"https://www.energystar.gov/products/room_air_conditioners\" target=\"_blank\" rel=\"noopener\">ENERGY STAR: Room Air Conditioners</a> — sizing from room area, +10% for heavy sun, −10% for heavy shade, +600 BTU/h per person beyond two, +4,000 BTU/h for kitchens.</li>" +
      "  <li><a href=\"https://www.generalairstage.com.au/help-centre/helpful-articles/details/air-conditioner-room-size-guide\" target=\"_blank\" rel=\"noopener\">General Airstage (Fujitsu): Room Size Guide</a> — about 0.15 kW per m² as a rule of thumb, with ceiling-height, insulation and sun factors.</li>" +
      "  <li><a href=\"https://btech.com/ar/carrier-inverter-split-air-conditioner-2-25hp-cooling-white-khct18dn.html\" target=\"_blank\" rel=\"noopener\">B.TECH: Carrier 2.25 HP</a> — Egyptian market listing pairing the 2.25 HP class with 18,000 BTU/h cooling capacity.</li>" +
      "</ul>",
      "<ul>" +
      "  <li><a href=\"https://www.energystar.gov/products/room_air_conditioners\" target=\"_blank\" rel=\"noopener\">ENERGY STAR: Room Air Conditioners</a> — التقدير من مساحة الغرفة، +10% للشمس الشديدة، −10% للظل الشديد، +600 وحدة لكل شخص بعد أول شخصين، +4,000 وحدة للمطبخ.</li>" +
      "  <li><a href=\"https://www.generalairstage.com.au/help-centre/helpful-articles/details/air-conditioner-room-size-guide\" target=\"_blank\" rel=\"noopener\">General Airstage (Fujitsu): Room Size Guide</a> — قاعدة إرشادية بنحو 0.15 كيلوواط لكل متر مربع، مع عوامل ارتفاع السقف والعزل والشمس.</li>" +
      "  <li><a href=\"https://btech.com/ar/carrier-inverter-split-air-conditioner-2-25hp-cooling-white-khct18dn.html\" target=\"_blank\" rel=\"noopener\">B.TECH: تكييف كارير 2.25 حصان</a> — مثال من السوق المصري يقرن فئة 2.25 حصان بسعة تبريد 18,000 وحدة حرارية.</li>" +
      "</ul>"
    ]

  });
})();
