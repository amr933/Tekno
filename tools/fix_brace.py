import re
p='js/calc-library-2.js'
s=open(p,encoding='utf-8').read()
s=s.replace('    } }\n  });','    } }\n  } );')
open(p,'w',encoding='utf-8').write(s)
print('done')
"