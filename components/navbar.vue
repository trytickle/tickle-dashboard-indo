<template>
  <nav class="level" style="padding:20px;background-color:#D4EDFA;">
    <div class="level-left">
      <div class="level-item">
        <div>
          <nuxt-link to="/users">
            <img src="/tickleLogo.png" alt="Tickle" width="120" style="padding-left:10px;">
          </nuxt-link>
        </div>
      </div>
    </div>

    <div class="level-right" v-if="isSignedIn">
      <div class="level-item">
        <span style="padding-right:20px;">{{ email }}</span>
        <a class="button is-danger" href="/" @click="signout">
          <span>Sign out</span>
        </a>
      </div>
      <div class="level-item">
        <div class="dropdown is-right actionsButton">
          <div class="dropdown-trigger">
            <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
              <span>Actions</span>
              <span class="icon is-small">
                <i class="fas fa-angle-down" aria-hidden="true"></i>
              </span>
            </button>
          </div>
          <div class="dropdown-menu actionsDropdown" id="dropdown-menu" role="menu">
            <div class="dropdown-content">
              <nuxt-link to="/create-experience" class="dropdown-item">
                Create Experience
              </nuxt-link>
              <nuxt-link to="/in-review" class="dropdown-item">
                In Review
              </nuxt-link>
              <nuxt-link to="/stories" class="dropdown-item">
                Stories
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { auth } from '~/plugins/firebase'

export default {
  data() {
    return {
      isSignedIn: false,
      email: '',
      isActive: false
    }
  },
  created() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.email = user.email
        this.isSignedIn = true
      } else {
        this.isSignedIn = false
      }
    })
  },
  methods: {
    signout() {
      auth.signOut()
    },
    toggleMenu() {
      if (this.isActive) {
        this.isActive = false
      } else {
        this.isActive = true
      }
    }
  }
}
</script>

<style scoped>
.actionsButton:hover .actionsDropdown {
  display: block;
}
</style>
