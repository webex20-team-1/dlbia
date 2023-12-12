<template>
  <div>
    <h1>評価とコメント</h1>
    <div class="app-container">
      <div>アプリの詳細：{{ posts.text }}</div>
      <div>アプリのURL：{{ posts.url }}</div>
      <!-- アプリの詳細 -->
    </div>
    このアプリに対するフィードバックを送ってください！
    <div class="rate-container">
      <!-- 評価 -->
      <div v-for="feedback in feedbacks" v-bind:key="feedback.id">
        {{ feedback.text }}
      </div>
      <textarea
        class="rate-textbox"
        v-model="fbtext"
        placeholder="テキストによる評価"
      ></textarea>
      <button v-on:click="postFeedback">投稿</button>
    </div>
  </div>
</template>

<script>
import { doc, getDoc } from "firebase/firestore"
import { addDoc } from "firebase/firestore"
import { db } from "@/firebase.js"

// feedbackRef は特定の投稿に関連付けられた "feedbacks" サブコレクションを指す
const feedbackRef = doc(db, "posts", "postId", "feedbacks")

export default {
  data() {
    return {
      posts: {
        // {
        //   id: "0GwoGZuhTNhqHQDBeiVW",
        //   text: "こんにちは、ツイートの本文です。"
        // }
      },
      feedbacks: [
        // {
        //   id: "0GwoGZuhTNhqHQDBeiVW",
        //   text: "こんにちは、ツイートの本文です。"
        //   text,time,useridなど？
        // }
      ],
    }
  },
  async created() {
    // $route.params.idから投稿IDを定義して宣言
    const postId = this.$route.params.id
    // Firestoreから詳細データを取得
    const docRef = doc(db, "posts", postId) // idまでの道
    const docSnap = await getDoc(docRef) // awaitは処理を待ってくれる
    // getDoc 関数を使用してFirestoreから取得したドキュメントのスナップショット（snapshot）
    if (docSnap.exists()) {
      // this.postsにFirebaseのドキュメントをid指定して入れている
      this.posts = { id: postId, ...docSnap.data() }
    } else {
      console.log("No such document!")
    }
  },
  methods: {
    postFeedback() {
      addDoc(feedbackRef, {
        text: this.fbtext,
      })
    },
  },
}
</script>
