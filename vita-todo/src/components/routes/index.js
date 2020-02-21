import Vue from "vue";
import Router from "vue-router";
import firebase from "firebase";

import HomePage from "../homepage/homepage";
import Login from "@/components/login/login";
import SignUp from "../signup/signup";

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/signup",
      name: "SignUp",
      component: SignUp
    },
    {
      path: "/home",
      name: "Homepage",
      component: HomePage,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser;
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next("login");
  else if (!requiresAuth && currentUser) next("home");
  else next();
});

export default router;
