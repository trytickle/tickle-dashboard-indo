<template>
  <div class="container" style="padding:20px;max-width:640px;margin:auto;">
    <p class="title is-3">Create Experience</p>
    <p class="subtitle is-5">Make sure to check for grammar and spelling</p>

    <div class="field">
      <label class="label">Title</label>
      <div class="control">
        <input class="input" type="text" placeholder="" v-model="title">
      </div>
    </div>

    <div class="field">
      <label class="label">Tagline</label>
      <div class="field is-grouped">
        <div class="field control is-expanded">
          <input class="input" type="text" placeholder="" v-model="tagline">
        </div>
      </div>
    </div>

    <hr/>

    <div class="field is-grouped is-expanded">
      <div style="padding-right:20px;">
        <label class="label">Label</label>
        <div class="select">
          <select v-model="label">
            <option>Dinner party</option>
            <option>Photo class</option>
            <option>Craft class</option>
            <option>Cooking class</option>
            <option>Food tasting</option>
            <option>Bike ride</option>
            <option>Day trip</option>
            <option>Bar crawl</option>
            <option>Tea tasting</option>
            <option>Meditation</option>
            <option>Spirits tasting</option>
            <option>Beer tasting</option>
            <option>Boat ride</option>
            <option>Lunch party</option>
            <option>Food walk</option>
            <option>Art class</option>
            <option>Guided hike</option>
            <option>Surf lesson</option>
            <option>Culture walk</option>
            <option>Dance party</option>
            <option>Workshop</option>
            <option>Market visit</option>
            <option>Intimate concert</option>
            <option>Dessert tasting</option>
            <option>Wine tasting</option>
            <option>Vineyard visit</option>
            <option>Social gathering</option>
            <option>Photo shoot</option>
            <option>Video shoot</option>
            <option>Scavenger hunt</option>
            <option>Baking class</option>
            <option>History walk</option>
            <option>Office visit</option>
            <option>Art walk</option>
            <option>Tea ceremony</option>
            <option>Entertainment</option>
            <option>Dance lesson</option>
            <option>Kayaking</option>
            <option>Nature walk</option>
            <option>Sanctuary visit</option>
            <option>Food & drink</option>
            <option>Farm visit</option>
            <option>Music lesson</option>
            <option>Dance recital</option>
            <option>Music</option>
            <option>Museum visit</option>
            <option>Shopping</option>
            <option>Live music</option>
            <option>Ziplining</option>
            <option>Polo lesson</option>
            <option>Offroading</option>
            <option>Yoga class</option>
            <option>Design walk</option>
            <option>Skateboarding</option>
            <option>Scenic run</option>
            <option>Boot camp</option>
          </select>
        </div>
      </div>

      <div>
        <label class="label">Duration</label>
        <div class="select">
          <select v-model="duration">
            <option>1 hour</option>
            <option>2 hours</option>
            <option>3 hours</option>
            <option>4 hours</option>
            <option>5 hours</option>
            <option>> 5 hours</option>
          </select>
        </div>
      </div>

      <div style="padding-left:20px;">
        <label class="label">Language</label>
        <div class="select">
          <select v-model="language">
            <option>English</option>
            <option>Mandarin</option>
            <option>Cantonese</option>
            <option>Bahasa Melayu</option>
            <option>Tamil</option>
            <option>Hindi</option>
            <option>Bahasa Indonesia</option>
            <option>Thai</option>
            <option>Tagalog</option>
            <option>Vietnamese</option>
            <option>Korean</option>
            <option>Japanese</option>
            <option>Spanish</option>
            <option>French</option>
            <option>German</option>
            <option>Russian</option>
          </select>
        </div>
      </div>
    </div>

    <hr/>

    <div class="field">
      <label class="label">About Host</label>
      <div class="control">
        <textarea class="textarea" placeholder="" v-model="aboutHost"></textarea>
      </div>
    </div>

    <div class="field">
      <label class="label">What We'll Do</label>
      <div class="control">
        <textarea class="textarea" placeholder="" v-model="whatWeDo"></textarea>
      </div>
    </div>

    <div class="field">
      <label class="label">What I'll Provide</label>
      <div class="control">
        <textarea class="textarea" placeholder="" v-model="whatIProvide"></textarea>
      </div>
    </div>

    <div class="field">
      <label class="label">Where We'll Be</label>
      <div class="control">
        <textarea class="textarea" placeholder="" v-model="whereWeBe"></textarea>
      </div>
    </div>

    <div class="field">
      <label class="label">Notes</label>
      <div class="control">
        <textarea class="textarea" placeholder="" v-model="notes"></textarea>
      </div>
    </div>

    <hr/>

    <div class="field">
      <label class="label">Location Name</label>
      <div class="control">
        <input class="input" type="text" placeholder="" v-model="locationName">
      </div>
    </div>

    <div class="field">
      <label class="label">Apartment/Suite/Building</label>
      <div class="control">
        <input class="input" type="text" placeholder="" v-model="aptSuiteBuilding">
      </div>
    </div>

    <div class="field">
      <label class="label">Street Address</label>
      <div class="control">
        <input class="input" type="text" placeholder="" v-model="streetAddress">
      </div>
    </div>

    <div class="field is-grouped is-expanded">
      <div style="padding-right:20px;">
        <label class="label">Zipcode</label>
        <div class="control">
          <input class="input" type="text" placeholder="" v-model="zipcode">
        </div>
      </div>
      <div style="padding-right:20px;">
        <label class="label">City</label>
        <div class="control">
          <input class="input" type="text" v-model="city" readonly>
        </div>
      </div>
      <div>
        <label class="label">Country</label>
        <div class="control">
          <input class="input" type="text" v-model="country" readonly>
        </div>
      </div>
    </div>

    <hr/>

    <div class="field is-grouped">
      <div style="padding-right:20px;">
        <label class="label">Minimum Age</label>
        <div class="select">
          <select v-model="minimumAge">
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
            <option>11</option>
            <option selected="selected">12</option>
            <option>13</option>
            <option>14</option>
            <option>15</option>
            <option>16</option>
            <option>17</option>
            <option>18</option>
            <option>19</option>
            <option>20</option>
            <option>21</option>
          </select>
        </div>
      </div>

      <div style="padding-right:20px;">
        <label class="label">Kids?</label>
        <div class="select">
          <select v-model="kidsAllowed">
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>
      </div>

      <div style="padding-right:20px;">
        <label class="label">Alcohol?</label>
        <div class="select">
          <select v-model="alcohol">
            <option>Yes</option>
            <option selected="selected">No</option>
          </select>
        </div>
      </div>

      <div>
        <label class="label">Verification?</label>
        <div class="select">
          <select v-model="verification">
            <option>Yes</option>
            <option selected="selected">No</option>
          </select>
        </div>
      </div>
    </div>

    <hr/>

    <label class="label">Cover Photo</label>
    <div class="file has-name is-fullwidth">
      <label class="file-label">
        <input class="file-input" type="file" name="resume">
        <span class="file-cta">
          <span class="file-icon">
            <i class="fas fa-upload"></i>
          </span>
          <span class="file-label">
            Choose a file...
          </span>
        </span>
        <span class="file-name"></span>
      </label>
    </div>

    <hr/>

    <label class="label">Price</label>
    <div class="field has-addons">
      <p class="control">
        <span class="select">
          <select v-model="currency">
            <option>SGD</option>
          </select>
        </span>
      </p>
      <p class="control">
        <input class="input" type="text" placeholder="" v-model="price">
      </p>
    </div>

    <div class="field is-grouped" style="padding-top:10px;">
      <div style="padding-right:20px;">
        <label class="label">Guest Count</label>
        <div class="select">
          <select v-model="guestCount">
            <option>1 guest</option>
            <option>2 guests</option>
            <option>3 guests</option>
            <option>4 guests</option>
            <option>5 guests</option>
            <option>6 guests</option>
            <option>7 guests</option>
            <option>8 guests</option>
            <option>9 guests</option>
            <option selected="selected">10 guests</option>
            <option>11 guests</option>
            <option>12 guests</option>
            <option>13 guests</option>
            <option>14 guests</option>
            <option>15 guests</option>
            <option>16 guests</option>
            <option>17 guests</option>
            <option>18 guests</option>
            <option>19 guests</option>
            <option>20 guests</option>
          </select>
        </div>
      </div>

      <div>
        <label class="label">Latest Booking Time</label>
        <div class="select">
          <select v-model="latestBookingTime">
            <option>1 hour before</option>
            <option>2 hours before</option>
            <option>3 hours before</option>
            <option>4 hours before</option>
            <option>5 hours before</option>
            <option>6 hours before</option>
            <option>7 hours before</option>
            <option>8 hours before</option>
            <option>9 hours before</option>
            <option>10 hours before</option>
            <option>11 hours before</option>
            <option>12 hours before</option>
            <option>2 days before</option>
            <option>3 days before</option>
            <option>4 days before</option>
            <option>5 days before</option>
            <option>6 days before</option>
            <option>1 week before</option>
          </select>
        </div>
      </div>
    </div>

    <div class="field is-grouped" style="padding-top:10px;">
      <div style="padding-right:20px;">
        <label class="label">Main Category</label>
        <div class="select">
          <select v-model="mainCategory">
            <option>Classes & Workshops</option>
            <option>Arts</option>
            <option>Food & Drinks</option>
            <option>Sports & Fitness</option>
            <option>Nature</option>
            <option>History & Culture</option>
            <option>Health & Wellness</option>
            <option>Music</option>
            <option>Nightlife</option>
            <option>Personalities</option>
            <option>Social</option>
          </select>
        </div>
      </div>

      <div>
        <label class="label">Secondary Category</label>
        <div class="select">
          <select v-model="secondaryCategory">
            <option>Classes & Workshops</option>
            <option>Arts</option>
            <option>Food & Drinks</option>
            <option>Sports & Fitness</option>
            <option>Nature</option>
            <option>History & Culture</option>
            <option>Health & Wellness</option>
            <option>Music</option>
            <option>Nightlife</option>
            <option>Personalities</option>
            <option>Social</option>
          </select>
        </div>
      </div>
    </div>

    <hr/>

    <div>
      <label class="label">Cancellation Policy</label>
      <div class="select">
        <select v-model="cancellationPolicy">
          <option>Flexible</option>
          <option>Moderate</option>
          <option>Strict</option>
        </select>
      </div>
    </div>

    <hr/>

    <div class="field is-grouped" style="padding-bottom:50px;">
      <div class="control">
        <button class="button is-link" @click="createExperience">Create</button>
      </div>
      <div class="control">
        <nuxt-link class="button is-text" to="/dashboard">Cancel</nuxt-link>
      </div>
    </div>

  </div>
</template>

<script>
import { auth } from '~/plugins/firebase'
export default {
  data() {
    return {
      title: '',
      tagline: '',
      label: '',
      duration: '1 hour',
      language: 'English',
      aboutHost: '',
      whatWeDo: '',
      whatIProvide: '',
      whereWeBe: '',
      notes: '',
      locationName: '',
      aptSuiteBuilding: '',
      streetAddress: '',
      zipcode: '',
      city: 'Singapore',
      country: 'Singapore',
      minimumAge: '12',
      kidsAllowed: 'Yes',
      alcohol: 'No',
      verification: 'No',
      currency: 'SGD',
      price: '',
      guestCount: '10 guests',
      latestBookingTime: '1 hour before',
      mainCategory: '',
      secondaryCategory: '',
      cancellationPolicy: 'Flexible'
    }
  },
  methods: {
    createExperience() {
      console.log('label', this.label)
    }
  },
  created() {
    auth.onAuthStateChanged(user => {
      if (!user) {
        this.$router.replace('/')
      }
    })
  }
}
</script>

