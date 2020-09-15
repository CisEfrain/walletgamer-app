import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import Panel from "../views/Panel.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Panel",
    component: Panel,
    children:[
      {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import("../views/About.vue")
      },
      {
        path: "/account",
        name: "Account",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import("../views/Account.vue")
      },
      {
        path: "/buy",
        name: "Buy",
        // route level code-splitting
        // this generates a separate chunk (buy.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import("../views/Buy.vue")
      },
      {
        path: "/help",
        name: "Help",
        // route level code-splitting
        // this generates a separate chunk (help.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import("../views/Help.vue")
      },
      {
        path: "/sell",
        name: "Sell",
        // route level code-splitting
        // this generates a separate chunk (sell.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import("../views/Sell.vue")
      },
      {
        path: "/",
        name: "Transactions",
        // route level code-splitting
        // this generates a separate chunk (transactions.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import("../views/Transactions.vue")
      },
      {
        path: "/wallet",
        name: "Wallet",
        // route level code-splitting
        // this generates a separate chunk (wallet.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import("../views/Wallet.vue")
      },

    ]
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/auth/Login.vue")
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/auth/Register.vue")
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
