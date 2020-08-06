# 20200805 直播

> 直播主题：《在 Vue 中使用 TypeScript》

## 介绍

## 在 Vue 项目中配置使用 TypeScript

推荐两种方式：

- 全新项目
- 已有项目

### 全新项目

```shell
$ vue create vue-with-ts

? Please pick a preset: Manually select features

# 这一步把 TypeScript 勾选上即可，其它功能根据自己需要进行选择
? Check the features needed for your project: Babel, TS, Router, Vuex, Linter

# 如果你喜欢使用 class 的方式定义组件，则输入 Yes，不喜欢的话就 No
? Use class-style component syntax? Yes

# TypeScript 默认会把 JavaScript 代码转换为 ECMAScript 3 版本兼容的代码
# 如果你需要现代模式、自动检测 polyfill、转换 JSX 语法等功能，则建议开启这个选项
# 当选择以后，TypeScript 本身只会把代码转为 ESNext，也就是最新版的 ECMAScript 规范
# 然后由 Babel 把 ECMAScript 转换为低版本 JavaScript，例如 ECMAScript 5，以及自动检测 polyfill、转换 JSX 等功能
# 说白了就是让 TypeScript 转换和 Babel 转换相结合起来一起使用
? Use Babel alongside TypeScript (required for modern mode, auto-detected polyfills, transpiling JSX)? Yes

? Use history mode for router? (Requires proper server setup for index fallback in production) No

? Pick a linter / formatter config: Standard

? Pick additional lint features: Lint on save, Lint and fix on commit

? Where do you prefer placing config for Babel, ESLint, etc.? In dedicated config files

? Save this as a preset for future projects? No
```



### 已有的 Vue 项目

使用 @vue/cli 安装 [TypeScript 插件](https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli-plugin-typescript/README.md)：

```shell
vue add @vue/typescript
```

```shell
# 是否使用 class 的方式定义组件
# 非必须，如果你更喜欢 class 风格，则输入 Yes 启用
? Use class-style component syntax? Yes

# TypeScript 默认会把 JavaScript 代码转换为 ECMAScript 3 版本兼容的代码
# 如果你需要现代模式、自动检测 polyfill、转换 JSX 语法等功能，则建议开启这个选项
# 当选择以后，TypeScript 本身只会把代码转为 ESNext，也就是最新版的 ECMAScript 规范
# 然后由 Babel 把 ECMAScript 转换为低版本 JavaScript，例如 ECMAScript 5，以及自动检测 polyfill、转换 JSX 等功能
# 说白了就是让 TypeScript 转换和 Babel 转换相结合起来一起使用
? Use Babel alongside TypeScript (required for modern mode, auto-detected polyfills, transpiling JSX)? Yes

# 是否需要把所有 .js 文件转换为 .ts 资源
# 不建议使用，转换的过程会修改已有的 .js 资源代码，可能会带来问题，建议手动启用 TypeScript 之后手动把 .ts 处理为 .js
? Convert all .js files to .ts? No

# 是否允许编译 .js 文件模块，不建议开启，既然选择了 TypeScript，就最好全部更换为 TypeScript，而不要两者混搭，反而变得不伦不类
? Allow .js files to be compiled? No
```



### TypeScript 相关配置介绍

（1）安装了 @vue/cli-plugin-typescript 等插件

```json
"dependencies": {
  "vue-class-component": "^7.2.3",
  "vue-property-decorator": "^8.4.2",
},
"devDependencies": {
  "@typescript-eslint/eslint-plugin": "^2.33.0",
  "@typescript-eslint/parser": "^2.33.0",
  "@vue/cli-plugin-typescript": "~4.4.0",
  "@vue/eslint-config-typescript": "^5.0.2",
  "typescript": "~3.9.3",
},
```

（2）shims-vue.d.ts 文件的作用，类型声明

（3）shims-tsx.d.ts 文件的作用

## 定义组件的方式

### 使用 Options APIs

- 组件仍然可以使用以前的方式定义（导出组件选项对象，或者使用 Vue.extend()）
- 但是当我们导出的是一个普通的对象，此时 TypeScript 无法推断出对应的类型，
- 至于 VSCode 可以推断出类型成员的原因是因为我们使用了 Vue 插件，
- 这个插件明确知道我们这里导出的是一个 Vue 对象。
- 所以我们必须使用 `Vue.extend()` 方法确保 TypeScript 能够有正常的类型推断

```js
import Vue from 'vue'

export default Vue.extend({
  name: 'Button',
  data () {
    return {
      count: 1
    }
  },
  methods: {
    increment () {
      this.count++
    }
  }
})
```

### 使用 Class APIs

在 TypeScript 下，Vue 的组件可以使用一个继承自 Vue 类型的子类表示，这种类型需要使用 Component 装饰器去修饰

装饰器函数接收的参数就是以前的组件选项对象（data、props、methods 之类）

```js
import Vue from 'vue'
import Component from 'vue-class-component' // 官方库

@Component({
  props: {
    size: String
  }
})
export default class Button extends Vue {
  private count: number = 1
  private text: string = 'Click me'

  get content () {
    return `${this.text} ${this.count}`
  }

  increment () { // 事件处理函数
    this.count++
  }

  mounted () { // 生命周期函数
    console.log('button is mounted')
  }
}
```

- Data: 使用类的实例属性声明
- Method: 使用类的实例方法声明
- Computed: 使用 Getter 属性声明
- 生命周期: 使用类的实例方法声明

其它特性：例如 components, props, filters, directives 之类的，则需要使用修饰器参数传入。

> 更多语法请参考官方文档：https://class-component.vuejs.org/。



使用这种 class 风格的组件声明方式并没有什么特别的好处，只是为了提供给开发者多种编码风格的选择性。



**关于装饰器**

[装饰器](https://github.com/tc39/proposal-decorators)是 ES 草案中的一个新特性，提供一种更好的面向切面编程（AOP）的体验，不过这个草案最近有可能发生重大调整，所以个人并不推荐，暂时只做了解即可。

TypeScript 中对装饰器的实现：https://www.staging-typescript.org/docs/handbook/decorators.html

类装饰器：

```js
function classDecorator (constructor: Function) {
  console.log('源类型：', constructor)
}
```

方法装饰器：

```js
function methodDecorator (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  console.log('目标对象：', target)
  console.log('属性名称：', propertyKey)
  console.log('属性描述符：', descriptor)
  // descriptor 指的就是 Object.definedProperty 传入的第三个参数
}
```

访问器（getter/setter）装饰器：

```js
function accessorDecorator (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  console.log('目标对象：', target)
  console.log('属性名称：', propertyKey)
  console.log('属性描述符：', descriptor)
  // descriptor 指的就是 Object.definedProperty 传入的第三个参数
}
```



### 使用 Class APIs + [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator)

```typescript
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class Button extends Vue {
  private count: number = 1
  private text: string = 'Click me'
  @Prop() readonly size?: string

  get content () {
    return `${this.text} ${this.count}`
  }

  increment () {
    this.count++
  }

  mounted () {
    console.log('button is mounted')
  }
}
```

这种方式继续放大了 class 这种组件定义方法。

### 个人推荐

No Class APIs，只用 Options APIs。

使用 Options APIs 最好是使用 `export default Vue.extend({ ... })` 而不是 `export default { ... }`。

其实 Vue.js 3.0 早期是想要放弃 Class APIs 的，不过无奈想要兼容，所以才保留下来了。



## 一个实例

- RealWorld
  - GitHub 仓库：https://github.com/gothinkster/realworld
  - 在线示例：https://demo.realworld.io/
  - 项目模板：https://github.com/gothinkster/realworld-starter-kit/blob/master/FRONTEND_INSTRUCTIONS.md
  - 接口文档：https://github.com/gothinkster/realworld/tree/master/api



## 答疑

- 老师，在vscode中的格式化如何使用项目中的eslint规则
  - 参考答案：https://www.yuque.com/lipengzhou/blog/semn2f
- webstorm ,vscode，eslint 别名怎么识别，项目配置了别名，eslint 没识别到，报了警告
  - 参考答案：https://www.yuque.com/lipengzhou/blog/vwpksr
- "typescript": "~3.9.3" 波浪号是什么意思
  - 参考答案：https://www.yuque.com/lipengzhou/blog/bwv3tz
- !:是什么意思啊
  - 参考答案：https://www.yuque.com/lipengzhou/blog/xre3kf

