const path = require('path');
module.exports = {
  outputDir: path.resolve(__dirname, '../dist'),
  configureWebpack: {
    entry: './main.js'
  }
};