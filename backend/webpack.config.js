const nodeExternals = require('webpack-node-externals');
const path = require('path');

process.env.NODE_ENV = 'production';

module.exports = {
  entry: {

  },
  target: 'node',
  // because 'aws-sdk' is not compatible with webpack,
  // we exclude all node dependencies
  externals: [nodeExternals()],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: __dirname,
      exclude: /node_modules/
    }]
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js'
  }
}