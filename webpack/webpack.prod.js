const merge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
MinifyPlugin = require("babel-minify-webpack-plugin");
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
    },
    minimizer: [
      new UglifyJsPlugin({
        test: /\.js(\?.*)?$/i
      })
    ]
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
  plugins: [new MinifyPlugin()]
});
