// Promise 常见误区

function ajax (url) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest()
    xhr.open('GET', url)
    xhr.responseType = 'json'
    xhr.onload = function () {
      if (this.status === 200) {
        resolve(this.response)
      } else {
        reject(new Error(this.statusText))
      }
    }
    xhr.send()
  })
}

// 嵌套使用 Promise 是最常见的误区
// ajax('/api/urls.json').then(function (urls) {
//   ajax(urls.users).then(function (users) {
//     ajax(urls.users).then(function (users) {
//       ajax(urls.users).then(function (users) {
//         ajax(urls.users).then(function (users) {

//         })
//       })
//     })
//   })
// })
