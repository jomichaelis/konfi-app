<template>
<div class="home" v-if="loggedIn">
  <v-flex xs12 text-xs-center mt-5>
    <h1 class="purple--text">Home</h1>
  </v-flex>

  <v-container class="my-5">
    <v-layout row wrap justify-center>
    </v-layout>
    <v-card class="mt-5 mx-auto" max-width="600">
      <v-sheet class="v-sheet--offset mx-auto" color="purple" elevation="12" max-width="calc(100% - 32px)">
        <v-sparkline :labels="labels" :value="value" color="white" line-width="2" padding="16"></v-sparkline>
      </v-sheet>
      <v-card-text class="pt-0">
        <div class="title font-weight-light mb-2">Besuchte Gottesdienste</div>
        <div class="subheading font-weight-light grey--text">Letzter Gottesdienst: {{lastgodi.date}}</div>
        <v-divider class="my-2"></v-divider>
        <v-icon class="mr-2" small>poll</v-icon>
        <span class="caption grey--text font-weight-light">Rangliste: {{position}}</span>
      </v-card-text>
    </v-card>

    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex d-flex xs12 md4>
          <v-card color="purple lighten-2" dark tile flat>
            <v-card-title primary-title>
              <v-icon left>calendar_today</v-icon>
              <div class="headline">Nächster Termin</div>
            </v-card-title>
            <v-card-text>30. Mai 2019: Konfitag 1</v-card-text>
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 md8>
          <v-card color="purple darken-3" dark tile flat>
            <v-card-text>braunes</v-card-text>
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 md7>
          <v-card color="purple lighten-2" dark tile flat>
            <v-card-title>Termine</v-card-title>
            <v-card-text>Termine</v-card-text>
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 md5>
          <v-card color="purple darken-3" dark tile flat>
            <v-card-text>braunes</v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

  </v-container>

</div>
</template>

<script>
export default {
  data: () => ({
    labels: [
      'Mai',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Okt',
      'Nov',
      'Dez',
      'Jan',
      'Feb',
      'Mär',
      'Apr',
      'Mai'
    ],
    value: [
      2,
      3,
      5,
      1,
      0,
      2,
      3,
      4,
      2,
      6,
      0,
      1
    ],
    position: 5,
    lastgodi: {
      date: "13.10.2019"
    },
    progress: 0.7
  }),
  computed: {
    loggedIn() {
      return (this.$store.getters.user !== null)
    }
  }
}
</script>

<style>
.v-sheet--offset {
  top: -24px;
  position: relative;
}
</style>
