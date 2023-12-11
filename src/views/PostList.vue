<template>
  <div>
    <h1>みんなの投稿</h1>
  </div>
  <!--  投稿表示 -->
  <div class="post-container">
    <div class="post-contents" v-for="post in posts" :key="post.id">
      <div class="post-contents-name">Name</div>
      <div>{{ post.text }}</div>
      <div class="post-contents-name">URL</div>
      <div>{{ post.url }}</div>
      <router-link v-bind:to="{ name: 'Rate', params: { id: post.id } }"
        >Read more</router-link
      >
    </div>
  </div>
</template>

<script>
import { collection, getDocs } from "firebase/firestore"
// firebase.js で db として export したものを import
import { db } from "@/firebase.js"
export default {
  data() {
    return {
      posts: [
        // {
        //   id: "0GwoGZuhTNhqHQDBeiVW",
        //   text: "こんにちは、ツイートの本文です。"
        // }
      ],
    }
  },
  created() {
    getDocs(collection(db, "posts")).then((snapshot) => {
      snapshot.forEach((doc) => {
        this.posts.push({
          id: doc.id,
          ...doc.data(),
        })
      })
    })
  },
}
</script>

<style scoped>
.post-container {
}
.post-contents {
  border: 3px solid lightgrey;
  text-align: center;
  margin: 2rem;
  padding: 1em;
}
.post-contents-name {
  text-align: left;
}
</style>
