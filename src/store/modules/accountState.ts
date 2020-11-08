import { Get, Update } from "@/services/user.service";
import Vue from "vue";

const accountState = {
  state: () => ({
    expenditureData: {},
    userData: {},
    newExpenditureData: {}
  }),
  mutations: {
    /**
     * @params name - product name to set selected product card.
     * @remarks this refers to product cards in buy and sell components
     *   */
    setNewExpenditureData(state: any, payload: any): void {
      console.log("from accountState:", payload);
      state.newExpenditureData = payload;
    },
    setUserData(state: any, payload: any): void {
      state.userData = payload;
    }
  },
  actions: {
    setNewExpenditureData({ commit }: any, payload: any): void {
      commit("setNewExpenditureData", payload);
    },
    setUserData({ commit }: any): void {
      Get()
        .then((response: any) => {
          const {
            data: { data }
          } = response;
          console.info("from setUserData", data);
          commit("setUserData", data);
        })
        .catch(error => {
          console.info(error);
        });
    },
    updateUserData({ commit }: any, payload: any): void {
      Update(payload)
        .then((response: any) => {
          console.info(response);
          const { nombre } = payload;
          response.status === 200 && Vue.$toast.success(`${nombre} tus datos se han actualizado`);
          commit("setUserData", payload);
        })
        .catch(error => {
          console.info(error);
          Vue.$toast.error(`Tus datos no se han podido actualizadar`);
        });
    }
  }
  // getters: { ... }
};
export default accountState;
