import { readFile } from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import { ROOT, MASTER, buildTokenFiles, gitBlobSha } from './lib/tokens.mjs';

const read = p => readFile(path.join(ROOT, p), 'utf8');
const [source, css, json, manifestText, componentsText, layoutsText, policiesText] = await Promise.all([
  read(MASTER), read('tokens/ah-tokens.css'), read('tokens/ah-tokens.json'),
  read('design-system.json'), read('contracts/components.json'), read('contracts/layouts.json'), read('contracts/policies.json')
]);
const generated = buildTokenFiles(source);
assert.equal(css, generated.css, 'CSS token export drift');
assert.equal(json, generated.json, 'JSON token export drift');
const tokens = JSON.parse(json), manifest = JSON.parse(manifestText);
const components = JSON.parse(componentsText), layouts = JSON.parse(layoutsText), policies = JSON.parse(policiesText);
assert.equal(tokens.tokenCount, 77, 'Check approved token count if canonical Design.md changed');
assert.equal(tokens.sourceGitBlobSha, gitBlobSha(source));
assert.equal(manifest.sourceOfTruth.gitBlobSha, gitBlobSha(source), 'Update source SHA deliberately after canonical change');
assert.equal(manifest.defaultContentMode, 'privacy-safe-skeleton');
assert.equal(policies.defaultMode, 'privacy-safe-skeleton');
assert.equal(policies.modes['privacy-safe-skeleton'].readableBusinessData, false);
assert.equal(layouts.shell.desktop.sidebarPx, 200);
assert.equal(layouts.shell.desktop.gutterPx, 16);
const ids = components.components.map(c => c.id);
assert.equal(ids.length, 19);
assert.equal(ids.length, new Set(ids).size, 'Duplicate component id');
for (const c of components.components) {
  assert.ok(c.id && c.section && c.scope, 'Component metadata incomplete');
  for (const section of c.section.split(' and ')) {
    const headings = source.split('\n').filter(line => line.startsWith('# ' + section + '.') || line.startsWith('## ' + section + ' ') || line.startsWith('### ' + section + ' '));
    assert.ok(headings.length > 0, 'Source section missing: ' + c.id + ' (' + section + ')');
  }
}
assert.equal(components.components.find(c => c.id === 'topbar-search').variants.homeDesktop1440.widthPx, 292);
assert.equal(components.components.find(c => c.id === 'enterprise-table').rowHeightCompactPx, 44);
assert.match(source, /## 5\.4 Distinct Skeleton Modes/);
assert.match(source, /## 9\.6 Figma Desktop\/Home/);
console.log('PASS: 77 canonical tokens, 19 component contracts, verified source SHA, layouts and privacy policy');
