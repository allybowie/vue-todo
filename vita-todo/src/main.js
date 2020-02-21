import Vue from "vue";
import App from "./App.vue";
import store from "./components/store/store";
import router from "./components/routes/index";
import { firestorePlugin } from "vuefire";
import firebase from "firebase/app";
import "firebase/firestore";

Vue.use(firestorePlugin);

var firebaseConfig = {
  apiKey: "AIzaSyDUm65rDiHs1tX79SgrB9clrqZN5e7cvsc",
  authDomain: "vita-to-do.firebaseapp.com",
  databaseURL: "https://vita-to-do.firebaseio.com",
  projectId: "vita-to-do",
  storageBucket: "vita-to-do.appspot.com",
  messagingSenderId: "597582688958",
  appId: "1:597582688958:web:48abe8ea9302d9a886a4ef",
  measurementId: "G-NBJMNX0R1G"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const db = firebase.firestore();

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
  store
}).$mount("#app");
