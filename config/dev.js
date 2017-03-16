const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./base.js');

const config = webpackMerge(commonConfig(), {
  devtool: 'inline-sourcemap',
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['polyfills', 'vendor'].reverse()
    }),
  ]
});

module.exports = function() {
  return config;
};
