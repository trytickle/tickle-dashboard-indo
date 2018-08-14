<template>
  <div>
    <div class="modal" :class="{ 'is-active': showTransferModal }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Transfer Experience</p>
          <button class="delete" aria-label="close" @click="closeTransferModal"></button>
        </header>
        <section class="modal-card-body">
          <p style="padding-bottom:10px;">
            <span class="title is-5">{{ transferModalTitle }}</span>
          </p>
          <p>
            Transfer to userId:
            <input class="input" type="text" placeholder="" v-model="transferUserId" style="margin-top:10px;margin-bottom:10px;">
          </p>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" :class="{'is-loading': isProcessing}" @click="transferExperience">Transfer</button>
          <button class="button" @click="closeTransferModal">Cancel</button>
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
import { auth, db } from '~/plugins/firebase'
import experiencecell from '~/components/experience-cell.vue'

export default {
  data() {
    return {
      firstName: 'User', 
      experiences: [],
      submissions: [],
      showTransferModal: false,
      transferModalTitle: 'Experience Title',
      transferModalExperienceId: '',
      transferUserId: '',
      isProcessing: false
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
      this.showTransferModal = true
      this.transferModalTitle = experienceTitle
      this.transferModalExperienceId = experienceId
    },
    closeTransferModal() {
      this.showTransferModal = false
    },
    async transferExperience() {
      const batch = db.batch()
      if (
        this.transferModalExperienceId === undefined || 
        this.transferModalExperienceId.length == 0 ||
        this.transferUserId === undefined || 
        this.transferUserId.length == 0) 
      {
        this.showTransferModal = false
        console.error("Invalid experienceId or userId")
        return
      }
      const submissionRef = db.collection('submissions').doc(this.transferModalExperienceId)
      const experienceRef = db.collection('experiences').doc(this.transferModalExperienceId)
      
      batch.update(submissionRef, {'aboutHost.hostId' : this.transferUserId})
      
      this.isProcessing = true
      const experienceDoc = await experienceRef.get()
      if (experienceDoc.exists) {
        batch.update(experienceRef,  {'aboutHost.hostId' : this.transferUserId})
      }

      batch.commit().then(() => {
         this.showTransferModal = false
         this.transferUserId = ''
         this.transferModalExperienceId = ''  
         this.isProcessing = false
         location.reload()
      })
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
