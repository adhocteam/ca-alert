var path = require("path"),
  webpack = require("webpack"),
  process = require("process"),
  ExtractTextPlugin = require("extract-text-webpack-plugin");

// NOTE(paulsmith): might be better to define these elsewhere
const DEV_API_HOST = "http://localhost:3000";
const PROD_API_HOST = "https://ca-alert.herokuapp.com";

const extractPlugin = new ExtractTextPlugin({ filename: "styles.css" });

module.exports = {
  entry: ["whatwg-fetch", "./src/index.jsx"],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, "src"),
        loader: "babel-loader",
        query: { presets: ["es2015", "react"] }
      },
      {
        test: /\.css$/,
        use: extractPlugin.extract({
          use: "css-loader"
        })
      },
      {
        test: /\.scss$/,
        use: extractPlugin.extract({
          loader: [
            {
              loader: "css-loader"
            },
            {
              loader: "sass-loader"
            }
          ]
        })
      },
      {
        test: /\.(svg|png|jpg|woff|woff2|eot|ttf)$/,
        loader: "file-loader"
      },
      {
        test: /\.html$/,
        loader: "file-loader?name=[path][name].[ext]!extract-loader!html-loader"
      }
    ]
  },
  resolve: { extensions: [".js", ".jsx"] },
  plugins: [
    new webpack.DefinePlugin({
      API_HOST: JSON.stringify(
        process.env.NODE_ENV === "production" ? PROD_API_HOST : DEV_API_HOST
      )
    }),
    extractPlugin
  ]
};
