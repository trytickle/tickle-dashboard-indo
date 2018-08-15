<template>
  <div class="container" style="padding:20px;max-width:800px;">
    <div v-if="isEditMode">

    </div>
    <div v-else>
      <div class="image" style="position:absolute;left:-220px;">
        <img class="is-rounded" style="object-fit:cover;width:200px;height:200px;" :src="imageUrl">
      </div>
      <div class="content" style="padding-bottom:20px;">
        <p>
          <label class="label" style="margin-bottom:0px;">Title</label>
          <span class="title is-4">{{experience.title}}</span>
        </p>
        <p>
          <label class="label" style="margin-bottom:0px;">Host</label>
          <nuxt-link :to="'/user/' + userData.userId">{{userData.firstName}} {{userData.lastName}}</nuxt-link>
        </p>
        <hr>
        <p>
          <label class="label" style="margin-bottom:0px;">Tagline</label>
          <span>{{experience.tagline}}</span>
        </p>
        <p>
          <label class="label" style="margin-bottom:0px;">Subtitle</label>
          <span>{{experience.subtitle}}</span>
        </p>
        <p>
          <label class="label" style="margin-bottom:0px;">Duration</label>
          <span>{{experience.maxDuration ? experience.maxDuration/60 : 0}} hours</span>
        </p>
        <p>
          <label class="label" style="margin-bottom:0px;">Language</label>
          <span>{{experience.languages[0] ? experience.languages[0] : ''}}</span>
        </p>
        <hr>
        <p>
          <label class="label" style="margin-bottom:0px;">About Host</label>
          <span>{{experience.aboutHost.description}}</span>
        </p>
        <hr>
        <p>
          <label class="label" style="margin-bottom:0px;">What We'll Do</label>
          <span>{{experience.whatWeDo}}</span>
        </p>
        <p>
          <label class="label" style="margin-bottom:0px;">What I'll Provide</label>
          <span>{{experience.whatIProvide}}</span>
        </p>
        <p>
          <label class="label" style="margin-bottom:0px;">Where We'll Be</label>
          <span>{{experience.whereWeBe}}</span>
        </p>
        <p>
          <label class="label" style="margin-bottom:0px;">Notes</label>
          <span>{{experience.notes ? experience.notes : '-'}}</span>
        </p>
        <hr>
        <p>
          <label class="label" style="margin-bottom:0px;">Location Name</label>
          <span>{{experience.whereWeMeet.locationName}}</span>
        </p>
        <p>
          <label class="label" style="margin-bottom:0px;">Apartment/Suite/Building</label>
          <span>{{experience.whereWeMeet.aptSuiteBuilding}}</span>
        </p>
        <p>
          <label class="label" style="margin-bottom:0px;">Street Address</label>
          <span>{{experience.whereWeMeet.streetAddress}}</span>
        </p>
        <p>
          <label class="label" style="margin-bottom:0px;">Zipcode</label>
          <span>{{experience.whereWeMeet.zipcode}}</span>
        </p>
        <p>
          <label class="label" style="margin-bottom:0px;">City</label>
          <span>{{experience.whereWeMeet.city}}</span>
        </p>
        <p>
          <label class="label" style="margin-bottom:0px;">Country</label>
          <span>{{experience.whereWeMeet.country}}</span>
        </p>
        <hr>
        <p>
          <label class="label" style="margin-bottom:0px;">Minimum Age</label>
          <span>{{experience.guestRequirements.minimumAge}}</span>
        </p>
        <p>
          <label class="label" style="margin-bottom:0px;">Kids?</label>
          <span>{{experience.guestRequirements.kidsAllowed}}</span>
        </p>
        <p>
          <label class="label" style="margin-bottom:0px;">Alcohol?</label>
          <span>{{experience.guestRequirements.servesAlcohol}}</span>
        </p>
        <p>
          <label class="label" style="margin-bottom:0px;">Verification?</label>
          <span>{{experience.guestRequirements.requireVerified}}</span>
        </p>
        <p>
          <label class="label" style="margin-bottom:0px;">Additional Requirements</label>
          <span>{{experience.guestRequirements.additionalRequirements}}</span>
        </p>
        <p>
          <label class="label" style="margin-bottom:0px;">Special Certifications</label>
          <span>{{experience.guestRequirements.specialCertifications}}</span>
        </p>
        <hr>
        <p>
          <label class="label" style="margin-bottom:0px;">Price</label>
          <span>{{experience.pricePerPax/100}} SGD</span>
        </p>
        <p>
          <label class="label" style="margin-bottom:0px;">Max Guest Count</label>
          <span>{{experience.maxGuestCount}}</span>
        </p>
        <p>
          <label class="label" style="margin-bottom:0px;">Latest Booking Time</label>
          <span>{{experience.bookingOptions.bookBefore/24}} days before</span>
        </p>
        <p>
          <label class="label" style="margin-bottom:0px;">Main Category</label>
          <span>{{categoryPrimaryTitle}}</span>
        </p>
        <p>
          <label class="label" style="margin-bottom:0px;">Secondary Category</label>
          <span>{{categorySecondaryTitle}}</span>
        </p>
        <hr>
        <p>
          <label class="label" style="margin-bottom:0px;">Cancellation Policy</label>
          <span>{{cancellationPolicyTitle}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { auth, db } from '~/plugins/firebase'

export default {
  data() {
    return {
      experienceId: this.$route.params.experienceId,
      experience: {
        aboutHost: {},
        whereWeMeet: {},
        guestRequirements: {},
        bookingOptions: {},
        languages: []
      },
      userData: {},
      categoryPrimaryTitle: '',
      categorySecondaryTitle: ''
    }
  },
  computed: {
    isEditMode() {
      if (this.$route.query.isEditMode) {
        return this.$route.query.isEditMode
      } else {
        return false
      }
    },
    cancellationPolicyTitle() {
      if (this.experience.cancellationPolicy === 0) {
        return 'Flexible'
      } else if (this.experience.cancellationPolicy === 1) {
        return 'Moderate'
      } else {
        return 'Strict'
      }
    },
    imageUrl() {
      if (this.experience.media && this.experience.media[0]) {
        return this.experience.media[0]
      } else {
        return '/profile.png'
      }
    }
  },
  methods: {
    async fetchData() {
      let collectionPath = 'experiences'  
      if (this.$route.query.isSubmission) {
        collectionPath = 'submissions'
      }
      const expSnap = await db.collection(collectionPath).doc(this.experienceId).get()
      this.experience = expSnap.data()

      const userSnap = await db.collection('users').doc(this.experience.aboutHost.hostId).get()
      this.userData = userSnap.data()

      const catPriSnap = await db.collection('categories').where('categoryId', '==', this.experience.categoryPrimary).limit(1).get()
      this.categoryPrimaryTitle = catPriSnap.docs[0].data().title

      const catSecSnap = await db.collection('categories').where('categoryId', '==', this.experience.categorySecondary).limit(1).get()
      this.categorySecondaryTitle = catSecSnap.docs[0].data().title
    }
  },
  created() {
    auth.onAuthStateChanged(user => {
      if (!user) {
        this.$router.push('/')
      } else {
        this.fetchData()
      }
    })
  }
}
</script>
