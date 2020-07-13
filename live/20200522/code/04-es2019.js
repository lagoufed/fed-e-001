// ES2018
// + 数组稳定排序

const arr = [
  { id: 1, value: 'A' },
  { id: 1, value: 'B' },
  { id: 1, value: 'C' },
  { id: 1, value: 'D' },
  { id: 1, value: 'E' },
  { id: 1, value: 'F' },
  { id: 1, value: 'G' },
  { id: 1, value: 'H' },
  { id: 1, value: 'I' },
  { id: 1, value: 'J' },
  { id: 1, value: 'K' },
  { id: 1, value: 'L' },
  { id: 1, value: 'I' },
  { id: 1, value: 'J' },
  { id: 1, value: 'K' },
  { id: 1, value: 'L' }
]

console.log(arr.sort(function (a, b) {
  return a.id - b.id
}))

// + try...catch 参数可省略