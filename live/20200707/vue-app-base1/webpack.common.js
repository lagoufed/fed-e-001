const path = require('path')
const dotenv = require('dotenv')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const env = process.env.NODE_ENV || 'production'
dotenv.config({ path: '.env.' + env }) // load .env.production
dotenv.config() // load .env

const envs = Object.keys(process.env).reduce((e, i) => {
  if (i.startsWith('MY_')) {
    e[i] = JSON.stringify(process.env[i])
  }
  return e
}, {})

console.log(envs)

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  mode: 'none',
  entry: './src/main.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        use: {
          loader: 'eslint-loader'
        },
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1, // b
            name: '[name].[contenthash:6].[ext]',
            esModule: false
          }
        }
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      title: 'Vue App'
    }),
    new webpack.DefinePlugin({
      BASE_URL: '"/"'
    })
  ]
}