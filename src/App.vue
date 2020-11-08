<template>
  <v-app>
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
  }),

  mounted() {
    this.$store.dispatch("setUserData");
  }
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
  font-weight: 600

.v-container
  background-color: $background

.links
  color: $card-link !important

.theme-button
  background: $button-gradient

a
  text-decoration: none
.v-stepper,.v-stepper__header,.v-stepper__items
  background: transparent !important

.buy-stepper .v-stepper__step--active > .v-stepper__step__step
  background: $danger !important

  
</style>