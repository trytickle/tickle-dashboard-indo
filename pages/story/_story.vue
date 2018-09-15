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
        <img :src="coverImage" @click="pickPhoto(0, 'add')" width="180" height="250" class="image" style="object-fit:cover;">
        <button class="button" style="width:100%;margin-top:10px;" @click="pickPhoto(0, 'add')">{{coverbuttonText}}</button>
        <button class="button" style="width:100%;margin-top:5px;" @click="pickPhoto(0, 'remove')" >Delete</button>
      </div>
      <label class="label">Media Photos</label>
      <div class="photo-grid" style="margin-bottom:20px;">
        <div class="example-wrapper">
          <img :src= url1 @click="pickPhoto(1, 'add')" width="180" height="250" class="image" style="object-fit:cover;border-radius:3px;">
          <button class="button" style="width:100%;margin-top:10px;"  @click="pickPhoto(1, 'add')">{{button1}}</button>
          <button class="button" style="width:100%;margin-top:5px;" @click="copyLink(1)">Copy Link</button>
          <button class="button" style="width:100%;margin-top:5px;" @click="pickPhoto(1, 'remove')">Delete</button>
        </div>
        <div class="example-wrapper">
          <img :src="url2" @click="pickPhoto(2, 'add')" width="180" height="250" class="image" style="object-fit:cover;border-radius:3px;">
          <button class="button" style="width:100%;margin-top:10px;"  @click="pickPhoto(2, 'add')" >{{button2}}</button>
          <button class="button" style="width:100%;margin-top:5px;" @click="copyLink(2)">Copy Link</button>
          <button class="button" style="width:100%;margin-top:5px;" @click="pickPhoto(2, 'remove')" >Delete</button>
        </div>
        <div class="example-wrapper">
          <img :src="url3" @click="pickPhoto(3, 'add')" width="180" height="250" class="image" style="object-fit:cover;border-radius:3px;">
          <button class="button" style="width:100%;margin-top:10px;"  @click="pickPhoto(3, 'add')" >{{button3}}</button>
          <button class="button" style="width:100%;margin-top:5px;" @click="copyLink(3)" >Copy Link</button>
          <button class="button" style="width:100%;margin-top:5px;" @click="pickPhoto(3, 'remove')" >Delete</button>
        </div>
      </div>
      <div class="field">
        <label class="label">Body</label>
        <div class="control">
          <textarea  id= "markdown" class="CodeMirror" style="height:400px;" placeholder="" v-model="body"></textarea>
        </div>
      </div>  
      <button class="button is-info" style="margin-right:20px;padding:10px;padding-left:40px;padding-right:40px;height:auto;width:auto;" @click="updateStory()">{{saveButtonText}}</button> 
      <button class="button is-danger" style="padding:10px;padding-left:20px;padding-right:20px;height:auto;width:auto;" @click="deleteStory()">Delete</button>
    </div>
    <device-view style="width:400px;height:85vh;"></device-view>
  </section>
</template>

<script>
import { db, storage, auth } from "~/plugins/firebase";
import SimpleMDE from "simplemde";
import deviceView from "@/components/device-view.vue";
import { resizeImageWidth } from "~/assets/utility";
import copy from "copy-to-clipboard";

export default {
  components: {
    deviceView
  },
  head() {
    return {
      script: [{ src: "../dist/clipboard.min.js" }]
    };
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
      coverbuttonText: "Upload",
      button1: "Upload",
      button2: "Upload",
      button3: "Upload",
      editor: null,
      selectedIndex: 0,
      story: null,
      saveButtonText: "Save Story",
      authorName: "",
      userId: ""
    };
  },
  mounted() {
    this.initEditor()
  },
  created() {
    this.loadOrCreateStory();
    this.loadUser();
  },

  methods: {
    async loadUser() {
      auth.onAuthStateChanged((async (user) => {
        if (user) {
          this.userId = user.uid
          console.log(this.userId)
          const userDoc = await db.collection("users").doc(user.uid).get()
          if (userDoc.exists) {
            const user = userDoc.data();
            this.authorName = user.firstName+" "+user.lastName
                  console.log(this.authorName)
          }
        }
      }))
    },
    initEditor() {
      this.editor = new SimpleMDE({
        element: document.getElementById("markdown"),
        spellChecker: false
      });
      this.editor.codemirror.on("change", () => {
        this.bodyPreview = SimpleMDE.prototype.markdown(this.editor.value());
      });
    },
    copyLink(index) {
      switch (index) {
        case 1:
          copy(this.url1);
          break;
        case 2:
          copy(this.url2);
          break;
        case 3:
          copy(this.url3);
          break;
      }
      alert("Copied");
    },
    pickPhoto(index, action) {
      this.selectedIndex = index;
      if (action === "add") {
        this.$refs.picker.click();
      } else {
        switch (this.selectedIndex) {
          case 0:
            this.coverImage = "/image.png";
            break;
          case 1:
            this.url1 = "/image.png";
            break;
          case 2:
            this.url2 = "/image.png";
            break;
          case 3:
            this.url3 = "/image.png";
            break;
        }
      }
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
          this.experienceId = story.experienceId ? story.experienceId : null
          this.editor.value(story.body);
          this.coverImage =
            story.coverPhotoUrl && story.coverPhotoUrl.length > 0
              ? story.coverPhotoUrl
              : "/image.png";
          if (story.images && story.images.length > 0) {
            this.url1 = story.images[0];
            this.url2 = story.images[1] ? story.images[1] : "/image.png";
            this.url3 = story.images[2] ? story.images[2] : "/image.png";
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
        this.$router.push("/stories");
      } catch (error) {
        console.log(error);
      }
    },
    async updateStory() {
      try {
        this.saveButtonText = "Saving Changes...";
        const images = [this.url1, this.url2, this.url3];
        const expId = this.experienceId ? this.experienceId : "";
        const obj = {
          title: this.title,
          userId: this.userId,
          authorName: this.authorName,
          body: this.editor.value(),
          coverPhotoUrl: this.coverImage ? this.coverImage : "",
          images: images,
          experienceId: expId,
          timestamp: new Date().getTime()
        };

        await db
          .collection("stories")
          .doc(this.storyId)
          .update(obj);
        console.log("Update done");
        this.saveButtonText = "Save Story";
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
            this.coverbuttonText = "Upload";
            break;
          case 1:
            this.url1 = downloadUrl;
            this.button1 = "Upload";
            break;
          case 2:
            this.url2 = downloadUrl;
            this.button2 = "Upload";
            break;
          case 3:
            this.url3 = downloadUrl;
            this.button3 = "Upload";
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
            this.coverbuttonText = "Uploading...";
            this.uploadImage(this.selectedIndex, outputFile);
            break;
          case 1:
            this.url1 = resizedFilePath;
            this.button1 = "Uploading...";
            this.uploadImage(this.selectedIndex, outputFile);
            break;
          case 2:
            this.url2 = resizedFilePath;
            this.button2 = "Uploading...";
            this.uploadImage(this.selectedIndex, outputFile);
            break;
          case 3:
            this.url3 = resizedFilePath;
            this.button3 = "Uploading...";
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
  content: url("/images/image.png");
  object-fit: none;
  transition: 0.2s ease-in;
  background-position: center;
  box-shadow: 0px 5px rgba(0, 0, 0, 0.3);
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
  border: 1px solid rgba(0, 0, 0, 0.5);
}
.image-wrapper img:hover {
  border: 0px solid rgba(0, 0, 0, 0.5);
}
.photo-actions {
  width: 200px;
  height: 300px;
  border-radius: 4px;
  display: grid;
  justify-content: center;
  align-items: center;
  transition: 0.2s ease-in;
  background-color: rgba(0, 0, 0, 1);
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
  background-color: rgba(0, 0, 0, 0);
  opacity: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.buttons-wrapper:hover {
  opacity: 1;
  background-color: rgba(0, 0, 0, 0.5);
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
  cursor: pointer;
}
</style>
