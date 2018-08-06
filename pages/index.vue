<template>
  <section class="container box" style="max-width:350px;margin-top:20px;">
    <div class="field">
      <input class="input" type="email" placeholder="Email" v-model="email">
    </div>
    <div class="field">
      <input class="input" type="password" placeholder="Password" v-model="password">
    </div>
    <div class="field" v-if="showError">
      <p class="help is-danger">{{ errorMessage }}</p>
    </div>
    <div class="field">
      <p class="control" v-if="isLoading">
        <button class="button is-info is-loading" @click="login">
          Login
        </button>
      </p>
      <p class="control" v-else>
        <button class="button is-info" @click="login">
          Login
        </button>
      </p>
    </div>
  </section>
</template>

<script>
import { db, auth } from '~/plugins/firebase'

export default {
  data() {
    return {
      email: '',
      password: '',
      showError: false,
      errorMessage: 'This is an error message',
      isLoading: false
    }
  },
  methods: {
    async login() {
      try {
        this.showError = false
        this.isLoading = true
        const { user } = await auth.signInWithEmailAndPassword(this.email, this.password)
        if (user) {
          this.$router.push('/dashboard')
        }
      } catch (error) {
        this.showError = true
        this.errorMessage = error.message
      }
      this.isLoading = false
    }
  },
  created() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.$router.push('/dashboard')
      }
    })
  }
}
</script>
