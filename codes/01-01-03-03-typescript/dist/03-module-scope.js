"use strict";
// 作用域问题
Object.defineProperty(exports, "__esModule", { value: true });
// 默认文件中的成员会作为全局成员
// 多个文件中有相同成员就会出现冲突
// const a = 123
// 解决办法1: IIFE 提供独立作用域
// (function () {
//   const a = 123
// })()
// 解决办法2: 在当前文件使用 export，也就是把当前文件变成一个模块
// 模块有单独的作用域
var a = 123;
//# sourceMappingURL=03-module-scope.js.map