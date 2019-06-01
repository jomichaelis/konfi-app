<template>
<div class="calendar" v-if="loggedIn">
  <v-flex xs12 text-xs-center mt-5>
    <h1 class="purple--text">Event hinzufügen</h1>
  </v-flex>

  <v-container>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="onCreateEvent">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field name="title" label="Name des Events" id="title" v-model="title" required prepend-icon="edit"></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-menu :close-on-content-click="false" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">
                <template v-slot:activator="{ on }">
                  <v-text-field v-model="date" name="date" label="Datum" id="date" prepend-icon="event" readonly required v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="date"></v-date-picker>
              </v-menu>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-menu :close-on-content-click="false" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">
                <template v-slot:activator="{ on }">
                  <v-text-field v-model="start_time" name="start_time" label="Von" id="start_time" prepend-icon="access_time" readonly required v-on="on"></v-text-field>
                </template>
                <v-time-picker v-model="start_time" format="24hr"></v-time-picker>
              </v-menu>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-menu :close-on-content-click="false" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">
                <template v-slot:activator="{ on }">
                  <v-text-field v-model="end_time" name="end_time" label="Bis" id="end_time" prepend-icon="access_time" readonly required v-on="on"></v-text-field>
                </template>
                <v-time-picker v-model="end_time" format="24hr"></v-time-picker>
              </v-menu>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field name="descr" label="Beschreibung" id="descr" v-model="descr" required prepend-icon="edit"></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-select  item-text="disp_name" item-value="color" name="color" :items="colors" label="Farbe" required v-model="color" prepend-icon="color_lens" ></v-select>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn color="purple darken-1" type="submit" flat :disabled="!formIsValid">Speichern</v-btn>
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
      title: '',
      date: '',
      start_time: '',
      end_time: '',
      descr: '',
      color: ''
    }
  },
  computed: {
    formIsValid() {
      return this.title !== '' &&
        this.date !== '' &&
        this.start_time !== '' &&
        this.end_time !== '' &&
        this.descr !== '' &&
        this.color !== ''
    },
    colors() {
      return this.$store.getters.loadedColors
    },
    loggedIn() {
      return (this.$store.getters.user !== null)
    }
  },
  methods: {
    onCreateEvent() {
      if (!this.formIsValid) {
        return
      }
      const eventData = {
        title: this.title,
        date: this.date,
        start_time: this.start_time,
        end_time: this.end_time,
        descr: this.descr,
        color: this.color,
      }
      this.$store.dispatch('createEvent', eventData)
      this.$router.push('/calendar')
    }
  }
}
</script>
