<template>
  <div>
    <h1>My Page</h1>
  </div>
  <div>
    <button v-on:click="signIn">サインインする</button>
  </div>
</template>

<script>
import { getAuth, signInWithRedirect, GoogleAuthProvider } from "firebase/auth"
export default {
  methods: {
    signIn: async function () {
      // 以下の Firebase に関するコードは、公式ドキュメントをコピペしただけ
      const auth = getAuth()
      const provider = new GoogleAuthProvider()
      await signInWithRedirect(auth, provider)
      this.$router.push("/login")
    },
  },
}
</script>
