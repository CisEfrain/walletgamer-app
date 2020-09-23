import Vue from "vue";
import Vuex from "vuex";

// Modules
import AppStates from "@/store/modules/appStateStore";
import paymentState from "@/store/modules/paymentState";
import accountState from "@/store/modules/accountState";
import walletState from "@/store/modules/walletState";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    AppStates,
    paymentState,
    accountState,
    walletState
  }
});
