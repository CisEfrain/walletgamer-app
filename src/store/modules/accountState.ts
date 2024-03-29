/* eslint-disable @typescript-eslint/no-explicit-any */
import { Get, Update } from "@/services/user.service";
import { Add as CreateFound } from "@/services/found.service";

import {
  Get as GetPayMethods,
  Delete,
  Add
} from "@/services/paymentMethods.service";
import Vue from "vue";

const accountState = {
  state: () => ({
    expenditureData: [],
    userData: {},
    newExpenditureData: {},
    newFund: {}
  }),
  mutations: {
    /**
     * @params name - product name to set selected product card.
     * @remarks this refers to product cards in buy and sell components
     *   */
    setNewExpenditureData(state: any, payload: any): void {
      state.newExpenditureData = payload;
    },
    setExpenditureData(state: any, payload: any): void {
      state.expenditureData = payload;
    },
    setUserData(state: any, payload: any): void {
      state.userData = { ...state.userData, ...payload };
    },
    resetUserData(state: any): void {
      state.userData = "";
    },
    deleteExpenditureData(state: any, payload: any): void {
      // state.userData
      const { index } = payload;
      state.expenditureData.splice(index, 1);
    },
    setNewFund(state: any, payload: any): void {
      state.newFund = payload;
    }
  },
  actions: {
    setNewExpenditureData({ commit }: any, payload: any): void {
      Add(payload)
        .then((response: any) => {
          console.info("from setnewexpenditure", response);
          response.data.status === 200 &&
            Vue.$toast.success(`metodo de pago agregado`);
          commit("setNewExpenditureData", payload);
        })
        .catch(error => {
          console.info(error);
          Vue.$toast.error(`No se ha podido agregar el metodo de pago`);
        });
    },
    createFound({ commit }: any, { pasarela, monto, method }: any) {
      CreateFound({ pasarela, monto })
        .then((response: any) => {
          const { id, redireccion } = response.data.data;

          if (pasarela === "stripe" && id) {
            method.redirectToCheckout({ sessionId: id });
            response.data.status === 200 &&
              Vue.$toast.success(`Serás redirigido al medio de pago elegido`);
          } else if (pasarela === "paypal" && redireccion) {
            window.open(redireccion, "_self");
            response.data.status === 200 &&
              Vue.$toast.success(`Serás redirigido al medio de pago elegido`);
          }
         else if (pasarela === "personalizado") {
          window.open(redireccion, "_blank");
          response.data.status === 200 &&
            Vue.$toast.success(`Seras redirigido a continuar tu orden con un asesor`);
        }
          commit("setNewFund", response);
        })
        .catch(error => {
          console.info(error);
          Vue.$toast.error(`Parece que algo ha salido mal, intenta nuevo`);
        });
      // method.redirectToCheckout({ sessionId: });
    },
    getExpenditureData({ commit }: any): void {
      GetPayMethods()
        .then((response: any) => {
          console.info("get expenditure:", response.data.data);
          commit("setExpenditureData", response.data.data);
        })
        .catch(error => {
          console.info(error);
        });
    },
    deleteExpenditureData({ commit }: any, payload: any): void {
      const { id } = payload;
      Delete(id)
        .then((response: any) => {
          console.info(response);
          response.data.status === 200 &&
            Vue.$toast.success(`metodo de pago eliminado`);
          console.info(id);
          commit("deleteExpenditureData", payload);
        })
        .catch(error => {
          console.info(error);
          Vue.$toast.error(`No se ha podido eliminar tu metodos de pago`);
        });
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
  },
  getters: {
    getExpenditure: (state: { expenditureData: any }) => {
      return state.expenditureData;
    },
    getUserData: (state: { userData: any }) => {
      return state.userData;
    }
  }
};
export default accountState;
