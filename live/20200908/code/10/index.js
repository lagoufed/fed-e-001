class EventEmitter {
  constructor () {
    this.handlers = {
      // foo: [事件函数, 事件函数],
      // abc: [事件函数]
    }
  }

  on (eventName, callback) {
    // foo
    const callbacks = this.handlers[eventName]
    if (callbacks) {
      callbacks.push(callback)
    } else {
      this.handlers[eventName] = []
      this.handlers[eventName].push(callback)
    }
  }

  // foo, [1, 2, 3, 4] 剩余操作符，把所有剩余的参数收集到一个数组中
  emit (eventName, ...args) {
    const callbacks = this.handlers[eventName]
    if (callbacks) {
      callbacks.forEach(cb => {
        cb(...args) // 数组的展开操作符，一个一个的拿出来传递给函数
      })
    }
  }
}

const em = new EventEmitter()

em.on('foo', function (a, b, c) {
  console.log('foo1', a, b, c)
})
em.on('foo', function (a, b, c) {
  console.log('foo2', a, b, c)
})
em.on('abc', function (a, b, c) {
  console.log('abc1')
})

console.log(em)

// em.emit('abc')
em.emit('foo', 1, 2, 3)

// em.emit('foo', 1, 2, 3)

// const bus = new Vue()

// 注册自定义事件
// bus.$on('abc', () => {
//   console.log('xxx')
// })

// bus.$on('abc', () => {
//   console.log('xxx')
// })

// bus.$on('foo', () => {
//   console.log('foo 触发了')
// })

// 
// bus.$emit('abc')
// bus.$emit('foo')
