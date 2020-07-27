import View from './components/view'
import Link from './components/link'

export let _Vue = null
export default function install (Vue) {
  _Vue = Vue
  _Vue.mixin({
    beforeCreate () {
      // router
      if (this.$options.router) {
        this._routerRoot = this
        this._router = this.$options.router
        this._router.init(this)
        Vue.util.defineReactive(this, '_route', this._router.history.current)
      } else {
        // 此处的this就是组件的实例
        this._routerRoot = this.$parent && this.$parent._routerRoot
      }
    }
  })

  Vue.component('RouterView', View)
  Vue.component('RouterLink', Link)

  Object.defineProperty(Vue.prototype, '$router', {
    get () { return this._routerRoot._router }
  })

  Object.defineProperty(Vue.prototype, '$route', {
    get () { return this._routerRoot._route }
  })
}
