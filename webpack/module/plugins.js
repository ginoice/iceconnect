const HtmlWebpackPlugin = require('html-webpack-plugin')

exports.plugins = () => {
  const plugins = [
    new HtmlWebpackPlugin()
  ]

  return plugins
}