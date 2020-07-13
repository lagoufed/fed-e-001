<template>
  <div>
    路由参数：{{ id }}

    <button @click="go"> go(-2) </button>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  props: ['id'],
  methods: {
    go () {
      this.$router.go(-2)
    }
  }
}
</script>

<style>

</style>
