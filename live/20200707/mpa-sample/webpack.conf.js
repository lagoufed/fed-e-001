const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const pages = ['iphone-xs']

module.exports = {
  mode: 'none',
  entry: {
    'iphone-xs': './src/iphone-xs',
    'iphone-12': './src/iphone-12'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]/bundle.[contenthash:6].js'
  },
  externals: {
    jquery: 'jQuery'
  },
  module: {
    rules: [
      {
        test: /\.css/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/iphone-xs/index.html',
      filename: 'iphone-xs/index.html',
      chunks: ['iphone-xs']
    }),
    new HtmlWebpackPlugin({
      template: './src/iphone-12/index.html',
      filename: 'iphone-12/index.html',
      chunks: ['iphone-12']
    })
  ]
}
