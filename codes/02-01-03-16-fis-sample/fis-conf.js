fis.match('*.{js,scss,png}', {
  release: '/assets/$0'
})

fis.match('**/*.scss', {
  rExt: '.css',
  parser: fis.plugin('node-sass'),
  optimizer: fis.plugin('clean-css')
})

fis.match('**/*.js', {
  parser: fis.plugin('babel-6.x'),
  optimizer: fis.plugin('uglify-js')
})
