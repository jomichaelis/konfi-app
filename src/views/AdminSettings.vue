<template>
<div class="calendar" v-if="loggedIn">
  <v-flex xs12 text-xs-center mt-5>
    <h1 class="purple--text">Admin-Einstellungen</h1>
  </v-flex>

  <v-container>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="onSaveSettings">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-switch v-model="panels.calendar" color="purple" label="Kalender"></v-switch>
              <v-switch v-model="panels.contacts" color="purple" label="Kontaktbuch"></v-switch>
              <v-switch v-model="panels.documents" color="purple" label="Dokumente"></v-switch>
              <v-switch v-model="panels.worships" color="purple" label="Gottesdienste"></v-switch>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn color="purple darken-1" type="submit" flat>Speichern</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</div>
</template>

<script>
export default {
  data() {
    return {
      panels: {
        calendar: true,
        contacts: true,
        documents: true,
        worships: true
      }
    }
  },
  computed: {
    loggedIn() {
      return (this.$store.getters.user !== null)
    }
  },
  created: function() {
    this.panels = this.$store.getters.loadedAdminSettings
  },
  methods: {
    onSaveSettings() {
      const settings = {
        calendar: this.panels.calendar,
        contacts: this.panels.contacts,
        documents: this.panels.documents,
        worships: this.panels.worships
      }
      this.$store.dispatch('updateAdminSettings', settings)
      this.$router.push('/adminsettings')
    }
  }
}
</script>
