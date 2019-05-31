<template>
<div class="calendar">
  <v-flex xs12 text-xs-center mt-5>
    <h1 class="purple--text">User hinzufügen</h1>
  </v-flex>

  <v-container>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="onCreateUser">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field name="first_name" label="Vorname" id="first_name" v-model="first_name" required prepend-icon="edit"></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field name="last_name" label="Nachname" id="last_name" v-model="last_name" required prepend-icon="edit"></v-text-field>
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
      imageUrl: '',
      image: null
    }
  },
  computed: {
    formIsValid() {
      return this.first_name !== '' &&
        this.last_name !== '' &&
        this.role !== '' &&
        this.imageUrl !== ''
    }
  },
  methods: {
    onCreateUser() {
      if (!this.formIsValid) {
        return
      }
      if (!this.image) {
        return
      }
      const userData = {
        first_name: this.first_name,
        last_name: this.last_name,
        role: this.role,
        image: this.image,
      }
      this.$store.dispatch('createUser', userData)
      this.$router.push('/contacts')
    },
    onClickAvatarUpload() {
      this.$refs.fileInput.click()
    },
    onAvatarPicked (event) {
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
