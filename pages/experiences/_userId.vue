<template>
  <div>
    <h1 class="title is-4" style="padding-left:30px;">{{firstName}}'s Experiences</h1>
    <h2 class="subtitle is-5" style="padding-left:30px;">{{experiences.length}} experiences</h2>
    <div class="experiences-grid" style="margin-top:-10px;">
      <experiencecell v-for="experience in experiences" :key="experience.experienceId" :experience="experience"/>
    </div>
    <h2 class="subtitle is-5" style="padding-left:30px;margin-top:-10px;">{{submissions.length}} submissions</h2>
    <div class="experiences-grid" style="margin-top:-10px;">
      <experiencecell v-for="submission in submissions" :key="submission.submissionId" :experience="submission"/>
    </div>
  </div>
</template>

<script>
import { auth, db } from '~/plugins/firebase'
import experiencecell from '~/components/experience-cell.vue'

export default {
  data() {
    return {
      firstName: 'User', 
      experiences: [],
      submissions: []
    }
  },
  components: {
    experiencecell
  },
  methods: {
    async fetchUserExperiences() {
      const snapshot = await db.collection('experiences').where('aboutHost.hostId', '==', this.$route.params.userId).get()
      snapshot.forEach(doc => {
        this.experiences.push(doc.data())
      })
    },
    async fetchUserSubmissions() {
      const snapshot = await db.collection('submissions').where('aboutHost.hostId', '==', this.$route.params.userId).get()
      snapshot.forEach(doc => {
        this.submissions.push(doc.data())
      })
    },
    async fetchUserFullName() {
      const snapshot = await db.collection('users').doc(this.$route.params.userId).get()
      this.firstName = snapshot.data().firstName
    }
  },
  created() {
    auth.onAuthStateChanged(user => {
      if (!user) {
        this.$router.push('/')
      } else {
        this.fetchUserFullName()
        this.fetchUserExperiences()
        this.fetchUserSubmissions()
      }
    })
  }
}
</script>

<style scoped>
.experiences-grid {
  display: grid;
  grid-column-gap: 25px;
  grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
  padding: 5px 30px 30px 30px;
}
</style>
