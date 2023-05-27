import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

//google maps
import * as VueGoogleMaps from 'vue2-google-maps'

//firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database'

const firebaseConfig = {
  apiKey: "AIzaSyBe6eYg7PC3tbVF6YxgBVJ9T3q4MzrlDDc",
  authDomain: "mythical-pod-582.firebaseapp.com",
  databaseURL: "https://mythical-pod-582-default-rtdb.firebaseio.com",
  projectId: "mythical-pod-582",
  storageBucket: "mythical-pod-582.appspot.com",
  messagingSenderId: "66874463517",
  appId: "1:66874463517:web:909a31138e94f38d5b3df4",
  measurementId: "G-4KXENXP6WT"
};

var fire = firebase.initializeApp(firebaseConfig);

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyD66m4le_x6_zZOPJiy4cWuHLIWB7bNh-g',
    libraries: 'places', // This is required if you use the Autocomplete plugin
  },
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

export default fire;
