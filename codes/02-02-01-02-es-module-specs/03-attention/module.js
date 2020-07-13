var name = 'jack'
var age = 18

// var obj = { name, age }

// export default { name, age }

// 这里的 `{ name, hello }` 不是一个对象字面量，
// 它只是语法上的规则而已
export { name, age }

// export name // 错误的用法

// export 'foo' // 同样错误的用法

setTimeout(function () {
  name = 'ben'
}, 1000)
