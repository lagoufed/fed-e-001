node_ssh = require('node-ssh')
ssh = new node_ssh()
runCommand = require('./commander')

function connectServe (sshInfo) {
  return new Promise((resolve, reject) => {
    ssh.connect({ ...sshInfo }).then(async () => {
      resolve(ssh)
    }).catch((err) => {
      reject(console.error('3-' + sshInfo.host + ' 连接失败', err))
    })
  })
}

module.exports = connectServe
