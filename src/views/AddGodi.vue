<template>
<div class="calendar">
  <v-flex xs12 text-xs-center mt-5>
    <h1 class="purple--text">Gottesdienst hinzufügen</h1>
  </v-flex>

  <v-container>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="onCreateGodi">
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
                  <v-text-field v-model="time" name="time" label="Uhrzeit" id="time" prepend-icon="access_time" readonly required v-on="on"></v-text-field>
                </template>
                <v-time-picker v-model="time" format="24hr"></v-time-picker>
              </v-menu>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field name="pfarrer" label="Pfarrer" id="pfarrer" v-model="pfarrer" required prepend-icon="person"></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-select name="color" :items="['blue', 'red darken-4', 'green darken-4', 'white']" label="Farbe" required v-model="color" prepend-icon="color_lens" ></v-select>
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
      time: '',
      pfarrer: '',
      color: ''
    }
  },
  computed: {
    formIsValid() {
      return this.title !== '' &&
        this.date !== '' &&
        this.date !== '' &&
        this.pfarrer !== '' &&
        this.color !== ''
    }
  },
  methods: {
    onCreateGodi() {
      if (!this.formIsValid) {
        return
      }
      const godiData = {
        title: this.title,
        date: this.date,
        time: this.time,
        pfarrer: this.pfarrer,
        color: this.color,
      }
      this.$store.dispatch('createGodi', godiData)
      this.$router.push('/worships')
    }
  }
}
</script>
