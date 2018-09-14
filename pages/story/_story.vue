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
    <div :class="{'photo-image': coverImage, 'photo-element': !coverImage}" @click="pickPhoto(0, 'add')">
        <div class="image-wrapper">
            <div class="buttons-wrapper">
            <div class="photo-action-button" @click.stop="pickPhoto(0, 'remove')">Remove</div>
            <div class="photo-action-button" @click.stop="pickPhoto(0, 'add')">Replace</div>
            </div>
            <img :src=coverImage>
        </div>
    </div>
          <p class="title is-3">Artical Images</p>
     <div class="photo-grid">
        <div :class="{'photo-image': url1, 'photo-element': !url1}" @click="pickPhoto(1, 'add')">
            <div class="image-wrapper">
              <div class="buttons-wrapper">
                <div class="photo-action-button" @click.stop="pickPhoto(1, 'remove')">Remove</div>
                <div class="photo-action-button" @click.stop="pickPhoto(1, 'add')">Replace</div>
              </div>
              <img :src=url1>
            </div>
          </div>
        <div :class="{'photo-image': url2, 'photo-element': !url2}" @click="pickPhoto(2, 'add')">
            <div class="image-wrapper">
              <div class="buttons-wrapper">
                <div class="photo-action-button" @click.stop="pickPhoto(2, 'remove')">Remove</div>
                <div class="photo-action-button" @click.stop="pickPhoto(2, 'add')">Replace</div>
              </div>
              <img :src=url2>
            </div>
          </div>
        <div :class="{'photo-image': url3, 'photo-element': !url3}" @click="pickPhoto(3, 'add')">
            <div class="image-wrapper">
              <div class="buttons-wrapper">
                <div class="photo-action-button" @click.stop="pickPhoto(3, 'remove')">Remove</div>
                <div class="photo-action-button" @click.stop="pickPhoto(3, 'add')">Replace</div>
              </div>
              <img :src=url3>
            </div>
          </div>
      </div>
      <div class="photo-grid">
        <p v-text="url1" style="word-break: break-all; margin:15px" width="180px"></p>   
        <p v-text="url2" style="word-break: break-all; margin:15px" width="180px">  </p> 
        <p v-text="url3" style="word-break: break-all; margin:15px" width="180px">  </p>     
      </div>
        <div class="field">
            <label class="label">Start your story here</label>
            <div class="control">
                <textarea  id= "markdown" class="CodeMirror" style="height:400px;" placeholder="" v-model="body"></textarea>
            </div>
         </div>  
         <button class="button is-link" @click="updateStory()">{{updateButtonText}}</button> 
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
        story: null,
        updateButtonText: 'Update Story'
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
    pickPhoto(index, action) {
        this.selectedIndex = index;
        if (action == 'add') {
            this.$refs.picker.click();
        } else {
             switch (this.selectedIndex) {
                case 0:
                    this.coverImage = '/image.png'
                    break;
                case 1:
                    this.url1 = '/image.png'
                    break;
                case 2:
                    this.url2 = '/image.png'
                    break;
                case 3:
                    this.url3 = '/image.png'   
                    break;    
            }
        }
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
            this.$router.push('/stories')
        } catch(error) {
            console.log(error)
        }
    },
    async updateStory() {
        try {
            this.updateButtonText = 'Updating...'
        const images = [this.url1, this.url2, this.url3]
        const obj = { title: this.title, body: this.editor.value(), coverPhotoUrl: this.coverImage ? this.coverImage : "", images: images, timestamp: new Date().getTime() }

        await db.collection('stories').doc(this.storyId).update(obj);
        console.log("Update done")
        this.updateButtonText = "Update Story"
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
            targetWidth = 350
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
.photo-element {
  margin-top: 30px;
  width: 200px;
  height: 300px;
  border: 1px solid #dddddd;
  border-radius: 4px;
  display: grid;
  justify-content: center;
  align-items: center;  
  cursor: pointer;
  content: url('/images/image.png');
  object-fit: none;
  transition: 0.2s ease-in;
  background-position: center;
  box-shadow: 0px 5px rgba(0,0,0,0.3);
}
.photo-element:hover {
  background-color: #dddddd;
  transform: perspective(9999px) rotateX(15deg) rotateY(15deg);
}
.cover-photo-wrapper {
  display: grid;
  grid-column-gap: 20px;
  grid-template-columns: 200px 200px;
}
.photo-image {
  margin-top: 30px;
  width: 200px;
  height: 300px;
  border: 1px solid #dddddd;
  border-radius: 4px;
  display: grid;
  justify-content: center;
  align-items: center;  
  cursor: pointer;
  transition: 0.2s ease-in;
  background-position: center;
  box-shadow: 0px 5px rgba(8, 192, 255, 1);
  background-color: black;
}
.photo-landscape-preview {
  margin-top: 30px;
  width: 300px;
  height: 200px;
  border: 1px solid #dddddd;
  border-radius: 4px;
  background-color: #dddddd;
  overflow: hidden;
}
.image-wrapper {
  position: relative;
}
.image-wrapper img {
  width: 200px;
  height: 300px;
  transition: 0.2s ease-in;
  object-fit: cover;
}
.photo-image:hover {
  border: 1px solid rgba(0,0,0,0.5);
}
.image-wrapper img:hover {
  border: 0px solid rgba(0,0,0,0.5);
}
.photo-actions {
  width: 200px;
  height: 300px;
  border-radius: 4px;
  display: grid;
  justify-content: center;
  align-items: center;  
  transition: 0.2s ease-in;
  background-color: rgba(0,0,0,1);
}
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, 250px);
}
.photo-caption {
  margin-top: 20px;
  margin-right: 30px;
}
.buttons-wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 10;
  transition: 0.2s ease-in;
  background-color: rgba(0,0,0,0);
  opacity: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.buttons-wrapper:hover {
  opacity: 1;
  background-color: rgba(0,0,0,0.5);
  cursor: auto;
}
.photo-action-button {
  height: 40px;
  width: 70%;
  border: 1px solid white;
  color: white;
  border-radius: 5px;
  display: grid;
  align-items: center;
  justify-items: center;
  margin: 5px;
}
.photo-action-button:hover {
  height: 40px;
  width: 70%;
  color: black;
  background-color: white;
  border-radius: 4px;
  display: grid;
  align-items: center;
  justify-items: center;
  margin: 5px;
  cursor: pointer
}
</style>
