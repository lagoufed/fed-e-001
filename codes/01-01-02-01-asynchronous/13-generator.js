// 生成器函数回顾

function * foo () {
  console.log('start')

  try {
    const res = yield 'foo'
    console.log(res)
  } catch (e) {
    console.log(e)
  }
}

const generator = foo()

const result = generator.next()
console.log(result)


// generator.next('bar')

generator.throw(new Error('Generator error'))
