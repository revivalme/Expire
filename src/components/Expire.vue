<template lang="html">
  <v-layout align-space-around justify-center wrap row>
    <v-layout justify-center>
      <v-flex (xs12 | sm12 | md8 | lg7 | xl5) class="text-xs-center" mt-5>
        <v-card color="white" height="25rem">
          <v-layout column align-center justify-space-around>

            <v-flex mt-4>
              <v-autocomplete
                label="Название"
                :rules="[() => !!name || 'This field is required']"
                :items="names"
                v-model="name"
                placeholder="Выберите..."
                required
              ></v-autocomplete>
            </v-flex>

            <v-flex>
              <v-autocomplete
                label="Объём"
                :rules="[() => !!volume || 'This field is required']"
                :items="volumes"
                v-model="volume"
                placeholder="Выберите..."
                required
              ></v-autocomplete>
            </v-flex>

            <v-flex>
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
    <v-layout row justify-center>
      <v-flex (xs12 | sm12 | md8 | lg6 |  xl5) mt-5>
        <v-list two-line subheader>
          <v-subheader>Просрочено</v-subheader>
          <v-card>
            <v-list-tile v-for="item in items" :key="item.title">

              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ item.subtitle }} | {{item.volume}}</v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-btn icon ripple>
                  <v-icon color="grey lighten-1">clear</v-icon>
                </v-btn>
              </v-list-tile-action>

            </v-list-tile>
          </v-card>
          <v-divider inset></v-divider>
          <v-subheader>Остальные</v-subheader>
          <v-card>
            <v-list-tile
              v-for="item in items2"
              :key="item.title"
            >
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                <v-list-tile-sub-title> {{ item.subtitle }} | {{item.volume}}</v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-btn icon ripple>
                  <v-icon color="grey lighten-1">clear</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </v-card>
        </v-list>
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
export default {
  data () {
    return {
      volumes: ['2', '1.75', '1.5', '1.25', '1', '0.9', '0.5', '0.33', '0.25'],
      volume: null,
      names: ['Вико Яблоко', 'Вико Вишня', 'Долина', 'Fanta', 'CocaCola', 'FuzeTea Лесные ягоды'],
      name: null,
      items: [
        { title: 'Вико Яблоко', subtitle: '09.04.18', volume: '2л'},
        { title: 'Вико Вишня', subtitle: '21.05.18', volume: '0.5л'},
        { title: 'Долина', subtitle: '18.01.18', volume: '0.33л'}
      ],
      items2: [
        { title: 'CocaCola', subtitle: '13.11.18', volume: '0.5л'},
        { title: 'FuzeTea Лесные ягоды', subtitle: '14.01.19', volume: '1л'}
      ]
    }
  }
}
</script>
