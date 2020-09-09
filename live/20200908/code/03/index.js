async function f() {
  await new Promise(function (resolve, reject) {
    throw new Error('出错了');
    // resolve()
  })
}

f().then(() => {
  console.log('成功了')
}).catch(err => {
  console.log('失败了', err)
})

// try-catch 只能捕获同步异常
// 还有 async 中的 await Promise 异常
// try-catch 不能直接捕获 Promise 调用异常
// const fs = require('fs')

// try {
//   // new Promise 传递的函数是一个同步执行的函数
//   const p = new Promise((resolve, reject) => {
//     // throw new Error('errror')
//     fs.readFile('./login1.js', (err, data) => {
//       if (err) {
//         reject(err)
//       } else {
//         resolve(data)
//       }
//     })
//   })

//   p.then(data => {
//     console.log(data)
//   })
// } catch (err) {
//   console.log('失败了', err)
// }



// async function f() {
//   try {
//     console.log(1)

//     // 使用 try-catch 的时候，会把容易引发的异常的代码写到 try 里面
//     await new Promise(function (resolve, reject) {
//       // throw new Error('出错了');
//       resolve()
//     })

//     console.log(2)

//     await new Promise(function (resolve, reject) {
//       throw new Error('出错了');
//       // resolve()
//     })

//     console.log('hello')
//   } catch (err) {
//     // 这里用来捕获异常
//     console.log('异常了')
//   }

//   // 方式一：使用 Promise 的 catch 方法捕获异常

//   // 方式二：在 async 函数中使用 try-catch 捕获异常（推荐）
// }

// f() // 1 2 3 4



// async function f() {
//   console.log(1)

//   await new Promise(function (resolve, reject) {
//     console.log(2)
//     throw new Error('出错了');
//   }).catch(err => { // 这里的异常捕获不会影响后续代码的执行
//     console.log(3)
//     console.log('执行失败了')
//   })

//   console.log(4)

//   // 方式一：使用 Promise 的 catch 方法捕获异常

//   // 方式二：在 async 函数中使用 try-catch 捕获异常（推荐）
// }

// f() // 1 2 3 4
