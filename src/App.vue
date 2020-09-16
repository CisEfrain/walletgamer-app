<template>
  <v-app>
    <!--     <v-app-bar app color="primary" dark>
      <v-spacer></v-spacer>
   
    </v-app-bar>-->

    <v-main>
      <layout />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Layout from "@/views/Layout.vue";

export default Vue.extend({
  name: "App",

  components: {
    Layout
  },

  data: () => ({
    //
  })
});
</script>
 <style lang="sass">
@import './scss/variables.scss'
@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;600;800&display=swap')

#app
  background-color: #f3f3f3
  font-family: "Nunito Sans", sans-serif

.title
  color: $title

.v-container
  background-color: $background

.links
  color: $card-link !important

.theme-button
  background: $button-gradient

a
  text-decoration: none
</style>