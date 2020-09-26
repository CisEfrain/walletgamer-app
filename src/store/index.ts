import Vue from "vue";
import Vuex from "vuex";

// Modules
import AppState from "@/store/modules/appState";
import paymentState from "@/store/modules/paymentState";
import accountState from "@/store/modules/accountState";
import walletState from "@/store/modules/walletState";
import authState from "@/store/modules/authState";
import sellState from "@/store/modules/sellState";
import sellmentState from "@/store/modules/sellmentState";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    AppState,
    authState,
    paymentState,
    accountState,
    walletState,
    sellState,
    sellmentState
  }
});
