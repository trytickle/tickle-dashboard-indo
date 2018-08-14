<template>
  <div>
    <div class="box">
      <article class="media">
        <div class="media-left">
          <figure v-if="experience.media">
            <img style="object-fit:cover;" :src="experience.media[0]">
          </figure>
        </div>
        <div class="media-content">
          <div class="content">
            <p> 
              <span class="title is-5">{{experience.title}}</span><br>
              <small>{{experience.experienceId ? experience.experienceId : experience.submissionId}}</small>
            </p>
            <nuxt-link class="button" style="margin-right:10px;" to="#">View</nuxt-link>
            <nuxt-link class="button" style="margin-right:10px;" to="#">Edit</nuxt-link>
            <nuxt-link class="button" style="margin-right:10px;" to="#">Transfer</nuxt-link>
            <nuxt-link class="button is-danger is-outlined" to="#">Delete</nuxt-link> 
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
  ]
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
