import { h, init } from 'snabbdom'

let patch = init([])

// 首次渲染
let vnode = h('ul', [
  h('li', '首页'),
  h('li', '视频'),
  h('li', '微博')
])
let app = document.querySelector('#app')
let oldVnode = patch(app, vnode)

// updateChildren 的执行过程
vnode = h('ul', [
  h('li', '首页'),
  h('li', '微博'),
  h('li', '视频')
])
patch(oldVnode, vnode)
