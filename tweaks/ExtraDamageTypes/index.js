import { MODULE_ID } from '../constants.js';
import { DamageTypeListForm } from './DamageTypeListForm.js';
import { convertLabelIdToDisplay } from './util.js';

import { handlebarHelpers } from './handlebarHelpers.js';
handlebarHelpers();

Hooks.once('ready', () => {
  game.settings.register(MODULE_ID, DamageTypeListForm.FORM_DATA, {
    name: `Config Data`,
    scope: 'world',
    default: { types: ['other'] },
    type: Object,
    config: false
  });

  game.settings.registerMenu(MODULE_ID, DamageTypeListForm.FORM_ID, {
    name: 'Config Type List',
    label: 'Open Type List',
    hint: 'Add extra damage types to DnD5e.',
    scope: 'world',
    config: true,
    icon: 'fas fa-tasks',
    type: DamageTypeListForm,
    restricted: true
  });

  // Setup types
  const { types = [] } = game.settings.get(
    MODULE_ID,
    DamageTypeListForm.FORM_DATA
  );
  types.forEach(type => {
    CONFIG.DND5E.damageTypes[type] = convertLabelIdToDisplay(type);
    CONFIG.DND5E.damageResistanceTypes[type] = convertLabelIdToDisplay(type);
  });
});
