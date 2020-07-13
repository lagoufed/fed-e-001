**ts 笔记**

# 强类型弱类型

- 类型安全
  - 强类型 弱类型
    - 强类型
      - 有类型上的约束，不允许任意的隐式类型转换
      - 优势：
        - 错误更早暴露
        - 代码智能，编码准备
        - 重构更加牢靠
        - 减少不必要的类型判断
    - 弱类型
      - 没有类型上的约束 允许任意的隐式类型转换
- 类型检查
  - 静态类型 动态类型

# js 类型系统

- js 没有编译环节，没有类型检测，只有在运行的时候，才能检测错误

- 弱类型动态类型语言

  ```js
  let obj = {};
  console.log(obj.fn());
  //在语法上可行，但是运行的时候报错
  let obj = {};
  setTimeout(() => {
    obj.fn(); //这是一件很可怕的事情，会留下隐患
  }, 10000);
  ```

  强类型语言在语法上就会报错，不会遗留到运行阶段

- 类型不明确，函数功能发生改变

  ```js
  function sum(a, b) {
    return a + b;
  }
  sum(100, 100);
  sum(100, "100");
  ```

- 对象所引器的转换

  ```js
  const obj = {};
  obj[true] = 100;
  console.log(obj[true]);
  ```

# Flow

- 静态类型检测器

- 原理：

  - 在代码当中添加一些类型注解的方式标记每个变量和参数是什么类型，flow 根据这些类型注解，检查代码当中是否存在类型使用上的异常，从而在开发阶段就检测到了类型异常的使用，从而避免了在运行阶段类型异常的错误。

  - 类型注解写法

    - 在变量后 加上 ：type 进行类型注解

      ```js
      function sum(a: number, b: number) {
        return a + b;
      }
      ```

- Flow 使用

  - Flow 安装 yarn add flow-bin --dev
  - flow 使用方法

# TypeScript

-

- 原始类型

  - string
  - number 包含 NaN 和 infinity
  - boolean
  - null
  - void 用于标记函数没有返回值的 undefined
  - undefined
  - symbol
    - `es2015`新增的

- 作用域问题

  - 不同文件当中会有相同变量名称问题

    ```ts
    demo1.ts;
    let a = "hello";
    demo2.ts;
    let a = "111"; //会报错
    ```

  - 解决方法

    - 代码写在自执行函数内
    - 关键字 export {}
      - 这个文件如果有关键字 export 那么这个文件会当成一个模块 这个文件当中的所有成员变成了局部成员
      - export 不是导出一个对象 切记

- Object 类型

  - 泛指所有的非原始类型 Array 对象 函数

    ```ts
    const obj: object = function () {};
    ```

  - 如果需要一个普通对象的类型限制，需要使用对象字面量的语法

    ```ts
    const obj: { foo: number; bar: boolean } = {
      foo: 123,
      bar: true,
    };
    ```

- 数组类型 Array

  - const arr: Array<number> = [1,2,3]
  - const arr1:number[] = [1,2,3]

- 元组类型 tuple

  - 明确元素数量和元素类型的一个数组

  - 书写 采用数组字面量的形式定义

    - const tuple:[number,string] = [1,"lagou"]

    - 访问方式

      - 数组下标
      - 数组解构

      ```ts
      var a = Object.entries({
        name: "la",
        age: 12,
        txt: "lagou",
      });
      console.log(a); // [Array(2), Array(2), Array(2)] 返回一个元组
      ```

- 枚举类型 enum

  - 使用方式

    - 关键字 enum 定义枚举类型

      ```ts
      enum PostStatus {
        Draft = 0,
        Unpublished = 1,
        Published = 2,
      }
      const post = {
        status: PostStatus.Draft,
      };
      ```

- 函数类型

  - 参数
  - 函数返回值
  - 可选参数
  - 默认值参数
  - 剩余参数

- 任意类型 any

  - let foo:any = "string"
  - any 不安全

- 隐式类型推断

  - let age = 12;推断为 number 类型 再赋值为字符串 报错
  - let age;不赋值 该变量是 any 类型

- 类型断言

  - as 关键字
    - `const num = res as number`
  - <>
    - `const num=<number>res` 不推荐
  - 类型断言不是类型转换

- 接口`interface`

  - 约定对象的结构

    - ```
      interface Post {
      	title: string
      	content: string
      }
      ```

    - 可选成员

      - 在属性后加上?

      - ```
        interface Post {
        	title: string
        	content: string
        	subtitle?: string
        }
        ```

    - 只读成员

      - `readonly`

      - ```js
        interface Post {
        	title: string
        	content: string
        	subtitle?: string
            readonly summary: string
        }
        ```

    - 动态成员

      - 方括号[]

      - ```js
        interface Cache {
          [prop: string]: string;
        }
        const cache: Cache = {};
        cacha.foo = "value1";
        ```

  - 只是为数据做类型约束

- 类 class

  - ```
    class Person {
    	name: string
    	number: number
    	constructor(name: string,age:number) {
    		this.name = name
    		this.age =age
    	}
    	sayHi(mes: string):void {

    	}
    }
    ```

  - 访问修饰符

    - public
      - 默认修饰符 公有的
    - private
      - 私有的
        - 类的内部访问
        - 外部不能访问
    - protected
      - 受保护的
        - 外部不能访问
        - 允许子类访问

  - 类的只读属性

    - readonly
    - 写在访问修饰符的后面，该属性不能被修改

- 类和接口

  - interface
  - 定义对象
  - 定义类

- 抽象类

  - abstract 关键字
  - 抽象方法
    - 需要子类去实现

- 泛型

  - 定义的时候明确它的类型，使用的时候才知道。

- 类型声明

  - 关键字 declare
