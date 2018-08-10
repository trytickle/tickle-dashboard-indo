<template>
  <div class="container" style="padding:20px;max-width:640px;margin:auto;">
    <p class="title is-3">Create Experience</p>
    <p class="subtitle is-5">This creates an experience submission (not live)</p>

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
            <option :value=60>1 hour</option>
            <option :value=120>2 hours</option>
            <option :value=180>3 hours</option>
            <option :value=240>4 hours</option>
            <option :value=300>5 hours</option>
            <option :value=360>> 5 hours</option>
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
            <option :value=5>5</option>
            <option :value=6>6</option>
            <option :value=7>7</option>
            <option :value=8>8</option>
            <option :value=9>9</option>
            <option :value=10>10</option>
            <option :value=11>11</option>
            <option :value=12 selected="selected">12</option>
            <option :value=13>13</option>
            <option :value=14>14</option>
            <option :value=15>15</option>
            <option :value=16>16</option>
            <option :value=17>17</option>
            <option :value=18>18</option>
            <option :value=19>19</option>
            <option :value=20>20</option>
            <option :value=21>21</option>
          </select>
        </div>
      </div>

      <div style="padding-right:20px;">
        <label class="label">Kids?</label>
        <div class="select">
          <select v-model="kidsAllowed">
            <option :value=true>Yes</option>
            <option :value=false>No</option>
          </select>
        </div>
      </div>

      <div style="padding-right:20px;">
        <label class="label">Alcohol?</label>
        <div class="select">
          <select v-model="alcohol">
            <option :value=true>Yes</option>
            <option :value=false selected="selected">No</option>
          </select>
        </div>
      </div>

      <div>
        <label class="label">Verification?</label>
        <div class="select">
          <select v-model="verification">
            <option :value=true>Yes</option>
            <option :value=false selected="selected">No</option>
          </select>
        </div>
      </div>
    </div>

    <div class="field" style="padding-top:10px;">
      <label class="label">Additional Requirements</label>
      <div class="control">
        <textarea class="textarea" placeholder="" v-model="additionalRequirements"></textarea>
      </div>
    </div>

    <div class="field" style="padding-top:10px;">
      <label class="label">Special Certifications</label>
      <div class="control">
        <textarea class="textarea" placeholder="" v-model="specialCertifications"></textarea>
      </div>
    </div>

    <hr/>

    <label class="label">
      Cover Photo<br>
      <small>Photo will not be autoresized. Make sure to resize and compress it before upload.</small>
    </label>
    <div class="file has-name is-fullwidth">
      <label class="file-label">
        <input class="file-input" type="file" name="resume" @change="onFileChange">
        <span class="file-cta">
          <span class="file-icon">
            <i class="fas fa-upload"></i>
          </span>
          <span class="file-label">
            Choose a file...
          </span>
        </span>
        <span class="file-name">{{fileName}}</span>
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
        <input class="input" type="number" placeholder="" v-model.number="price">
      </p>
    </div>

    <div class="field is-grouped" style="padding-top:10px;">
      <div style="padding-right:20px;">
        <label class="label">Guest Count</label>
        <div class="select">
          <select v-model="guestCount">
            <option :value=1>1 guest</option>
            <option :value=2>2 guests</option>
            <option :value=3>3 guests</option>
            <option :value=4>4 guests</option>
            <option :value=5>5 guests</option>
            <option :value=6>6 guests</option>
            <option :value=7>7 guests</option>
            <option :value=8>8 guests</option>
            <option :value=9>9 guests</option>
            <option :value=10 selected="selected">10 guests</option>
            <option :value=11>11 guests</option>
            <option :value=12>12 guests</option>
            <option :value=13>13 guests</option>
            <option :value=14>14 guests</option>
            <option :value=15>15 guests</option>
            <option :value=16>16 guests</option>
            <option :value=17>17 guests</option>
            <option :value=18>18 guests</option>
            <option :value=19>19 guests</option>
            <option :value=20>20 guests</option>
          </select>
        </div>
      </div>

      <div>
        <label class="label">Latest Booking Time</label>
        <div class="select">
          <select v-model="latestBookingTime">
            <option :value=1>1 hour before</option>
            <option :value=2>2 hours before</option>
            <option :value=3>3 hours before</option>
            <option :value=4>4 hours before</option>
            <option :value=5>5 hours before</option>
            <option :value=6>6 hours before</option>
            <option :value=7>7 hours before</option>
            <option :value=8>8 hours before</option>
            <option :value=9>9 hours before</option>
            <option :value=10>10 hours before</option>
            <option :value=11>11 hours before</option>
            <option :value=12>12 hours before</option>
            <option :value=48>2 days before</option>
            <option :value=72>3 days before</option>
            <option :value=96>4 days before</option>
            <option :value=120>5 days before</option>
            <option :value=144>6 days before</option>
            <option :value=168>1 week before</option>
          </select>
        </div>
      </div>
    </div>

    <div class="field is-grouped" style="padding-top:10px;">
      <div style="padding-right:20px;">
        <label class="label">Main Category</label>
        <div class="select">
          <select v-model="mainCategory">
            <option :value=0>Classes & Workshops</option>
            <option :value=1>Arts</option>
            <option :value=2>Food & Drinks</option>
            <option :value=3>Sports & Fitness</option>
            <option :value=4>Nature</option>
            <option :value=5>History & Culture</option>
            <option :value=6>Health & Wellness</option>
            <option :value=7>Music</option>
            <option :value=8>Nightlife</option>
            <option :value=9>Personalities</option>
            <option :value=10>Social</option>
          </select>
        </div>
      </div>

      <div>
        <label class="label">Secondary Category</label>
        <div class="select">
          <select v-model="secondaryCategory">
            <option :value=0>Classes & Workshops</option>
            <option :value=1>Arts</option>
            <option :value=2>Food & Drinks</option>
            <option :value=3>Sports & Fitness</option>
            <option :value=4>Nature</option>
            <option :value=5>History & Culture</option>
            <option :value=6>Health & Wellness</option>
            <option :value=7>Music</option>
            <option :value=8>Nightlife</option>
            <option :value=9>Personalities</option>
            <option :value=10>Social</option>
          </select>
        </div>
      </div>
    </div>

    <hr/>

    <div>
      <label class="label">Cancellation Policy</label>
      <div class="select">
        <select v-model="cancellationPolicy">
          <option :value=0>Flexible</option>
          <option :value=1>Moderate</option>
          <option :value=2>Strict</option>
        </select>
      </div>
    </div>

    <hr/>

    <div class="field" v-if="showError">
      <p class="help is-danger">{{ errorMessage }}</p>
    </div>

    <hr v-if="showError"/>

    <div class="field is-grouped" style="padding-bottom:50px;">
      <div class="control">
        <button class="button is-link is-loading" v-if="isLoading">Create</button>
        <button class="button is-link" @click="createExperience" v-else>Create</button>
      </div>
      <div class="control">
        <nuxt-link class="button is-text" to="/dashboard">Cancel</nuxt-link>
      </div>
    </div>

  </div>
</template>

<script>
import { auth, db, storage } from '~/plugins/firebase'

export default {
  data() {
    return {
      userId: '',
      title: '',
      tagline: '',
      label: 'Dinner party',
      duration: 60,
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
      minimumAge: 12,
      kidsAllowed: true,
      alcohol: false,
      verification: false,
      additionalRequirements: '',
      specialCertifications: '',
      currency: 'SGD',
      price: 20,
      guestCount: 10,
      latestBookingTime: 1,
      mainCategory: 0,
      secondaryCategory: 0,
      cancellationPolicy: 0,
      isLoading: false,
      showError: false,
      errorMessage: '',
      fileName: '',
      coverPhotoImage: null,
      coverPhotoUrl: ''
    }
  },
  methods: {
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.createImage(files[0])
    },
    createImage(file) {
      this.fileName = file.name
      this.coverPhotoImage = file
    },
    async uploadImage(submissionId) {
      this.isLoading = true
      try {
        const name = String(Date.now())
        const uploadRef = storage.child(`media/submissions/${submissionId}`).child(`${name}.jpg`)
        const metadata = {
          contentType: 'image/jpeg',
          customMetadata: {
            'Uploaded': Date().toString()
          }
        }
        const uploadTask = await uploadRef.put(this.coverPhotoImage, metadata)
        const downloadUrl = await uploadTask.ref.getDownloadURL()
        this.coverPhotoUrl = downloadUrl
        console.log('Upload image successful', `${name}.jpg`, downloadUrl)
      } catch (error) {
        console.error(error.message)
      }
      this.isLoading = false
    },
    async createExperience() {
      const body = {
        userId: this.userId,
        title: this.title,
        tagline: this.tagline,
        subtitle: this.label,
        maxDuration: this.duration,
        languages: [this.language],
        aboutHost: this.aboutHost,
        whatWeDo: this.whatWeDo,
        whatIProvide: this.whatIProvide,
        whereWeBe: this.whereWeBe,
        notes: this.notes,
        city: this.city,
        whereWeMeet: {
          locationName: this.locationName,
          aptSuiteBuilding: this.aptSuiteBuilding,
          streetAddress: this.streetAddress,
          zipcode: this.zipcode,
          city: this.city,
          country: this.country,
          lat: 1.3521,
          lng: 103.8198
        },
        bookingOptions: {
          bookBefore: this.latestBookingTime
        },
        guestRequirements: {
          minimumAge: this.minimumAge,
          kidsAllowed: this.kidsAllowed,
          servesAlcohol: this.alcohol,
          requireVerified: this.verification,
          additionalRequirements: this.additionalRequirements,
          specialCertifications: this.specialCertifications
        },
        currency: this.currency,
        pricePerPax: this.price * 100,
        maxGuestCount: this.guestCount,
        categoryPrimary: this.mainCategory,
        categorySecondary: this.secondaryCategory,
        cancellationPolicy: this.cancellationPolicy
      }

      this.showError = false
      this.isLoading = true

      try {
        const { submissionData } = await this.$axios.$post('https://us-central1-tickle-development.cloudfunctions.net/createSubmission', body)
        if (this.coverPhotoImage) {
          await this.uploadImage(submissionData.submissionId)
          await db.collection('submissions').doc(submissionData.submissionId).update({
            media: [this.coverPhotoUrl]
          })
        }
        console.log('New submission created', submissionData)
        this.$router.replace('/dashboard')
      } catch (error) {
        this.showError = true
        this.errorMessage = error.message
      }

      this.isLoading = false
    }
  },
  created() {
    auth.onAuthStateChanged(user => {
      this.userId = user.uid
      if (!user) {
        this.$router.replace('/')
      }
    })
  }
}
</script>
