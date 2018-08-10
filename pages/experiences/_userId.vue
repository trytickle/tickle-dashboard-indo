<template>
  <div class="container" style="margin:20px;">
    <h1 class="title is-4" style="padding:10px;">{{firstName}}'s Experiences</h1>
    <h2 class="subtitle is-5" style="padding-left:10px;">{{experiences.length}} experiences</h2>
    <div class="columns">
      <div class="column">
        <experiencecell v-for="experience in experiences" :key="experience.experienceId" :experience="experience"/>
      </div>
      <div class="column">

      </div>
    </div>
    <h2 class="subtitle is-5" style="padding-left:10px;">{{submissions.length}} submissions</h2>
    <div class="columns">
      <div class="column">
        <experiencecell v-for="submission in submissions" :key="submission.submissionId" :experience="submission"/>
      </div>
      <div class="column">

      </div>
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
        this.$router.replace('/')
      } else {
        this.fetchUserFullName()
        this.fetchUserExperiences()
        this.fetchUserSubmissions()
      }
    })
  }
}
</script>
