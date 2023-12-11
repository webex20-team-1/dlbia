<template>
  <h1>評価とコメント</h1>
  <div class="app-container">
    <!-- アプリの詳細 -->
  </div>
  このアプリに対するフィードバックを送ってください！
  <div class="rate-container">
    <!-- 評価 -->
    <textarea
      class="rate-textbox"
      v-model="text"
      placeholder="テキストによる評価"
    ></textarea>
    <button>投稿</button>
  </div>
</template>

<script>
export default {
  name: "PostRate",
  data() {
    return {}
  },
}
</script>
