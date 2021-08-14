<template>
  <v-layout>
    <v-flex xs6 offset-xs3>
      <panel title="Upload photo" v-if="!card.isPhotoUploaded">
        <v-form @submit.prevent="uploadPhoto">
          <v-file-input v-model="image" @change="previewImage"> </v-file-input>
          <v-img
            class="center my-2"
            v-if="url"
            :src="url"
            width="200"
            height="200"
          ></v-img>
          <div v-if="err" class="my-3">
            <span class="errorq" v-for="(errorrow, i) in err" :key="i">
              {{ errorrow }}
              <br v-if="i === 0" />
            </span>
          </div>
          <v-btn dark class="primary mt-4" type="submit">Upload</v-btn>
        </v-form>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";
import LCHservices from "../services/LCHservices.js";
export default {
  data() {
    return {
      sid: "",
      card: {},
      image: [],
      url: "",
      err: "",
    };
  },
  methods: {
    previewImage() {
      this.url = URL.createObjectURL(this.image);
    },
    async uploadPhoto() {
      try {
        if (
          !(
            this.image.name === `${this.sid}.jpg` ||
            this.image.name === `${this.sid}.png` ||
            this.image.name === `${this.sid}.jpeg`
          )
        ) {
          this.err = [
            "Your image name must be one of the followin three.",
            `1.${this.sid}.jpg`,
            `2.${this.sid}.jpeg`,
            `3.${this.sid}.png`,
          ];
        }
        const formData = new FormData();
        formData.append("image", this.image);
        const { msg } = (await LCHservices.uploadPic(formData)).data;
        if (msg === "The image uploaded successfully.") {
          const updateObject = {
            studentId: this.card.studentId,
            fieldName: "isPhotoUploaded",
            fieldValue: 1,
          };
          const sucess = (await LCHservices.updateField(updateObject)).data;
          console.log(sucess);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  computed: {
    ...mapState(["isAdminLoggedIn", "isLibraryCardHolderLoggedIn"]),
  },
  async mounted() {
    if (this.isAdminLoggedIN || !this.isLibraryCardHolderLoggedIn)
      this.$router.push({ name: "Books" });
    this.sid = this.$route.params.sid;
    this.card = (await LCHservices.getHolderDetails(this.sid)).data;
  },
};
</script>

<style scoped>
.center {
  margin-left: auto;
  margin-right: auto;
}
.errorq {
  background: rgb(248, 75, 75);
  color: white;
  padding: 5px;
  /* border-radius: 20px; */
}
</style>
