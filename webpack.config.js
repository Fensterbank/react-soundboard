const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  devtool: "source-map",
  entry: [
    "webpack-dev-server/client?http://localhost:3000",
    "./src/app"
  ],
  output: {
    path: path.join(__dirname, "assets"),
    filename: "main.js",
    publicPath: "/assets/"
  },
  plugins: [
    new ExtractTextPlugin("[name].css")
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
