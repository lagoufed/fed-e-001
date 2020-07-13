import fetchApi from './fetch'
import { log } from './logger'

fetchApi('/photos?albumId=1').then(data => {
  data.forEach(item => {
    log(item)
  })
})
