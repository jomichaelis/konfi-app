<template>
<div class="home">
  <v-layout row v-if="error">
    <v-flex xs12 sm6 offset-sm3>
      <app-alert @dismissed="onDismissed" :text="error.message" </app-alert> </v-flex> </v-layout> <v-flex xs12 text-xs-center mt-5>
        <h1 class="purple--text">Anmelden</h1>
    </v-flex>

    <v-container class="my-5">
      <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
          <v-card>
            <v-card-text>
              <v-container>
                <form @submit.prevent="onSignin">
                  <v-layout row>
                    <v-flex xs12>
                      <v-text-field name="email" label="Mail" id="email" v-model="email" type="email" required></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout row>
                    <v-flex xs12>
                      <v-text-field name="password" label="Password" id="password" v-model="password" type="password" required></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout row>
                    <v-flex xs12>
                      <v-btn type="submit" :disabled="loading" :loading="loading">
                        Anmelden
                        <span slot="loader" class="custom-loader">
                          <v-icon light>cached</v-icon>
                        </span>
                      </v-btn>
                    </v-flex>
                  </v-layout>
                </form>
              </v-container>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>

    </v-container>

</div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    user() {
      return this.$store.getters.user
    },
    loading() {
      return this.$store.getters.loading
    },
    error() {
      return this.$store.getters.error
    }
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/')
      }
    }
  },
  methods: {
    onSignin() {
      this.$store.dispatch('signUserIn', {
        email: this.email,
        password: this.password
      })
    },
    onDismissed() {
      console.log('Dismissed Alert')
      this.$store.dispatch('clearError')
    }
  }
}
</script>
