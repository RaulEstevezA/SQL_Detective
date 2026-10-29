import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
const root = process.cwd(); const port = Number(process.env.PORT || 4173);
const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.json':'application/json','.wasm':'application/wasm'};
createServer(async(req,res)=>{try{const path=normalize(decodeURIComponent(req.url.split('?')[0])).replace(/^(\.\.[/\\])+/, '');let file=path.startsWith('/vendor/')?join(root,'node_modules/sql.js/dist',path.slice('/vendor/'.length)):join(root,path==='/'?'index.html':path);if((await stat(file)).isDirectory())file=join(file,'index.html');res.setHeader('Content-Type',types[extname(file)]||'application/octet-stream');res.end(await readFile(file));}catch{res.statusCode=404;res.end('Not found');}}).listen(port,()=>console.log(`SQL Detective: http://localhost:${port}`));
