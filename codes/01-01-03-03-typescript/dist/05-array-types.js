"use strict";
// 数组类型
Object.defineProperty(exports, "__esModule", { value: true });
// 数组类型的两种表示方式
var arr1 = [1, 2, 3];
var arr2 = [1, 2, 3];
// 案例 -----------------------
// 如果是 JS，需要判断是不是每个成员都是数字
// 使用 TS，类型有保障，不用添加类型判断
function sum() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return args.reduce(function (prev, current) { return prev + current; }, 0);
}
sum(1, 2, 3); // => 6
//# sourceMappingURL=05-array-types.js.map