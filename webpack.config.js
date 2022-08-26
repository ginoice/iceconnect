const path = require('path')
const webpack = require('webpack')
const ESLintPlugin = require('eslint-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const nodeExternals = require("webpack-node-externals");

module.exports = ({ development }) => ({
  entry: './src/index.ts',
  devtool: development ? 'inline-source-map' : false,
  mode: development ? 'development' : 'production',

  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'index',
    libraryExport: 'default',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: 'typeof self === \'undefined\' ? this : self',
  },

  target: 'web',
  // externalsPresets: { node: true },
  externals: [nodeExternals({
    importType: 'umd'
  })], 

  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist')
    },
    historyApiFallback: true,
    open: true,
    compress: true,
    hot: true,
    port: 3000
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],

    fallback: {
      "path": require.resolve("path-browserify"),
      "path": false,
      "path": require.resolve("path-browserify"),
      "path": false,
      "crypto": require.resolve("crypto-browserify"),
      "crypto": false,
      "vm": require.resolve("vm-browserify"),
      "vm": false,
      "zlib": require.resolve("browserify-zlib"),
      "zlib": false,
      "constants": require.resolve("constants-browserify"),
      "constants": false,
      "url": require.resolve("url/"),
      "stream": require.resolve("stream-browserify"),
      "stream": false,
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "os": require.resolve("os-browserify/browser"),
      "util": require.resolve("util/"),
      "util": false,
      "assert": require.resolve("assert/"),
      "fs": false
    }
  },

  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),

    new ESLintPlugin({ extensions: ['ts'] }),

    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      filename: 'index.html'
    }),

    new CleanWebpackPlugin()
  ],

  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        // use: ['babel-loader', 'ts-loader']
        use: ['ts-loader']
      },
    ],
  }
});
