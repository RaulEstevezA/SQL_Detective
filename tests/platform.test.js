/**
 * Browser adapters, with a replacement store instead of `localStorage`.
 */

import assert from 'node:assert/strict';
import test from 'node:test';
import { PROGRESS_KEY, PROGRESS_VERSION } from '../src/core/progress.js';
import { readLanguage, saveLanguage } from '../src/platform/language.js';
import { createProgressStore } from '../src/platform/progress-store.js';

/** Store that works like `localStorage`. */
function memoryStorage(entries = {}) {
  const data = new Map(Object.entries(entries));
  return {
    getItem: (key) => data.get(key) ?? null,
    setItem: (key, value) => data.set(key, value),
    removeItem: (key) => data.delete(key),
  };
}

/** Store that fails like `localStorage` does when the browser blocks site data. */
const blockedStorage = {
  getItem() {
    throw new Error('blocked');
  },
  setItem() {
    throw new Error('blocked');
  },
  removeItem() {
    throw new Error('blocked');
  },
};

test('the language is inherited from the website and English is the fallback', () => {
  assert.equal(readLanguage(memoryStorage({ lang: 'es' })), 'es');
  assert.equal(readLanguage(memoryStorage({ lang: 'es-ES' })), 'es');
  assert.equal(readLanguage(memoryStorage({ lang: 'en' })), 'en');
  assert.equal(readLanguage(memoryStorage()), 'en');
  assert.equal(readLanguage(memoryStorage({ 'sqldetective.language': 'es' })), 'en');
  assert.equal(readLanguage(blockedStorage), 'en');
  assert.equal(readLanguage(null), 'en');
});

test('the chosen language is saved where the website reads it', () => {
  const storage = memoryStorage();
  saveLanguage(storage, 'es');
  assert.equal(storage.getItem('lang'), 'es');
  assert.doesNotThrow(() => saveLanguage(blockedStorage, 'es'));
});

test('the store saves, restores and erases the game under the agreed key', () => {
  const storage = memoryStorage();
  const store = createProgressStore(storage);
  const { progress, available } = store.load();
  assert.equal(available, true);
  assert.equal(store.save({ ...progress, ending: 'press' }), true);
  assert.equal(JSON.parse(storage.getItem(PROGRESS_KEY)).version, PROGRESS_VERSION);
  assert.equal(store.load().progress.ending, 'press');
  assert.equal(store.clear().ending, null);
  assert.equal(storage.getItem(PROGRESS_KEY), null);
});

test('the game goes on when the browser blocks the store', () => {
  const store = createProgressStore(blockedStorage);
  const { progress, available } = store.load();
  assert.equal(available, false);
  assert.equal(store.save(progress), false);
  assert.doesNotThrow(() => store.clear());
});
