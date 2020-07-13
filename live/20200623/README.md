# 20200623 直播

## 目标

开发一个 Markdown 文档到 PNG 图片的转换工具

### 需求

- 形式为 CLI 程序，可以在命令行中运行的工具
- 通过 CLI 参数指定需要转换的 md 文件路径
  - 支持相对路径和绝对路径
  - 如果没有指定输入，报错
  - 如果指定的路径不是文件，报错
- 通过 --output 参数指定输出 png 文件路径
  - 不指定输出文件路径，默认以 md 文件名和所在路径输出
    - 例如：`./readme.md` -> `./readme.png`
- 允许用户通过配置文件的方式配置 Markdown 渲染后的 HTML 结构
  - Markdown 转换为 HTML 过后，一般只是 HTML 片段，需要嵌入一个 HTML 结构中。

### 要点

1. CLI 工具的开发过程
2. Node.js 中的几种路径形式
3. Node.js 平台常用的 APIs
4. Node.js 在生态价值体现

## 思路 & 过程

npm link 只是开发阶段使用的

1. CLI 应用的基本结构

   1. bin & lib

1. marked 实现 Markdown 转 HTML
1. puppeteer 实现 HTML 转图片 （无头，headless）
1. cosmiconfig 配置文件加载

完整实现参考：https://github.com/zce/m2i
