<template>
  <div>
    <div class="modal" :class="{ 'is-active': showModal }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">{{modalTitle}}</p>
          <button class="delete" aria-label="close" @click="closeModal"></button>
        </header>
        <section class="modal-card-body">
          <p style="padding-bottom:10px;">
            <span class="title is-5">{{experienceTitle}}</span>
          </p>
          <p v-if="!submissionId">
            Transfer to userId:
            <input class="input" type="text" placeholder="" v-model="transferUserId" style="margin-top:10px;margin-bottom:10px;">
          </p>
          <p v-if="submissionId">
            Please make sure you're happy with all the photos, words and settings you're submitting for review. If you want to edit your experience after it has gone live, you'll need to resubmit it for review again.
          </p>
        </section>
        <footer class="modal-card-foot">
          <button v-if="!submissionId" class="button is-info" :class="{'is-loading': isLoading}" @click="transferExperience">Transfer</button>
          <button v-if="submissionId" class="button is-success" :class="{'is-loading': isLoading}" @click="submitForReview">Submit</button>
          <button class="button" @click="closeModal">Cancel</button>
        </footer>
      </div>
    </div>
    <h1 class="title is-4" style="padding-left:30px;">{{firstName}}'s Experiences</h1>
    <h2 class="subtitle is-5" style="padding-left:30px;">{{experiences.length}} experiences</h2>
    <div class="experiences-grid" style="margin-top:-10px;">
      <experiencecell v-for="experience in experiences" :key="experience.experienceId" :experience="experience"/>
    </div>
    <h2 class="subtitle is-5" style="padding-left:30px;">{{submissions.length}} submissions</h2>
    <div class="experiences-grid" style="margin-top:-10px;">
      <experiencecell v-for="submission in submissions" :key="submission.submissionId" :experience="submission"/>
    </div>
  </div>
</template>

<script>
import { auth, db, host } from '~/plugins/firebase'
import experiencecell from '~/components/experience-cell.vue'

export default {
  data() {
    return {
      firstName: 'User', 
      experiences: [],
      submissions: [],
      showModal: false,
      modalTitle: '',
      experienceTitle: '',
      transferExperienceId: null,
      transferUserId: null,
      submissionId: null,
      isLoading: false
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
    },
    showTransfer(experienceTitle, experienceId) {
      this.experienceTitle = experienceTitle
      this.transferExperienceId = experienceId
      this.submissionId = null
      this.modalTitle = 'Transfer Experience'
      this.showModal = true
    },
    showReview(submissionTitle, submissionId) {
      this.experienceTitle = submissionTitle
      this.submissionId = submissionId
      this.transferExperienceId = null
      this.modalTitle = 'Submit For Review'
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
    },
    async transferExperience() {
      const batch = db.batch()
      if (
        this.transferExperienceId === undefined || 
        this.transferExperienceId.length == 0 ||
        this.transferUserId === undefined || 
        this.transferUserId.length == 0) 
      {
        this.showModal = false
        console.error("Invalid experienceId or userId")
        return
      }
      const submissionRef = db.collection('submissions').doc(this.transferExperienceId)
      const experienceRef = db.collection('experiences').doc(this.transferExperienceId)
      
      batch.update(submissionRef, {'aboutHost.hostId' : this.transferUserId})
      
      this.isLoading = true
      const experienceDoc = await experienceRef.get()
      if (experienceDoc.exists) {
        batch.update(experienceRef,  {'aboutHost.hostId' : this.transferUserId})
      }

      batch.commit().then(() => {
         this.showTransferModal = false
         this.transferUserId = null
         this.transferExperienceId = null 
         this.isLoading = false
         location.reload()
      })
    },
    async submitForReview() {
      this.showError = false
      this.isLoading = true;
      const submissionDoc = await db.collection('submissions').doc(this.submissionId).get();
      const submissionData = submissionDoc.data();
      const userDoc = await db.collection('users').doc(submissionData.aboutHost.hostId).get();
      const userData = userDoc.data();
      const body = {
        submissionId: this.submissionId,
        submissionData: submissionData,
        firstName: this.firstName,
        email: userData.email
      }
      try {
        await this.$axios.$post(`${host}/sendSubmissionInReviewEmail`, body)
        location.reload()
      } catch (error) {
        console.error(error)
        this.errorMessage = error.message
        this.showError = true
      }
      this.isLoading = false
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
  grid-gap: 25px;
  grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
  padding: 5px 30px 30px 30px;
}
</style>
