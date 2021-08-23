const path = require('path');
const package = require('./package.json');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './tweaks/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(
      __dirname,
      '../../foundryvtt-data/Data/modules',
      package.name
    ),
    clean: true
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: './tweaks/module.json'
        },
        {
          from: './tweaks/**/*.hbs',
          to: 'templates/[name][ext]'
        },
        {
          from: './tweaks/**/*.jpg',
          from: './tweaks/**/*.png',
          from: './tweaks/**/*.svg',
          to: 'assets/[name][ext]'
        },
        {
          from: './tweaks/**/*.css',
          to: 'styles/[name][ext]'
        }
      ]
    })
  ]
};
