<template>
<div class="worships">
  <v-flex xs12 text-xs-center mt-5>
    <h1 class="purple--text">Gottesdienst - Detail</h1>
  </v-flex>

  <v-container class="my-5" :class="meetup.color" >
    <h1 class="white--text">Titel: {{meetup.title}}</h1>
    <h1 class="white--text">Datum: {{meetup.date}}</h1>
    <h1 class="white--text">Uhrzeit: {{meetup.time}}</h1>
    <h1 class="white--text">Pfarrer: {{meetup.pfarrer}}</h1>
    <h1 class="white--text">Farbe: {{meetup.color}}</h1>
  </v-container>

</div>
</template>

<script>
  export default {
    props: ['id'],
    computed: {
      meetup () {
        return this.$store.getters.loadedGodi(this.id)
      }
    }
  }
</script>
