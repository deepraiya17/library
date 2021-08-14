<template>
  <v-layout row>
    <v-flex xs6 offset-xs3>
      <panel title="Issue new library-card">
        <v-form @submit.prevent="addCard">
          <v-text-field
            required
            outlined
            dense
            label="Student ID of 9 digit"
            v-model="studentId"
          ></v-text-field>
          <v-layout>
            <v-flex xs6 mr-2>
              <v-text-field
                required
                outlined
                dense
                label="First Name"
                v-model="firstName"
              ></v-text-field>
            </v-flex>
            <v-flex xs6 ml-2>
              <v-text-field
                required
                outlined
                dense
                label="Last Name"
                v-model="lastName"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-text-field
            required
            outlined
            dense
            label="New 6 digit PIN"
            v-model="PIN"
            type="password"
          ></v-text-field>
          <v-text-field
            required
            outlined
            dense
            label="Re-Enter PIN"
            v-model="reenteredPIN"
            type="password"
          ></v-text-field>
          <v-btn dark color="primary" type="submit">Proceed</v-btn>
        </v-form>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";
import LCHservices from "../services/LCHservices";
export default {
  mounted() {
    if (this.isAdminLoggedIn || this.isLibraryCardHolderLoggedIn)
      this.$router.push({ name: "Books" });
  },
  computed: { ...mapState(["isAdminLoggedIn", "isLibraryCardHolderLoggedIn"]) },
  methods: {
    async addCard() {
      const cardDetails = {
        studentId: this.studentId,
        firstName: this.firstName,
        lastName: this.lastName,
        PIN: this.PIN,
      };
      const LCH = (await LCHservices.addCard(cardDetails)).data;
      this.$store.dispatch("setLCH", { LCH: LCH });
      this.$router.push({
        name: "Upload-Photo",
        params: { sid: LCH.studentId },
      });
    },
  },
  data() {
    return {
      studentId: "",
      firstName: "",
      lastName: "",
      PIN: "",
      reenteredPIN: "",
    };
  },
};
</script>

<style></style>
