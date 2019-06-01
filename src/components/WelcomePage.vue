<template>
<div>
  <section>
    <v-parallax :src="require('@/assets/purple_6.jpg')" height="600">
      <v-layout column align-center justify-center class="white--text">
        <img src="@/assets/elkb.png" alt="Vuetify.js" height="200">
        <h1 class="white--text mb-2 display-1 text-xs-center">konfi.online</h1>
        <div class="subheading mb-3 text-xs-center">Gottesdienste, Termine, Aufgaben und Leute im Überblick.</div>
        <v-btn class="purple mt-5" dark large href="/login">
          Anmelden
        </v-btn>
      </v-layout>
    </v-parallax>
  </section>

  <section>
    <v-layout column wrap class="my-5" align-center>
      <v-flex xs12 sm4 class="my-3">
        <div class="text-xs-center">
          <h2 class="headline">Alles online.</h2>
          <span class="subheading">
            Jederzeit und von überall verfügbar!
          </span>
        </div>
      </v-flex>
      <v-flex xs12>
        <v-container grid-list-xl>
          <v-layout row wrap align-center>
            <v-flex xs12 md4>
              <v-card class="elevation-0 transparent">
                <v-card-text class="text-xs-center">
                  <v-icon x-large class="purple--text text--lighten-2">color_lens</v-icon>
                </v-card-text>
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline text-xs-center">Übersicht</div>
                </v-card-title>
                <v-card-text>Wann war ich im Gottesdienst? Wie oft muss ich noch?
                  Was ist bis nächstes Mal zu lernen und wann ist überhaupt der nächste Konfitag?
                  Das alles erfährst Du hier!
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs12 md4>
              <v-card class="elevation-0 transparent">
                <v-card-text class="text-xs-center">
                  <v-icon x-large class="purple--text text--lighten-2">flash_on</v-icon>
                </v-card-text>
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">Statistiken</div>
                </v-card-title>
                <v-card-text>Habe ich die meisten Gottesdienste besucht?
                  Wieviele Punkte habe ich im Vergleich mit anderen?
                  Wie viel fehlt mir, bis ich fertig bin und wie schaut die Rangliste aus?
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs12 md4>
              <v-card class="elevation-0 transparent">
                <v-card-text class="text-xs-center">
                  <v-icon x-large class="purple--text text--lighten-2">build</v-icon>
                </v-card-text>
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline text-xs-center">Menschen</div>
                </v-card-title>
                <v-card-text>Wie hieß gleich nochmal der Pfarrer?
                  Wer ist Mitarbeiter, wer ist Konfi?
                  Wie kann ich wen am besten erreichen?
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </section>

  <section>
    <v-parallax :src="require('@/assets/rand_purple4.jpg')" height="380">
      <v-layout column align-center justify-center>
        <div class="headline white--text mb-3 text-xs-center">Konfi war noch nie intuitiver!</div>
        <em>Melde dich an und schau rein.</em>
        <v-btn class="purple mt-5" dark large href="/login">
          Anmelden
        </v-btn>
      </v-layout>
    </v-parallax>
  </section>

  <section>
    <v-container grid-list-xl>
      <v-layout row wrap justify-center class="my-5">
        <v-flex xs12 sm4>
          <v-card class="elevation-0 transparent">
            <v-card-title primary-title class="layout justify-center">
              <div class="headline">Gemeinde-Info</div>
            </v-card-title>
            <v-card-text>Wir sind eine erlebnisreiche Gemeinde, mit Festen,
              Veranstaltungen und Angeboten für Jung und Alt, Klein und Groß, Normale, Verrückte und alle anderen.
              Schau doch mal vorbei, wir würden uns sehr freuen!
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12 sm4 offset-sm1>
          <v-card class="elevation-0 transparent">
            <v-card-title primary-title class="layout justify-center">
              <div class="headline">Kontaktiere uns</div>
            </v-card-title>
            <v-card-text>
              Wenn du Fragen zum System hast, melde dich hier:
            </v-card-text>
            <v-list class="transparent">
              <v-list-tile>
                <v-list-tile-action>
                  <v-icon class="purple--text text--lighten-2">phone</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>01577-4722393</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-action>
                  <v-icon class="purple--text text--lighten-2">email</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>johannesmichaelis0@gmail.com</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-card-text>
                Wenn du allgemeine Fragen hast, melde dich hier:
              </v-card-text>
              <v-list class="transparent">
                <v-list-tile>
                  <v-list-tile-action>
                    <v-icon class="purple--text text--lighten-2">email</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>moehrendorf-evangelisch.de/kontakt</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-list>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </section>
</div>
</template>
