import firebase from 'firebase/app'
import router from '@/router'
import { SET_USER, SET_LOADING, SET_ERROR } from './mutation-types'

export default {
  state: {
    user: null,
    error: null,
    loading: false
  },
  actions: {
    userSignUp ({commit}, payload) {
      commit('SET_LOADING', true)
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(firebaseUser => {
        commit('SET_USER', {email: payload.email})
        commit('SET_LOADING', false)
        router.push('/home')
      })
      .catch(error => {
        commit('SET_ERROR', error.message)
        commit('SET_LOADING', false)
      })
    },
    userSignIn ({commit}, payload) {
      commit('SET_LOADING', true)
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(firebaseUser => {
        commit('SET_USER', {email: payload.email})
        commit('SET_LOADING', false)
        commit('SET_ERROR', null)
        router.push('/home')
      })
      .catch(error => {
        commit('SET_ERROR', error.message)
        commit('SET_LOADING', false)
      })
    },
    autoSignIn ({commit}, payload) {
      commit('SET_USER', {email: payload.email})
    },
    userSignOut ({commit}) {
      firebase.auth().signOut()
      commit('SET_USER', null)
      router.push('/')
    }
  },
  mutations: {
    [SET_USER] (state, payload) {
      state.user = payload
    },
    [SET_ERROR] (state, payload) {
      state.error = payload
    },
    [SET_LOADING] (state, payload) {
      state.loading = payload
    }
  },
  getters: {
    isAuthenticated (state) {
      return state.user !== null && state.user !== undefined
    }
  }
}
