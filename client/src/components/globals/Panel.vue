<template>
  <div class="mt-5 white elevation-2">
    <v-toolbar flat dense class="primary" dark>
      <v-toolbar-title>
        {{ title }}
      </v-toolbar-title>
      <slot name="action"></slot>
    </v-toolbar>
    <div class="pl-4 pr-4 py-5 text-center">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title"],
};
</script>

<style scoped></style>
