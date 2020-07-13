class Functor {
  constructor (value) {
    this._value = value
  }

  map (f) {
    return new Functor(f(this._value))
  }

  value (f) {
    return f(this._value)
  }
}

// 把美元转换成人民币 '$299.99'   --> 
const toRMB = s => new Functor(s)
  .map(s => s.replace(/\$/, ''))
  .map(s => s * 7)
  .value(s => s.toFixed(2))


console.log(toRMB('$299.99'))