import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
export const MASTER = 'docs/AH_DESIGN_v2.6.md';

export function gitBlobSha(content) {
  const buffer = Buffer.from(content, 'utf8');
  return createHash('sha1').update('blob ' + buffer.length + '\0').update(buffer).digest('hex');
}
export function parseRootCss(source) {
  const heading = '## 2.2 CSS Variable Map (canonical)';
  const marker = String.fromCharCode(96).repeat(3);
  const index = source.indexOf(heading);
  if (index < 0) throw new Error('Canonical CSS map heading missing');
  const from = source.indexOf(marker + 'css\n', index);
  if (from < 0) throw new Error('Canonical CSS block missing');
  const to = source.indexOf(marker, from + 7);
  if (to < 0) throw new Error('Canonical CSS end missing');
  const css = source.slice(from + 7, to).trimEnd();
  if (!css.startsWith(':root {') || !css.endsWith('}')) throw new Error('Expected full :root block');
  return css;
}
export function groupOf(name) {
  if (name.startsWith('ah-home-')) return 'home';
  if (name.startsWith('ah-radius-')) return 'radius';
  if (name.startsWith('ah-space-')) return 'spacing';
  if (name.includes('shadow')) return 'shadow';
  if (/width|height|gutter|reference|breakpoint|pane|sidebar-item|search|table-row|table-header|button-md|panel|badge-height|tab-height/.test(name)) return 'layout';
  return 'color';
}
export function buildTokenFiles(source) {
  const css = parseRootCss(source);
  const pairs = [...css.matchAll(/^\s*--(ah-[\w-]+):\s*([^;]+);/gm)].map(m => [m[1], m[2].trim()]);
  if (!pairs.length || new Set(pairs.map(x => x[0])).size !== pairs.length) throw new Error('Missing/duplicate token definitions');
  const manifest = {
    name: 'AH Design tokens',
    version: '2.6',
    source: MASTER,
    sourceGitBlobSha: gitBlobSha(source),
    canonicalCssSection: '2.2',
    tokenCount: pairs.length,
    tokens: Object.fromEntries(pairs.map(([name,value]) => [name, { value, group: groupOf(name) }]))
  };
  return {
    css: '/* Generated from docs/AH_DESIGN_v2.6.md section 2.2. Do not edit; run npm run tokens:sync. */\n' + css + '\n',
    json: JSON.stringify(manifest, null, 2) + '\n',
    count: pairs.length
  };
}
