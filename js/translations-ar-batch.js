/* Arabic translations for batch 2-4 calculator titles/descriptions. Loaded last to override English fallback. */
(function () {
  "use strict";
  var TEKNO = window.TEKNO;
  if (!TEKNO || !TEKNO.keys) return;
  // We only override the Arabic (index 1) of existing keys by replacing whole entries.
  var A = {
    calc_bending_stress_title: ["Bending Stress Calculator", "حاسبة إجهاد الانحناء"],
    calc_section_modulus_title: ["Section Modulus Calculator", "حاسبة معامل المقطع"],
    calc_column_buckling_title: ["Column Buckling Calculator", "حاسبة انكماش العمود"],
    calc_pipe_flow_title: ["Pipe Flow Calculator", "حاسبة تدفق الأنابيب"],
    calc_ideal_gas_title: ["Ideal Gas Calculator", "حاسبة الغاز المثالي"],
    calc_motor_current_title: ["Motor Current Calculator", "حاسبة تيار المحرك"],
    calc_fan_power_title: ["Fan Power Calculator", "حاسبة قدرة المروحة"],
    calc_solar_array_title: ["Solar Array Calculator", "حاسبة مصفوفة الطاقة الشمسية"],
    calc_retaining_wall_title: ["Retaining Wall Calculator", "حاسبة الجدار الاستنادي"],
    calc_stormwater_title: ["Stormwater Calculator", "حاسبة مياه الأمطار"],
    calc_darcy_weisbach_title: ["Darcy-Weisbach Calculator", "حاسبة دارسي-فايسباخ"],
    calc_bearing_capacity_title: ["Bearing Capacity Calculator", "حاسبة قدرة تحمل التربة"],
    calc_lmtd_title: ["LMTD Calculator", "حاسبة فرق درجة الحرارة اللوغاريتمي"],
    calc_welding_heat_title: ["Welding Heat Input Calculator", "حاسبة إدخال حرارة اللحام"],
    calc_cutting_speed_title: ["Cutting Speed Calculator", "حاسبة سرعة القطع"],
    calc_bend_allowance_title: ["Bend Allowance Calculator", "حاسبة بدل الانحناء"]
  };
  Object.assign(TEKNO.keys, A);
})();
