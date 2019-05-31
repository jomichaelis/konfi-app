<template>
<div class="home">
  <v-flex xs12 text-xs-center mt-5>
    <h1 class="purple--text">Dokumente</h1>
  </v-flex>

  <v-container class="my-5">
    <div>
      <v-tabs v-model="active" color="purple" dark slider-color="orange">
        <v-tab v-for="item in docs" ripple>
          {{item.title}}
        </v-tab>
        <v-tab-item v-for="item in docs">
          <v-card flat>
            <v-card-text>
              <h3 class="font-weight-regular" v-for="line in item.text">{{ line }}</h3>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </div>

  </v-container>

</div>
</template>

<script>
export default {
  data() {
    return {
      active: null,
      docs: [{
          title: "Vaterunser",
          text: {
            1: 'Vater unser im Himmel,',
            2: 'geheiligt werde dein Name.',
            3: 'Dein Reich komme.',
            4: 'Dein Wille geschehe,',
            5: 'wie im Himmel so auf Erden.',
            6: 'Unser tägliches Brot gib uns heute.',
            7: 'Und vergib uns unsere Schuld,',
            8: 'wie auch wir vergeben unsern Schuldigern.',
            9: 'Und führe uns nicht in Versuchung,',
            10:'sondern erlöse uns von dem Bösen.',
            11:'Denn dein ist das Reich und die Kraft',
            12:'und die Herrlichkeit in Ewigkeit.',
            13:'Amen.'
          }
        },
        {
          title: "Glaubensbekenntnis",
          text: {
            1: '1. Gebot:',
            2: 'Ich bin der Herr, dein Gott. Du sollst keine anderen Götter haben neben mir.',
            3: '',
            4: '2. Gebot:',
            5: 'Du sollst den Namen des Herrn, deines Gottes, nicht mißbrauchen.',
            6: 'Unser tägliches Brot gib uns heute.',
            7: 'Und vergib uns unsere Schuld,',
            8: 'wie auch wir vergeben unsern Schuldigern.',
            9: 'Und führe uns nicht in Versuchung,',
            10:'sondern erlöse uns von dem Bösen.',
            11:'Denn dein ist das Reich und die Kraft',
            12:'und die Herrlichkeit in Ewigkeit.',
            13:'Amen.'
          }
        },
        {
          title: "10 Gebote",
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        }
      ]
    }
  },
  methods: {
    next() {
      const active = parseInt(this.active)
      this.active = (active < 2 ? active + 1 : 0)
    }
  }
}
</script>

<style>

</style>
