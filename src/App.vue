<template>
  <Header></Header>
  <div>
    <div>
      <router-link to="/">Home</router-link> |
      <router-link to="/post-page">投稿する</router-link> |
      <router-link to="/post-list">みんなの投稿</router-link> |
      <router-link to="/mypage">Mypage</router-link>
    </div>
    <router-view />
  </div>

  <Footer></Footer>
</template>
<script>
import Header from "@/components/MainHeader.vue"
import Footer from "@/components/MainFooter.vue"

export default {
  components: {
    Header,
    Footer,
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
