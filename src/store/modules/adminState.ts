/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  GetAllDisbursements,
  UpdateDisbursement,
  GetAllSells,
  UpdateSell
} from "@/services/admin.service";
import Vue from "vue";

const adminState = {
  state: () => ({
    sells: [],
    disbursements: []
  }),
  mutations: {
    /**
     * @params name - product name to set selected product card.
     * @remarks this refers to product cards in buy and sell components
     *   */
    setDisbursement(state: any, payload: any): void {
      state.disbursements = payload;
    },
    setSell(state: any, payload: any): void {
      state.sells = payload;
    }
  },
  actions: {
    async getAllDisbursement({ commit }: any): Promise<void> {
      try {
        const allDisbursement = await GetAllDisbursements();
        console.info("from getAllDisbursement", allDisbursement.data.data.rows);
        commit("setDisbursement", allDisbursement.data.data.rows);
      } catch (error) {
        console.error(error);
        Vue.$toast.error(`No se han podido cargar los desembolsos`);
      }
    },
    async updateDisbursement(
      { commit, dispatch }: any,
      { codigo_transferencia, id }: any
    ) {
      try {
        const updateDisbursement = await UpdateDisbursement(id, {
          codigo_transferencia
        });
        console.info(updateDisbursement);
        updateDisbursement.data.status === 200 &&
          Vue.$toast.success(`Estado de desembolso actualizado`);
        dispatch("getAllDisbursement");
      } catch (error) {
        console.info(error);
        Vue.$toast.error(`Parece que algo ha salido mal, intenta nuevo`);
      }
    },
    async getAllSells({ commit }: any): Promise<void> {
      try {
        const allSells = await GetAllSells();
        console.info("from getAllSells", allSells.data.data.rows);
        commit("setSell", allSells.data.data.rows);
      } catch (error) {
        console.error(error);
        Vue.$toast.error(`No se han podido cargar los desembolsos`);
      }
    },
    updateSell({ commit }: any, { id, data }: any): void {
      UpdateSell(id, data)
        .then((response: any) => {
          console.info(response);
          response.data.status === 200 &&
            Vue.$toast.success(`metodo de pago eliminado`);
          console.info(id);
          commit("deleteExpenditureData", data);
        })
        .catch(error => {
          console.info(error);
          Vue.$toast.error(`No se ha podido eliminar tu metodos de pago`);
        });
    }
  },
  getters: {
    getDisbursement: (state: { disbursements: Array<any> }) => {
      return state.disbursements;
    },
    getSells: (state: { sells: Array<any> }) => {
      return state.sells;
    }
  }
};
export default adminState;
