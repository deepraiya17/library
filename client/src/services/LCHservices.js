import Api from "@/services/Api.js";

export default {
  getHolderDetails(sid) {
    return Api().get(`/card-holder/${sid}`);
  },
  addCard(cardDetails) {
    return Api().post("/card-holder", cardDetails);
  },
  uploadPic(formData) {
    return Api().post("/card-holder/uploadPic", formData);
  },
  updateField(updateObject) {
    return Api().put("/card-holder/updateParticularField", updateObject);
  },
};
