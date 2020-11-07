import { Register } from "@/services/register.service";
import { Login } from "@/services/auth.service";
import router from "@/router";
import Vue from "vue";

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

    setRegister(state: any, payload: any): void {
      console.log("from auth register:", payload);
      state.register = payload;
    }
  },
  actions: {
    setLogin({ commit }: any, payload: any): void {
      Login(payload)
        .then(async (response: any) => {
          const {
            data: {
              data: {
                jwt,
                usuario: { nombre }
              }
            }
          } = response;
          console.info(response);
          localStorage.setItem("jwt", jwt);
          console.info(jwt);
          response.status === 200 && Vue.$toast.success(`Bienvenido ${nombre}`);
          commit("setLogin", { nombre });
          router.push("/");
        })
        .catch(error => {
          console.info(error);
          Vue.$toast.error(
            "Parece has colocado mal los datos o que necesitas registrarte"
          );
        });
    },
    setRegister({ commit }: any, payload: any): void {
      commit("setRegister", payload);
      Register(payload)
        .then((response: any) => {
          response.status === 200 &&
            Vue.$toast.success(`${payload.nombre} tu registro fue exitoso!`);
          router.push("/login");
        })
        .catch(error => {
          console.info(error);
          Vue.$toast.error(
            `Lo sentimos ${payload.nombre}, ha ocurrido un error durante el registro`
          );
        });
    }
  }
  // getters: { ... }
};
export default authState;
