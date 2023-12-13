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
          <button
            v-on:click="postTweet, showModal()"
            class="form__submit-button"
          >
            投稿
          </button>
          <modal :message="message" v-show="modal"></modal>
        </div>
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
