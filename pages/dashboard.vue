<template>
  <div class="container" style="margin:20px;">
    <h1>Dashboard</h1>
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
