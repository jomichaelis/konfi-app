<template>
<nav>

  <v-toolbar app color="purple lighten-4">
    <v-toolbar-side-icon @click="drawer = !drawer" class="purple--text"></v-toolbar-side-icon>
    <v-toolbar-title class="text-uppercase purple--text">
      <span class="font-weight-light">Konfi</span>
      <span>Online</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>

    <v-btn flat color="purple" router to='/login'>
      <span>Anmelden</span>
      <v-icon right>lock_open</v-icon>
    </v-btn>
    <v-btn flat color="purple">
      <span>Abmelden</span>
      <v-icon right>exit_to_app</v-icon>
    </v-btn>
  </v-toolbar>

  <v-navigation-drawer app v-model="drawer" class="purple">
    <v-layout column align-center>
      <v-flex class="mt-5">
        <v-avatar size="100">
          <img class="text-lg-center"
            src='https://avataaars.io/?avatarStyle=Transparent&topType=WinterHat2&accessoriesType=Blank&hatColor=Red&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light' />
        </v-avatar>
        <p class="white--text subheading mt-1">Johannes Michaelis</p>
      </v-flex>
    </v-layout>
    <v-list>
      <v-list-tile v-for="link in links" :key="link.text" router :to="link.route">
        <v-list-tile-action>
          <v-icon class="white--text">{{ link.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title class="white--text">{{ link.text }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
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
          icon: 'assistant_photo',
          text: 'Gottesdienste',
          route: '/worships'
        },
        {
          icon: 'edit',
          text: 'Add Gottesdienst',
          route: '/addgodi'
        },
      ]
    }
  }
}
</script>

<style>
</style>
