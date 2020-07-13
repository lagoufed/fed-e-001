<template>
  <div class="home">
    <div id="nav">
      <router-link to="/">Index</router-link>
    </div>
    <button @click="replace"> replace </button>

    <button @click="goDetail"> Detail </button>
  </div>
</template>

<script>
export default {
  name: 'Index',
  methods: {
    replace () {
      this.$router.replace('/login')
    },
    goDetail () {
      this.$router.push({ name: 'Detail', params: { id: 1 } })
    }
  }
}
</script>
