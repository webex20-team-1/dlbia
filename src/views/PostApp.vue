<template>
  <div class="post-page">
    <h1>投稿</h1>

    <div class="home__wrapper">
      <div class="form__wrapper">
        <textarea
          class="form__textarea"
          v-model="text"
          placeholder="アプリ名"
        />
        <textarea class="form__textarea" v-model="url" placeholder="url" />
        <div class="form__buttons">
          <button v-on:click="postApp" class="form__submit-button">投稿</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { collection, addDoc } from "firebase/firestore"
// firebase.js で db として export したものを import
import { db } from "@/firebase.js"
import { getAuth, onAuthStateChanged } from "firebase/auth"

export default {
  data() {
    return {
      posts: [
        // {
        //   id: "0GwoGZuhTNhqHQDBeiVW",
        //   text: "こんにちは、ツイートの本文です。"
        // }
      ],
      text: "",
      url: "",
    }
  },
  methods: {
    postApp() {
      // Firebaseのユーザー状態の変更を監視
      const auth = getAuth() // getAuthメソッドを使用してauthモジュールを取得

      onAuthStateChanged(auth, (user) => {
        if (user) {
          // ユーザーがログインしている場合
          addDoc(collection(db, "posts"), {
            text: this.text,
            url: this.url,
            userid: user.uid,
          })
          this.$router.push("/post-list") // ログイン後のページにリダイレクト
        } else {
          // ユーザーがログインしていない場合
          this.$router.push("/signin") // ログインページにリダイレクト
        }
      })
    },
  },
}
</script>

<style scoped>
.home__wrapper {
  margin: 0 auto;
  max-width: 600px;
  background-color: #ccc;
}
.form__wrapper {
  padding: 1rem;
}
.form__textarea {
  width: 100%;
  height: calc(1.3rem * 3 + 0.5rem * 2);
  padding: 0.5rem;
  line-height: 1.3rem;
  border-radius: 5px;
  border: none;
  resize: none;
}
.form__textarea:focus {
  outline: none;
}
.form__buttons {
  display: flex;
  justify-content: flex-end;
}
</style>
