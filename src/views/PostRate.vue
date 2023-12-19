<template>
  <div class="postrate">
    <h1>評価とコメント</h1>

    <h2>App Details</h2>
    <div class="post-contents">
      <!-- アプリの詳細 -->
      <p class="post-contents-name1">アプリ名</p>
      <div class="post-appname">{{ posts.text }}</div>
      <p class="post-contents-name">URL</p>
      <a class="post-url" :href="posts.url" target="blank">{{ posts.url }}</a>
      <p class="post-contents-name">アプリ詳細</p>
      <div class="post-explanation">{{ posts.explanation }}</div>
      <p class="post-contents-name">作成者</p>
      <div class="post-author">{{ posts.name }}</div>
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
      // 投稿した id を得るために ref で受ける
      const ref = await addDoc(feedbackRef, feedback)
      // this.feedbacks に追加する (これで表示できる)
      this.feedbacks.push({
        id: ref.id,
        ...feedback,
      })
    },
  },
}
</script>

<style scoped>
/*App Detail*/
.post-contents {
  margin-left: 0%;
  margin-right: 0%;
  padding-left: 10%;
  padding-right: 10%;
  text-align: left;
  .post-contents-name1 {
    font-size: 17px;
    color: #6c6963;
    margin-bottom: 1em;
    text-align: left;
    font-weight: bold;
    border-bottom: 2px solid #6c6963;
  }
  .post-contents-name {
    font-size: 17px;
    color: #6c6963;
    margin-top: 4em;
    margin-bottom: 1em;
    text-align: left;
    font-weight: bold;
    border-bottom: 2px solid #6c6963;
  }
  .post-appname {
    /*アプリ名*/
    font-weight: bold;
    font-size: 25px;
    margin-left: 10%;
    margin-right: 10%;
    margin-bottom: 1em;
    white-space: nowrap; /*空白部分の文字列を折り返さない*/
  }
  .post-url {
    font-weight: bold;
    color: #b74e47;
    margin-left: 10%;
    margin-right: 10%;
  }
  .post-explanation {
    margin: 1em;
    margin-left: 10%;
    margin-right: 10%;
    text-align: left;
  }
  .post-author {
    margin-left: 10%;
    margin-right: 10%;
  }
}

/*Feedbacks List*/
.rate-container {
  border: 3px solid lightgrey;
  text-align: left;
  margin: 2rem;
  padding: 1em;
  padding-left: 5rem;
  padding-right: 5rem;
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
