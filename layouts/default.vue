<template>
  <div>
    <navbar/>
    <nuxt class="myContent"/>
    <footer class="footer">
      <div class="content has-text-centered">
        <strong>Copyright Tickle &copy; 2018</strong><br>
        <small><a href="https://trytickle.com" target="_blank">Website</a></small>
        | <small><a href="https://trytickle.com/privacy-policy" target="_blank">Terms Of Use</a></small>
        | <small><a href="https://trytickle.com/privacy-policy" target="_blank">Privacy Policy</a></small>
      </div>
    </footer>
  </div>
</template>

<script>
import navbar from '~/components/navbar.vue'
export default {
  components: {
    navbar
  }
}
</script>

<style scoped>
.myContent {
  min-height: calc(100vh - 250px);
}
</style>
