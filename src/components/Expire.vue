<template lang="html">
  <v-layout align-space-around justify-center wrap row>
    <delete-dialog v-if="deleteBoolProp" @dialog-delete="onDialogDelete" :delete-item="deleteBoolProp"></delete-dialog>
    <v-layout justify-center>
      <v-flex (xs12 | sm12 | md8 | lg7 | xl5) class="text-xs-center" mt-5 mr-2 ml-2>
        <v-card height="25rem">
          <v-layout align-center column justify-center>
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
            </v-layout>
            <v-form>
              <v-layout row align-center>
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
                ></v-text-field>
              </v-layout>

              <v-autocomplete
                label="Объём"
                :rules="[() => !!volume || 'Заполните поле']"
                :items="volumes"
                v-model="volume"
                placeholder="Выберите..."
                required
              ></v-autocomplete>

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
    <v-layout row justify-center>
      <v-flex (xs12 | sm12 | md8 | lg6 |  xl5) mt-4 ml-2 mr-2>
        <v-list two-line subheader>
          <v-subheader>Просрочено</v-subheader>
          <v-card>
            <v-list-tile v-for="item in items" :key="item.id">

              <v-list-tile-content>
                <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ item.expirationDate }} | {{item.volume}}</v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-btn icon ripple @click="deleteOne(item.id)">
                  <v-icon color="grey lighten-1">clear</v-icon>
                </v-btn>
              </v-list-tile-action>

            </v-list-tile>
          </v-card>
          <v-divider></v-divider>
          <v-subheader>Остальные</v-subheader>
          <v-card>
            <v-list-tile
              v-for="item in items2"
              :key="item.id"
            >
              <v-list-tile-content>
                <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                <v-list-tile-sub-title> {{ item.expirationDate }} | {{item.volume}}</v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-btn icon ripple @click="dialogHelpComponent(item.id)" :disabled="!valid">
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
import deleteDialog from './Dialogs/deleteDialog'

export default {
  data () {
    return {
      volumes: [
        '5л', '3л', '2.25л', '2л', '1.93л', '1.75л', '1.5л', '1.25л',
        '1л', '0.97л', '0.95л', '0.9л', '0.75л', '0.6л', '0.5л', '0.48л',
        '0.45л', '0.355л', '0.33л', '0.3л', '0.25л', '0.2л'
      ],
      volume: null,
      names: [],
      name: null,
      expirationDate: null,
      valid: true,
      dateRules: [
        v => !!v || 'Заполните поле',
        v => (v && v.length === 8) || 'Должно быть 8 символов'
      ],
      products: [],
      date: null,
      dateFormatted: null,
      menu1: false,
      menu2: false,
      deleteBoolProp: false,
      idProductItem: '',
      fieldChange: false
    }
  },
  components: {
    deleteDialog
  },
  created () {
    this.db.collection('department-1-1').get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        let localproducts = doc.data()
        localproducts.id = doc.id
        this.products.push(localproducts)
      })
    })
    .catch((err) => {
      console.log('Error getting documents', err)
    })

    this.db.collection('namesProducts-1-1').get()
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
    },
    items () {
      return this.products.filter((product) => {
        let dateNow = Date.parse(new Date())
        let dateExpire = Date.parse(`${product.expirationDate}`)
        return dateNow > dateExpire
      })
    },
    items2 () {
      return this.products.filter((product) => {
        let dateNow = Date.parse(new Date())
        let dateExpire = Date.parse(`${product.expirationDate}`)
        return dateNow < dateExpire
      })
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

        this.db.collection('department-1-1').add({
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
            addDate: addDate,
            id: docRef.id
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
    deleteOne (id) {
      this.db.collection('department-1-1').doc(id).delete()
      this.products.forEach((product, index) => {
        if (product.id === id) {
          this.products.splice(index, 1)
          this.addInReturnComp(product)
        }
      })
    },
    dialogHelpComponent (id) {
      this.deleteBoolProp = true
      this.idProductItem = id
    },
    onDialogDelete (deleteBool) {
      console.log(deleteBool)
      if (deleteBool === true) {
        this.deleteTwo()
      }
      this.deleteBoolProp = false
    },
    deleteTwo () {
      this.db.collection('department-1-1').doc(this.idProductItem).delete()
      this.products.forEach((product, index) => {
        if (product.id === this.idProductItem) {
          this.products.splice(index, 1)
          this.addInReturnComp(product)
        }
      })
    },
    addInReturnComp (product) {
      product.deleteDate = new Date()
      this.db.collection('productsreturn-1-1').add(product)
    }
  }
}
</script>
