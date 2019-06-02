<template>
<nav>

  <v-toolbar app color="purple lighten-4">
    <v-toolbar-side-icon @click="drawer = !drawer" class="purple--text" v-if="loggedIn"></v-toolbar-side-icon>
    <v-toolbar-title class="text-lowercase purple--text">
      <span class="font-weight-light">konfi.</span>
      <span>online</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>

    <v-btn flat color="purple" router to='/login' v-if="!loggedIn">
      <span>Anmelden</span>
      <v-icon right>lock_open</v-icon>
    </v-btn>
    <v-btn flat color="purple" v-if="loggedIn" @click="onSignout">
      <span>Abmelden</span>
      <v-icon right>exit_to_app</v-icon>
    </v-btn>
  </v-toolbar>

  <v-navigation-drawer app v-model="drawer" class="purple" v-if="loggedIn" dark>
    <v-img :src="image" :gradient="sidebarOverlayGradiant" height="100%">
      <v-layout class="fill-height" tag="v-list" column>
        <v-list>
          <v-list-tile avatar>
            <v-list-tile-avatar color="white">
              <v-img :src="logo" height="34" contain />
            </v-list-tile-avatar>
            <v-list-tile-title class="title">
              {{user.email}}
            </v-list-tile-title>
          </v-list-tile>
          <v-divider />
          <v-list-tile v-for="link in links" :key="link.text" router :to="link.route">
            <v-list-tile-action>
              <v-icon class="white--text">{{ link.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="white--text">{{ link.text }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-subheader class="mt-3 white--text">Admin</v-subheader>
        <v-list>
          <v-list-tile v-for="link in adminlinks" :key="link.text" router :to="link.route">
            <v-list-tile-action>
              <v-icon class="white--text">{{ link.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="white--text">{{ link.text }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-layout>
    </v-img>
  </v-navigation-drawer>

</nav>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      links: [{
          icon: 'home',
          text: 'Home',
          route: '/'
        },
        {
          icon: 'calendar_today',
          text: 'Kalender',
          route: '/calendar'
        },
        {
          icon: 'contacts',
          text: 'Kontakte',
          route: '/contacts'
        },
        {
          icon: 'description',
          text: 'Dokumente',
          route: '/documents'
        },
        {
          icon: 'assistant_photo',
          text: 'Gottesdienste',
          route: '/worships'
        }
      ],
      adminlinks: [{
        icon: 'edit',
        text: 'Add Gottesdienst',
        route: '/addgodi'
      }, {
        icon: 'edit',
        text: 'Add User',
        route: '/adduser'
      }, {
        icon: 'edit',
        text: 'Kalendereinträge',
        route: '/addevent'
      }]
    }
  },
  methods: {
    onSignout() {
      this.$store.dispatch('signUserOut', {})
      this.$router.push('/')
    }
  },
  computed: {
    loggedIn() {
      return (this.$store.getters.user !== null)
    },
    user() {
      console.log(this.$store.getters.user)
      console.log("HELLO")
      return this.$store.getters.user
    }
  }
}
</script>

<style>
</style>
