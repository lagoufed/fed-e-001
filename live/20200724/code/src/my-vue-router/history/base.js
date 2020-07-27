import createRoute from '../util/route'
export default class History {
  constructor (router) {
    this.router = router
    // { path: '/', matched: [] }
    this.current = createRoute(null, '/')

    // 这个回调函数，是在hashhistory 中赋值，作用是更改 vue实例上的 _route
    this.cb = null
  }

  listen (cb) {
    this.cb = cb
  }

  // 跳转到其他位置,最终会渲染路由对应的组件
  transitionTo (path, onComplete) {
    // 重新改变 current
    this.current = this.router.matcher.match(path)

    // 调用 cb
    this.cb && this.cb(this.current)

    // console.log(this.current)
    onComplete && onComplete()
  }
}
