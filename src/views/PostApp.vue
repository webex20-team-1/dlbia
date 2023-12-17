<template>
  <div class="post-page">
    <h1>投稿</h1>

    <div class="home__wrapper">
      <textarea class="form__textarea1" v-model="text" placeholder="アプリ名" />
      <textarea class="form__textarea2" v-model="url" placeholder="url" />
      <textarea
        class="form__textarea3"
        v-model="explanation"
        placeholder="説明"
      />
      <div class="form__buttons">
        <button v-on:click="postTweet" class="form__submit-button">投稿</button>
      </div>
    </div>
  </div>
</template>

<script>
import { collection, addDoc } from "firebase/firestore"
// firebase.js で db として export したものを import
import { db } from "@/firebase.js"

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
    }
  },

  methods: {
    postTweet() {
      /* 変更点１ */
      addDoc(collection(db, "posts"), {
        text: this.text,
        url: this.url,
        explanation: this.explanation,
      })
    },
  },
}
</script>

<style scoped>
.post-page {
  margin: 100px;
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
  height: 60px;
  padding: 10px;
  line-height: 1rem;
  border-radius: 1px;
  border: none;
  resize: none;
  border: 3px solid #06c4ef;
}
textarea:invalid {
  background: #ef2906;
}
.form__textarea:focus {
  outline: none;
}
.form__buttons {
  display: flex;
  justify-content: flex-end;
  position: relative;
  right: 270px;
}
#overlay {
  /*要素を重ねた時の順番*/
  z-index: 1;

  /*画面全体を覆う設定*/
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);

  /*画面の中央に要素を表示させる設定*/
  display: flex;
  align-items: center;
  justify-content: center;
}
#content {
  z-index: 2;
  width: 50%;
  padding: 1em;
  background: #fff;
}
</style>
