// Read-only local Model Context Protocol server, stdio transport (JSON-RPC lines).
// Requires authorized local clone of the private repository; no network, shell or writes.
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { createInterface } from 'node:readline';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const allowed = Object.freeze({
  manifest: ['design-system.json', 'application/json'],
  tokens: ['tokens/ah-tokens.json', 'application/json'],
  components: ['contracts/components.json', 'application/json'],
  layouts: ['contracts/layouts.json', 'application/json'],
  policies: ['contracts/policies.json', 'application/json'],
  source: ['docs/AH_DESIGN_v2.6.md', 'text/markdown'],
  integration: ['docs/AI_INTEGRATION.md', 'text/markdown'],
  agents: ['AGENTS.md', 'text/markdown']
});
const tools = [
  { name: 'list_design_assets', description: 'List allowlisted AH Design System files and entrypoints.', inputSchema: { type: 'object', properties: {}, additionalProperties: false } },
  { name: 'read_design_asset', description: 'Read an allowlisted Design System asset; arbitrary paths are denied.', inputSchema: { type: 'object', properties: { asset: { type: 'string', enum: Object.keys(allowed) } }, required: ['asset'], additionalProperties: false } },
  { name: 'get_component_contract', description: 'Return one documented component contract by ID.', inputSchema: { type: 'object', properties: { id: { type: 'string' } }, required: ['id'], additionalProperties: false } },
  { name: 'get_tokens', description: 'Read all tokens, optionally filtered by token group.', inputSchema: { type: 'object', properties: { group: { type: 'string', enum: ['color','layout','spacing','radius','shadow','home'] } }, additionalProperties: false } }
];
const reply = (id, body) => ({ jsonrpc: '2.0', id, result: body });
const fail = (id, code, message) => ({ jsonrpc: '2.0', id, error: { code, message } });
const body = value => ({ content: [{ type: 'text', text: typeof value === 'string' ? value : JSON.stringify(value, null, 2) }] });
const denied = message => ({ isError: true, content: [{ type: 'text', text: message }] });
async function load(asset) {
  if (!Object.hasOwn(allowed, asset)) throw new Error('Unknown resource');
  return readFile(path.join(root, allowed[asset][0]), 'utf8');
}
async function handle(message) {
  if (!message || message.jsonrpc !== '2.0' || typeof message.method !== 'string') return fail(message?.id ?? null, -32600, 'Invalid request');
  if (!Object.hasOwn(message, 'id')) return null;
  const id = message.id;
  try {
    if (message.method === 'initialize') return reply(id, {
      protocolVersion: '2025-11-25',
      capabilities: { tools: { listChanged: false }, resources: { listChanged: false } },
      serverInfo: { name: 'ah-design-system', version: '2.6.0' },
      instructions: 'Read the source, policies, layouts, components and tokens. Default to privacy-safe-skeleton.'
    });
    if (message.method === 'ping') return reply(id, {});
    if (message.method === 'tools/list') return reply(id, { tools });
    if (message.method === 'resources/list') return reply(id, {
      resources: Object.entries(allowed).map(([name, [file, mimeType]]) => ({ uri: 'ahdesign:///' + name, name, description: file, mimeType }))
    });
    if (message.method === 'resources/read') {
      const uri = message.params?.uri;
      const asset = typeof uri === 'string' && uri.startsWith('ahdesign:///') ? uri.slice('ahdesign:///'.length) : '';
      if (!Object.hasOwn(allowed, asset)) return fail(id, -32602, 'Unknown resource');
      return reply(id, { contents: [{ uri, mimeType: allowed[asset][1], text: await load(asset) }] });
    }
    if (message.method === 'tools/call') {
      const name = message.params?.name, args = message.params?.arguments ?? {};
      if (name === 'list_design_assets') return reply(id, body({
        assets: Object.fromEntries(Object.entries(allowed).map(([k, v]) => [k, v[0]])),
        defaultMode: 'privacy-safe-skeleton'
      }));
      if (name === 'read_design_asset') {
        if (!Object.hasOwn(allowed, args.asset)) return reply(id, denied('Unknown asset. Use list_design_assets first.'));
        return reply(id, body(await load(args.asset)));
      }
      if (name === 'get_component_contract') {
        const data = JSON.parse(await load('components'));
        const item = data.components.find(c => c.id === args.id);
        return reply(id, item ? body(item) : denied('Unknown component contract: ' + String(args.id)));
      }
      if (name === 'get_tokens') {
        if (args.group && !['color', 'layout', 'spacing', 'radius', 'shadow', 'home'].includes(args.group)) return reply(id, denied('Unknown token group'));
        const data = JSON.parse(await load('tokens'));
        const tokens = Object.fromEntries(Object.entries(data.tokens).filter(([, value]) => !args.group || value.group === args.group));
        return reply(id, body({ version: data.version, sourceGitBlobSha: data.sourceGitBlobSha, tokens }));
      }
      return reply(id, denied('Unknown tool. Use tools/list.'));
    }
    return fail(id, -32601, 'Method not found');
  } catch (e) {
    return reply(id, denied('Read error: ' + (e instanceof Error ? e.message : String(e))));
  }
}
for await (const line of createInterface({ input: process.stdin, crlfDelay: Infinity })) {
  if (!line.trim()) continue;
  let result;
  try { result = await handle(JSON.parse(line)); }
  catch { result = fail(null, -32700, 'Parse error'); }
  if (result) process.stdout.write(JSON.stringify(result) + '\n');
}
