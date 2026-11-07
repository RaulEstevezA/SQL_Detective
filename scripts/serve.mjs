/**
 * Development server. It serves the project with the same paths as the published game:
 * `public/` at the root, and the SQL engine from `node_modules` under `vendor/`.
 * Run it with `npm run dev`; the port can be changed with the PORT variable.
 */

import { readFile, stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';

const ROOT = process.cwd();
const PORT = Number(process.env.PORT || 4173);
const CONTENT_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.wasm': 'application/wasm',
};

/**
 * Finds the file that answers a request.
 *
 * @param {string} url Address of the request.
 * @returns {string} Absolute path of the file. Whether it exists is checked afterwards.
 */
function resolveFile(url) {
  // normalize() and the prefix removal keep the request inside the project.
  const relative = normalize(decodeURIComponent(url.split('?')[0]))
    .replace(/^(\.\.[/\\])+/, '')
    .replace(/^[/\\]+/, '');
  if (!relative) return join(ROOT, 'index.html');
  if (relative.startsWith('vendor/')) return join(ROOT, 'node_modules/sql.js/dist', relative.slice('vendor/'.length));
  if (relative.startsWith('src/')) return join(ROOT, relative);
  return join(ROOT, 'public', relative);
}

createServer(async (request, response) => {
  try {
    const file = resolveFile(request.url);
    if ((await stat(file)).isDirectory()) throw new Error('Directories are not served.');
    response.setHeader('Content-Type', CONTENT_TYPES[extname(file)] ?? 'application/octet-stream');
    response.end(await readFile(file));
  } catch {
    response.statusCode = 404;
    response.end('Not found');
  }
}).listen(PORT, () => console.log(`SQL Detective: http://localhost:${PORT}`));
