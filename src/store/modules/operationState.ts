import { GetOperations, GetBalance } from "@/services/operation.service";
import { Disbursement } from "@/services/disbursement.service";
import Vue from "vue";

const operationState = {
  state: () => ({
    operations: [],
    balance: 0
  }),
  mutations: {
    resetData(state: any): void {
      state.operations = [];
    },
    setOperationData(state: any, payload: any): void {
      state.operations = payload;
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
    MyOperations({ commit }: any): void {
      GetOperations()
        .then((response: any) => {
          console.info("from my operations data", response);
          commit("setOperationData", response.data.data);
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
    AddDisbursement({ commit }: any, payload: any): void {
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
    getOperations: (state: { operations: any }) => {
      const res = state.operations;
      console.log("my operations ", res);
      return res;
    },
    getDoneOperations: (state: { operations: Array<any> }) => {
      return state.operations.filter(
        (operation: any) => operation.transaccione.estado !== "Pendiente"
      );
    },
    getPendingOperations: (state: { operations: Array<any> }) => {
      return state.operations.filter(
        (operation: any) => operation.transaccione.estado === "Pendiente"
      );
    },
    getBlance: (state: { balance: number }) => {
      return state.balance;
    }
  }
};
export default operationState;
