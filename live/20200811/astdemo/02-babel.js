const babel = require('@babel/core')
const t = require('@babel/types')
const code = 'const fn = (a, b) => a + b'

// const r = babel.transform(code, {
//   presets: ['@babel/preset-env']
// })

// const r = babel.transform(code, {
//     plugins: [
//       '@babel/plugin-transform-block-scoping',
//       '@babel/plugin-transform-arrow-functions'
//     ]
// })

const arrayPlugin = {
  visitor: {
    ArrowFunctionExpression (path) {
      // 箭头函数对应的节点
      const node = path.node


      const returnStatement = t.returnStatement(node.body)
      const blockStatement = t.blockStatement([returnStatement])
      const functionExpression = t.functionExpression(null, node.params, blockStatement)
      
      path.replaceWith(functionExpression)
    }
  }
}

const r = babel.transform(code, {
  plugins: [arrayPlugin]
})

console.log(r.code)