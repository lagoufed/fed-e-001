// 案例代码
const man = {
  name:'jscoder',
  age:22
}

//补全代码
const proxy = new Proxy(man, {
  // 参数1：源对象
  // 参数2：被访问的属性名
  get (target, property) {
    if (!target[property]) {
      throw new Error(`Property "${property}" does not exist`)
    }
    return target[property]
  }
})

console.log(proxy.name) // "jscoder"
console.log(proxy.age) // 22

console.log(proxy.location) // Property "$(property)" does not exist
