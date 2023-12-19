<template>
  <div>
    <h1>みんなの投稿</h1>
  </div>
  <div>
    みんなの作品集！URLに飛んでアプリを閲覧できるよ！
    <br />閲覧後はぜひフィードバックを送って感動を共有してね～
  </div>

  <!--  投稿表示 -->
  <div class="post-container">
    <div class="post-contents" v-for="post in posts" :key="post.id">
      <div class="post-appnameandurl-container">
        <!--アプリ名-->
        <div class="post-appname-container">
          <div class="post-appname">{{ post.text }}</div>
        </div>
        <!--URL-->
        <div class="post-url-container">
          <div class="post-contents-name">
            URL
            <a class="post-url" :href="post.url" target="blank">{{
              post.url
            }}</a>
          </div>
        </div>
      </div>

      <!--説明-->
      <div class="post-explanation-container">
        <div class="post-contents-name">アプリ詳細</div>
        <div class="post-explanation">{{ post.explanation }}</div>
      </div>

      <!--作成者-->
      <div class="post-authorname-container">
        <div>
          This product is made by:
          <span>{{ post.name }}</span>
        </div>
      </div>

      <router-link
        class="go-to-feedback"
        v-bind:to="{ name: 'Rate', params: { id: post.id } }"
        >Go to Feedback</router-link
      >
    </div>
  </div>
</template>

<script>
import { collection, getDocs, query, orderBy } from "firebase/firestore"
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
  created() {
    const sampleRef = collection(db, "posts")
    const q = query(sampleRef, orderBy("createdAt", "desc"))
    getDocs(q).then((snapshot) => {
      snapshot.forEach((doc) => {
        this.posts.push({
          id: doc.id,
          ...doc.data(),
        })
      })
    })
  },
}
</script>

<style>
.post-contents {
  border: none;
  background-color: #f7f2ec;
  border-radius: 20px;
  position: relative;
  box-sizing: border-box;
  margin: 3rem;
  margin-bottom: 5rem;
  margin-left: 15%;
  margin-right: 15%;
  padding: 2em;
  padding-top: 3em;
  padding-bottom: 3em;
  padding-left: 5%;
  padding-right: 5%;
  .post-contents-name {
    font-size: 17px;
    color: #6c6963;
    text-align: left;
    font-weight: bold;
  }
  .post-appnameandurl-container {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    border-bottom: 2px solid #373834; /*ボーダーライン*/
    .post-appname {
      /*アプリ名*/
      font-weight: bold;
      font-size: 25px;
      padding-left: 10%;
      padding-right: 3em;
      margin-bottom: 1em;
      text-align: left;
      flex-grow: 2;
      white-space: nowrap; /*空白部分の文字列を折り返さない*/
    }
    .post-url-container {
      position: absolute; /*親要素に対して絶対的な位置関係*/
      left: 40%;
      right: 5%;
      padding-left: 3em;
      padding-right: 1em;
      margin-top: 2em;
      margin-bottom: 1em;
      flex-grow: 3;
      .post-url {
        color: #b74e47;
        padding-left: 1em;
      }
    }
  }
  .post-explanation-container {
    margin-top: 1em;
    margin-bottom: 1em;
    text-align: left;
    .post-explanation {
      margin: 1em;
      margin-left: 10%;
      margin-right: 10%;
    }
  }
  .post-authorname-container {
    color: #6c6963;
    text-align: right;
    margin: 1em;
  }
  .go-to-feedback {
    color: #b74e47;
    font-size: 18px;
    font-weight: bold;
  }
}
</style>
