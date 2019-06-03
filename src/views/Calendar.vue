<template>
<div class="calendar" v-if="loggedIn && getactive('calendar')">
  <v-flex xs12 text-xs-center mt-5>
    <h1 class="purple--text">Kalender</h1>
  </v-flex>

  <v-container class="my-5">
    <v-timeline align-top dense>
      <v-timeline-item v-for="event in sortedEvents" v-bind:color="event.color" small>
        <v-expansion-panel :key="event.id">
          <v-expansion-panel-content>
            <template v-slot:header>
              <v-layout row wrap pa-3>
                <v-flex xs12 sm6 md4>
                  <h3 class="font-weight-strong">{{event.date}}</h3>
                </v-flex>
                <v-flex>
                  <h3 class="font-weight-strong">{{event.title}}</h3>
                </v-flex>
                <v-flex>
                  <h3 class="font-weight-strong">{{event.timestamp}}</h3>
                </v-flex>
              </v-layout>
            </template>
            <v-card :dark="event.dark" v-bind:color="event.color">
              <v-card-text class="font-weight-light">{{event.descr}}</v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-timeline-item>
    </v-timeline>
  </v-container>

</div>
</template>

<script>
import format from 'date-fns/format'
export default {
  computed: {
    sortedEvents() {
      return this.$store.getters.loadedEvents.sort((a, b) => a['date'] < b['date'] ? -1 : 1)
    },
    loggedIn() {
      return (this.$store.getters.user !== null)
    }
  },
  methods: {
    getactive(link) {
      return this.$store.getters.getactive(link)
    }
  }
}
</script>
