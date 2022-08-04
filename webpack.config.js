const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    main: path.resolve(__dirname, './src/index.ts')
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: './js/index.js',
    library: 'icewallet',
    libraryExport: 'default',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: 'typeof self === \'undefined\' ? this : self',

  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-typescript",
            ],
          },
        }
      }
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],

    alias: {
      process: "process/browser"
    },
    fallback: {
      "url": require.resolve("url/"),
      "stream": require.resolve("stream-browserify"),
      "stream": false,
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "os": require.resolve("os-browserify/browser"),
      "util": require.resolve("util/"),
      "util": false,
      "assert": require.resolve("assert/"),
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
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html',
      minify: {
        collapseWhitespace: isProd
      }
    })
  ],
  devServer: {
    historyApiFallback: true,
    static: path.resolve(__dirname, 'dist'),
    open: true,
    compress: true,
    hot: true,
    port: 4000,
  }
};