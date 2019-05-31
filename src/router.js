import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Calendar from './views/Calendar.vue'
import Contacts from './views/Contacts.vue'
import Worships from './views/Worships.vue'
import HowTo from './views/HowTo.vue'
import LogIn from './views/LogIn.vue'
import WorshipDetail from './views/WorshipDetail.vue'
import AddGodi from './views/AddGodi.vue'
import AddUser from './views/AddUser.vue'
import Documents from './views/Documents.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: Calendar
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: Contacts
    },
    {
      path: '/worships',
      name: 'worships',
      component: Worships
    },
    {
      path: '/worships/:id',
      props: true,
      component: WorshipDetail
    },
    {
      path: '/howto',
      name: 'howto',
      component: HowTo
    },
    {
      path: '/login',
      name: 'login',
      component: LogIn
    },
    {
      path: '/addgodi',
      name: 'addgodi',
      component: AddGodi
    },
    {
      path: '/adduser',
      name: 'adduser',
      component: AddUser
    },
    {
      path: '/documents',
      name: 'documents',
      component: Documents
    }
  ]
})
