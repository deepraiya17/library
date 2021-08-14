<template>
  <v-layout row>
    <v-flex :class="computedDisplayClass">
      <books-data></books-data>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";
import BooksData from "./BooksData.vue";
export default {
  components: { BooksData },
  computed: {
    ...mapState(["isAdminLoggedIn"]),
    computedDisplayClass() {
      return this.isAdminLoggedIn ? "xs8 offset-xs2" : "xs6 offset-xs3";
    },
  },
};
</script>

<style></style>
