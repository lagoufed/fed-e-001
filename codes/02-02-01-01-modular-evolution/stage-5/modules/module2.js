// 兼容 CMD 规范（类似 CommonJS 规范）
define(function (require, exports, module) {
	// 通过 require 引入依赖
  var $ = require('jquery')
  // 通过 exports 或者 module.exports 对外暴露成员
  module.exports = function () {
    console.log('module 2~')
    $('body').append('<p>module2</p>')
  }
})
