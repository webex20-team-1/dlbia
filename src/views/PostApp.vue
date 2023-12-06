<template>
  <div class="post-page">
    <h1>投稿</h1>

    <div class="home__wrapper">
      <div class="form__wrapper">
        <textarea
          class="form__textarea"
          v-model="text"
          placeholder="いまどうしてる？"
        />
        <div class="form__buttons">
          <button v-on:click="postTweet" class="form__submit-button">
            投稿
          </button>
        </div>
        <!--  投稿表示 -->
        <div>
          <p v-for="post in posts" :key="post.id">
            {{ post.text }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { collection, addDoc } from "firebase/firestore"
// firebase.js で db として export したものを import
import { db } from "@/firebase.js"
export default {
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
      const post = {
        text: this.text,
      }
      addDoc(collection(db, "posts"), post).then((ref) => {
        this.posts.push({
          id: ref.id,
          ...post,
        })
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
