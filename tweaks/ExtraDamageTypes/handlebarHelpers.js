import { convertLabelIdToDisplay } from './util.js';

export function handlebarHelpers() {
  Handlebars.registerHelper('styleListLabels', function (str) {
    return convertLabelIdToDisplay(str);
  });
}
