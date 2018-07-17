<template lang="html">
  <v-container>
    <v-layout row wrap justify-center>
      <v-flex (xs12 | sm11 | md8 | lg6 |  xl5) class="text-xs-center" mt-5>
        <v-card color="white">
          <v-layout row align-center justify-space-around>
            <v-flex xs4>
              <v-select :items="typeNote" :value="typeNote[0]"></v-select>
            </v-flex>
            <v-flex xs1>
              <v-tooltip bottom>
                <v-icon large slot="activator"> favorite </v-icon>
                <span>Привет :3</span>
              </v-tooltip>
            </v-flex>
            <v-flex xs4>
              <v-btn flat color="blue darken-2" @click="$emit('change-home', false)">
                <v-icon left> note_add </v-icon>
                    Добавить новую
              </v-btn>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap justify-center>
      <v-flex (xs12 | sm11 | md8 | lg6 |  xl5) class="text-xs-center" mt-2>
        <v-card color="white">
          <v-layout column align-center justify-space-around>
            <v-list>asdasda</v-list>
            <v-list>asdasda</v-list>
          </v-layout>
        </v-card>
          <!--<v-pagination v-model="page" :length="5">
          </v-pagination> -->
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      typeNote: ['Всё', 'Главная', 'Бок'],
      lists: [],
      listsCheckBool: false,
      favorite: 'Привет',
      page: 1
    }
  }
}
</script>
