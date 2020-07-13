// import { name } from './module'
// import { name } from './module.js'
// console.log(name)

// import { lowercase } from './utils'
// import { lowercase } from './utils/index.js'
// console.log(lowercase('HHH'))

// import { name } from 'module.js'
// import { name } from './module.js'
// import { name } from '/04-import/module.js'
// import { name } from 'http://localhost:3000/04-import/module.js'
// console.log(name)

// --------------

// import {} from './module.js'
// import './module.js'

// ---------------

// import * as mod from './module.js'
// console.log(mod)

// ---------------

// var modulePath = './module.js'
// import { name } from modulePath
// console.log(name)

// if (true) {
//   import { name } from './module.js'
// }

// import('./module.js').then(function (module) {
//   console.log(module)
// })

// ----------------

// import { name, age, default as title } from './module.js'
import abc, { name, age } from './module.js'
console.log(name, age, abc)
