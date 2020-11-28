/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  GetPendingOperations,
  GetDoneOperations,
  GetBalance
} from "@/services/operation.service";
import { Disbursement } from "@/services/disbursement.service";
import Vue from "vue";

const operationState = {
  state: () => ({
    operations: [],
    balance: 0,
    doneOperation: [],
    pendingOperation: []
  }),
  mutations: {
    resetData(state: any): void {
      state.operations = [];
    },
    setOperationData(state: any, payload: any): void {
      state.operations = payload;
    },
    setDoneOperationData(state: any, payload: any): void {
      state.doneOperation = payload;
    },
    setPendingOperationData(state: any, payload: any): void {
      state.pendingOperation = payload;
    },
    setBalance(state: any, payload: any): void {
      state.balance = payload;
    }
  },
  actions: {
    setProdut({ commit }: any, payload: any): void {
      commit("setProduct", payload);
    },
    resetProdut({ commit }: any, payload: any): void {
      commit("resetProduct", payload);
    },
    MyDoneOperations({ commit }: any, { size, page }): void {
      GetDoneOperations(size, page)
        .then((response: any) => {
          console.info("from my done operations data", response);
          commit("setDoneOperationData", response.data.data);
        })
        .catch(error => {
          console.info(error);
        });
    },
    MyPendingOperations({ commit }: any, { size, page }): void {
      GetPendingOperations(size, page)
        .then((response: any) => {
          console.info("from my operations pending data", response);
          commit("setPendingOperationData", response.data.data);
        })
        .catch(error => {
          console.info(error);
        });
    },
    MyBalance({ commit }: any): void {
      GetBalance()
        .then((response: any) => {
          console.info("from my balance data", response);
          commit("setBalance", response.data.data.saldo);
        })
        .catch(error => {
          console.info(error);
        });
    },
    AddDisbursement(payload: any): void {
      Disbursement(payload)
        .then((response: any) => {
          console.info("from disbursement", response);
          response.data.status === 200 &&
            Vue.$toast.success(`Desembolso solicitado con éxito!`);
        })
        .catch(error => {
          console.info(error);
          Vue.$toast.error(`Hubo un error al intentar solicitar el desembolso`);
        });
    }
  },
  getters: {
    // getOperations: (state: { operations: any }) => {
    //   const res = state.operations;
    //   console.log("my operations ", res);
    //   return res;
    // },
    getDoneOperations: (state: { doneOperation: any }) => {
      return state.doneOperation.rows || [];
    },
    getTotalDoneOperations: (state: { doneOperation: any }) => {
      return state.doneOperation.count;
    },
    getPendingOperations: (state: { pendingOperation: any }) => {

      return state.pendingOperation.rows || [];
    },
    getTotalPendingOperations: (state: { pendingOperation: any }) => {
      return state.pendingOperation.count;
    },
    getBalance: (state: { balance: number }) => {
      return state.balance;
    }
  }
};
export default operationState;
