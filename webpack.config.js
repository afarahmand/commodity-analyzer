var path = require("path");
const webpack = require('webpack');

module.exports = {
  context: __dirname,
  entry: "./javascripts/entry.js",
  output: {
    path: path.resolve(__dirname, 'javascripts'),
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: [/\.js?$/],
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['env']
        }
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: [".js", "*"]
  }
};
