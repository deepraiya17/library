<template>
  <div>
    <!-- <panel title="Search Book by">
      <v-layout row mt-4>
        <v-flex xs4>
          <div class="text-right mt-3">Book ID : &nbsp;</div>
        </v-flex>
        <v-flex xs5>
          <v-text-field v-model="searchBookId" outlined dense></v-text-field>
        </v-flex>
        <v-flex xs4>
          <div class="text-right mt-2">
            Book Name/Book Author/Book Genre : &nbsp;
          </div>
        </v-flex>
        <v-flex xs5>
          <v-text-field v-model="searchTerm" outlined dense></v-text-field>
        </v-flex>
      </v-layout>
    </panel> -->
    <panel title="Books">
      <v-layout row>
        <v-flex xs12>
          <table class="table">
            <thead>
              <tr>
                <th>Book's ID</th>
                <th>Book's Name</th>
                <th>Book's Author</th>
                <th>Book's Genre</th>
                <th>No. of Books Available</th>
                <th v-if="isAdminLoggedIn">Issue</th>
                <th v-if="isAdminLoggedIn">Return</th>
                <th v-if="isAdminLoggedIn">Edit Book Details</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(book, i) in books" :key="i">
                <td class="mr-2 ml-2">{{ book.bookId }}</td>
                <td>{{ book.bookName }}</td>
                <td>{{ book.bookAuthor }}</td>
                <td>{{ book.genre }}</td>
                <td>{{ book.availableQuantity }}</td>
                <td v-if="isAdminLoggedIn" class="py-3 pr-3">
                  <v-btn
                    class="primary"
                    v-if="!!book.availableQuantity"
                    @click="issueBook(book.bookId)"
                    >Issue</v-btn
                  >
                </td>
                <td>
                  <v-btn
                    v-if="!!book.issuedQuantity"
                    class="primary"
                    @click="returnBook(book.bookId)"
                    >Return</v-btn
                  >
                </td>
                <td v-if="isAdminLoggedIn">
                  <v-btn class="primary" @click="editBook(book.bookId)"
                    >Edit</v-btn
                  >
                </td>
              </tr>
            </tbody>
          </table>
          <!-- <v-btn @click="clicked"> show </v-btn> -->
        </v-flex>
      </v-layout>
    </panel>
  </div>
</template>

<script>
import { mapState } from "vuex";
import BooksServices from "../../services/BooksServices.js";
export default {
  data() {
    return {
      booksIsDefined: false,
      books: [],
      searchTerm: "",
      // searchBookId: "",
    };
  },
  // watch: {
  //   searchTerm() {
  //     const route = { name: "Books" };
  //     if (this.searchTerm) route.query = { searchTerm: this.searchTerm };
  //     this.redirectTo(route);
  //     if (this.searchTerm !== "") {
  //       this.books = this.getYou();
  //     } else {
  //       this.books = BooksServices.getAllBooks();
  //     }
  //   },
  //   // searchBookId() {
  //   //   const route = { name: "Books" };
  //   //   if (this.searchBookId !== "") {
  //   //     route.query = { searchBookId: this.searchBookId };
  //   //     this.redirectTo(route);
  //   //     this.books = this.getYou();
  //   //   }
  //   // },
  //   "$route.query.searchTerm": {
  //     immediate: true,
  //     handler(value) {
  //       this.searchTerm = value;
  //     },
  //   },
  // },
  methods: {
    redirectTo(route) {
      if (this.$route.query.searchTerm != route.query.searchTerm)
        this.$router.push(route);
    },
    editBook(bookId) {
      this.$router.push({ name: "Edit-Book", params: { bookId: bookId } });
    },
    issueBook(bookId) {
      const route = { name: "Issue-Book", params: { bookId: bookId } };
      if (
        this.$route.name !== route.name ||
        this.$route.params.bookId !== route.params.bookId
      ) {
        this.$router.push(route);
      }
    },
    returnBook(bookId) {
      const route = { name: "Return-Book", params: { bookId: bookId } };
      if (
        this.$route.name !== route.name ||
        this.$route.params.bookId !== route.params.bookId
      ) {
        this.$router.push(route);
      }
    },
    async getYou() {
      console.log(this.$route.query.searchTerm);
      return BooksServices.getSearchedBooks({
        searchTerm: this.$route.query.searchTerm,
      });
    },
  },
  computed: {
    ...mapState(["isAdminLoggedIn"]),
  },
  async mounted() {
    try {
      if (this.$route.query && this.$route.query.searchTerm) {
        const response = (await this.getYou()).data;
        console.log(response);
      } else {
        this.books = (await BooksServices.getAllBooks()).data;
      }
      this.booksIsDefined = true;
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style scoped>
.table {
  margin-left: auto;
  margin-right: auto;
  width: 90%;
  border-collapse: collapse;
}
.table thead tr {
  font-size: 20px;
  height: 45px;
}

.table tbody tr {
  height: 36px;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}
</style>
