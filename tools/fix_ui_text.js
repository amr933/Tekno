const fs=require('fs');
const lines=fs.readFileSync('js/translations.js','utf8').split(/\r?\n/);
// find and replace lines
for(let i=0;i<lines.length;i++){
  if(lines[i].includes('why_3_d:')) lines[i]='    why_3_d: ["No backend, no database and no accounts. Everything runs in your browser, so pages load instantly and work offline.", "بدون خادم وقاعدة بيانات وحسابات. كل شيء يعمل في متصفحك، لذا تحمّل الصفحات فوراً وتعمل دون اتصال."],';
  if(lines[i].includes('roadmap_note:')) lines[i]='    roadmap_note: ["", ""],';
  if(lines[i].includes('footer_disclaimer:')) lines[i]='    footer_disclaimer: ["Results are for guidance only. Check every design against the applicable standards, and results must be reviewed with a qualified engineer.", "النتائج للتوجيه فقط. تحقق من كل تصميم وفق المعايير المعمول بها، ويجب مراجعة النتائج مع مهندس مختص."],';
}
fs.writeFileSync('js/translations.js',lines.join('\n'),'utf8');
console.log('done');
