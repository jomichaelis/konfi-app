<template>
<div class="calendar" v-if="loggedIn">
  <v-flex xs12 text-xs-center mt-5>
    <h1 class="purple--text">User hinzufügen</h1>
  </v-flex>

  <v-container>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="onCreatePerson">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field name="first_name" label="Vorname" id="first_name" v-model="first_name" required prepend-icon="person_add"></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field name="last_name" label="Nachname" id="last_name" v-model="last_name" required prepend-icon="person_add"></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn raised dark class="purple" @click="onClickAvatarUpload">Bild hochladen</v-btn>
              <input type="file" style="display: none" ref="fileInput" accept="image/*" @change="onAvatarPicked">
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <img :src="imageUrl" height="150">
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-select name="role" :items="['lead', 'teamer', 'konfi']" label="Rolle" required v-model="role" prepend-icon="edit"></v-select>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field name="email" label="E-Mail" id="email" v-model="email" required prepend-icon="mail"></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field name="password" label="Passwort" id="password" v-model="password" type="password" required prepend-icon="lock"></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field name="password2" label="Passwort erneut eingeben" id="password2" v-model="password2" type="password" required prepend-icon="lock"></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-switch v-model="admin" color="purple" label="Admin" prepend-icon="star"></v-switch>
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
      first_name: '',
      last_name: '',
      role: '',
      email: '',
      password: '',
      password2: '',
      admin: false,
      imageUrl: '',
      image: null
    }
  },
  computed: {
    formIsValid() {
      return this.first_name !== '' &&
        this.last_name !== '' &&
        this.role !== '' &&
        this.email !== '' &&
        this.password !== '' &&
        this.password === this.password2 &&
        this.admin !== null &&
        this.imageUrl !== ''
    },
    loggedIn() {
      return (this.$store.getters.user !== null)
    }
  },
  methods: {
    onCreatePerson() {
      if (!this.formIsValid) {
        return
      }
      if (!this.image) {
        return
      }
      const personData = {
        first_name: this.first_name,
        last_name: this.last_name,
        role: this.role,
        email: this.email,
        password: this.password,
        admin: this.admin,
        image: this.image,
      }
      this.$store.dispatch('createPerson', personData)
      this.$router.push('/contacts')
    },
    onClickAvatarUpload() {
      this.$refs.fileInput.click()
    },
    onAvatarPicked(event) {
      const files = event.target.files
      let filename = files[0].name
      if (filename.lastIndexOf('.') <= 0) {
        return alert('Please add a valid file!')
      }
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.image = files[0]
    }
  }
}
</script>
