// scripts/seo-inject.js
// Injects per-page SEO tags into every HTML page:
//   - unique meta description (English in the static HTML; Arabic stored on
//     <html data-desc-ar> so js/main.js can swap it at the language toggle)
//   - self-referencing canonical tag
//   - Open Graph + Twitter card tags
// NOTE: no hreflang tags — both languages are served from ONE URL per page
// (client-side toggle), and same-URL hreflang annotations are invalid.
// Base URL from SITE_URL env var (default: production .pages.dev domain).
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SITE_URL = (process.env.SITE_URL || 'https://tekno-eg.pages.dev').replace(/\/$/, '');

// Verbatim per-page descriptions, keyed by page path (tools/<id>.html).
// EN feeds the static <meta name="description"> + og:description + twitter:description.
// AR is stored on <html data-desc-ar> and applied by js/main.js when the user toggles.
const DESC_TABLE = {
  '404.html': {
    en: 'Page not found. Browse the full TEKNO directory of free bilingual engineering calculators.',
    ar: 'الصفحة غير موجودة. تصفح دليل TEKNO الكامل للحاسبات الهندسية المجانية ثنائية اللغة.'
  },
  'tools/unit-converter.html': {
    en: 'Convert between units of length, area, volume, pressure, flow, temperature, power and weight, with the exact conversion factor shown for every step.',
    ar: 'حوّل بين وحدات الطول والمساحة والحجم والضغط والتدفق ودرجة الحرارة والقدرة والوزن، مع عرض معامل التحويل الدقيق في كل خطوة.'
  },
  'tools/concrete.html': {
    en: 'Calculate concrete volume in cubic metres for slabs, footings and beams from length, width and height, with the formula and solution steps shown.',
    ar: 'احسب حجم الخرسانة بالمتر المكعب للبلاطات والقواعد والكمرات من الطول والعرض والارتفاع، مع عرض القانون وخطوات الحل.'
  },
  'tools/steel.html': {
    en: 'Find the weight of reinforcing steel bars from bar diameter in mm and length in metres, covering common rebar sizes with the unit-weight formula shown.',
    ar: 'احسب وزن أسياخ حديد التسليح من قطر السيخ بالمليمتر وطوله بالمتر، يغطي الأقطار الشائعة مع عرض قانون وزن المتر الطولي خطوة بخطوة.'
  },
  'tools/hvac.html': {
    en: 'Convert tons of refrigeration to kW, size airflow in cfm and find chilled water flow in gpm, with every HVAC formula written out step by step.',
    ar: 'حوّل طن التبريد إلى كيلوواط، واحسب تدفق الهواء بالـcfm وتدفق الماء المبرد بالـgpm، مع عرض كل قوانين التكييف خطوة بخطوة.'
  },
  'tools/pump.html': {
    en: 'Compute pump hydraulic and shaft power from flow rate and head, convert pressure to pump head, and check efficiency, with formulas and steps shown.',
    ar: 'احسب القدرة الهيدروليكية وقدرة عمود الطلمبة من معدل التدفق وارتفاع الضخ، وحوّل الضغط إلى ارتفاع ضخ، مع عرض القوانين والخطوات.'
  },
  'tools/electrical-load.html': {
    en: 'Calculate single-phase and three-phase electrical load: real power, apparent power and current from voltage and power factor, with steps shown.',
    ar: 'احسب الحمل الكهربائي أحادي وثلاثي الطور: القدرة الفعلية والظاهرية والتيار من الجهد ومعامل القدرة، مع عرض الخطوات.'
  },
  'tools/voltage-drop.html': {
    en: 'Check voltage drop along copper or aluminium cables for single-phase and three-phase circuits, and confirm the cable size keeps drop within limits.',
    ar: 'تحقق من هبوط الجهد على كابلات النحاس أو الألومنيوم للدوائر أحادية وثلاثية الطور، وتأكد أن مقطع الكابل يحافظ على الهبوط في الحدود المسموحة.'
  },
  'tools/area-volume.html': {
    en: 'Calculate area, perimeter, volume and surface area for rectangles, triangles, circles, cylinders and boxes, with each formula written out.',
    ar: 'احسب المساحة والمحيط والحجم والمساحة السطحية للمستطيلات والمثلثات والدوائر والأسطوانات والصناديق، مع عرض كل قانون.'
  },
  'tools/ohms-law.html': {
    en: "Apply Ohm's law: find voltage, current or resistance from the other two values, plus the power dissipated, with the formula steps shown.",
    ar: 'طبّق قانون أوم: احسب الجهد أو التيار أو المقاومة من القيمتين الأخريين، مع القدرة المبددة وخطوات الحل.'
  },
  'tools/resistors-series-parallel.html': {
    en: 'Combine resistors in series or parallel to get the equivalent resistance for up to three resistors, with the calculation shown step by step.',
    ar: 'اجمع المقاومات على التوالي أو التوازي واحصل على المقاومة المكافئة حتى ثلاث مقاومات، مع عرض الحساب خطوة بخطوة.'
  },
  'tools/led-resistor.html': {
    en: 'Size the current-limiting series resistor for an LED from supply voltage, forward voltage and desired current, with the nearest standard E12 value.',
    ar: 'احسب مقاومة تحديد التيار المتسلسلة مع مصباح LED من جهد المصدر وجهد التوصيل الأمامي والتيار المطلوب، مع أقرب قيمة قياسية E12.'
  },
  'tools/reynolds-number.html': {
    en: 'Compute the Reynolds number for flow in a pipe from velocity, diameter and fluid properties, and classify the flow as laminar, transitional or turbulent.',
    ar: 'احسب عدد رينولدز للجريان داخل الأنابيب من السرعة والقطر وخواص المائع، وصنّف الجريان طباقيًا أو انتقاليًا أو مضطربًا.'
  },
  'tools/moment-of-inertia.html': {
    en: 'Calculate the second moment of area about the centroidal axis for rectangles, circles and hollow sections used in beam and column design.',
    ar: 'احسب عزم القصور الذاتي للمقطع حول المحور المركزي للمقاطع المستطيلة والدائرية والمجوفة المستخدمة في تصميم الكمرات والأعمدة.'
  },
  'tools/beam-deflection.html': {
    en: 'Find the midspan deflection of a simply supported beam under a uniform or concentrated load from span, load and section stiffness EI.',
    ar: 'احسب هبوط منتصف الكمرة بسيطة الارتكاز تحت حمل موزع منتظم أو حمل مركّز من البحر والحمل وصلابة المقطع EI.'
  },
  'tools/tank-volume.html': {
    en: 'Calculate the volume of a vertical cylindrical or rectangular tank in cubic metres, litres and US gallons from its dimensions.',
    ar: 'احسب حجم الخزان الأسطواني الرأسي أو المستطيل بالمتر المكعب واللتر والغالون الأمريكي من أبعاده.'
  },
  'tools/thermal-expansion.html': {
    en: 'Compute the linear thermal expansion of a bar or pipe for a temperature change, for steel, aluminium, copper, concrete and more.',
    ar: 'احسب التمدد الطولي الحراري لقضيب أو أنبوب عند تغير درجة الحرارة، للصلب والألومنيوم والنحاس والخرسانة وغيرها.'
  },
  'tools/bending-stress.html': {
    en: 'Calculate bending stress sigma = M c / I in a beam from the bending moment, section depth and moment of inertia, with steps shown.',
    ar: 'احسب إجهاد الانحناء sigma = M c / I في الكمرة من عزم الانحناء وعمق المقطع وعزم القصور، مع عرض الخطوات.'
  },
  'tools/section-modulus.html': {
    en: 'Find the elastic section modulus S = I / c for common cross-sections, the key value linking bending moment to bending stress.',
    ar: 'احسب معامل القطاع المرن S = I / c للمقاطع الشائعة، وهو القيمة الأساسية التي تربط عزم الانحناء بإجهاد الانحناء.'
  },
  'tools/column-buckling.html': {
    en: 'Compute the Euler critical buckling load of a column from its length, end conditions, material and section, with the formula shown.',
    ar: 'احسب حمل الانبعاج الحرج بواسطة قانون أويلر للعمود من طوله وشروط ارتكازه وخامته ومقطعه، مع عرض القانون.'
  },
  'tools/beam-reactions.html': {
    en: 'Find the support reactions of a simply supported beam under point and uniform loads using equilibrium, with each step written out.',
    ar: 'احسب ردود أفعال المساند لكمرة بسيطة الارتكاز تحت أحمال مركزة وموزعة باستخدام معادلات الاتزان، مع عرض كل خطوة.'
  },
  'tools/shear-moment.html': {
    en: 'Calculate shear force and bending moment values along a simply supported beam and get the maximum values for design.',
    ar: 'احسب قيم قصور القص وعزم الانحناء على طول كمرة بسيطة الارتكاز واحصل على القيم القصوى المستخدمة في التصميم.'
  },
  'tools/pipe-flow.html': {
    en: 'Calculate flow rate, velocity or pipe diameter from the continuity equation Q = V A for water and other fluids in pipes.',
    ar: 'احسب معدل التدفق أو السرعة أو قطر الأنبوب من معادلة الاستمرارية Q = V A للمياه والموائع الأخرى داخل الأنابيب.'
  },
  'tools/water-velocity.html': {
    en: 'Find the velocity of water in a pipe from the flow rate and pipe diameter, and check it against common design limits.',
    ar: 'احسب سرعة المياه داخل الأنبوب من معدل التدفق وقطر الأنبوب، وقارنها بحدود السرعة الشائعة في التصميم.'
  },
  'tools/hazen-williams.html': {
    en: 'Estimate friction head loss and flow velocity in water pipes with the Hazen-Williams equation for common pipe materials.',
    ar: 'قدّر فقد الاحتكاك وسرعة الجريان في مواسير المياه بمعادلة هازن-ويليامز لخامات المواسير الشائعة.'
  },
  'tools/bernoulli.html': {
    en: 'Apply the Bernoulli equation between two points in a flow: relate pressure, velocity and elevation head and solve for the unknown.',
    ar: 'طبّق معادلة برنولي بين نقطتين في الجريان: اربط بين الضغط والسرعة وارتفاع المنسوب واحسب القيمة المجهولة.'
  },
  'tools/air-density.html': {
    en: 'Calculate air density from temperature and pressure using the ideal gas law, the value needed for HVAC and fan calculations.',
    ar: 'احسب كثافة الهواء من درجة الحرارة والضغط باستخدام قانون الغاز المثالي، وهي القيمة اللازمة لحسابات التكييف والمراوح.'
  },
  'tools/hp-torque.html': {
    en: 'Convert between horsepower, torque and rotational speed in rpm for motors and rotating machines, with the formula shown.',
    ar: 'حوّل بين القدرة بالحصان وعزم الدوران وسرعة الدوران rpm للمواتير والماكينات الدوارة، مع عرض القانون.'
  },
  'tools/gear-ratio.html': {
    en: 'Compute gear ratio, output speed and output torque for a gear pair from the driver and driven tooth counts, with steps shown.',
    ar: 'احسب نسبة التروس وسرعة الخرج وعزم الخرج لزوج تروس من عدد أسنان الترس القائد والمقاد.'
  },
  'tools/belt-length.html': {
    en: 'Calculate the length of an open belt drive from the two pulley diameters and the centre distance between them.',
    ar: 'احسب طول السير المفتوح لنظام نقل الحركة من قطري البكرتين والمسافة بين مركزيهما.'
  },
  'tools/bolt-torque.html': {
    en: 'Find the tightening torque for a bolt from the target clamping force, bolt diameter and friction coefficient, with steps shown.',
    ar: 'احسب عزم ربط المسمار من قوة الشد المطلوبة وقطر المسمار ومعامل الاحتكاك.'
  },
  'tools/normal-stress.html': {
    en: 'Calculate normal stress, strain and elongation in an axially loaded bar from force, area, length and elastic modulus.',
    ar: 'احسب الإجهاد العمودي والانفعال والاستطالة في قضيب محمّل محوريًا من القوة والمساحة والطول ومعامل المرونة.'
  },
  'tools/spring-rate.html': {
    en: 'Compute the spring rate and natural frequency of a helical compression spring from wire diameter, coil diameter and active coils.',
    ar: 'احسب ثابت الزنبرك والتردد الطبيعي للزنبرك الحلزوني الانضغاطي من قطر السلك وقطر اللفة وعدد اللفات العاملة.'
  },
  'tools/bearing-life.html': {
    en: 'Estimate the L10 rating life of a rolling bearing in millions of revolutions and operating hours from load and speed.',
    ar: 'قدّر العمر التشغيلي L10 للرولمان بعمود الدوران بالمليون لفة وبالساعات التشغيلية من الحمل والسرعة.'
  },
  'tools/heat-conduction.html': {
    en: "Calculate steady heat conduction through a flat wall with Fourier's law from conductivity, area, thickness and temperature difference.",
    ar: 'احسب انتقال الحرارة بالتوصيل خلال حائط مستوٍ بقانون فورييه من التوصيلية الحرارية والمساحة والسمك وفرق درجة الحرارة.'
  },
  'tools/ideal-gas.html': {
    en: 'Solve the ideal gas law PV = nRT for pressure, volume, temperature or amount of gas when the other three are known.',
    ar: 'حل قانون الغاز المثالي PV = nRT لحساب الضغط أو الحجم أو درجة الحرارة أو كمية الغاز عند معرفة الثلاثة الأخرى.'
  },
  'tools/battery-runtime.html': {
    en: 'Estimate how long a battery will run a load from battery capacity, load current or power, and system efficiency.',
    ar: 'قدّر مدة تشغيل البطارية لحمل معين من سعة البطارية وتيار الحمل أو قدرته وكفاءة النظام.'
  },
  'tools/pf-correction.html': {
    en: 'Size the capacitor bank in kvar needed to raise the power factor of a load from its current value to the target value.',
    ar: 'احسب السعة المطلوبة لبنك المكثفات بالكيلوفار لرفع معامل القدرة لحمل كهربائي من قيمته الحالية إلى القيمة المستهدفة.'
  },
  'tools/transformer.html': {
    en: 'Calculate transformer turns ratio, secondary voltage and current from the primary values for single-phase transformers.',
    ar: 'احسب نسبة اللفات وجهد وتيار الملف الثانوي للمحول أحادي الطور من قيم الملف الابتدائي.'
  },
  'tools/motor-current.html': {
    en: 'Find the full-load current of a three-phase or single-phase motor from its power rating, voltage, efficiency and power factor.',
    ar: 'احسب تيار الحمل الكامل لموتور ثلاثي أو أحادي الطور من قدرته المقننة والجهد والكفاءة ومعامل القدرة.'
  },
  'tools/generator-size.html': {
    en: 'Size a standby generator in kVA from the total connected load, motor starting currents and a reserve margin, with steps shown.',
    ar: 'احسب قدرة المولد الاحتياطي بالكيلوفولت أمبير من إجمالي الأحمال الموصلة وتيارات البدء وهامش احتياطي.'
  },
  'tools/battery-bank.html': {
    en: 'Design a battery bank: total capacity in Ah, and the series and parallel arrangement of batteries for the system voltage.',
    ar: 'صمّم بنك البطاريات: السعة الكلية بالأمبير ساعة، وتوصيل البطاريات على التوالي والتوازي للحصول على جهد النظام.'
  },
  'tools/cable-resistance.html': {
    en: 'Calculate the resistance of a copper or aluminium conductor from its length, cross-section and operating temperature.',
    ar: 'احسب مقاومة موصل نحاسي أو ألومنيوم من طوله ومساحة مقطعه ودرجة حرارة التشغيل.'
  },
  'tools/heating-load.html': {
    en: 'Estimate the heating load of a room or building from transmission losses through walls, windows and ventilation air.',
    ar: 'قدّر الحمل الحراري للتدفئة لغرفة أو مبنى من الفقد بالانتقال خلال الحوائط والنوافذ وهواء التهوية.'
  },
  'tools/cooling-load.html': {
    en: 'Estimate sensible and latent cooling load for air conditioning from heat gains through the envelope, people and equipment.',
    ar: 'قدّر حمل التبريد المحسوس والكامن للتكييف من الحرارة المكتسبة خلال الجدران والأشخاص والأجهزة.'
  },
  'tools/duct-size.html': {
    en: 'Size round or rectangular air ducts from the required airflow and the allowable air velocity or friction rate.',
    ar: 'احسب أبعاد مجاري الهواء الدائرية أو المستطيلة من معدل تدفق الهواء المطلوب والسرعة أو معدل الاحتكاك المسموح به.'
  },
  'tools/dew-point.html': {
    en: 'Calculate the dew point temperature of air from dry bulb temperature and relative humidity, and check condensation risk.',
    ar: 'احسب درجة حرارة نقطة الندى للهواء من درجة الحرارة الجافة والرطوبة النسبية، وتحقق من خطر التكثيف.'
  },
  'tools/psychrometric.html': {
    en: 'Get moist air properties: humidity ratio, enthalpy, specific volume and dew point from dry bulb temperature and relative humidity.',
    ar: 'احسب خواص الهواء الرطب: نسبة الرطوبة والإنثالبي والحجم النوعي ونقطة الندى من درجة الحرارة الجافة والرطوبة النسبية.'
  },
  'tools/fan-power.html': {
    en: 'Calculate fan shaft power from airflow, total pressure rise and fan efficiency for HVAC fan selection, with steps shown.',
    ar: 'احسب قدرة عمود المروحة من معدل تدفق الهواء وفرق الضغط الكلي وكفاءة المروحة لاختيار مراوح التكييف.'
  },
  'tools/boiler-size.html': {
    en: 'Size a heating boiler in kW from the building heating load, with allowances for domestic hot water and a safety margin.',
    ar: 'احسب قدرة الغلاية بالكيلوواط من الحمل الحراري للمبنى، مع مراعاة المياه الساخنة المنزلية وهامش أمان.'
  },
  'tools/capacitors.html': {
    en: 'Combine capacitors in series or parallel to get the equivalent capacitance, and find the energy stored at a given voltage.',
    ar: 'اجمع المكثفات على التوالي أو التوازي واحصل على السعة المكافئة، واحسب الطاقة المخزنة عند جهد معين.'
  },
  'tools/resistor-colour.html': {
    en: "Decode a resistor's value from its colour bands, or find the band colours for a given resistance and tolerance.",
    ar: 'اقرأ قيمة المقاومة من ألوان شرائطها، أو اعرف ألوان الشرائح لقيمة مقاومة ونسبة سماح معينة.'
  },
  'tools/solar-array.html': {
    en: 'Size a solar PV array: number of panels and total area from the daily energy need, peak sun hours and system losses.',
    ar: 'احسب أبعاد نظام الخلايا الشمسية: عدد الألواح والمساحة الكلية من الاحتياج اليومي للطاقة وساعات الشمس الذروية وفقد النظام.'
  },
  'tools/hyd-cylinder.html': {
    en: 'Calculate hydraulic cylinder force, speed and required flow from bore diameter, rod diameter and system pressure.',
    ar: 'احسب قوة وسرعة الأسطوانة الهيدروليكية والتدفق المطلوب من قطر الأسطوانة وقطر العمود وضغط النظام.'
  },
  'tools/pneu-cylinder.html': {
    en: 'Calculate pneumatic cylinder force and air consumption from bore diameter, rod diameter and supply pressure, with steps shown.',
    ar: 'احسب قوة الأسطوانة الهوائية واستهلاك الهواء من قطر الأسطوانة وقطر العمود وضغط التغذية.'
  },
  'tools/valve-cv.html': {
    en: 'Size a control valve: compute the required Cv or Kv flow coefficient from flow rate, pressure drop and fluid properties.',
    ar: 'احسب معامل التدفق Cv أو Kv المطلوب لصمام التحكم من معدل التدفق وفرق الضغط وخواص المائع.'
  },
  'tools/tank-fill-time.html': {
    en: 'Find the time to fill or drain a tank from its volume and the inlet or outlet flow rate, in minutes and hours.',
    ar: 'احسب الزمن اللازم لملء أو تفريغ خزان من حجمه ومعدل تدفق الدخول أو الخروج، بالدقائق والساعات.'
  },
  'tools/retaining-wall.html': {
    en: "Calculate active earth pressure on a retaining wall with Rankine's theory from soil unit weight, friction angle and wall height.",
    ar: 'احسب ضغط التربة الفعال على الساندة الأرضي بنظرية رانكين من الوزن النوعي للتربة وزاوية الاحتكاك وارتفاع الساندة.'
  },
  'tools/stormwater.html': {
    en: 'Estimate stormwater runoff with the rational method Q = C i A from catchment area, rainfall intensity and runoff coefficient.',
    ar: 'قدّر مياه الأمطار السطحية بالطريقة الرشيدة Q = C i A من مساحة التجميع وشدة الأمطار ومعامل الجريان.'
  },
  'tools/darcy-weisbach.html': {
    en: 'Calculate friction head loss in a pipe with the Darcy-Weisbach equation from flow, pipe size, roughness and fluid viscosity.',
    ar: 'احسب فقد الاحتكاك في الأنابيب بمعادلة دارسي-وايزباخ من التدفق وأبعاد الأنبوب والخشونة ولزوجة المائع.'
  },
  'tools/bearing-capacity.html': {
    en: "Estimate the ultimate and allowable bearing capacity of shallow foundations with Terzaghi's equation from soil properties.",
    ar: 'قدّر قدرة التحمل القصوى والمسموحة للأساسات السطحية بمعادلة تيرزاغي من خواص التربة.'
  },
  'tools/lmtd.html': {
    en: 'Calculate the log mean temperature difference for counter-flow and parallel-flow heat exchangers from inlet and outlet temperatures.',
    ar: 'احسب متوسط فرق درجات الحرارة اللوغاريتمي لمبادلات الحرارة بجريان متعاكس أو متوازي من درجات حرارة الدخول والخروج.'
  },
  'tools/insulation-loss.html': {
    en: 'Calculate heat loss from an insulated pipe or flat surface from insulation conductivity, thickness and temperatures.',
    ar: 'احسب الفقد الحراري من مواسير أو أسطح معزولة من التوصيلية الحرارية للعزل وسمكه ودرجات الحرارة.'
  },
  'tools/welding-heat.html': {
    en: 'Compute welding heat input in kJ/mm from voltage, current, travel speed and process efficiency for welding procedure checks.',
    ar: 'احسب الحرارة الداخلة في اللحام بالكيلوجول/مم من الجهد والتيار وسرعة اللحام وكفاءة العملية لمراجعة إجراءات اللحام.'
  },
  'tools/cutting-speed.html': {
    en: 'Convert between cutting speed, spindle rpm and workpiece diameter for turning, milling and drilling operations.',
    ar: 'حوّل بين سرعة القطع وعدد لفات الماكينة rpm وقطر الشغلة في عمليات الخراطة والتفريز والثقب.'
  },
  'tools/bend-allowance.html': {
    en: 'Calculate sheet metal bend allowance and bend deduction from material thickness, bend angle, radius and K-factor.',
    ar: 'احسب بدل الثني وخصم الثني للصفائح المعدنية من سمك المعدن وزاوية الثني ونصف القطر ومعامل K.'
  }
};

const HOME_DESC = 'Free, practical engineering calculators for civil, mechanical, electrical, and architecture professionals. Runs in your browser, bilingual English and Arabic.';
const TOOLS_DESC = 'Browse the full TEKNO directory of free engineering calculators across 16 disciplines. Search and filter by category.';

const htmlFiles = [];
function collect(dir) {
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (f === 'node_modules' || f === '.git' || f === '.wrangler') continue;
      collect(full);
    } else if (f.endsWith('.html')) {
      htmlFiles.push(full);
    }
  }
}
collect(ROOT);

function titleFromHtml(html) {
  const m = html.match(/<title>([^<]+)<\/title>/i);
  return m ? m[1].trim() : 'TEKNO Engineering Calculators';
}

function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

// Set (or clear) data-desc-en / data-desc-ar on the <html> tag.
function setHtmlDescAttrs(html, en, ar) {
  return html.replace(/<html([^>]*)>/i, function (m, attrs) {
    let a = attrs
      .replace(/\s*data-desc-en="[^"]*"/g, '')
      .replace(/\s*data-desc-ar="[^"]*"/g, '');
    if (en != null) a += ' data-desc-en="' + esc(en) + '"';
    if (ar != null) a += ' data-desc-ar="' + esc(ar) + '"';
    return '<html' + a + '>';
  });
}

let missing = 0;
for (const file of htmlFiles) {
  let html = fs.readFileSync(file, 'utf8');
  const rel = path.relative(ROOT, file).replace(/\\/g, '/');
  const title = titleFromHtml(html);

  const entry = Object.prototype.hasOwnProperty.call(DESC_TABLE, rel) ? DESC_TABLE[rel] : null;
  let desc;
  if (rel === 'index.html') desc = HOME_DESC;
  else if (rel === 'tools.html') desc = TOOLS_DESC;
  else if (entry) desc = entry.en;
  else {
    // Unknown page (e.g. a new tool without a table entry yet) — warn, never go silent.
    const clean = title.replace(/\s*\|\s*TEKNO.*$/i, '').trim();
    desc = 'Free online ' + clean + ' calculator with step-by-step formulas. Bilingual English and Arabic.';
    console.warn('  ! no description in table for ' + rel + ' — using title-derived fallback');
    missing++;
  }

  let urlPath = rel.replace(/\.html$/, '');
  if (urlPath === 'index') urlPath = '';
  urlPath = '/' + urlPath;
  if (urlPath === '//') urlPath = '/';
  const urlFinal = SITE_URL + urlPath;

  // Remove the tags we manage. hreflang lines are removed and never re-added:
  // one URL serves both languages, so same-URL hreflang is invalid.
  html = html.replace(/\s*<link rel="canonical"[^>]*>\n?/gi, '\n');
  html = html.replace(/\s*<meta name="description"[^>]*>\n?/gi, '\n');
  html = html.replace(/\s*<link rel="alternate" hreflang="[^"]*"[^>]*>\n?/gi, '\n');
  html = html.replace(/\s*<meta property="og:[^"]*"[^>]*>\n?/gi, '\n');
  html = html.replace(/\s*<meta name="twitter:[^"]*"[^>]*>\n?/gi, '\n');
  html = setHtmlDescAttrs(html, entry ? entry.en : null, entry ? entry.ar : null);

  const block = `
  <meta name="description" content="${esc(desc)}">
  <link rel="canonical" href="${urlFinal}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(desc)}">
  <meta property="og:url" content="${urlFinal}">
  <meta property="og:image" content="${SITE_URL}/assets/og-card.svg">
  <meta property="og:site_name" content="TEKNO">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(desc)}">
  <meta name="twitter:image" content="${SITE_URL}/assets/og-card.svg">`;

  html = html.replace(/<\/head>/i, block + '\n</head>');
  fs.writeFileSync(file, html, 'utf8');
}
console.log('Injected SEO tags into ' + htmlFiles.length + ' HTML files (base: ' + SITE_URL + ')' + (missing ? ' — WARNING: ' + missing + ' page(s) missing from description table' : ''));
