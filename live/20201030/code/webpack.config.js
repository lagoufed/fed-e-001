// @ts-check
const path = require('path')

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  entry: './src/index.js',
  mode: 'none', // production 模式下自动开启摇树功能
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  optimization: {
    usedExports: true, // 1. 标记未引用的成员 2. 不导出未引用的成员
    // webpack 基于 ES2015 中的模块规则：import、export
    minimize: true // 去除未使用到的代码
  }
}
