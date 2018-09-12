<template>
  <div class="container" style="padding:20px;max-width:640px;margin:auto;">
    <p class="title is-3">Update Story</p>
    <p class="subtitle is-5">Temp UI for updating a story in Firestore</p>

    <div class="field">
      <label class="label">storyId</label>
      <div class="control">
        <input class="input" type="text" placeholder="" v-model="storyId">
      </div>
    </div>

    <hr/>

    <div class="field">
      <label class="label">Body</label>
      <div class="control">
        <textarea class="textarea" style="height:400px;" placeholder="" v-model="body"></textarea>
      </div>
    </div>

    <hr/>

    <div class="field" v-if="showError">
      <p class="help is-danger">{{ errorMessage }}</p>
    </div>

    <hr v-if="showError"/>

    <div class="field" style="padding-bottom:50px;">
      <div class="control">
        <button class="button is-link" :class="{'is-loading': isLoading}" @click="updateStory">Update</button>
      </div>
    </div>

  </div>
</template>

<script>
import { auth, db } from '~/plugins/firebase'

export default {
  data() {
    return {
      storyId: null,
      body: null,
      isLoading: false,
      showError: false,
      errorMessage: null
    }
  },
  methods: {
    async updateStory() {
      this.showError = false
      this.isLoading = true

      if (this.storyId != null && this.body != null && this.body.trim().length > 0) {
        try {
          await db.collection('stories').doc(this.storyId).update({
            body: this.body
          })
        } catch (error) {
          this.errorMessage = error.message
          this.showError = true
        }
      }
      this.isLoading = false
    }
  },
  created() {
    auth.onAuthStateChanged(user => {
      this.userId = user.uid
      if (!user) {
        this.$router.push('/')
      }
    })
  }
}
</script>

<style scoped>
.subtitle-grid {
  display: grid;
  grid-row-gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}
.minage-grid {
  display: grid;
  grid-row-gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
}
.guestcount-grid {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}
</style>
