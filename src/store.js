import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
import db from '@/fb'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedGodis: [{
      id: 'lmuX8iZyhtMNl9ktRMbH',
      color: "blue",
      title: "GODI WAGEN",
      date: "2019-02-14",
      time: "13:18",
      pfarrer: "Metzler"
    }, {
      id: 'lmuX8iZyhtMNl9ktRMasdf',
      color: "red darken-4",
      title: "Osternacht",
      date: "2018-03-04",
      time: "13:18",
      pfarrer: "Metzler"
    }],
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    setLoadedGodis(state, payload) {
      state.loadedGodis = payload
    },
    createGodi(state, payload) {
      state.loadedGodis.push(payload)
    },
    setUser(state, payload) {
      state.user = payload
    },
    setLoading(state, payload) {
      state.loading = payload
    },
    setError(state, payload) {
      state.error = payload
    },
    clearError(state) {
      state.error = null
    }
  },
  actions: {
    loadGodis({commit}) {
      db.collection("worships").get()
        .then(function(querySnapshot) {
          const godis = []
          querySnapshot.forEach(function(doc) {
            console.log("-------------")
            const obj = doc.data()
            godis.push({
              id: doc.id,
              title: obj.title,
              date: obj.date,
              time: obj.time,
              pfarrer: obj.pfarrer,
              color: obj.color
            })
          });
          console.log(godis)
          commit('setLoadedGodis', godis)
        })
        .catch(
          (error) => {
            console.log(error)
          }
        )
    },
    createGodi({
      commit
    }, payload) {
      const godi = {
        title: payload.title,
        date: payload.date,
        time: payload.time,
        pfarrer: payload.pfarrer,
        color: payload.color
      }
      // Add a new document with a generated id.
      db.collection('worships').add(godi)
        .then((data) => {
          const key = data.id;
          commit('createGodi', {
            ...godi,
            id: key
          });
          console.log(key)
        })
        .catch((error) => {
          console.error(error);
        })
      // Reach out to firebase and store it
    },
    signUserIn({
      commit
    }, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.id,
              visitedGodis: []
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    clearError({
      commit
    }) {
      commit('clearError')
    }
  },
  getters: {
    loadedGodis(state) {
      return state.loadedGodis.sort((godiA, godiB) => {
        return godiA.date > godiB.date
      })
    },
    loadedGodi(state) {
      return (godiID) => {
        return state.loadedGodis.find((godi) => {
          return godi.id === godiID
        })
      }
    },
    user(state) {
      return state.user
    },
    loading(state) {
      return state.loading
    },
    error(state) {
      return state.error
    }
  }
})
