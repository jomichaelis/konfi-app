<template>
<div class="contacts">
  <v-flex xs12 text-xs-center mt-5>
    <h1 class="purple--text">Kontakte</h1>
  </v-flex>

  <v-container grid-list-md class="my-5">

    <v-layout row wrap justify-center>
      <v-flex xs12 text-xs-center mt-5>
        <h2>Leitung</h2>
      </v-flex>
      <v-flex xs12 sm6 v-for="leader in user.slice().reverse()" :key="leader.first_name" v-if="leader.role === 'lead'">
        <v-card flat class="text-xs-center ma-3" color="purple lighten-4">
          <v-responsive class="pt-4">
            <v-avatar size="100" class="grey lighten-2">
              <img :src="leader.avatar">
            </v-avatar>
          </v-responsive>
          <v-card-text>
            <div class="subheading">{{ leader.first_name }} {{leader.last_name}}</div>
            <div class="grey--text text--darken-1">{{ leader.role }}</div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs12 text-xs-center mt-5>
        <h2>Mitarbeiter</h2>
      </v-flex>
      <v-flex xs12 sm6 md4 lg3 v-for="teamer in user" :key="teamer.first_name" v-if="teamer.role === 'teamer'">
        <v-card flat class="text-xs-center ma-3" color="purple lighten-5">
          <v-responsive class="pt-4">
            <v-avatar size="100" class="grey lighten-2">
              <img :src="teamer.avatar">
            </v-avatar>
          </v-responsive>
          <v-card-text>
            <div class="subheading">{{ teamer.first_name }} {{teamer.last_name}}</div>
            <div class="grey--text">{{ teamer.role }}</div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs12 text-xs-center mt-5>
        <h2>Konfis</h2>
      </v-flex>
      <v-flex xs12 sm6 md4 lg3 v-for="konfi in user" :key="konfi.first_name" v-if="konfi.role === 'konfi'">
        <v-card flat class="text-xs-center ma-3">
          <v-responsive class="pt-4">
            <v-avatar size="100" class="grey lighten-2">
              <img :src="konfi.avatar">
            </v-avatar>
          </v-responsive>
          <v-card-text>
            <div class="subheading">{{ konfi.first_name }} {{konfi.last_name}}</div>
            <div class="grey--text">{{ konfi.role }}</div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</div>
</template>

<script>
import db from '@/fb'

export default {
  data() {
    return {
      user: []
    }
  },
  created() {
    db.collection('user').onSnapshot(res => {
      const changes = res.docChanges();
      changes.forEach(change => {
        if (change.type === 'added') {
          this.user.push({
            ...change.doc.data(),
            id: change.doc.id
          })
        }
      })
    })
  }

}
</script>
