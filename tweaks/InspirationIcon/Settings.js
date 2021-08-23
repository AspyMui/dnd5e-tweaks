import { MODULE_ID } from '../constants';

const settings = {
  'tweak.inspiration.toggle': {
    name: `Toggle Chat Inspiration Module`,
    hint: 'Toggle on/off the module',
    scope: 'world',
    config: true,
    type: Boolean,
    default: false
  },
  'tweak.inspiration.badge': {
    name: `Toggle Chat Inspiration Badge`,
    hint: 'Replace chat icon with badge next to actor name',
    scope: 'world',
    config: true,
    type: Boolean,
    default: false
  },
  'tweak.inspiration.icon': {
    name: `Chat Inspiration Icon`,
    hint: 'Asset file for inspiration icon not badge',
    scope: 'world',
    config: true,
    type: String,
    default: 'systems/dnd5e/icons/spells/heal-sky-3.jpg',
    filePicker: true
  }
};

/**
 * Setup Settings
 */
Hooks.once('init', () => {
  Object.entries(settings).forEach(([key, value]) => {
    game.settings.register(MODULE_ID, key, value);
  });
});

export default class InspirationSettings {
  /**
   *
   * @returns
   */
  static getToggle() {
    return game.settings.get(MODULE_ID, 'tweak.inspiration.toggle');
  }
  /**
   *
   * @returns
   */
  static getBadge() {
    return game.settings.get(MODULE_ID, 'tweak.inspiration.badge');
  }
  /**
   *
   * @returns
   */
  static getIcon() {
    return game.settings.get(MODULE_ID, 'tweak.inspiration.icon');
  }
  /**
   *
   * @returns
   */
  static getSettings() {
    let set = {};
    Object.keys(settings).forEach(key => {
      console.log(key);
      set[key] = game.settings.get(MODULE_ID, key);
    });
    return set;
  }
  /**
   *
   * @returns
   */
  static getSettingsMetaData() {
    return settings;
  }
  /**
   *
   * @returns
   */
  static setSetting(key, value) {
    game.settings.set(MODULE_ID, key, value);
  }
  /**
   *
   * @returns
   */
  static resetSettings() {
    Object.entries(settings).forEach(([key, value]) => {
      game.settings.set(MODULE_ID, key, value);
    });
  }
}
