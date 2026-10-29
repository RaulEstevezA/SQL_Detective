import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
const root = process.cwd(); const port = Number(process.env.PORT || 4173);
const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.png':'image/png','.json':'application/json','.wasm':'application/wasm'};
createServer(async(req,res)=>{try{const path=normalize(decodeURIComponent(req.url.split('?')[0])).replace(/^(\.\.[/\\])+/, '');const relative=path.replace(/^[/\\]+/,'');let file;if(!relative)file=join(root,'index.html');else if(relative.startsWith('vendor/'))file=join(root,'node_modules/sql.js/dist',relative.slice('vendor/'.length));else if(relative.startsWith('src/'))file=join(root,relative);else file=join(root,'public',relative);if((await stat(file)).isDirectory())file=join(file,'index.html');res.setHeader('Content-Type',types[extname(file)]||'application/octet-stream');res.end(await readFile(file));}catch{res.statusCode=404;res.end('Not found');}}).listen(port,()=>console.log(`SQL Detective: http://localhost:${port}`));
