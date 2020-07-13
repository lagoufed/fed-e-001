"use strict";
// 类与接口
Object.defineProperty(exports, "__esModule", { value: true });
var Person = /** @class */ (function () {
    function Person() {
    }
    Person.prototype.eat = function (food) {
        console.log("\u4F18\u96C5\u7684\u8FDB\u9910: " + food);
    };
    Person.prototype.run = function (distance) {
        console.log("\u76F4\u7ACB\u884C\u8D70: " + distance);
    };
    return Person;
}());
var Animal = /** @class */ (function () {
    function Animal() {
    }
    Animal.prototype.eat = function (food) {
        console.log("\u547C\u565C\u547C\u565C\u7684\u5403: " + food);
    };
    Animal.prototype.run = function (distance) {
        console.log("\u722C\u884C: " + distance);
    };
    return Animal;
}());
//# sourceMappingURL=17-class-and-interface.js.map