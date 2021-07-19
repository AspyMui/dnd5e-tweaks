const path = require('path');
const package = require('./package.json');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './module/src/index.js',
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
      patterns: [{ from: './module/static' }]
    })
  ]
};
