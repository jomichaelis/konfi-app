import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
import db from '@/fb'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedGodis: [],
    loadedUsers: [],
    loadedEvents: [],
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
    setLoadedUsers(state, payload) {
      state.loadedUsers = payload
    },
    createUser(state, payload) {
      state.loadedUsers.push(payload)
    },
    setLoadedEvents(state, payload) {
      state.loadedEvents = payload
    },
    createEvent(state, payload) {
      state.loadedEvents.push(payload)
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

    /*handle load and store of godis*/
    loadGodis({
      commit
    }) {
      db.collection("worships").get()
        .then(function(querySnapshot) {
          const godis = []
          querySnapshot.forEach(function(doc) {
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
      const id = godi.date + "_" + godi.title
      // Add a new document with a generated id.
      db.collection('worships').doc(id).set(godi)
        .then(() => {
          commit('createGodi', {
            ...godi,
            id: id
          });
        })
        .catch((error) => {
          console.error(error);
        })
    },

    /*handle load and store of users*/
    loadUsers({
      commit
    }) {
      db.collection("user").get()
        .then(function(querySnapshot) {
          const users = []
          querySnapshot.forEach(function(doc) {
            const obj = doc.data()
            users.push({
              id: doc.id,
              first_name: obj.first_name,
              last_name: obj.last_name,
              avatar: obj.avatar,
              role: obj.role
            })
          });
          commit('setLoadedUsers', users)
        })
        .catch(
          (error) => {
            console.log(error)
          }
        )
    },
    createUser({
      commit
    }, payload) {
      const user = {
        first_name: payload.first_name,
        last_name: payload.last_name,
        role: payload.role
      }
      let key
      let filename
      let ext
      const id = user.last_name + "_" + user.first_name
      console.log(id)
      // Add a new document with a generated id.
      db.collection('user').doc(id).set(user)
        .then(() => {
          filename = payload.image.name
          ext = filename.slice(filename.lastIndexOf('.'))
          return firebase.storage().ref('user/' + id + ext).put(payload.image)
        })
        .then(() => {
          firebase.storage().ref('user/' + id + ext).getDownloadURL().then(function(downloadURL) {
            db.collection('user').doc(id).update({
                avatar: downloadURL
              }),
              commit('createUser', {
                ...user,
                avatar: downloadURL,
                id: id
              })
          })
        })
        .catch((error) => {
          console.log(error)
        })
      // Reach out to firebase and store it
    },


    /*handle load and store of events*/
    loadEvents({
      commit
    }) {
      db.collection("events").get()
        .then(function(querySnapshot) {
          const events = []
          querySnapshot.forEach(function(doc) {
            const obj = doc.data()
            events.push({
              id: doc.id,
              title: obj.title,
              date: obj.date,
              start_time: obj.start_time,
              end_time: obj.end_time,
              descr: obj.descr,
              color: obj.color
            })
          });
          commit('setLoadedEvents', events)
        })
        .catch(
          (error) => {
            console.log(error)
          }
        )
    },
    createEvent({
      commit
    }, payload) {
      const event = {
        title: payload.title,
        date: payload.date,
        start_time: payload.start_time,
        end_time: payload.end_time,
        descr: payload.descr,
        color: payload.color
      }
      const id = event.date + "_" + event.title
      // Add a new document with a generated id.
      db.collection('events').doc(id).set(event)
        .then(() => {
          commit('createEvent', {
            ...event,
            id: id
          });
        })
        .catch((error) => {
          console.error(error);
        })
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
    loadedUsers(state) {
      return state.loadedUsers
    },
    loadedEvents(state) {
      return state.loadedEvents
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
