import { GetOperations } from "@/services/operation.service";
const operationState = {
  state: () => ({
    operations: []
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
          console.info("from get general data", response);
          commit("setOperationData", response.data.data);
        })
        .catch(error => {
          console.info(error);
        });
    }
  },
  getters: {
    getOperations: (state: { data: any }) => {
      const res = state.data.operations;
      console.log("my operations ", res);
      return res;
    }
  }
};
export default operationState;
