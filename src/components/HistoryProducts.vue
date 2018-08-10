<template lang="html">
  <v-layout row justify-center>
    <delete-dialog v-if="deleteBoolProp" @dialog-delete="onDialogDelete" :delete-item="deleteBoolProp"></delete-dialog>
    <v-flex (xs12 | sm12 | md8 | lg6 |  xl5) mt-5 ml-2 mr-2>
      <v-layout justify-center>
        <router-link to="/expire" tag="span">
          <v-btn icon ripple>
            <v-icon medium color="grey darken-1"> keyboard_return </v-icon>
          </v-btn>
        </router-link>
      </v-layout>
      <v-list two-line subheader>
        <v-subheader>Просрочено</v-subheader>
        <v-card>
          <v-list-tile v-for="item in items" :key="item.id">

            <v-list-tile-content>
              <v-list-tile-title>{{ item.name }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ item.expirationDate }}</v-list-tile-sub-title>
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
              <v-list-tile-sub-title> {{ item.expirationDate }}</v-list-tile-sub-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-btn icon ripple @click="dialogHelpComponent(item.id)">
                <v-icon color="grey lighten-1">clear</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-card>
      </v-list>
    </v-flex>
  </v-layout>
</template>

<script>
import deleteDialog from './Dialogs/deleteDialog'

export default {
  data () {
    return {
      products: [],
      deleteBoolProp: false,
      idProductItem: '',
      store: localStorage.store,
      department: localStorage.department
    }
  },
  components: {
    deleteDialog
  },
  created () {
    this.db.collection(`department-${this.store}-${this.department}`).get()
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
  },
  computed: {
    items () {
      return this.products.filter((product) => {
        const dateNow = Date.parse(new Date())
        const dateExpire = Date.parse(`${product.expirationDate}`)
        return dateNow > dateExpire
      })
    },
    items2 () {
      return this.products.filter((product) => {
        const dateNow = Date.parse(new Date())
        const dateExpire = Date.parse(`${product.expirationDate}`)
        return dateNow < dateExpire
      })
    }
  },
  methods: {
    deleteOne (id) {
      this.db.collection(`department-${this.store}-${this.department}`).doc(id).delete()
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
      if (deleteBool === true) {
        this.deleteTwo()
      }
      this.deleteBoolProp = false
    },
    deleteTwo () {
      this.db.collection(`department-${this.store}-${this.department}`).doc(this.idProductItem).delete()
      this.products.forEach((product, index) => {
        if (product.id === this.idProductItem) {
          this.products.splice(index, 1)
          this.addInReturnComp(product)
        }
      })
    },
    addInReturnComp (product) {
      product.deleteDate = new Date()
      this.db.collection(`productsreturn-${this.store}-${this.department}`).add(product)
    }
  }
}
</script>
