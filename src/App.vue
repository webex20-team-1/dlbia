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
  <div class="app">
    <button v-on:click="postTweet">ツイート</button>
    <div>
      <p v-for="tweet in tweets" :key="tweet.id">
        {{ tweet.text }}
      </p>
    </div>
  </div>
  <Footer></Footer>
</template>
<script>
import { collection, addDoc } from "firebase/firestore"
// firebase.js で db として export したものを import
import { db } from "./firebase"
import Header from "@/components/MainHeader.vue"
import Footer from "@/components/MainFooter.vue"

export default {
  data() {
    return {
      /* 変更点２ */
      tweets: [
        // {
        //   id: "0GwoGZuhTNhqHQDBeiVW",
        //   text: "こんにちは、ツイートの本文です。"
        // }
      ],
    }
  },
  methods: {
    postTweet() {
      /* 変更点１ */
      const tweet = {
        text: "こんにちは、ツイートの本文です。",
      }
      addDoc(collection(db, "tweets"), tweet).then((ref) => {
        this.tweets.push({
          id: ref.id,
          ...tweet,
        })
      })
    },
  },
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
