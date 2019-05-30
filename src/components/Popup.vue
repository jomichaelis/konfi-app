<template>
<v-layout row justify-center>
  <v-dialog v-model="dialog" max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" class="mb-4" purple fab fixed bottom right>
        <v-icon color="purple">add</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Gottesdienst hinzufügen</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-form @submit.prevent="onCreateGodi">
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field name="title" label="Gottesdienst" id="title" required v-model="title"></v-text-field>
                <v-text-field name="date" label="Datum" id="date" required v-model="date"></v-text-field>
                <v-text-field name="pfarrer" label="Pfarrer" id="pfarrer" required v-model="pfarrer"></v-text-field>
                <v-select name="color" :items="['blue', 'red darken-4', 'green darken-4', 'white']" label="Farbe" required v-model="color"></v-select>
              </v-flex>
            </v-layout>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="purple darken-1" flat @click="dialog = false">Close</v-btn>
        <v-btn color="purple darken-1" type="submit" flat :disabled="!formIsValid">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</v-layout>
</template>

<script>
import db from '@/fb'
export default {
  data() {
    return {
      dialog: false,
      title: "",
      date: "",
      pfarrer: "",
      color: "light-blue"
    }
  },
  computed: {
    formIsValid() {
      return this.title !== '' && this.date !== '' && this.pfarrer !== '' && this.color !== ''
    }
  },
  methods: {
    onCreateGodi() {
      console.log("Got function")
      const godiData = {
        title: this.title,
        date: this.date,
        color: this.color
      }
      this.$store.dispatch('createGodi', godiData)
      this.dialog = false
    }
  }
}
</script>
