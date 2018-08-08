<template>
  <div>
    <navbar/>
    <nuxt/>
    <footer class="footer">
      <div class="content" style="padding-top:30px;padding-left:10px;">
        <small><strong>Tickle</strong></small>
        <br>
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
