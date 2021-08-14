import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  plugins: [createPersistedState()],
  state: {
    isLibraryCardHolderLoggedIn: false,
    isAdminLoggedIn: false,
    LCH: null,
  },
  mutations: {
    setAdmin(state, payload) {
      state.isAdminLoggedIn = !!payload.admin;
    },
    setLCH(state, payload) {
      state.LCH = payload.LCH;
      state.isLibraryCardHolderLoggedIn = !!state.LCH;
    },
  },
  actions: {
    setAdmin(context, payload) {
      context.commit("setAdmin", payload);
    },
    setLCH(context, payload) {
      context.commit("setLCH", payload);
    },
  },
  modules: {},
});
