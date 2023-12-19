<template>
  <div class="post-page">
    <h1>投稿</h1>

    <div class="home__wrapper">
      <div class="form__wrapper">
        <textarea class="form__textarea1" v-model="name" placeholder="お名前" />
        <textarea
          class="form__textarea1"
          v-model="text"
          placeholder="アプリ名"
        />
        <textarea class="form__textarea2" v-model="url" placeholder="url" />
        <textarea
          class="form__textarea3"
          v-model="explanation"
          placeholder="説明"
        />
        <div class="form__buttons">
          <button v-on:click="postApp" class="form__submit-button">投稿</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
// firebase.js で db として export したものを import
import { db } from "@/firebase.js"
import { getAuth, onAuthStateChanged } from "firebase/auth"

export default {
  name: "HelloWorld",

  data() {
    return {
      posts: [
        // {
        //   id: "0GwoGZuhTNhqHQDBeiVW",
        //   text: "こんにちは、ツイートの本文です。"
        // }
      ],
      name: "",
      text: "",
      url: "",
      explanation: "",
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
            name: this.name,
            text: this.text,
            url: this.url,
            explanation: this.explanation,
            userid: user.uid,
            createdAt: serverTimestamp(),
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
.post-page {
  margin: 100px;
  width: 100%;
}
.home__wrapper {
  margin: 0 auto;
  max-width: 600px;
  line-height: 50px;
  position: relative;
  top: 30px;
}

.form__textarea1 {
  width: 90%;
  height: 20px;
  padding: 10px;
  line-height: 1.3rem;
  border-radius: 1px;
  border: none;
  resize: none;
  border: 3px solid #06c4ef;
}
.form__textarea2 {
  width: 90%;
  height: 20px;
  padding: 10px;
  line-height: 1.3rem;
  border-radius: 1px;
  border: none;
  resize: none;
  border: 3px solid #06c4ef;
}
.form__textarea3 {
  width: 90%;
  border: none;
  background-color: #f7f2ec;
  border-radius: 20px;

  padding: 10px;
}
textarea:invalid {
  background: #ef2906;
}
.form__textarea:focus {
  outline: none;
}

.form__buttons {
  display: flex;
  justify-content: center;
}

.form__submit-button {
  width: 80%;
  height: 60px;
  font-size: 150%;
  right: 270px;
  background: #00adb5;
  color: #fff;
  border-radius: 50px;
  font-weight: normal;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
}
</style>
