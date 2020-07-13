import axios from 'axios'

export default axios.create({
  baseURL: process.env.VUE_APP_API_BASE,
  // auth: {
  //   username: 'frontend',
  //   password: 'ff6cf8d1-51c3-4dc6-8d3d-e1fd2cf48d31'
  // },
  // timeout: 3 * 1000, // 3s
  // headers: {
  //   'X-Requested-With': 'XMLHttpRequest'
  // }
})
