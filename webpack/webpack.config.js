const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = ({ development }) => ({
  context: path.resolve(__dirname, '../src'),
  entry: './index.ts',

  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },

  devtool: development ? 'inline-source-map' : false,
  mode: development ? 'development' : 'production',

  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '../dist'),
    library: 'index',
    libraryExport: 'default',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: 'typeof self === \'undefined\' ? this : self'
  },

  devServer: {
    static: {
      directory: path.resolve(__dirname, '../dist')
    },
    historyApiFallback: true,
    open: true,
    compress: true,
    hot: true,
    port: 3000
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['babel-loader', 'ts-loader'],
        exclude: /node_modules/,
      },
    ],
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],

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

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html'),
      filename: 'index.html'
    }),

    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(development ? 'development' : 'production')
      }
    }),

    new CleanWebpackPlugin()
  ],
})