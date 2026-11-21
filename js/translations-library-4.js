/* Translation strings for calculator library batch 4. */
(function () {
  "use strict";
  var TEKNO = window.TEKNO;
  if (!TEKNO || !TEKNO.keys) return;
  Object.assign(TEKNO.keys, {
    lib_err_radii: ["Outer radius must be greater than inner radius.", "يجب أن يكون نصف القطر الخارجي أكبر من نصف القطر الداخلي."],

    // ===================== BATCH-4 CALCULATORS =====================
    // Retaining Wall (Rankine)
    calc_retaining_wall_title: ["Retaining Wall Calculator", "حاسبة الجدار الاستنادي"],
    calc_retaining_wall_desc: ["Rankine active earth pressure and resultant force.", "ضغط التربة الفعال وفق رانكين والقوة المحصلة."],
    calc_retaining_wall_about: ["Rankine theory for cohesionless backfill.", "نظرية رانكين للردم غير المتماسك."],
    f_height: ["Wall height", "ارتفاع الجدار"],
    f_gamma: ["Soil unit weight (kN/m³)", "الوزن الحجمي للتربة (كيلونيوتن/م³)"],
    f_phi: ["Friction angle (°)", "زاوية الاحتكاك (°)"],
    res_pa: ["Active thrust", "الدفع الفعال"],
    res_ka: ["Active pressure coeff.", "معامل الضغط الفعال"],
    lib_as_rw: ["Rankine active, horizontal backfill, no surcharge.", "رانكين فعال، ردم أفقي، بدون حمل إضافي."],

    // Stormwater Rational Method
    calc_stormwater_title: ["Stormwater Calculator", "حاسبة مياه الأمطار"],
    calc_stormwater_desc: ["Peak runoff via Rational Method Q = C i A / 360.", "تصريف الذروة بطريقة البرنامج Q = C i A / 360."],
    calc_stormwater_about: ["Rational method for small catchments.", "طريقة البرنامج للأحواض الصغيرة."],
    f_c: ["Runoff coefficient C", "معامل الجريان C"],
    f_intensity: ["Rainfall intensity (mm/h)", "شدة المطر (مم/س)"],
    f_catch_area: ["Catchment area (ha)", "مساحة الحوض (هكتار)"],
    res_q: ["Peak flow", "التصريف القمة"],
    lib_as_sw: ["Rational method, time of concentration <= storm duration.", "طريقة البرنامج، زمن التركيز <= مدة العاصفة."],

    // Darcy-Weisbach
    calc_darcy_weisbach_title: ["Darcy-Weisbach Calculator", "حاسبة دارسي-فايسباخ"],
    calc_darcy_weisbach_desc: ["Pipe head loss and pressure drop via Darcy-Weisbach.", "فاقد الرأس وهبوط الضغط في الأنابيب بدارسي-فايسباخ."],
    calc_darcy_weisbach_about: ["Darcy-Weisbach for circular pipes.", "دارسي-فايسباخ للأنابيب الدائرية."],
    f_friction: ["Friction factor f", "معامل الاحتكاك f"],
    f_length: ["Pipe length (m)", "طول الأنبوب (م)"],
    f_pipe_dia: ["Pipe diameter (m)", "قطر الأنبوب (م)"],
    f_velocity: ["Flow velocity (m/s)", "سرعة التدفق (م/ث)"],
    f_density: ["Fluid density (kg/m³)", "كثافة السائل (كجم/م³)"],
    res_hf: ["Head loss", "فاقد الرأس"],
    res_pdrop: ["Pressure drop", "هبوط الضغط"],
    lib_as_dw: ["Steady incompressible flow, constant friction factor.", "تدفق غير قابل للانضغاط مستقر، معامل احتكاك ثابت."],

    // Bearing Capacity (Terzaghi)
    calc_bearing_capacity_title: ["Bearing Capacity Calculator", "حاسبة قدرة التحمل"],
    calc_bearing_capacity_desc: ["Terzaghi strip footing ultimate bearing capacity.", "قدرة التحمل القصوى للقواعد الشريطية بترباغي."],
    calc_bearing_capacity_about: ["Terzaghi general shear for strip footing.", "القص العام لترباغي للقاعدة الشريطية."],
    f_cohesion: ["Cohesion c (kPa)", "التماسك c (كيلو باسكال)"],
    f_surcharge: ["Surcharge q (kPa)", "الحمل الإضافي q (كيلو باسكال)"],
    f_gamma: ["Soil unit weight (kN/m³)", "الوزن الحجمي للتربة (كيلونيوتن/م³)"],
    f_width: ["Foundation width B (m)", "عرض الأساس B (م)"],
    f_nc: ["Bearing factor Nc", "عامل التحمل Nc"],
    f_nq: ["Bearing factor Nq", "عامل التحمل Nq"],
    f_ngamma: ["Bearing factor Nγ", "عامل التحمل Nγ"],
    res_qu: ["Ultimate capacity", "القدرة القصوى"],
    lib_as_bc: ["General shear, no water table, strip footing.", "قص عام، لا منسوب ماء، قاعدة شريطية."],

    // Heat Exchanger LMTD
    calc_lmtd_title: ["LMTD Calculator", "حاسبة الفرق الحراري اللوغاريتمي المتوسط"],
    calc_lmtd_desc: ["Log-mean temperature difference for heat exchangers.", "الفرق الحراري اللوغاريتمي المتوسط للمبادلات الحرارية."],
    calc_lmtd_about: ["LMTD for counter/parallel flow.", "LMTD للتدفق المعاكس/المتوازي."],
    f_thi: ["Hot inlet (°C)", "دخول الساخن (°م)"],
    f_tho: ["Hot outlet (°C)", "خروج الساخن (°م)"],
    f_tci: ["Cold inlet (°C)", "دخول البارد (°م)"],
    f_tco: ["Cold outlet (°C)", "خروج البارد (°م)"],
    res_lmtd: ["LMTD", "الفرق الحراري اللوغاريتمي المتوسط"],
    lib_as_lmtd: ["Constant U, no phase change, counter/parallel flow.", "U ثابت، لا تغيير طور، تدفق معاكس/متوازي."],

    // Insulation Heat Loss (cylindrical)
    calc_insulation_loss_title: ["Insulation Loss Calculator", "حاسبة فاقد العزل"],
    calc_insulation_loss_desc: ["Cylindrical insulation heat loss Q = 2πkLΔT/ln(r2/r1).", "فاقد الحرارة للعزل الأسطواني Q = 2πkLΔT/ln(r2/r1)."],
    calc_insulation_loss_about: ["Steady radial conduction through pipe insulation.", "التوصيل الشعاعي المستقر عبر عزل الأنابيب."],
    f_thermal_k: ["Thermal conductivity (W/m.K)", "الموصلية الحرارية (واط/م.كلفن)"],
    f_r1: ["Inner radius (m)", "نصف القطر الداخلي (م)"],
    f_r2: ["Outer radius (m)", "نصف القطر الخارجي (م)"],
    f_dT: ["Temperature difference (K)", "فرق درجة الحرارة (كلفن)"],
    res_heat_loss: ["Heat loss", "فاقد الحرارة"],
    lib_as_ins: ["Steady 1D radial conduction, constant k.", "توصيل شعاعي 1D مستقر، k ثابت."],

    // Welding Heat Input
    calc_welding_heat_title: ["Welding Heat Input Calculator", "حاسبة الدخل الحراري لللحام"],
    calc_welding_heat_desc: ["Heat input HI = V*I*60/s (mm/min) or V*I/s (mm/s).", "الدخل الحراري HI = V*I*60/s (مم/د) أو V*I/s (مم/ث)."],
    calc_welding_heat_about: ["Arc welding heat input per unit length.", "الدخل الحراري لقوس اللحام لكل وحدة طول."],
    f_voltage: ["Arc voltage (V)", "جهد القوس (فولت)"],
    f_current: ["Welding current (A)", "تيار اللحام (أمبير)"],
    f_speed: ["Travel speed", "سرعة التحرك"],
    res_hi: ["Heat input", "الدخل الحراري"],
    lib_as_weld: ["Arc welding, constant V and I, no preheat.", "قوس اللحام، جهد وتيار ثابتان، بدون تسخين مسبق."],

    // Cutting Speed RPM
    calc_cutting_speed_title: ["Cutting Speed Calculator", "حاسبة سرعة القطع"],
    calc_cutting_speed_desc: ["Spindle speed N = 1000*Vc/(π*D).", "سرعة المحور N = 1000*Vc/(π*D)."],
    calc_cutting_speed_about: ["Turning/milling RPM from cutting speed and diameter.", "دورة المحور للخراطة/التفريز من سرعة القطع والقطر."],
    f_vc: ["Cutting speed (m/min)", "سرعة القطع (م/د)"],
    f_dia: ["Workpiece/tool diameter (mm)", "قطر المشغولة/الأداة (مم)"],
    res_rpm: ["Spindle speed", "سرعة المحور"],
    lib_as_cut: ["Constant cutting speed, rigid setup.", "سرعة قطع ثابتة، تثبيت صلب."],

    // Sheet Metal Bend Allowance
    calc_bend_allowance_title: ["Bend Allowance Calculator", "حاسبة بدل الانحناء"],
    calc_bend_allowance_desc: ["Bend allowance BA = angle(rad)*(R+K*T).", "بدل الانحناء BA = الزاوية(rad)*(R+K*T)."],
    calc_bend_allowance_about: ["Flat pattern length for a sheet metal bend.", "طول النمط المسطح لانحناء صفيحة معدنية."],
    f_angle: ["Bend angle (°)", "زاوية الانحناء (°)"],
    f_radius: ["Inside bend radius (mm)", "نصف قطر الانحناء الداخلي (مم)"],
    f_sheet_thk: ["Sheet thickness (mm)", "سماكة الصفيحة (مم)"],
    f_kfactor: ["K-factor", "معامل K"],
    res_ba: ["Bend allowance", "بدل الانحناء"],
    lib_as_ba: ["Air bending, K-factor constant through thickness.", "ثني هوائي، معامل K ثابت عبر السماكة."],

  });
})();