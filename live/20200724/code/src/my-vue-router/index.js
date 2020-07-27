import install from './install'
import createMatcher from './create-matcher'
import HashHistory from './history/hash'
import HTML5History from './history/html5'

export default class VueRouter {
  constructor (options) {
    this._routes = options.routes || []
    // 匹配器 { match, addRoutes }
    this.matcher = createMatcher(this._routes)
    const mode = this.mode = options.mode || 'hash'
    switch (mode) {
      case 'hash':
        this.history = new HashHistory(this)
        break
      case 'history':
        this.history = new HTML5History(this)
        break
      default:
        throw new Error('mode error')
    }
  }

  // 注册路由变化的事件
  init (app) {
    const history = this.history

    const setUpListener = () => {
      history.setUpListener()
    }

    history.transitionTo(
      history.getCurrentLocation(),
      // history.setUpListener   这样的话setUpListener里面的this会有问题
      setUpListener
    )

    history.listen(route => {
      app._route = route
    })
  }
}

VueRouter.install = install
