import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    activeProduct: ''
  },
  mutations: {
    /**
     * @params name - product name to set selected product card.
     * @remarks this refers to product cards in buy and sell components
     *   */
    setProduct(state, payload) {
      state.activeProduct = payload.name;
    }
  },
  actions: {},
  modules: {}
});
