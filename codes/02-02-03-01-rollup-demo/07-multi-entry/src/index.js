import fetchApi from './fetch'
import { log } from './logger'

fetchApi('/posts').then(data => {
  data.forEach(item => {
    log(item)
  })
})
