<template>
    <index-contain></index-contain>
</template>

<script>
export default {
  name: "index",
  components: {
    indexContain: resolve => require(["./contain"],resolve)

  }
}
</script>

<style scoped>

</style>
