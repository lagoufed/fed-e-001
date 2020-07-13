
var arrList = []
arrList[10000] = 'icoder'

for (var i = 0; i < arrList.length; i++) {
  console.log(arrList[i])
}

for (var i = arrList.length; i; i--) {
  console.log(arrList[i])
}