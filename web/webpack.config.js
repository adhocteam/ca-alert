var path = require("path");

module.exports = {
  entry: "./src/index.jsx",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, "src"),
        loader: "babel-loader",
        query: { presets: ["es2015", "react"] }
      }
    ]
  }
};
