async function login () {
  // 接口请求异常 异常
  // 用户名错误、密码错误、用户不存在、500
  // 前提条件：接口把所以的异常都通过 HTTP 状态码来返回
  // 尤其是在使用 axios 请求库的时候，它会把所有 超出 200-300 范围的状态码都定义为异常，也就是：4xx、5xxx 这些都会触发异常
  try {
    const data = await ajax({
      url: '',
      method: '',
      data: {
        username: 'xxx',
        password: 'xxx'
      }
    })
  } catch (err) {
    if (err === 用户名) {
      console.log('xxx')
    } else if (err === 密码错误) {
      console.log('xxx')
    }
  }
}
