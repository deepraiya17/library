<template>
  <v-layout>
    <v-flex xs6 offset-xs3>
      <panel title="Edit book data">
        <div v-if="book">
          <v-form @submit.prevent="editBook">
            <v-text-field
              required
              outlined
              dense
              label="Book Name"
              v-model="book.bookName"
            ></v-text-field>
            <v-text-field
              required
              outlined
              dense
              v-model="book.bookAuthor"
              label="Book Author"
            ></v-text-field>
            <v-text-field
              required
              outlined
              dense
              label="Book Genre"
              v-model="book.genre"
            ></v-text-field>
            <v-layout>
              <v-flex xs2>
                <div class="pt-2 text-left ml-2">Quantity:</div></v-flex
              >
              <v-flex xs1>
                <v-btn @click="decreaseByOne" dark color="primary">
                  <h1>-</h1>
                </v-btn>
              </v-flex>
              <v-flex xs1>
                <v-text-field
                  v-model="book.totalQuantity"
                  dense
                  readonly
                  outlined
                ></v-text-field>
              </v-flex>
              <v-flex xs1>
                <v-btn @click="increaseByOne" dark color="primary">
                  <h1>+</h1>
                </v-btn>
              </v-flex>
            </v-layout>
            <v-btn dark color="primary" type="submit"
              >Submit Updated Book Data</v-btn
            >
          </v-form>
        </div>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";
import BooksServices from "../services/BooksServices";
import Panel from "./globals/Panel.vue";
export default {
  components: { Panel },
  async mounted() {
    if (!this.isAdminLoggedIn) this.$router.push({ name: "Books" });
    const bookId = this.$route.params.bookId;
    this.book = (await BooksServices.getBookData(bookId)).data;
  },
  computed: { ...mapState(["isAdminLoggedIn"]) },
  data() {
    return { book: "" };
  },
  methods: {
    decreaseByOne() {
      this.book.totalQuantity--;
    },
    increaseByOne() {
      this.book.totalQuantity++;
    },
    async editBook() {
      const { msg } = (await BooksServices.updateBook(this.book)).data;
      alert(msg);
      this.$router.push({ name: "Books" });
    },
  },
};
</script>

<style></style>
