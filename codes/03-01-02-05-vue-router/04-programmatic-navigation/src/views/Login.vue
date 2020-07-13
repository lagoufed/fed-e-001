<template>
  <div>
    用户名：<input type="text" /><br />
    密&nbsp;&nbsp;码：<input type="password" /><br />

    <button @click="push"> push </button>
  </div>
</template>

<script>
export default {
  name: 'Login',
  methods: {
    push () {
      this.$router.push('/')
      // this.$router.push({ name: 'Home' })
    }
  }
}
</script>

<style>

</style>
