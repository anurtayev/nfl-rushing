const path = require("path");

module.exports = {
  target: "node",
  mode: "production",
  entry: "./index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build")
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: "babel-loader",
        exclude: /node_modules/
      }
    ]
  },
  watchOptions: {
    ignored: ["node_modules/**"]
  }
};
