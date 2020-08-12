const esprima = require('esprima')
const estraverse = require('estraverse')
const escodegen = require('escodegen')

let code = `const name = 'zs'`

const ast = esprima.parseScript(code)

estraverse.traverse(ast, {
  enter (path) {
    // console.log(path.type)
    if (path.type === 'VariableDeclaration') {
      if (path.kind === 'const') {
        path.kind = 'var'
      }
    }
  },
  leave (path) {
    // console.log(path.type)
  }
})

code = escodegen.generate(ast)
console.log(code)


let json = 
{
  "type": "Program",
  "body": [
    {
      "type": "VariableDeclaration",
      "declarations": [
        {
          "type": "VariableDeclarator",
          "id": {
            "type": "Identifier",
            "name": "name"
          },
          "init": {
            "type": "Literal",
            "value": "zs",
            "raw": "'zs'"
          }
        }
      ],
      "kind": "const"
    }
  ],
  "sourceType": "script"
}

console.log(escodegen.generate(json))