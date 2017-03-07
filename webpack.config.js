var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');
const cssnext = require('cssnext');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.join(__dirname, "src"),
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./client.js",
  output: {
    filename: '[name]-[hash].js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: [
        'babel-loader'
        /*'eslint-loader'*/
      ],
      exclude: /(node_modules|bower_components)/
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader?importLoaders=1',
        /*'postcss-loader'*/
      ]
    }, {
      test: /\.styl$/,
      use: [
        'style-loader',
        'css-loader?importLoaders=1',
        'stylus-loader',
      ]
    }, {
      test: /(\.jpg$|\.png$)/,
      use: 'file-loader'
    }, {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      use: 'url-loader?limit=10000&mimetype=application/font-woff'
    }, {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      use: 'file-loader'
    }]
  },
  plugins: debug ? [
    new HtmlWebpackPlugin({template: 'index.html'}),
    new webpack.NamedModulesPlugin()
  ] : [
    new HtmlWebpackPlugin({template: 'index.html'}),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false })
  ]
};
