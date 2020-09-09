// 3s
function red () {
  console.log('red')
}

// 1s
function green () {
  console.log('green')
}

// 2s
function yellow () {
  console.log('yellow')
}

function timeout (callback, time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      callback()
      resolve() // 将 Promise 的状态变为成功的
    }, time)
  })
}

// function main () {
//   timeout(red, 3000)
//     .then(() => {
//       return timeout(green, 1000)
//     })
//     .then(() => {
//       return timeout(yellow, 2000)
//     })
//     .then(() => {
//       main()
//     })
// }

async function main () {
  await timeout(red, 3000)
  await timeout(green, 1000)
  await timeout(yellow, 2000)
  main()
}

main()
