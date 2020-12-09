import { Register } from "@/services/register.service";
import { Login,LoginAdmin } from "@/services/auth.service";
import { RecoveryPass, NewPass } from "@/services/recoveryPass.service";
import router from "@/router";
import Vue from "vue";

const authState = {
  state: () => ({
    login: {},
    adminLogin:{},
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
    setAdminLogin(state:any,payload:any){
      console.log('adminlogin commit ',payload)
      state.adminLogin = payload;
    },
    setRegister(state: any, payload: any): void {
      state.register = payload;
    }
  },
  actions: {
    setAdminLogin({ commit }: any, payload: any): void {
      const loader = Vue.$loading.show();
      LoginAdmin(payload)
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
            loader.hide();
            localStorage.setItem("jwt", jwt);
            Vue.$toast.success(`Bienvenid@ ${nombre}`);
            const isAdmin = true;
            commit("setAdminLogin", { nombre, email, telefono,isAdmin });
            router.push("/admin/ventas");
          }
        })
        .catch(error => {
          console.info(error);
          loader.hide();
          Vue.$toast.error(
            "Parece que has colocado mal los datos"
          );
        });
    },
    setLogin({ commit }: any, payload: any): void {
      const loader = Vue.$loading.show();
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
            loader.hide();
            localStorage.setItem("jwt", jwt);
            Vue.$toast.success(`Bienvenid@ ${nombre}`);
            commit("setLogin", { nombre, email, telefono });
            router.push("/");
          }
        })
        .catch(error => {
          console.info(error);
          loader.hide();
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
    },
    recoveryPass({ commit }: any, payload: any): void {
      const { email } = payload;
      RecoveryPass(email)
        .then((response: any) => {
          console.info(response);
          response.status === 200 &&
            Vue.$toast.success(
              `Se ha enviado un email a tu correo para reestablecer tu contraseña!`
            );
          //router.push("/login");
        })
        .catch((error: any) => {
          console.info(error);
          Vue.$toast.error(
            `Lo sentimos, ha ocurrido un error intenta nuevamente`
          );
        });
    },
    newPass({ commit }: any, payload: any): void {
      const { pass, token } = payload;
      NewPass(pass, token)
        .then((response: any) => {
          console.info(response);
          response.status === 200 &&
            Vue.$toast.success(
              `Se ha actualizado tu contraseña de forma exitosa!`
            );
          //router.push("/login");
        })
        .catch((error: any) => {
          console.info(error);
          Vue.$toast.error(
            `Lo sentimos, ha ocurrido un error intenta nuevamente`
          );
        });
    }
  },
    getters: {
     adminInfo: (state) => {
      return state.adminLogin;
    }
    } 
};
export default authState;
