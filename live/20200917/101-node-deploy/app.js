#!/usr/bin/env node
// app.js
const path = require('path')
const config = require('./config')
const compressFile = require('./lib/compress')
const connectServe = require('./lib/ssh')
const runCommand = require('./lib/commander')
const uploadFile = require('./lib/uploadFile')
const fs = require('fs')

// 可单独执行
async function main () {
  const localFile = path.join(__dirname, config.targetFile)
  config.openCompress ? await compressFile(config.targetDir, localFile) : '' //压缩
  ssh = await connectServe(config.ssh) // 连接
  await uploadFile(ssh, config, localFile) // 上传
  await runCommand(ssh, 'unzip ' + config.targetFile, config.deployDir) // 解压
  await runCommand(ssh, 'mv dist ' + config.releaseDir, config.deployDir) // 修改文件名称
  await runCommand(ssh, 'rm -f ' + config.targetFile, config.deployDir) // 删除

  console.log('所有操作完成！')
  process.exit()
}
// run main
main()
