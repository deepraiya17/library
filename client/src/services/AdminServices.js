import Api from "@/services/Api.js";

export default {
  checkIfAdminPasswordIsSet() {
    return Api().get("/admin/isPasswordSet");
  },
  setFirstTimePassword(payload) {
    return Api().post("/admin", payload);
  },
  updatePassword(payload) {
    return Api().put("/admin", payload);
  },
  getAdminPassword() {
    return Api().get("/admin/password");
  },
};
