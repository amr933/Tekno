const fs=require('fs');
let s=fs.readFileSync('js/calc-library-2.js','utf8');
s=s.split('    } }\n  });').join('    } }\n  } );');
fs.writeFileSync('js/calc-library-2.js',s,'utf8');
console.log('done');
