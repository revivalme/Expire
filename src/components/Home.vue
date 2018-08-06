<template lang="html">
  <v-layout justify-center>
      <v-flex xs12 sm8 md5 mt-5 lg4 ml-4 mr-4>
        <v-card>
          <v-card-media
            src="https://firebasestorage.googleapis.com/v0/b/neten-40082.appspot.com/o/expire.jpg?alt=media&token=2d596a59-8e9b-49a0-ae41-eee9ef4682f7"
            height="150px"
          ></v-card-media>

          <v-flex mt-2>
            <v-card-title primary-title>
              <v-layout justify-center column align-center>
                <h3 class="headline mb-0">Выберите магазин и отдел</h3>
                <v-flex mt-3>
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

          <v-flex pb-3>
            <v-layout justify-end>
              <v-card-actions>
                <v-btn right dark color="green">Войти</v-btn>
              </v-card-actions>
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
      stores: ['Магазин X', 'Магазин Z', 'Магазин Y'],
      departments: ['Отдел X', 'Отдел Z', 'Отдел Y'],
      store: null,
      department: null
    }
  }
}
</script>
