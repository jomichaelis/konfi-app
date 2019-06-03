import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
import db from '@/fb'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedGodis: [],
    loadedPersons: [],
    loadedEvents: [],
    loadedColors: [],
    loadedAdminSettings: [],
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
    setLoadedPersons(state, payload) {
      state.loadedPersons = payload
    },
    createPerson(state, payload) {
      state.loadedPersons.push(payload)
    },
    setLoadedColors(state, payload) {
      state.loadedColors = payload
    },
    setLoadedEvents(state, payload) {
      state.loadedEvents = payload
    },
    createEvent(state, payload) {
      state.loadedEvents.push(payload)
    },
    updateAdminSettings(state, payload) {
      state.loadedAdminSettings = payload
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

    /*handle load and store of persons*/
    loadPersons({
      commit
    }) {
      db.collection("user").get()
        .then(function(querySnapshot) {
          const persons = []
          querySnapshot.forEach(function(doc) {
            const obj = doc.data()
            persons.push({
              id: doc.id,
              first_name: obj.first_name,
              last_name: obj.last_name,
              email: obj.email,
              admin: obj.admin,
              avatar: obj.avatar,
              role: obj.role
            })
          });
          commit('setLoadedPersons', persons)
        })
        .catch(
          (error) => {
            console.log(error)
          }
        )
    },
    createPerson({
      commit
    }, payload) {
      let person = {
        first_name: payload.first_name,
        last_name: payload.last_name,
        role: payload.role,
        email: payload.email,
        password: payload.password,
        admin: payload.admin
      }
      let key
      let filename
      let ext
      const id = person.last_name + "_" + person.first_name
      firebase.auth().createUserWithEmailAndPassword(person.email, person.password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        })
        .then(() => {
          person.password = null,
          db.collection('user').doc(id).set(person)
        })
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
              commit('createPerson', {
                ...person,
                avatar: downloadURL,
                id: id
              })
          })
        })
        .catch((error) => {
          console.log(error)
        })
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

    loadColors({
      commit
    }) {
      db.collection("colors").get()
        .then(function(querySnapshot) {
          const colors = []
          querySnapshot.forEach(function(doc) {
            const obj = doc.data()
            colors.push({
              id: doc.id,
              disp_name: obj.disp_name,
              color: obj.color,
              dark: obj.dark
            })
          });
          commit('setLoadedColors', colors)
        })
        .catch(
          (error) => {
            console.log(error)
          }
        )
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
              email: payload.email
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
    signUserOut({
      commit
    }, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signOut()
        .then(
          user => {
            commit('setLoading', false)
            commit('setUser', null)
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
    },

    updateAdminSettings({
      commit
    }, payload) {
      const settings = {
        calendar: payload.calendar,
        contacts: payload.contacts,
        documents: payload.documents,
        worships: payload.worships
      }
      db.collection('settings').doc("adminsettings").update(settings)
        .then(() => {
          commit('updateAdminSettings', settings);
        })
        .catch((error) => {
          console.error(error);
        })
    },
    loadAdminSettings({
      commit
    }) {
      db.collection("settings").doc("adminsettings").get()
        .then(function(doc) {
          const settings = doc.data()
          commit('updateAdminSettings', settings)
        })
        .catch(
          (error) => {
            console.log(error)
          }
        )
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
    loadedPersons(state) {
      return state.loadedPersons
    },
    loadedEvents(state) {
      return state.loadedEvents
    },
    loadedColors(state) {
      return state.loadedColors
    },
    loadedAdminSettings(state) {
      return state.loadedAdminSettings
    },
    getactive(state) {
      return (link) => {
        return state.loadedAdminSettings[link]
      }
    },
    user(state) {
      return state.user
      //return true
    },
    findUser(state) {
      var value = state.loadedPersons.filter(function(elem) {
        if (elem.email === state.user.email) return elem;
      });
      return value[0]["first_name"]
    },
    getAvatar(state) {
      var value = state.loadedPersons.filter(function(elem) {
        if (elem.email === state.user.email) return elem;
      });
      return value[0]["avatar"]
    },
    loading(state) {
      return state.loading
    },
    error(state) {
      return state.error
    }
  }
})
