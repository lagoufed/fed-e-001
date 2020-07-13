import { h, init } from 'snabbdom'

let patch = init([])

// 首次渲染
let vnode = h('div', 'Hello World')
let app = document.querySelector('#app')
let oldVnode = patch(app, vnode)

// patchVnode 的执行过程
vnode = h('div', 'Hello Snabbdom')
patch(oldVnode, vnode)
