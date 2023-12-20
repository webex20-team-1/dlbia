<template>
  <div class="home">
    <div class="title-area">
      <h1 class="titleTop">
        皆のプロダクトを <br />皆で磨きあげよう <br />愛のある評価を
      </h1>
    </div>

    <div class="container">
      <div class="setsumei">
        <h2 class="eigo">What is Homeai?</h2>
        <div class="text-about">
          GSDC後、せっかく作ったプロダクトの利用者がおらず困っていませんか？<br />GSDC後、プロダクトの改善点が分からず困っていませんか？
          <br />HomeaiはそんなGeekSalon生のためのサイトです。
        </div>
      </div>
    </div>

    <div class="setsumei">
      <h2 class="eigo">So, How to Use It?</h2>
      <div>これから段階に分けて説明しましょう</div>
      <h3 class="post-sample1">
        Step 1：アプリを投稿してあなたの作品を共有しよう！
      </h3>
      <div>
        <img
          class="postsample_img"
          src="../assets/postapp.png"
          alt="カテゴリーの紹介写真"
        />
      </div>

      <h3 class="post-sample">
        Step 2：他の人が作ったアプリを閲覧して自分のプロダクトの参考にしよう！！
      </h3>
      <h3 class="post-sample">
        Step
        3：素敵だなと思った点や、改善できる部分があればフィードバックとして共有しよう！！
      </h3>

      <div>
        <img
          class="postsample_img"
          src="../assets/Feedbackapp.png"
          alt="カテゴリーの紹介写真"
        />
      </div>

      <h3 class="post-sample">
        Step
        4：みんなからもらったフィードバックをもとに自分のプロダクトをより良いものにしよう！！
      </h3>
      <div>
        <img
          class="postsample_img"
          src="../assets/Feedbacklist.png"
          alt="カテゴリーの紹介写真"
        />
      </div>
    </div>

    <div class="improve-your-product">Improve Your Product!</div>
  </div>
</template>
<style scoped>
.home {
  margin-top: 180px;
}
.title-area {
  background-color: #e6a599;
  color: white;
  border-radius: 50px;
  margin-left: 20%;
  margin-right: 20%;
  padding-top: 2em;
  padding-bottom: 1.5em;
  height: 200px;
}

/*What's Homeai?*/
.eigo {
  margin-top: 80px;
  margin-bottom: 10px;
  color: #b74e47;
  font-size: 50px;
  border-bottom: solid #6c6963;
}
.text-about {
  border: none;
  background-color: #f7f2ec;
  border-radius: 1000px;
  position: relative;
  box-sizing: border-box;
  margin: 2rem;
  margin-left: 15%;
  margin-right: 15%;
  padding: 2em;
  padding-top: 4em;
  padding-bottom: 4em;
  padding-left: 10%;
  padding-right: 10%;
}

/*step*/
.post-sample1 {
  margin-top: 50px;
  color: #0e0e0f;
}
.post-sample {
  margin-top: 80px;
  color: #0e0e0f;
}
.postsample_img {
  width: 50%;
  border: 3px solid #6c6963;
  border-radius: 20px;
}

/*最後*/
.improve-your-product {
  margin: 50px;
  font-size: 50px;
  font-weight: bold;
  text-decoration: underline;
  text-decoration-color: #f8f5e3;
  text-decoration-thickness: 10px;
}
</style>
