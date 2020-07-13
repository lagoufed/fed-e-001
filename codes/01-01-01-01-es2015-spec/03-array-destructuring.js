// 数组的解构

const arr = [100, 200, 300]

// const foo = arr[0]
// const bar = arr[1]
// const baz = arr[2]
// console.log(foo, bar, baz)

// const [foo, bar, baz] = arr
// console.log(foo, bar, baz)

// const [, , baz] = arr
// console.log(baz)

// const [foo, ...rest] = arr
// console.log(rest)

// const [foo, bar, baz, more] = arr
// console.log(more)

// const [foo, bar, baz = 123, more = 'default value'] = arr
// console.log(bar, more)

const path = '/foo/bar/baz'
// const tmp = path.split('/')
// const rootdir = tmp[1]

const [, rootdir] = path.split('/')
console.log(rootdir)
