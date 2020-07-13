const fs = require('fs')
const path = require('path')
const marked = require('marked')
const puppeteer = require('puppeteer')
const { cosmiconfigSync } = require('cosmiconfig')

/**
 * 将指定路径的 md 文件转换为 png
 * @param {string} input 输入文件的路径（可能是相对路径，也可能是绝对）
 * @param {object} param1
 */
module.exports = async (input, { output, width = 800 }) => {
  if (typeof input !== 'string') {
    throw new TypeError(`Expected a string, got ${typeof input}`)
  }

  // console.log(process.cwd())
  // input => './readme.md'
  // 相对路径指的是相对命令行当前所在目录：process.cwd()
  // 这个路径跟代码位置、node 程序所在的位置都没关系，只是看你运行这个 js 文件时所在的文件目录

  // 1. 读取 input 文件所对应的文件内容
  const filename = path.resolve(input) // 内部自动基于 process.cwd()
  // console.log(filename)
  // 判断文件存在 + 判断是文件还是文件夹
  // './ ../  foo/bar.md'  '/  d:'
  if (!fs.existsSync(filename)) {
    throw new Error('文件路径不存在')
  }

  const stat = fs.statSync(filename)
  if (stat.isDirectory()) {
    throw new Error('给定路径是一个文件夹，而不是文件')
  }

  const contents = fs.readFileSync(filename, 'utf8')
  // contents => '# dsfasdf'

  // 2. 使用 marked 将 markdown 转换为 html

  const fragment = marked(contents)

  // 加载配置文件中的模版
  const explorer = cosmiconfigSync('md2png')
  const { config = {} } = explorer.search(process.cwd()) || {}

  const html = config.template.replace('${fragment}', fragment)

  // console.log(config)

  // const html = `<!DOCTYPE html>
  // <html lang="en">
  // <head>
  //   <meta charset="UTF-8">
  //   <meta name="viewport" content="width=device-width, initial-scale=1.0">
  //   <title>Document</title>
  //   <link rel="stylesheet" href="https://unpkg.com/github-markdown-css">
  //   <style>
  //     .markdown-body {
  //       width: 90%;
  //       max-width: 700px;
  //       margin: 0 auto;
  //     }
  //   </style>
  // </head>
  // <body class="markdown-body">
  //   ${fragment}
  // </body>
  // </html>`

  // 3. html -> 图片

  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  // await page.goto('https://www.lagou.com')
  await page.setViewport({ width, height: 100 })
  await page.setContent(html)
  await page.screenshot({ path: output, fullPage: true })

  await browser.close()


  // options = Object.assign({}, options)

  // return `${name}@${options.host || 'zce.me'}`
}
