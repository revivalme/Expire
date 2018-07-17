<template lang="html">
  <v-container>
    <v-layout align-center justify-center wrap row>
      <v-layout justify-center>
        <v-flex (xs12 | sm11 | md8 | lg6 |  xl5) class="text-xs-center" mt-5>
          <v-card color="white" height="25rem">
            <v-layout column align-center justify-space-around>
              <v-flex xs4 mt-5>
                <v-autocomplete
                  label="Название"
                  :rules="[() => !!name || 'This field is required']"
                  :items="names"
                  v-model="name"
                  placeholder="Выберите..."
                  required
                ></v-autocomplete>
              </v-flex>
              <v-flex xs4>
                <v-autocomplete
                  label="Объём"
                  :rules="[() => !!volume || 'This field is required']"
                  :items="volumes"
                  v-model="volume"
                  placeholder="Выберите..."
                  required
                ></v-autocomplete>
              </v-flex>
              <v-flex xs4>
                <v-text-field
                  counter="8"
                  label="Дата истечения..."
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs4 mb-2 mt-2>
                <v-btn dark color="blue">
                  <v-icon left> date_range </v-icon>
                      Добавить
                </v-btn>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout row wrap justify-center>
        <v-flex (xs12 | sm11 | md8 | lg6 |  xl5) class="text-xs-center" mt-5>
          <v-card color="white" height="25rem">
            <v-layout column align-center justify-space-around>
              <v-list v-for=""></v-list>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      volumes: ['2', '1.75', '1.5', '1.25', '1', '0.9', '0.5', '0.33', '0.25'],
      volume: null,
      names: ['Вико Яблоко', 'Вико Вишня', 'Долина', 'Fanta', 'CocaCola', 'FuzeTea Лесные ягоды'],
      name: null
    }
  },
  methods: {
  }
}
</script>
