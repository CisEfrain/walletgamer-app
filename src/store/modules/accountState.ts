const accountState = {
  state: () => ({
    expenditureData: {},
    userData: {},
    newExpenditureData:{}
  }),
  mutations: {
    /**
     * @params name - product name to set selected product card.
     * @remarks this refers to product cards in buy and sell components
     *   */
    setNewExpenditureData(state: any, payload: any): void {
      console.log("from accountState:",payload);
      state.newExpenditureData = payload;
    },
    setUserData(state: any, payload: any): void {
      console.log(payload);
      state.userData = payload;
    }
  },
  actions: {
    setNewExpenditureData({ commit }: any, payload: any): void {
      commit("setNewExpenditureData", payload);
    },
    setUserData({ commit }: any, payload: any): void {
      commit("setUserData", payload);
    }
  },
  // getters: { ... }
};
export default accountState;
