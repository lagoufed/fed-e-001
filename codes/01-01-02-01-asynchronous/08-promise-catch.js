// Promise 异常处理

function ajax (url) {
  return new Promise(function (resolve, reject) {
    // foo()
    // throw new Error()
    var xhr = new XMLHttpRequest()
    xhr.open('GET', url)
    xhr.responseType = 'json'
    xhr.onload = function () {
      if (this.status === 200) {
        resolve(this.response)
      } else {
        reject(new Error(this.statusText))
      }
    }
    xhr.send()
  })
}

// ajax('/api/users11.json')
//   .then(function onFulfilled (value) {
//     console.log('onFulfilled', value)
//   }, function onRejected (error) {
//     console.log('onRejected', error)
//   })

// 使用 catch 注册失败回调是更常见的

// ajax('/api/users11.json')
//   .then(function onFulfilled (value) {
//     console.log('onFulfilled', value)
//   })
//   .catch(function onRejected (error) {
//     console.log('onRejected', error)
//   })

// then(onRejected) 实际上就相当于 then(undefined, onRejected)

// ajax('/api/users11.json')
//   .then(function onFulfilled (value) {
//     console.log('onFulfilled', value)
//   })
//   .then(undefined, function onRejected (error) {
//     console.log('onRejected', error)
//   })

// 同时注册的 onRejected 只是给当前 Promise 对象注册的失败回调
// 它只能捕获到当前 Promise 对象的异常

// ajax('/api/users.json')
//   .then(function onFulfilled (value) {
//     console.log('onFulfilled', value)
//     return ajax('/error-url')
//   }, function onRejected (error) {
//     console.log('onRejected', error)
//   })

// 因为 Promise 链条上的任何一个异常都会被一直向后传递，直至被捕获
// 分开注册的 onRejected 相当于给整个 Promise 链条注册失败回调

ajax('/api/users.json')
  .then(function onFulfilled (value) {
    console.log('onFulfilled', value)
    return ajax('/error-url')
  }) // => Promise {}
  // .catch(function onRejected (error) {
  //   console.log('onRejected', error)
  // })

// 全局捕获 Promise 异常，类似于 window.onerror
window.addEventListener('unhandledrejection', event => {
  const { reason, promise } = event

  console.log(reason, promise)
  // reason => Promise 失败原因，一般是一个错误对象
  // promise => 出现异常的 Promise 对象

  event.preventDefault()
}, false)

// Node.js 中使用以下方式
// process.on('unhandledRejection', (reason, promise) => {
//   console.log(reason, promise)
//   // reason => Promise 失败原因，一般是一个错误对象
//   // promise => 出现异常的 Promise 对象
// })
