import { MODULE_ID } from './constants.js';

class log {
  static loud(...args) {
    console.log(`%c${MODULE_ID}:`, 'color: #00aaff', ...args);
  }
  static error(...args) {
    console.log(`c%${MODULE_ID} | ERROR:`, 'color: #ff0000', ...args);
  }
  static debug(...args) {
    console.log(`%c${MODULE_ID} | DEBUG:`, 'color: #bada55', ...args);
  }
}

const defaultIcon = 'systems/dnd5e/icons/spells/enchant-sky-3.jpg';

Hooks.once('init', async function () {
  log.loud('Module running!');
});

Hooks.on('renderChatMessage', (app, html, data) => {
  const chatElement = html[0];
  const header = chatElement.querySelector('header');

  const actorId = data.message.speaker.actor;
  const actor = game.actors.get(actorId);

  if (actor) {
    log.debug('actor:', actor);
    log.debug('actor.data:', actor.data);

    // game.data.actors[0].data.attributes.inspiration
    const inspiration = actor.data.data.attributes.inspiration;
    if (inspiration) {
      const img = document.createElement('img');
      img.width = 36;
      img.height = 36;
      img.src = defaultIcon;
      img.style.border = 'none';
      img.style.flex = 'none';

      // Check if they have image profiles on (hacky way)
      if (header.children[0] instanceof HTMLImageElement) {
        header.insertBefore(img, header.children[1]);
      } else {
        header.prepend(img);
      }
    }
  }
});
