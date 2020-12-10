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
      { commit }: any,
      { estado, codigo_transferencia, id }: any
    ) {
      try {
        const updateDisbursement = await UpdateDisbursement(id, {
          codigo_transferencia,
          estado
        });
        console.info(updateDisbursement);
        updateDisbursement.data.status === 200 &&
          Vue.$toast.success(`Estado de desembolso actualizado`);
      } catch (error) {
        console.info(error);
        Vue.$toast.error(`Parece que algo ha salido mal, intenta nuevo`);
      }
    },
    getAllSells({ commit }: any): void {
      GetAllSells()
        .then((response: any) => {
          console.info("get expenditure:", response.data.data);
          commit("setExpenditureData", response.data.data);
        })
        .catch(error => {
          console.info(error);
        });
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
    getSell: (state: { sells: Array<any> }) => {
      return state.sells;
    }
  }
};
export default adminState;