/* TEKNO translations. Each key maps to [English, Arabic]. */
(function () {
  "use strict";

  var K = {
    // Brand and navigation
    tagline: ["Engineering Made Simple", "الهندسة بكل بساطة"],
    nav_home: ["Home", "الرئيسية"],
    title_404: ["Page Not Found", "الصفحة غير موجودة"],
    desc_404: ["The page you requested does not exist. Browse all TEKNO engineering calculators.", "الصفحة المطلوبة غير موجودة. تصفح كل حاسبات TEKNO الهندسية."],
    nav_tools: ["Tools", "الأدوات"],
    lang_btn: ["العربية", "English"],
    footer_about: ["Free, browser-based engineering tools for professionals across all disciplines.", "أدوات هندسية مجانية تعمل داخل المتصفح للمحترفين في جميع التخصصات."],
    footer_tools_heading: ["Tools", "الأدوات"],
    footer_roadmap_heading: ["Coming later", "قريباً"],
    footer_disclaimer: ["Results are for guidance only. Check every design against the applicable standards, and results must be reviewed with a qualified engineer.", "النتائج للتوجيه فقط. تحقق من كل تصميم وفق المعايير المعمول بها، ويجب مراجعة النتائج مع مهندس مختص."],
    footer_copy: ["© 2026 TEKNO. All rights reserved.", "© 2026 TEKNO. جميع الحقوق محفوظة."],

    // Home page
    nf_title: ["Page not found", "الصفحة غير موجودة"],
    nf_desc: ["The page you asked for does not exist. Browse the full list of engineering tools instead.", "الصفحة المطلوبة غير موجودة. تصفح القائمة الكاملة للأدوات الهندسية بدلاً منها."],
    title_home: ["Free Engineering Calculators", "حاسبات هندسية مجانية"],
    desc_home: ["Free, practical engineering calculators for civil, mechanical, electrical and architecture professionals. Runs in your browser.", "حاسبات هندسية مجانية وعملية للمهندسين المدنيين والميكانيكيين والكهربائيين والمعماريين. تعمل داخل المتصفح."],
    hero_title: ["Engineering Calculations Made Simple", "حسابات هندسية أبسط"],
    hero_desc: ["Free and practical engineering tools for professionals across all disciplines.", "أدوات هندسية مجانية وعملية للمحترفين في جميع التخصصات."],
    hero_cta: ["Explore Engineering Tools", "استكشف الأدوات الهندسية"],
    home_search_label: ["Search engineering tools", "ابحث في الأدوات الهندسية"],
    search_placeholder: ["e.g. voltage drop, steel, pump", "مثال: هبوط الجهد، حديد، مضخة"],
    search_btn: ["Search", "بحث"],
    disc_title: ["Engineering disciplines", "التخصصات الهندسية"],
    popular_title: ["Popular calculators", "الحاسبات الأكثر استخداماً"],
    recent_title: ["Recently added", "أضيفت مؤخراً"],
    why_title: ["Why TEKNO?", "لماذا TEKNO؟"],
    why_1_t: ["Free, no sign-up", "مجاني بدون تسجيل"],
    why_1_d: ["Every calculator runs in your browser. No account and no payment.", "كل حاسبة تعمل داخل متصفحك. بدون حساب أو دفع."],
    why_2_t: ["Shows its working", "يعرض خطوات الحساب"],
    why_2_d: ["Each result comes with the formula, the steps and the assumptions behind it.", "كل نتيجة تأتي مع المعادلة والخطوات والافتراضات المستخدمة."],
    why_3_t: ["Fast and light", "سريع وخفيف"],
    why_3_d: ["No backend, no database and no accounts. Everything runs in your browser, so pages load instantly and work offline.", "بدون خادم وقاعدة بيانات وحسابات. كل شيء يعمل في متصفحك، لذا تحمّل الصفحات فوراً وتعمل دون اتصال."],
    why_4_t: ["Checked inputs", "مدخلات مُتحقق منها"],
    why_4_d: ["Invalid or incomplete inputs show an error, never a misleading number.", "المدخلات الخاطئة أو الناقصة تُظهر خطأً، لا رقماً مضللاً."],
    roadmap_title: ["On the roadmap", "على الخارطة"],
    roadmap_1: ["Printable PDF reports", "تقارير PDF قابلة للطباعة"],
    roadmap_2: ["Excel templates", "قوالب Excel"],
    roadmap_3: ["Advanced engineering tools", "أدوات هندسية متقدمة"],
    roadmap_note: ["", ""],

    // Tools directory
    title_tools: ["Engineering Tools Directory", "دليل الأدوات الهندسية"],
    desc_tools: ["Browse free engineering calculators for civil, mechanical and electrical engineering, and architecture.", "تصفح حاسبات هندسية مجانية للهندسة المدنية والميكانيكية والكهربائية والعمارة."],
    tools_title: ["Tools directory", "دليل الأدوات"],
    tools_search_label: ["Search tools", "ابحث في الأدوات"],
    filter_all: ["All", "الكل"],
    no_results: ["No tools match your search.", "لا توجد أدوات تطابق بحثك."],
    results_count: ["{n} tools", "{n} أداة"],
    cat_civil: ["Civil Engineering", "الهندسة المدنية"],
    cat_mechanical: ["Mechanical Engineering", "الهندسة الميكانيكية"],
    cat_electrical: ["Electrical Engineering", "الهندسة الكهربائية"],
    cat_architecture: ["Architecture", "العمارة"],
    cat_general: ["General Engineering", "الهندسة العامة"],

    // Calculator interface
    calc_calculate: ["Calculate", "احسب"],
    calc_clear: ["Clear", "مسح"],
    calc_copy: ["Copy result", "نسخ النتيجة"],
    calc_copied: ["Copied", "تم النسخ"],
    calc_copy_fail: ["Copy failed", "تعذر النسخ"],
    calc_formula: ["Formula", "المعادلة"],
    calc_steps: ["Calculation steps", "خطوات الحساب"],
    calc_assumptions: ["Assumptions", "الافتراضات"],
    calc_result: ["Result", "النتيجة"],
    calc_placeholder: ["Enter values and press Calculate.", "أدخل القيم ثم اضغط احسب."],
    about_heading: ["About this calculator", "عن هذه الحاسبة"],
    back_to_tools: ["← Back to all tools", "→ العودة إلى كل الأدوات"],
    calc_fix: ["Fix the highlighted inputs to see a result.", "صحح المدخلات المعلَّمة لعرض النتيجة."],
    calc_variant: ["Calculation type", "نوع الحساب"],
    calc_unit: ["Unit", "الوحدة"],
    calc_other: ["Other values", "قيم أخرى"],
    calc_input_title: ["Inputs", "المدخلات"],
    calc_output_title: ["Output", "المخرجات"],
    err_number: ["Enter a valid number.", "أدخل رقماً صحيحاً."],
    err_required: ["This field is required.", "هذا الحقل مطلوب."],
    err_gt: ["Must be greater than {n}.", "يجب أن تكون أكبر من {n}."],
    err_ge: ["Must be {n} or more.", "يجب أن تكون {n} أو أكثر."],
    err_le: ["Must be {n} or less.", "يجب أن تكون {n} أو أقل."],
    err_abs_zero: ["Temperature cannot be below absolute zero (0 K).", "لا يمكن أن تكون درجة الحرارة أقل من الصفر المطلق (0 K)."],
    status_ok: ["Within the 3% guideline", "ضمن الحد الإرشادي 3%"],
    status_high: ["Above the 3% guideline", "أعلى من الحد الإرشادي 3%"],

    // Shared field labels
    f_value: ["Value", "القيمة"],
    f_from: ["From", "من"],
    f_to: ["To", "إلى"],
    f_length: ["Length", "الطول"],
    f_width: ["Width", "العرض"],
    f_height: ["Height", "الارتفاع"],
    f_diameter: ["Bar diameter (mm)", "قطر القضيب (مم)"],
    f_bar_length: ["Bar length (m)", "طول القضيب (م)"],
    f_pf: ["Power factor (cos φ)", "معامل القدرة (cos φ)"],
    f_voltage: ["Voltage (V)", "الجهد (فولت)"],
    f_current: ["Current (A)", "التيار (أمبير)"],
    f_load: ["Cooling load", "حمل التبريد"],
    f_dt: ["Temperature difference (ΔT)", "فرق درجة الحرارة (ΔT)"],
    f_flow: ["Flow rate", "معدل التدفق"],
    f_head: ["Pump head (m)", "ارتفاع الضخ (م)"],
    f_pressure: ["Pressure", "الضغط"],
    f_density: ["Fluid density (kg/m³)", "كثافة السائل (كجم/م³)"],
    f_efficiency: ["Pump efficiency (%)", "كفاءة المضخة (%)"],
    f_power: ["Power", "القدرة"],
    f_radius: ["Radius", "نصف القطر"],
    f_base: ["Base", "القاعدة"],
    f_cable_area: ["Conductor cross-section (mm²)", "مساحة مقطع الموصل (مم²)"],
    f_material: ["Conductor material", "مادة الموصل"],
    f_cable_length: ["Cable length, one way (m)", "طول الكابل في اتجاه واحد (م)"],
    f_reactance: ["Conductor reactance (mΩ/m)", "مفاعلة الموصل (مΩ/م)"],
    f_phase: ["Phase", "الطور"],
    f_shape: ["Shape", "الشكل"],
    f_system: ["System", "النظام"],
    f_mat_cu: ["Copper", "نحاس"],
    f_mat_al: ["Aluminium", "ألومنيوم"],
    f_ph_single: ["Single-phase", "أحادي الطور"],
    f_ph_three: ["Three-phase", "ثلاثي الطور"],
    f_load_kw: ["kW", "كيلوواط"],
    f_load_tr: ["TR", "طن تبريد"],
    f_dt_c: ["°C", "°م"],
    f_dt_f: ["°F", "°ف"],

    // Variants
    var_length: ["Length", "الطول"],
    var_area: ["Area", "المساحة"],
    var_volume: ["Volume", "الحجم"],
    var_pressure: ["Pressure", "الضغط"],
    var_flow: ["Flow", "التدفق"],
    var_temperature: ["Temperature", "درجة الحرارة"],
    var_power: ["Power", "القدرة"],
    var_weight: ["Weight", "الوزن"],
    var_tr_kw: ["TR ↔ kW", "طن تبريد ↔ كيلوواط"],
    var_airflow: ["Airflow (air side)", "تدفق الهواء"],
    var_water: ["Chilled water flow", "تدفق الماء المبرد"],
    var_pump_power: ["Hydraulic and shaft power", "القدرة الهيدروليكية وقدرة العمود"],
    var_pump_pressure: ["Pressure to head", "تحويل الضغط إلى ارتفاع"],
    var_elec_single: ["Single-phase power", "قدرة أحادي الطور"],
    var_elec_three: ["Three-phase power", "قدرة ثلاثي الطور"],
    var_elec_current: ["Current from power", "التيار من القدرة"],
    var_vd_single: ["Single-phase", "أحادي الطور"],
    var_vd_three: ["Three-phase", "ثلاثي الطور"],
    var_rect: ["Rectangle", "مستطيل"],
    var_tri: ["Triangle", "مثلث"],
    var_circle: ["Circle", "دائرة"],
    var_cyl: ["Cylinder", "أسطوانة"],
    var_box: ["Box", "صندوق"],

    // Result labels
    res_converted: ["Converted value", "القيمة المحولة"],
    res_volume: ["Concrete volume", "حجم الخرسانة"],
    res_weight: ["Bar weight", "وزن القضيب"],
    res_kgm: ["Weight per metre", "الوزن لكل متر"],
    res_tonnes: ["Weight in tonnes", "الوزن بالطن"],
    res_kw: ["Cooling capacity", "سعة التبريد"],
    res_tr: ["Cooling capacity", "سعة التبريد"],
    res_m3s: ["Air flow", "تدفق الهواء"],
    res_cfm: ["Air flow (CFM)", "تدفق الهواء (قدم³/دقيقة)"],
    res_lps: ["Water flow", "تدفق الماء"],
    res_m3h: ["Water flow (m³/h)", "تدفق الماء (م³/ساعة)"],
    res_gpm: ["Water flow (GPM)", "تدفق الماء (غالون/دقيقة)"],
    res_hyd_kw: ["Hydraulic power", "القدرة الهيدروليكية"],
    res_shaft_kw: ["Shaft power", "قدرة العمود"],
    res_head: ["Head", "الارتفاع"],
    res_kpa: ["Pressure (kPa)", "الضغط (كيلو باسكال)"],
    res_bar: ["Pressure (bar)", "الضغط (بار)"],
    res_psi: ["Pressure (psi)", "الضغط (psi)"],
    res_kw_real: ["Real power", "القدرة الفعالة"],
    res_kva: ["Apparent power", "القدرة الظاهرية"],
    res_kvar: ["Reactive power", "القدرة غير الفعالة"],
    res_w: ["Humidity ratio", "نسبة الرطوبة"],
    res_amps: ["Current", "التيار"],
    res_drop_v: ["Voltage drop", "هبوط الجهد"],
    res_drop_pct: ["Voltage drop (%)", "هبوط الجهد (%)"],
    res_recv_v: ["Voltage at load end", "الجهد عند نهاية الحمل"],
    res_status: ["Status", "الحالة"],
    res_area: ["Area", "المساحة"],
    res_perimeter: ["Perimeter", "المحيط"],
    res_circ: ["Circumference", "محيط الدائرة"],
    res_volume_3d: ["Volume", "الحجم"],
    res_lsa: ["Lateral surface area", "المساحة الجانبية"],
    res_tsa: ["Total surface area", "المساحة الكلية"],

    // Assumption notes
    as_unit: ["Standard conversion factors (exact or NIST values).", "معاملات تحويل قياسية (قيم دقيقة أو وفق NIST)."],
    as_temp: ["Temperature uses the offset formulas, not a simple ratio.", "تستخدم درجة الحرارة معادلات الإزاحة، لا نسبة بسيطة."],
    as_steel: ["Round plain bar. The formula d²/162 assumes steel density of 7850 kg/m³.", "قضيب دائري. المعادلة d²/162 تفترض كثافة الفولاذ 7850 كجم/م³."],
    as_concrete: ["Rectangular block with straight sides. No waste or wastage allowance included.", "كتلة مستطيلة بأضلاع مستقيمة. لا يشمل الهدر."],
    as_tr: ["1 TR = 12,000 BTU/h = 3.516853 kW (exact definition).", "1 طن تبريد = 12,000 وحدة حرارية بريطانية/ساعة = 3.516853 كيلوواط."],
    as_air: ["Sensible load only. Air density 1.2 kg/m³ and specific heat 1.005 kJ/kg·K (about 20 °C, sea level).", "حمل محسوس فقط. كثافة الهواء 1.2 كجم/م³ والحرارة النوعية 1.005 كيلوجول/كجم·ك (حوالي 20 °م، مستوى البحر)."],
    as_water: ["Water density about 1000 kg/m³ (1 kg ≈ 1 L) and specific heat 4.186 kJ/kg·K.", "كثافة الماء حوالي 1000 كجم/م³ (1 كجم ≈ 1 لتر) والحرارة النوعية 4.186 كيلوجول/كجم·ك."],
    as_pump: ["g = 9.81 m/s². Hydraulic power = ρ·g·Q·H. Shaft power = hydraulic power ÷ efficiency.", "g = 9.81 م/ث². القدرة الهيدروليكية = ρ·g·Q·H. قدرة العمود = القدرة الهيدروليكية ÷ الكفاءة."],
    as_head: ["Head = pressure ÷ (ρ·g). Pressure is treated as gauge pressure.", "الارتفاع = الضغط ÷ (ρ·g). يُعامل الضغط كضغط قياسي (gauge)."],
    as_elec: ["Balanced load and lagging power factor. Three-phase uses √3 with line voltage.", "حمل متزن ومعامل قدرة متأخر. الثلاثي يستخدم √3 مع جهد الخط."],
    as_vd: ["Copper ρ = 0.0172 Ω·mm²/m and aluminium ρ = 0.0282 Ω·mm²/m at 20 °C. Resistance and reactance both included. Common guideline limits: 3% for branch circuits, 5% total.", "مقاومة النحاس 0.0172 Ω·مم²/م والألومنيوم 0.0282 Ω·مم²/م عند 20 °م. تشمل المقاومة والمفاعلة. حدود إرشادية شائعة: 3% للدوائر الفرعية و5% للإجمالي."],
    as_area: ["Ideal geometry with no tolerances. Output uses the same unit as the input.", "هندسة مثالية بدون تفاوتات. تُخرج النتائج بنفس وحدة المدخلات."],

    // Calculator titles, descriptions and About text
    calc_unit_converter_title: ["Unit Converter", "محوّل الوحدات"],
    calc_unit_converter_desc: ["Convert length, area, volume, pressure, flow, temperature, power and weight.", "حوّل الطول والمساحة والحجم والضغط والتدفق ودرجة الحرارة والقدرة والوزن."],
    calc_unit_converter_about: ["Pick a quantity, enter a value and choose the units to convert between. Each conversion uses a fixed factor to a base unit, so the result is traceable. Temperature uses its own formulas because the scales do not share a zero point.", "اختر الكمية وأدخل القيمة ثم حدد الوحدات. كل تحويل يمر عبر وحدة أساس بمعامل ثابت، لذلك يمكن تتبع النتيجة. تستخدم درجة الحرارة معادلاتها الخاصة لأن مقاييسها لا تشترك في نقطة صفر."],
    calc_concrete_title: ["Concrete Volume Calculator", "حاسبة حجم الخرسانة"],
    calc_concrete_desc: ["Calculate the volume of a concrete element in cubic metres from its length, width and height.", "احسب حجم عنصر خرساني بالمتر المكعب من طوله وعرضه وارتفاعه."],
    calc_concrete_about: ["Enter the three dimensions of a rectangular concrete element in any common length unit. The tool converts everything to metres and multiplies them to give volume in cubic metres. Use it for slabs, footings, beams and walls, then add your own waste allowance when ordering.", "أدخل الأبعاد الثلاثة لعنصر خرساني مستطيل بأي وحدة طول شائعة. تحوّل الأداة الأبعاد إلى أمتار وتضربها للحصول على الحجم بالمتر المكعب. استخدمها للبلاطات والقواعد والكمرات والجدران، ثم أضف نسبة الهدر عند الطلب."],
    calc_steel_weight_title: ["Steel Bar Weight Calculator", "حاسبة وزن حديد التسليح"],
    calc_steel_weight_desc: ["Find the weight of a reinforcing steel bar from its diameter in mm and length in metres.", "احسب وزن قضيب حديد التسليح من قطره بالمليمتر وطوله بالمتر."],
    calc_steel_weight_about: ["Reinforcing bar weight per metre is approximately the square of the diameter in millimetres divided by 162. Multiply by the bar length in metres to get the total weight in kilograms. This is the standard rule used for estimating bar schedules.", "وزن متر القضيب تقريباً يساوي مربع القطر بالمليمتر مقسوماً على 162. اضربه في طول القضيب بالمتر للحصول على الوزن الكلي بالكيلوجرام. وهذه القاعدة المعيارية لتقدير جداول الحديد."],
    calc_hvac_title: ["HVAC Calculator", "حاسبة التكييف والتبريد"],
    calc_hvac_desc: ["Convert tons of refrigeration to kW, size airflow, and find chilled water flow.", "حوّل طن التبريد إلى كيلوواط، واحسب تدفق الهواء، واحسب تدفق الماء المبرد."],
    calc_hvac_about: ["Three quick tools for cooling design. Convert between TR and kW, estimate supply airflow from a sensible load and temperature difference, or estimate chilled water flow from a cooling load. Each uses the assumptions listed with the result.", "ثلاث أدوات سريعة لتصميم التبريد. حوّل بين طن التبريد والكيلوواط، أو قدّر تدفق هواء الإمداد من الحمل المحسوس وفرق الحرارة، أو قدّر تدفق الماء المبرد من حمل التبريد. كل منها يستخدم الافتراضات المذكورة مع النتيجة."],
    calc_pump_title: ["Pump Calculator", "حاسبة المضخات"],
    calc_pump_desc: ["Compute hydraulic and shaft power from flow and head, and convert pressure to pump head.", "احسب القدرة الهيدروليكية وقدرة العمود من التدفق والارتفاع، وحوّل الضغط إلى ارتفاع ضخ."],
    calc_pump_about: ["Use the power tool to size a pump motor from flow, head, fluid density and efficiency. Use the pressure tool to convert a gauge reading into metres of head or other pressure units.", "استخدم أداة القدرة لتحديد حجم محرك المضخة من التدفق والارتفاع وكثافة السائل والكفاءة. واستخدم أداة الضغط لتحويل قراءة المقياس إلى أمتار ارتفاع أو وحدات ضغط أخرى."],
    calc_electrical_load_title: ["Electrical Load Calculator", "حاسبة الحمل الكهربائي"],
    calc_electrical_load_desc: ["Calculate single-phase and three-phase power, apparent power and current from voltage and power factor.", "احسب قدرة أحادي وثلاثي الطور والقدرة الظاهرية والتيار من الجهد ومعامل القدرة."],
    calc_electrical_load_about: ["Work out real, apparent and reactive power for single-phase and three-phase loads, or find the current a load draws. Power factor is required because it links real power to apparent power.", "احسب القدرة الفعالة والظاهرية وغير الفعالة للأحمال أحادية وثلاثية الطور، أو احسب التيار الذي يسحبه الحمل. معامل القدرة مطلوب لأنه يربط القدرة الفعالة بالظاهرية."],
    calc_voltage_drop_title: ["Cable Voltage Drop Calculator", "حاسبة هبوط الجهد في الكابلات"],
    calc_voltage_drop_desc: ["Check voltage drop along a copper or aluminium cable for single-phase and three-phase systems.", "تحقق من هبوط الجهد على طول كابل نحاس أو ألومنيوم لأنظمة أحادية وثلاثية الطور."],
    calc_voltage_drop_about: ["Enter the nominal voltage, current, one-way cable length, conductor size and material. The tool uses resistance and reactance per metre to estimate the drop and the voltage at the load end, then compares the percentage with a common 3% guideline.", "أدخل الجهد الاسمي والتيار وطول الكابل في اتجاه واحد ومقطع الموصل ومادته. تستخدم الأداة المقاومة والمفاعلة لكل متر لتقدير الهبوط والجهد عند نهاية الحمل، ثم تقارن النسبة بالحد الإرشادي الشائع 3%."],
    calc_area_volume_title: ["Area and Volume Calculator", "حاسبة المساحة والحجم"],
    calc_area_volume_desc: ["Area, perimeter, volume and surface area for rectangles, triangles, circles, cylinders and boxes.", "المساحة والمحيط والحجم والمساحة السطحية للمستطيلات والمثلثات والدوائر والأسطوانات والصناديق."],
    calc_area_volume_about: ["Choose a shape, enter its dimensions in one length unit and get the area, perimeter, volume or surface area in matching units. Useful for quantity estimates, room areas and tank or duct volumes.", "اختر الشكل وأدخل أبعاده بوحدة طول واحدة لتحصل على المساحة أو المحيط أو الحجم أو المساحة السطحية بوحدات مطابقة. مفيدة لتقدير الكميات ومساحات الغرف وأحجام الخزانات والمجاري."],

    // Tool directory category labels used by the catalog
    cat_label_civil: ["Civil", "مدنية"]
  };

  var lang = "en";
  try {
    var saved = localStorage.getItem("tekno-lang");
    if (saved === "ar" || saved === "en") lang = saved;
  } catch (e) { /* storage unavailable, keep default */ }

  window.TEKNO = window.TEKNO || {};
  var TEKNO = window.TEKNO;
  TEKNO.lang = lang;
  TEKNO.keys = K;

  // Translate a key. Unknown keys are returned unchanged, so literal text also works.
  TEKNO.t = function (key, vars) {
    var pair = K[key];
    var s = pair ? pair[TEKNO.lang === "ar" ? 1 : 0] : key;
    if (vars) {
      for (var name in vars) {
        if (Object.prototype.hasOwnProperty.call(vars, name)) {
          s = s.split("{" + name + "}").join(String(vars[name]));
        }
      }
    }
    return s;
  };

  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
})();
