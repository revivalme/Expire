<template lang="html">
  <v-app id="inspire">
    <v-layout row justify-center>
      <v-dialog v-model="deleteItem" persistent max-width="290">
        <v-card>
          <v-card-text class="text-md-center title font-weight-regular">
            <v-flex mt-3>Вы точно хотите удалить это?</v-flex>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" flat @click="$emit('dialog-delete', false)">Нет</v-btn>
            <v-btn color="green darken-1" flat @click="$emit('dialog-delete', true)">Да</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-app>
</template>

<script>
export default {
  props: {
    deleteItem: Boolean
  },
  data () {
    return {
      ...this.props
    }
  }
}
</script>
