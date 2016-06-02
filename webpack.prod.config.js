const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  devtool: "source-map",
  entry: [
    "./src/app"
  ],
  output: {
    path: path.join(__dirname, "assets"),
    filename: "main.js",
    publicPath: "/assets/"
  },
  plugins: [
    new ExtractTextPlugin("[name].css"),
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify("production")
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ["babel"],
        include: path.join(__dirname, "src")
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("style-loader", "css!sass")
      }
    ]
  },
  sassLoader: {
    includePaths: [path.resolve(__dirname, "./css")]
  }
};
