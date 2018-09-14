<template>
<section class="main-section">
    <div class="container" style="padding:20px;max-width:640px;">
        <p class="title is-3">Create New Story</p>
        <div class="field">
        <label class="label">Story Title</label>
        <div class="control">
            <input class="input" type="text" placeholder="" v-model="title">
        </div>
        </div>
    <input style="display:none" ref ="picker" type="file" name="pic" accept="image/*" @change="onFileChange">
     <div class="example-wrapper" style="gravity:center;">
          <p class="title is-3">Cover Image</p>
          <img :src= coverImage @click="pickPhoto(0)" width="180" height="250" class="image" style="object-fit:cover;">
            <p v-text= coverImage ></p>  
        </div>
          <p class="title is-3">Artical Images</p>
     <div class="photo-grid">
        <div class="example-wrapper">
          <img :src= url1 @click="pickPhoto(1)" width="180" height="250" class="image" style="object-fit:cover;">
          <p v-text= url1 width="180"></p>
        </div>
        <div class="example-wrapper">
          <img :src= url2 @click="pickPhoto(2)" width="180" height="250" class="image" style="object-fit:cover;">
          <p v-text= url2 width="180"></p>
        </div>
        <div class="example-wrapper">
          <img :src= url3 @click="pickPhoto(3)" width="180" height="250" class="image" style="object-fit:cover;">
          <p v-text= url3 width="180" ></p>
        </div>
      </div>
        <div class="field">
            <label class="label">Start your story here</label>
            <div class="control">
                <textarea  id= "markdown" class="CodeMirror" style="height:400px;" placeholder="" v-model="body"></textarea>
            </div>
         </div>  
         <button class="button is-link" @click="updateStory()">Update Story</button> 
         <button class="button " >Publish Story</button> 
         <button class="button " @click="deleteStory()">Delete Story</button> 
    </div>
        <device-view style="width:300px;"></device-view>
    </section>
</template>

<script>
import { db, storage } from "~/plugins/firebase";
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
        title: 'Your story title',
        body: '',
        bodyPreview: '',
        coverImage: "/image.png",
        url1: "/image.png",
        url2: "/image.png",
        url3: "/image.png",
        editor: null,
        selectedIndex: 0,
        story: null
    };
  },
  mounted() {
      this.initEditor()
  },
  created() {
      this.loadOrCreateStory();
  },

  methods: { 
    initEditor() {
        this.editor =  new SimpleMDE({ element: document.getElementById("markdown") })
        this.editor.codemirror.on("change", () => {
        this.bodyPreview = SimpleMDE.prototype.markdown(this.editor.value());
    })
    },
    pickPhoto(index) {
        this.selectedIndex = index;
        this.$refs.picker.click();
    },
    async loadOrCreateStory() {
        try {
            const storyDoc = await db.collection('stories').doc(this.storyId).get()
            if (storyDoc.exists) {
                const story = storyDoc.data();
                this.title = story.title;
                this.body = story.body;
                this.editor.value(story.body)
                this.coverImage = (story.coverPhotoUrl && story.coverPhotoUrl.length > 0) ? story.coverPhotoUrl : "/image.png"
                if (story.images && story.images.length > 1) {
                    this.url1 = story.images[0]
                    this.url2 = story.images[1]
                    this.url3 = story.images[2]
                }
            } else {
                const createdAt = new Date().getTime()
                await db.collection('stories').doc(this.storyId).set({storyId: this.storyId, title: "your story title", createdAt: createdAt, isPublished: false, timestamp: createdAt}) 
            }
        } catch (error) {
            console.log(error)
        }
    },
    async deleteStory() {
        try {
            await db.collection("stories").doc(this.storyId).delete()
            console.log("deleted")
        } catch(error) {
            console.log(error)
        }
    },
    async updateStory() {
        try {
        const images = [this.url1, this.url2, this.url3]
        const obj = { title: this.title, body: this.editor.value(), coverPhotoUrl: this.coverImage ? this.coverImage : "", images: images, timestamp: new Date().getTime() }

        await db.collection('stories').doc(this.storyId).update(obj);
        console.log("Update done")
        } catch (error) {
            console.log(error)
        }
  },
    async uploadImage(index, imageBlob) {
      //this.isLoading = true
      try {
        const name = String(Date.now())
        const uploadRef = storage.child(`media/stories/${this.storyId}`).child(`${name}.jpg`)
        const metadata = {
          contentType: 'image/jpeg',
          customMetadata: {
            'Uploaded': Date().toString()
          }
        }
        const uploadTask = await uploadRef.put(imageBlob, metadata)
        const downloadUrl = await uploadTask.ref.getDownloadURL()
            switch (this.selectedIndex) {
                case 0:
                    this.coverImage = downloadUrl
                    break;
                case 1:
                    this.url1 = downloadUrl
                    break;
                case 2:
                    this.url2 = downloadUrl
                    break;
                case 3:
                    this.url3 = downloadUrl   
                    break;    
            }
        console.log('Upload image successful', `${name}.jpg`, downloadUrl)
      } catch (error) {
        console.error(error.message)
      }
     // this.isLoading = false
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
                    this.uploadImage(this.selectedIndex, outputFile)
                    break;
                case 1:
                    this.url1 = resizedFilePath
                    this.uploadImage(this.selectedIndex, outputFile)
                    break;
                case 2:
                    this.url2 = resizedFilePath
                    this.uploadImage(this.selectedIndex, outputFile)
                    break;
                case 3:
                    this.url3 = resizedFilePath   
                    this.uploadImage(this.selectedIndex, outputFile)
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
