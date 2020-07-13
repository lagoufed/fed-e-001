// Promise vs. Callback

function ajax (url, callback) {
  const executor = (resolve, reject) => {
    var xhr = new XMLHttpRequest()
    xhr.open('GET', url)
    xhr.responseType = 'json'
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(xhr.response)
      } else {
        reject(new Error(xhr.statusText))
      }
    }
    xhr.send()
  }

  if (typeof callback === 'function') {
    // support callback
    executor(
      res => callback(null, res),
      err => callback(error)
    )
  }

  return new Promise(executor)
}

// ajax('/api/urls.json', (error, value) => {
//   if (error) {
//     return console.error(error)
//   }
//   console.log(value)
// })

// ajax('/api/urls.json')
//   .then(value => {
//     console.log(value)
//   })
//   .catch(error => {
//     console.error(error)
//   })

// Callback hell
ajax('/api/url1', (error, value) => {
  ajax('/api/url2', (error, value) => {
    ajax('/api/url3', (error, value) => {
      ajax('/api/url4', (error, value) => {

      })
    })
  })
})

// Promise chain
ajax('/api/url1')
  .then(value => {
    return ajax('ajax/url2')
  })
  .then(value => {
    return ajax('ajax/url3')
  })
  .then(value => {
    return ajax('ajax/url4')
  })
  .catch(error => {
    console.error(error)
  })

// sync mode code
try {
  const value1 = ajax('/api/url1')
  console.log(value1)
  const value2 = ajax('/api/url2')
  console.log(value2)
  const value3 = ajax('/api/url3')
  console.log(value3)
  const value4 = ajax('/api/url4')
  console.log(value4)
} catch (e) {
  console.error(e)
}
