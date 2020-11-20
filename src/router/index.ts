import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Transactions from "../views/Transactions.vue";
import Panel from "../views/Panel.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    component: Panel,
    children: [
      {
        path: "/about",
        name: "About",
        component: () => import("../views/About.vue")
      },
      {
        path: "/account",
        name: "Account",
        component: () => import("../views/Account.vue")
      },
      {
        path: "/buy",
        name: "Buy",
        component: () => import("../views/Buy.vue")
      },
      {
        path: "/payment",
        name: "Payment",

        component: () => import("../views/Payment.vue")
      },
      {
        path: "/sellment",
        name: "Sellment",
        component: () => import("../views/Sellment.vue")
      },
      {
        path: "/help",
        name: "Help",
        component: () => import("../views/Help.vue")
      },
      {
        path: "/sell",
        name: "Sell",
        component: () => import("../views/Sell.vue")
      },
      {
        path: "/",
        name: "Transactions",
        component: Transactions
      },
      {
        path: "/wallet",
        name: "Wallet",
        component: () => import("../views/Wallet.vue")
      }
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
  {
    path: "/new-password",
    name: "NewPass",
    component: () => import("../views/auth/NewPass.vue")
  },
  {
    path: "/recovery-password",
    name: "RecoveryPass",
    component: () => import("../views/auth/RecoveryPass.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const publicViews = [
    "/login",
    "/register",
    "/recovery-password",
    "/new-password"
  ];
  const authRequired = !publicViews.includes(to.path);
  const loggedIn = localStorage.getItem("jwt");
  if (authRequired && !loggedIn) next("/login");
  next();
});

export default router;
