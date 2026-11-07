/**
 * Integrity of the content: every lead of the campaign can be solved in both languages
 * with its canonical query, and the rows that solve it cannot appear by accident.
 */

import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import test from 'node:test';
import initSqlJs from 'sql.js';
import { accusationMatches } from '../src/core/deduction.js';
import { localize, localizeRows, localizeTables } from '../src/core/localize.js';
import { checkResult } from '../src/core/result-check.js';
import { executeQuery } from '../src/core/sql-engine.js';
import { artUrl } from '../src/content/art.js';
import { chapters, missions } from '../src/content/campaign.js';
import { endings } from '../src/content/endings.js';
import { solutions } from './solutions.js';

const SQL = await initSqlJs();
const LANGUAGES = ['en', 'es'];

/** Fails when a text is not available in both languages. */
function assertBilingual(value, where) {
  for (const language of LANGUAGES) {
    const text = value?.[language];
    assert.ok(Array.isArray(text) ? text.length > 0 : Boolean(text), `${where}: missing ${language}`);
  }
}

test('case identifiers are unique and every case has its solutions', () => {
  const ids = missions.map((mission) => mission.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const mission of missions) {
    assert.equal(solutions[mission.id]?.length, mission.stages.length, `solutions of ${mission.id}`);
  }
});

for (const language of LANGUAGES) {
  test(`every lead is solved by its canonical query in ${language}`, () => {
    for (const mission of missions) {
      const tables = localizeTables(mission.tables, language);
      mission.stages.forEach((stage, index) => {
        const query = localize(solutions[mission.id][index], language);
        const result = executeQuery(SQL, tables, query);
        const outcome = checkResult(result, { expected: localizeRows(stage.expected, language), ordered: stage.ordered });
        assert.equal(outcome.match, true, `${mission.id} #${index + 1}: ${JSON.stringify(outcome)} ${JSON.stringify(result.values.slice(0, 6))}`);
      });
    }
  });
}

test('no lead is solved by selecting a whole table', () => {
  for (const mission of missions) {
    const tables = localizeTables(mission.tables, 'en');
    for (const [index, stage] of mission.stages.entries()) {
      if (mission.id === 'missing-key' && index === 0) continue; // This lead asks for the whole table on purpose.
      for (const name of Object.keys(tables)) {
        const outcome = checkResult(executeQuery(SQL, tables, `SELECT * FROM "${name}"`), { expected: localizeRows(stage.expected, 'en'), ordered: stage.ordered });
        assert.equal(outcome.match, false, `${mission.id} #${index + 1} is solved by SELECT * FROM ${name}`);
      }
    }
  }
});

test('every text exists in both languages', () => {
  for (const chapter of chapters) {
    for (const field of ['title', 'subtitle']) assertBilingual(chapter[field], `chapter ${chapter.id}.${field}`);
    for (const field of ['signal', 'title', 'paragraphs', 'speaker', 'quote', 'action']) assertBilingual(chapter.prologue[field], `chapter ${chapter.id} prologue.${field}`);
  }
  for (const mission of missions) {
    for (const field of ['title', 'location', 'scene', 'closing']) assertBilingual(mission[field], `${mission.id}.${field}`);
    for (const [index, stage] of mission.stages.entries()) {
      for (const field of ['title', 'briefing', 'clue']) assertBilingual(stage[field], `${mission.id} #${index + 1}.${field}`);
      for (const hint of stage.hints ?? []) assertBilingual(hint, `${mission.id} #${index + 1} hint`);
    }
  }
});

test('every paragraph list has the same length in both languages', () => {
  const pairs = [...missions.flatMap((mission) => [mission.scene, mission.closing]), ...chapters.map((chapter) => chapter.prologue.paragraphs), ...Object.values(endings).map((ending) => ending.paragraphs)];
  for (const pair of pairs) assert.equal(pair.en.length, pair.es.length, pair.en[0]);
});

test('accusations can be answered and decisions lead to an ending', () => {
  for (const mission of missions) {
    if (mission.dossier) assert.ok(mission.accusation, `${mission.id} needs an accusation`);
    if (!mission.accusation) continue;
    for (const field of mission.accusation.fields) {
      assert.ok(field.options.includes(mission.accusation.answer[field.key]), `${mission.id}: ${field.key} has no right option`);
    }
    assert.equal(accusationMatches(mission.accusation, mission.accusation.answer), true);
  }
  const finale = missions.at(-1);
  assert.ok(finale.decision, 'the last case must end with a decision');
  for (const option of finale.decision.options) assert.ok(endings[option.id], `missing ending ${option.id}`);
});

test('every chapter and ending has its illustration in public/', () => {
  const names = [...chapters.map((chapter) => `chapter-${chapter.id}`), ...Object.keys(endings).map((id) => `ending-${id}`)];
  for (const name of names) {
    const url = artUrl(name);
    assert.ok(url, `${name} is not declared`);
    assert.ok(existsSync(new URL(`../public/${url}`, import.meta.url)), `${name} is missing`);
  }
});
