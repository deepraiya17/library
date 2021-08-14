<template>
  <div>
    <v-layout>
      <v-flex xs4 offset-xs2>
        <panel title="Book Details" class="mx-5">
          <v-layout row>
            <v-flex xs4 offset-xs1>
              <div class="font-weight-black text-right">Book ID :</div>
            </v-flex>
            <v-flex xs7>
              <div class="font-weight-medium text-left">
                &nbsp;{{ book.bookId }}
              </div>
            </v-flex>
            <v-flex xs4 offset-xs1>
              <div class="font-weight-black text-right">Book name :</div>
            </v-flex>
            <v-flex xs7>
              <div class="font-weight-medium text-left">
                &nbsp;{{ book.bookName }}
              </div>
            </v-flex>
            <v-flex xs4 offset-xs1>
              <div class="font-weight-black text-right">Book author :</div>
            </v-flex>
            <v-flex xs7>
              <div class="font-weight-medium text-left">
                &nbsp;{{ book.bookAuthor }}
              </div>
            </v-flex>
            <v-flex xs4 offset-xs1>
              <div class="font-weight-black text-right">Book genre :</div>
            </v-flex>
            <v-flex xs7>
              <div class="font-weight-medium text-left">
                &nbsp;{{ book.genre }}
              </div>
            </v-flex>
            <v-flex xs4 offset-xs1>
              <div class="font-weight-black text-right">
                Available quantity :
              </div>
            </v-flex>
            <v-flex xs7>
              <div class="font-weight-medium text-left">
                &nbsp;{{ book.availableQuanity }}
              </div>
            </v-flex>
          </v-layout>
        </panel>
      </v-flex>
      <v-flex xs4>
        <panel title="Book Details" class="mx-5"></panel>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import BookServices from "../services/BooksServices";
import { mapState } from "vuex";
export default {
  computed: { ...mapState(["isAdminLoggedIn"]) },
  data() {
    return { book: { bookId: this.$route.params.bookId } };
  },
  methods: {
    computeAvailableQuantity() {
      this.book.availableQuanity =
        this.book.totalQuantity -
        this.book.damagedQuantity -
        this.book.issuedQuantity;
    },
  },
  async mounted() {
    if (!this.isAdminLoggedIn) this.$router.push({ name: "Books" });
    this.book = (await BookServices.getBookData(this.book.bookId)).data;
    this.computeAvailableQuantity();
    console.log(this.book);
  },
};
</script>

<style></style>
