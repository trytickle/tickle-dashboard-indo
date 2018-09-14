<template>
  <div class="container">
    <div style="text-align:center;">
      <nuxt-link class="button is-link" style="padding:25px;" :to="pathUrl">Create Story</nuxt-link>
    </div>
    <div class="content" style="margin:20px;">
      <div class="story-item" style="margin:auto;margin-bottom:20px;" v-for="story in stories" :key="story.storyId">
        <div>
          <h3>{{story.title}}</h3>
          <p style="margin-top:-10px;">Written by {{story.authorName}}</p>
        </div>
        <div>
          <nuxt-link :to="'/story/'+story.storyId" class="button is-outlined">Edit</nuxt-link>
          <button class="button is-outlined is-danger">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '~/plugins/firebase'

export default {
  data() {
    return {
      stories: []
    }
  },
  computed: {
    pathUrl() {
      return '/story/' + db.collection('stories').doc().id
    }
  },
  async created() {
    const snapshot = await db.collection('stories').get()
    snapshot.forEach(doc => {
      this.stories.push(doc.data())
    })
  }
}
</script>

<style scoped>
.story-item {
  padding: 25px;
  border: 1px solid #e7e7e7;
  border-radius: 10px;
  box-shadow: 0 5px 10px -5px rgba(136, 136, 136, 0.25);
  max-width: 640px;
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>
