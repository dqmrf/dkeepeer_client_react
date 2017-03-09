var debug = process.env.NODE_ENV !== 'production';
var webpack = require('webpack');
var path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
var bootstrap = require('bootstrap-styl');

const config = {
  context: path.join(__dirname, 'src'),
  devtool: debug ? 'inline-sourcemap' : null,
  entry: './client.js',
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
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'postcss-loader'],
      })
    }, {
      test: /\.styl$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'postcss-loader', 'stylus-loader'],
      })
    }, {
      test: /\.sass$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'postcss-loader', 'sass-loader'],
      })
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
  plugins: [
    new HtmlWebpackPlugin({template: 'index.html'})
  ],
};

if (debug) {
  config.plugins.push(
    new webpack.NamedModulesPlugin(),
    new ExtractTextPlugin('[name]-[hash].css'),
    new webpack.LoaderOptionsPlugin({
      test: /(\.css$|\.sass$|\.styl$)/,
      options: {
        context: path.join(__dirname, 'src'),
        postcss:  [
          autoprefixer({
            browsers: ['last 10 versions']
          })
        ],
        stylus: { use: [bootstrap()] }
      }
    })
  );
} else {
  config.plugins.push(
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false })
  );
}

module.exports = config;
