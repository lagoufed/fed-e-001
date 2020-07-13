"use strict";
// 函数类型
Object.defineProperty(exports, "__esModule", { value: true });
function func1(a, b) {
    if (b === void 0) { b = 10; }
    var rest = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        rest[_i - 2] = arguments[_i];
    }
    return 'func1';
}
func1(100, 200);
func1(100);
func1(100, 200, 300);
// -----------------------------------------
var func2 = function (a, b) {
    return 'func2';
};
//# sourceMappingURL=08-function-types.js.map