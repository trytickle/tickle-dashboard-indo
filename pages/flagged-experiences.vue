<template>
  <div class="container">
    <div style="text-align:center;">
      <h1 class="title is-3">Flagged Experiences</h1>
       <h5 class="title is-5" v-if="this.isLoading">{{this.loadingText}}</h5>
    </div>
    <div class="content" style="margin:20px;">
      <div v-for="history in historyList" :key="history.experienceData.experienceId" :history="history" class="list-item" style="margin:auto;margin-bottom:20px;">
        <div>
          <h3>{{history.experienceData.title}}</h3>
          <p style="margin-top:-10px;">ID: {{history.experienceData.experienceId}}</p>
          <p style="margin-top:-15px;">Host: <nuxt-link :to = getProfileLink(history.experienceData.aboutHost.hostId)>{{history.experienceData.aboutHost.hostId}}</nuxt-link></p>
        </div>
         <div style="margin-top:10px;">
          <nuxt-link v-if ="!history.flags.deleted" class="button" style="margin-right:10px;" :to= getExperienceLink(history.experienceData.experienceId)>View</nuxt-link>
          <nuxt-link v-if ="!history.flags.deleted" class="button" style="margin-right:10px;" :to= editExperienceLink(history.experienceData.experienceId)>Edit</nuxt-link>
          <button class="button" style="margin-right:10px;" @click ="clearFlags(history.experienceData.experienceId)">Clear flags</button>
        </div>
        <div>
            <h5 style="margin-top:15px; margin-bottom:5px">Flags</h5>
                <p >
                <span v-if="history.flags.deleted" class="is-danger tag"  >Deleted experience : {{history.flags.deleted}}</span>
            </p>
            <p >
                <span v-if="history.flags.dates" class="is-danger tag"  >Removed dates : {{history.flags.dates}}</span>
            </p>
            <p >
                <span v-if="history.flags.price" class="is-warning tag"   >Changed price : {{history.flags.price}}</span>
            </p>
            <p >
                <span v-if="history.flags.address" class="is-warning tag"  >Changed address : {{history.flags.address}}</span>
            </p>
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
      historyList: [],
      isLoading: true,
      showModal: false,
      loadingText: "Loading..."
    };
  },
  methods: {
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
    async clearFlags(experienceId) {
     await db.collection("flagged_experiences").doc(experienceId).delete();
     this.fetchHistory();
    },
    async fetchHistory() {
      this.isLoading = true;
      this.historyList = [];
      this.visibility= [];
      this.totalCount = 0;
      const snapshot = await db.collection("flagged_experiences").get();
      snapshot.forEach(async doc => {
        const history = doc.data();
        this.historyList.push(history);
      });
      if (this.historyList.length > 0) {
          this.isLoading = false;
      } else {
          this.loadingText = "No flagged experiences found"
      }
    }
  },
  created() {
    this.fetchHistory();
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
