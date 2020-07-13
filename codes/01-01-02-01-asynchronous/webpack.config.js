const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  mode: 'none',
  stats: 'none',
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin()
  ]
}
