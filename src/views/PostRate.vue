<template>
  <div class="postrate">
    <h1>評価とコメント</h1>

    <h2>App Detail</h2>
    <div class="app-container">
      <!-- アプリの詳細 -->
      <p class="app-title">アプリ説明</p>
      <div>{{ posts.text }}</div>
      <p class="app-title">URL</p>
      <div>{{ posts.url }}</div>
    </div>

    <h2>Your Feedback</h2>
    このアプリに対するフィードバックを送ってください！
    <div>
      <!-- 評価 -->
      <textarea
        class="rate-textbox"
        v-model="fbtext1"
        placeholder="良かった点"
      ></textarea>
      <textarea
        class="rate-textbox"
        v-model="fbtext2"
        placeholder="改善点"
      ></textarea>

      <button v-on:click="postFeedback">投稿</button>
    </div>

    <h2>Feedbacks List</h2>
    <div class="rate-container">
      <!-- 評価一覧 -->
      <div
        class="rate-contents"
        v-for="feedback in feedbacks"
        v-bind:key="feedback.id"
      >
        <div class="rate1">良かった点</div>
        <div>{{ feedback.text1 }}</div>
        <div class="rate2">改善点</div>
        <div>{{ feedback.text2 }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { collection, doc, getDoc, getDocs } from "firebase/firestore"
import { addDoc } from "firebase/firestore"
import { db } from "@/firebase.js"

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
      fbtext1: "",
      fbtext2: "",
    }
  },
  async created() {
    // $route.params.idから投稿IDを定義して宣言
    const postId = this.$route.params.id

    // Firestoreから詳細データを取得
    const docRef = doc(db, "posts", postId) // idまでの道
    const docSnap = await getDoc(docRef) // awaitは処理を待ってくれる
    // docSnapはgetDoc関数を使用してFirestoreから取得したドキュメントのスナップショット
    if (docSnap.exists()) {
      // this.postsにFirebaseのドキュメントをid指定して入れている
      this.posts = { id: postId, ...docSnap.data() }
    } else {
      console.log("No such document!")
    }

    // リプライ一覧を取得
    // feedbackRef は特定の投稿に関連付けられた "feedbacks" サブコレクションを指す
    const feedbacksRef = collection(docRef, "feedbacks")
    const feedbacksSnap = await getDocs(feedbacksRef)

    this.feedbacks = feedbacksSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
  },
  methods: {
    async postFeedback() {
      // feedbackRefがidで指定したpostsの投稿の中にfeedbacksというコレクションを指すようにする
      const feedbackRef = collection(
        doc(db, "posts", this.$route.params.id),
        "feedbacks"
      )

      const feedback = {
        text1: this.fbtext1,
        text2: this.fbtext2,
      }

      const ref = await addDoc(feedbackRef, feedback)
      this.feedbacks.push({
        id: ref.id,
        ...feedback,
      })
    },
  },
}
</script>

<style scoped>
.app-container {
  border: 3px solid lightgrey;
  text-align: left;
  margin: 2rem;
  padding: 1em;
  padding-left: 5rem;
  padding-right: 5rem;
}
.rate-container {
  border: 3px solid lightgrey;
  text-align: left;
  margin: 2rem;
  padding: 1em;
  padding-left: 5rem;
  padding-right: 5rem;
}
.app-title {
  font-weight: bold;
}
.rate-textbox {
  width: 90%;
  height: 60px;
  padding: 10px;
  line-height: 1rem;
  border-radius: 1px;
  border: none;
  resize: none;
  border: 3px solid #06c4ef;
}
.rate-contents {
  border: 3px solid lightgrey;
  text-align: center;
  margin: 2rem;
  padding: 1em;
}
.postrate {
  margin: 100px;
}
</style>
