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
  })
});
</script>
 <style lang="sass">

@import url('https://fonts.googleapis.com/css2?family=Maven+Pro:wght@400;500;600;700;800;900&display=swap')
@import './scss/variables.scss'

.v-application
  font-family: $body-font-family, sans-serif !important

.v-application .headline, .v-application .title
    line-height: 2rem
    font-family: $body-font-family, sans-serif !important

#app
  background-color: #f3f3f3
  font-family: $body-font-family, sans-serif !important

*
  font-family: $body-font-family, sans-serif !important

.title
  color: $title
  font-family: $body-font-family, sans-serif !important
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