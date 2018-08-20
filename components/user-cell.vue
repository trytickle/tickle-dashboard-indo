<template>
  <div class="user-container">
    <article class="media">
      <div class="media-left">
        <figure class="image is-64x64">
          <img class="is-rounded" style="object-fit:cover;" :src="user.profilePhotoUrl">
        </figure>
      </div>
      <div class="media-content">
        <div class="content">
          <p>
            <strong>{{user.firstName}} {{user.lastName}}</strong>
            <br>
            <small>{{user.email}}</small><br><small>{{user.userId}}</small>
          </p>
          <p>
            <nuxt-link class="button" style="margin-right:10px;" :to="'/user/' + user.userId">Profile</nuxt-link><nuxt-link class="button" :to="'/experiences/' + user.userId">Experiences</nuxt-link>
          </p>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  props: ['user']
}
</script>

<style scoped>
.user-container {
  padding: 20px;
  border: 1px solid #e7e7e7;
  border-radius: 10px;
  box-shadow: 0 5px 10px -5px rgba(136, 136, 136, 0.5);
}
</style>
