/**
 * Writes `local-data/soluciones.md`, a local answer sheet for testing the game by hand,
 * from the canonical queries of `tests/solutions.js`. The folder is never versioned.
 * Run it with `npm run solutions`.
 */

import { mkdir, writeFile } from 'node:fs/promises';
import { chapters } from '../src/content/campaign.js';
import { localize } from '../src/core/localize.js';
import { solutions } from '../tests/solutions.js';

const LANGUAGE = 'es';
const lines = ['# SQL Detective · Soluciones', '', 'Archivo local generado con `npm run solutions`. No se versiona.', ''];
let number = 1;

for (const chapter of chapters) {
  lines.push(`## Capítulo ${chapter.id}: ${localize(chapter.title, LANGUAGE)}`, '');
  for (const mission of chapter.missions) {
    lines.push(`### ${number}. ${localize(mission.title, LANGUAGE)}`, '');
    number += 1;
    mission.stages.forEach((stage, index) => {
      lines.push(`**Pista ${index + 1}: ${localize(stage.title, LANGUAGE)}**`, '', '```sql', localize(solutions[mission.id][index], LANGUAGE), '```', '');
    });
    if (mission.accusation) {
      const answer = Object.values(mission.accusation.answer).join(', ');
      lines.push(`**Acusación:** ${answer}`, '');
    }
  }
}

await mkdir('local-data', { recursive: true });
await writeFile('local-data/soluciones.md', lines.join('\n'));
console.log('Wrote local-data/soluciones.md');
