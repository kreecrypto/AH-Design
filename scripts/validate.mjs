import { readFile } from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import { ROOT, MASTER, buildTokenFiles, gitBlobSha } from './lib/tokens.mjs';

const arg = name => { const i = process.argv.indexOf(name); return i < 0 ? undefined : process.argv[i + 1]; };
const read = name => readFile(path.isAbsolute(name) ? name : path.join(ROOT, name), 'utf8');
const json = async name => JSON.parse(await read(name));

function drift(expected, actual, at='') {
  if (Object.is(expected, actual)) return null;
  if (expected === null || actual === null || typeof expected !== typeof actual || typeof expected !== 'object')
    return { path: at, expected, actual };
  if (Array.isArray(expected) !== Array.isArray(actual)) return { path: at, expected, actual };
  if (Array.isArray(expected) && expected.length !== actual.length)
    return { path: at + '.length', expected: expected.length, actual: actual.length };
  for (const key of [...new Set([...Object.keys(expected), ...Object.keys(actual)])].sort()) {
    if (!Object.hasOwn(expected, key) || !Object.hasOwn(actual, key))
      return { path: at + '.' + key, expected: expected[key], actual: actual[key] };
    const d = drift(expected[key], actual[key], at + (Array.isArray(expected) ? '[' + key + ']' : '.' + key));
    if (d) return d;
  }
  return null;
}

// Strictly implements the JSON Schema keywords used in schemas/contracts.schema.json.
// The approved baseline independently checks every nested value and unexpected field.
function checkSchema(value, rule, at='$') {
  if (Object.hasOwn(rule, 'const')) assert.deepEqual(value, rule.const, at + ': const mismatch');
  if (rule.type === 'object') {
    assert.ok(value && typeof value === 'object' && !Array.isArray(value), at + ': expected object');
    for (const key of rule.required ?? []) assert.ok(Object.hasOwn(value, key), at + ': missing ' + key);
    for (const [key, item] of Object.entries(value)) {
      if (rule.properties?.[key]) checkSchema(item, rule.properties[key], at + '.' + key);
      else if (rule.additionalProperties === false) assert.fail(at + ': unexpected ' + key);
    }
  } else if (rule.type === 'array') {
    assert.ok(Array.isArray(value), at + ': expected array');
    assert.ok(value.length >= (rule.minItems ?? 0), at + ': array too short');
    if (rule.items) value.forEach((item, index) => checkSchema(item, rule.items, at + '[' + index + ']'));
  } else if (rule.type === 'string') {
    assert.equal(typeof value, 'string', at + ': expected string');
    if (rule.pattern) assert.match(value, new RegExp(rule.pattern), at + ': pattern mismatch');
  }
}

export async function validate() {
  const source = await read(MASTER);
  const [css, tokenText, manifest, components, layouts, policies, pageProfiles, baseline, schema, changelog] = await Promise.all([
    read('tokens/ah-tokens.css'), read('tokens/ah-tokens.json'),
    json('design-system.json'), json(arg('--components') ?? 'contracts/components.json'),
    json(arg('--layouts') ?? 'contracts/layouts.json'),
    json(arg('--policies') ?? 'contracts/policies.json'),
    json(arg('--page-profiles') ?? 'contracts/page-profiles.json'),
    json('contracts/approved-baseline.json'), json('schemas/contracts.schema.json'), read('CHANGELOG.md')
  ]);
  const expected = buildTokenFiles(source);
  assert.equal(css, expected.css, 'Canonical CSS token drift');
  assert.equal(tokenText, expected.json, 'Canonical JSON token drift');
  const tokens = JSON.parse(tokenText);
  const sourceSha = gitBlobSha(source);
  assert.equal(tokens.sourceGitBlobSha, sourceSha, 'Token source hash stale');
  assert.equal(manifest.sourceOfTruth.gitBlobSha, sourceSha, 'Manifest source hash stale');
  assert.equal(baseline.designSourceSha, sourceSha, 'Approved baseline source hash stale');
  assert.equal(tokens.tokenCount, expected.count);
  assert.equal(tokens.tokenCount, Object.keys(tokens.tokens).length);
  assert.equal(manifest.defaultContentMode, 'privacy-safe-skeleton');
  assert.equal(policies.defaultMode, 'privacy-safe-skeleton');
  assert.equal(policies.modes['privacy-safe-skeleton'].readableBusinessData, false);
  assert.equal(policies.modes['privacy-safe-skeleton'].readableNavigation, false);
  assert.ok(changelog.includes(baseline.release), 'Approved baseline release must have CHANGELOG entry');

  const bundle = { components, layouts, policies, pageProfiles };
  checkSchema(bundle, schema);
  for (const [name, current] of Object.entries(bundle)) {
    const actual = name === 'components' ? current.components : current;
    const difference = drift(baseline.snapshot[name], actual, name === 'components' ? 'components.components' : name);
    if (difference) throw new Error('Contract drift at ' + difference.path +
      ': expected ' + String(JSON.stringify(difference.expected)).slice(0,200) +
      ', actual ' + String(JSON.stringify(difference.actual)).slice(0,200) +
      '. Update the approved baseline only after source review and changelog.');
  }
  const ids = components.components.map(c => c.id);
  assert.equal(ids.length, new Set(ids).size, 'Duplicate component ID');
  for (const component of components.components) for (const section of component.section.split(' and ')) {
    const escaped = section.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    assert.match(source, new RegExp('^#{1,3} ' + escaped + '(?:[.\\s]|$)', 'm'),
      'Canonical section missing for ' + component.id + ': ' + section);
  }
  const home=pageProfiles.profiles['home-desktop'], operational=pageProfiles.profiles['operational-listing'];
  const search=components.components.find(c=>c.id==='topbar-search'), table=components.components.find(c=>c.id==='enterprise-table');
  assert.equal(home.searchWidthPx,search.variants.homeDesktop1440.widthPx,'Home search drift');
  assert.equal(operational.searchWidthPx,search.variants.operational.widthPx,'Operational search drift');
  assert.equal(operational.tableCompactRowPx,table.rowHeightCompactPx,'Compact table row drift');
  assert.equal(operational.tableComfortableRowPx,table.rowHeightComfortablePx,'Comfortable table row drift');
  assert.equal(home.mainSurface,policies.pagePrecedence.home.mainSurface,'Home surface drift');
  assert.equal(operational.mainSurface,policies.pagePrecedence.operational.mainSurface,'Operational surface drift');
  assert.equal(home.searchWidthPx,policies.pagePrecedence.home.searchWidthPx);
  assert.equal(operational.searchWidthPx,policies.pagePrecedence.operational.searchWidthPx);
  assert.equal(home.sidebarLabelSizePx,policies.pagePrecedence.home.sidebarLabelPx);
  assert.equal(operational.sidebarLabelSizePx,policies.pagePrecedence.operational.sidebarLabelPx);
  assert.equal(home.defaultContentMode,'privacy-safe-skeleton');
  assert.equal(operational.defaultContentMode,'privacy-safe-skeleton');
  assert.equal(home.allowHomeOnly,true);
  assert.equal(operational.allowHomeOnly,false);
  assert.equal(layouts.shell.desktop.sidebarPx,200);
  assert.equal(layouts.shell.desktop.viewportBaselinePx,1280);
  assert.match(source,/^## 9\.7 Page Scope & Contract Precedence/m);
  console.log('PASS: ' + expected.count + ' tokens, ' + ids.length + ' fully checked component contracts, page scopes, JSON Schema subset, privacy and release gates');
}
validate().catch(error=>{console.error(error.stack??String(error));process.exitCode=1;});
