<template>
  <section class="container" style="width:800px;">
    <div style="padding:40px;">
      <p class="title is-3">Create Idea</p>
      <div class="example-wrapper" style="margin-top:30px;margin-bottom:20px;">
        <label class="label">Cover Photo</label>
        <img :src="coverImage" @click="pickPhoto('add')" width="350" height="200" class="image" style="border-radius:3px;background-color:#ccc;">
        <button class="button" style="width:100%;margin-top:10px;" @click="pickPhoto('add')">{{coverbuttonText}}</button>
        <button class="button" style="width:100%;margin-top:5px;" @click="pickPhoto('remove')">Delete</button>
      </div>
      <div class="field">
        <label class="label">Idea Title</label>
        <div class="control">
          <input class="input" maxlength="40" type="text" placeholder="Title" v-model="title">
        </div>
        <div v-if="title.length > 50">
          <span style="font-size:15px;color:red;">Max characters 40</span>
        </div>

        <p style="margin-top:20px;margin-bottom:-15px;"><strong>Recommended</strong></p>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;grid-column-gap:20px;">
          <div>
            <label class="label" style="padding-top:20px;">Price ($ SGD)</label>
            <div class="control">
              <input class="input" type="number" v-model.number="recommendedPrice">
            </div>
          </div>
          <div>
            <label class="label" style="padding-top:20px;">Guests</label>
            <div class="control">
              <input class="input" type="number" v-model.number="guestCount">
            </div>
          </div>
          <div>
            <label class="label" style="padding-top:20px;">Duration (Mins)</label>
            <div class="control">
              <input class="input" type="number" v-model.number="duration">
            </div>
          </div>
        </div>

        <label class="label" style="padding-top:20px;">Short Description</label>
        <div class="control">
          <textarea class="textarea" placeholder="" style="height:200px;" v-model="shortDescription"></textarea>
        </div>
      </div>
      <input style="display:none" ref ="picker" type="file" name="pic" accept="image/*" @change="onFileChange">
      <div style="padding-top:10px;">
        <p><strong>Blurb</strong></p>
        <p>As a host, you could make <span style="font-weight:900;">${{calculateEarnings}}</span> for 12 hours each month.</p>
      </div>
      <div style="padding-top:50px;padding-bottom:30px;">
        <button class="button is-info" style="margin-right:20px;padding:10px;padding-left:40px;padding-right:40px;height:auto;width:auto;" @click="updateIdea()">{{saveButtonText}}</button> 
        <button class="button is-danger" style="padding:10px;padding-left:20px;padding-right:20px;height:auto;width:auto;" @click="deleteIdea()">Delete</button>
      </div>
    </div>
  </section>
</template>

<script>
import { db, storage, auth } from "~/plugins/firebase";
import { resizeImageWidth } from "~/assets/utility";

export default {
  data() {
    return {
      ideaId: this.$nuxt.$route.path.replace("/idea/", ""),
      title: "Idea Title",
      shortDescription: "",
      recommendedPrice: 20,
      currency: "sgd",
      guestCount: 10,
      duration: 60,
      coverImage: null,
      coverbuttonText: "Upload",
      saveButtonText: "Save Idea",
    };
  },
  created() {
    this.loadOrCreateIdea();
  },
  computed: {
    calculateEarnings() {
      return this.recommendedPrice * 12 * this.guestCount
    }
  },
  methods: {
    pickPhoto(action) {
      if (action === "add") {
        this.$refs.picker.click();
      } else {
        this.coverImage = null;
      }
    },
    async loadOrCreateIdea() {
      try {
        const ideaDoc = await db
          .collection("ideas")
          .doc(this.ideaId)
          .get();
        if (ideaDoc.exists) {
          const idea = ideaDoc.data();
          this.title = idea.title;
          this.shortDescription = idea.shortDescription;
          this.ideaId = idea.ideaId;
          this.coverImage = idea.coverPhotoUrl && idea.coverPhotoUrl.length > 0 ? idea.coverPhotoUrl : null;
          this.recommendedPrice = idea.price / 100;
          this.guestCount = idea.guestCount;
          this.duration = idea.duration;
        } else {
          const createdAt = new Date().getTime();
          const snap = await db.collection('ideas').get()
          await db
            .collection("ideas")
            .doc(this.ideaId)
            .set({
              ideaId: this.ideaId,
              title: "New Idea Title",
              price: this.recommendedPrice * 100,
              guestCount: this.guestCount,
              createdAt: createdAt,
              isPublished: false,
              order: snap.size ? snap.size + 1 : 0
            });
        }
      } catch (error) {
        console.log(error);
      }
    },
    async deleteIdea() {
      try {
        await db
          .collection("ideas")
          .doc(this.ideaId)
          .delete();
        this.$router.push("/ideas");
      } catch (error) {
        console.log(error);
      }
    },
    async updateIdea() {
      try {
        this.saveButtonText = "Saving...";
        const obj = {
          ideaId: this.ideaId ? this.ideaId : "",
          title: this.title.trim(),
          createdAt: new Date().getTime(),
          shortDescription: this.shortDescription.trim(),
          price: this.recommendedPrice * 100,
          currency: this.currency,
          guestCount: this.guestCount,
          duration: this.duration,
          coverPhotoUrl: this.coverImage ? this.coverImage : ""
        };

        await db
          .collection("ideas")
          .doc(this.ideaId)
          .update(obj);
        this.$router.push("/ideas");
      } catch (error) {
        console.log(error);
      }
    },
    async uploadImage(imageBlob) {
      try {
        const name = String(Date.now());
        const uploadRef = storage
          .child(`media/ideas/${this.ideaId}`)
          .child(`${name}.jpg`);
        const metadata = {
          contentType: "image/jpeg",
          customMetadata: {
            Uploaded: Date().toString()
          }
        };
        const uploadTask = await uploadRef.put(imageBlob, metadata);
        const downloadUrl = await uploadTask.ref.getDownloadURL();
        this.coverImage = downloadUrl
        this.coverbuttonText = "Upload"
        console.log("Upload image successful", `${name}.jpg`, downloadUrl);
      } catch (error) {
        console.error(error.message);
      }
    },
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      let file = files[0];
      let targetWidth = 1024;
      resizeImageWidth(file, targetWidth, (resizedFilePath, outputFile) => {
        console.log(outputFile);
        this.coverImage = resizedFilePath;
        this.coverbuttonText = "Uploading...";
        this.uploadImage(outputFile);
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
  display: relative;
  justify-content: center;
  background-color: red;
}
.image {
  opacity: 0.9;
}
.photo-grid {
  display: grid;
  grid-row-gap: 20px;

  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}
.example-wrapper {
  width: 220px;
}
.example-wrapper img {
  height: 150px;
  object-fit: cover;
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
  object-fit: none;
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
