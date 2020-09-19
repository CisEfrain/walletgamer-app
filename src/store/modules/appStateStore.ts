import { Payload } from 'vuex';

const AppStates = {
  state: () => ({
    activeProduct: ''
  }),
  mutations: {
    /**
     * @params name - product name to set selected product card.
     * @remarks this refers to product cards in buy and sell components
     *   */
    setProduct(state: any, payload: any): void {
      state.activeProduct = payload.name;
    }
  },
  // actions: { ... },
  // getters: { ... }
}
export default AppStates