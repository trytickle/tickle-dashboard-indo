<template>
  <section class="main-grid">
    <div style="padding:40px;">
      <p class="title is-3">Create Story</p>
      <div style="display:grid;grid-template-columns:2fr 1fr;grid-column-gap:20px;">
        <div class="field">
          <label class="label">Story Title</label>
          <div class="control">
            <input class="input" type="text" placeholder="Title" v-model="title">
          </div>
        </div>
        <div class="field">
          <label class="label">Experience ID</label>
          <div class="control">
            <input class="input" type="text" placeholder="Experience ID" v-model="experienceId">
          </div>
        </div>
      </div>
      <input style="display:none" ref ="picker" type="file" name="pic" accept="image/*" @change="onFileChange">
      <div class="example-wrapper" style="margin-top:20px;margin-bottom:20px;">
        <label class="label">Cover Photo</label>
        <img :src="coverImage" @click="pickPhoto(0)" width="180" height="250" class="image" style="object-fit:cover;">
        <button class="button" style="width:100%;margin-top:10px;">Upload</button>
        <button class="button" style="width:100%;margin-top:5px;">Delete</button>
      </div>
      <label class="label">Media Photos</label>
      <div class="photo-grid" style="margin-bottom:20px;">
        <div class="example-wrapper">
          <img :src= url1 @click="pickPhoto(1)" width="180" height="250" class="image" style="object-fit:cover;border-radius:3px;">
          <button class="button" style="width:100%;margin-top:10px;">Upload</button>
          <button class="button" style="width:100%;margin-top:5px;">Copy Link</button>
          <button class="button" style="width:100%;margin-top:5px;">Delete</button>
        </div>
        <div class="example-wrapper">
          <img :src="url2" @click="pickPhoto(2)" width="180" height="250" class="image" style="object-fit:cover;border-radius:3px;">
          <button class="button" style="width:100%;margin-top:10px;">Upload</button>
          <button class="button" style="width:100%;margin-top:5px;">Copy Link</button>
          <button class="button" style="width:100%;margin-top:5px;">Delete</button>
        </div>
        <div class="example-wrapper">
          <img :src="url3" @click="pickPhoto(3)" width="180" height="250" class="image" style="object-fit:cover;border-radius:3px;">
          <button class="button" style="width:100%;margin-top:10px;">Upload</button>
          <button class="button" style="width:100%;margin-top:5px;">Copy Link</button>
          <button class="button" style="width:100%;margin-top:5px;">Delete</button>
        </div>
      </div>
      <div class="field">
        <label class="label">Body</label>
        <div class="control">
          <textarea  id= "markdown" class="CodeMirror" style="height:400px;" placeholder="" v-model="body"></textarea>
        </div>
      </div>  
      <button class="button is-info" style="margin-right:20px;padding:10px;padding-left:40px;padding-right:40px;height:auto;width:auto;" @click="updateStory()">Save Story</button> 
      <button class="button is-danger" style="padding:10px;padding-left:20px;padding-right:20px;height:auto;width:auto;" @click="deleteStory()">Delete</button>
    </div>
    <device-view style="width:400px;height:85vh;"></device-view>
  </section>
</template>

<script>
import { db, storage } from "~/plugins/firebase";
import SimpleMDE from "simplemde";
import deviceView from "@/components/device-view.vue";
import { resizeImageWidth } from "~/assets/utility";

export default {
  components: {
    deviceView
  },
  data() {
    return {
      storyId: this.$nuxt.$route.path.replace("/story/", ""),
      title: "Your story title",
      experienceId: null,
      body: "",
      bodyPreview: "",
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
    this.initEditor();
  },
  created() {
    this.loadOrCreateStory();
  },

  methods: {
    initEditor() {
      this.editor = new SimpleMDE({
        element: document.getElementById("markdown")
      });
      this.editor.codemirror.on("change", () => {
        this.bodyPreview = SimpleMDE.prototype.markdown(this.editor.value());
      });
    },
    pickPhoto(index) {
      this.selectedIndex = index;
      this.$refs.picker.click();
    },
    async loadOrCreateStory() {
      try {
        const storyDoc = await db
          .collection("stories")
          .doc(this.storyId)
          .get();
        if (storyDoc.exists) {
          const story = storyDoc.data();
          this.title = story.title;
          this.body = story.body;
          this.editor.value(story.body);
          this.coverImage =
            story.coverPhotoUrl && story.coverPhotoUrl.length > 0
              ? story.coverPhotoUrl
              : "/image.png";
          if (story.images && story.images.length > 1) {
            this.url1 = story.images[0];
            this.url2 = story.images[1];
            this.url3 = story.images[2];
          }
        } else {
          const createdAt = new Date().getTime();
          await db
            .collection("stories")
            .doc(this.storyId)
            .set({
              storyId: this.storyId,
              title: "your story title",
              createdAt: createdAt,
              isPublished: false,
              timestamp: createdAt
            });
        }
      } catch (error) {
        console.log(error);
      }
    },
    async deleteStory() {
      try {
        await db
          .collection("stories")
          .doc(this.storyId)
          .delete();
        console.log("deleted");
      } catch (error) {
        console.log(error);
      }
    },
    async updateStory() {
      try {
        const images = [this.url1, this.url2, this.url3];
        const obj = {
          title: this.title,
          body: this.editor.value(),
          coverPhotoUrl: this.coverImage ? this.coverImage : "",
          images: images,
          timestamp: new Date().getTime()
        };

        await db
          .collection("stories")
          .doc(this.storyId)
          .update(obj);
        console.log("Update done");
      } catch (error) {
        console.log(error);
      }
    },
    async uploadImage(index, imageBlob) {
      //this.isLoading = true
      try {
        const name = String(Date.now());
        const uploadRef = storage
          .child(`media/stories/${this.storyId}`)
          .child(`${name}.jpg`);
        const metadata = {
          contentType: "image/jpeg",
          customMetadata: {
            Uploaded: Date().toString()
          }
        };
        const uploadTask = await uploadRef.put(imageBlob, metadata);
        const downloadUrl = await uploadTask.ref.getDownloadURL();
        switch (this.selectedIndex) {
          case 0:
            this.coverImage = downloadUrl;
            break;
          case 1:
            this.url1 = downloadUrl;
            break;
          case 2:
            this.url2 = downloadUrl;
            break;
          case 3:
            this.url3 = downloadUrl;
            break;
        }
        console.log("Upload image successful", `${name}.jpg`, downloadUrl);
      } catch (error) {
        console.error(error.message);
      }
      // this.isLoading = false
    },
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      let file = files[0];
      let targetWidth = 1024;
      if (this.selectedIndex > 0) {
        targetWidth = 350;
      }
      resizeImageWidth(file, targetWidth, (resizedFilePath, outputFile) => {
        console.log(outputFile);

        switch (this.selectedIndex) {
          case 0:
            this.coverImage = resizedFilePath;
            this.uploadImage(this.selectedIndex, outputFile);
            break;
          case 1:
            this.url1 = resizedFilePath;
            this.uploadImage(this.selectedIndex, outputFile);
            break;
          case 2:
            this.url2 = resizedFilePath;
            this.uploadImage(this.selectedIndex, outputFile);
            break;
          case 3:
            this.url3 = resizedFilePath;
            this.uploadImage(this.selectedIndex, outputFile);
            break;
        }
      });
    }
  }
};
</script>
<style scoped>
img {
  border-radius: 5px;
}
.main-grid {
  width: 90vw;
  margin: auto;
  display: grid;
  grid-template-columns: 800px 420px;
  grid-column-gap: 20px;
  justify-content: center;
}
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
