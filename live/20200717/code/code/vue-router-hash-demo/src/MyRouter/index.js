let _Vue = null
export default class VueRouter {
  static install (Vue) {
    // 如果插件已经安装直接返回
    if (VueRouter.install.installed && _Vue === Vue) return

    VueRouter.install.installed = true
    _Vue = Vue

    Vue.mixin({
      beforeCreate () {
        // 判断 router 对象是否已经挂载了 Vue 实例上
        if (this.$options.router) {
          // 把 router 对象注入到 Vue 实例上
          _Vue.prototype.$router = this.$options.router
          this.$options.router.init()
        }
      }
    })
  }

  constructor (options) {
    this.options = options
    // 记录路径和对应的组件
    this.routeMap = {}
    this.app = _Vue.observable({
      // 当前的默认路径
      current: '/'
    })
  }

  init () {
    this.initRouteMap()
    this.initEvents()
    this.initComponents()
  }

  initRouteMap () {
    // routes => [{ name: '', path: '', component:  }]
    // 遍历所有的路由信息，记录路径和组件的映射
    this.options.routes.forEach(route => {
      // 记录路径和组件的映射关系
      this.routeMap[route.path] = route.component
    })
  }

  initEvents () {
    // 当路径变化之后，重新获取当前路径并记录到 current
    window.addEventListener('hashchange', this.onHashChange.bind(this))
    window.addEventListener('load', this.onHashChange.bind(this))
  }

  onHashChange () {
    this.app.current = window.location.hash.substr(1) || '/'
  }

  initComponents () {
    _Vue.component('RouterLink', {
      props: {
        to: String
      },
      // 需要带编译器版本的 Vue.js
      // template: "<a :href='\"#\" + to'><slot></slot></a>"
      // 使用运行时版本的 Vue.js
      render (h) {
        return h('a', {
          attrs: {
            href: '#' + this.to
          }
        }, [this.$slots.default])
      }
    })

    const self = this

    _Vue.component('RouterView', {
      render (h) {
        // 根据当前路径找到对应的组件，注意 this 的问题
        const component = self.routeMap[self.app.current]
        return h(component)
      }
    })
  }
}
