<template>
  <div class="container" style="margin:20px;">
    <usercell v-for="user in users" :key="user.userId" :userId="user.userId" :firstName="user.firstName" :lastName="user.lastName" :email="user.email" :profilePhotoUrl="user.profilePhotoUrl"/>
  </div>
</template>

<script>
import { auth, db } from '~/plugins/firebase'
import usercell from '~/components/usercell.vue'

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
      const querySnap = await db.collection('users').get()
      querySnap.forEach(doc => {
        let profilePhotoUrl = "/profile.png"
        if (doc.data().profilePhotoUrl.includes("firebase")) {
          profilePhotoUrl = doc.data().profilePhotoUrl
        }

        console.log(profilePhotoUrl)

        const userData = {
          firstName: doc.data().firstName,
          lastName: doc.data().lastName,
          profilePhotoUrl: profilePhotoUrl,
          email: doc.data().email,
          userId: doc.data().userId
        }
        this.users.push(userData)
      })
    }
  },
  created() {
    auth.onAuthStateChanged(user => {
      if (!user) {
        this.$router.replace('/')
      } else {
        this.fetchUsers()
      }
    })
  }
}
</script>
