<template lang="html">
  <v-layout justify-center column>
    <v-flex xs12>
      <v-flex xs12 mt-5>
        <v-layout justify-center>
          <router-link to="/home" tag="span">
            <v-btn icon ripple>
              <v-icon medium color="grey darken-1"> keyboard_return </v-icon>
            </v-btn>
          </router-link>
        </v-layout>
      </v-flex>
      <v-layout justify-center>
        <v-flex (xs12 | sm10 | md5 | lg4 | xl3) ml-3 mr-3 mt-2>
          <v-list two-line subheader v-if="!(products == false)">
            <v-card>
              <v-list-tile v-for="product in products" :key="product.id">
                <v-list-tile-content>
                  <v-list-tile-title>{{ product.name }}</v-list-tile-title>
                  <v-list-tile-sub-title>{{ product.expirationDate }} | {{product.volume}}</v-list-tile-sub-title>
                </v-list-tile-content>

                <v-list-tile-action>
                  <v-btn icon ripple @click="returnProduct(product.id)">
                    <v-icon color="grey lighten-1">replay</v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>
            </v-card>
          </v-list>
          <v-layout v-else justify-center>
            <v-subheader class="text-md-center title font-weight-bold">
              Отсутствуют продукты.
            </v-subheader>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data () {
    return {
      products: []
    }
  },
  created () {
    let localProducts = []
    let secondsArr = []

    this.db.collection('productsreturn-1-1').get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        let localProduct = doc.data()
        localProduct.id = doc.id
        localProducts.push(localProduct)
      })
    })
    .then(() => {
      localProducts.forEach((product) => {
        secondsArr.push(product.deleteDate.seconds)
      })

      secondsArr.sort((a, b) => {
        if (a < b) return 1
        if (a > b) return -1
      })

      localProducts.forEach((product, i) => {
        if (product.deleteDate.seconds >= secondsArr[9] || localProducts.length <= 9) {
          this.products.push(product)
        } else if (product.deleteDate.seconds <= secondsArr[9]) {
          this.db.collection('productsreturn-1-1').doc(product.id).delete()
        }
      })
    })
    .catch((err) => {
      console.log('Error getting documents', err)
    })
  },
  methods: {
    returnProduct (id) {
      this.products.forEach((product, i) => {
        if (product.id === id) {
          this.db.collection('department-1-1').add(product)
          this.db.collection('productsreturn-1-1').doc(id).delete()
          this.products.splice(i, 1)
        }
      })
    }
  }
}
</script>
