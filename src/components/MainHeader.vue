<template>
  <header class="header">
    <div class="logo">
      <img src="../assets/logo.png" alt="COVID-LOG" />
    </div>
    <nav>
      <router-link to="/" class="router-link">Home</router-link> |
      <router-link to="/post-list" class="router-link"
        >みんなの投稿</router-link
      >
      |
      <router-link to="/post-page" class="router-link">投稿する</router-link> |
      <router-link to="/mypage" class="router-link">My Page</router-link>
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
#nav a.router-link-exact-active {
  color: #b98942;
}
.router-link {
  display: inline-block;
}
.logo {
  height: 50px;
}
</style>
