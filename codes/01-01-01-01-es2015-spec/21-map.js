// Map 数据结构

// const obj = {}
// obj[true] = 'value'
// obj[123] = 'value'
// obj[{ a: 1 }] = 'value'

// console.log(Object.keys(obj))
// console.log(obj['[object Object]'])

const m = new Map()

const tom = { name: 'tom' }

m.set(tom, 90)

console.log(m)

console.log(m.get(tom))

// m.has()
// m.delete()
// m.clear()

m.forEach((value, key) => {
  console.log(value, key)
})

// 弱引用版本 WeakMap
// 差异就是 Map 中会对所使用到的数据产生引用
// 即便这个数据在外面被消耗，但是由于 Map 引用了这个数据，所以依然不会回收
// 而 WeakMap 的特点就是不会产生引用，
// 一旦数据销毁，就可以被回收，所以不会产生内存泄漏问题。
