export function convertLabelIdToDisplay(label) {
  if (typeof label !== 'string') return label;
  return label
    .split('-') // Convert each part into their own strings
    .map(w => w.charAt(0).toUpperCase() + w.substring(1)) // Cap first letter
    .join(' '); // Join back together with spaces
}
