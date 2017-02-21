var path = require("path"),
  webpack = require("webpack"),
  process = require("process");

// NOTE(paulsmith): might be better to define these elsewhere
const DEV_API_HOST = "http://localhost:3000";
const PROD_API_HOST = "https://ca-alert.herokuapp.com";

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
  },
  resolve: { extensions: [".js", ".jsx"] },
  plugins: [
    new webpack.DefinePlugin({
      API_HOST: JSON.stringify(
        process.env.NODE_ENV === "production" ? PROD_API_HOST : DEV_API_HOST
      )
    })
  ]
};
