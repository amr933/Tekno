const fs=require('fs');
const files=['index.html','tools.html',...fs.readdirSync('tools').filter(f=>f.endsWith('.html')).map(f=>'tools/'+f)];
for(const p of files){
  let s=fs.readFileSync(p,'utf8');
  if(!s.includes('calc-library-2.js')){
    s=s.replace('<script src="../js/calc-library-1.js"></script>','<script src="../js/calc-library-1.js"></script>\n  <script src="../js/calc-library-2.js"></script>');
    s=s.replace('<script src="js/calc-library-1.js"></script>','<script src="js/calc-library-1.js"></script>\n  <script src="js/calc-library-2.js"></script>');
  }
  if(!s.includes('translations-library-2.js')){
    s=s.replace('<script src="../js/translations-library-1.js"></script>','<script src="../js/translations-library-1.js"></script>\n  <script src="../js/translations-library-2.js"></script>');
    s=s.replace('<script src="js/translations-library-1.js"></script>','<script src="js/translations-library-1.js"></script>\n  <script src="js/translations-library-2.js"></script>');
  }
  fs.writeFileSync(p,s,'utf8');
}
console.log('done');
