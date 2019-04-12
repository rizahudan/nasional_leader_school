const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './build',
    port: 8081,
    open: true,
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
});
