<template>
  <div class="home__wrapper">
    <post-app />
  </div>
</template>

<script>
import PostApp from "@/components/Modules/PostApp.vue"
export default {
  components: { PostApp },
}
</script>

<style scoped>
.home__wrapper {
  margin: 0 auto;
  max-width: 600px;
  background-color: #ccc;
}
</style>
