import { GetData } from "@/services/general.service";
const AppState = {
  state: () => ({
    activeProduct: "",
    data: {}
  }),
  mutations: {
    /**
     * @params name - product name to set selected product card.
     * @remarks this refers to product cards in buy and sell components
     *   */
    setProduct(state: any, payload: any): void {
      state.activeProduct = payload.name;
    },
    resetProduct(state: any): void {
      state.activeProduct = "";
    },
    setData(state: any, payload: any): void {
      state.data = payload;
    }
  },
  actions: {
    setProdut({ commit }: any, payload: any): void {
      commit("setProduct", payload);
    },
    resetProdut({ commit }: any, payload: any): void {
      commit("resetProduct", payload);
    },
    getData({ commit }: any): void {
      GetData()
        .then((response: any) => {
          console.info("from get general data", response);
          commit("setData", response.data.data);
        })
        .catch(error => {
          console.info(error);
        });
    }
  },
  getters: {
    getGoldPostData: (state: { data: any }) => {
      return state.data.publicaciones.oro;
    },
    getCharactersPostData: (state: { data: any }) => {
      return state.data.publicaciones.personajes;
    },
    getItemsPostData: (state: { data: any }) => {
      return state.data.publicaciones.items;
    }
  }
};
export default AppState;
