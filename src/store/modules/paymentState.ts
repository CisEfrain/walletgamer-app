/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BuyProduct,
  BuyProductConfirm,
  getSellDataByID
} from "@/services/buy.service";

const paymentState = {
  state: () => ({
    PayModal: false,
    currentStep: 1,
    activeBuy: {},
    stripeData: {},
    errorReported: false,
    buyData: {},
    productToBuy: {}
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
    resetPaymentState(state: any, payload?: boolean): void {
      if (payload) {
        state.activeBuy = {};
        state.PayModal = false;
        state.currentStep = 1;
        state.stripeData = {};
        state.buyData = {};
        state.productToBuy = {};
      }
    },
    nextStep(state: any, payload?: any): void {
      const { step, error } = payload;
      if (!payload) {
        state.currentStep++;
      } else if (step) {
        state.currentStep = step;
      } else if (error) {
        state.currentStep++;
        state.errorReported = true;
      }
      // } else if() {
      //   state.currentStep++;
      //   state.errorReported = true;
      // }
    },
    openPayModal(state: any): void {
      state.PayModal = !state.PayModal;
    },
    setBuyData(state: any, payload: any): void {
      console.info(payload);
      state.buyData = payload;
    },
    setProductToBuy(state: any, payload: any): void {
      state.productToBuy = payload;
    }
  },
  actions: {
    setStripeData({ commit }: any, payload: any): void {
      commit("setStripeData", payload);
    },
    setActiveBuy({ commit }: any, payload: any): void {
      commit("setActiveBuy", payload);
    },
    setProductToBuy({ commit }: any, payload: any): void {
      commit("setProductToBuy", payload);
    },
    resetPaymentState({ commit }: any, payload?: boolean) {
      commit("resetPaymentState", true);
    },
    nextStep({ commit }: any, payload?: any): void {
      if (!payload) {
        commit("nextStep");
      } else {
        commit("nextStep", { step: payload });
      }
      /* else {
        commit("nextStep", true);
      } */
    },
    openPayModal({ commit }: any): void {
      commit("openPayModal");
    },
    // CALL ventas AND ventas/:id
    async setBuyProduct({ commit, dispatch }: any, payload: any) {
      try {
        const {
          data: { data }
        } = await BuyProduct(payload);
        console.info(data);
        commit("setBuyData", data);
        dispatch("nextStep", data.estado.paso);
      } catch (error) {
        console.info(error);
      }
    },
    async confirmBuyProduct({ commit, dispatch }: any, payload: any) {
      console.info(payload);
      try {
        const { data: { data } } = await BuyProductConfirm(payload);
        console.info(data);
        commit("setBuyData", data);
        dispatch("nextStep", data.estado.paso);
      } catch (error) {
        console.info(error);
      }
    },
    async getSellDataByID({ commit, dispatch }: any, id: number) {
      if (!id) return false;
      const {
        data: { data }
      } = await getSellDataByID(id).catch(err => {
        console.log("getSellDataByID error ", err);
      });
      dispatch("setProductToBuy", {
        item: data.publicacione,
        estado:data.estado,
        id:data.id
      });
      console.info(data);
      if (data && data.estado.paso) {
        commit("setBuyData", data);
        commit("nextStep", { step: data.estado.paso });
      }
    }
  },
  getters: {
    //GET BUY STATUS DATA FROM STATE WHEN API CALLS INFO STATUS
    getBuyStatusInfo: (state: { buyData: any }) => {
      return state.buyData;
    },
    getCurrentStep: (state: { currentStep: number }) => {
      return state.currentStep;
    },
    getProductToBuy: (state: { productToBuy: any }) => {
      return state.productToBuy;
    }
  }
};
export default paymentState;
