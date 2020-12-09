import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Transactions from "../views/Transactions.vue";
import Panel from "../views/Panel.vue";
import Payment from "@/views/Payment.vue";
import store from "@/store/index";
/* eslint-disable */
import jwt_decode from "jwt-decode";
// import {  } from "module";
Vue.use(VueRouter);

const GamerGuard = (to, from, next) => {
  const loggedIn = localStorage.getItem("jwt");
  if (!loggedIn) return next("/login");
  next();
};
const AdminGuard = (to, from, next) => {
  const loggedIn = localStorage.getItem("jwt");
  const data = jwt_decode(loggedIn)
  const { data: { isAdmin} } = (data as any);
  console.log(isAdmin)
  if (!isAdmin || !loggedIn) return next("/login-admin");
  next();
};
const routes: Array<RouteConfig> = [
  {
    path: "/",
    component: Panel,
    beforeEnter: GamerGuard,
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
        component: Payment
        // component: () => import("../views/Payment.vue")
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
    path: "/login-admin",
    name: "LoginAdmin",
    component: () => import("../views/admin/auth/Login.vue")
  },
  {
    path: "/admin/",
    component: Panel,
    beforeEnter: AdminGuard,
    children: [
      {
        path: "ventas",
        name: "AdminVentas",
        component: () => import("../views/admin/Sells.vue")
      },
      {
        path: "desembolsos",
        name: "AdminDesembolsos",
        component: () => import("../views/admin/Disbursement.vue")
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
const publicViews = [
  "/login",
  "/register",
  "/recovery-password",
  "/new-password"
];
const adminViews = [
  "/admin/login"
];


export default router;
