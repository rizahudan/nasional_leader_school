const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: ['babel-polyfill', './src/client/index.js'],
  devServer: {
    contentBase: './build/client',
    historyApiFallback: true,
    port: 8081,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        pathRewrite: { '^/api': '' },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
      template: path.resolve('./src/client/index.html'),
    }),
  ],
});
