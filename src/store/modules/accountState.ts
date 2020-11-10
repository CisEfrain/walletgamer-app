import { Get, Update } from "@/services/user.service";
import {
  Get as GetPayMethods,
  Delete,
  Add
} from "@/services/paymentMethods.service";
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
    getExpenditureData(state: any, payload: any): void {
      console.info("from getExpenditure:", payload);
      state.expenditureData = payload;
    },
    setUserData(state: any, payload: any): void {
      state.userData = payload;
    },
    resetUserData(state: any): void {
      state.userData = "";
    }
  },
  actions: {
    setNewExpenditureData({ commit, state }: any, payload: any): void {
      console.info(state.userData.id);
      Add(payload, state.userData.id)
        .then((response: any) => {
          console.info(response);
          response.data.status === 200 &&
            Vue.$toast.success(`metodo de pago agregado`);
          commit("setNewExpenditureData", payload);
        })
        .catch(error => {
          console.info(error);
          Vue.$toast.error(`No se ha podido agregar el metodo de pago`);
        });
    },
    getExpenditureData({ commit, state }: any): void {
      console.info(state.userData.id);
      GetPayMethods(state.userData.id)
        .then((response: any) => {
          console.info(response);
          // response.data.status === 200 &&
          //   Vue.$toast.success(`metodo de pago agregado`);
          const {
            data: { data }
          } = response;
          commit("getExpenditureData", data);
        })
        .catch(error => {
          console.info(error);
          Vue.$toast.error(`No se han podido cargar tus metodos de pago`);
        });
    },
    deleteExpenditureData({ commit }: any, id: number): void {
      Delete(id)
        .then((response: any) => {
          console.info(response);
          response.data.status === 200 &&
            Vue.$toast.success(`metodo de pago eliminado`);
        })
        .catch(error => {
          console.info(error);
          Vue.$toast.error(`No se ha podido eliminar tu metodos de pago`);
        });
    },
    setUserData({ commit }: any): void {
      Get()
        .then((response: any) => {
          console.info(response);
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
          response.data.status === 200 &&
            Vue.$toast.success(`${nombre} tus datos se han actualizado`);
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
