import Vue from "vue";
import VueRouter from "vue-router";
import Books from "../components/Books/";
import AddBook from "../components/AddBook.vue";
import EditBook from "../components/EditBook.vue";
import IssueBook from "../components/IssueBook.vue";
import ReturnBook from "../components/ReturnBook.vue";
import AddLCH from "../components/AddLCH.vue";
import LogInLCH from "../components/LogInLCH.vue";
import LogInAdmin from "../components/LogInAdmin.vue";
import UploadPhoto from "../components/UploadPhoto.vue";
import DetailsOfLCH from "../components/DetailsOfCard.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/books",
    component: Books,
    name: "Books",
  },
  { path: "/books/add", name: "Add-Book", component: AddBook },
  { path: "/books/edit/:bookId", name: "Edit-Book", component: EditBook },
  { path: "/issue/:bookId", name: "Issue-Book", component: IssueBook },
  { path: "/return/:bookId", name: "Return-Book", component: ReturnBook },
  { path: "/lch/add", name: "Add-LCH", component: AddLCH },
  { path: "/login/lch", name: "Log-In-LCH", component: LogInLCH },
  { path: "/login/admin", name: "Log-In-Admin", component: LogInAdmin },
  {
    path: "/card-holder/uploadphoto/:sid",
    name: "Upload-Photo",
    component: UploadPhoto,
  },
  { path: "/card-holder/:sid", name: "LCH", component: DetailsOfLCH },
  { path: "*", redirect: "books" },
  // {
  // path: "/",
  // name: "Home",
  // component: Home,
  // },
  // {
  // path: "/about",
  // name: "About",
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  // component: () =>
  //   import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
