<template>
  <div>
    <p class="title is-5" style="padding-left:30px;margin-bottom:10px;" v-if="this.users.length > 0">All Users ({{ this.users.length }})</p>
    <p class="title is-5" style="padding-left:30px;margin-bottom:10px;" v-else>Loading ...</p>
    <div class="users-grid">
      <usercell v-for="user in users" :key="user.userId" :user="user"/>
    </div>
  </div>
</template>

<script>
import { auth, db } from "~/plugins/firebase";
import usercell from "~/components/user-cell.vue";

export default {
  data() {
    return {
      users: []
    };
  },
  components: {
    usercell
  },
  methods: {
    async fetchUsers() {
      const snapshot = await db.collection("users").get();
      snapshot.forEach(doc => {
        let userData = doc.data();
        let profilePhotoUrl = "/profile.png";
        if (doc.data().profilePhotoUrl.includes("firebase")) {
          profilePhotoUrl = doc.data().profilePhotoUrl;
        }
        userData["profilePhotoUrl"] = profilePhotoUrl;
        this.users.push(userData);
      });
    }
  },
  created() {
    this.fetchUsers();
  }
};
</script>

<style scoped>
.users-grid {
  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  padding: 5px 30px 30px 30px;
}
</style>
