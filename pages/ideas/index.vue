<template>
  <div class="container">
    <div style="text-align:center;">
      <nuxt-link class="button is-success" style="padding:25px;" :to="pathUrl">Create Idea</nuxt-link>
    </div>
    <div class="content" style="margin:20px;">
      <div class="story-item" style="margin:auto;margin-bottom:20px;" v-for="idea in ideas" :key="idea.ideaId">
        <div>
          <h3>{{idea.title}}</h3>
        </div>
        <div style="margin-top:20px;">
          <nuxt-link :to="'/idea/' + idea.ideaId" class="button is-outlined" style="margin-right:10px;">Edit Idea</nuxt-link>
          <select class="button" :class="{'is-info': idea.isPublished}" :style="idea.isPublished === false ? 'background-color: #ddd' : ''">
            <option value="draft">Draft</option>
            <option value="published" :selected="idea.isPublished">Published</option>
          </select>
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
      ideas: []
    }
  },
  computed: {
    pathUrl() {
      return '/idea/' + db.collection('ideas').doc().id
    }
  },
  async created() {
    const snapshot = await db.collection('ideas').get()
    snapshot.forEach(doc => {
      this.ideas.push(doc.data())
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
}
</style>
