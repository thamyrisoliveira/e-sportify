import App from './App.vue'
import router from './router'
import store from './store'
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from 'firebase/firestore/lite';
import Vue from 'vue';
import vuetify from './plugins/vuetify'
import VueTheMask from 'vue-the-mask'

Vue.use(VueTheMask)

Vue.config.productionTip = false;

let app = '';

const firebaseConfig = {
  apiKey: "AIzaSyC8wbjXmDxWmU5_IfNU-MT5eCFp0aLhAuI",
  authDomain: "e-sportify-8182c.firebaseapp.com",
  projectId: "e-sportify-8182c",
  storageBucket: "e-sportify-8182c.appspot.com",
  messagingSenderId: "918745258871",
  appId: "1:918745258871:web:70fceb2f081ab85968df72",
  measurementId: "G-BYSTXJCP92"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const database = getFirestore(firebaseApp);

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  app = new Vue({
    router,
    vuetify,
    store,
    render: h => h(App)
  }).$mount('#app');
});
/* eslint-disable */