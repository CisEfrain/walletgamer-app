const walletState = {
  state: () => ({
    requestDisbursementData:{}
  }),
  mutations: {
    /**
     * @params name - product name to set selected product card.
     * @remarks this refers to product cards in buy and sell components
     *   */
    setNewRequestDisbursementData(state: any, payload: any): void {

      state.requestDisbursementData = payload;
      console.info(state.requestDisbursementData)
    }
  },
  actions: {
    setNewRequestDisbursementData({ commit }: any, payload: any): void {
      commit("setNewRequestDisbursementData", payload);
    }
  },
  // getters: { ... }
};
export default walletState;