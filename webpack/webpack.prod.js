const merge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "production",
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: "vendors",
          chunks: "all",
          test: /node_modules/,
          enforce: true
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              config: { path: "./postcss.config.js" }
            }
          },
          "sass-loader"
        ]
      }
    ]
  },
  plugins: []
});
