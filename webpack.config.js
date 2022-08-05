const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');

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
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],

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
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'ts-loader'],
      },
    ],
  },
  plugins: [new ESLintPlugin({ extensions: ['ts'] })],
});
