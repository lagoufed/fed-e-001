// fn.bind(obj, args)
// btn.onclick = (function () { }).bind(obj)


Function.prototype.mybind = function (context, ...args) {
  return (...rest) => {
    return this.call(context, ...args, ...rest)
  }
}

function fn (a, b, c) {
  return a + b + c
}

const func = fn.mybind(this, 1, 2, 3)


console.log(func())

func = null



