const effects = new Map()

const proxyHandler = {
  get (target, property) {
    // 收集依赖

    if (effects.last) {
      // 确保当前这个对象下这个属性所对应依赖列表
      effects.set(target, { [property]: [], ...effects.get(target) }) 
      // 记录依赖
      effects.get(target)[property].push(effects.last) 
    }

    // 正常返回结果
    return Reflect.get(target, property)
  },
  set (target, property, value) {
    // 触发 watch

    // 先执行设置操作
    const succeed = Reflect.set(target, property, value)

    // 找到当前这个对象下这个属性所对应依赖列表
    const deps = effects.get(target)[property]
    // 依次调用
    deps.forEach(e => e()) 

    // 正常返回
    return succeed
  }
}

// 将给定对象包装为 `Proxy` 实现数据响应
function reactive (obj) {
  // 为每个对象记录映射一个依赖列表对象，结构为 { prop: [ ...deps ] }
  effects.set(obj, {}) 

  // proxyHandler 可以复用，减少内存消耗
  return new Proxy(obj, proxyHandler)
}

// 添加一个数据状态监视函数
function watch (effect) {
  effects.last = effect
  effect()
  // 注意一定要清空
  effects.last = null
}

const state = reactive({
  foo: 100,
  bar: 200
})

watch(() => {
  console.log('foo changed: ', state.foo)
})

watch(() => {
  console.log('bar changed: ', state.bar)
})

watch(() => {
  console.log('both changed: ', state.foo, state.bar)
})

state.foo ++ // => foo changed:  101
state.bar ++ // => bar changed:  201
