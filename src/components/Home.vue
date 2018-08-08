<template lang="html">
  <v-layout justify-center>
      <v-flex xs12 sm8 md5 lg3 mt-5 ml-4 mr-4>
        <v-card>
          <v-card-media
            src="https://firebasestorage.googleapis.com/v0/b/neten-40082.appspot.com/o/expire.jpg?alt=media&token=2d596a59-8e9b-49a0-ae41-eee9ef4682f7"
            height="150px"
          ></v-card-media>

          <v-flex mt-2>
            <v-card-title primary-title>
              <v-layout justify-center column align-center>
                <h3 class="headline mb-0">Выберите магазин и отдел</h3>
                <v-flex mt-2>
                  <v-layout align-around>
                    <v-flex xs12 mr-1>
                      <v-select
                        :items="stores"
                        label="Выберите..."
                        v-model="store"
                      ></v-select>
                    </v-flex>
                    <v-flex xs12 ml-1>
                      <v-select
                        :items="departments"
                        label="Выберите..."
                        v-model="department"
                      ></v-select>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-card-title>
          </v-flex>

          <v-flex pb-2>
            <v-layout justify-end>
              <router-link :to="store && department ? '/expire' : ''" tag="span">
                <v-card-actions>
                  <v-btn right dark color="blue" @click="onButton">Войти</v-btn>
                </v-card-actions>
              </router-link>
            </v-layout>
          </v-flex>
        </v-card>
      </v-flex>
    </v-layout>
</template>

<script>
export default {
  data () {
    return {
      stores: ['Магазин 1', 'Магазин 2', 'Магазин 3'],
      departments: ['Отдел 1', 'Отдел 2', 'Отдел 3'],
      store: null,
      department: null
    }
  },
  created () {
    this.store = localStorage.store ? this.stores[Number(localStorage.store) - 1] : null
    this.department = localStorage.department ? this.departments[Number(localStorage.department) - 1] : null
  },
  computed: {
    checkStore () {
      return localStorage.store ? this.stores[Number(localStorage.store) - 1] : null
    },
    checkDepartment () {
      return localStorage.department ? this.departments[Number(localStorage.department) - 1] : null
    }
  },
  methods: {
    onButton () {
      if (this.store && this.department) {
        let localStore, localDepartment

        this.stores.forEach((element, i) => {
          if (element === this.store) {
            localStore = ++i
          }
        })
        this.departments.forEach((element, i) => {
          if (element === this.department) {
            localDepartment = ++i
          }
        })

        localStorage.store = localStore
        localStorage.department = localDepartment
      }
    }
  }
}
</script>
