<template>
  <div>
    <h1>ログイン画面</h1>
  </div>
  <h3>ようこそ、表示名を登録してください</h3>
  <div>
    <input type="text" v-model="name" />
  </div>
  <button v-on:click="two">登録</button>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { db } from "@/firebase.js"

export default {
  data() {
    return {
      name: "",
    }
  },
  methods: {
    two() {
      this.createFirestore()
    },
    createFirestore() {
      const auth = getAuth()
      onAuthStateChanged(auth, async (user) => {
        // 未ログイン時
        if (!user) {
          // topに飛ばしてログインさせる
          this.$router.push("/signin")
        }
        // ログイン時
        else {
          const uid = user.uid
          // ログイン済みのユーザー情報があるかをチェック
          //usersコレクションで確認している
          const docRef = doc(db, "users", uid)
          // サブコレ const mypageRef = doc(db, "users", uid, "mypage")
          const userDoc = await getDoc(docRef)
          if (!userDoc.exists()) {
            // Firestore にユーザー用のドキュメントが作られていなければ作る
            await setDoc(docRef, {
              //usersコレクションにユーザーID名のドキュメントを作る
              userId: uid,
              nickname: this.name,
            })
            this.$router.push("/myapp")
          }
        }
      })
    },
  },
}
</script>
