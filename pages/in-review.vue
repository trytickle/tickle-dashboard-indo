<template>
  <div>
    <div class="modal" :class="{ 'is-active': modalIsActive }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">{{isApproveModal ? 'Approve Submission' : 'Reject Submission'}}</p>
          <button class="delete" aria-label="close" @click="closeModal"></button>
        </header>
        <section class="modal-card-body">
          <p style="padding-bottom:10px;">
            <span class="title is-5">{{submissionTitle}}</span>
          </p>
          <p>
            This submission will be {{isApproveModal ? 'approved' : 'rejected'}}. An email will be sent to notify the host.
          </p>
          <p v-if="!isApproveModal" style="padding-top:10px;">
            <textarea class="textarea" placeholder="Reasons for rejection" v-model="rejectionNotes"></textarea>
          </p>
          <p v-if="showError" style="padding-top:20px;">
            <strong style="color:red;">{{errorMessage}}</strong>
          </p>
        </section>
        <footer class="modal-card-foot">
          <button v-if="isApproveModal" class="button is-success" :class="{'is-loading': isLoading}" @click="approveSubmission">Approve</button>
          <button v-if="isRejectModal" class="button is-danger" :class="{'is-loading': isLoading}" @click="rejectSubmission">Reject</button>
          <button class="button" @click="closeModal">Cancel</button>
        </footer>
      </div>
    </div>
    <h1 class="title is-4" style="padding-left:30px;">In Review</h1>
    <h2 class="subtitle is-5" style="padding-left:30px;">{{submissions.length}} submissions</h2>
    <div class="experiences-grid" style="margin-top:-10px;">
      <ReviewCell v-for="submission in submissions" :key="submission.submissionId" :experience="submission"/>
    </div>
  </div>
</template>

<script>
import { auth, db, host } from '~/plugins/firebase'
import ReviewCell from '~/components/review-cell.vue'

export default {
  data() {
    return {
      submissions: [],
      modalIsActive: false,
      submissionId: '',
      submissionTitle: '',
      isApproveModal: false,
      isRejectModal: false,
      isLoading: false,
      showError: false,
      errorMessage: '',
      rejectionNotes: ''
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
    },
    openModal(isApprove, isReject, submissionTitle, submissionId) {
      if (isApprove) {
        this.isApproveModal = true
        this.isRejectModal = false
      } else {
        this.isApproveModal = false
        this.isRejectModal = true
      }
      this.modalIsActive = true
      this.submissionId = submissionId
      this.submissionTitle = submissionTitle
    },
    closeModal() {
      this.modalIsActive = false
      this.showError = false
    },
    async approveSubmission() {
      this.isLoading = true
      this.showError = false
      const body = {
        submissionId: this.submissionId
      }
      try {
        await this.$axios.$post(`${host}/approveSubmission`, body)
        location.reload()
      } catch (error) {
        console.error(error)
        this.errorMessage = error.message
        this.showError = true
      }
      this.isLoading = false
    },
    async rejectSubmission() {
      this.isLoading = true
      this.showError = false
      const body = {
        submissionId: this.submissionId,
        notes: this.rejectionNotes
      }
      try {
        await this.$axios.$post(`${host}/rejectSubmission`, body)
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
    this.fetchInReviewExperiences()
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
