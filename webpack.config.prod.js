const path = require("path");
const webpack = require("webpack");

const baseConfig = require("./webpack.config");

let config = Object.assign({}, baseConfig, {
  output: {
    path: path.join(__dirname, "dist/assets/"),
    filename: "main.js",
    publicPath: "/assets/"
  },
  entry: [ "./src/app" ],
})

config.plugins.push(new webpack.DefinePlugin({
  "process.env": {
    "NODE_ENV": JSON.stringify("production")
  }
}));

module.exports = config;
