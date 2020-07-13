const test = require('ava')
const md2Png = require('..')

// TODO: Implement module test
test('<test-title>', t => {
  const err = t.throws(() => md2Png(100), TypeError)
  t.is(err.message, 'Expected a string, got number')

  t.is(md2Png('w'), 'w@zce.me')
  t.is(md2Png('w', { host: 'wedn.net' }), 'w@wedn.net')
})
