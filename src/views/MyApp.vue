<template>
  <div>
    <h1>あなたのアプリ</h1>
  </div>
  <div class="post-container">
    <!--  投稿表示 -->
    <div class="post-contents" v-for="post in userPosts" :key="post.userid">
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
import { collection, getDocs, where, query } from "firebase/firestore"
import { db, auth } from "@/firebase.js"

export default {
  data() {
    return {
      userPosts: [],
    }
  },
  created() {
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
