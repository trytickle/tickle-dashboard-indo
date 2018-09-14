<template>
  <div>
 <nuxt-link class="button is-link" style="margin-left:10px;" :to="pathUrl">Create Story</nuxt-link>
  </div>
</template>

<script>
import { auth, db } from '~/plugins/firebase'

export default {
  computed: {
    pathUrl() {
      return    "/story/"+db.collection('stories').doc().id;
    }
  }
}
</script>
