<template>
  <header class="header">
    <div></div>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/post-link">みんなの投稿</router-link>
      <router-link to="/">投稿する</router-link>
      <router-link to="/mypage">My Page</router-link>
    </nav>
  </header>
</template>
<style scoped>
.header {
  display: flex;
}
</style>
