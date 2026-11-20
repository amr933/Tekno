const fs=require('fs');
const ids=require('./ids.js')||[];
// manual mapping
const map={
'unit-converter':'محول الوحدات','concrete':'حجم الخرسانة','steel-weight':'وزن حديد التسليح','hvac':'التدفئة والتهوية وتكييف الهواء','pump':'المضخة','electrical-load':'الحمل الكهربائي','voltage-drop':'落差 الجهد','area-volume':'المساحة والحجم',
'ohms-law':'قانون أوم','resistors-series-parallel':'المقاومات على التوالي/التوازي','led-resistor':'مقاومة LED','reynolds-number':'رقم رينولدز','moment-of-inertia':'moment of inertia','beam-deflection':'انحراف العارضة','tank-volume':'حجم الخزان','thermal-expansion':'التمدد الحراري',
'bending-stress':'إجهاد الانحناء','section-modulus':'معامل المقطع','column-buckling':'座屈 العمود','beam-reactions':'ردود فعل العارضة','shear-moment':'القص والعزوم','pipe-flow':'تدفق الأنابيب','water-velocity':'سرعة الماء','hazen-williams':'هازن-ويليامز','bernoulli':'برنولي','air-density':'كثافة الهواء','hp-torque':'القدرة والعزوم','gear-ratio':'نسبة التروس','belt-length':'طول courroie','bolt-torque':'عزوم البراغي','normal-stress':'إجهاد normal','spring-rate':'ثابت الزنبرك','bearing-life':'عمر المحمل','heat-conduction':'التوصيل الحراري','ideal-gas':'الغاز المثالي',
'battery-runtime':'مدة بطارية','pf-correction':'تصحيح عامل القدرة','transformer':'المحول','motor-current':'تيار المحرك','generator-size':'حجم المولد','battery-bank':'بنك البطاريات','cable-resistance':'resistance الكابل','heating-load':'حمل التدفئة','cooling-load':'حمل التبريد','duct-size':'حجم القناة','dew-point':'نقطة الندى','psychrometric':'السيكو متري','fan-power':'قدرة المروحة','boiler-size':'حجم الغلاية','capacitors':'المكثفات','resistor-colour':'رمز ألوان المقاومة','solar-array':'مصفوفة شمسية','hyd-cylinder':'أسطوانة هيدروليكية','pneu-cylinder':'أسطوانة هوائية','valve-cv':'معامل Cv','tank-fill-time':'زمن ملء الخزان',
'retaining-wall':'جدار استنادي','stormwater':'śmy مياه الأمطار','darcy-weisbach':'دارسي-فايسباخ','bearing-capacity':'قدرة تحمل','lmtd':'LMTD','insulation-loss':'فقدان عزل','welding-heat':'إدخال حرارة لحام','cutting-speed':'سرعة قطع','bend-allowance':'بدل انحناء'
};
let out='/* Arabic titles batch 2-4 */\n(function(){\n  "use strict";\n  var TEKNO=window.TEKNO;\n  if(!TEKNO||!TEKNO.keys) return;\n  var A={};\n';
for(const [k,v] of Object.entries(map)){
  out+=`    calc_${k.replace(/-/g,'_')}_title: ["${k}", "${v}"],\n`;
}
out+='  };\n  Object.assign(TEKNO.keys, A);\n})();\n';
fs.writeFileSync('js/ar-titles-extra.js',out,'utf8');
console.log('done');
