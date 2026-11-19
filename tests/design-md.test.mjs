import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=p=>readFile(path.join(ROOT,p));
test('Both AH DESIGN.md entrypoints are exact canonical mirrors',async()=>{
  const source=await read('docs/AH_DESIGN_v2.6.md');
  for(const file of ['DESIGN.md','design-md/ah-design/DESIGN.md']){
    const content=await read(file);
    assert.ok(source.equals(content),file+' must not drift');
  }
});
test('design:check is a standalone CI quality gate',()=>{
  const r=spawnSync(process.execPath,['scripts/sync-design-md.mjs','--check'],{cwd:ROOT,encoding:'utf8',timeout:10000});
  assert.equal(r.status,0,r.stderr);
  assert.match(r.stdout,/matches canonical source/);
});
test('AH preview is self-contained, mirrored, and never claims dark mode',async()=>{
  const root=await read('preview.html');
  const entry=await read('design-md/ah-design/preview.html');
  assert.ok(root.equals(entry),'Single-preview mirrors must be identical');
  const html=root.toString('utf8');
  assert.match(html,/<html lang="en">/);
  assert.match(html,/--ah-primary:/);
  assert.match(html,/privacy-safe-skeleton/);
  assert.match(html,/44px compact row/i);
  assert.doesNotMatch(html,/<script\b/i);
  assert.doesNotMatch(html,/@font-face\b/i);
  assert.doesNotMatch(html,/preview-dark\.html/);
});
test('AH-only curated README contains copyable guidance and the only collection entry',async()=>{
  const readme=(await read('README.md')).toString('utf8');
  const entry=(await read('design-md/ah-design/README.md')).toString('utf8');
  assert.match(readme,/design-md\/ah-design\/DESIGN\.md/);
  assert.match(readme,/Default content|privacy-safe skeleton|privacy-safe-skeleton/i);
  assert.match(entry,/one design system only/i);
});
