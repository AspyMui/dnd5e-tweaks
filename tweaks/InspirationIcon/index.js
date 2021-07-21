import { MODULE_ID } from '../constants';

Hooks.once('init', () => {
  game.settings.register(MODULE_ID, 'tweak.inspiration.toggle', {
    name: `Toggle Chat Inspiration Icon`,
    hint: 'Toggle on/off the icon',
    scope: 'world',
    config: true,
    type: Boolean,
    default: false
  });
  game.settings.register(MODULE_ID, 'tweak.inspiration.icon', {
    name: `Chat Inspiration Icon`,
    hint: 'asset file for inspiration icon',
    scope: 'world',
    config: true,
    type: String,
    default: 'systems/dnd5e/icons/spells/heal-sky-3.jpg',
    filePicker: true
  });
});

class InspirationSettings {
  static getToggle() {
    return game.settings.get(MODULE_ID, 'tweak.inspiration.toggle');
  }
  static getIcon() {
    return game.settings.get(MODULE_ID, 'tweak.inspiration.icon');
  }
}

Hooks.on('renderChatMessage', (app, html, data) => {
  if (InspirationSettings.getToggle()) {
    const actorId = data.message.speaker.actor;
    const actor = game.actors.get(actorId);

    if (actor) {
      const inspiration = actor.data.data.attributes.inspiration;
      if (inspiration) {
        const img = document.createElement('img');
        img.width = 36;
        img.height = 36;
        img.src = InspirationSettings.getIcon();
        img.style.border = 'none';
        img.style.flex = 'none';

        const chatElement = html[0];
        const header = chatElement.querySelector('header');

        if (header.children[0] instanceof HTMLImageElement) {
          header.insertBefore(img, header.children[1]);
        } else {
          header.prepend(img);
        }
      }
    }
  }
});
