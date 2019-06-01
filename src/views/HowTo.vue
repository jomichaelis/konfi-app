<template>
<div class="home" v-if="loggedIn">
  <v-flex xs12 text-xs-center mt-5>
    <h1 class="purple--text">How-To</h1>
  </v-flex>

  <v-container class="my-5">
    <h3 class="font-weight-light">
      Hey,
      wie gehts?
      <br>
      Wir haben diese coole KonfiWebApp entwickelt, damit ihr eure Gottesdienst-Besuche im Überblick habt.
      <br>
      <br>
      Einfach links auf "Gottesdienst hinzufügen" klicken und Daten eintragen.
      <br>
      Bei Fragen kannst du dich jederzeit an jomichaelis wenden, ansonsten gibt es unten einen Kontakt-Button.
    </h3>

    <h3>{{date}}</h3>

  </v-container>

</div>
</template>

<script>
export default {
  data() {
    return {
      date: new Date()
    }
  },
  computed: {
    loggedIn() {
      return (this.$store.getters.user !== null)
    }
  }
}

</script>

<style>

</style>
