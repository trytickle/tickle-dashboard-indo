<template>
  <div class="box">
    <article class="media">
      <div class="media-left">
        <figure class="image is-64x64">
          <img class="is-rounded" :src="profilePhotoUrl">
        </figure>
      </div>
      <div class="media-content">
        <div class="content">
          <p>
            <strong>{{firstName}} {{lastName}}</strong>
            <br>
            <small>{{email}}</small><br><small>{{userId}}</small>
          </p>
          <p>
            <button class="button" style="margin-right:10px;">Profile</button><button class="button">Experiences</button>
          </p>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  props: ['firstName', 'lastName', 'email', 'userId', 'profilePhotoUrl']
}
</script>

