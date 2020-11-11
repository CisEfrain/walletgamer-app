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
      state.login = payload;
    },

    setRegister(state: any, payload: any): void {
      state.register = payload;
    }
  },
  actions: {
    setLogin({ commit }: any, payload: any): void {
      Login(payload)
        .then((response: any) => {
          if (response.status === 200) {
            const {
              data: {
                data: {
                  jwt,
                  usuario: { nombre, email, telefono }
                }
              }
            } = response;
            localStorage.setItem("jwt", jwt);
            Vue.$toast.success(`Bienvenid@ ${nombre}`);
            commit("setLogin", { nombre, email, telefono });
            router.push("/");
          }
        })
        .catch(error => {
          console.info(error);
          Vue.$toast.error(
            "Parece que has colocado mal los datos o necesitas registrarte"
          );
        });
    },
    setRegister({ commit }: any, payload: any): void {
      Register(payload)
        .then((response: any) => {
          response.status === 200 &&
            Vue.$toast.success(`${payload.nombre} tu registro fue exitoso!`);
          router.push("/login");
          commit("setRegister", payload);
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
