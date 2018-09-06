<template>
  <div>
    <div class="box">
      <article class="media">
        <div class="media-left">
          <figure>
            <img style="object-fit:cover;" :src="imageUrl">
          </figure>
        </div>
        <div class="media-content">
          <div class="content">
            <p> 
              <span class="title is-5">{{experience.title}}</span><br>
              <small>{{experience.experienceId ? experience.experienceId : experience.submissionId}}</small>
            </p>
            <div style="font-weight:700;margin-top:10px;margin-bottom:20px;display:grid;grid-template-columns:90px auto;">
              <small><span v-bind="checkStripeStatus()">Stripe: {{stripeStatus}}</span></small>
              <small><span v-bind="checkHasAvailability()">Availabilities: {{availabilityStatus}}</span></small>
            </div>
            <nuxt-link class="button" style="margin-right:10px;" :to="viewExperienceUrl">View</nuxt-link>
            <button class="button is-success is-outlined" style="margin-right:10px;" @click="approveClicked">Approve</button> 
            <button class="button is-danger is-outlined" @click="rejectClicked">Reject</button> 
          
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import { db } from "~/plugins/firebase";
export default {
  props: ["experience"],
  data() {
    return {
      viewExperienceUrl:
        "/experience/" +
        (this.experience.experienceId
          ? this.experience.experienceId
          : this.experience.submissionId) +
        "?isSubmission=" +
        (this.experience.experienceId ? "false" : "true"),
      stripeStatus: "?",
      availabilityStatus: "?"
    };
  },
  computed: {
    imageUrl() {
      if (this.experience.media && this.experience.media[0]) {
        return this.experience.media[0];
      } else {
        return "/profile.png";
      }
    }
  },
  methods: {
    approveClicked() {
      this.$parent.openModal(
        true,
        false,
        this.experience.title,
        this.experience.submissionId
      );
    },
    rejectClicked() {
      this.$parent.openModal(
        false,
        true,
        this.experience.title,
        this.experience.submissionId
      );
    },
    async checkStripeStatus() {
      const doc = await db
        .collection("users")
        .doc(this.experience.aboutHost.hostId)
        .get();
      if (doc.exists && doc.data().settings.payoutMethods) {
        this.stripeStatus = "👍";
      } else {
        this.stripeStatus = "❌";
      }
    },
    async checkHasAvailability() {
      const availDocs = await db
        .collection("submissions")
        .doc(this.experience.submissionId)
        .collection("availability")
        .get();
      if (availDocs.size > 0) {
        this.availabilityStatus = "👍";
      } else {
        this.availabilityStatus = "❌";
      }
    }
  }
};
</script>

<style scoped>
figure {
  width: 64px;
  height: 64px;
  overflow: hidden;
  position: relative;
  border-radius: 32px;
}
img {
  width: 64px;
  position: absolute;
  margin: auto;
  min-height: 100%;
  min-width: 100%;
  left: -100%;
  right: -100%;
  top: -100%;
  bottom: -100%;
}
</style>
