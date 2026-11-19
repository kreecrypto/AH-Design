import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, mkdtemp, writeFile, rm } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const file=async p=>JSON.parse(await readFile(path.join(ROOT,p),'utf8'));
const run=(...args)=>spawnSync(process.execPath,['scripts/validate.mjs',...args],{cwd:ROOT,encoding:'utf8',timeout:15000});
test('Canonical contracts validate',()=>{
  const r=run();assert.equal(r.status,0,r.stderr);assert.match(r.stdout,/PASS:/);
});
async function negative(src,flag,mutate,needle) {
  const dir=await mkdtemp(path.join(tmpdir(),'ah-contract-'));
  try {
    const data=await file(src);mutate(data);
    const target=path.join(dir,'changed.json');await writeFile(target,JSON.stringify(data));
    const r=run(flag,target);
    assert.notEqual(r.status,0,'Semantic mutation must fail');
    assert.ok(r.stderr.includes(needle),r.stderr);
  }finally{await rm(dir,{recursive:true,force:true});}
}
test('Home hero 1240 -> 1300 is caught with path',async()=>{
  await negative('contracts/components.json','--components',
    o=>{o.components.find(x=>x.id==='home-hero').widthPx=1300;},
    'components.components[10].widthPx');
});
test('Other component mutation is caught',async()=>{
  await negative('contracts/components.json','--components',
    o=>{o.components.find(x=>x.id==='pagination').itemSizePx=99;},
    'components.components[9].itemSizePx');
});
test('Weakening privacy is caught',async()=>{
  await negative('contracts/policies.json','--policies',
    o=>{o.modes['privacy-safe-skeleton'].readableBusinessData=true;},
    'readableBusinessData');
});
test('Home page-surface mutation is caught',async()=>{
  await negative('contracts/page-profiles.json','--page-profiles',
    o=>{o.profiles['home-desktop'].mainSurface='var(--ah-app-bg)';},
    'pageProfiles.profiles.home-desktop.mainSurface');
});
test('Missing schema required id is caught',async()=>{
  await negative('contracts/components.json','--components',
    o=>{delete o.components[0].id;},
    'missing id');
});

test('Even updating baseline together with Hero cannot override the canonical source',async()=>{
  const dir=await mkdtemp(path.join(tmpdir(),'ah-source-anchor-'));
  try{
    const data=await file('contracts/components.json');
    const approved=await file('contracts/approved-baseline.json');
    data.components.find(x=>x.id==='home-hero').widthPx=1300;
    approved.snapshot.components.find(x=>x.id==='home-hero').widthPx=1300;
    const c=path.join(dir,'components.json'),b=path.join(dir,'approved.json');
    await writeFile(c,JSON.stringify(data));await writeFile(b,JSON.stringify(approved));
    const r=run('--components',c,'--approved',b);
    assert.notEqual(r.status,0,'Canonical source should forbid unapproved dual changes');
    assert.match(r.stderr,/Source anchor mismatch: home-hero.widthPx/);
  }finally{await rm(dir,{recursive:true,force:true});}
});
