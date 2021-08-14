import Api from "@/services/Api.js";

export default {
  getAllBooks() {
    return Api().get("books");
  },
  addBook(book) {
    return Api().post("books/add", book);
  },
  getBookData(bookId) {
    return Api().get(`books/bookId/${bookId}`);
  },
  getSearchedBooks(searchObject) {
    return Api().get("books/searchByTerm", searchObject);
  },
  getSearchedBooksId(searchObject) {
    return Api().get("books/searchById", searchObject);
  },
  updateBook(book) {
    return Api().put("books/", book);
  },
};
