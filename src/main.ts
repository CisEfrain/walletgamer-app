import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
Vue.use(Vuetify);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  validations: {},
  render: h => h(App)
}).$mount("#app");
