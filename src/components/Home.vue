<template>
  <v-container>
    <component :is="homeComponent" @change-home="changeHome"></component>
  </v-container>
</template>

<script>
import ListsNote from '@/components/ListsNote'
import AddNote from '@/components/AddNote'

export default {
  data () {
    return {
      typeNote: ['Всё', 'Главная', 'Бок'],
      lists: [],
      listsCheckBool: false,
      favorite: 'Привет',
      homeComponent: ListsNote
    }
  },
  components: {
    ListsNote,
    AddNote
  },
  methods: {
    changeHome (value) {
      value === true ? this.homeComponent = ListsNote : this.homeComponent = AddNote
    }
  }
}
</script>
