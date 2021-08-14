<template>
  <v-layout>
    <v-flex xs8 offset-xs2>
      <v-form>
        <v-file-input v-model="image"> </v-file-input>
        <v-btn>Upload</v-btn>
        <v-text-field v-model="stId"></v-text-field>
        <v-btn @click="getStudentImage">Get photo</v-btn>
        <img :src="url" v-if="lol" width="400" height="400" />
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from "axios";
export default {
  methods: {
    async sendToServer() {
      try {
        const formData = new FormData();
        formData.append("image", this.image);
        await axios.post("http://localhost:3000/uploadImage", formData);
      } catch (error) {
        console.log(error);
      }
    },
    async getStudentImage() {
      const img = (await axios.get(`http://localhost:3000/photos/${this.stId}`))
        .data;
      // const blob = new Blob([img]);
      // console.log(typeof blob);
      // console.log(this.imageDB);
      this.url = URL.createObjectURL(img);
      console.log(this.url);
      this.lol = true;
    },
  },

  data() {
    return {
      image: null,
      imageDB: null,
      lol: false,
      stId: "",
      //   valid: true,
      //   name: "",
      //   nameRules: [
      //     (v) => !!v || "Name is required",
      //     (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
      //   ],
      //   email: "",
      //   emailRules: [
      //     (v) => !!v || "E-mail is required",
      //     (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      //   ],
      //   select: null,
      //   items: ["Item 1", "Item 2", "Item 3", "Item 4"],
      //   checkbox: false,
    };
  },

  //   methods: {
  // validate() {
  //   this.$refs.form.validate();
  // },
  // reset() {
  //   this.$refs.form.reset();
  // },
  // resetValidation() {
  //   this.$refs.form.resetValidation();
  // },
  //   },
};
</script>
<!-- <script> 
import axios from "axios";
export default {
  data() {
    return {
      url: null,
      image: null,
      lol: false,
    };
  },
  methods: {
    // Preview_image() {
    //   this.url = URL.createObjectURL(this.image);
    //   console.log("Image");
    //   console.log(this.image);
    //   console.log("URL");
    //   console.log(this.url);
    // },
  },
};

</script>

<style></style>
-->
