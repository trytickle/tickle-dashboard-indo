<template>
  <div class="container" style="margin:20px;">
    <nuxt-link class="button" to="/create-experience">Create Experience</nuxt-link>
  </div>
</template>

<script>
import { auth } from '~/plugins/firebase'

export default {
  data() {
    return {
      title: ''
    }
  },
  created() {
    auth.onAuthStateChanged(user => {
      if (!user) {
        this.$router.replace('/')
      }
    })
  }
}
</script>
