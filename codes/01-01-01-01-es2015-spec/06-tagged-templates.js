// 带标签的模板字符串

// 模板字符串的标签就是一个特殊的函数，
// 使用这个标签就是调用这个函数
// const str = console.log`hello world`

const name = 'tom'
const gender = false

function myTagFunc (strings, name, gender) {
  // console.log(strings, name, gender)
  // return '123'
  const sex = gender ? 'man' : 'woman'
  return strings[0] + name + strings[1] + sex + strings[2]
}

const result = myTagFunc`hey, ${name} is a ${gender}.`

console.log(result)
