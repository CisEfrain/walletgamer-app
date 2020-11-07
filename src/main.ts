import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import Vuelidate from "vuelidate";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
// import VueStripeCheckout from "vue-stripe-checkout";
// Vue.use(VueStripeCheckout, "pk_test_51HUYgHFLYR3KSOT0qrJ9jtjLOZNaGWgNBmxSghB5PXmedAiaGNoyQSJrjUcAYAWBrf9ytsEMoQyMjgo9fFSPmsWn00Jpt950Fx");

Vue.use(Vuetify);
Vue.use(Vuelidate);
Vue.use(Toast, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true
});
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
