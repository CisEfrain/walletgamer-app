import { GetOperations } from "@/services/operation.service";
const operationState = {
  state: () => ({
    operations: [],
  }),
  mutations: {
    resetData(state: any): void {
      state.operations = [];
    },
    setOperationData(state: any, payload: any): void {
      state.operations = payload;
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
    }
  },
  getters: {
    getOperations: (state: { operations: any }) => {
      const res = state.operations;
      console.log("my operations ", res);
      return res;
    },
    getDoneOperations: (state: { operations: Array<any>  }) => {
      return state.operations.filter(
        (operation: any) => operation.transaccione.estado !== "Pendiente"
      );
    },
    getPendingOperations: (state: { operations: Array<any>  }) => {
      return state.operations.filter(
        (operation: any) => operation.transaccione.estado === "Pendiente"
      );
    }
  }
};
export default operationState;
