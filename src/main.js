import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import store from './store/index'
import firebase from 'firebase/app'
import 'firebase/auth'
firebase.initializeApp({
  apiKey: 'AIzaSyB4XzvcQDTDjc8QyfPupOXs_dYHEfhjsEI',
  authDomain: 'neten-40082.firebaseapp.com',
  databaseURL: 'https://neten-40082.firebaseio.com',
  projectId: 'neten-40082',
  storageBucket: 'neten-40082.appspot.com',
  messagingSenderId: '743737640577'
})

Vue.prototype.db = firebase.firestore()
Vue.use(Vuetify)
Vue.config.productionTip = false

/* eslint-disable no-new */
const unsubscribe = firebase.auth()
.onAuthStateChanged((firebaseUser) => {
  new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
    created () {
      if (firebaseUser) {
        store.dispatch('autoSignIn', firebaseUser)
      }
    }
  })
  unsubscribe()
})
