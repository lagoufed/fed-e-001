// // 导出的函数都会作为 gulp 任务
// exports.foo = () => {
//   console.log('foo task working~')
// }

// gulp 的任务函数都是异步的
// 可以通过调用回调函数标识任务完成
exports.foo = done => {
  console.log('foo task working~')
  done() // 标识任务执行完成
}

// default 是默认任务
// 在运行是可以省略任务名参数
exports.default = done => {
  console.log('default task working~')
  done()
}

// v4.0 之前需要通过 gulp.task() 方法注册任务
const gulp = require('gulp')

gulp.task('bar', done => {
  console.log('bar task working~')
  done()
})
