// 枚举（Enum）

export {} // 确保跟其它示例没有成员冲突

// 用对象模拟枚举
// const PostStatus = {
//   Draft: 0,
//   Unpublished: 1,
//   Published: 2
// }

// 标准的数字枚举
// enum PostStatus {
//   Draft = 0,
//   Unpublished = 1,
//   Published = 2
// }

// 数字枚举，枚举值自动基于前一个值自增
// enum PostStatus {
//   Draft = 6,
//   Unpublished, // => 7
//   Published // => 8
// }

// 字符串枚举
// enum PostStatus {
//   Draft = 'aaa',
//   Unpublished = 'bbb',
//   Published = 'ccc'
// }

// 常量枚举，不会侵入编译结果
const enum PostStatus {
  Draft,
  Unpublished,
  Published
}

const post = {
  title: 'Hello TypeScript',
  content: 'TypeScript is a typed superset of JavaScript.',
  status: PostStatus.Draft // 3 // 1 // 0
}

// PostStatus[0] // => Draft