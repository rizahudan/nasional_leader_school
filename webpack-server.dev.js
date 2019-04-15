const path = require('path');
const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const NodemonPlugin = require('nodemon-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  target: 'node',
  externals: [nodeExternals()],
  devtool: 'source-map',
  devServer: {
    contentBase: './build/server',
    hot: true,
    watchContentBase: true,
  },
  entry: {
    app: './src/server/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'build/server'),
    publicPath: '/',
    filename: 'server.js',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new NodemonPlugin({
      // What to watch.
      watch: [path.resolve(__dirname, 'build/server'), path.resolve(__dirname, 'src')],
      // Detailed log.
      verbose: true,
      script: './build/server/server.js',
    }),
  ],
});
