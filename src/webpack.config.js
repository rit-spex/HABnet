const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, '../client/app.js'),
  ],
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name].js',
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'client/index.tpl.html',
      inject: 'body',
      filename: 'index.html',
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([ { from: 'client/assets', to: 'assets' } ]),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        'presets': ['react', 'es2015', 'stage-2', 'react-hmre'],
      },
    }, {
      test: /\.json?$/,
      loader: 'json',
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader?modules&localIdentName=[name]---[local]---[hash:base64:5]',
    }, {
      test: /\.dae$/,
      loader: 'file-loader?name=[name].[ext]&publicPath=assets/models/',
    }],
  },
};
