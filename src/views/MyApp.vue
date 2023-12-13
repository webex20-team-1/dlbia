<template>
  <div>
    <h1>あなたのアプリ</h1>
  </div>
  <!--  投稿表示 -->
  <div>
    <div v-for="post in posts" :key="post.id">
      {{ post.text }}
      {{ post.url }}
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
