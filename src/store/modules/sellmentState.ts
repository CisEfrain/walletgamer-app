const sellmentState = {
  state: () => ({
    //PayModal: false,
    currentStepSell: 1,
    activeSell: {},
    stripeData: {},
    productToBuy: {},
    errorReportedSell: false,
    isConfirmed: false
  }),
  mutations: {
    /**
     * @params name - product name to set selected product card.
     * @remarks this refers to product cards in buy and sell components
     *   */
    // setStripeData(state: any, payload: any): void {
    //   state.stripeData = payload;
    // },
    setActiveSell(state: any, payload: any): void {
      state.activeSell = payload;
    },
    nextStepSell(state: any, payload?: any): void {
      if (!payload) {
        state.currentStepSell++;
      } else {
        state.currentStepSell = 4;
        state.errorReportedSell = true;
      }
    },
    setConfirmed(state: any): void {
      setTimeout(() => {
        state.isConfirmed = true;
      }, 3000);
    },
    setProductToBuy(state: any, payload: any): void {
      state.productToBuy = payload;
    }
    //   openPayModal(state: any): void {
    //       state.PayModal = !state.PayModal;
    //   }
  },
  actions: {
    // setStripeData({ commit }: any, payload: any): void {
    //   commit("setStripeData", payload);
    // },
    setActiveSell({ commit }: any, payload: any): void {
      commit("setActiveSell", payload);
    },
    nextStepSell({ commit }: any, payload?: any): void {
      if (!payload) {
        commit("nextStepSell");
      } else {
        commit("nextStepSell", true);
      }
    },
    setConfirmed({ commit }: any): void {
      commit("setConfirmed");
    },
    setProductToBuy({ commit }: any, payload: any): void {
      commit("setProductToBuy", payload);
    }
    //   openPayModal({ commit }: any): void {
    //       commit('openPayModal')

    //   }
  },
  getters: {

  }
};
export default sellmentState;
