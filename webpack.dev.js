const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './build',
    historyApiFallback: true,
    port: 8081,
    open: true,
    proxy: {
      '/api': {
        target: 'http://192.168.2.1:8080',
        pathRewrite: { '^/api': '' },
      },
    },
  },
});
