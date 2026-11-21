/* Translation strings for calculator library batch 1 and the 16-discipline names.
 * Each entry is key: [English, Arabic]. Loaded after translations.js; adds to TEKNO.keys. */
(function () {
  "use strict";
  var TEKNO = window.TEKNO;
  if (!TEKNO || !TEKNO.keys) return;
  Object.assign(TEKNO.keys, {
    // ---- Disciplines (directory filter and footer) ----
    cat_structural: ["Structural Engineering", "الهندسة الإنشائية"],
    cat_fluids: ["Fluid Mechanics", "ميكانيكا الموائع"],
    cat_materials: ["Materials Engineering", "هندسة المواد"],
    cat_hvac: ["HVAC Engineering", "هندسة التكييف والتهوية"],
    cat_electronics: ["Electronics Engineering", "هندسة الإلكترونيات"],
    cat_energy: ["Energy Engineering", "هندسة الطاقة"],
    cat_geotechnical: ["Geotechnical Engineering", "الهندسة الجيوتقنية"],
    cat_hydraulics: ["Hydraulics Engineering", "الهيدروليكا"],
    cat_pneumatics: ["Pneumatics Engineering", "الهواء المضغوط"],
    cat_process: ["Process Engineering", "الهندسة الكيميائية والعمليات"],
    cat_thermal: ["Thermal Engineering", "الهندسة الحرارية"],
    cat_manufacturing: ["Manufacturing Engineering", "هندسة التصنيع"],

    // ---- Ohm's law ----
    calc_ohms_law_title: ["Ohm's Law Calculator", "حاسبة قانون أوم"],
    calc_ohms_law_desc: ["Find voltage, current or resistance from the other two, and the power dissipated.", "احسب الجهد أو التيار أو المقاومة من القيمتين الأخريين، مع القدرة المبددة."],
    calc_ohms_law_about: ["Enter any two of voltage, current and resistance. Choose the unknown quantity above. The tool applies V = I × R and P = V × I for a resistive element.", "أدخل أي قيمتين من الجهد والتيار والمقاومة، واختر الكمية المجهولة. تطبق الأداة V = I × R و P = V × I على عنصر مقاوم."],
    lib_v_find_v: ["Find voltage", "حساب الجهد"],
    lib_v_find_i: ["Find current", "حساب التيار"],
    lib_v_find_r: ["Find resistance", "حساب المقاومة"],
    lib_f_current: ["Current (A)", "التيار (A)"],
    lib_f_resistance: ["Resistance (Ω)", "المقاومة (Ω)"],
    lib_f_voltage: ["Voltage (V)", "الجهد (V)"],
    lib_res_voltage: ["Voltage", "الجهد"],
    lib_res_current: ["Current", "التيار"],
    lib_res_resistance: ["Resistance", "المقاومة"],
    lib_res_power: ["Power dissipated", "القدرة المبددة"],
    lib_as_ohm: ["Linear resistive element at constant temperature (Ohm's law). Not valid for diodes, lamps at varying temperature or other non-linear loads.", "عنصر مقاوم خطي عند درجة حرارة ثابتة (قانون أوم). غير صالح للثنائيات أو المصابيح ذات درجة الحرارة المتغيرة أو الأحمال غير الخطية."],

    // ---- Resistors in series and parallel ----
    calc_resistors_series_parallel_title: ["Resistors in Series & Parallel", "المقاومات على التوالي والتوازي"],
    calc_resistors_series_parallel_desc: ["Combine three resistors in series or in parallel and get the equivalent resistance.", "اجمع ثلاث مقاومات على التوالي أو التوازي واحصل على المقاومة المكافئة."],
    calc_resistors_series_parallel_about: ["Series resistances add. Parallel resistances combine by reciprocals. Enter three resistor values in ohms; all values must be greater than zero.", "المقاومات المتصلة على التوالي تجمع مباشرة، أما المتصلة على التوازي فتجمع بمقلوباتها. أدخل ثلاث قيم بالأوم، وكل قيمة يجب أن تكون أكبر من صفر."],
    lib_v_series: ["Series", "توالي"],
    lib_v_parallel: ["Parallel", "توازي"],
    lib_f_r1: ["R1 (Ω)", "R1 (Ω)"],
    lib_f_r2: ["R2 (Ω)", "R2 (Ω)"],
    lib_f_r3: ["R3 (Ω)", "R3 (Ω)"],
    lib_res_total_r: ["Equivalent resistance", "المقاومة المكافئة"],
    lib_as_resistors: ["Ideal resistors with no tolerance or temperature effect. Parallel result is always lower than the smallest branch. Power ratings are not checked.", "مقاومات مثالية دون تأثير التفاوت أو الحرارة. المقاومة المكافئة للتوازي أقل دائمًا من أصغر فرع. لا تُفحص قدرة المقاومات."],

    // ---- LED resistor ----
    calc_led_resistor_title: ["LED Resistor Calculator", "حاسبة مقاومة LED"],
    calc_led_resistor_desc: ["Size the series resistor that limits the current through an LED.", "احسب المقاومة المتسلسلة التي تحدد التيار المار في مصباح LED."],
    calc_led_resistor_about: ["Enter the supply voltage, the LED forward voltage and the target current. The series resistor takes the remaining voltage: R = (Vs − Vf) ÷ If.", "أدخل جهد التغذية وجهد التشغيل الأمامي للـ LED والتيار المطلوب. تأخذ المقاومة المتسلسلة الجهد المتبقي: R = (Vs − Vf) ÷ If."],
    lib_f_supply: ["Supply voltage Vs (V)", "جهد التغذية Vs (V)"],
    lib_f_vf: ["LED forward voltage Vf (V)", "جهد التشغيل الأمامي Vf (V)"],
    lib_f_if: ["Forward current If (mA)", "التيار الأمامي If (mA)"],
    lib_err_led: ["Supply voltage must be greater than the LED forward voltage.", "يجب أن يكون جهد التغذية أكبر من جهد التشغيل الأمامي للـ LED."],
    lib_res_led_r: ["Series resistor (theoretical)", "المقاومة المتسلسلة (نظريًا)"],
    lib_res_e12: ["Nearest E12 value (practical)", "أقرب قيمة E12 (عمليًا)"],
    lib_as_led: ["Vf and current are taken from the LED datasheet at the operating temperature. The E12 value is a common stock value and may differ slightly. Check the resistor power rating with the calculated power.", "قيمة Vf والتيار من ورقة بيانات الـ LED عند درجة حرارة التشغيل. قيمة E12 قيمة قياسية شائعة وقد تختلف قليلًا. تحقق من قدرة المقاومة مقارنة بالقدرة المحسوبة."],

    // ---- Reynolds number ----
    calc_reynolds_number_title: ["Reynolds Number Calculator", "حاسبة عدد رينولدز"],
    calc_reynolds_number_desc: ["Compute the Reynolds number for pipe flow and classify the flow regime.", "احسب عدد رينولدز لجريان الأنابيب وصنّف نظام الجريان."],
    calc_reynolds_number_about: ["Re = ρ × v × D ÷ μ compares inertial and viscous forces. For pipes, flow is usually laminar below 2300 and turbulent above 4000. The tool also shows the velocity at which laminar flow ends.", "تقارن Re = ρ × v × D ÷ μ بين قوى القصور والقوى اللزجة. في الأنابيب يكون الجريان عادة طبقيًا دون 2300 ومضطربًا فوق 4000. تعرض الأداة أيضًا السرعة التي ينتهي عندها الجريان الطبقي."],
    lib_f_velocity: ["Mean velocity v (m/s)", "متوسط السرعة v (m/s)"],
    lib_f_diameter_pipe: ["Internal diameter D", "القطر الداخلي D"],
    lib_f_density: ["Density ρ (kg/m³)", "الكثافة ρ (kg/m³)"],
    lib_f_viscosity: ["Dynamic viscosity μ", "اللزوجة الديناميكية μ"],
    lib_res_re: ["Reynolds number", "عدد رينولدز"],
    lib_res_vcrit: ["Velocity at Re = 2300", "السرعة عند Re = 2300"],
    lib_as_reynolds: ["Water at about 20 °C has ρ ≈ 998 kg/m³ and μ ≈ 1.002 mPa·s. Regime limits 2300 and 4000 are common pipe-flow thresholds, not exact transition points.", "الماء عند نحو 20 °C له ρ ≈ 998 kg/m³ و μ ≈ 1.002 mPa·s. حدود 2300 و4000 قيم شائعة لجريان الأنابيب، وليست نقاط انتقال دقيقة."],

    // ---- Moment of inertia ----
    calc_moment_of_inertia_title: ["Moment of Inertia Calculator", "حاسبة عزم القصور الذاتي"],
    calc_moment_of_inertia_desc: ["Second moment of area about the centroidal axis for common sections.", "عزم القصور الذاتي للمقطع حول المحور المركزي للأشكال الشائعة."],
    calc_moment_of_inertia_about: ["Select a section. The tool returns the second moment of area I about the centroidal axis, which is used in bending stress and deflection. The value is shown in the unit you entered (to the fourth power) and in m⁴.", "اختر المقطع. تعرض الأداة عزم القصور الذاتي I حول المحور المركزي، وهو يُستخدم في إجهاد الانحناء والهبوط. القيمة معروضة بالوحدة المدخلة (أس 4) وبالمتر⁴."],
    lib_v_rect: ["Solid rectangle", "مستطيل مصمت"],
    lib_v_hrect: ["Hollow rectangle (box)", "مستطيل مجوف"],
    lib_v_circle: ["Solid circle", "دائرة مصمتة"],
    lib_v_hcircle: ["Hollow circle (tube)", "دائرة مجوفة (أنبوب)"],
    lib_f_width: ["Width b", "العرض b"],
    lib_f_height: ["Height h", "الارتفاع h"],
    lib_f_unit: ["Length unit", "وحدة الطول"],
    lib_f_wall: ["Wall thickness t", "سماكة الجدار t"],
    lib_err_wall: ["Wall thickness must be less than half the smaller side.", "يجب أن تكون سماكة الجدار أقل من نصف أصغر ضلع."],
    lib_f_diameter: ["Diameter d", "القطر d"],
    lib_f_outer_d: ["Outer diameter D", "القطر الخارجي D"],
    lib_f_inner_d: ["Inner diameter d", "القطر الداخلي d"],
    lib_err_inner: ["Inner diameter must be less than outer diameter.", "يجب أن يكون القطر الداخلي أصغر من القطر الخارجي."],
    lib_res_i: ["Second moment of area I", "عزم القصور الذاتي I"],
    lib_res_i_m4: ["I in m⁴", "I بالمتر⁴"],
    lib_as_moi: ["Exact geometric formulas about the centroidal axis. Does not include rolled-section fillets, cold-formed corners or bolt holes. Use manufacturer tables for rolled steel sections.", "صيغ هندسية دقيقة حول المحور المركزي. لا تشمل الأركان المستديرة للمقاطع المدرفلة أو ثقوب البراغي. استخدم جداول الشركة المصنعة للمقاطع الفولاذية المدرفلة."],

    // ---- Beam deflection ----
    calc_beam_deflection_title: ["Beam Deflection Calculator", "حاسبة هبوط الكمرة"],
    calc_beam_deflection_desc: ["Midspan deflection of a simply supported beam under a uniform or point load.", "هبوط منتصف الكمرة البسيطة الحرة الارتكاز تحت حمل موزع منتظم أو حمل مركّز."],
    calc_beam_deflection_about: ["Simply supported, linear elastic beam. Uniform load: δ = 5wL⁴ ÷ 384EI. Midspan point load: δ = PL³ ÷ 48EI. The result is compared with span ÷ 360, a common serviceability reference.", "كمرة بسيطة الارتكاز ومرنة خطيًا. الحمل المنتظم: δ = 5wL⁴ ÷ 384EI. الحمل المركّز في المنتصف: δ = PL³ ÷ 48EI. تُقارن النتيجة بالبحر ÷ 360 كمرجع شائع للصلابة."],
    lib_v_udl: ["Uniform load (UDL)", "حمل موزع منتظم"],
    lib_v_point: ["Point load at midspan", "حمل مركّز في المنتصف"],
    lib_f_span: ["Span L (m)", "البحر L (m)"],
    lib_f_udl: ["Uniform load w (kN/m)", "الحمل الموزع w (kN/m)"],
    lib_f_point: ["Point load P (kN)", "الحمل المركّز P (kN)"],
    lib_f_modulus: ["Elastic modulus E (GPa)", "معامل المرونة E (GPa)"],
    lib_f_inertia: ["Second moment of area I", "عزم القصور الذاتي I"],
    lib_res_deflection: ["Maximum deflection", "أقصى هبوط"],
    lib_res_allow: ["Reference limit span ÷ 360", "الحد المرجعي البحر ÷ 360"],
    lib_res_ratio: ["Span-to-deflection ratio", "نسبة البحر إلى الهبوط"],
    lib_as_beam_def: ["Simply supported, prismatic beam, linear elastic, small deflections, load applied at midspan (point) or uniform over the span. Self-weight is not included. Check limits in the governing code for your load case and material.", "كمرة بسيطة الارتكاز منشورية ومرنة خطيًا وذات هبوط صغير، والحمل عند المنتصف أو موزع على البحر. لا يشمل الوزن الذاتي. راجع حدود الكود المعتمد لحالة الحمل والمادة."],

    // ---- Tank volume ----
    calc_tank_volume_title: ["Tank Volume Calculator", "حاسبة حجم الخزان"],
    calc_tank_volume_desc: ["Volume of a vertical cylindrical or rectangular tank, in cubic metres, litres and US gallons.", "حجم الخزان الأسطواني الرأسي أو المستطيل بالمتر المكعب واللتر والغالون الأمريكي."],
    calc_tank_volume_about: ["Full-tank geometric volume. Choose the shape and enter the internal dimensions in one length unit. Results are shown in m³, litres and US gallons.", "الحجم الهندسي للخزان الممتلئ. اختر الشكل وأدخل الأبعاد الداخلية بوحدة طول واحدة. تُعرض النتائج بالمتر المكعب واللتر والغالون الأمريكي."],
    lib_v_cyl: ["Vertical cylinder", "أسطوانة رأسية"],
    lib_v_rect_tank: ["Rectangular tank", "خزان مستطيل"],
    lib_f_tank_d: ["Internal diameter D", "القطر الداخلي D"],
    lib_f_tank_h: ["Height H", "الارتفاع H"],
    lib_f_tank_l: ["Internal length L", "الطول الداخلي L"],
    lib_f_tank_w: ["Internal width W", "العرض الداخلي W"],
    lib_res_tank_m3: ["Tank volume", "حجم الخزان"],
    lib_res_tank_l: ["Volume in litres", "الحجم باللتر"],
    lib_res_tank_gal: ["Volume in US gallons", "الحجم بالغالون الأمريكي"],
    lib_as_tank: ["Geometric volume of a full tank with internal dimensions. Ignores wall thickness, dished ends, internal fittings and freeboard. Usable capacity is lower.", "الحجم الهندسي لخزان ممتلئ بالأبعاد الداخلية. لا يشمل سماكة الجدار أو الرؤوس المقعرة أو التركيبات الداخلية أو الفراغ العلوي. السعة المستخدمة أقل."],

    // ---- Thermal expansion ----
    calc_thermal_expansion_title: ["Thermal Expansion Calculator", "حاسبة التمدد الحراري"],
    calc_thermal_expansion_desc: ["Linear expansion of a bar or pipe for a temperature change.", "التمدد الطولي لقضيب أو أنبوب عند تغير درجة الحرارة."],
    calc_thermal_expansion_about: ["Linear expansion ΔL = α × L₀ × ΔT for a temperature change ΔT. Choose a material to set a typical coefficient of linear expansion, or check the datasheet for your exact grade.", "التمدد الطولي ΔL = α × L₀ × ΔT لتغير الحرارة ΔT. اختر المادة لتحديد معامل تمدد خطي نموذجي، أو راجع ورقة بيانات الدرجة الدقيقة."],
    lib_f_material: ["Material", "المادة"],
    lib_mat_steel: ["Carbon steel (≈12 × 10⁻⁶ /K)", "فولاذ كربوني (≈12 × 10⁻⁶ /K)"],
    lib_mat_alu: ["Aluminium (≈23 × 10⁻⁶ /K)", "ألمنيوم (≈23 × 10⁻⁶ /K)"],
    lib_mat_cu: ["Copper (≈16.5 × 10⁻⁶ /K)", "نحاس (≈16.5 × 10⁻⁶ /K)"],
    lib_mat_conc: ["Concrete (≈10 × 10⁻⁶ /K)", "خرسانة (≈10 × 10⁻⁶ /K)"],
    lib_f_length0: ["Initial length L₀ (m)", "الطول الابتدائي L₀ (m)"],
    lib_f_t1: ["Initial temperature T₁ (°C)", "درجة الحرارة الابتدائية T₁ (°C)"],
    lib_f_t2: ["Final temperature T₂ (°C)", "درجة الحرارة النهائية T₂ (°C)"],
    lib_res_dl: ["Change in length ΔL", "التغير في الطول ΔL"],
    lib_res_lf: ["Final length", "الطول النهائي"],
    lib_as_thermal: ["Coefficient assumed constant over the temperature range. Typical values only; use the supplier's datasheet for design. Free expansion is assumed (no restraint). Joints and expansion allowances must be designed separately.", "معامل التمدد ثابت على مدى درجات الحرارة. قيم نموذجية فقط؛ استخدم ورقة بيانات المورد للتصميم. يُفترض تمدد حر دون تقييد. يجب تصميم الوصلات وسماحات التمدد بشكل منفصل."],

    // ---- Shared labels for batch 1 ----
    lib_v_default: ["Standard", "قياسي"]
  });
})();
