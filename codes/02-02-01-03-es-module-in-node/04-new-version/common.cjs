// 如果需要在 type=module 的情况下继续使用 CommonJS，
// 需要将文件扩展名修改为 .cjs

const path = require('path')

console.log(path.join(__dirname, 'foo'))
