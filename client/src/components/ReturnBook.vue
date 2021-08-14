<template>
  <h1>
    {{ isAdminLoggedIn }}
  </h1>
</template>

<script>
import { mapState } from "vuex";
export default {
  mounted() {
    if (!this.isAdminLoggedIn) this.$router.push({ name: "Books" });
  },
  computed: { ...mapState(["isAdminLoggedIn", "isLibraryCardHolderLoggedIn"]) },
};
</script>

<style></style>
