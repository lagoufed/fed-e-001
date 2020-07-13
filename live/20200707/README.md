# 20200707 直播

## 集中答疑

https://shimo.im/docs/dgqw9GVGkDyqwY9J/ 

## 作业

### 1、基于 Webpack 构建 Vue.js 应用

执行 npm install 安装依赖

安装相关依赖

```json
{
  "@babel/core": "^7.10.4",
  "@vue/babel-preset-app": "^4.4.6",
  "babel-eslint": "^10.1.0",
  "babel-loader": "^8.1.0",
  "css-loader": "^3.6.0",
  "dotenv": "^8.2.0",
  "eslint": "^7.4.0",
  "eslint-loader": "^4.0.2",
  "eslint-plugin-vue": "^6.2.2",
  "file-loader": "^6.0.0",
  "html-webpack-plugin": "^4.3.0",
  "less-loader": "^6.2.0",
  "mini-css-extract-plugin": "^0.9.0",
  "style-loader": "^1.2.1",
  "url-loader": "^4.1.0",
  "vue-loader": "^15.9.3",
  "vue-template-compiler": "^2.6.11",
  "webpack": "^4.43.0",
  "webpack-cli": "^3.3.12",
  "webpack-dev-server": "^3.11.0"
}
```

`img src="[object Module]"` 的问题

https://github.com/webpack-contrib/url-loader#esmodule

Env 文件的应用

ESLint 集成

## 补充

### 1、VSCode 类型系统增强

```javascript
// ./webpack.config.js
import { Configuration } from 'webpack'

/**
 * @type {Configuration}
 */
const config = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js'
  }
}

module.exports = config
```

// @type 是 jsdoc

// import('webpack').Configuration 是 ts

```javascript
// ./webpack.config.js

/** @type {import('webpack').Configuration} */
const config = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js'
  }
}

module.exports = config
```

#### 2、ES2020 新特性一览

```javascript
// ES2020

// + 空值合并运算符 =====================================

function foo (options) {
  // 只有 size = null 或者 undefined
  options.size = options.size ?? 100
  console.log(options)
}

foo({ size: 0 })

// + 可选链运算符 =====================================

const list = [
  {
    title: 'foo',
    author: {
      name: 'zce',
      email: 'w@zce.me'
    }
  },
  {
    title: 'bar'
  }
]

list.forEach(item => {
  console.log(item.author?.name)
})

// obj?.prop
// obj?.[expr]
// arr?.[index]
// func?.(args)
  
// Promise.allSettled
// 类似于 Promise.all，所不同的是 allSettled 不会出现短路情况
  
// String.prototype.matchAll
  

// globalThis
  
// Dynamic imports
```





678802