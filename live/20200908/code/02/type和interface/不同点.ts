/**
 * 1. type 可以而 interface 不行
 */

//  type 不是一个类型，它是类型别名
// type 可以声明基本类型别名，联合类型，元组等类型
// 基本类型别名
// type Name = string

// const abc: Name = 'dsadsa'

// // 联合类型
// interface Dog {
//   wong();
// }
// interface Cat {
//   miao();
// }

// type Pet = Dog | Cat

// // 元组类型
// type PetList = [Dog, Pet]


// type 语句中还可以使用 typeof 获取实例的 类型进行赋值
// 当你想获取一个变量的类型时，使用 typeof
let div = document.createElement('div');
type B = typeof div // HTMLDivElement
const abc: B = document.createElement('div')

// 其他骚操作
// type StringOrNumber = string | number;  
// type Foo = string | { text: string };  
// type NameLookup = Dictionary<string, Person>;  
// type Callback<T> = (data: T) => void;  
// type Pair<T> = [T, T];  
// type Coordinates = Pair<number>;
// type Tree<T> = T | { left: Tree<T>, right: Tree<T> };


/**
 * 2. interface 可以而 type 不行=
 */
// interface 能够声明合并
interface User {
  name: string
  age: number
}

interface User {
  sex: string
}

// window
// window.xxx
interface Window {
  foo: string
}

// window.foo

/*
User 接口为 {
  name: string
  age: number
  sex: string 
}
*/

