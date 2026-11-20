const fs=require('fs');
const files=['index.html','tools.html',...fs.readdirSync('tools').filter(f=>f.endsWith('.html')).map(f=>'tools/'+f)];
for(const p of files){
  let s=fs.readFileSync(p,'utf8');
  if(!s.includes('translations-ar-batch.js')){
    s=s.replace('<script src="../js/registry.js"></script>','<script src="../js/translations-ar-batch.js"></script>\n  <script src="../js/registry.js"></script>');
    s=s.replace('<script src="js/registry.js"></script>','<script src="js/translations-ar-batch.js"></script>\n  <script src="js/registry.js"></script>');
  }
  fs.writeFileSync(p,s,'utf8');
}
console.log('done');
