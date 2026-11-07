/**
 * Language of the player. Games inherit it from the personal website through the shared
 * `lang` preference and fall back to English. The browser language is deliberately
 * ignored, so that the game and the website never disagree (see DECISIONS.md in
 * personal_web_style).
 */

const LANGUAGE_KEY = 'lang';

/**
 * Reads the language inherited from the website.
 *
 * @param {Pick<Storage, 'getItem'>|null} storage Store of the preference.
 * @returns {'en'|'es'} Spanish for any saved `es` variant; English otherwise.
 */
export function readLanguage(storage) {
  try {
    return storage?.getItem(LANGUAGE_KEY)?.toLowerCase().startsWith('es') ? 'es' : 'en';
  } catch {
    return 'en';
  }
}

/**
 * Saves the language for the website and the other games.
 *
 * @param {Pick<Storage, 'setItem'>|null} storage Store of the preference.
 * @param {'en'|'es'} language Language chosen by the player.
 */
export function saveLanguage(storage, language) {
  try {
    storage?.setItem(LANGUAGE_KEY, language);
  } catch {
    // Without storage the choice simply lasts for this tab.
  }
}
