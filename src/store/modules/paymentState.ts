import { BuyProduct } from "@/services/buy.service";

const paymentState = {
  state: () => ({
    PayModal: false,
    currentStep: 1,
    activeBuy: {},
    stripeData: {},
    errorReported: false,
    buyData: {}
  }),
  mutations: {
    /**
     * @params name - product name to set selected product card.
     * @remarks this refers to product cards in buy and sell components
     *   */
    setStripeData(state: any, payload: any): void {
      console.log(payload);
      state.stripeData = payload;
    },
    setActiveBuy(state: any, payload: any): void {
      state.activeBuy = payload;
    },
    nextStep(state: any, payload?: any): void {
      if (!payload) {
        state.currentStep++;
      } else {
        state.currentStep++;
        state.errorReported = true;
      }
    },
    openPayModal(state: any): void {
      state.PayModal = !state.PayModal;
    },
    setBuyData(state: any, payload: any): void {
      console.info(payload);
      state.buyData = payload;
    }
  },
  actions: {
    setStripeData({ commit }: any, payload: any): void {
      commit("setStripeData", payload);
    },
    setActiveBuy({ commit }: any, payload: any): void {
      commit("setActiveBuy", payload);
    },
    nextStep({ commit }: any, payload?: any): void {
      if (!payload) {
        commit("nextStep");
      } else {
        commit("nextStep", true);
      }
    },
    openPayModal({ commit }: any): void {
      commit("openPayModal");
    },
    async setBuyProduct({ commit }: any, payload: any) {
      // BuyProduct(payload)
      //   .then((response: any) => {
      //     console.info("from buy", response);
      //     // commit("getPost", response.data.data);
      //   })
      //   .catch(error => {
      //     console.info(error);
      //     // Vue.$toast.error(`No se han cargado tus publicaciónes`);
      //   });
      try {
        const buyData = await BuyProduct(payload);
        console.info(buyData);
      } catch (error) {
        console.info(error);
      }
    }
  }
  // getters: { ... }
};
export default paymentState;
