import { GetData } from "@/services/general.service";
const AppState = {
  state: () => ({
    activeProduct: "",
    data: {},
    isFundForm: ""
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
    },
    setFundForm(state: any, payload: boolean): void {
      state.isFundForm = payload;
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
    },
    setFundForm({ commit }: any, payload: any): void {
      commit("setFundForm", payload);
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
    },
    getFactionList: (state: { data: any }) => {
      return state.data.listas.facciones;
    },
    getRealmList: (state: { data: any }) => {
      return state.data.listas.reinos;
    },
    getClassList: (state: { data: any }) => {
      return state.data.listas.clases;
    },
    getRankList: (state: { data: any }) => {
      return state.data.listas.rangos;
    },
    getPayMethodList: (state: { data: any }) => {
      const platformPayMethods = [];
      for (const key in state.data.pasarelas) {
        const element = state.data.pasarelas[key];
        platformPayMethods.push({
          nombre: element.nombre,
          descripcion: element.descricion,
          // eslint-disable-next-line @typescript-eslint/camelcase
          id: element.id
        });
      }

      return platformPayMethods;
    },
    getFundForm: (state: { isFundForm: boolean }) => {
      return state.isFundForm;
    }
  }
};
export default AppState;
