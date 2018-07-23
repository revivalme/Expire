<template>
  <v-container fluid mt-5>
    <v-layout row wrap mt-5>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Добро пожаловать в Expire</h1>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 mt-3>
        <blockquote class="blockquote text-xs-center">
          Это базовое одностраничное приложение, <br>
          созданное на основе Firebase
        </blockquote>
      </v-flex>
      <v-flex xs12>
        <v-layout justify-center align-center>
          <img src="https://firebasestorage.googleapis.com/v0/b/neten-40082.appspot.com/o/6c9df45b820962716e360938b3ea95a5.jpg?alt=media&token=6d8b4e6a-bf7b-4470-b680-7eb68182c4fe" alt="">
        </v-layout>
      </v-flex>
      <v-flex v-if="!isAuthenticated" xs12 sm6 offset-sm3 class="text-xs-center" mt-2>
        <v-btn color="primary" to="/signup">Sign Up</v-btn>
        <v-btn to="/signin">Sign In</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    isAuthenticated () {
      return this.$store.getters.isAuthenticated
    }
  }
}
</script>
