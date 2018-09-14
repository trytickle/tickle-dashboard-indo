<template>
  <div >
    <div class="device-wrapper">
      <div class="div-block-6 headerSection" id="top">
        <div class="image-wrapper" v-if="this.$parent.coverImage !== null"><img :src="this.$parent.coverImage" alt="photo"></div>
       </div>
      <div class="content-section">
        <h1 v-text="this.$parent.title"></h1>
        <br>
        <p class="paragraph-5" style="margin-top:-10px;" v-html="this.$parent.bodyPreview">'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.'</p>
        <div class="div-block-8"></div>
      </div>
      <br>
        <button style="button">Checkout experience</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPhoto: 0,
      showLeftArrow: false,
      showRightArrow: false,
      photos: [null],
      map: null
    }
  },
  watch: {

  },
  methods: {
    scrollTo(id) {
      document.getElementById(id).scrollIntoView({ behavior: 'smooth' })
    }
  },
  created() {

  },
  mounted() {

  },
  computed: {

    },
}
</script>

<style scoped>
.headerSection {
  position: relative;
  width: 100%;
  height: 300px;
  padding: 40px 40px 30px;
  background-image: -webkit-linear-gradient(321deg, #e706e7 -1%, #e706e7 0%, #e706e7 0, #bf15f5 0, #bf15f5 18%, #f34769 98%);
  background-image: linear-gradient(129deg, #e706e7 -1%, #e706e7 0%, #e706e7 0, #bf15f5 0, #bf15f5 18%, #f34769 98%);
  border-radius: 10px 10px 0 0;
  overflow: hidden;
}
.image-wrapper {
  position: absolute;
  width: 100%;
  height: 300px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: black;
}
.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.6;
}
.header-text-wrapper {
  position: relative;
  z-index: 1;
}
.device-wrapper {
  position: relative;
  overflow: scroll;
  height: 100%;
  padding: 0px 0px 80px;
  border: 1px solid #e2e2e2;
  border-radius: 10px;
  box-shadow: 0 10px 20px -9px rgba(0, 0, 0, .15);
}
.image-gallery-arrow-right {
  position: absolute;
  right: 10px;
  top: calc(100% / 2);
  color: rgba(255,255,255,0.2);
}
.image-gallery-arrow-right:hover {
  color: rgba(255,255,255,0.8);
  cursor: pointer;
}
.image-gallery-arrow-left {
  position: absolute;
  left: 10px;
  top: calc(100% / 2);
  color: rgba(255,255,255,0.2);
}
.image-gallery-arrow-left:hover {
  color: rgba(255,255,255,0.8);
  cursor: pointer;
}
.map-wrapper {
  position: relative;
  width: 100%;
  height: 250px;
  background: #eee url(/images/map.png) 93% 90%;
  background-repeat: no-repeat;
}
.map-item {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(8, 192, 255, 0.5);
  display: grid;
  align-items: center;
  justify-items: center;
}
.map-item-label {
  position: absolute;
  width: 100%;
  height: 100%;
  display: grid;
  align-items: center;
  justify-items: center;
}
.map-label {
  position: absolute;
  max-width: 80%;
  max-height: 60px;
  margin-top: -150px;
  background-color: white;
  color: black;
  padding: 10px 15px 10px 15px;;
  border-radius: 8px;
}
.map-label:after {
  content:'';
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -8px;
  width: 0;
  height: 0;
  border-top: solid 8px #fff;
  border-left: solid 8px transparent;
  border-right: solid 8px transparent;
}
</style>
