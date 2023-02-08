"use strict";
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: {
    content: "./src/content.js",
    background: "./src/background.js",
    popup: "./src/popup.js",
  },
  output: {
    path: path.resolve(__dirname, "build"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              url: false,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "src/assets/styles/style.css",
          to: "assets/styles",
        },
        {
          from: "src/assets/manifest.json",
        },
      ],
    }),
    new HtmlPlugin({
      filename: "popup.html",
      template: path.resolve("./src/popup.html"),
      chunks: ["popup"],
    }),
    new HtmlPlugin({
      filename: "dashboard.html",
      template: path.resolve("./src/dashboard.html"),
      chunks: ["popup"],
    }),
  ],
};
