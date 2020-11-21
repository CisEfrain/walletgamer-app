import { Transfer } from "@/services/transfer.service";
import Vue from "vue";
const transferState = {
  state: () => ({
    transferData: {}
  }),
  mutations: {
    setTransfer(state: any, payload: any): void {
      state.transferData = payload;
    }
  },
  actions: {
    TransferToFriend({ commit }: any, payload: any): void {
      Transfer(payload)
        .then((response: any) => {
          console.info("from transfer", response);
          response.data.status === 200 &&
            Vue.$toast.success(
              `Transferencia realizada a ${payload.beneficiario} con éxito!`
            );
          commit("setTransfer", response.data.data.saldo);
        })
        .catch(error => {
          console.info(error);
          Vue.$toast.error(`Hubo un error al intentar transferir`);
        });
    }
  }
  // getters: { ... }
};
export default transferState;
