
function test(func) {
  console.log(func())
}

function test2() {
  var name = 'lg'
  return name
}

test(function() {
  var name = 'lg'
  return name
})

test(test2)