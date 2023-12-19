<template>
  <header class="header">
    <div class="header">
      <span class="logo">Homeai</span>
    </div>
    <nav>
      <router-link to="/" class="router-link">Home</router-link> |
      <router-link to="/post-list" class="router-link"
        >アプリを評価する</router-link
      >
      |
      <router-link to="/post-page" class="router-link"
        >アプリを投稿する</router-link
      >
      |
      <router-link to="/myapp" class="router-link">My Page</router-link>
    </nav>
  </header>
</template>
<style scoped>
.header {
  display: flex;
  background-color: rgba(237, 152, 61, 0.945);
  text-align: center;
  height: 100px;
  width: 100%;
}
nav {
  display: flex;
  justify-content: end;
  width: 100%;
}
.router-link-exact-active {
  color: whitesmoke; /* アクティブなリンクの色を赤色に変更 */
}
.router-link {
  display: inline-block;
  margin-inline: 15px;
}
.logo {
  height: 50px;
}
</style>
