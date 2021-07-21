import { MODULE_ID, TEMPLATE_PATH } from '../constants.js';
import { convertLabelIdToDisplay } from './util.js';

export class DamageTypeListForm extends FormApplication {
  static FORM_ID = `${MODULE_ID}-damage-type-list`;
  static FORM_DATA = `${MODULE_ID}-damage-type-list-data`;

  types = [];

  constructor(exampleOption = {}) {
    super();
    this.exampleOption = exampleOption;
  }

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ['form'],
      popOut: true,
      template: `${TEMPLATE_PATH}/damage_type_list.hbs`,
      id: DamageTypeListForm.FORM_ID,
      title: 'Damage Type List'
    });
  }

  getData() {
    if (this.types.length === 0) {
      const { types = [] } = game.settings.get(
        MODULE_ID,
        DamageTypeListForm.FORM_DATA
      );
      this.types = [...types];
    }
    return {
      types: [...this.types]
    };
  }

  handleAddDamageType = (event, html) => {
    event.preventDefault();
    event.stopPropagation();

    const value = html.find('input[name="newDamageType"]').val();
    const id = value.toLowerCase().replaceAll(' ', '-');

    this.types = [...this.types, id];
    this.render();
  };

  handleResetData = event => {
    event.preventDefault();
    event.stopPropagation();

    this.types.forEach(type => {
      delete CONFIG.DND5E.damageTypes[type];
      delete CONFIG.DND5E.damageResistanceTypes[type];
    });

    // Set default
    this.types = ['other'];
    CONFIG.DND5E.damageTypes.other = 'Other';
    CONFIG.DND5E.damageResistanceTypes.other = 'Other';

    game.settings.set(MODULE_ID, DamageTypeListForm.FORM_DATA, {
      types: ['other']
    });
    this.render();
  };

  activateListeners(html) {
    super.activateListeners(html);
    html
      .find('button[name="add"]')
      .click(event => this.handleAddDamageType(event, html));
    html.find('button[name="reset"]').click(this.handleResetData);
  }

  async _updateObject() {
    this.types.forEach(type => {
      CONFIG.DND5E.damageTypes[type] = convertLabelIdToDisplay(type);
      CONFIG.DND5E.damageResistanceTypes[type] = convertLabelIdToDisplay(type);
    });
    game.settings.set(MODULE_ID, DamageTypeListForm.FORM_DATA, {
      types: this.types
    });
  }
}
