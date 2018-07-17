<template lang="html">
  <v-layout justify-center>
    <v-flex (xs12 | sm11 | md8 | lg7 |  xl6) mt-4>
      <v-layout row align-start>
      <v-flex xs11 class="text-xs-center" mt-5>
        <v-card color="white">
          <v-layout column>
            <v-flex v-if="inputArray.length === 0 ? true : false" mt-5 ml-5 mr-5  pt-5 pb-5>
              Пусто. <br>
              Выберите один из элементов
            </v-flex>
            <template v-else>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-flex mt-5 ml-5 mr-5 v-for="(input, index) in inputArray" :key="index">
                  <template v-if="input.type == 'title'">
                    <v-text-field id="testing" name="input-1" label="Заголовок"></v-text-field>
                  </template>
                  <template v-if="input.type == 'text'">
                    <v-textarea name="input-7-4" label="Введите абзац" multi-line></v-textarea>
                  </template>
                  <template v-if="input.type == 'image'">
                    <v-text-field id="testing" name="input-1" label="URL изображения"></v-text-field>
                  </template>
                </v-flex>
                <v-flex mb-3 mr-3>
                  <v-layout justify-end>
                    <v-btn @click="clear">Очистить</v-btn>
                    <v-btn slot="activator" dark color="blue" @click="setNote">Отправить</v-btn>
                  </v-layout>
                </v-flex>
              </v-form>
            </template>
          </v-layout>
        </v-card>
      </v-flex>
      <v-layout column justify-start align-content-start>
          <v-flex ml-5 mt-5>
            <v-tooltip right>
            <v-btn fixed slot="activator" flat icon color="black lighten-2" @click="$emit('change-home', true)">
              <v-icon medium>clear</v-icon>
            </v-btn>
            <span>Выйти</span>
            </v-tooltip>
          </v-flex>
          <v-flex ml-5 mt-4>
          </v-flex>
          <v-flex ml-5 mt-5>
            <v-tooltip right>
            <v-btn fixed slot="activator" flat icon color="black lighten-2" @click="addInputType('title')">
              <v-icon medium>title</v-icon>
            </v-btn>
            <span>Заголовок</span>
            </v-tooltip>
          </v-flex>
          <v-flex ml-5 mt-5>
            <v-tooltip right>
            <v-btn fixed slot="activator" flat icon color="black lighten-2" @click="addInputType('text')">
              <v-icon medium>text_format</v-icon>
            </v-btn>
            <span>Абзац</span>
            </v-tooltip>
          </v-flex>
          <v-flex ml-5 mt-5>
            <v-tooltip right>
            <v-btn fixed slot="activator" flat icon color="black lighten-2" @click="addInputType('image')">
              <v-icon medium>add_photo_alternate</v-icon>
            </v-btn>
            <span>Изображение</span>
            </v-tooltip>
          </v-flex>
      </v-layout>
    </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>

export default {
  data () {
    return {
      inputArray: [],
      valid: true
    }
  },
  methods: {
    addInputType (type) {
      let sooth
      switch (type) {
        case 'title':
          sooth = {
            type: type
          }
          break
        case 'text':
          sooth = {
            type: type
          }
          break
        case 'image':
          sooth = {
            type: type
          }
          break
      }
      this.inputArray.push(sooth)
    },
    submit () {
      if (this.$refs.form.validate()) {
            //  axios.post('/api/submit', {})
      }
    },
    clear () {
      this.$refs.form.reset()
    },
    setNote () {
      this.db.collection('notes').add({
        imgUrl: 'Ada',
        text: 'Lovelace',
        title: '2123'
      })
      .then(function (docRef) {
        console.log('Document written with ID: ', docRef.id)
      })
      .catch(function (error) {
        console.error('Error adding document: ', error)
      })
    }
  }
}
</script>
