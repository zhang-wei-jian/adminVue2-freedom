<template>
  <div>
    我是角色管理i
    <button @click="clickHandle">点击送地狱火</button>
  </div>
</template>

<script>
export default {
  name: '',
  mounted() {
    // console.log(this.$router.options)
    // console.log(this.$store.state.user.routers, 'router');

  },
  methods: {
    clickHandle() {
      // router.addRoutes([...activeRoutes, ...constantRoutes])
      // this.$router.addRoutes({ name: 'sb' })
      // console.log(this.$router.options)
    }
  },
}
</script>

<style lang="less" scoped>
</style>
