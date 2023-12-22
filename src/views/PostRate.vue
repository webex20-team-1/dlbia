<template>
  <div class="postrate">
    <h1>評価とコメント</h1>
    <div>プロダクトの感想をフィードバックとしてぜひ教えてね！</div>

    <div class="post-contents">
      <h2 class="postrate-title">App Details</h2>
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

    <h2>Your Feedbacks</h2>
    このアプリに対するフィードバックを送ってください！
    <div class="feedback-post">
      <!-- 評価 -->
      <p class="block-ttl1">良かった点</p>
      <textarea
        class="rate-textbox"
        v-model="fbtext1"
        placeholder="例文：良かった点は2つあった。クイズの内容が凝ってて答え甲斐があった。また回答後にただCSSもめちゃくちゃ書き込んでてすごい！
"
      ></textarea>
      <div class="block-ttl2">改善点</div>
      <textarea
        class="rate-textbox"
        v-model="fbtext2"
        placeholder="例文：最後の質問を正解したら何か面白い仕掛けが出るともっと楽しく使えると思いました"
      ></textarea>

      <button class="form__submit-button" v-on:click="postFeedback">
        投稿
      </button>
    </div>

    <div class="rate-container">
      <h2 class="postrate-title">Feedbacks List</h2>
      <div>Thank you for your feedbacks!</div>
      <!-- 評価一覧 -->
      <div
        class="rate-contents"
        v-for="feedback in feedbacks"
        v-bind:key="feedback.id"
      >
        <div class="rate1-title">良かった点</div>
        <div>{{ feedback.text1 }}</div>
        <div class="rate2-title">改善点</div>
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
.postrate {
  margin: 100px;
  margin-top: 150px;
}
/*App Detail*/
.postrate-title {
  margin-top: 0%;
  text-align: center;
}
.post-contents {
  margin-left: 5%;
  margin-right: 5%;
  margin-bottom: 8em;
  padding-left: 10%;
  padding-right: 10%;
  padding-bottom: 5%;
  text-align: left;
  background-color: #f7f2ec;
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

/*Your Feedbacks*/
.feedback-post {
  margin-bottom: 8em;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.block-ttl1 {
  margin-bottom: 0;
  width: 200px;
  font-weight: bold;
  color: #373834;
  font-size: 20px;
  text-align: center;
  text-decoration: underline;
  text-decoration-color: #b74e47;
  text-decoration-thickness: 4px;
}
.block-ttl2 {
  margin-top: 1rem;
  width: 200px;
  font-weight: bold;
  color: #373834;
  font-size: 20px;
  text-align: center;
  text-decoration: underline;
  text-decoration-color: #498293;
  text-decoration-thickness: 4px;
}

.rate-textbox {
  width: 70%;
  height: 60px;
  margin: 30px;
  padding: 10px;
  resize: none;
  border: none;
  background-color: #f7f2ec;
  border-radius: 10px;
}
.form__submit-button {
  width: 12rem;
  height: 60px;
  font-size: 130%;
  background: #dca45f;
  color: white;
  border: none;
  border-radius: 60px;
  text-align: center;
  font-weight: bold;
  cursor: pointer;
  border: 1.5px solid #6c6963;
  transition: all 0.3s;
}

/*Feedbacks List*/
.rate-container {
  border: none;
  background-color: #f8f5e3;
  border-radius: 20px;
  position: relative;
  margin: 3rem;
  margin-left: 0%;
  margin-right: 0%;
  padding: 2em;
  padding-left: 5%;
  padding-right: 5%;
  .rate-contents {
    border: none;
    background-color: white;
    border-radius: 10px;
    text-align: left;
    margin: 2rem;
    margin-bottom: 3rem;
    padding: 2em;
  }
  .rate1-title {
    font-size: 17px;
    color: #b74e47;
    margin-bottom: 1em;
    text-align: left;
    font-weight: bold;
    border-bottom: 2px solid #b74e47;
  }
  .rate2-title {
    font-size: 17px;
    color: #498293;
    margin-top: 2em;
    margin-bottom: 1em;
    text-align: left;
    font-weight: bold;
    border-bottom: 2px solid #498293;
  }
}
</style>
