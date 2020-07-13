import Vue from 'vue'
import App from './App.vue'
import logo from './assets/logo.png'
console.log(logo)

import './style.less'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
