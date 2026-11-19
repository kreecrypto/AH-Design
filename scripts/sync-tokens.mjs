import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { ROOT, MASTER, buildTokenFiles } from './lib/tokens.mjs';

const result = buildTokenFiles(await readFile(path.join(ROOT, MASTER), 'utf8'));
const outputs = [['tokens/ah-tokens.css', result.css], ['tokens/ah-tokens.json', result.json]];
let ok = true;
for (const [relative, expected] of outputs) {
  const file = path.join(ROOT, relative);
  if (process.argv.includes('--check')) {
    const actual = await readFile(file, 'utf8').catch(() => '');
    if (actual !== expected) { console.error('DRIFT: ' + relative + ' — run npm run tokens:sync'); ok = false; }
    else console.log('OK: ' + relative);
  } else {
    await writeFile(file, expected, 'utf8');
    console.log('Updated: ' + relative);
  }
}
if (!ok) process.exitCode = 1;
