// Promise 的目标：增强在使用 JavaScript 语言进行异步编程的编码体验

// 1. 执行流程问题 ---------------------------------------------------------------

// setTimeout(() => console.log('A'), 0) // fn1

// setTimeout(() => console.log('B'), 1000) // fn2

// Promise.resolve()
//   .then(() => { // fn3
//     setTimeout(() => console.log('C'), 0) // fn4
//     setTimeout(() => console.log('D'), 1000) // fn5
//     console.log('E')
//     Promise.resolve()
//       .then(() => console.log('F')) // fn6
//   })
//   .then(() => console.log('G'))

// setTimeout(() => console.log('H'), 0) // fn7

// setTimeout(() => console.log('I'), 1000) // fn8




// 2. Promise.all() ------------------------------------------------------------

// const axios = require('axios')

// // // axios 是支持同构的（Node/Browser)
// const urls = [
//   'https://api.github.com',
//   'https://api.github.com/users',
//   'https://sssdfsd.com/sdfsd'
// ]

// const promises = urls.map(item => axios(item).catch(e => 'haha'))

// const p = Promise.all(promises)

// p.then(res => {
//   console.log(res[2])
// })
// .catch(error => {
//   console.log('error')
// })

// Promise

// const promise = Promise.allSettled(urls.map(item => axios(item)))

// promise
//   .then(res => {
//     // res => [ { status: 'fulfilled', value: Response， reason: Error } ]
//   })

// Promise.race([
//   axios('https://api.github.com'),
//   timeout(100)
// ])



// 3. Generator / Async / Await ------------------------------------------------

// var foo = 100

// async function main () {
//   // console.log(foo)
//   foo = foo + await Promise.resolve(10)

//   // 1. 100 + await Promise.resolve(10)

//   console.log('main', foo)
// }

// main()

// foo++
// console.log('global', foo)

// function co (generator) {
//   const g = generator()

//   function handleResult (result) {
//     if (result.done) return // 生成器函数结束
//     result.value.then(data => {
//       handleResult(g.next(data))
//     }, error => {
//       g.throw(error)
//     })
//   }

//   handleResult(g.next())
// }

// var foo = 100
// function * main () {
//   foo = foo + (yield Promise.resolve(10))
//   console.log('main', foo) 
// }

// co(main)

// foo++
// console.log('global', foo)


// 1. 同步执行多个异步任务
// 2. 依次执行多个异步任务

const axios = require('axios')

const promises = [
  () => axios('https://api.github.com'),
  () => axios('https://api.github.com/users')
]

const p = promises.reduce((prev, current) => {
  return prev.then(() => current())
}, Promise.resolve())

console.log(p.then(res => console.log(res)))

// const nums = [1,2,3,4,5]

// nums.reduce((prev, item) => {
//   return prev + item
// }, 0)

// const reducer = (prev, item) => {
//   return prev + item
// }

// const res = reducer(0, nums[0])
// const res2 = reducer(res, nums[1])
// const res3 = reducer(res2, nums[2])

// async function main () {
//   for (const p of promises) {
//     await p()
//   }
// }



























// 1. 执行流程问题 ===============================================================

// setTimeout(() => console.log('A'), 0)
// setTimeout(() => console.log('B'), 1000)

// Promise.resolve()
//   .then(() => {
//     setTimeout(() => console.log('C'), 0)
//     setTimeout(() => console.log('D'), 1000)
//     console.log('E')
//     Promise.resolve().then(() => console.log('F'))
//   })
//   .then(() => console.log('G'))

// setTimeout(() => console.log('H'), 0)
// setTimeout(() => console.log('I'), 1000)



// 2. Generator / Async / Await ================================================

// var foo = 100

// async function main () {
//   foo = foo + await Promise.resolve(10)
//   console.log('main', foo)
// }

// main()

// foo++
// console.log('global', foo)

// --------------------------------------------

// function co (generator) {
//   const g = generator()

//   function handleResult (result) {
//     if (result.done) return // 生成器函数结束
//     result.value.then(data => {
//       handleResult(g.next(data))
//     }, error => {
//       g.throw(error)
//     })
//   }

//   handleResult(g.next())
// }

// var foo = 100
// function * main () {
//   foo = foo + (yield Promise.resolve(10))
//   console.log('main', foo) 
// }

// co(main)

// foo++
// console.log('global', foo)




// 3. Promise.all() 失败问题 ====================================================

// const axios = require('axios')

// const urls = [
//   'https://api.github.com',
//   'https://api.github.com/users',
//   'https://zce.com/other',
// ]

// Promise.all(urls.map(item => axios(item).catch(e => ({}))))
//   .then(allResponses => {
//     console.log(allResponses)
//   })
//   .catch(err => {
//     console.log(err)
//   })

// Promise.allSettled ----------------------------------------------------------

// Promise.allSettled(urls.map(item => axios(item)))
//   .then(allResponses => {
//     console.log(allResponses)
//   })