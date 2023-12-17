<template>
  <Header></Header>
  <router-view></router-view>

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
  color: #0e0e0e;
}
.header {
  position: relative;
  margin: 0 auto;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #0b0a0a;
}

nav a.router-link-exact-active {
  color: #42b983;
  position: relative;
}
</style>
