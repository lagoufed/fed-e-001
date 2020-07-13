// Promise 并行执行

function ajax (url) {
  return new Promise(function (resolve, reject) {
    // foo()
    // throw new Error()
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

// ajax('/api/users.json')
// ajax('/api/posts.json')

// var promise = Promise.all([
//   ajax('/api/users.json'),
//   ajax('/api/posts.json')
// ])

// promise.then(function (values) {
//   console.log(values)
// }).catch(function (error) {
//   console.log(error)
// })

// ajax('/api/urls.json')
//   .then(value => {
//     const urls = Object.values(value)
//     const tasks = urls.map(url => ajax(url))
//     return Promise.all(tasks)
//   })
//   .then(values => {
//     console.log(values)
//   })

// Promise.race 实现超时控制

const request = ajax('/api/posts.json')
const timeout = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error('timeout')), 500)
})

Promise.race([
  request,
  timeout
])
.then(value => {
  console.log(value)
})
.catch(error => {
  console.log(error)
})
