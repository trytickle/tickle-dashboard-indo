<template>
  <div class="container" style="padding-left:30px;padding-right:30px;padding-bottom:50px;">
    <div class="columns">
      <div class="column is-2" style="max-width:150px;">
        <figure class="image is-128x128">
          <img class="is-rounded" style="object-fit:cover;" :src="user.profilePhotoUrl">
        </figure>
      </div>
      <div class="column is-10">
        <div class="content" style="padding-top:10px;">
          <p>
            <strong class="title is-4">{{user.firstName}} {{user.lastName}}</strong>
            <br>
            {{user.email}}<br>{{user.userId}}
          </p>
          <p>
            <strong>about</strong><br>
            {{user.about}}
          </p>
          <p>
            <strong>city</strong><br>
            {{user.city}}
          </p>
          <p>
            <strong>languages</strong><br>
            {{user.languages}}
          </p>
          <p>
            <strong>birthdate</strong><br>
            {{user.birthdate}}
          </p>
          <p>
            <strong>gender</strong><br>
            {{user.gender}}
          </p>
          <p>
            <strong>createdAt</strong><br>
            {{createdAt}}
          </p>
          <p>
            <strong>customerId</strong><br>
            {{user.customerId}}
          </p>
          <p>
            <strong>isEmailVerified</strong><br>
            {{user.isEmailVerified}}
          </p>
          <p>
            <strong>isVerified</strong><br>
            <span class="select">
              <select v-model="isVerified" v-on:change="onVerifySelectionChange">
                <option :value=true>true</option>
                <option :value=false selected="selected">false</option>
              </select>
            </span>
          </p>
          <p>
            <strong>lastActive</strong><br>
            {{lastActive}}
          </p>
          <p>
            <strong>currency</strong><br>
            {{currency.toUpperCase()}}
          </p>
          <p>
            <strong>receiveEmail</strong><br>
            {{receiveEmail}}
          </p>
          <p>
            <strong>receivePushNotifications</strong><br>
            {{receivePushNotifications}}
          </p>
          <p>
            <strong>receiveSms</strong><br>
            {{receiveSms}}
          </p>
          <p>
            <strong>payoutMethods</strong><br>
            {{payoutMethods}}
          </p>
           <p>
            <strong>customSplit (Percentage of cut Tickle will take for this host eg 10%, 20%, 30%)</strong><br>
            <input class="input" type="number" style="width:200px; margin-top:20px; margin-right:20px" placeholder="" v-model="customSplit">
            <button class="button" style="margin-top:20px;" @click="saveSplit()">Save Split</button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth, db } from "~/plugins/firebase";
import moment from "moment";

export default {
  data() {
    return {
      user: {},
      currency: "",
      receiveEmail: true,
      receivePushNotifications: true,
      receiveSms: true,
      payoutMethods: {},
      createdAt: "",
      lastActive: "",
      isVerified: false,
      customSplit: null
    };
  },
  methods: {
    saveSplit() {
      db
        .collection("users")
        .doc(this.user.userId)
        .update({
          customSplit: parseInt(this.customSplit, 10)
        })
        .then(() => {
          location.reload();
        });
    },
    onVerifySelectionChange() {
      db
        .collection("users")
        .doc(this.user.userId)
        .update({
          isVerified: this.isVerified
        })
        .then(() => {
          location.reload();
        });
    }
  },
  async created() {
    const userId = this.$route.params.userId;
    const snapshot = await db
      .collection("users")
      .doc(userId)
      .get();

    let userData = snapshot.data();
    let profilePhoto = "/profile.png";
    this.isVerified = userData.isVerified;
    if (userData.profilePhotoUrl.includes("firebase")) {
      profilePhoto = userData.profilePhotoUrl;
    }
    userData.profilePhotoUrl = profilePhoto;
    if (userData.customSplit && userData.customSplit >= 0) {
      this.customSplit = userData.customSplit;
    }
    if (userData.settings.currency) {
      this.currency = userData.settings.currency;
    }
    if (userData.settings.notifications.receiveEmail) {
      this.receiveEmail = userData.settings.notifications.receiveEmail;
    }
    if (userData.settings.notifications.receivePushNotifications) {
      this.receivePushNotifications =
        userData.settings.notifications.receivePushNotifications;
    }
    if (userData.settings.notifications.receiveSms) {
      this.receiveSms = userData.settings.notifications.receiveSms;
    }
    if (userData.settings.payoutMethods) {
      this.payoutMethods = userData.settings.payoutMethods;
    }

    let createdAtDate = moment(userData.createdAt);
    this.createdAt = createdAtDate.format("dddd, MMMM Do YYYY, h:mm a");

    let lastActiveDate = moment(userData.lastActive);
    this.lastActive = lastActiveDate.format("dddd, MMMM Do YYYY, h:mm a");

    this.user = userData;
  }
};
</script>
