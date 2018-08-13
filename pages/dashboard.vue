<template>
  <div class="container" style="margin:20px;">
    <div class="columns">
      <div class="column">
        <usercell v-for="user in users" :key="user.userId" :user="user"/>
      </div>
      <div class="column">

      </div>
    </div>
  </div>
</template>

<script>
import { auth, db } from '~/plugins/firebase'
import usercell from '~/components/user-cell.vue'

export default {
  data() {
    return {
      users: []
    }
  },
  components: {
    usercell
  },
  methods: {
    async fetchUsers() {
      const snapshot = await db.collection('users').get()
      snapshot.forEach(doc => {
        let userData = doc.data()
        let profilePhotoUrl = "/profile.png"
        if (doc.data().profilePhotoUrl.includes("firebase")) {
          profilePhotoUrl = doc.data().profilePhotoUrl
        }
        userData['profilePhotoUrl'] = profilePhotoUrl
        this.users.push(userData)
      }) 
    }
  },
  created() {
    auth.onAuthStateChanged(user => {
      if (!user) {
        this.$router.push('/')
      } else {
        this.fetchUsers()
      }
    })
  }
}
</script>
