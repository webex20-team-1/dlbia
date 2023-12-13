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
        <button v-on:click="postTweet, showModal()" class="form__submit-button">
          投稿
        </button>
        <modal :message="message" v-show="modal"></modal>
      </div>
    </div>
  </div>
</template>

<script>
import { collection, addDoc } from "firebase/firestore"
// firebase.js で db として export したものを import
import { db } from "@/firebase.js"
import Modal from "./Modal.vue"
export default {
  name: "HelloWorld",
  components: {
    Modal,
  },
  data() {
    return {
      posts: [
        // {
        //   id: "0GwoGZuhTNhqHQDBeiVW",
        //   text: "こんにちは、ツイートの本文です。"
        // }
      ],
      message: "よろしいですか？",
      modal: false,
    }
  },
  props: {
    msg: String,
  },
  methods: {
    showModal() {
      // モーダル表示する際の処理が必要ならここに書く
      this.modal = true
    },
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
.home__wrapper {
  margin: 0 auto;
  max-width: 600px;
  line-height: 50px;
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
</style>
