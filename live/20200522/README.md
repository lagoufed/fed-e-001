# 20200522 直播

## 回顾 & 补充

Promise 相关

- Promise 应用：
- 执行流程（宏任务/微任务）
  - 每一个任务（函数）的执行过程都有可能产生宏任务和微任务
  - 每个任务执行的最后，需要先执行完所有的微任务，再开始执行宏任务
- Promise.all() 失败问题
  - 如果数组中任意一个任务失败就会导致整个任务失败
  - 对数组中的每一个 promise 对象都去处理一下 catch，确保不会出现异常
  - 也可以使用 Promise.allSettled() 实现
- Generator / Async / Await

关于 this

- this 指向什么取决于何？
  - this 的指向取决于调用，而不是定义

```javascript
// function foo () {
//   console.log(this)
// }

// const obj = {
//   foo: function () {
//     console.log(this)
//   }
// }
```

ES2018+

- ES2018
  - 展开和剩余在对象上的应用
  - 正则表达式的增强
  - Promise.prototype.finally(() => {}) // then catch
- ES2019
  - 数组稳定排序
    - ES2019 之前，
  - try...catch 参数可省略
- ES2020
  - 空值合并运算符
  - 可选链运算符
  - Promise.allSettled()
  - BigInt
  - 动态导入

关于应用

TypeScript

现阶段的目标是掌握语法层面和运行层面的特性，应用落地必然还是需要结合不同的案例或者项目。

关于源码 / 原理

---

## 面试题

### 1、阅读下面代码，分析执行结果，并说明具体原因。

```javascript
console.log("A");

setTimeout(() => console.log("B"), 1000);

const start = new Date();
while (new Date() - start < 3000) {}
console.log("C");

setTimeout(() => console.log("D"), 0);

new Promise((resolve, reject) => {
  console.log("E");
  foo.bar(100);
})
  .then(() => console.log("F"))
  .then(() => console.log("G"))
  .catch(() => console.log("H"));

console.log("I");
```

考察：JavaScript 异步队列、宏任务/微任务

### 2、响应数据依赖收集实现

```javascript
// 将给定对象包装为 `Proxy` 实现数据响应
function reactive(obj) {
  // ... 内部实现
}

// 添加一个数据状态监视函数
function watch(effect) {
  // ... 内部实现
}

const state = reactive({
  foo: 100,
  bar: 200,
});

watch(() => {
  console.log("foo changed: ", state.foo);
});

watch(() => {
  console.log("bar changed: ", state.bar);
});

state.foo++; // => foo changed:  101
state.bar++; // => bar changed:  201
```

假设现有 `reactive` 和 `watch` 这两个函数
最终效果是 `state.foo` 或 `state.bar` 的值一旦改变，对应的 `watch` 函数自动执行

例如：

- `state.foo` 的值改变，执行第一个 `watch` 中的回调函数
- `state.bar` 的值改变，执行第二个 `watch` 中的回调函数

**要求：实现这个 `reactive` 和 `watch` 这两个函数！！！**

思路：

1. 利用 `Proxy` 实现数据响应
2. `reactive` 函数将给定对象包装为 `Proxy` 实现数据响应
3. `watch` 函数的作用是添加一个数据状态监视函数，只有这个函数内使用到的成员发生变化时，这个函数才会被执行

难点：

1. 如何收集属性对应的依赖函数
