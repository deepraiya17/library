<template>
  <v-app-bar app color="primary" dark>
    <v-app-bar-title>
      <div class="curse" @click="redirectTo('Books')">
        <img
          alt="Library Logo"
          class="shrink ml-2 curse"
          contain
          src="/img/library-logo.png"
          transition="scale-transition"
          width="54"
        />
      </div>
    </v-app-bar-title>
    <div class="curse ml-3" @click="redirectTo('Books')"><h1>HOME</h1></div>
    <v-spacer></v-spacer>
    <div
      class="curse text-center mr-5"
      v-if="isAdminLoggedIn"
      @click="redirectTo('Add-Book')"
    >
      ADD BOOK
    </div>
    <div
      class="curse text-center mr-5"
      v-if="isLibraryCardHolderLoggedIn"
      @click="redirectTo('LCH')"
    >
      Dashboard
    </div>
    <v-spacer></v-spacer>
    <div
      @click="logOutAsAdmin"
      class="curse text-center mr-5"
      v-if="isAdminLoggedIn"
    >
      Log Out
    </div>
    <div
      class="curse text-center mr-5"
      v-if="isLibraryCardHolderLoggedIn"
      @click="logOutAsCardHolder"
    >
      Log Out
    </div>
    <div
      class="curse text-center mr-5"
      v-if="!isAdminLoggedIn && !isLibraryCardHolderLoggedIn"
      @click="redirectTo('Add-LCH')"
    >
      Register for <br />
      new library-card
    </div>
    <div
      class="curse text-center mr-5"
      v-if="!isAdminLoggedIn && !isLibraryCardHolderLoggedIn"
      @click="redirectTo('Log-In-LCH')"
    >
      Log In with <br />
      library-card
    </div>
    <div
      class="curse text-center mr-5"
      v-if="!isAdminLoggedIn && !isLibraryCardHolderLoggedIn"
      @click="redirectTo('Log-In-Admin')"
    >
      Log In as<br />ADMIN
    </div>
  </v-app-bar>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["isAdminLoggedIn", "isLibraryCardHolderLoggedIn", "LCH"]),
  },
  methods: {
    logOutAsAdmin() {
      this.$store.dispatch("setAdmin", { admin: false });
      this.redirectTo("Books");
    },
    logOutAsCardHolder() {
      this.$store.dispatch("setLCH", { LCH: null });
      this.redirectTo("Books");
    },
    redirectTo(name) {
      if (this.$route.name !== name) {
        if (name === "LCH") {
          // console.log(this.LCH);
          this.$router.push({
            name: name,
            params: { sid: this.LCH.studentId },
          });
        } else this.$router.push({ name: name });
      }
    },
  },
};
</script>

<style scoped>
.curse {
  cursor: pointer;
}
</style>
