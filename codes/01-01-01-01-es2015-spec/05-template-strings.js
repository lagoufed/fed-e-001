// 模板字符串

// 反引号包裹
// const str = `hello es2015, this is a string`

// 允许换行
// const str = `hello es2015,

// this is a \`string\``

// console.log(str)

const name = 'tom'
// 可以通过 ${} 插入表达式，表达式的执行结果将会输出到对应位置
const msg = `hey, ${name} --- ${1 + 2} ---- ${Math.random()}`
console.log(msg)
