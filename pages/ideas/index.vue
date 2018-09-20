<template>
  <div class="container">
    <div style="text-align:center;">
      <nuxt-link class="button is-success" style="padding:25px;" :to="pathUrl">Create Idea</nuxt-link>
      <p style="margin-top:10px;">Ideas will be displayed in the listed order. You can drag to reorder these.</p>
    </div>
    <draggable class="content" style="margin:20px;background-color:white;" @end="changeOrder" v-model="ideas">
      <div class="story-item" style="margin:auto;margin-bottom:20px;" v-for="(idea, index) in ideas" :key="idea.ideaId">
        <div style="padding:25px;">
          <div>
            <h3>{{idea.title}}</h3>
          </div>
          <div style="margin-top:20px;">
            <nuxt-link :to="'/idea/' + idea.ideaId" class="button is-outlined" style="margin-right:10px;">Edit Idea</nuxt-link>
            <select :id="idea.ideaId" class="button" :class="{'is-info': idea.isPublished, 'is-light': idea.isPublished === false}" @change="updateStatus">
              <option value="draft" :selected="idea.isPublished === false">Draft</option>
              <option value="published" :selected="idea.isPublished === true">Published</option>
            </select>
          </div>
        </div>
        <div style="background-color:#eee;border-radius:0 10px 10px 0;display:grid;align-items:center;justify-content:center;cursor:move;">
          <strong>{{index + 1}}</strong>
        </div>
      </div>
    </draggable>
  </div>
</template>

<script>
import { db } from '~/plugins/firebase'
import draggable from 'vuedraggable'

export default {
  data() {
    return {
      ideas: []
    }
  },
  components: {
    draggable
  },
  methods: {
    async updateStatus(e) {
      const ideaId = e.target.id
      const value = e.target.value
      if (value === 'published') {
        await db.collection('ideas').doc(ideaId).update({ isPublished: true })
      } else {
        await db.collection('ideas').doc(ideaId).update({ isPublished: false })
      }
      this.ideas.forEach((idea) => {
        if (idea.ideaId === ideaId) {
          if (value === 'published') {
            idea.isPublished = true
          } else {
            idea.isPublished = false
          }
        }
      })
    },
    async changeOrder() {
      this.ideas.forEach(async (idea, index) => {
        await db.collection('ideas').doc(idea.ideaId).update({ order: index })
      })
    }
  },
  computed: {
    pathUrl() {
      return '/idea/' + db.collection('ideas').doc().id
    }
  },
  async created() {
    const snapshot = await db.collection('ideas').orderBy('order').get()
    snapshot.forEach(doc => {
      this.ideas.push(doc.data())
    })
  }
}
</script>

<style scoped>
.story-item {
  border: 1px solid #e7e7e7;
  border-radius: 10px;
  box-shadow: 0 5px 10px -5px rgba(136, 136, 136, 0.25);
  max-width: 640px;
  display: grid;
  grid-template-columns: 1fr 100px;
}
</style>
