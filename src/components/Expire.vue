<template lang="html">
  <v-layout align-space-around justify-center wrap row>
    <v-layout justify-center>
      <v-flex (xs10 | sm6 | md4 | lg3 | xl2) class="text-xs-center" mt-5 mr-2 ml-2>
        <v-card height="22rem">
          <v-layout align-center column justify-center>
            <v-flex mt-4>
              <v-layout row justify-center>
                <router-link to="/productsadd" tag="span">
                  <v-btn icon ripple>
                    <v-icon medium color="grey darken-1"> add_circle_outline </v-icon>
                  </v-btn>
                </router-link>
                <router-link to="/productsreturn" tag="span">
                  <v-btn icon ripple>
                    <v-icon medium color="grey darken-1"> replay </v-icon>
                  </v-btn>
                </router-link>
                <v-btn icon ripple @click="fieldChange = !fieldChange">
                  <v-icon medium color="grey darken-1"> compare_arrows </v-icon>
                </v-btn>
                <router-link to="/historyproducts" tag="span">
                  <v-btn icon ripple>
                    <v-icon medium color="grey darken-1"> assignment </v-icon>
                  </v-btn>
                </router-link>
              </v-layout>
            </v-flex>
            <v-form>
              <v-layout row align-center justify-content>
                <v-autocomplete v-if="fieldChange"
                  label="Название"
                  :rules="[() => !!name || 'Заполните поле']"
                  :items="names"
                  v-model="name"
                  placeholder="Выберите..."
                  required
                ></v-autocomplete>

                <v-text-field v-else
                  label="Regular"
                  v-model="name"
                  autofocus
                ></v-text-field>
              </v-layout>

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
                  hint="дд/мм/гггг"
                  persistent-hint
                  prepend-icon="event"
                  readonly
                ></v-text-field>
                <v-date-picker v-model="date" locale="ru-Latn" no-title @input="menu2 = false"></v-date-picker>
              </v-menu>

              <v-flex mb-2 mt-3>
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
  </v-layout>
</template>

<script>
export default {
  data () {
    return {
      names: [],
      name: null,
      expirationDate: null,
      dateRules: [
        v => !!v || 'Заполните поле',
        v => (v && v.length === 8) || 'Должно быть 8 символов'
      ],
      date: null,
      dateFormatted: null,
      menu1: false,
      menu2: false,
      fieldChange: false,
      store: localStorage.store,
      department: localStorage.department
    }
  },
  created () {
    this.db.collection(`namesProducts-${this.store}-${this.department}`).get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        let localname = doc.data()
        this.names.push(localname.name)
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
  methods: {
    formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      this.dateFormatted = `${year}.${month}.${day}`
      return `${day}.${month}.${year}`
    },
    submit () {
      if (this.name && this.dateFormatted) {
        let addDate = new Date()

        this.db.collection(`department-${this.store}-${this.department}`).add({
          expirationDate: this.dateFormatted,
          name: this.name,
          addDate: addDate
        })
        .then((docRef) => {
          this.date = null
          this.name = null
          console.log('Document written with ID: ', docRef.id)
        })
        .catch((error) => {
          console.error('Error adding document: ', error)
        })
      }
    }
  }
}
</script>
