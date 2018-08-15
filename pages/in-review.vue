<template>
  <div>
    <h1 class="title is-4" style="padding-left:30px;">In Review</h1>
    <h2 class="subtitle is-5" style="padding-left:30px;">{{submissions.length}} submissions</h2>
    <div class="experiences-grid" style="margin-top:-10px;">
      <ReviewCell v-for="submission in submissions" :key="submission.submissionId" :experience="submission"/>
    </div>
  </div>
</template>

<script>
import { auth, db } from '~/plugins/firebase'
import ReviewCell from '~/components/review-cell.vue'

export default {
  data() {
    return {
      submissions: []
    }
  },
  components: {
    ReviewCell
  },
  methods: {
    async fetchInReviewExperiences() {
      const snapshot = await db.collection('submissions').where('status.inReview', '==', true).get()
      snapshot.forEach(doc => {
        this.submissions.push(doc.data())
      })
    }
  },
  created() {
    auth.onAuthStateChanged(user => {
      if (!user) {
        this.$router.push('/')
      } else {
        this.fetchInReviewExperiences()
      }
    })
  }
}
</script>

<style scoped>
.experiences-grid {
  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
  padding: 5px 30px 30px 30px;
}
</style>
