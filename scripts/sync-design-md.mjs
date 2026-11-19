// Keep the one-system DESIGN.md distribution byte-identical with the canonical source.
// No network, Figma or other design system dependency.
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { ROOT, MASTER } from './lib/tokens.mjs';

const paths=['DESIGN.md','design-md/ah-design/DESIGN.md'];
const source=await readFile(path.join(ROOT,MASTER));
let okay=true;
for(const item of paths){
  const full=path.join(ROOT,item);
  if(process.argv.includes('--check')){
    let actual=Buffer.alloc(0);
    try{actual=await readFile(full);}catch{}
    if(!source.equals(actual)){console.error('DRIFT: '+item+' differs from '+MASTER+'; run npm run design:sync');okay=false;}
    else console.log('OK: '+item+' matches canonical source ('+source.length+' bytes)');
  }else{
    await writeFile(full,source);
    console.log('Synced: '+item);
  }
}
if(!okay)process.exitCode=1;
