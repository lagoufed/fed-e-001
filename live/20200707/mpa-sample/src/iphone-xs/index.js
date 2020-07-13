import { get } from '../common/request'

import '../common/utils'
import '../common/normalize.css'
import './style.css'

get('https://jsonplaceholder.typicode.com/posts').then(res => {
  console.log(res)
})