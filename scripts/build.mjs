/**
 * Builds the published game in `dist/`. The app is plain ES modules, so the build copies
 * it as it is and adds the SQL engine under `vendor/`. It fails when the analytics beacon
 * does not appear exactly once, as PUBLISHING.md in personal_web_style requires.
 */

import { cp, mkdir, readFile, rm } from 'node:fs/promises';

const BEACON = 'static.cloudflareinsights.com/beacon.min.js';
const ENGINE_FILES = ['sql-wasm.js', 'sql-wasm.wasm'];

await rm('dist', { recursive: true, force: true });
await mkdir('dist/vendor', { recursive: true });
await cp('index.html', 'dist/index.html');
await cp('src', 'dist/src', { recursive: true });
await cp('public', 'dist', { recursive: true });
for (const file of ENGINE_FILES) await cp(`node_modules/sql.js/dist/${file}`, `dist/vendor/${file}`);

const html = await readFile('dist/index.html', 'utf8');
const beacons = html.split(BEACON).length - 1;
if (beacons !== 1) throw new Error(`index.html must include the analytics beacon once; found ${beacons}.`);

console.log('Built static site in dist/');
