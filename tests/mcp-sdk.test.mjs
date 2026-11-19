import test from 'node:test';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { Client } from '@modelcontextprotocol/client';
import { StdioClientTransport } from '@modelcontextprotocol/client/stdio';

const server=fileURLToPath(new URL('../integrations/mcp/server-v2.mjs',import.meta.url));
async function connect(mode) {
  const client=new Client({name:'ah-design-integration-test',version:'1.0.0'},
    {versionNegotiation:{mode}});
  await client.connect(new StdioClientTransport({command:process.execPath,args:[server],stderr:'pipe'}));
  return client;
}
for(const era of ['legacy','modern']) {
  test('Official SDK '+era+' stdio interoperability', {timeout:25000}, async()=>{
    const client=await connect(era==='legacy'?'legacy':{pin:'2026-07-28'});
    try {
      assert.equal(client.getProtocolEra(),era);
      const tools=await client.listTools();
      assert.equal(tools.tools.length,4);
      const contract=await client.callTool({name:'get_component_contract',arguments:{id:'home-hero'}});
      assert.match(contract.content[0].text,/"widthPx": 1240/);
      const tokens=await client.callTool({name:'get_tokens',arguments:{group:'home'}});
      assert.match(tokens.content[0].text,/ah-home-hero-bg/);
      const resources=await client.listResources();
      assert.ok(resources.resources.some(r=>r.uri==='ahdesign:///policies'));
      const policy=await client.readResource({uri:'ahdesign:///policies'});
      assert.match(policy.contents[0].text,/privacy-safe-skeleton/);
      const denied=await client.callTool({name:'get_component_contract',arguments:{id:'not-a-component'}});
      assert.equal(denied.isError,true);
      const concurrent=await Promise.all([1,2,3,4].map(()=>client.callTool({name:'get_tokens',arguments:{group:'radius'}})));
      assert.equal(concurrent.length,4);
      for(const item of concurrent)assert.match(item.content[0].text,/ah-radius-full/);
    }finally{await client.close();}
  });
}
test('Official SDK tool validation rejects invalid arguments',{timeout:25000},async()=>{
  const client=await connect('legacy');
  try{
    await assert.rejects(client.readResource({uri:'ahdesign:///../../secret'}));
    let rejected=false;
    try {
      const out=await client.callTool({name:'read_design_asset',arguments:{asset:'../../secret'}});
      rejected=out.isError===true;
    }catch {rejected=true;}
    assert.ok(rejected,'Arbitrary path rejected by SDK validation');
    rejected=false;
    try {
      const out=await client.callTool({name:'get_tokens',arguments:{group:'not-a-group'}});
      rejected=out.isError===true;
    }catch {rejected=true;}
    assert.ok(rejected,'Invalid enum rejected');
  }finally{await client.close();}
});
