<template>
  <v-layout>
    <v-flex xs6 offset-xs3>
      <panel title="Log In as ADMIN">
        <div v-if="!isAdminPasswordSet && !setAdminPasswordBoolean">
          <h3>Please Set your admin password</h3>
          <v-btn dark color="primary" @click="setAdminPasswordBool">
            Set Password
          </v-btn>
        </div>
        <div v-else-if="isAdminPasswordSet && !setAdminPasswordBoolean">
          <v-flex xs8 offset-xs2 class="inj">
            <v-form @submit.prevent="logInAsAdmin">
              <v-text-field
                outlined
                label="Password"
                v-model="password"
                type="password"
              >
              </v-text-field>
              <span>
                <v-btn dark color="primary" class="mr-5" type="submit">
                  Submit
                </v-btn>

                <v-btn
                  dark
                  color="primary"
                  class="ml-5"
                  @click="setAdminPasswordBool"
                >
                  Reset Password
                </v-btn>
              </span>
            </v-form>
          </v-flex>
        </div>
        <div v-if="setAdminPasswordBoolean">
          <v-text-field
            v-if="isAdminPasswordSet"
            outlined
            label="Old password"
            v-model="oldPassword"
            type="password"
          >
          </v-text-field>
          <v-text-field
            outlined
            label="New password"
            v-model="newPassword"
            type="password"
          >
          </v-text-field>
          <v-text-field
            outlined
            label="Confirm new password"
            v-model="confirmNewPassword"
            type="password"
          >
          </v-text-field>
          <div class="errorq">
            {{ error }}
          </div>
          <v-btn
            dark
            color="primary"
            class="ml-5"
            v-if="!isAdminPasswordSet"
            @click="setAdminPassword"
          >
            Set Password
          </v-btn>
          <v-btn
            dark
            color="primary"
            class="ml-5"
            @click="setAdminPassword"
            v-else
          >
            Update Password
          </v-btn>
        </div>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";
import Panel from "./globals/Panel.vue";
import AdminServices from "../services/AdminServices.js";
export default {
  data() {
    return {
      isAdminPasswordSet: false,
      password: "",
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
      setAdminPasswordBoolean: false,
      error: "",
    };
  },
  components: { Panel },
  async mounted() {
    if (this.isAdminLoggedIn || this.isLibraryCardHolderLoggedIn)
      this.$router.push({ name: "Books" });
    this.isAdminPasswordSet = (
      await AdminServices.checkIfAdminPasswordIsSet()
    ).data;
  },
  computed: { ...mapState(["isAdminLoggedIn", "isLibraryCardHolderLoggedIn"]) },
  methods: {
    setAdminPasswordBool() {
      this.setAdminPasswordBoolean = !this.setAdminPasswordBoolean;
    },
    async setAdminPassword() {
      try {
        // if (
        //   !(this.isAdminPasswordSet && !!this.oldPassword) ||
        //   !!this.newPassword ||
        //   !!this.confirmNewPassword
        // ) {
        //   this.error = "Please fill in all the fields.";
        // }
        if (this.newPassword !== this.confirmNewPassword) {
          this.error =
            "New passwords and Confirm new passwoord does not match.";
        }
        if (this.isAdminPasswordSet) {
          const passwordStoredInDB = (await AdminServices.getAdminPassword())
            .data;
          if (passwordStoredInDB !== this.oldPassword) {
            this.error =
              "Your old password does not match with your previous password.";
            return;
          }
          await AdminServices.updatePassword({
            oldPassword: this.oldPassword,
            newPassword: this.newPassword,
          });
        } else {
          await AdminServices.setFirstTimePassword({
            password: this.newPassword,
          });
        }
        this.$router.push({ name: "Books" });
      } catch (err) {
        alert(err);
      }
    },
    async logInAsAdmin() {
      try {
        const storedPassword = (await AdminServices.getAdminPassword()).data;
        this.$store.dispatch("setAdmin", {
          admin: storedPassword === this.password,
        });
        if (this.isAdminLoggedIn) this.$router.push({ name: "Books" });
      } catch (error) {
        alert(error);
      }
    },
  },
};
</script>

<style>
.errorq {
  background: white;
}
</style>
