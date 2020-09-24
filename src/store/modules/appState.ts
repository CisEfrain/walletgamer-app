import { Payload } from 'vuex';

const AppState = {
  state: () => ({
    activeProduct: ""
  }),
  mutations: {
    /**
     * @params name - product name to set selected product card.
     * @remarks this refers to product cards in buy and sell components
     *   */
    setProduct(state: any, payload: any): void {
      state.activeProduct = payload.name;
    },
    resetProduct(state: any): void {
      state.activeProduct = "";
    },
  },
  actions: { 
    setProdut({ commit }: any, payload: any): void {
      commit('setProduct', payload)
    },
    resetProdut({ commit }: any, payload: any): void {
      commit('resetProduct', payload)
  },
  }
  // getters: { ... }
}
export default AppState