// ES2018
// + 展开和剩余在对象上的应用 ======================================================

const obj = { one: 1, two: 2, three: 3, four: 4, five: 5 }
const { one, four, ...rest } = obj
// one => 1, four => 4
// rest => { two: 2, three: 3, five: 5}

const obj2 = { foo: 'bar', ...rest }
// obj2 => { foo: 'bar', two: 2, three: 3, five: 5}

const obj3 = { foo: 'bar', two: 200, ...rest }
// obj3 => { foo: 'bar', two: 2, three: 3, five: 5}

const obj4 = { foo: 'bar', ...rest, two: 200 }
// obj4 => { foo: 'bar', two: 200, three: 3, five: 5}

// Object.assign({}, {})

// + 正则表达式的增强 =============================================================

// 环视
const intro = '张三是张三，张三丰是张三丰，张三不是张三丰，张三丰也不是张三'

// 向后否定
// const res = intro.replace(/张三(?!丰)/g, '李四')
// 向后肯定
const res = intro.replace(/张三(?=丰)/g, '李四')

// 'A00 B00'.replace(/(?<=A)00/g, '88')
// 'A00 B00'.replace(/(?<!A)00/g, '88')

console.log(res)


// 正则组命名
// const date = '2020-05-20'
// const reg = /(?<year>\d{4})-(?<mouth>\d{2})-(?<day>\d{2})/
// const res = reg.exec(date)
// console.log(res)


// + Promise.prototype.finally() ===============================================
