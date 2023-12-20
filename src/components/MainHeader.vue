<template>
  <header class="header">
    <div class="logo" @click="backHome">
      <img src="../assets/homeai_logo3.png" alt="COVID-LOG" />
    </div>
    <nav>
      <router-link to="/" class="router-link">ホーム</router-link> |
      <router-link to="/post-list" class="router-link"
        >アプリを評価する</router-link
      >
      |
      <router-link to="/post-page" class="router-link"
        >アプリを投稿する</router-link
      >
      |
      <router-link to="/myapp" class="router-link">マイページ</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  methods: {
    backHome() {
      this.$router.push("/")
    },
  },
}
</script>

<style scoped>
.header {
  display: flex;
  background-color: rgba(237, 152, 61, 0.945);
  text-align: center;
  height: 100px;
  padding-top: 6px;
  width: 100%;
  position: fixed;
  z-index: 9999;
  top: 0px;
  left: 0px;
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
  display: inline-block;
  cursor: pointer;
}
.logo img {
  height: 150px;
}
</style>
