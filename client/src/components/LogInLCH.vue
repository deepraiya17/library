<template>
  <v-layout>
    <v-flex xs6 offset-xs3>
      <panel title="Log in as Library Card Holder">
        <v-form @submit.prevent="login">
          <v-text-field
            outlined
            label="Student id of 9 digits only"
            v-model="sid"
          ></v-text-field>
          <v-text-field
            outlined
            label="6 digit PIN"
            v-model="PIN"
            type="password"
          ></v-text-field>
          <div v-if="error">
            <span class="errorq">{{ error }}</span>
          </div>
          <v-btn type="submit" dark color="primary" class="mt-5">Log In</v-btn>
        </v-form>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";
import LCHservices from "../services/LCHservices.js";
export default {
  mounted() {
    if (this.isAdminLoggedIn || this.isLibraryCardHolderLoggedIn)
      this.$router.push({ name: "Books" });
  },
  data() {
    return {
      sid: "",
      PIN: "",
      error: "",
    };
  },
  methods: {
    async login() {
      try {
        const user = (await LCHservices.getHolderDetails(this.sid)).data;
        console.log(user);
        if (user.msg) {
          alert(user.msg);
          return;
        } else {
          const pinIsMatched = this.PIN === "" + user.pin;
          if (!pinIsMatched) {
            this.error = "Your PIN is incorrect";
          } else {
            this.$store.dispatch("setLCH", { LCH: user });
            this.$router.push({
              name: "LCH",
              params: { sid: this.LCH.studentId },
            });
          }
        }
      } catch (err) {
        this.error = err;
      }
    },
  },
  computed: {
    ...mapState(["isAdminLoggedIn", "isLibraryCardHolderLoggedIn", "LCH"]),
  },
};
</script>

<style scoped>
.errorq {
  background: rgb(248, 75, 75);
  color: white;
  padding: 5px;
  border-radius: 20px;
}
</style>
