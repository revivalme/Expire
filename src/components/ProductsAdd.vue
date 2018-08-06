<template lang="html">
  <v-layout column justify-center align-center>
    <!-- <v-alert :value="warn" type="warning" transition="slide-y-transition">Такое имя уже существует.</v-alert> -->
    <v-flex xs12 sm7 md4>
      <v-flex mt-5>
        <v-layout row justify-center>
          <v-flex xs12 sm6 md5 ml-2 mt-1 mr-2>
            <v-text-field
              label="Название"
              v-model="name"
              solo
            ></v-text-field>
          </v-flex>
          <v-flex offset-(xs12 | sm7 | md7 | lg2)>
            <v-layout>
              <v-flex mt-1>
                <router-link to="/home" tag="span">
                  <v-btn icon ripple>
                    <v-icon medium color="grey darken-1"> keyboard_return </v-icon>
                  </v-btn>
                </router-link>
              </v-flex>
              <v-btn
                color="primary"
                large
                @click="addName">
                Добавить
              </v-btn>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-card>
        <v-list subheader>
          <v-list-tile
            v-for="item in names"
            :key="item.id"
          >
            <v-list-tile-content>
              <v-list-tile-title v-html="item.name"></v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon ripple>
                <v-icon color="grey darken-1" @click="deleteName(item.id)"> delete </v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data () {
    return {
      names: [],
      name: '',
      warn: true,
      warnCheck: true
    }
  },
  created () {
    this.db.collection('namesProducts-1-1').get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        let localNames = doc.data()
        localNames.id = doc.id
        this.names.push(localNames)
      })
    })
    .catch((err) => {
      console.log('Error getting documents', err)
    })
  },
  methods: {
    addName () {
      this.names.forEach((name) => {
        if (name === this.name) {
          this.warnCheck = false
        }
      })
      if (this.name && this.warnCheck) {
        this.db.collection('namesProducts-1-1').add({
          name: this.name
        })
        .then((docRef) => {
          this.names.push({
            name: this.name,
            id: docRef.id
          })
          this.name = null
          console.log('Document written with ID: ', docRef.id)
        })
        .catch((error) => {
          console.error('Error adding document: ', error)
        })
      }
      this.warnCheck = true
    },
    deleteName (id) {
      this.db.collection('namesProducts-1-1').doc(id).delete()
      this.names.forEach((name, index) => {
        if (name.id === id) {
          this.names.splice(index, 1)
        }
      })
    }
  }
}
</script>
<style lang="css">

</style>
