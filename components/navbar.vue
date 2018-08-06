<template>
  <nav class="navbar is-transparent" role="navigation" aria-label="main navigation">
    <div class="navbar-brand" style="margin:10px;">
      <div class="navbar-item">
        <a href="/">
          <img src="/tickleLogo.png" alt="Tickle" width="78" height="28">
        </a>
      </div>
      <div class="navbar-item" v-if="isSignedIn">
        <a class="button is-danger" href="/" @click="signout">
          <span>Sign out</span>
        </a>
        <span style="padding-left:10px;">{{ email }}</span>
      </div>
    </div>
  </nav>
</template>

<script>
import { auth } from '~/plugins/firebase'

export default {
  data() {
    return {
      isSignedIn: false,
      email: ''
    }
  },
  created() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.email = user.email
        this.isSignedIn = true
      } else {
        this.isSignedIn = false
      }
    })
  },
  methods: {
    signout() {
      auth.signOut()
    }
  }
}
</script>
