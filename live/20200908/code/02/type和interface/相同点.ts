/**
 * 1. 都可以描述一个对象或者函数
 */
// interface User {
//   name: string
//   age: number
// }

// interface SetUser {
//   (name: string, age: number): void;
// }

// type User = {
//   name: string
//   age: number
// };

// type SetUser = (name: string, age: number)=> void;


/**
 * 2. 都允许拓展（extends）
 * interface 和 type 都可以拓展，并且两者并不是相互独立的，也就是说 interface 可以 extends type, type 也可以 extends interface 。 虽然效果差不多，但是两者语法不同。
 */
// interface extends interface
// interface Name { 
//   name: string;
// }
// interface User extends Name { 
//   age: number;
// }

// type extends type
// type Name = {
//   name: string; 
// }
// type User = Name & { age: number  };

// interface extends type
// type Name = { 
//   name: string; 
// }
// interface User extends Name { 
//   age: number;
// }

// type extends interface
// interface Name { 
//   name: string;
// }
// type User = Name & {
//   age: number;
// }


