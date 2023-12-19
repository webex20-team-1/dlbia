<template>
  <div>
    <h1>My Page</h1>
  </div>
  <div>
    あなたの素敵な作品集 <br />みんなからのフィードバックを確認してみよう！
  </div>
  <div class="post-container">
    <!--  投稿表示 -->
    <div class="post-contents" v-for="post in userPosts" :key="post.id">
      <div class="post-appnameandurl-container">
        <!--アプリ名-->
        <div class="post-appname-container">
          <div class="post-appname">{{ post.text }}</div>
        </div>
        <!--URL-->
        <div class="post-url-container">
          <div class="post-contents-name">
            URL
            <a class="post-url" :href="post.url" target="blank">{{
              post.url
            }}</a>
          </div>
        </div>
      </div>

      <!--説明-->
      <div class="post-explanation-container">
        <div class="post-contents-name">アプリ詳細</div>
        <div class="post-explanation">{{ post.explanation }}</div>
      </div>

      <!--作成者-->
      <div class="post-authorname-container">
        <div>
          This product is made by:
          <span>{{ post.name }}</span>
        </div>
      </div>

      <router-link
        class="go-to-feedback"
        v-bind:to="{ name: 'Rate', params: { id: post.id } }"
        >Go to Feedbacks</router-link
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
.post-contents-name {
  font-size: 17px;
  color: #6c6963;
  text-align: left;
  font-weight: bold;
}
.post-appname {
  /*アプリ名*/
  font-weight: bold;
  font-size: 25px;
  padding-left: 10%;
  padding-right: 3em;
  margin-bottom: 1em;
  text-align: left;
  flex-grow: 2;
  white-space: nowrap; /*空白部分の文字列を折り返さない*/
}
.post-explanation {
  margin: 0.5em;
}
</style>
