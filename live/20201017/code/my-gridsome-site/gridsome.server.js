/**
 * 这里都是 Node.js 代码
 * Gridsome 在启动应用的时候会来执行这个模块
 */

const axios = require('axios')

module.exports = function (api) {
  api.loadSource(async actions => {
    const { data: posts } = await axios.get('http://localhost:3000/posts')
    const { data: categories } = await axios.get('http://localhost:3000/categories')

    // 直接从访问接口的源头控制
    posts.forEach(post => {
      post.category = categories.find(c => c.id === post.category)
    })

    // 在 Gridsome 中，只有被加入到 GraphQL 数据层中的才能静态化到页面中
    // 如果页面内容没有静态化需求，可以使用客户端请求渲染
    // 创建 Gridsome 集合
    const collection = actions.addCollection({
      typeName: 'BlogPosts'
    })

    for (const post of posts) {
      collection.addNode({
        id: post.id,
        title: post.title,
        author: post.author,
        category: post.category
      })
    }
  })
}

// module.exports = function (api) {
//   api.loadSource(({ addCollection }) => {
//     // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
//   })

//   api.createPages(({ createPage }) => {
//     // Use the Pages API here: https://gridsome.org/docs/pages-api/
//   })
// }
