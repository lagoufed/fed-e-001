// commander.js

// run linux shell
function runCommand (ssh, command, path) {
  return new Promise((resolve, reject) => {
    ssh.execCommand(command, {
      cwd: path
    }).then((res) => {
      if (res.stderr) {
        reject(console.error('发生错误:' + res.stderr))
        process.exit()
      } else {
        resolve(console.log(command + ' 执行完成！'))
      }
    })
    .catch((err) => {
      reject(console.error('6-执行命令错误', command, err))
    })
  })
}

module.exports = runCommand
