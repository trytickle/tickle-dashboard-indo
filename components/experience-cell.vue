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
              <small>{{experience.experienceId ? experience.experienceId : experience.submissionId}}</small>&nbsp;&nbsp;<span class="tag">Draft</span>
            </p>
            <nuxt-link class="button" style="margin-right:10px;" :to="viewExperienceUrl">View</nuxt-link>
            <nuxt-link class="button" style="margin-right:10px;" :to="editExperienceUrl">Edit</nuxt-link>
            <button class="button" style="margin-right:10px;" @click="transferClicked">Transfer</button>
            <button v-if="this.experience.submissionId" class="button" @click="reviewClicked">Review</button> 
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'experience'
  ],
  data() {
    return {
      viewExperienceUrl: '/experience/' + (this.experience.experienceId ? this.experience.experienceId : this.experience.submissionId) + '?isSubmission=' + (this.experience.experienceId ? 'false' : 'true'),
      editExperienceUrl: '/experience/' + (this.experience.experienceId ? this.experience.experienceId : this.experience.submissionId) + '?isSubmission=' + (this.experience.experienceId ? 'false' : 'true') + '&isEditMode=true'
    }
  },
  computed: {
    imageUrl() {
      if (this.experience.media && this.experience.media[0]) {
        return this.experience.media[0]
      } else {
        return '/profile.png'
      }
    }
  },
  methods: {
    transferClicked() {
      const tranferUserId = this.experience.experienceId ? this.experience.experienceId : 
      this.$parent.showTransfer(this.experience.title, tranferUserId)
    },
    reviewClicked() {
      this.$parent.showReview(this.experience.title, this.experience.submissionId)
    }
  }
}
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
