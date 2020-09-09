function red () {
  console.log('red')
}

function green () {
  console.log('green')
}

function yellow () {
  console.log('yellow')
}

function wait (cb, time) {
  return new Promise(resolve => {
    setTimeout(() => {
      cb()
      resolve()
    }, time)
  })
}

function main () {
  wait(red, 3000)
    .then(() => {
      return wait(yellow, 2000)
    })
    .then(() => {
      return wait(green, 1000)
    })
    .then(() => {
      main()
    })
}

main()
