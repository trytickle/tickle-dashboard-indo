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
            <nuxt-link class="button" style="margin-right:10px;" :to="viewExperienceUrl">View</nuxt-link>
            <button class="button is-success is-outlined" style="margin-right:10px;" to="#">Approve</button> 
            <button class="button is-danger is-outlined" to="#">Reject</button> 
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
      viewExperienceUrl: '/experience/' + (this.experience.experienceId ? this.experience.experienceId : this.experience.submissionId) + '?isSubmission=' + (this.experience.experienceId ? 'false' : 'true')
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
