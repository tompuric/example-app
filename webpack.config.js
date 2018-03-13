const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const baseUrl = require("./build/base-url");
const apiUrl = require("./build/api-url");

const BUILD_DIR = path.join(__dirname, "./dist");
const SRC_DIR = path.join(__dirname, "./src");

const isProductionMode = process.env.NODE_ENV === "production";

const config = {
  context: SRC_DIR,
  devServer: {
    contentBase: BUILD_DIR,
    historyApiFallback: true,
    host: "0.0.0.0",
    hot: true,
    port: 8080,
    publicPath: "/",
  },
  devtool: "source-map",
  entry: {
    app: [
      "./index.tsx",
    ],
  },
  module: {
    rules: [
      {
        include: [
          SRC_DIR,
          path.join(__dirname, "./node_modules/d/"),
        ],
        test: /\.tsx?$/,
        use: [
          {
            loader: "awesome-typescript-loader",
            options: {
              compact: false,
            },
          },
        ],
      },
      // {
      //   enforce: 'pre',
      //   test: /\.js$/,
      //   exclude: [
      //     /node_modules\/react-redux-typescript/,
      //   ],
      //   loader: 'source-map-loader',
      // },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [{
            loader: "css-loader",
            options: { importLoaders: 1 },
          }],
        }),
      },
      {
        loader: "url-loader",
        options: {
          limit: 10000,
        },
        test: /\.(png|woff|woff2|eot|ttf|svg)(\?|$)/,
      },
      {
        test: /\.less$/,
        use: [{
          loader: "style-loader",
        }, {
          loader: "css-loader",
        }, {
          loader: "less-loader",
          options: {
            noIeCompat: true,
            strictMath: true,
          },
        }],
      },
    ],
  },
  output: {
    filename: "[name].bundle.js",
    path: BUILD_DIR,
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      filename: "commons.js",
      minChunks: Infinity,
      name: "commons",
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin({
      allChunks: true,
      filename: "[name].bundle.css",
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      inject: "body",
      template: "./index.html",
    }),
    new webpack.DefinePlugin({
      __API_URL__: apiUrl,
      __BASE_URL__: baseUrl,
    }),
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    modules: [
      SRC_DIR,
      "node_modules",
    ],
  },
  // externals: {
  //   react: 'React',
  //   'react-dom': 'ReactDOM',
  // },
  // addition - add source-map support
  stats: {
    colors: true,
  },
};

if (isProductionMode) {
  config.plugins.push(...[
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
  ]);
}

module.exports = config;
