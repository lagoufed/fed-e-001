// 异步任务（宏任务），放到下一次事件循环
setTimeout(_ => console.log(4))

new Promise(resolve => { // 同步执行
  resolve()
  console.log(1)
}).then(_ => { // 异步执行（微任务），放到本次事件循环的尾部
  console.log(3)
})

console.log(2) // 同步执行

// 1 2 3 4
