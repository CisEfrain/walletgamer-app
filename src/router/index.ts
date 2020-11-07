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
        path: "/payment",
        name: "Payment",
        // route level code-splitting
        // this generates a separate chunk (buy.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import("../views/Payment.vue")
      },
      {
        path: "/sellment",
        name: "Sellment",
        // route level code-splitting
        // this generates a separate chunk (buy.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import("../views/Sellment.vue")
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
        component: Transactions
        // route level code-splitting
        // this generates a separate chunk (transactions.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        // component: () => import("../views/Transactions.vue")
      },
      {
        path: "/wallet",
        name: "Wallet",
        // route level code-splitting
        // this generates a separate chunk (wallet.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
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
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const publicViews = ["/login", "/register"];
  const authRequired = !publicViews.includes(to.path);
  const loggedIn = localStorage.getItem("jwt");
  if (authRequired && !loggedIn) next("/login");
  next();
});

export default router;
