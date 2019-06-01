import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import { store } from './store'
import AlertCmp from './components/Alert.vue'

Vue.config.productionTip = false
Vue.component('app-alert', AlertCmp)

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    this.$store.dispatch('loadGodis')
    this.$store.dispatch('loadUsers')
    this.$store.dispatch('loadEvents')
  }
}).$mount('#app')
