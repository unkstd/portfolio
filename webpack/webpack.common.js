const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");

const PATHS = {
  src: path.join(__dirname, "../src"),
  dist: path.join(__dirname, "../dist"),
  assets: "assets/"
};

module.exports = {
  externals: {
    paths: PATHS
  },
  entry: {
    app: `${PATHS.src}/index.js`
  },
  output: {
    filename: `${PATHS.assets}js/[name].[hash].js`,
    path: PATHS.dist
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]"
        }
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v+\d+\.\d+\.\d+)?$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]"
        }
      }
    ]
  },
  plugins: [
    require("autoprefixer"),
    new WorkboxPlugin.GenerateSW({
      exclude: [/\.(?:png|jpg|jpeg|svg)$/],
      runtimeCaching: [
        {
          urlPattern: /\.(?:png|jpe?g|svg)$/,
          handler: "CacheFirst",
          options: {
            cacheName: "images",
            expiration: {
              maxEntries: 10
            }
          }
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      template: `${PATHS.src}/index.html`,
      hash: false,
      filename: "./index.html"
    }),
    new CopyWebpackPlugin([
      { from: `${PATHS.src}/${PATHS.assets}img`, to: `${PATHS.assets}img` },
      { from: `${PATHS.src}/static`, to: "" }
    ])
  ],
  node: { fs: "empty" }
};
