const fs=require('fs');
// map calc id -> library number
const libs=['calculators.js','calc-library-1.js','calc-library-2.js','calc-library-3.js','calc-library-4.js'];
const idToLib={};
for(const lib of libs){
  const src=fs.readFileSync('js/'+lib,'utf8');
  // find registerCalc({ id: "xxx"
  const re1=/registerCalc\(\{\s*id:\s*"([^"]+)"/g;
  const re2=/\breg\(\s*"([^"]+)"/g;
  let m; while((m=re1.exec(src))){ idToLib[m[1]]=lib; }
  while((m=re2.exec(src))){ idToLib[m[1]]=lib; }
}
// also calculators.js? check
console.log(Object.keys(idToLib).length);
// update each tool page
const files=fs.readdirSync('tools').filter(f=>f.endsWith('.html'));
for(const f of files){
  const id = f==='steel.html' ? 'steel-weight' : f.replace('.html','');
  const lib=idToLib[id];
  if(!lib){ console.log('NO LIB for',id); continue; }
  let s=fs.readFileSync('tools/'+f,'utf8');
  // remove all calc-library script tags
  s=s.replace(/\s*<script src="\.\.\/js\/calc-library-[1-4]\.js"><\/script>/g,'');
  // insert correct one before registry.js
  s=s.replace('<script src="../js/registry.js"></script>','<script src="../js/'+lib+'"></script>\n  <script src="../js/registry.js"></script>');
  fs.writeFileSync('tools/'+f,s,'utf8');
}
console.log('done');
