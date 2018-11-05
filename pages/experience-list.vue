<template>
  <div class="container">
    <div style="text-align:center;">
      <h1 class="title is-3">Experience List({{this.totalCount}})</h1>
       <h2 class="title is-3" v-if="this.isLoading">Loading...</h2>
      <div>
        Host Stripe Connected:
        <select v-model="stripeFilter" v-on:change="onStripeFilterChange" style="margin-right:20px;">
          <option value="1">Yes</option>
          <option value="0">No</option>
        </select>
        Host Booking Dates Added:
        <select v-model="dateFilter" v-on:change="onDateFilterChange">
          <option value="1">Yes</option>
          <option value="0">No</option>
        </select>
      </div>
    </div>
    <div class="modal" :class="{ 'is-active': showModal }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Transfer Experience</p>
          <button class="delete" aria-label="close" @click="closeModal"></button>
        </header>
        <section class="modal-card-body">
          <p style="padding-bottom:10px;">
            <span class="title is-5">{{this.currentSubmissionTitle}}</span>
          </p>
          <p v-if="this.currentSubmissionId">
            Transfer to userId:
            <input class="input" type="text" placeholder="" v-model="transferUserId" style="margin-top:10px;margin-bottom:10px;">
          </p>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-info" :class="{'is-loading': isLoading}" @click="transferExperience">Transfer</button>
          <button class="button" @click="closeModal">Cancel</button>
        </footer>
      </div>
    </div>
    <div class="content" style="margin:20px;">
      <div v-for="submission in submissions" :key="submission.submissionId" :submission="submission" class="list-item" style="margin:auto;margin-bottom:20px;">
        <div>
          <h3>{{submission.title}}</h3>
          <p style="margin-top:-10px;">ID: {{submission.submissionId}}</p>
          <p style="margin-top:-15px;">Host: <nuxt-link :to = getProfileLink(submission.aboutHost.hostId)>{{submission.hostName}}</nuxt-link></p>
        </div>
          <p style="margin-top:10px;">
              <span class="tag" :class="{'is-success': submission.status.inReview, 'is-danger': submission.status.isRejected, 'is-info': submission.status.isApproved}">{{submission.submissionId ? (submission.status.isDraft ? "Draft" : (submission.status.inReview ? "In Review": (submission.status.isApproved ? "Live": "Rejected" ))): ""}}</span>
            </p>
        <div style="margin-top:20px;">
          <nuxt-link class="button" style="margin-right:10px;" :to= getExperienceLink(submission.submissionId)>View</nuxt-link>
          <nuxt-link class="button" style="margin-right:10px;" :to= editExperienceLink(submission.submissionId)>Edit</nuxt-link>
          <button class="button" style="margin-right:10px;" @click="transferClicked(submission)">Transfer</button>
          <select v-if="!submission.status.isRejected" class="button" :class="{'is-danger is-outlined': submission.isDisabled, 'is-warning is-outlined': submission.isHidden, 'is-success is-outlined': (!submission.isHidden && !submission.isDisabled)}" v-model="visibility[submission.submissionId]" v-on:change="onVisibilityChange(submission.submissionId)">
            <option value= "show">Active</option>
            <option value= "hide">Hidden</option>
            <option value= "disable">Disabled</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth, db, host } from "~/plugins/firebase";

export default {
  data() {
    return {
      submissions: [],
      dateFilter: 0,
      stripeFilter: 0,
      totalCount: 0,
      visibility: [],
      isLoading: true,
      showModal: false,
      currentSubmissionTitle: null,
      currentSubmissionId: null,
      transferUserId: null
    };
  },
  methods: {
    transferClicked(submission) {
      this.showModal = true;
      this.currentSubmissionId = submission.submissionId
      this.currentSubmissionTitle = submission.title
    },
    closeModal() {
      this.showModal = false;
    },
    getProfileLink(userId) {
      return "user/"+userId;
    },
    getExperienceLink(experienceId) {
      return "experience/"+experienceId
    } ,
    editExperienceLink(experienceId) {
    return "experience/"+experienceId+"?isSubmission=true&isEditMode=true"
    } ,
    async transferExperience() {
      const batch = db.batch()
      if (
        this.currentSubmissionId === undefined || 
        this.currentSubmissionId.length == 0 ||
        this.transferUserId === undefined || 
        this.transferUserId.length == 0) 
      {
        this.showModal = false
        console.error("Invalid experienceId or userId")
        return
      }
      const submissionRef = db.collection('submissions').doc(this.currentSubmissionId)
      const experienceRef = db.collection('experiences').doc(this.currentSubmissionId)
      
      batch.update(submissionRef, {'aboutHost.hostId' : this.transferUserId})
      
      this.isLoading = true
      const experienceDoc = await experienceRef.get()
      if (experienceDoc.exists) {
        batch.update(experienceRef,  {'aboutHost.hostId' : this.transferUserId})
      }

      batch.commit().then(async() => {
         const userDoc = await db.collection('users').doc(this.transferUserId).get();
         const userData = userDoc.data();

         const body = {
          submissionId: this.currentSubmissionId,
          experienceTitle: this.currentSubmissionTitle,
          firstName: userData.firstName,
          email: userData.email
        }

         this.showModal = false
         this.transferUserId = null
         this.currentSubmissionId = null 
         this.isLoading = false
        try {
          await this.$axios.$post(`${host}/sendTransferEmailToHost`, body)
          // location.reload()
        } catch (error) {
          console.error(error)
          this.errorMessage = error.message
          this.showError = true
        }
      })
    },
    async onVisibilityChange(submissionId) {
      let obj = {}
      console.log(this.visibility)
      switch (this.visibility[submissionId]) {
        case 'show':
        obj = { isHidden : false, isDisabled: false }; break;
        case 'hide':
        obj = { isHidden: true, isDisabled: false }; break;
        case 'disable':
        obj = { isHidden: false, isDisabled: true }; break;
      }
       await db.collection("experiences").doc(submissionId).update(obj)
    },
    async fetchSubmissions() {
      this.isLoading = true;
      this.submissions = [];
      this.visibility= [];
      this.totalCount = 0;
      const snapshot = await db.collection("submissions").orderBy("lastEdited", "desc").get();
      snapshot.forEach(async doc => {
        const submission = doc.data();
        if (!submission.status.isDraft) {
          const user = await db.collection("users").doc(submission.aboutHost.hostId).get();
          if (user.exists) {
          submission["hostName"] = user.data().firstName + " " + user.data().lastName;
          } else {
            console.log("user doesn't exists"+ submission.submissionId)
          }
          const experience = await db.collection("experiences").doc(submission.submissionId).get();
          this.isLoading = false
          if (experience.exists) {
              submission["isHidden"] = experience.data().isHidden;
              submission["isDisabled"] = experience.data().isDisabled;
              if (submission.isDisabled) {
                this.visibility[submission.submissionId] = "disable"
              } else if (submission.isHidden) {
                 this.visibility[submission.submissionId] = "hide"
              } else {
                 this.visibility[submission.submissionId] = "show"
              }
          } else {
             this.visibility[submission.submissionId] = ""
          }
          if (this.stripeFilter != 0) {
            if (user.data().settings.payoutMethods) {
              if (this.dateFilter != 0) {
                const experience = await db.collection("experiences").doc(submission.submissionId).get();
                if (experience.exists) {
                  if (experience.data().lastAvailabilityDate > new Date().getTime()) {
                    this.submissions.push(submission);
                    this.totalCount++
                  }
                } else {
                  this.submissions.push(submission);
                  this.totalCount++
                }
              } else {
                this.submissions.push(submission);
                this.totalCount++
              }
            }
          } else if (this.dateFilter != 0) {
              const experience = await db.collection("experiences").doc(submission.submissionId).get();
              if (experience.exists) {
                if (experience.data().lastAvailabilityDate > new Date().getTime()) {
                    this.submissions.push(submission);
                    this.totalCount++
                }
              }
            } else {
              this.submissions.push(submission);
              this.totalCount++
            }
          }
      });
    },
    async onDateFilterChange() {
      await this.fetchSubmissions();
    },
    async onStripeFilterChange() {
      await this.fetchSubmissions();
    }
  },
  created() {
    this.fetchSubmissions();
  }
};
</script>

<style scoped>
.list-item {
  padding: 25px;
  border: 1px solid #e7e7e7;
  border-radius: 10px;
  box-shadow: 0 5px 10px -5px rgba(136, 136, 136, 0.25);
  max-width: 640px;
}
</style>
