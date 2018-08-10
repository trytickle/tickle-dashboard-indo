<template>
  <div class="box">
    <article class="media">
      <div class="media-left">
        <figure v-if="experience.media">
          <img :src="experience.media[0]">
        </figure>
      </div>
      <div class="media-content">
        <div class="content">
          <p> 
            <span class="title is-5">{{experience.title}}</span><br>
            {{experience.tagline}}
          </p>
          <p>
            <nuxt-link class="button" style="margin-right:10px;" to="#">View</nuxt-link><nuxt-link class="button" to="#">Edit</nuxt-link>
          </p>
        </div>
      </div>
    </article>
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

