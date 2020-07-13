const MayBe = require('folktale/maybe')

const toRMB = s => MayBe.of(s)
  .map(s => s.replace(/\$/, ''))
  .map(s => s * 7)
  .map(s => s.toFixed(2))
  .getOrElse('nothing')

console.log(toRMB('$299.99'))