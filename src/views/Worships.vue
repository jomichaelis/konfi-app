<template>
<div class="worships">
  <v-flex xs12 text-xs-center mt-5>
    <h1 class="purple--text">Gottesdienste</h1>
  </v-flex>

  <v-container class="my-5">

    <v-layout row wrap justify-center>
      <v-progress-circular :rotate="-90" :size="100" :width="18" :value="value" color="purple">
        {{ value }} %
      </v-progress-circular>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <v-card dark v-for="godi in godis" v-bind:color="godi.color" :key="godi.title" class="mt-4">
          <v-container fluid>
            <v-layout row>
              <v-flex xs5 sm4 md4>
                <img src="https://i2.wp.com/www.moehrendorf-evangelisch.de/wp-content/uploads/2019/03/Glockentuerme_StLaurentius.jpg?resize=768%2C1152&ssl=1" height="156px"/>
              </v-flex>
              <v-flex xs7 sm8 md9>
                <v-card-title primary-title>
                  <div>
                    <h2>{{godi.title}}</h2>
                    <div>{{godi.date}}</div>
                    <div>{{godi.time}}</div>
                    <div>Pfarrer: {{godi.pfarrer}}</div>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn flat :to="'/worships/' + godi.id">
                    <v-icon left light>arrow_forward</v-icon>
                    Ansehen
                  </v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>

  </v-container>

</div>
</template>

<script>
export default {
  computed: {
    godis() {
      return this.$store.getters.loadedGodis
    },
    value() {
      return (Math.round((parseInt(this.$store.getters.loadedGodis.length)/24)*100))
    }
  }
}
</script>

<style>
</style>
