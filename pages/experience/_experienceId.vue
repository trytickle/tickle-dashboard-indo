<template>
  <div>
    <h1 class="title">{{experienceId}}</h1>
    <h1 class="subtitle" v-if="isEditMode">Edit Mode</h1>
  </div>
</template>

<script>
import { auth, db } from '~/plugins/firebase'

export default {
  data() {
    return {
      experienceId: this.$route.params.experienceId
    }
  },
  computed: {
    isEditMode() {
      if (this.$route.query.isEditMode) {
        return this.$route.query.isEditMode
      } else {
        return false
      }
    }
  },
  created() {
    auth.onAuthStateChanged(user => {
      if (!user) {
        this.$router.push('/')
      }
    })
  }
}
</script>
