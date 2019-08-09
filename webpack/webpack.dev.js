const merge = require("webpack-merge");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  devServer: {
    contentBase: common.externals.paths.dist,
    port: 8081,
    overlay: true
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { sourceMap: true }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              config: { path: "./postcss.config.js" }
            }
          },
          {
            loader: "sass-loader",
            options: { sourceMap: true }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: "[file].map"
    })
  ]
});
