/* eslint-disable @typescript-eslint/no-explicit-any */
import { BuyProduct, BuyProductConfirm } from "@/services/buy.service";

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
    // CALL ventas AND ventas/:id
    async setBuyProduct({ commit }: any, payload: any) {
      try {
        const {
          data: { data }
        } = await BuyProduct(payload);
        console.info(data);
        commit("setBuyData", data);
      } catch (error) {
        console.info(error);
      }
    },
    async confirmBuyProduct({ commit }: any, payload: any) {
      try {
        const {
          data: { data }
        } = await BuyProductConfirm(payload);
        console.info(data);
        commit("setBuyData", data);
      } catch (error) {
        console.info(error);
      }
    }
  },
  getters: {
    //GET BUY STATUS DATA FROM STATE WHEN API CALLS INFO STATUS
    getBuyStatusInfo: (state: { buyData: any }) => {
      return state.buyData;
    }
  }
};
export default paymentState;
