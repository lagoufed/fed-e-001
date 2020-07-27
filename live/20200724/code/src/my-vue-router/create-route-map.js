export default function crateRouteMap (routes, oldPathList, oldPathMap) {
  const pathList = oldPathList || []
  const pathMap = oldPathMap || {}

  // [{ path: compo: ... children: { path: compo: } }]
  // 遍历所有的路由规则，解析到路由表中
  routes.forEach(route => {
    addRouteRecord(route, pathList, pathMap)
  })

  return {
    pathList,
    pathMap
  }
}
// 解析 route ，把解析好的规则放入 pathList pathMap 中
function addRouteRecord (route, pathList, pathMap, parentRecord) {
  const path = parentRecord ? `${parentRecord.path}/${route.path}` : route.path

  const record = {
    path,
    component: route.component,
    // 如果是子路由的话，记录子路由对应的父 record
    parent: parentRecord
  }

  // 如果已经有了 path ，相同的path 直接跳过
  if (!pathMap[path]) {
    pathList.push(path)
    pathMap[path] = record
  }

  // 判断 route 中是否有子路由
  if (route.children) {
    // 遍历子路由，把子路由也添加到 路由表中
    route.children.forEach(childRoute => {
      addRouteRecord(childRoute, pathList, pathMap, record)
    })
  }
}
