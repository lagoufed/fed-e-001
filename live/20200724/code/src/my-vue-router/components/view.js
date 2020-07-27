export default {
  render (h) {
    // 当前匹配到的路由对象
    const route = this.$route
    // console.log(route)
    // /music/pop     2
    let depth = 0
    // 记录当前组件为 RouterView
    this.routerView = true

    let parent = this.$parent
    while (parent) {
      if (parent.routerView) {
        depth++
      }
      parent = parent.$parent
    }

    const record = route.matched[depth]
    if (!record) {
      return h()
    }
    const component = record.component
    return h(component)
  }
}
