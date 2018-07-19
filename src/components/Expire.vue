<template lang="html">
  <v-layout align-space-around justify-center wrap row>
    <v-layout justify-center>
      <v-flex (xs12 | sm12 | md8 | lg7 | xl5) class="text-xs-center" mt-5 mr-2 ml-2>
        <v-card color="white" height="25rem">
          <v-layout column align-center justify-space-around>
            <v-form>
              <v-flex mt-5>
                <v-autocomplete
                  label="Название"
                  :rules="[() => !!name || 'Заполните поле']"
                  :items="names"
                  v-model="name"
                  placeholder="Выберите..."
                  required
                ></v-autocomplete>
              </v-flex>

              <v-flex>
                <v-autocomplete
                  label="Объём"
                  :rules="[() => !!volume || 'Заполните поле']"
                  :items="volumes"
                  v-model="volume"
                  placeholder="Выберите..."
                  required
                ></v-autocomplete>
              </v-flex>

              <v-flex>
                <v-menu
                  :close-on-content-click="false"
                  v-model="menu2"
                  :nudge-right="40"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  max-width="290px"
                  min-width="290px"
                >
                  <v-text-field
                    slot="activator"
                    v-model="computedDateFormatted"
                    label="Выберите дату"
                    hint="дд/мм/ггг"
                    persistent-hint
                    prepend-icon="event"
                    readonly
                  ></v-text-field>
                  <v-date-picker v-model="date" no-title @input="menu2 = false"></v-date-picker>
                </v-menu>
              </v-flex>

              <v-flex xs4 mb-2 mt-3 ml-3>
                <v-btn dark color="blue" @click="submit">
                  <v-icon left> date_range </v-icon>
                      Добавить
                </v-btn>
              </v-flex>
            </v-form>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row justify-center>
      <v-flex (xs12 | sm12 | md8 | lg6 |  xl5) mt-4 ml-2 mr-2>
        <v-list two-line subheader>
          <v-subheader>Просрочено</v-subheader>
          <v-card>
            <v-list-tile v-for="item in items" :key="item.title">

              <v-list-tile-content>
                <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ item.date }} | {{item.volume}}</v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-btn icon ripple @click="deleteOne">
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
                <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                <v-list-tile-sub-title> {{ item.date }} | {{item.volume}}</v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-btn icon ripple @click="deleteTwo" :disabled="!valid">
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
      volumes: ['2л', '1.75л', '1.5л', '1.25л', '1л', '0.9л', '0.5л', '0.33л', '0.25л'],
      volume: null,
      names: ['Вико Яблоко', 'Вико Вишня', 'Долина', 'Fanta', 'CocaCola', 'FuzeTea Лесные ягоды'],
      name: null,
      expirationDate: null,
      valid: true,
      dateRules: [
        v => !!v || 'Заполните поле',
        v => (v && v.length === 8) || 'Должно быть 8 символов'
      ],
      items: [
        {name: 'Вико Яблоко', date: '09.04.18', volume: '2л'},
        {name: 'Вико Вишня', date: '21.05.18', volume: '0.5л'},
        {name: 'Долина', date: '18.01.18', volume: '0.33л'}
      ],
      items2: [
        {name: 'CocaCola', date: '13.11.18', volume: '0.5л'},
        {name: 'FuzeTea Лесные ягоды', date: '14.01.19', volume: '1л'}
      ],
      products: [],
      date: null,
      dateFormatted: null,
      menu1: false,
      menu2: false
    }
  },
  created () {
    this.db.collection('beverages').get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        this.products.push(doc.data())
      })
    })
    .catch((err) => {
      console.log('Error getting documents', err)
    })
  },
  computed: {
    computedDateFormatted () {
      return this.formatDate(this.date)
    }
  },
  watch: {
    date (val) {
      this.dateFormatted = this.formatDate(this.date)
    }
  },
  methods: {
    formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
    parseDate (date) {
      if (!date) return null

      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
    submit () {
      if (this.volume && this.name && this.computedDateFormatted) {
        let addDate = new Date()

        this.db.collection('beverages').add({
          expirationDate: this.computedDateFormatted,
          name: this.name,
          volume: this.volume,
          addDate: addDate
        })
        .then((docRef) => {
          this.products.push({
            expirationDate: this.computedDateFormatted,
            name: this.name,
            volume: this.volume,
            addDate: addDate
          })
          this.date = null
          this.name = null
          this.volume = null
          console.log('Document written with ID: ', docRef.id)
        })
        .catch((error) => {
          console.error('Error adding document: ', error)
        })
      }
    },
    deleteOne () {
      console.log('lol')
    },
    deleteTwo () {
      console.log('lol')
    }
  }
}
</script>
