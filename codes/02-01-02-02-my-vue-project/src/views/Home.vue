<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import request from '@/utils/request'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  async mounted () {
    const { data } = await request('/slides')
    console.log(data)
  }
}
</script>
