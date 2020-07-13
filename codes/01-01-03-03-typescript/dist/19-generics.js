"use strict";
// 泛型
Object.defineProperty(exports, "__esModule", { value: true });
function createNumberArray(length, value) {
    var arr = Array(length).fill(value);
    return arr;
}
function createStringArray(length, value) {
    var arr = Array(length).fill(value);
    return arr;
}
function createArray(length, value) {
    var arr = Array(length).fill(value);
    return arr;
}
// const res = createNumberArray(3, 100)
// res => [100, 100, 100]
var res = createArray(3, 'foo');
//# sourceMappingURL=19-generics.js.map