import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { once } from 'node:events';

test('read-only MCP responds to tool and resource calls; blocks writes and arbitrary paths', async () => {
  const server = fileURLToPath(new URL('../integrations/mcp/server.mjs', import.meta.url));
  const child = spawn(process.execPath, [server], { stdio: ['pipe', 'pipe', 'pipe'] });
  const requests = [
    { jsonrpc: '2.0', id: 1, method: 'initialize', params: { protocolVersion: '2025-11-25', capabilities: {}, clientInfo: { name: 'test', version: '1' } } },
    { jsonrpc: '2.0', id: 2, method: 'tools/list' },
    { jsonrpc: '2.0', id: 3, method: 'tools/call', params: { name: 'get_component_contract', arguments: { id: 'topbar-search' } } },
    { jsonrpc: '2.0', id: 4, method: 'tools/call', params: { name: 'get_tokens', arguments: { group: 'home' } } },
    { jsonrpc: '2.0', id: 5, method: 'resources/read', params: { uri: 'ahdesign:///policies' } },
    { jsonrpc: '2.0', id: 6, method: 'tools/call', params: { name: 'write_file', arguments: { path: 'README.md' } } },
    { jsonrpc: '2.0', id: 7, method: 'resources/read', params: { uri: 'ahdesign:///../../secrets' } }
  ];
  let stdout = '', stderr = '';
  child.stdout.on('data', value => { stdout += String(value); });
  child.stderr.on('data', value => { stderr += String(value); });
  const closing = once(child, 'close');
  child.stdin.end(requests.map(r => JSON.stringify(r)).join('\n') + '\n');
  const [code] = await closing;
  assert.equal(code, 0, stderr);
  const responses = stdout.trim().split('\n').map(line => JSON.parse(line));
  assert.equal(responses.length, requests.length);
  const get = id => responses.find(r => r.id === id);
  assert.equal(get(1).result.serverInfo.name, 'ah-design-system');
  assert.equal(get(2).result.tools.length, 4);
  assert.match(get(3).result.content[0].text, /"widthPx": 292/);
  assert.match(get(4).result.content[0].text, /ah-home-hero-bg/);
  assert.match(get(5).result.contents[0].text, /privacy-safe-skeleton/);
  assert.equal(get(6).result.isError, true);
  assert.equal(get(7).error.code, -32602);
});
