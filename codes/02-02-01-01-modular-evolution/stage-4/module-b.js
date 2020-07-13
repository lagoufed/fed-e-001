// module b 相关状态数据和功能函数

;(function () {
  var name = 'module-b'
  
  function method1 () {
    console.log(name + '#method1')
  }
  
  function method2 () {
    console.log(name + '#method2')
  }

  window.moduleB = {
    method1: method1,
    method2: method2
  }
})()
