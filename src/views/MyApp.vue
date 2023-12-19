<template>
  <div>
    <h1>あなたのアプリ</h1>
  </div>
  <div class="post-container">
    <!--  投稿表示 -->
    <div class="post-contents" v-for="post in userPosts" :key="post.id">
      <div class="post-contents-name">Name</div>
      <div>{{ post.name }}</div>
      <div class="post-contents-name">アプリ名</div>
      <div>{{ post.text }}</div>
      <div class="post-contents-name">URL</div>
      <a :href="post.url" target="blank">{{ post.url }}</a>
      <div class="post-contents-name">説明</div>
      <div>{{ post.explanation }}</div>
      <router-link v-bind:to="{ name: 'Rate', params: { id: post.id } }"
        >Read more</router-link
      >
    </div>
  </div>
</template>

<script>
import { collection, getDocs, where, query } from "firebase/firestore"
import { db } from "@/firebase.js"
import { getAuth } from "firebase/auth"

export default {
  data() {
    return {
      userPosts: [],
    }
  },
  created() {
    const auth = getAuth()
    const user = auth.currentUser

    if (user) {
      const postsQuery = query(
        collection(db, "posts"),
        where("userid", "==", user.uid)
      )

      getDocs(postsQuery).then((snapshot) => {
        snapshot.forEach((doc) => {
          this.userPosts.push({
            id: doc.id,
            ...doc.data(),
          })
        })
      })
    } else {
      // ユーザーがログインしていない場合
      this.$router.push("/signin")
    }
  },
}
</script>

<style scoped>
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
