// 案例代码
const man = {
  name:'jscoder',
  age:22
}

//补全代码
const proxy = new Proxy(man, {
  // target: 被代理的目标对象
  // property：访问的属性名称
  get (target, property) {
    if (!target[property]) {
      throw new Error(`Property "${property}" does not exist`)
    }
    return target[property]
  }
})
                        
console.log(proxy.name) //"jscoder"
console.log(proxy.age) //22
                        
// console.log(proxy.location) //Property "$(property)" does not exist
// console.log(proxy.abc)
