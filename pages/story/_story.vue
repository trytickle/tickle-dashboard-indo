<template>
<section class="main-section">
    <div class="container" style="padding:20px;max-width:640px;">
        <p class="title is-3">Create New Story</p>
        <div class="field">
        <label class="label">Story Title</label>
        <div class="control">
            <input class="input" type="text" placeholder="" v-model="storyTitle">
        </div>
        </div>
    <input style="display:none" ref ="picker" type="file" name="pic" accept="image/*" @change="onFileChange">
     <div class="example-wrapper" style="gravity:center;">
          <p class="title is-3">Cover Image</p>
          <img :src= coverImage @click="pickPhoto(0)" width="180" height="250" class="image" style="object-fit:cover;">
        </div>
     <div class="photo-grid">
        <div class="example-wrapper">
          <img :src= url1 @click="pickPhoto(1)" width="180" height="250" class="image" style="object-fit:cover;">
          <p v-text= url1 ></p>
        </div>
        <div class="example-wrapper">
          <img :src= url2 @click="pickPhoto(2)" width="180" height="250" class="image" style="object-fit:cover;">
          <p v-text= url2 ></p>
        </div>
        <div class="example-wrapper">
          <img :src= url3 @click="pickPhoto(3)" width="180" height="250" class="image" style="object-fit:cover;">
          <p v-text= url3 ></p>
        </div>
      </div>
        <div class="field">
            <label class="label">Start your story here</label>
            <div class="control">
                <textarea  id= "markdown" class="CodeMirror" style="height:400px;" placeholder="" v-model="body"></textarea>
            </div>
         </div>  
         <button class="button is-link">Create Story</button> 
    </div>
        <device-view style="width:300px;"></device-view>
    </section>
</template>

<script>
import { db } from "~/plugins/firebase";
import SimpleMDE from "simplemde"
import deviceView from '@/components/device-view.vue'
import { resizeImageWidth } from '~/assets/utility'

export default {
  components: {
    deviceView
   },
  data() {
    return {
        storyId: this.$nuxt.$route.path.replace('/story/',''),
        storyTitle: '',
        body: '',
        coverImage: "http://www.gstatic.com/webp/gallery/1.jpg",
        url1: "http://www.gstatic.com/webp/gallery/1.jpg",
        url2: "http://www.gstatic.com/webp/gallery/1.jpg",
        url3: "http://www.gstatic.com/webp/gallery/1.jpg",
        editor: null,
        selectedIndex: 0
    };
  },
  mounted() {
      this.initEditor()
  },

  methods: { 
    initEditor() {
        this.editor =  new SimpleMDE({ element: document.getElementById("markdown") })
        this.editor.codemirror.on("change", () => {
        this.body = SimpleMDE.prototype.markdown(this.editor.value());
    })
    },
    pickPhoto(index) {
        this.selectedIndex = index;
        this.$refs.picker.click();
    },
    onFileChange(e) {
        let files = e.target.files || e.dataTransfer.files
        if (!files.length) return
        let file = files[0]
        let targetWidth = 1024
        if (this.selectedIndex > 0) {
            targetWidth = 320
        }
        resizeImageWidth(file, targetWidth, (resizedFilePath, outputFile) => {
            console.log(outputFile);

            switch (this.selectedIndex) {
                case 0:
                    this.coverImage = resizedFilePath
                    break;
                case 1:
                    this.url1 = resizedFilePath
                    break;
                case 2:
                    this.url2 = resizedFilePath
                    break;
                case 3:
                    this.url3 = resizedFilePath   
                    break;    
            }

        })
    }
  }
}
</script>
<style scoped>
.image {
  opacity: 0.9;
}
.photo-grid {
  display: grid;
  grid-row-gap: 20px;

  grid-template-columns: repeat(auto-fit, 200px);
}
.example-wrapper {
  width: 180px;
}
</style>
