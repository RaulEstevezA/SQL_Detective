/**
 * Rules of the game, independent from the content and from the browser.
 */

import assert from 'node:assert/strict';
import test from 'node:test';
import initSqlJs from 'sql.js';
import { countClosedCases, findFirstOpenCase, findNextCase, isChapterUnlocked, isMissionUnlocked } from '../src/core/campaign.js';
import { MetaCommandError, runMetaCommand } from '../src/core/meta-commands.js';
import { advanceStage, blankProgress, caseRecord, chooseEnding, closeCase, markPrologueSeen, PROGRESS_VERSION, recordWrongAccusation, restoreProgress, revealHint } from '../src/core/progress.js';
import { checkResult } from '../src/core/result-check.js';
import { countAssistance, credibility, isCleanCase, rankFor } from '../src/core/scoring.js';
import { executeQuery, QueryError, validateReadOnly } from '../src/core/sql-engine.js';

const SQL = await initSqlJs();
const tables = { people: [{ id: 1, name: 'Ana', note: null }, { id: 2, name: 'Bea', note: 'x' }] };

test('only one read-only statement is accepted', () => {
  assert.equal(validateReadOnly(' SELECT 1; '), 'SELECT 1;');
  const codeOf = (query) => {
    try {
      validateReadOnly(query);
      return null;
    } catch (error) {
      assert.ok(error instanceof QueryError);
      return error.code;
    }
  };
  assert.equal(codeOf('   '), 'EMPTY');
  assert.equal(codeOf('-- nothing'), 'EMPTY');
  assert.equal(codeOf('DROP TABLE people'), 'READ_ONLY');
  assert.equal(codeOf('WITH x AS (SELECT 1) DELETE FROM people'), 'READ_ONLY');
  assert.equal(codeOf('REPLACE INTO people VALUES (1)'), 'READ_ONLY');
  assert.equal(codeOf('SELECT 1; SELECT 2'), 'ONE_STATEMENT');
});

test('values and functions that look like forbidden keywords are allowed', () => {
  assert.doesNotThrow(() => validateReadOnly("SELECT 'DROP; TABLE' AS note"));
  assert.doesNotThrow(() => validateReadOnly("SELECT REPLACE(name, 'a', 'b') FROM people"));
  assert.doesNotThrow(() => validateReadOnly('SELECT 1 -- DROP TABLE people'));
});

test('queries run against fresh tables and report SQLite errors', () => {
  assert.deepEqual(executeQuery(SQL, tables, 'SELECT name FROM people WHERE id = 2'), { columns: ['name'], values: [['Bea']] });
  assert.deepEqual(executeQuery(SQL, tables, 'SELECT name FROM people WHERE id = 9').values, []);
  assert.throws(() => executeQuery(SQL, tables, 'SELECT nope FROM people'), (error) => error.code === 'SQLITE');
});

test('meta commands list the tables unless the case hides them', () => {
  assert.equal(runMetaCommand('SELECT 1', { tables }), null);
  assert.deepEqual(runMetaCommand('.tables', { tables }).values, [['people', 2]]);
  assert.throws(() => runMetaCommand('.TABLES;', { tables, hideSchema: true }), MetaCommandError);
});

test('results are compared generously and explain what is wrong', () => {
  const expected = [{ name: 'Ana', total: 2 }, { name: 'Bea', total: 1 }];
  const result = (columns, values) => ({ columns, values });
  assert.equal(checkResult(result(['name', 'total'], [['Bea', 1], ['Ana', 2]]), { expected }).match, true);
  assert.equal(checkResult(result(['NAME', 'id', 'total'], [['Ana', 7, 2], ['Bea', 8, 1]]), { expected }).match, true);
  assert.equal(checkResult(result(['total'], [[1.004]]), { expected: [{ total: 1 }] }).match, true);
  assert.deepEqual(checkResult(result([], []), { expected }), { match: false, reason: 'empty' });
  assert.deepEqual(checkResult(result(['name'], [['Ana']]), { expected }), { match: false, reason: 'missing-column', column: 'total' });
  assert.deepEqual(checkResult(result(['name', 'total'], [['Ana', 2]]), { expected }), { match: false, reason: 'row-count', expected: 2 });
  assert.deepEqual(checkResult(result(['name', 'total'], [['Ana', 2], ['Eva', 1]]), { expected }), { match: false, reason: 'values' });
  assert.deepEqual(checkResult(result(['name', 'total'], [['Bea', 1], ['Ana', 2]]), { expected, ordered: true }), { match: false, reason: 'order' });
});

test('saved games are restored, and replaced when they are not valid', () => {
  assert.deepEqual(restoreProgress(null), blankProgress());
  const saved = JSON.stringify({ ...blankProgress(), cases: { a: { closed: true } } });
  assert.equal(restoreProgress(saved).cases.a.closed, true);
  for (const old of [JSON.stringify({ version: PROGRESS_VERSION - 1, completed: ['x'] }), 'not json']) {
    assert.deepEqual(restoreProgress(old), blankProgress());
  }
});

test('transitions return a new game and do not change the old one', () => {
  const start = blankProgress();
  const next = advanceStage(start, 'a');
  assert.equal(caseRecord(start, 'a').stage, 0);
  assert.equal(caseRecord(next, 'a').stage, 1);
  assert.deepEqual(markPrologueSeen(markPrologueSeen(start, 1), 1).prologuesSeen, [1]);
  assert.equal(chooseEnding(start, 'press').ending, 'press');
});

test('cases unlock one after another, and so do chapters', () => {
  const list = [{ id: 'a', chapter: 1 }, { id: 'b', chapter: 1 }, { id: 'c', chapter: 2 }];
  const start = blankProgress();
  assert.equal(isMissionUnlocked(list, 'a', start), true);
  assert.equal(isMissionUnlocked(list, 'b', start), false);
  assert.equal(isChapterUnlocked(list, 2, start), false);
  const afterTwo = closeCase(closeCase(start, 'a'), 'b');
  assert.equal(isMissionUnlocked(list, 'c', afterTwo), true);
  assert.equal(isChapterUnlocked(list, 2, afterTwo), true);
  assert.equal(findFirstOpenCase(list, afterTwo), 'c');
  assert.equal(findFirstOpenCase(list, closeCase(afterTwo, 'c')), null);
  assert.equal(findNextCase(list, 'a'), 'b');
  assert.equal(findNextCase(list, 'c'), null);
  assert.equal(countClosedCases(list, afterTwo), 2);
});

test('hints and wrong accusations reduce credibility and decide the rank', () => {
  let game = blankProgress();
  assert.equal(credibility(game), 100);
  game = revealHint(game, 'a', 0);
  game = revealHint(game, 'a', 0);
  game = recordWrongAccusation(game, 'b');
  assert.deepEqual(countAssistance(game), { hints: 2, wrongAccusations: 1 });
  assert.equal(credibility(game), 93);
  assert.equal(rankFor(93), 'legend');
  assert.equal(rankFor(70), 'inspector');
  assert.equal(rankFor(40), 'analyst');
  assert.equal(rankFor(0), 'rookie');
  assert.equal(isCleanCase(caseRecord(closeCase(game, 'c'), 'c')), true);
  assert.equal(isCleanCase(caseRecord(closeCase(game, 'a'), 'a')), false);
  assert.equal(isCleanCase(caseRecord(game, 'c')), false);
});
