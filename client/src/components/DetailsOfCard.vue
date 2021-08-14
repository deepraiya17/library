<template>
  <v-layout>
    <v-flex :class="panel1ShowClass">
      <panel title="Card Holder Details">
        <v-layout>
          <v-flex xs5>
            <v-img :src="imageURL" height="200" width="200"></v-img>
          </v-flex>
          <v-flex xs7>
            <v-layout row class="horizontal">
              <v-flex xs3 offset-xs1>
                <div class="text-right font-weight-black mr-1">
                  Student ID :
                </div>
              </v-flex>
              <v-flex xs8>
                <div class="font-weight-medium text-left">
                  {{ card.studentId }}
                </div>
              </v-flex>
              <v-flex xs3 offset-xs1>
                <div class="text-right font-weight-black mr-1">Name :</div>
              </v-flex>
              <v-flex xs8>
                <div class="font-weight-medium text-left">
                  {{ card.firstName }} {{ card.lastName }}
                </div>
              </v-flex>
            </v-layout>
            <v-layout mt-4>
              <v-flex>
                <div>
                  Currently, you can<span v-if="userCanNotIssueBook"
                    >'t&nbsp;
                  </span>
                  issue a book.<br />
                  <span v-if="userCanNotIssueBook === 1">
                    Because you already have 2 books issued.
                  </span>
                  <span v-if="userCanNotIssueBook === 2">
                    Because your card is not authorised by librarian.
                  </span>
                </div>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";
import LCHservices from "../services/LCHservices.js";
export default {
  data() {
    return {
      sid: "",
      card: {},
    };
  },
  async mounted() {
    if (this.isAdminLoggedIN || !this.isLibraryCardHolderLoggedIn)
      this.$router.push({ name: "Books" });
    this.sid = this.$route.params.sid;
    this.card = (await LCHservices.getHolderDetails(this.sid)).data;
  },
  computed: {
    ...mapState(["isAdminLoggedIn", "isLibraryCardHolderLoggedIn"]),
    imageURL() {
      return `http://localhost:3000/card-holder/image/${this.sid}`;
    },
    userCanNotIssueBook() {
      if (this.card.canIssueBook) return 0;
      else if (this.card.noOfBooksCurrentlyHave === 2) return 1;
      else return 2;
    },
    panel1ShowClass() {
      return this.userCanNotIssueBook === 0 ? "xs5" : "xs5 offset-xs3";
    },
  },
};
</script>

<style scoped>
.horizontal {
  margin-top: 36px;
}
</style>
