<template>
  <div class="container">
    <div style="text-align:center;">
      <h1 class="title is-3">Experience List</h1>
      <div>
        Host Stripe Connected:
        <select style="margin-right:20px;">
          <option value="1">Yes</option>
          <option value="0">No</option>
        </select>
        Host Booking Dates Added:
        <select>
          <option value="1">Yes</option>
          <option value="0">No</option>
        </select>
      </div>
    </div>
    <div class="content" style="margin:20px;">
      <div class="list-item" style="margin:auto;margin-bottom:20px;">
        <div>
          <h3>Experience Title</h3>
          <p style="margin-top:-10px;">ID: experienceId</p>
          <p style="margin-top:-15px;">Host: <nuxt-link to="/user/userId">Firstname Lastname</nuxt-link></p>
        </div>
        <div style="margin-top:20px;">
          <nuxt-link class="button" style="margin-right:10px;" to="viewExperienceUrl">View</nuxt-link>
          <nuxt-link class="button" style="margin-right:10px;" to="editExperienceUrl">Edit</nuxt-link>
          <button class="button" style="margin-right:10px;">Transfer</button>
          <select class="button">
            <option value="show">Active</option>
            <option value="hide">Hidden</option>
            <option value="disable">Disabled</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style scoped>
.list-item {
  padding: 25px;
  border: 1px solid #e7e7e7;
  border-radius: 10px;
  box-shadow: 0 5px 10px -5px rgba(136, 136, 136, 0.25);
  max-width: 640px;
}
</style>
