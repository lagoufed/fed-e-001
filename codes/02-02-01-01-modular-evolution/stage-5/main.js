require.config({
  paths: {
    // 因为 jQuery 中定义的是一个名为 jquery 的 AMD 模块
    // 所以使用时必须通过 'jquery' 这个名称获取这个模块
    // 但是 jQuery.js 并不一定在同级目录下，所以需要指定路径
    jquery: './lib/jquery'
  }
})

require(['./modules/module1'], function (module1) {
  module1.start()
})
