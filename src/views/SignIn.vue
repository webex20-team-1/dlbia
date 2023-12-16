<template>
  <div>
    <h1>My Page</h1>
  </div>
  <div>
    <button v-on:click="signIn">サインインする</button>
  </div>
</template>

<script>
import {
  getAuth,
  signInWithRedirect,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth"
export default {
  methods: {
    signIn: async function () {
      const auth = getAuth()
      const provider = new GoogleAuthProvider()
      await signInWithRedirect(auth, provider)
    },
  },
  // 以下を追加
  created: function () {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.$router.push("/myapp")
      }
    })
  },
}
</script>
