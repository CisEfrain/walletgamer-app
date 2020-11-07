import registerService from "@/services/register.service";

const authState = {
  state: () => ({
    login: {},
    register: {}
  }),
  mutations: {
    /**
     * @params name - product name to set selected product card.
     * @remarks this refers to product cards in buy and sell components
     *   */
    setLogin(state: any, payload: any): void {
      console.log("from auth login:", payload);
      state.login = payload;
      console.info(state.login);
    },
    async setRegister(state: any, payload: any): Promise<any> {
      console.log("from auth register:", payload);
      state.register = payload;
      const registerUser = await registerService.register(payload);
      console.info(registerUser);
      console.info(state.register);
    }
  },
  actions: {
    setLogin({ commit }: any, payload: any): void {
      commit("setLogin", payload);
    },
    setRegister({ commit }: any, payload: any): void {
      commit("setRegister", payload);
    }
  }
  // getters: { ... }
};
export default authState;
