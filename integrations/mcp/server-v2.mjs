// AH Design System — allowlisted read-only MCP server using the official v2 SDK.
// serveStdio negotiates both legacy (2025-11-25) and modern (2026-07-28) eras.
// This process does not connect to GitHub, Figma, external websites or any network endpoint.
import { McpServer } from '@modelcontextprotocol/server';
import { serveStdio } from '@modelcontextprotocol/server/stdio';
import * as z from 'zod/v4';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const allowed=Object.freeze({
  manifest:['design-system.json','application/json'],
  tokens:['tokens/ah-tokens.json','application/json'],
  components:['contracts/components.json','application/json'],
  layouts:['contracts/layouts.json','application/json'],
  policies:['contracts/policies.json','application/json'],
  pageProfiles:['contracts/page-profiles.json','application/json'],
  source:['docs/AH_DESIGN_v2.6.md','text/markdown'],
  agents:['AGENTS.md','text/markdown'],
  integration:['docs/AI_INTEGRATION.md','text/markdown']
});
const groups=['color','home','layout','radius','spacing','shadow'];
const load=async asset=>{
  if(!Object.hasOwn(allowed,asset)) throw new Error('Resource not on allowlist');
  return readFile(path.join(root,allowed[asset][0]),'utf8');
};
const text=value=>({content:[{type:'text',text:typeof value==='string'?value:JSON.stringify(value,null,2)}]});
const denied=message=>({isError:true,content:[{type:'text',text:message}]});
const readOnly={readOnlyHint:true,destructiveHint:false,openWorldHint:false,idempotentHint:true};
function createServer(){
  const server=new McpServer({name:'ah-design-system',version:'2.6.1'},{
    instructions:'Use AH Design v2.6. Read manifest, privacy policies, page profiles and canonical source. Default to privacy-safe-skeleton. No business data is included.'
  });
  for(const [name,[file,mimeType]] of Object.entries(allowed)){
    const uri='ahdesign:///'+name;
    server.registerResource(name,uri,
      {title:name,description:'Read-only repository asset: '+file,mimeType},
      async current=>({contents:[{uri:current.href,mimeType,text:await load(name)}]}));
  }
  server.registerTool('list_design_assets',{
    description:'List allowlisted AH Design System documents',
    inputSchema:z.object({}).strict(),annotations:readOnly
  },async()=>text({assets:Object.fromEntries(Object.entries(allowed).map(([k,v])=>[k,v[0]])),defaultMode:'privacy-safe-skeleton'}));
  server.registerTool('read_design_asset',{
    description:'Read a named allowlisted Design System asset; cannot read arbitrary files',
    inputSchema:z.object({asset:z.enum(Object.keys(allowed))}).strict(),annotations:readOnly
  },async({asset})=>text(await load(asset)));
  server.registerTool('get_component_contract',{
    description:'Read one documented component contract by its stable ID',
    inputSchema:z.object({id:z.string().min(1).max(128)}).strict(),annotations:readOnly
  },async({id})=>{
    const data=JSON.parse(await load('components'));const found=data.components.find(c=>c.id===id);
    return found?text(found):denied('Unknown component ID');
  });
  server.registerTool('get_tokens',{
    description:'Read all canonical tokens or only one token group',
    inputSchema:z.object({group:z.enum(groups).optional()}).strict(),annotations:readOnly
  },async({group})=>{
    const data=JSON.parse(await load('tokens'));
    const tokens=Object.fromEntries(Object.entries(data.tokens).filter(([,v])=>!group||v.group===group));
    return text({version:data.version,sourceGitBlobSha:data.sourceGitBlobSha,tokens});
  });
  return server;
}
const handle=serveStdio(createServer);
process.on('SIGINT',()=>{void handle.close()});
