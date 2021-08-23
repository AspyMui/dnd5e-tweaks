import { MODULE_ID } from '../constants';
import InspirationSettings from './Settings';

Hooks.on('renderChatMessage', (app, html, data) => {
  if (InspirationSettings.getToggle()) {
    const actorId = data.message.speaker.actor;
    const actor = game.actors.get(actorId);

    if (actor) {
      const inspiration = actor.data.data.attributes.inspiration;
      if (inspiration) {
        const chatElement = html[0];
        const header = chatElement.querySelector('header');

        if (InspirationSettings.getBadge()) {
          const img = document.createElement('img');
          img.width = 16;
          img.height = 16;
          img.src = `modules/${MODULE_ID}/assets/inspiration-icon.svg`;
          img.alt = 'inspiration';
          img.title = 'inspiration';
          img.style.border = 'none';
          img.style.position = 'relative';
          img.style.marginLeft = '5px';
          img.style.top = '3px';

          header.children[0].appendChild(img);
        } else {
          const img = document.createElement('img');
          img.width = 36;
          img.height = 36;
          img.src = InspirationSettings.getIcon();
          img.style.border = 'none';
          img.style.flex = 'none';
          img.style.margin = '0 3px 5px 0';

          if (header.children[0] instanceof HTMLImageElement) {
            header.insertBefore(img, header.children[1]);
          } else {
            header.prepend(img);
          }
        }
      }
    }
  }
});
